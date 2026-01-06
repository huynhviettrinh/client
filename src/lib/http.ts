import envConfig from "@/config";
import { normalizePath } from "@/lib/utils";
import { RegisterResType } from "@/schemaValidations/auth.schema";

type CustomOptions = Omit<RequestInit, "method"> & {
    baseUrl?: string | undefined;
};

const ENTITY_ERROR_STATUS = 422

type EntityErrorPayload = {
    message: string
    errors: {
        field: string
        message: string
    }[]

}

export class HttpError extends Error {
    status: number;
    payload: {
        message: string
        [key: string]: any
    };
    constructor({ status, payload }: { status: number; payload: any }) {
        super("http Error");
        this.status = status;
        this.payload = payload;
    }
}

export class EntityError extends HttpError {
    status: 422
    payload: EntityErrorPayload
    constructor({ status, payload }: { status: 422; payload: EntityErrorPayload }) {
        super({ status, payload })
        this.status = status
        this.payload = payload
    }

}

class SessionToken {
    private token = "";
    get value() {
        return this.token;
    }
    set value(token: string) {
        if (typeof window === "undefined") {
            throw new Error("Cannot set session token on server side");
        }
        this.token = token;
    }
}

export const clientSessionToken = new SessionToken();

const request = async <Response>(
    method: "GET" | "POST" | "PUT" | "DELETE",
    url: string,
    options?: CustomOptions | undefined
) => {
    const body = options?.body ? JSON.stringify(options.body) : undefined;

    const baseHeader = {
        "Content-Type": "application/json",
    };
    const baseUrl =
        options?.baseUrl === undefined
            ? envConfig.NEXT_PUBLIC_API_POINT
            : options.baseUrl;

    const fullUrl = url.startsWith("/")
        ? `${baseUrl}${url}`
        : `${baseUrl}/${url}`;

    // fetch api
    const res = await fetch(fullUrl, {
        ...options,

        headers: {
            ...baseHeader,
            ...options?.headers,
        },
        body,
        method,
    });

    const payload: Response = await res.json();
    const data = {
        status: res.status,
        payload,
    };
    if (!res.ok) {
        if (res.status === ENTITY_ERROR_STATUS) {
            throw new EntityError(data as { status: 422, payload: EntityErrorPayload })
        }

    }

    if (typeof window !== "undefined") {
        if (["auth/login", "auth/register"].some((item) => item === normalizePath(url))) {
            clientSessionToken.value = (payload as RegisterResType).data.token;
        } else if ("auth/logout" === normalizePath(url)) {
            clientSessionToken.value = "";
        }
    }

    return data;
};

const http = {
    get: <Response>(
        url: string,
        options?: Omit<CustomOptions, "body"> | undefined
    ) => {
        return request<Response>("GET", url, options);
    },
    post: <Response>(
        url: string,
        body: any,
        options?: Omit<CustomOptions, "body"> | undefined
    ) => {
        return request<Response>("POST", url, { ...options, body });
    },
    put: <Response>(
        url: string,
        body: any,
        options?: Omit<CustomOptions, "body"> | undefined
    ) => {
        return request<Response>("PUT", url, { ...options, body });
    },
    delete: <Response>(
        url: string,
        body: any,
        options?: Omit<CustomOptions, "body"> | undefined
    ) => {
        return request<Response>("DELETE", url, { ...options, body });
    },
};


export default http;
import envConfig from "@/config";
import { RegisterResType } from "@/schemaValidations/auth.schema";

type CustomOptions = Omit<RequestInit, "method"> & {
    baseUrl?: string | undefined;
};


class HttpError extends Error {
    status: number;
    payload: any;
    constructor({ status, payload }: { status: number; payload: any }) {
        super("http Error");
        this.status = status;
        this.payload = payload;
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
        throw new HttpError(data);
    }

    if (["/auth/login", "/auth/register"].includes(url)) {
        clientSessionToken.value = (payload as RegisterResType).data.token;
    } else if (url === "/auth/logout") {
        clientSessionToken.value = "";
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
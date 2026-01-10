import http from "@/lib/http";
import {
  AccountResType,
  UpdateMeBodyType,
} from "@/schemaValidations/account.schema";

const accountApiRequest = {
  me: (sessionToken: string) =>
    http.get<AccountResType>("/account/me", {
      headers: { Authorization: `Bearer ${sessionToken}` },
    }),
  updateMe: (body: UpdateMeBodyType, sessionToken: string) =>
    http.put<AccountResType>("/account/me", body, {
      headers: { Authorization: `Bearer ${sessionToken}` },
    }),
};
export default accountApiRequest;

import { AccountInfo, AuthenticationResult as CommonAuthenticationResult } from "@azure/msal-common";
export type AuthenticationResult = CommonAuthenticationResult & {
    account: AccountInfo;
};
//# sourceMappingURL=AuthenticationResult.d.ts.map
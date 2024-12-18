import { createAuthClient } from "better-auth/react";

const authClient = createAuthClient({
  baseURL: "https://porify.vercel.app/api/auth",
  advanced: {
    crossSubDomainCookies: {
      enabled: true,
    },
  },
});

export default authClient;

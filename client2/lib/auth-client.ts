import { createAuthClient } from "better-auth/react";

const authClient = createAuthClient({
  baseURL: "https://porify.vercel.app/api/auth",
  advanced: {
    defaultCookieAttributes: {
      sameSite: "none",
      secure: true,
    },
  },
});

export default authClient;

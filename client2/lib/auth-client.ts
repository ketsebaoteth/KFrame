import { createAuthClient } from "better-auth/react";

const authClient = createAuthClient({
  baseURL: "https://frame.nerdspacer.com/api/auth",
  advanced: {
    defaultCookieAttributes: {
      sameSite: "none",
      secure: true,
    },
  },
  // baseURL: "https://dev-portifolio-backend.vercel.app/api/auth",
});

export default authClient;

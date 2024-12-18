import { createAuthClient } from "better-auth/react";

const authClient = createAuthClient({
  advanced: {
    cookies: {
      sessionToken: {
        sameSite: "none",
        secure: true,
      },
    },
  },
  baseURL: "https://frame.nerdspacer.com/api/auth",
  // baseURL: "https://dev-portifolio-backend.vercel.app/api/auth",
});

export default authClient;

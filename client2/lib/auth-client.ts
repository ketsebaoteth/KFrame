import { createAuthClient } from "better-auth/react";

const authClient = createAuthClient({
  // baseURL: "https://frame.nerdspacer.com",
  baseURL: "https://dev-portifolio-backend.vercel.app/api/auth",
});

export default authClient;

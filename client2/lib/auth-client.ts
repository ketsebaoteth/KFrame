import { createAuthClient } from "better-auth/react";

const authClient = createAuthClient({
  baseURL: "https://frame-lovat.vercel.app/api/auth",
});

export default authClient;

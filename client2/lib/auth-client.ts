import { createAuthClient } from "better-auth/react";

const authClient = createAuthClient({
  baseURL: "https://frame1.nerdspacer.com",
});

export default authClient;

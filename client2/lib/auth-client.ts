import { createAuthClient } from "better-auth/react";

const authClient = createAuthClient({
  baseURL: "https://frame.nerdspacer.com",
});

export default authClient;

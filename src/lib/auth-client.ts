import { createAuthClient } from "better-auth/react";
import { adminClient, inferAdditionalFields } from "better-auth/client/plugins";
export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_API_URL,

  plugins: [
    inferAdditionalFields({
      user: {
        isOnboarded: {
          type: "boolean",
          input: false,
        },
        role: {
          type: "string",
          input: false,
        },
      },
    }),
    adminClient(),
  ],
});

export type SessionType = NonNullable<
  ReturnType<typeof authClient.useSession>["data"]
>;

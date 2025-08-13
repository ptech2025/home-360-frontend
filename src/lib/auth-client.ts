import { createAuthClient } from "better-auth/react";
import { adminClient, inferAdditionalFields } from "better-auth/client/plugins";
export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  plugins: [
    inferAdditionalFields({
      user: {
        phoneNumber: {
          type: "string",
          input: false,
        },
        companyLogo: {
          type: "string",
          input: false,
        },
        companyName: {
          type: "string",
          input: false,
        },
        location: {
          type: "string",
          input: false,
        },
        jobTitle: {
          type: "string",
          input: false,
        },
        priceMarkupPercentage: {
          type: "number",
          input: false,
        },
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

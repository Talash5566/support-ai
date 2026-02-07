import { Scalekit as ScalekitSDK } from "@scalekit-sdk/node";

export const Scalekit = new ScalekitSDK(
  process.env.SCALEKIT_ENVIRONMENT_URL!,
  process.env.SCALEKIT_CLIENT_ID!,
  process.env.SCALEKIT_CLIENT_SECRET!
);

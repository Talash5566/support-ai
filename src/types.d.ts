import type { Connection } from "@scalekit-sdk/node";

declare global {
  var mongoose: {
    conn: Connection | null;
    promise: Promise<Connection> | null;
  };
}

export {};

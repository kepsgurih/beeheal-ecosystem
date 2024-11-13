"use client";

import { ReactNode } from "react";
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";
import { getClerkUsers } from "./getClerkUser";

export function Room({ children, id }: { children: ReactNode, id: string }) {
  return (
    <LiveblocksProvider
      authEndpoint="/api/v1/live-block"
      resolveUsers={async ({ userIds }) => {
        const users = await getClerkUsers({ userIds })
        return users
      }}
    >
      <RoomProvider id={id}>
        <ClientSideSuspense fallback={<div>Loading…</div>}>
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}
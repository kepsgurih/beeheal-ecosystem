declare global {
    interface Liveblocks {
      UserMeta: {
        id: string;
        info: {
          // Example properties, for useSelf, useUser, useOthers, etc.
          name?: string;
          avatar?: string;
        };
      };
    }
  }
  export {};
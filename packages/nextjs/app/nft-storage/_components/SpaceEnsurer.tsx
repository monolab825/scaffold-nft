import React, { ReactNode, useEffect } from "react";
import { Loader } from "./Loader";
import { useW3 } from "@w3ui/react";

export function SpaceEnsurer({ children }: { children: ReactNode }): ReactNode {
  const [{ client }] = useW3();
  useEffect(
    function () {
      async function ensureCurrentSpace(): Promise<void> {
        if (client != null && client.currentSpace() == null) {
          await client?.setCurrentSpace(`did:key:z6MkhCcXJFhNaNTcjQ1ZVRdccBH61PBuUb1AZ1xK4GgyeGPe`);
          // const space = client.spaces().length > 0 ? client.spaces()[0] : await client.createSpace("example space");
          // if (space != null) {
          //   await client.setCurrentSpace(space.did());
          // }
        }
      }
      void ensureCurrentSpace();
    },
    [client],
  );

  return client != null ? children : <Loader />;
}

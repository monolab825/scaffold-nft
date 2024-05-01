import React, { ReactNode, useEffect } from "react";
import { Loader } from "./Loader";
import { useW3 } from "@w3ui/react";

export function SpaceEnsurer({ did, children }: { did: `did:${string}:${string}`; children: ReactNode }): ReactNode {
  const [{ client }] = useW3();
  useEffect(
    function () {
      async function ensureCurrentSpace(): Promise<void> {
        if (client != null && client.currentSpace() == null) {
          await client?.setCurrentSpace(did);

          // const space = await client?.createSpace("An example space");
          // await client.setCurrentSpace(space.did());

          // await client?.setCurrentSpace(did);
          // const space = client.spaces().length > 0 ? client.spaces()[0] : await client.createSpace("example space");
          // if (space != null) {
          //   await client.setCurrentSpace(space.did());
          // }
        }
      }
      void ensureCurrentSpace();
    },
    /* eslint-disable-next-line*/
    [client],
  );

  return client != null ? children : <Loader />;
}

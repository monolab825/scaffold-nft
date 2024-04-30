// import React, { ReactNode, useEffect, useState } from "react";
// import { Loader } from "./Loader";
// import { useW3 } from "@w3ui/react";
// import { v4 as uuidv4 } from "uuid";

// export function SpaceEnsurerCopy({
//   did,
//   children,
// }: {
//   did: `did:${string}:${string}`;
//   children: ReactNode;
// }): ReactNode {
//   const [selectedDid, setSelectedDid] = useState<`did:${string}:${string}`>();

//   const [{ client }] = useW3();
//   useEffect(
//     function () {
//       async function ensureCurrentSpace(): Promise<void> {
//         if (client != null && client.currentSpace() == null) {
//           if (did) await client?.setCurrentSpace(did);
//           // const space = client.spaces().length > 0 ? client.spaces()[0] : await client.createSpace("example space");
//           // if (space != null) {
//           //   await client.setCurrentSpace(space.did());
//           // }
//         }
//       }
//       void ensureCurrentSpace();
//     },
//     [client],
//   );

//   let output;

//   if (client != null) {
//     if (client.currentSpace() == null) {
//       // output = (
//       //   <>
//       //     <input
//       //       type="text"
//       //       id="first_name"
//       //       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//       //       placeholder="Scaffold NFT"
//       //       required
//       //       onChange={(event: any) => {
//       //         // onChange(event.target.value);
//       //       }}
//       //     />{" "}
//       //     <button
//       //       type="submit"
//       //       onClick={async () => {
//       //         console.log(client.currentSpace());
//       //         if (client.currentSpace() === undefined) {
//       //           const newSpace = await client?.createSpace(uuidv4());
//       //           console.log(newSpace);
//       //           await client.setCurrentSpace(newSpace.did());
//       //           console.log(newSpace);
//       //         }
//       //       }}
//       //       className="btn btn-primary m-1"
//       //     >
//       //       Upload
//       //     </button>
//       //   </>
//       // );
//     } else {
//       output = children;
//     }
//   } else {
//     output = <Loader />;
//   }

//   return output;
// }

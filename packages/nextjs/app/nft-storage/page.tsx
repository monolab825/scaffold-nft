"use client";

// import { AuthenticationEnsurer } from "./_components/Authenticator";
// import { Identity } from "./_components/Identity";
// import { MyUploader } from "./_components/MyUploader";
// import { SpaceEnsurer } from "./_components/SpaceEnsurer";
// import {
//   //Authenticator,
//   Provider,
// } from "@w3ui/react";
// import { useEffect } from "react";
// import { useDatamodel } from "./MyProvider";
// import { createClient } from "@w3ui/core";
import type { NextPage } from "next";

// import scaffoldConfig from "~~/scaffold.config";

const NftStoragePage: NextPage = () => {
  // const { client, accounts, spaces, logout } = useProvider({});
  // useDatamodel({});

  // useEffect(() => {
  //   async function get() {
  //     await createClient({});
  //   }
  //   get();
  // }, []);
  // console.log(accounts);
  // console.log(spaces);
  // console.log(logout);

  return (
    <div className="flex flex-col items-center justify-center">
      {/* <Provider> */}
      {/* <Authenticator> */}
      {/* <AuthenticationEnsurer>
            <Identity />
            <SpaceEnsurer did={scaffoldConfig.did as `did:${string}:${string}`}>
              <MyUploader />
            </SpaceEnsurer>
          </AuthenticationEnsurer> */}
      {/* </Authenticator> */}
      {/* </Provider> */}
    </div>
  );
};

export default NftStoragePage;

"use client";

import { AuthenticationEnsurer } from "./_components/Authenticator";
import { Identity } from "./_components/Identity";
import { MyUploader } from "./_components/MyUploader";
import { SpaceEnsurer } from "./_components/SpaceEnsurer";
import { Authenticator, Provider } from "@w3ui/react";
import type { NextPage } from "next";
import scaffoldConfig from "~~/scaffold.config";

const NftStoragePage: NextPage = () => {
  console.log(scaffoldConfig);
  return (
    <div className="flex flex-col items-center justify-center">
      <Provider>
        <Authenticator>
          <AuthenticationEnsurer>
            <Identity />
            <SpaceEnsurer did={scaffoldConfig.did as `did:${string}:${string}`}>
              <MyUploader />
            </SpaceEnsurer>
          </AuthenticationEnsurer>
        </Authenticator>
      </Provider>
    </div>
  );
};

export default NftStoragePage;
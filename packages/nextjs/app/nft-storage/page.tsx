"use client";

// import { AuthenticationEnsurer } from "./_components/Authenticator";
// import { Identity } from "./_components/Identity";
// import { MyUploader } from "./_components/MyUploader";
// import { SpaceEnsurer } from "./_components/SpaceEnsurer";
// import { useEffect } from "react";
// import * as DID from "@ipld/dag-ucan/did";
// import { connect } from "@ucanto/client";
// import { CAR, HTTP } from "@ucanto/transport";
// import { StoreIndexedDB } from "@web3-storage/access/stores/store-indexeddb";
// import scaffoldConfig from "~~/scaffold.config";
// import { create } from "@web3-storage/w3up-client";
// import { useDatamodel } from "./MyProvider";
// import { createClient } from "@w3ui/core";
import type { NextPage } from "next";

// import { AgentData } from '@web3-storage/access/agent';
// import { Client } from './client.js';
// import { generate } from '@ucanto/principal/rsa';

// const DB_NAME = "@w3ui";
// const DB_STORE_NAME = "core";

// export async function create(options: any = {}) {
//   const store = options.store ?? new StoreIndexedDB('w3up-client');
//   const raw = await store.load();
//   if (raw) {
//       const data = AgentData.fromExport(raw, { store });
//       if (options.principal && data.principal.did() !== options.principal.did()) {
//           throw new Error(`store cannot be used with ${options.principal.did()}, stored principal and passed principal must match`);
//       }
//       return new Client(data, options);
//   }
//   const principal = options.principal ?? (await generate());
//   const data = await AgentData.create({ principal }, { store });
//   return new Client(data, options);
// }

// function createServiceConf({ servicePrincipal, connection }: any = {}) {
//   const id = servicePrincipal != null ? servicePrincipal : DID.parse("did:web:web3.storage");
//   const serviceConnection =
//     connection != null
//       ? connection
//       : connect({
//           id,
//           codec: CAR.outbound,
//           channel: HTTP.open<any>({
//             url: new URL("https://up.web3.storage"),
//             method: "POST",
//           }),
//         });
//   return {
//     access: serviceConnection,
//     upload: serviceConnection,
//     filecoin: serviceConnection,
//   };
// }

// /**
//  * An IndexedDB store that dispatches an event on the passed EventTarget when
//  * `save` is called.
//  */ class IndexedDBEventDispatcherStore extends StoreIndexedDB {
//   #events;
//   constructor(name: any, events: any) {
//     super(name, {
//       dbVersion: 1,
//       dbStoreName: DB_STORE_NAME,
//     });
//     this.#events = events;
//   }
//   async save(data: any) {
//     await super.save(data);
//     this.#events.dispatchEvent(
//       new CustomEvent("store:save", {
//         detail: data,
//       }),
//     );
//   }
// }

// /**
//  * Create an agent for managing identity. It uses RSA keys that are stored in
//  * IndexedDB as unextractable `CryptoKey`s.
//  */ async function createClient(options: any) {
//   const dbName = `${DB_NAME}${options?.servicePrincipal != null ? "@" + options?.servicePrincipal.did() : ""}`;
//   const events = options?.events ?? new EventTarget();
//   const store = new IndexedDBEventDispatcherStore(dbName, events);
//   const serviceConf = createServiceConf(options);
//   const client = await create({
//     store,
//     serviceConf,
//   });
//   return {
//     client,
//     events,
//     store,
//   };
// }

// import {
//   //Authenticator,
//   Provider,
// } from "@w3ui/react";

const NftStoragePage: NextPage = () => {
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

"use client";

import { AuthenticationEnsurer } from "./_components/Authenticator";
import { SpaceEnsurer } from "./_components/SpaceEnsurer";
import { UploaderForm } from "./_components/Uploader";
import { Authenticator, Provider, Uploader, useW3 } from "@w3ui/react";
// import { create } from "@web3-storage/w3up-client";
import type { NextPage } from "next";

function Identity() {
  const [{ client, accounts }, { logout }] = useW3();

  async function setCurrentSpace() {
    const result = await client?.setCurrentSpace(`did:key:z6MkhCcXJFhNaNTcjQ1ZVRdccBH61PBuUb1AZ1xK4GgyeGPe`);

    console.log(result);
  }

  return (
    <>
      {
        <div className="m-12">
          <button
            onClick={async () => {
              await setCurrentSpace();
            }}
          >
            Set
          </button>
          ;
          <button
            onClick={async () => {
              await logout();
            }}
            className="inline-block bg-zinc-950 hover:outline text-white font-bold text-sm px-6 py-2 rounded-full whitespace-nowrap"
          >
            Logout
          </button>
          <p className="mb-6">
            {`You're signed in as`} <b>{accounts[0].toEmail()}</b>.
          </p>
          <p>{`Your local agent's DID is`}</p>
          <p className="max-w-xl overflow-hidden text-ellipsis">{client?.agent.did()}</p>
        </div>
      }
    </>
  );
}

const NftStoragePage: NextPage = () => {
  // const onSubmit = async (event: any) => {
  //   event.preventDefault();

  //   // let res = await fetch("http://localhost:8080", {
  //   //   headers: {
  //   //     Accept: "application/json",
  //   //     "Content-Type": "application/json",
  //   //   },
  //   //   method: "POST",
  //   //   body: JSON.stringify({ a: 1, b: "Textual content" }),
  //   // });

  //   // console.log(await res.json());

  //   const client = await create();

  //   try {
  //     console.log("Logging in...");

  //     await client.login("homanicsjake@gmail.com");
  //     //setPleaseCheckYourEmail(true);
  //     console.log("Logged in!");
  //   } catch (e) {
  //     console.log(e);
  //     return e;
  //   }

  //   // try {
  //   //   await client.setCurrentSpace("did:key:z6MkhCcXJFhNaNTcjQ1ZVRdccBH61PBuUb1AZ1xK4GgyeGPe");
  //   //   console.log("Current space set!");
  //   // } catch (e) {
  //   //   console.log(e);
  //   // }

  //   // const client = new NFTStorage({ token: "abfdf65a.cb58d9d119bb41bf84445fc53f235f1e" });

  //   // const nameInput = event.target["0"] as any;
  //   // const fileInput = event.target["1"] as any;
  //   // console.log(nameInput.value);
  //   // console.log(fileInput.value);

  //   // try {
  //   //   const metadata = await client.store({
  //   //     name: "This is a test name",
  //   //     description: "Using the nft.storage metadata API to create ERC-1155 compatible metadata.",
  //   //     image: fileInput.files[0],
  //   //   });

  //   //   console.log({ "IPFS URL for the metadata": metadata.url });
  //   //   console.log({ "metadata.json contents": metadata.data });
  //   //   console.log({ "metadata.json contents with IPFS gateway URLs": metadata.embed() });
  //   // } catch (err) {
  //   //   console.error(err);
  //   // }
  // };

  // const [{ client }] = useW3();

  // let output;

  // console.log(client);

  return (
    <div>
      {/* {output} */}
      <Provider>
        <Authenticator>
          <AuthenticationEnsurer>
            <Identity />
            <SpaceEnsurer>
              <Uploader>
                <UploaderForm />
              </Uploader>
            </SpaceEnsurer>
          </AuthenticationEnsurer>
        </Authenticator>
      </Provider>

      {/* <div>
        <form onSubmit={onSubmit}>
          <label>
            {" "}
            Name: <input name="name" type="text" />{" "}
          </label>
          <label>
            {" "}
            Image: <input name="file" type="file" />{" "}
          </label>
          <div>
            <button type="submit">Store</button>
          </div>
        </form>
      </div> */}
    </div>
  );
};

export default NftStoragePage;

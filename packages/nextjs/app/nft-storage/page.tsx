"use client";

import { create } from "@web3-storage/w3up-client";
import type { NextPage } from "next";

const NftStoragePage: NextPage = () => {
  const onSubmit = async (event: any) => {
    event.preventDefault();

    // let res = await fetch("http://localhost:8080", {
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json",
    //   },
    //   method: "POST",
    //   body: JSON.stringify({ a: 1, b: "Textual content" }),
    // });

    // console.log(await res.json());

    const client = await create();

    try {
      console.log("Logging in...");

      await client.login("homanicsjake@gmail.com");
      //setPleaseCheckYourEmail(true);
      console.log("Logged in!");
    } catch (e) {
      console.log(e);
      return e;
    }

    // try {
    //   await client.setCurrentSpace("did:key:z6MkhCcXJFhNaNTcjQ1ZVRdccBH61PBuUb1AZ1xK4GgyeGPe");
    //   console.log("Current space set!");
    // } catch (e) {
    //   console.log(e);
    // }

    // const client = new NFTStorage({ token: "abfdf65a.cb58d9d119bb41bf84445fc53f235f1e" });

    // const nameInput = event.target["0"] as any;
    // const fileInput = event.target["1"] as any;
    // console.log(nameInput.value);
    // console.log(fileInput.value);

    // try {
    //   const metadata = await client.store({
    //     name: "This is a test name",
    //     description: "Using the nft.storage metadata API to create ERC-1155 compatible metadata.",
    //     image: fileInput.files[0],
    //   });

    //   console.log({ "IPFS URL for the metadata": metadata.url });
    //   console.log({ "metadata.json contents": metadata.data });
    //   console.log({ "metadata.json contents with IPFS gateway URLs": metadata.embed() });
    // } catch (err) {
    //   console.error(err);
    // }
  };

  return (
    <div>
      <div>
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
      </div>
    </div>
  );
};

export default NftStoragePage;

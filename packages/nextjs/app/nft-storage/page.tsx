"use client";

import type { NextPage } from "next";
import { NFTStorage } from "nft.storage";

const NftStoragePage: NextPage = () => {
  const onSubmit = async (event: any) => {
    event.preventDefault();

    console.log(event);

    const client = new NFTStorage({ token: "abfdf65a.cb58d9d119bb41bf84445fc53f235f1e" });

    const nameInput = event.target["0"] as any;
    const fileInput = event.target["1"] as any;
    console.log(nameInput.value);
    console.log(fileInput.value);

    try {
      const metadata = await client.store({
        name: "This is a test name",
        description: "Using the nft.storage metadata API to create ERC-1155 compatible metadata.",
        image: fileInput.files[0],
      });

      console.log({ "IPFS URL for the metadata": metadata.url });
      console.log({ "metadata.json contents": metadata.data });
      console.log({ "metadata.json contents with IPFS gateway URLs": metadata.embed() });
    } catch (err) {
      console.error(err);
    }
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

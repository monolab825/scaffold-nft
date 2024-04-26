"use client";

import type { NextPage } from "next";
import { NftCard } from "~~/components/nft-card/NftCard";
// import { NameCard, NameCardProps } from "~~/components/NftCardValue/NameCard";
import { useToken } from "~~/hooks/useToken";

const Home: NextPage = () => {
  const token = useToken(BigInt(4), "nftstorage");

  //414x264
  return (
    <div>
      {/* <div className="flex justify-center">
        <p>hello</p>
      </div> */}

      <div className="flex flex-wrap justify-center m-1 p-1 bg-base-100 rounded">
        <NftCard token={token} renderOrder={["Image", "Name", "Description", "Attributes"]} />
        <NftCard
          token={token}
          collectionDataLoadType="Individual"
          renderOrder={["Image", "Name", "Id", "CollectionName", "CollectionSymbol", "Address"]}
        />
        <NftCard token={token} renderOrder={["Image", "Name"]} />
        <NftCard token={token} renderOrder={["Image"]} />
        <NftCard token={token} renderOrder={["Image"]} />
      </div>

      {/* <div className="flex justify-center">
        <NftCard token={token} />
      </div> */}

      {/* <button
        onClick={async () => {
          await writeErc721Async({
            functionName: "mint",
            args: [connectedAddress],
          });
        }}
      >
        Mint
      </button> */}
    </div>
  );
};

export default Home;

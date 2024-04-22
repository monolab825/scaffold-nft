"use client";

import type { NextPage } from "next";
import { NftCard } from "~~/components/NftCard";
// import { NameCard, NameCardProps } from "~~/components/NftCardValue/NameCard";
import { useToken } from "~~/hooks/useToken";

const Home: NextPage = () => {
  const token = useToken(BigInt(4), "nftstorage");

  return (
    <>
      <NftCard
        token={token}
        // prettyLoad={{
        //   values: {
        //     image: true,
        //     name: true,
        //     description: true,
        //     attributes: true,
        //     collectionName: true,
        //     collectionSymbol: true,
        //     id: true,
        //   },
        // }}
        renderOrder={[
          "Image",
          "Name",
          "Description",
          "Attributes",
          "Id",
          "CollectionName",
          "CollectionSymbol",
          "Address",
        ]}
      />

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
    </>
  );
};

export default Home;

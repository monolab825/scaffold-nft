"use client";

import type { NextPage } from "next";
import { CollectionLoadType, NftCard } from "~~/components/NftCard";
import { NameCard, NameCardProps } from "~~/components/NftCardValue/NameCard";
// import { NameCard, NameCardProps } from "~~/components/NftCardValue/NameCard";
import { useToken } from "~~/hooks/useToken";

const NameCardComponent = (props: NameCardProps) => {
  return <NameCard {...props} prettyLoad={true} />;
};

const Home: NextPage = () => {
  const token = useToken(BigInt(4), "nftstorage");

  return (
    <>
      <NftCard
        token={token}
        collectionDataLoadType={CollectionLoadType.Together}
        NameCard={NameCardComponent}
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
        // renderOrder={
        //   [
        //     // "Image",
        //     // "Name",
        //     // "Description",
        //     // "Attributes",
        //     // "Id",
        //     // "CollectionName",
        //     // "CollectionSymbol",
        //     // "CollectionDetails",
        //     // "Address",
        //   ]
        // }
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

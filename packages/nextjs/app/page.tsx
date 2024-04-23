"use client";

import type { NextPage } from "next";
import { NftCard } from "~~/components/nft-card/NftCard";
// import { NameCard, NameCardProps } from "~~/components/NftCardValue/NameCard";
import { useToken } from "~~/hooks/useToken";

const Home: NextPage = () => {
  const token = useToken(BigInt(4), "nftstorage");

  return (
    <div className="flex justify-center">
      <NftCard token={token} />

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

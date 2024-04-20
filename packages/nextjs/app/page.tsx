"use client";

import type { NextPage } from "next";
import { NftCard } from "~~/components/NftCard";
import { useToken } from "~~/hooks/useToken";

const Home: NextPage = () => {
  const token = useToken(BigInt(1), "nftstorage");

  return (
    <>
      <div className="flex items-center flex-col flex-grow pt-10">
        <NftCard
          token={token}
          prettyLoad={{ card: true, values: { image: true, name: true, description: true, attributes: true } }}
        />
      </div>

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

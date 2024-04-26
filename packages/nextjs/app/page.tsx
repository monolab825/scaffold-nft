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
        <NftCard token={token} />
        <NftCard token={token} />
        <NftCard token={token} />
        <NftCard token={token} />
        <NftCard token={token} />
        <NftCard token={token} />
        <NftCard token={token} />
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

"use client";

import { useState } from "react";
import type { NextPage } from "next";
import { NftCard } from "~~/components/nft-card/NftCard";
// import { NameCard, NameCardProps } from "~~/components/NftCardValue/NameCard";
import { useToken, useTokens } from "~~/hooks/useToken";

const inputOptions: any[] = [
  "Image",
  "Name",
  "Description",
  "Attributes",
  "Address",
  "CollectionName",
  "CollectionSymbol",
  "Id",
];

const Home: NextPage = () => {
  const [checkeds, setCheckeds] = useState<boolean[]>([true, true, true, true, true, true, true, true]);

  const handleChange = (index: number) => {
    const temp: boolean[] = checkeds;

    temp[index] = !temp[index];

    setCheckeds([...temp]);
  };

  const inputComponents = inputOptions.map((inputName, index) => {
    return (
      <div key={index + "-input"}>
        <label className="m-1">
          {inputName}
          <input
            className="m-1"
            type="checkbox"
            checked={checkeds[index]}
            onChange={() => {
              handleChange(index);
            }}
          />
        </label>
      </div>
    );
  });

  const componentsToRender: any = [];
  for (let i = 0; i < checkeds.length; i++) {
    if (checkeds[i]) componentsToRender.push(inputOptions[i]);
  }

  const token = useToken(BigInt(4), "nftstorage");

  const tokens = useTokens([BigInt(1), BigInt(2), BigInt(3), BigInt(4)], "nftstorage");

  const tokensComponents = tokens.map((token, index) => {
    return <NftCard key={index} token={token} renderOrder={componentsToRender} />;
  });

  return (
    <div>
      <div className="flex flex-wrap">{inputComponents}</div>
      <div className="flex flex-wrap justify-center m-1 p-1 bg-base-100 rounded">
        {tokensComponents}
        <NftCard token={token} />
      </div>
    </div>
  );
};

export default Home;

"use client";

import { useState } from "react";
import { NftCard } from "~~/components/nft-card/NftCard";
import { useTokens } from "~~/hooks/useTokens2";

const inputOptions: any[] = [
  "Image",
  "Name",

  "Id",
  "Description",
  "Attributes",
  "Address",
  "CollectionName",
  "CollectionSymbol",
];

export default function Collection({ params }: { params: { network: string; address: string } }) {
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

  const tokens = useTokens(
    params["network"],
    params["address"],
    [BigInt(1), BigInt(2), BigInt(3), BigInt(4)],
    "nftstorage",
  );

  const tokensComponents = tokens.map((token, index) => {
    return <NftCard key={index} token={token} renderOrder={componentsToRender} collectionDataLoadType="Individual" />;
  });

  return (
    <div>
      <div className="flex flex-wrap">{inputComponents}</div>
      <div className="flex flex-wrap justify-center m-1 p-1 bg-base-100 rounded">{tokensComponents}</div>{" "}
    </div>
  );
}

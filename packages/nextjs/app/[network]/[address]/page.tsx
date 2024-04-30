"use client";

import { useState } from "react";
import React from "react";
import "react-dropdown/style.css";
import Select from "react-select";
import { NftCard } from "~~/components/nft-card/NftCard";
import { AddressCard, AddressCardProps } from "~~/components/nft-card/values/AddressCard";
import { CollectionNameCard, CollectionNameCardProps } from "~~/components/nft-card/values/CollectionNameCard";
import { CollectionSymbolCard, CollectionSymbolCardProps } from "~~/components/nft-card/values/CollectionSymbolCard";
import { CollectionDetails } from "~~/components/nft-card/values/extensions/CollectionDetails";
import { useTokens } from "~~/hooks/useTokens2";

const AddressCardComponent = (props: AddressCardProps) => {
  return <AddressCard {...props} bgColor="bg-base-300" />;
};

const CollectionNameCardComponent = (props: CollectionNameCardProps) => {
  return <CollectionNameCard {...props} bgColor="bg-base-300" />;
};

const CollectionSymbolCardComponent = (props: CollectionSymbolCardProps) => {
  return <CollectionSymbolCard {...props} bgColor="bg-base-300" />;
};

const inputOptions: any[] = [
  "Image",
  "Id",
  "Name",
  "Description",
  "Attributes",
  "Address",
  "CollectionName",
  "CollectionSymbol",
];

export default function Collection({ params }: { params: { network: string; address: string } }) {
  const [checkeds, setCheckeds] = useState<boolean[]>([true, true, true, true, true, false, false, false]);

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

  const options = [
    { value: "ipfs", label: "IPFS" },
    { value: "nftstorage", label: "NFT Storage" },
    { value: "w3s", label: "web3.storage" },
  ];

  const [selectedDropdownOption, setSelectedDropdownOption] = useState<"ipfs" | "nftstorage" | "w3s">(
    options[1].value as "ipfs" | "nftstorage" | "w3s",
  );

  async function onChange2(event: any) {
    setSelectedDropdownOption(event.value);
    await refetch();
  }

  const { tokens, refetch } = useTokens(
    params["network"],
    params["address"],
    [BigInt(1), BigInt(2), BigInt(3), BigInt(4), BigInt(5), BigInt(6), BigInt(7), BigInt(8), BigInt(9), BigInt(10)],
    selectedDropdownOption,
  );

  console.log(tokens);

  const tokensComponents = tokens.map((token, index) => {
    return <NftCard key={index} token={token} renderOrder={componentsToRender} />;
  });

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-wrap">{inputComponents}</div>
      <div className="bg-base-100 rounded p-1">
        <p className="text-center m-0">Metadata Load Type</p>
        <Select options={options} className="text-black w-64" onChange={onChange2} defaultValue={options[1]} />
      </div>
      <div className="w-full">
        <CollectionDetails
          token={tokens[0]}
          showDescriptor={true}
          bgColor="bg-base-100"
          AddressCard={AddressCardComponent}
          CollectionNameCard={CollectionNameCardComponent}
          CollectionSymbolCard={CollectionSymbolCardComponent}
        />
      </div>
      <div className="flex flex-wrap justify-center m-1 p-1 bg-base-100 rounded lg:max-w-[1300px]">
        {tokensComponents}
      </div>{" "}
    </div>
  );
}

"use client";

import { useState } from "react";
import React from "react";
// import Select from "react-select";
import Select from "react-dropdown-select";
import "react-dropdown/style.css";
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

  const [backEndOption, setBackendOption] = useState<"ipfs" | "nftstorage" | "w3s">();

  async function onChange2(event: any) {
    setSelectedDropdownOption(event.value);
  }

  const [renderedTokenIds, setRenderedTokenIds] = useState<bigint[]>([
    BigInt(1),
    BigInt(2),
    BigInt(3),
    BigInt(4),
    BigInt(5),
    BigInt(6),
    BigInt(7),
    BigInt(8),
    BigInt(9),
    BigInt(10),
  ]);

  const { tokens, isLoading } = useTokens(params["network"], params["address"], renderedTokenIds, backEndOption);

  const tokensComponents = tokens.map((token, index) => {
    return <NftCard key={index} token={token} renderOrder={componentsToRender} />;
  });

  // const [startIndex, setStartIndex] = useState(1);

  // const [numToRender, setNumToRender] = useState(10);

  async function onSubmit(event: any) {
    event.preventDefault();
    // console.log("Submitted");
    // console.log(event);
    // console.log(event.target[0].value); // number to render

    // setNumToRender(event.target[0].value);
    // console.log(event.target[1].value); // start index
    // setStartIndex(event.target[1].value);
    // console.log(event); //load type

    setBackendOption(selectedDropdownOption);

    const tempArr = [];

    for (let i = event.target[1].value; i < Number(event.target[1].value) + Number(event.target[0].value); i++) {
      tempArr.push(BigInt(i));
    }

    console.log(tempArr);

    setRenderedTokenIds([...tempArr]);

    // if (event.target[1].value == 0) {
    //   for (let i = 0; i < event.target[0].value; i++) {
    //     tempArr.push(BigInt(i));
    //   }
    // } else {
    //   for (let i = event.target[1].value; i <= event.target[0].value; i++) {
    //     tempArr.push(BigInt(i));
    //   }
    // }

    // console.log(tempArr);
    // setRenderedTokenIds([...tempArr]);
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-wrap">{inputComponents}</div>
      <form
        onSubmit={(event: any) => {
          onSubmit(event);
        }}
      >
        <div className="bg-base-100 rounded p-1 flex flex-col items-center justify-center ">
          <p className="text-center m-0">Number To Render</p>

          <div className={`flex border-2 border-base-300 bg-base-200 rounded-full text-accent`}>
            <input
              className="input input-ghost focus-within:border-transparent focus:outline-none focus:bg-transparent focus:text-gray-400 h-[2.2rem] min-h-[2.2rem] px-4 border w-full font-medium placeholder:text-accent/50 text-gray-400"
              placeholder={"1"}
              defaultValue={5}
              // onChange={(event: any) => {
              //   setNumToRender(event.target.value);
              // }}
            />
            <br />
          </div>

          <p className="text-center m-0">Start Index</p>

          <div className={`flex border-2 border-base-300 bg-base-200 rounded-full text-accent`}>
            <input
              className="input input-ghost focus-within:border-transparent focus:outline-none focus:bg-transparent focus:text-gray-400 h-[2.2rem] min-h-[2.2rem] px-4 border w-full font-medium placeholder:text-accent/50 text-gray-400"
              placeholder={"1"}
              defaultValue={1}
              // onChange={(event: any) => {
              //   setStartIndex(event.target.value);
              // }}
            />
          </div>
          <p className="text-center m-0">Metadata Load Type</p>
          <div className="w-64">
            <Select options={options} className="text-black bg-base-100" onChange={onChange2} values={options} />
          </div>

          <button type="submit" className="btn btn-sm btn-primary">
            Refresh
          </button>
        </div>
      </form>
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
        {isLoading ? <p>Loading...</p> : tokensComponents}
        {/* {tokensComponents} */}
      </div>{" "}
    </div>
  );
}

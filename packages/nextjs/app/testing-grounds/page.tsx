"use client";

import type { NextPage } from "next";
import { NftCard } from "~~/components/nft-card/NftCard";
import { AddressCard, AddressCardProps } from "~~/components/nft-card/values/AddressCard";
import { CollectionNameCard, CollectionNameCardProps } from "~~/components/nft-card/values/CollectionNameCard";
import { CollectionSymbolCard, CollectionSymbolCardProps } from "~~/components/nft-card/values/CollectionSymbolCard";
import { CollectionDetails } from "~~/components/nft-card/values/extensions/CollectionDetails";
import useCheckboxes from "~~/hooks/useCheckboxes";
import { useTokens } from "~~/hooks/useToken";

const inputOptions2: any[] = [
  { value: "Image", defaultValue: true },
  { value: "Id", defaultValue: true },
  { value: "Name", defaultValue: true },
  { value: "Description", defaultValue: true },
  { value: "Attributes", defaultValue: true },
  { value: "Address", defaultValue: true },
  { value: "CollectionName", defaultValue: true },
  { value: "CollectionSymbol", defaultValue: true },
];

const AddressCardComponent = (props: AddressCardProps) => {
  return <AddressCard {...props} bgColor="bg-base-300" />;
};

const CollectionNameCardComponent = (props: CollectionNameCardProps) => {
  return <CollectionNameCard {...props} bgColor="bg-base-300" />;
};

const CollectionSymbolCardComponent = (props: CollectionSymbolCardProps) => {
  return <CollectionSymbolCard {...props} bgColor="bg-base-300" />;
};

const TestingGrounds: NextPage = () => {
  const { inputComponents, componentsToRender } = useCheckboxes(inputOptions2);

  const arr = [];
  for (let i = 1; i <= 10; i++) {
    arr.push(BigInt(i));
  }
  const tokens = useTokens(arr, "w3s");

  const tokensComponents = tokens.map((token, index) => {
    console.log(componentsToRender);

    return <NftCard key={index} token={token} renderOrder={componentsToRender} />;
  });

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex flex-wrap">{inputComponents}</div>
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
      </div>
    </div>
  );
};

export default TestingGrounds;

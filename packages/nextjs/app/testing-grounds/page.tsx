"use client";

import { useState } from "react";
import type { NextPage } from "next";
import { NftCard } from "~~/components/nft-card/NftCard";
import { AddressCard, AddressCardProps } from "~~/components/nft-card/values/AddressCard";
import { CollectionNameCard, CollectionNameCardProps } from "~~/components/nft-card/values/CollectionNameCard";
import { CollectionSymbolCard, CollectionSymbolCardProps } from "~~/components/nft-card/values/CollectionSymbolCard";
import { CollectionDetails } from "~~/components/nft-card/values/extensions/CollectionDetails";
import useAdvancedFiltering from "~~/hooks/useAdvancedFiltering";
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

  async function onSubmit(newIds: bigint[]) {
    setRenderedTokenIds([...newIds]);
    // await refetch();
  }

  const { backEndOption, output: advancedOutput } = useAdvancedFiltering(inputComponents, onSubmit);

  const { tokens, isLoading, isError } = useTokens(renderedTokenIds, backEndOption);

  const tokensComponents = tokens.map((token, index) => {
    return <NftCard key={index} token={token} renderOrder={componentsToRender} />;
  });

  let mainContent;
  if (isLoading) {
    mainContent = <p>Loading...</p>;
  } else {
    if (isError) {
      mainContent = <p>There was an error. Please try changing the advanced settings.</p>;
    } else {
      mainContent = tokensComponents;
    }
  }

  return (
    <div className="flex flex-col items-center justify-center">
      {advancedOutput}
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
      <div className="flex flex-wrap justify-center m-1 p-1 bg-base-100 rounded lg:max-w-[1300px]">{mainContent}</div>{" "}
    </div>
  );
};

export default TestingGrounds;

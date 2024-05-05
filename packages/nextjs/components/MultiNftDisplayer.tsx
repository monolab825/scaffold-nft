"use client";

import React from "react";
// import { useState } from "react";
import "react-dropdown/style.css";
import { renderInputOptions } from "~~/app/nftCollectionPagesConfig";
import { NftCard } from "~~/components/nft-card/NftCard";
import { AddressCard, AddressCardProps } from "~~/components/nft-card/values/AddressCard";
import { CollectionNameCard, CollectionNameCardProps } from "~~/components/nft-card/values/CollectionNameCard";
import { CollectionSymbolCard, CollectionSymbolCardProps } from "~~/components/nft-card/values/CollectionSymbolCard";
import { CollectionDetails } from "~~/components/nft-card/values/extensions/CollectionDetails";
import useAdvancedFiltering from "~~/hooks/useAdvancedFiltering";
import useCheckboxes from "~~/hooks/useCheckboxes";
import useTokenIds from "~~/hooks/useTokenIds";

// import { useTokens } from "~~/hooks/useTokens2";

const AddressCardComponent = (props: AddressCardProps) => {
  return <AddressCard {...props} bgColor="bg-base-300" />;
};

const CollectionNameCardComponent = (props: CollectionNameCardProps) => {
  return <CollectionNameCard {...props} bgColor="bg-base-300" />;
};

const CollectionSymbolCardComponent = (props: CollectionSymbolCardProps) => {
  return <CollectionSymbolCard {...props} bgColor="bg-base-300" />;
};

type Props = {
  tokenMethod: any;
};

export const MultiNftDisplayer = ({ tokenMethod }: Props) => {
  const { inputComponents, componentsToRender } = useCheckboxes(renderInputOptions);

  const {
    //tokenIds,
    setTokenIds,
  } = useTokenIds(15);
  async function onSubmit(newIds: bigint[]) {
    setTokenIds([...newIds]);
  }

  const {
    //chosenOption,
    output: advancedOutput,
  } = useAdvancedFiltering(inputComponents, onSubmit);

  const { tokens, isLoading, isError } = tokenMethod();

  //   const { tokens, isLoading, isError } = useTokens(params["network"], params["address"], tokenIds, backEndOption);

  const tokensComponents = tokens.map((token: any, index: number) => {
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

"use client";

import React from "react";
import "react-dropdown/style.css";
import { renderInputOptions } from "~~/app/nftCollectionPagesConfig";
import { Collection as CollectionCard } from "~~/components/Collection";
import useAdvancedFiltering from "~~/hooks/useAdvancedFiltering";
import useCheckboxes from "~~/hooks/useCheckboxes";
import useTokenIds from "~~/hooks/useTokenIds";
import { useTokens } from "~~/hooks/useTokens2";

export default function Collection({ params }: { params: { network: string; address: string } }) {
  const { inputComponents, componentsToRender } = useCheckboxes(renderInputOptions);

  const { tokenIds, setTokenIds } = useTokenIds(15);
  async function onSubmit(newIds: bigint[]) {
    setTokenIds([...newIds]);
  }

  const { chosenOption, output: advancedOutput } = useAdvancedFiltering(inputComponents, onSubmit);

  const { collection, isLoading, isError } = useTokens(params["network"], params["address"], tokenIds, chosenOption);

  return (
    <div className="flex flex-col items-center justify-center">
      {advancedOutput}
      <CollectionCard
        collection={collection}
        isLoading={isLoading}
        isError={isError}
        renderOrder={componentsToRender}
      />
    </div>
  );
}

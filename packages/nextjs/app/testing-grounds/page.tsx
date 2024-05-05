"use client";

import { renderInputOptions } from "../nftCollectionPagesConfig";
import type { NextPage } from "next";
import { Collection } from "~~/components/Collection";
import useAdvancedFiltering from "~~/hooks/useAdvancedFiltering";
import useCheckboxes from "~~/hooks/useCheckboxes";
import { useScaffoldTokens } from "~~/hooks/useScaffoldTokens";
import useTokenIds from "~~/hooks/useTokenIds";

const TestingGrounds: NextPage = () => {
  const { inputComponents, componentsToRender } = useCheckboxes(renderInputOptions);

  const { tokenIds, setTokenIds } = useTokenIds(15);
  async function onSubmit(newIds: bigint[]) {
    setTokenIds([...newIds]);
  }

  const { chosenOption, output: advancedOutput } = useAdvancedFiltering(inputComponents, onSubmit);

  const { collection, isLoading, isError } = useScaffoldTokens(tokenIds, chosenOption);

  return (
    <div className="flex flex-col items-center justify-center">
      {advancedOutput}
      <Collection collection={collection} isLoading={isLoading} isError={isError} renderOrder={componentsToRender} />
    </div>
  );
};

export default TestingGrounds;

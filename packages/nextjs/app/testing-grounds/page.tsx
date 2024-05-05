"use client";

import { renderInputOptions } from "../nftCollectionPagesConfig";
import type { NextPage } from "next";
import { Tokens } from "~~/components/Tokens";
import useAdvancedFiltering from "~~/hooks/useAdvancedFiltering";
import useCheckboxes from "~~/hooks/useCheckboxes";
import { useTokens } from "~~/hooks/useToken";
import useTokenIds from "~~/hooks/useTokenIds";

const TestingGrounds: NextPage = () => {
  const { inputComponents, componentsToRender } = useCheckboxes(renderInputOptions);

  const { tokenIds, setTokenIds } = useTokenIds(15);
  async function onSubmit(newIds: bigint[]) {
    setTokenIds([...newIds]);
  }

  const { chosenOption, output: advancedOutput } = useAdvancedFiltering(inputComponents, onSubmit);

  const { tokens, isLoading, isError } = useTokens(tokenIds, chosenOption);

  return (
    <div className="flex flex-col items-center justify-center">
      {advancedOutput}
      <Tokens tokens={tokens} isLoading={isLoading} isError={isError} renderOrder={componentsToRender} />
    </div>
  );
};

export default TestingGrounds;

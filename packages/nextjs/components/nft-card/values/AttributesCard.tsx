"use client";

import { Style, styleMap } from "../types/Types";

export type AttributesCardProps = {
  value?: { trait_type: string; value: string }[];
  style?: Style;

  prettyLoad?: boolean;
  showDescriptor?: boolean;
};

export const AttributesCard = ({
  value,
  prettyLoad = false,
  showDescriptor,
  style = "rounded",
}: AttributesCardProps) => {
  const components = value?.map((attribute: any, index: number) => {
    return (
      <div key={index} className={`bg-base-100 w-[115px] text-center m-2 ${styleMap[style]}`}>
        <p className="text-sm">{attribute["trait_type"]}</p>
        <p className="text-lg">{attribute["value"]}</p>
      </div>
    );
  });

  let output;

  if (prettyLoad) {
    output = value ? components : <p>Loading</p>;
  } else {
    output = components;
  }

  return (
    <div className={`m-2 bg-base-200 p-2 max-w-3xl ${styleMap[style]}`}>
      {showDescriptor ? <p className="text-center">Attributes</p> : <></>}
      <div className="flex flex-wrap justify-center">{output}</div>
    </div>
  );
};

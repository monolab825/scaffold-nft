"use client";

import { Size, Style, beautyStyleMap } from "../types/Types";

export type AttributesCardProps = {
  value?: { trait_type: string; value: string }[];
  style?: Style;
  size?: Size;

  prettyLoad?: boolean;
  showDescriptor?: boolean;
};

export const AttributesCard = ({
  value,
  prettyLoad = false,
  showDescriptor,
  style = "rounded",
  size = "base",
}: AttributesCardProps) => {
  const containerStyleMap = {
    base: "m-1 p-1",
  };

  const descriptorStyleMap = {
    base: "p-0 m-0 text-xs",
  };

  const attributesContainerStyleMap = {
    base: "flex-col",
    //large: flex-wrap
  };

  const attributeContainerStyleMap = {
    base: "my-1",
  };

  const attributeTraitTypeStyleMap = {
    base: "m-0 text-sm",
  };

  const attributeValueStyleMap = {
    base: "m-0 text-md",
  };

  const components = value?.map((attribute: any, index: number) => {
    return (
      <div
        key={index}
        className={`bg-base-100 text-center ${attributeContainerStyleMap[size]} ${beautyStyleMap[style]}`}
      >
        <p className={`${attributeTraitTypeStyleMap[size]}`}>{attribute["trait_type"]}</p>
        <p className={`${attributeValueStyleMap[size]}`}>{attribute["value"]}</p>
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
    <div className={`bg-base-200 ${containerStyleMap[size]} ${beautyStyleMap[style]}`}>
      {showDescriptor ? <p className={`text-center ${descriptorStyleMap[size]}`}>Attributes</p> : <></>}
      <div className={`flex ${attributesContainerStyleMap[size]} justify-center`}>{output}</div>
    </div>
  );
};

"use client";

import { Size, Style, beautyStyleMap } from "../types/Types";

export type CollectionNameCardProps = {
  value?: string;
  prettyLoad?: boolean;
  style?: Style;
  size?: Size;

  showDescriptor?: boolean;
  descriptorText?: string;
  bgColor?: string;
};

export const CollectionNameCard = ({
  value,
  prettyLoad = false,
  style = "rounded",
  // size = "base",
  showDescriptor,
  descriptorText = "Collection Name",
  bgColor = "bg-base-200",
}: CollectionNameCardProps) => {
  const component = <p className={`text-4xl text-center`}>{value}</p>;

  let output;

  if (prettyLoad) {
    output = value ? component : <p>Loading...</p>;
  } else {
    output = component;
  }

  return (
    <div className={`${bgColor} ${beautyStyleMap[style]} p-2 m-2 max-w-3xl`}>
      {showDescriptor ? <p className="text-center">{descriptorText}</p> : <></>}
      {output}
    </div>
  );
};

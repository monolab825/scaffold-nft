"use client";

import { Style, styleMap } from "./Types";

export type DescriptionCardProps = {
  value?: string;
  prettyLoad?: boolean;
  style?: Style;

  showDescriptor?: boolean;
};

export const DescriptionCard = ({
  value,
  prettyLoad = false,
  style = "rounded",
  showDescriptor,
}: DescriptionCardProps) => {
  const component = <p className={`text-2xl text-center`}>{value}</p>;

  let output;

  if (prettyLoad) {
    output = value ? component : <p>Loading...</p>;
  } else {
    output = component;
  }

  return (
    <div className={`m-2 bg-base-200 ${styleMap[style]} p-2 max-w-3xl`}>
      {showDescriptor ? <p className="text-center">Description</p> : <></>}
      {output}
    </div>
  );
};

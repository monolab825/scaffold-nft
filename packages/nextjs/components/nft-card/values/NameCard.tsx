"use client";

import { Style, styleMap } from "./Types";

export type NameCardProps = {
  value?: string;
  prettyLoad?: boolean;
  style?: Style;
  showDescriptor?: boolean;
};

export const NameCard = ({ value, prettyLoad, showDescriptor, style = "rounded" }: NameCardProps) => {
  const component = <p className={`text-4xl text-center`}>{value}</p>;

  let output;

  if (prettyLoad) {
    output = value ? component : <p className="text-center">Loading...</p>;
  } else {
    output = component;
  }

  return (
    <div className={`bg-base-200 ${styleMap[style]} p-2 m-2 max-w-3xl`}>
      {showDescriptor ? <p className="text-center">Name</p> : <></>}
      {output}
    </div>
  );
};
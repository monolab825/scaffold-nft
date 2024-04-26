"use client";

import { Size, Style, styleMap } from "../types/Types";

export type NameCardProps = {
  value?: string;
  prettyLoad?: boolean;
  style?: Style;
  showDescriptor?: boolean;
  size?: Size;
};

const sizeMap = {
  sm: "max-w-3xl p-2 m-2",
  base: "max-w-3xl p-2 m-2",
};

const descriptorMap = {
  sm: "p-0 m-0",
  base: "",
};

const nameMap = {
  sm: "text-xl m-0",
  base: "text-4xl",
};
export const NameCard = ({ value, prettyLoad, showDescriptor, style = "rounded", size = "base" }: NameCardProps) => {
  const component = <p className={`text-center ${nameMap[size]}`}>{value}</p>;

  let output;

  if (prettyLoad) {
    output = value ? component : <p className="text-center">Loading...</p>;
  } else {
    output = component;
  }

  return (
    <div className={`bg-base-200 ${styleMap[style]} ${sizeMap[size]}`}>
      {showDescriptor ? <p className={`text-center ${descriptorMap[size]}`}>Name</p> : <></>}
      {output}
    </div>
  );
};

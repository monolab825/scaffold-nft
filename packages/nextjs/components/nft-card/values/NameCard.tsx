"use client";

import { Size, Style, beautyStyleMap } from "../types/Types";

export type NameCardProps = {
  value?: string;
  prettyLoad?: boolean;
  style?: Style;
  showDescriptor?: boolean;
  size?: Size;
};

const containerStyleMap = {
  sm: "max-w-3xl p-1 m-1",
  base: "max-w-3xl p-2 m-2",
};

const descriptorStyleMap = {
  sm: "p-0 m-0",
  base: "",
};

const valueStyleMap = {
  sm: "text-lg m-0",
  base: "text-4xl",
};
export const NameCard = ({ value, prettyLoad, showDescriptor, style = "rounded", size = "base" }: NameCardProps) => {
  const component = <p className={`text-center ${valueStyleMap[size]}`}>{value}</p>;

  let output;

  if (prettyLoad) {
    output = value ? component : <p className="text-center">Loading...</p>;
  } else {
    output = component;
  }

  return (
    <div className={`bg-base-200 ${beautyStyleMap[style]} ${containerStyleMap[size]}`}>
      {showDescriptor ? <p className={`text-center ${descriptorStyleMap[size]}`}>Name</p> : <></>}
      {output}
    </div>
  );
};

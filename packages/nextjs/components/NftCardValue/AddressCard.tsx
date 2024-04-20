"use client";

import { Address } from "../scaffold-eth";

type Props = {
  value?: string;
  prettyLoad?: boolean;
  style?: "rounded";
};

const styleMap = {
  rounded: "rounded-lg",
};

export const AddressCard = ({ value, prettyLoad = false, style = "rounded" }: Props) => {
  const component = <Address address={value} />;

  let output;

  if (prettyLoad) {
    output = value ? component : <p>Loading Name...</p>;
  } else {
    output = component;
  }

  return <div className={`bg-base-200 ${styleMap[style]} p-2 m-2 max-w-3xl`}>{output}</div>;
};

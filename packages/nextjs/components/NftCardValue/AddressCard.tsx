"use client";

import { Address } from "../scaffold-eth";

type Props = {
  value?: string;
  prettyLoad?: boolean;
  style?: "rounded";
  showDescriptor?: boolean;
};

const styleMap = {
  rounded: "rounded-lg",
};

export const AddressCard = ({ value, style = "rounded", showDescriptor }: Props) => {
  const component = <Address address={value} />;

  return (
    <div className={`bg-base-200 ${styleMap[style]} p-2 m-2 max-w-3xl`}>
      {showDescriptor ? <p className="text-center">Contract Address</p> : <></>}
      {component}
    </div>
  );
};

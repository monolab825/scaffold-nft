"use client";

import { Size, Style, beautyStyleMap } from "../types/Types";

export type IdCardProps = {
  value?: bigint;
  uri?: string;
  prettyLoad?: boolean;
  style?: Style;
  size?: Size;

  showDescriptor?: boolean;
};

export const IdCard = ({
  value,
  uri,
  prettyLoad = false,
  style = "rounded",
  showDescriptor,
}: // size = "base",
IdCardProps) => {
  const component = (
    <a href={uri} target="#">
      <p className={`text-4xl text-center`}>{value?.toString()}</p>
    </a>
  );

  let output;

  if (prettyLoad) {
    output = value ? component : <p>Loading...</p>;
  } else {
    output = component;
  }

  return (
    <div className={`bg-base-200 ${beautyStyleMap[style]} p-2 m-2 max-w-3xl`}>
      {showDescriptor ? <p className="text-center">Token Id</p> : <></>}
      {output}
    </div>
  );
};

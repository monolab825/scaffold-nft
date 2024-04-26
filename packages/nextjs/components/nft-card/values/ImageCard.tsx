"use client";

import { Size, Style, styleMap } from "../types/Types";

export type ImageCardProps = {
  value?: string;
  alt?: string;
  prettyLoad?: boolean;
  size?: Size;
  style?: Style;
  showDescriptor?: boolean;
};

const sizeMap = {
  sm: "w-28 m-2 p-1 lg:w-64 lg:m-2 lg:p-2",
  base: "w-96 p-2 m-2",
};

export const ImageCard = ({
  value,
  alt = "Test",
  prettyLoad = false,
  size = "base",
  style = "rounded",
  showDescriptor = false,
}: ImageCardProps) => {
  const component = <img src={value} alt={alt} className={`bg-base-300 ${styleMap[style]}`} />;

  let output;

  if (prettyLoad) {
    output = value ? component : <p>Loading....</p>;
  } else {
    output = component;
  }

  return (
    <div className={`bg-base-200 ${sizeMap[size]} ${styleMap[style]}`}>
      {showDescriptor ? <p className="text-center">Image</p> : <></>}

      {output}
    </div>
  );
};

"use client";

import { Style, styleMap } from "./Types";

export type ImageCardProps = {
  value?: string;
  alt?: string;
  prettyLoad?: boolean;
  size?: "base";
  style?: Style;

  showDescriptor?: boolean;
};

const sizeMap = {
  base: "w-96",
};

export const ImageCard = ({
  value,
  alt = "Test",
  prettyLoad = false,
  size = "base",
  style = "rounded",
  showDescriptor = false,
}: ImageCardProps) => {
  console.log(style);

  console.log(styleMap[style]);

  const component = <img src={value} alt={alt} className={`bg-base-300 ${sizeMap[size]} ${styleMap[style]}`} />;

  let output;

  if (prettyLoad) {
    output = value ? component : <p>Loading....</p>;
  } else {
    output = component;
  }

  return (
    <div className={`p-2 bg-base-200 m-2 ${styleMap[style]}`}>
      {showDescriptor ? <p className="text-center">Image</p> : <></>}

      {output}
    </div>
  );
};

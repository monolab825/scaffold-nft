"use client";

type Props = {
  value?: string;
  alt?: string;
  prettyLoad?: boolean;
  size?: "base";
};

const sizeMap = {
  base: "w-96",
};

export const ImageCard = ({ value, alt = "Test", prettyLoad = false, size = "base" }: Props) => {
  const component = <img src={value} alt={alt} className={`rounded-lg ${sizeMap[size]}`} />;

  let output;

  if (prettyLoad) {
    output = value ? component : <p>Loading Image...</p>;
  } else {
    output = component;
  }

  return <>{output}</>;
};

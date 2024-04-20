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
  const component = <img src={value} alt={alt} className={`bg-base-300 ${sizeMap[size]}`} />;

  let output;

  if (prettyLoad) {
    output = value ? component : <p>Loading....</p>;
  } else {
    output = component;
  }

  return (
    <div className="p-2 bg-base-200 rounded-lg m-2">
      <p className="text-center">Image</p>

      {output}
    </div>
  );
};

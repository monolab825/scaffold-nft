"use client";

export type ImageCardProps = {
  value?: string;
  alt?: string;
  prettyLoad?: boolean;
  size?: "base";
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
  showDescriptor = false,
}: ImageCardProps) => {
  const component = <img src={value} alt={alt} className={`bg-base-300 ${sizeMap[size]}`} />;

  let output;

  if (prettyLoad) {
    output = value ? component : <p>Loading....</p>;
  } else {
    output = component;
  }

  return (
    <div className="p-2 bg-base-200 rounded-lg m-2">
      {showDescriptor ? <p className="text-center">Image</p> : <></>}

      {output}
    </div>
  );
};

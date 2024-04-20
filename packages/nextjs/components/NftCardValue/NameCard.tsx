"use client";

type Props = {
  value?: string;
  prettyLoad?: boolean;
  style?: "rounded";
};

const styleMap = {
  rounded: "rounded-lg",
};

export const NameCard = ({ value, prettyLoad = false, style = "rounded" }: Props) => {
  const component = <p className={`text-4xl text-center`}>{value}</p>;

  let output;

  if (prettyLoad) {
    output = value ? component : <p className="text-center">Loading...</p>;
  } else {
    output = component;
  }

  return (
    <div className={`bg-base-200 ${styleMap[style]} p-2 m-2 max-w-3xl`}>
      <p className="text-center">Name</p>
      {output}
    </div>
  );
};

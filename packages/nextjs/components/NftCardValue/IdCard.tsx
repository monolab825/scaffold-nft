"use client";

type Props = {
  value?: bigint;
  uri?: string;
  prettyLoad?: boolean;
  style?: "rounded";
};

const styleMap = {
  rounded: "rounded-lg",
};

export const IdCard = ({ value, uri, prettyLoad = false, style = "rounded" }: Props) => {
  console.log(uri);

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
    <div className={`bg-base-200 ${styleMap[style]} p-2 m-2 max-w-3xl`}>
      <p className="text-center">Token Id</p>
      {output}
    </div>
  );
};

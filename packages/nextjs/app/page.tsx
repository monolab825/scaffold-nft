"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { NextPage } from "next";
// import Select from "react-dropdown-select";
import Select from "react-select";
import * as allChains from "viem/chains";
import {
  BeakerIcon, // CogIcon, // BugAntIcon, MagnifyingGlassIcon
} from "@heroicons/react/24/outline";

function insertSpaces(string: string) {
  string = string.replace(/([a-z])([A-Z])/g, "$1 $2");
  string = string.replace(/([A-Z])([A-Z][a-z])/g, "$1 $2");
  return string;
}

const Home: NextPage = () => {
  const options = [];

  const keys = Object.keys(allChains);

  for (const key of keys) {
    options.push({
      value: key,
      label: insertSpaces(key).replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase()),
    });
  }

  const defaultOptionIndex = options
    .map(function (e) {
      return e.value;
    })
    .indexOf("mainnet");

  const defaultOption = options[defaultOptionIndex];

  const [selectedDropdownOption, setSelectedDropdownOption] = useState(defaultOption);

  console.log(selectedDropdownOption);

  async function onSubmit(e: any) {
    e.preventDefault();

    window.location.href = "/" + selectedDropdownOption.value + "/" + e.target[1].value;
  }

  const [output, setOutput] = useState<any>();

  useEffect(() => {
    if (location?.hostname === "localhost" || location?.hostname === "127.0.0.1") {
      setOutput(
        <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
          <BeakerIcon className="h-8 w-8 fill-secondary" />
          <p>
            Test your local deployments at the{" "}
            <Link href="/testing-grounds" passHref className="link">
              Testing Grounds
            </Link>{" "}
            tab.
          </p>
        </div>,
      );
    }
  }, []);

  return (
    <>
      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="px-5">
          <h1 className="text-center">
            <span className="block text-2xl mb-2">Welcome to</span>
            <span className="block text-4xl font-bold">Scaffold-NFT</span>
          </h1>

          <form onSubmit={onSubmit} className="flex flex-col space-y-4">
            <div>
              <p>Select the blockchain that your NFT collection exists on.</p>
              <Select
                options={options}
                className="text-black bg-base-100"
                onChange={(option: any) => {
                  console.log(option);

                  option ? setSelectedDropdownOption(option) : "";
                }}
                defaultValue={defaultOption}
                instanceId="network-select"
                theme={theme => ({
                  ...theme,
                  colors: {
                    ...theme.colors,
                    primary25: "#efeaff",
                    primary50: "#c1aeff",
                    primary: "#551d98",
                  },
                })}
                styles={{
                  menuList: provided => ({ ...provided, maxHeight: 280, overflow: "auto" }),
                }}
              />
            </div>

            <div>
              <p>Paste the NFT collection address.</p>
              <div className={`flex border-2 border-base-300 bg-base-200 rounded-full text-accent`}>
                <input
                  className="input input-ghost focus-within:border-transparent focus:outline-none focus:bg-transparent focus:text-gray-400 h-[2.2rem] min-h-[2.2rem] px-4 border w-full font-medium placeholder:text-accent/50 text-gray-400"
                  placeholder={"0x123"}
                  name={"contractAddressInput"}
                  autoComplete="off"
                />
              </div>
            </div>

            <button className="btn btn-primary" type="submit">
              Search
            </button>
          </form>
        </div>

        <div className="flex-grow bg-base-300 w-full mt-16 px-8 py-12">
          <div className="flex justify-center items-center gap-12 flex-col sm:flex-row">
            {/* <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">

              <BugAntIcon className="h-8 w-8 fill-secondary" />
              <p>
                Tinker with your smart contract using the{" "}
                <Link href="/debug" passHref className="link">
                  Debug Contracts
                </Link>{" "}
                tab.
              </p>
            </div>
            <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
              <MagnifyingGlassIcon className="h-8 w-8 fill-secondary" />
              <p>
                Explore your local transactions with the{" "}
                <Link href="/blockexplorer" passHref className="link">
                  Block Explorer
                </Link>{" "}
                tab.
              </p>
            </div> */}

            {output}
            {/* <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
              <BeakerIcon className="h-8 w-8 fill-secondary" />
              <p>
                Test your local deployments at the{" "}
                <Link href="/testing-grounds" passHref className="link">
                  Testing Grounds
                </Link>{" "}
                tab.
              </p>
            </div> */}

            {/* <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
              <CogIcon className="h-8 w-8 fill-secondary" />
              <p>
                Upload NFT Metadata by using the{" "}
                <Link href="/nft-storage" passHref className="link">
                  Metadata Uploader
                </Link>{" "}
                tab.
              </p>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;

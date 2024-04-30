"use client";

import { useState } from "react";
import { AuthenticationEnsurer } from "./_components/Authenticator";
import { SpaceEnsurer } from "./_components/SpaceEnsurer";
// import { UploaderForm } from "./_components/Uploader";
import { Authenticator, Provider, useW3 } from "@w3ui/react";
// import { create } from "@web3-storage/w3up-client";
import type { NextPage } from "next";

function MyUploader() {
  const [{ client }] = useW3();

  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const onSubmit = async (event: any) => {
    event.preventDefault();
    if (selectedImage === null) return;

    const nameInput = event.target["0"] as any;
    const fileInput = event.target["1"] as any;
    const descriptionInput = event.target["2"] as any;
    console.log(nameInput.value);
    console.log(fileInput.value);
    console.log(descriptionInput.value);

    const result = await client?.uploadFile(selectedImage);
    console.log(result);
    console.log("Image CID: ", result?.toString());

    const obj = { name: nameInput.value, image: "ipfs://" + result?.toString(), description: descriptionInput.value };
    const blob = new Blob([JSON.stringify(obj)], { type: "application/json" });

    const nftFile = new File([blob], "nft.json");

    const result2 = await client?.uploadFile(nftFile);

    console.log("Json CID: ", result2?.toString());
  };
  return (
    <div className="w-96 justify-center bg-secondary rounded-lg">
      <p className="text-xl text-center">NFT</p>
      <form onSubmit={onSubmit} className="space-y-5 m-1 flex flex-col items-center">
        <div className="w-full">
          <label htmlFor="first_name" className="text-center block text-sm font-medium text-gray-900 dark:text-white">
            Name
          </label>
          <input
            type="text"
            id="first_name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Scaffold NFT"
            required
          />
        </div>
        <div className="w-full">
          <label htmlFor="first_name" className="text-center block text-sm font-medium text-gray-900 dark:text-white">
            Description
          </label>
          <textarea
            id="first_name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Scaffold NFTs are great! Get up and running in minutes and deploy your own collection or view any other collection on a variety of chains!"
            required
          />
        </div>
        <div className="flex items-center justify-center w-full">
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          >
            Image
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
            </div>
            <input
              id="dropzone-file"
              type="file"
              className="hidden"
              onChange={(event: any) => {
                setSelectedImage(event.target.files[0]);
              }}
            />
          </label>
        </div>
        <button type="submit" className="btn btn-primary m-1">
          Upload
        </button>
      </form>
    </div>
    // <div className="w-96 bg-red-200 justify-center">
    //   <form onSubmit={onSubmit}>
    //     <div className="flex flex-col">
    //       <label> Name:</label>
    //       <input name="name" type="text" />{" "}
    //       <label>
    //         {" "}
    //         Image:{" "}
    //         {selectedImage && (
    //           <div>
    //             <img alt="not found" width={"256px"} src={URL.createObjectURL(selectedImage)} />
    //           </div>
    //         )}
    //         <input
    //           name="file"
    //           type="file"
    //           className="cursor-pointer relative block opacity-0 w-full h-full p-20 z-50"
    //           onChange={(event: any) => {
    //             setSelectedImage(event.target.files[0]);
    //           }}
    //         />
    //       </label>
    //       <div className="flex items-center justify-center w-full">
    //         <label
    //           htmlFor="dropzone-file"
    //           className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
    //         >
    //           <div className="flex flex-col items-center justify-center pt-5 pb-6">
    //             <svg
    //               className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
    //               aria-hidden="true"
    //               xmlns="http://www.w3.org/2000/svg"
    //               fill="none"
    //               viewBox="0 0 20 16"
    //             >
    //               <path
    //                 stroke="currentColor"
    //                 stroke-linecap="round"
    //                 stroke-linejoin="round"
    //                 stroke-width="2"
    //                 d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
    //               />
    //             </svg>
    //             <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
    //               <span className="font-semibold">Click to upload</span> or drag and drop
    //             </p>
    //             <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
    //           </div>
    //           <input
    //             name="file"
    //             type="file"
    //             className="hidden"
    //             onChange={(event: any) => {
    //               setSelectedImage(event.target.files[0]);
    //             }}
    //           />
    //         </label>
    //       </div>
    //       <div className="flex flex-col bg-red-500">
    //         <label> Description:</label>
    //         <textarea className="m-1" name="description" />{" "}
    //       </div>
    //       <div>
    //         <button type="submit">Store</button>
    //       </div>
    //     </div>
    //   </form>
    // </div>
  );
}

function Identity() {
  const [{ accounts }, { logout }] = useW3();

  return (
    <>
      {
        <div className="m-1">
          <div className="flex flex-col justify-left items-left">
            <button
              onClick={async () => {
                await logout();
              }}
              className="btn btn-primary m-1"
            >
              Logout
            </button>
            <p className="">
              {`You're signed in as`} <b>{accounts[0].toEmail()}</b>.
            </p>
          </div>

          {/* <p className="max-w-96 overflow-hidden text-ellipsis">{`Your local agent's DID is ${client?.agent.did()}`}</p> */}
        </div>
      }
    </>
  );
}

const NftStoragePage: NextPage = () => {
  // const onSubmit = async (event: any) => {
  //   event.preventDefault();

  //   // let res = await fetch("http://localhost:8080", {
  //   //   headers: {
  //   //     Accept: "application/json",
  //   //     "Content-Type": "application/json",
  //   //   },
  //   //   method: "POST",
  //   //   body: JSON.stringify({ a: 1, b: "Textual content" }),
  //   // });

  //   // console.log(await res.json());

  //   const client = await create();

  //   try {
  //     console.log("Logging in...");

  //     await client.login("homanicsjake@gmail.com");
  //     //setPleaseCheckYourEmail(true);
  //     console.log("Logged in!");
  //   } catch (e) {
  //     console.log(e);
  //     return e;
  //   }

  //   // try {
  //   //   await client.setCurrentSpace("did:key:z6MkhCcXJFhNaNTcjQ1ZVRdccBH61PBuUb1AZ1xK4GgyeGPe");
  //   //   console.log("Current space set!");
  //   // } catch (e) {
  //   //   console.log(e);
  //   // }

  //   // const client = new NFTStorage({ token: "abfdf65a.cb58d9d119bb41bf84445fc53f235f1e" });

  //   // const nameInput = event.target["0"] as any;
  //   // const fileInput = event.target["1"] as any;
  //   // console.log(nameInput.value);
  //   // console.log(fileInput.value);

  //   // try {
  //   //   const metadata = await client.store({
  //   //     name: "This is a test name",
  //   //     description: "Using the nft.storage metadata API to create ERC-1155 compatible metadata.",
  //   //     image: fileInput.files[0],
  //   //   });

  //   //   console.log({ "IPFS URL for the metadata": metadata.url });
  //   //   console.log({ "metadata.json contents": metadata.data });
  //   //   console.log({ "metadata.json contents with IPFS gateway URLs": metadata.embed() });
  //   // } catch (err) {
  //   //   console.error(err);
  //   // }
  // };

  // const [{ client }] = useW3();

  // let output;

  // console.log(client);

  return (
    <div className="flex flex-col items-center justify-center">
      {/* {output} */}
      <Provider>
        <Authenticator>
          <AuthenticationEnsurer>
            <Identity />
            <SpaceEnsurer>
              <MyUploader />
              {/* <Uploader>
                <UploaderForm />
              </Uploader> */}
            </SpaceEnsurer>
          </AuthenticationEnsurer>
        </Authenticator>
      </Provider>

      {/* <div>
        <form onSubmit={onSubmit}>
          <label>
            {" "}
            Name: <input name="name" type="text" />{" "}
          </label>
          <label>
            {" "}
            Image: <input name="file" type="file" />{" "}
          </label>
          <div>
            <button type="submit">Store</button>
          </div>
        </form>
      </div> */}
    </div>
  );
};

export default NftStoragePage;

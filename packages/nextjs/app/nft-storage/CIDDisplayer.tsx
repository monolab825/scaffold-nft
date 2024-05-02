export function CIDDisplayer({ cid, showAdvanced = false }: any) {
  const ipfsCID = "ipfs://" + cid?.toString();
  const w3sCID = "https://w3s.link/ipfs/" + cid?.toString();

  return (
    <div>
      <p className="text-center">URL</p>
      <a
        href={ipfsCID}
        target="#"
        className="m-4 text-lg break-words font-medium text-blue-600 dark:text-blue-500 hover:underline"
      >
        {ipfsCID}
      </a>

      {showAdvanced ? (
        <div>
          {" "}
          <p className="text-center">Fast URL</p>
          <a
            href={w3sCID}
            target="#"
            className="m-4 text-lg break-words font-medium text-blue-600 dark:text-blue-500 hover:underline"
          >
            {w3sCID}
          </a>{" "}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

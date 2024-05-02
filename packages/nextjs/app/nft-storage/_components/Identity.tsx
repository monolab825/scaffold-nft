import { useW3 } from "@w3ui/react";

export function Identity() {
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
        </div>
      }
    </>
  );
}

import type { NextPage } from "next";
import { Fragment } from "react";
import { useImportAccountSelector } from "../contexts/WalletSelectorImportContext";

const ImportContent: NextPage = () => {
  const { importModal } = useImportAccountSelector();
  return (
    <Fragment>
      <button onClick={() => importModal.show()}>Open Modal</button>
      <p>
        Import modal assist users to migrate given accounts to one of listed
        third party wallets. Depends on the type of wallet selected, users may
        required to copy the given passhrase and store it safely until the
        migration is completed.
      </p>
    </Fragment>
  );
};

export default ImportContent;

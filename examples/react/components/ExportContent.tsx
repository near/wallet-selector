import type { NextPage } from "next";
import { Fragment } from "react";
import { useExportAccountSelector } from "../contexts/WalletSelectorExportContext";

const ExportContent: NextPage = () => {
  const { ExportModal } = useExportAccountSelector();
  return (
    <Fragment>
      <button onClick={() => ExportModal.show()}>Open Modal</button>
      <p>
        Export modal assist users to migrate given accounts to one of listed
        third party wallets. Depends on the type of wallet selected, users may
        required to copy the given passhrase and store it safely until the
        migration is completed.
      </p>
    </Fragment>
  );
};

export default ExportContent;

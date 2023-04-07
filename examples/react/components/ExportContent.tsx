import type { NextPage } from "next";
import { Fragment } from "react";
import { useExportAccountSelector } from "../contexts/WalletSelectorExportContext";

const ExportContent: NextPage = () => {
  const { exportModal } = useExportAccountSelector();
  return (
    <Fragment>
      <button onClick={() => exportModal.show()}>Open Modal</button>
      <p>
        The Export Accounts modal assists users in migrating their accounts to
        any Wallet Selector wallet supporting account imports. Any sensitive
        data in transit during this process will be encrypted with a
        randomly-generated password which the user will be required to copy down
        and use in the account import process on the target wallet.
      </p>
    </Fragment>
  );
};

export default ExportContent;

import type { NextPage } from "next";
import { Fragment } from "react";
import { useImportAccountSelector } from "../contexts/WalletSelectorImportContext";

const ImportContent: NextPage = () => {
  const { importModal } = useImportAccountSelector();
  return (
    <Fragment>
      <button onClick={() => importModal.show()}>Import</button>
    </Fragment>
  );
};

export default ImportContent;

import type { NextPage } from "next";
import { Fragment, useState } from "react";
import { WalletSelectorContextProvider } from "../contexts/WalletSelectorContext";
import Content from "../components/Content";
import { ExportAccountSelectorContextProvider } from "../contexts/WalletSelectorExportContext";
import ExportContent from "../components/ExportContent";

const Home: NextPage = () => {
  const [showImport, setShowImport] = useState<boolean>(false);

  return (
    <Fragment>
      <div className="title-container">
        <h1>{showImport ? "Export Account" : "NEAR Guest Book"}</h1>
        <button onClick={() => setShowImport(!showImport)}>
          {showImport ? "Back to Log in" : "Try Export Account"}
        </button>
      </div>
      {showImport ? (
        <ExportAccountSelectorContextProvider>
          <ExportContent />
        </ExportAccountSelectorContextProvider>
      ) : (
        <WalletSelectorContextProvider>
          <Content />
        </WalletSelectorContextProvider>
      )}
    </Fragment>
  );
};

export default Home;

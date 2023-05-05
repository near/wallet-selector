import React, { useState } from "react";
import { getKeyPair } from "./lib";

const inputButtonStyle = {
  border: "1px solid #ddd",
  padding: "8px",
  borderRadius: "4px",
  width: "100%",
  marginBottom: "16px",
  "&:hover": {
    background: "#aaa !important",
  },
};

export const Modal = ({
  options,
  signer,
  ethAddress,
  handleSignIn,
  accountSuffix,
  visibleOnRender = true,
}) => {
  const [visible, setVisible] = useState(visibleOnRender);
  const [accountId, setAccountId] = useState("");
  const [error, setError] = useState("");

  const onMouseDown = (e) => {
    e.target.style.background = "#bbb";
  };

  const onMouseUp = (e) => {
    e.target.style.background = "#fff";
  };

  const handleSubmit = async () => {
    if (error.length > 0) {
      return;
    }
    const finalAccountId = accountId + accountSuffix;
    console.log(finalAccountId);
    setVisible(false);
    const keyPair = await getKeyPair(signer, ethAddress, finalAccountId);
    console.log(keyPair);

    alert(
      `Check console log for Keypair. Call meta TX API and create account ${finalAccountId} and add Ethereum and NEAR accounts to mapping contract`
    );

    handleSignIn(finalAccountId, keyPair);
  };

  const handleChange = ({ target: { value } }) => {
    setAccountId(value);
    if (!/^[a-z0-9]+$/gi.test(value)) {
      setError("Illegal character");
    } else if (value.length < 2) {
      setError("Too short");
    } else if (value.length > 46) {
      setError("Too long");
    } else {
      setError("");
    }
  };

  if (!visible) {
    return null;
  }

  return (
    <div
      className={`nws-modal-wrapper ${options?.theme || "light-theme"} ${
        visible ? "open" : ""
      }`}
    >
      <div
        className="nws-modal-overlay"
        onClick={() => {
          setVisible(false);
        }}
      ></div>

      <div
        className="nws-modal"
        style={{
          height: "300px",
          maxWidth: "500px",
        }}
      >
        <div
          className="wallet-home-wrapper"
          style={{
            padding: "16px",
            width: "100%",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <h3>Choose a NEAR Account ID to pair with</h3>
            <h3>Ethereum account:</h3>
            <h3 style={{ wordBreak: "break-all" }}>{ethAddress}</h3>
          </div>

          <input
            style={inputButtonStyle}
            value={accountId}
            placeholder={"Account ID"}
            onChange={handleChange}
          />

          {error && <p>{error}</p>}

          <button
            onClick={handleSubmit}
            style={inputButtonStyle}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseUp}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

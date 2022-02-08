import "regenerator-runtime/runtime";
import React, { useState, useEffect } from "react";
import Form from "./components/Form";
import SignIn from "./components/SignIn";
import Messages from "./components/Messages";
import { utils } from "near-api-js";

const { parseNearAmount } = utils.format;

const SUGGESTED_DONATION = "0";
const BOATLOAD_OF_GAS = parseNearAmount("0.00000000003");

const App = ({ near, initialAccount }) => {
  const [account, setAccount] = useState(initialAccount);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // TODO: don't just fetch once; subscribe!
    near.contract.view({ methodName: "getMessages" }).then(setMessages);

    near.on("signIn", () => {
      console.log("'signIn' event triggered!");

      near.getAccount()
        .then((data) => {
          console.log("account info", data);
          setAccount(data);
        })
        .catch((err) => {
          console.log("Failed to retrieve account info");
          console.error(err);
        });
    });

    near.on("disconnected", () => {
      console.log("'disconnect' event triggered!");
      setAccount(null);
    });
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();

    const { fieldset, message, donation } = e.target.elements;

    fieldset.disabled = true;

    // TODO: optimistically update page with new message,
    // update blockchain data in background
    // add uuid to each message, so we know which one is already known
    near.contract.call({
        actions: [{
          methodName: "addMessage",
          args: { text: message.value },
          gas: BOATLOAD_OF_GAS,
          deposit: parseNearAmount(donation.value || "0")
        }]
      })
      .catch((err) => {
        alert("Failed to add message");
        console.log("Failed to add message");

        throw err;
      })
      .then(() => {
        return near.contract.view({ methodName: "getMessages" })
          .then((nextMessages) => {
            setMessages(nextMessages);
            message.value = "";
            donation.value = SUGGESTED_DONATION;
            fieldset.disabled = false;
            message.focus();
          })
          .catch((err) => {
            alert("Failed to refresh messages");
            console.log("Failed to refresh messages");

            throw err;
          });
      })
      .catch((err) => {
        console.error(err);

        fieldset.disabled = false;
      });
  };

  const signIn = () => {
    near.showModal();
  };

  const signOut = () => {
    near.signOut()
      .then(() => {
        window.location.replace(window.location.origin + window.location.pathname);
      })
      .catch((err) => {
        console.log("Failed to sign out");
        console.error(err);
      });
  };

  function switchProviderHandler() {
    near.showModal();
  }

  return (
    <main>
      <header>
        <h1>NEAR Guest Book</h1>
        {account ? (
          <div>
            <button onClick={signOut}>Log out</button>
            <button onClick={switchProviderHandler}>Switch Provider</button>
          </div>
        ) : (
          <button onClick={signIn}>Log in</button>
        )}
      </header>
      {account ? (
        <Form near={near} onSubmit={onSubmit} currentUser={account} />
      ) : (
        <SignIn />
      )}
      {!!account && !!messages.length && <Messages messages={messages} />}
    </main>
  );
};

export default App;

import "regenerator-runtime/runtime";
import React, { useState, useEffect } from "react";
import { utils } from "near-api-js";

import Form from "./components/Form";
import SignIn from "./components/SignIn";
import Messages from "./components/Messages";

const { parseNearAmount } = utils.format;

const SUGGESTED_DONATION = "0";
const BOATLOAD_OF_GAS = parseNearAmount("0.00000000003");

const App = ({ near, initialAccount }) => {
  const [account, setAccount] = useState(initialAccount);
  const [messages, setMessages] = useState([]);

  const getAccount = () => {
    near.getAccount()
      .then((data) => {
        console.log("Account", data);
        setAccount(data);
      })
      .catch((err) => {
        console.log("Failed to retrieve account info");
        console.error(err);
      });
  };

  useEffect(() => {
    // TODO: don't just fetch once; subscribe!
    near.contract.view({ methodName: "getMessages" }).then(setMessages);
  }, []);

  useEffect(() => {
    const subscription = near.on("signIn", () => {
      console.log("'signIn' event triggered!");

      getAccount();
    });

    return () => subscription.remove();
  }, []);

  useEffect(() => {
    const subscription = near.on("accountChange", () => {
      console.log("'accountChange' event triggered!");

      setAccount(null);
      getAccount();
    });

    return () => subscription.remove();
  }, []);

  useEffect(() => {
    const subscription = near.on("signOut", () => {
      console.log("'signOut' event triggered!");
      setAccount(null);
    });

    return () => subscription.remove();
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
    near.show();
  };

  const signOut = () => {
    near.signOut()
      .catch((err) => {
        console.log("Failed to sign out");
        console.error(err);
      });
  };

  function switchProviderHandler() {
    near.show();
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

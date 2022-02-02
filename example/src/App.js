import "regenerator-runtime/runtime";
import React, { useState, useEffect } from "react";
import Form from "./components/Form";
import SignIn from "./components/SignIn";
import Messages from "./components/Messages";
import { utils } from "near-api-js";

const { parseNearAmount } = utils.format;

const SUGGESTED_DONATION = "0";
const BOATLOAD_OF_GAS = parseNearAmount("0.00000000003");

const App = ({ near, contract, currentUser2 }) => {
  const [currentUser, setCurrentUser] = useState(currentUser2);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // TODO: don't just fetch once; subscribe!
    contract.view({ methodName: "getMessages" }).then(setMessages);

    near.on("signIn", async () => {
      console.log(currentUser);
      setCurrentUser(await near.getAccount());
      console.log(currentUser);
    });
    near.on("disconnect", async () => {
      console.log(currentUser);
      setCurrentUser(await near.getAccount());
      console.log(currentUser);
    });
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();

    const { fieldset, message, donation } = e.target.elements;

    fieldset.disabled = true;

    // TODO: optimistically update page with new message,
    // update blockchain data in background
    // add uuid to each message, so we know which one is already known
    contract.call({
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
        return contract.view({ methodName: "getMessages" })
          .then((messages) => {
            setMessages(messages);
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

  const signIn = async () => {
    near.showModal();
  };

  const signOut = async () => {
    near.signOut();
    window.location.replace(window.location.origin + window.location.pathname);
  };

  function switchProviderHandler() {
    near.showModal();
  }

  return (
    <main>
      <header>
        <h1>NEAR Guest Book</h1>
        {currentUser ? (
          <div>
            <button onClick={signOut}>Log out</button>
            <button onClick={switchProviderHandler}>Switch Provider</button>
          </div>
        ) : (
          <button onClick={signIn}>Log in</button>
        )}
      </header>
      {currentUser ? (
        <Form near={near} onSubmit={onSubmit} currentUser={currentUser} />
      ) : (
        <SignIn />
      )}
      {!!currentUser && !!messages.length && <Messages messages={messages} />}
    </main>
  );
};

export default App;

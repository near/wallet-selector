import "regenerator-runtime/runtime";
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Big from "big.js";
import Form from "./components/Form";
import SignIn from "./components/SignIn";
import Messages from "./components/Messages";

const SUGGESTED_DONATION = "0";
const BOATLOAD_OF_GAS = Big(3)
  .times(10 ** 13)
  .toFixed();

const App = ({ near, contract, currentUser2 }) => {
  const [currentUser, setCurrentUser] = useState(currentUser2);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // TODO: don't just fetch once; subscribe!
    contract.callContract("getMessages").then(setMessages);

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
    contract
      .callContract(
        "addMessage",
        { text: message.value },
        BOATLOAD_OF_GAS,
        Big(donation.value || "0")
          .times(10 ** 24)
          .toFixed()
      )
      .then(() => {
        contract.callContract("getMessages").then((messages) => {
          setMessages(messages);
          message.value = "";
          donation.value = SUGGESTED_DONATION;
          fieldset.disabled = false;
          message.focus();
        });
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

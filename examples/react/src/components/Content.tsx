import React, {
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { providers, utils } from "near-api-js";
import { AccountView, CodeResult } from "near-api-js/lib/providers/provider";

import { Account, Message } from "../interfaces";
import { useWalletSelector } from "../contexts/WalletSelectorContext";
import SignIn from "./SignIn";
import Form from "./Form";
import Messages from "./Messages";
import { Components } from "@near-wallet-selector/selector-ui/loader";
import { WalletSelectorModal } from "@near-wallet-selector/react-selector-ui";

const SUGGESTED_DONATION = "0";
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const BOATLOAD_OF_GAS = utils.format.parseNearAmount("0.00000000003")!;

const Content: React.FC = () => {
  const { selector, accounts, accountId, setAccountId } = useWalletSelector();
  const [account, setAccount] = useState<Account | null>(null);
  const [messages, setMessages] = useState<Array<Message>>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const modalRef = useRef<HTMLWalletSelectorModalElement>(null);

  const getAccount = useCallback(async (): Promise<Account | null> => {
    if (!accountId) {
      return null;
    }

    const { network } = selector.options;
    const provider = new providers.JsonRpcProvider({ url: network.nodeUrl });

    return provider
      .query<AccountView>({
        request_type: "view_account",
        finality: "final",
        account_id: accountId,
      })
      .then((data) => ({
        ...data,
        account_id: accountId,
      }));
  }, [accountId, selector.options]);

  const getMessages = useCallback(() => {
    const { network, contractId } = selector.options;
    const provider = new providers.JsonRpcProvider({ url: network.nodeUrl });

    return provider
      .query<CodeResult>({
        request_type: "call_function",
        account_id: contractId,
        method_name: "getMessages",
        args_base64: "",
        finality: "optimistic",
      })
      .then((res) => JSON.parse(Buffer.from(res.result).toString()));
  }, [selector]);

  useEffect(() => {
    // TODO: don't just fetch once; subscribe!
    getMessages().then(setMessages);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!accountId) {
      return setAccount(null);
    }

    setLoading(true);

    getAccount().then((nextAccount) => {
      setAccount(nextAccount);
      setLoading(false);
    });
  }, [accountId, getAccount]);

  useEffect(() => {
    const modal = modalRef.current;
    if (!modal) {
      return;
    }
    modal.setSelector(selector as unknown as Components.WalletSelector);
  }, [selector, account]);

  useEffect(() => {
    if (!selector) {
      return;
    }
  }, [selector]);

  const handleSignIn = () => {
    modalRef.current!.show();
  };

  const handleSignOut = async () => {
    const wallet = await selector.wallet();

    wallet.disconnect().catch((err) => {
      console.log("Failed to sign out");
      console.error(err);
    });
  };

  const handleSwitchProvider = () => {
    modalRef.current!.show();
  };

  const handleSwitchAccount = () => {
    const currentIndex = accounts.findIndex((x) => x.accountId === accountId);
    const nextIndex = currentIndex < accounts.length - 1 ? currentIndex + 1 : 0;

    const nextAccountId = accounts[nextIndex].accountId;

    setAccountId(nextAccountId);
    alert("Switched account to " + nextAccountId);
  };

  const handleSendMultipleTransactions = async () => {
    const { contractId } = selector.options;
    const wallet = await selector.wallet();

    await wallet.signAndSendTransactions({
      transactions: [
        {
          // Deploy your own version of https://github.com/near-examples/rust-counter using Gitpod to get a valid receiverId.
          receiverId: "dev-1648806797290-14624341764914",
          actions: [
            {
              type: "FunctionCall",
              params: {
                methodName: "increment",
                args: {},
                gas: BOATLOAD_OF_GAS,
                deposit: utils.format.parseNearAmount("0")!,
              },
            },
          ],
        },
        {
          receiverId: contractId,
          actions: [
            {
              type: "FunctionCall",
              params: {
                methodName: "addMessage",
                args: { text: "Hello World!" },
                gas: BOATLOAD_OF_GAS,
                deposit: utils.format.parseNearAmount("0")!,
              },
            },
          ],
        },
      ],
    });
  };

  const handleSubmit = useCallback(
    async (e: SubmitEvent) => {
      e.preventDefault();

      // TODO: Fix the typing so that target.elements exists..
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore.
      const { fieldset, message, donation } = e.target.elements;

      fieldset.disabled = true;

      // TODO: optimistically update page with new message,
      // update blockchain data in background
      // add uuid to each message, so we know which one is already known

      const wallet = await selector.wallet();

      wallet
        .signAndSendTransaction({
          signerId: accountId!,
          actions: [
            {
              type: "FunctionCall",
              params: {
                methodName: "addMessage",
                args: { text: message.value },
                gas: BOATLOAD_OF_GAS,
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                deposit: utils.format.parseNearAmount(donation.value || "0")!,
              },
            },
          ],
        })
        .catch((err) => {
          alert("Failed to add message");
          console.log("Failed to add message");

          throw err;
        })
        .then(() => {
          return getMessages()
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
    },
    [selector, accountId, getMessages]
  );

  if (loading) {
    return null;
  }

  return (
    <Fragment>
      <WalletSelectorModal ref={modalRef} />
      {!account && (
        <div>
          <div>
            <button onClick={handleSignIn}>Log in</button>
          </div>
          <SignIn />
        </div>
      )}
      {account && (
        <div>
          <div>
            <button onClick={handleSignOut}>Log out</button>
            <button onClick={handleSwitchProvider}>Switch Provider</button>
            <button onClick={handleSendMultipleTransactions}>
              Send Multiple Transactions
            </button>
            {accounts.length > 1 && (
              <button onClick={handleSwitchAccount}>Switch Account</button>
            )}
          </div>
          <Form
            account={account}
            onSubmit={(e) => handleSubmit(e as unknown as SubmitEvent)}
          />
          <Messages messages={messages} />
        </div>
      )}
    </Fragment>
  );
};

export default Content;

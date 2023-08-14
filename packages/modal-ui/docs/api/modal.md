## API Reference (Modal)

### `.show()`

****Parameters****

- N/A

**Returns**

- `void`

**Description**

Opens the modal for users to sign in to their preferred wallet. You can also use this method to switch wallets.

**Example**

```ts
modal.show();
```

### `.hide()`

**Parameters**

- N/A

**Returns**

- `void`

**Description**

Closes the modal.

**Example**

```ts
modal.hide();
```

### `.signInMessage(params)`

**Parameters**

- `params` (`object`)
  - `message` (`string`): The message that wants to be transmitted.
  - `nonce` (`Buffer`): A nonce that uniquely identifies this instance of the message, denoted as a 32 bytes array (a fixed `Buffer` in JS/TS).
  - `recipient` (`string`): The recipient to whom the message is destined (e.g. "alice.near" or "myapp.com").
  - `callbackUrl` (`string?`): Optional, applicable to browser wallets (e.g. MyNearWallet). The URL to call after the signing process. Defaults to `window.location.href`.
  - `state` (`string?`): Optional, applicable to browser wallets (e.g. MyNearWallet). A state for authentication purposes.


**Returns**

- `void`

**Description**

Opens the modal for users to sign in to their preferred wallet with `signInMessage` [here](../../../core/docs/api/wallet.md#signinmessageparams).

**Example**

```ts
const message = "test message to sign";
const nonce = Buffer.from(Array.from(Array(32).keys()));
const recipient = "guest-book.testnet";

modal.signInMessage({ message, nonce, recipient });
```

### `.on(event, callback)`

**Parameters**

- `event` (`string`): Name of the event. This can be: `onHide`.
- `callback` (`Function`): Handler to be triggered when the `event` fires.

**Returns**

- `Subscription`

**Description**

Attach an event handler to important events.

**Example**

```ts
const subscription = modal.on("onHide", ({ hideReason }) => {
  console.log(`The reason for hiding the modal ${hideReason}`);
});

// Unsubscribe.
subscription.remove();
```

### `.off(event, callback)`

**Parameters**

- `event` (`string`): Name of the event. This can be: `onHide`.
- `callback` (`Function`): Original handler passed to `.on(event, callback)`.

**Returns**

- `void`

**Description**

Removes the event handler attached to the given `event`.

**Example**

The `onHide` event can be triggered in different scenarios:
- When user clicks the X button on the UI the event is emitted with the `user-triggered` reason.
- When user presses the ESC key the event is emitted with the `user-triggered` reason.
- When user clicks the overlay outside the modal the event is emitted with the `user-triggered` reason.
- The modal is closed after a successful sign-in in this case the event is emitted with the `wallet-navigation` reason.

```ts
const handleModalClosed = ({
  hideReason
}: ModalEvents["onHide"]) => {
  // hideReason is a string `user-triggered` or `wallet-navigation`  
  console.log(`The reason for hiding the modal ${hideReason}`);
}

modal.on("onHide", handleModalClosed);
modal.off("onHide", handleModalClosed);
```

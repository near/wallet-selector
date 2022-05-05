# wallet-options



<!-- Auto Generated Below -->


## Properties

| Property   | Attribute  | Description | Type           | Default     |
| ---------- | ---------- | ----------- | -------------- | ----------- |
| `options`  | --         |             | `ModalOptions` | `undefined` |
| `selector` | `selector` |             | `any`          | `undefined` |


## Events

| Event                       | Description | Type                      |
| --------------------------- | ----------- | ------------------------- |
| `nearConnected`             |             | `CustomEvent<void>`       |
| `nearConnectHardwareWallet` |             | `CustomEvent<MouseEvent>` |
| `nearErrorWalletOptions`    |             | `CustomEvent<string>`     |


## Dependencies

### Used by

 - [wallet-selector](..)

### Graph
```mermaid
graph TD;
  wallet-selector --> wallet-options
  style wallet-options fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*

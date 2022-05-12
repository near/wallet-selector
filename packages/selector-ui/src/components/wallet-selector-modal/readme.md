# wallet-selector-modal



<!-- Auto Generated Below -->


## Properties

| Property | Attribute | Description                        | Type                          | Default  |
| -------- | --------- | ---------------------------------- | ----------------------------- | -------- |
| `theme`  | `theme`   | The preferred theme for the modal. | `"auto" \| "dark" \| "light"` | `"auto"` |


## Methods

### `hide() => Promise<void>`

Method to hide the modal

#### Returns

Type: `Promise<void>`



### `setSelector(selector: WalletSelector) => Promise<void>`



#### Returns

Type: `Promise<void>`



### `show() => Promise<void>`

Method to show the modal.

#### Returns

Type: `Promise<void>`




## CSS Custom Properties

| Name                 | Description                |
| -------------------- | -------------------------- |
| `--near-backdrop-bg` | Background of the backdrop |


## Dependencies

### Depends on

- [wallet-selector](../wallet-selector)

### Graph
```mermaid
graph TD;
  wallet-selector-modal --> wallet-selector
  style wallet-selector-modal fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*

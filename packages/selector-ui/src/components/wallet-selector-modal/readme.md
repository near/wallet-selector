# wallet-selector-modal



<!-- Auto Generated Below -->


## Properties

| Property | Attribute | Description                       | Type                          | Default  |
| -------- | --------- | --------------------------------- | ----------------------------- | -------- |
| `theme`  | `theme`   | The prefered theme for the modal. | `"auto" \| "dark" \| "light"` | `'auto'` |


## Methods

### `hide() => Promise<void>`

Method to hide the modal

#### Returns

Type: `Promise<void>`



### `setSelector(selector: unknown) => Promise<void>`



#### Returns

Type: `Promise<void>`



### `show() => Promise<void>`

Method to show the modal.

#### Returns

Type: `Promise<void>`




## Dependencies

### Depends on

- [wallet-selector](../wallet-selector)
- [close-button](close-button)

### Graph
```mermaid
graph TD;
  wallet-selector-modal --> wallet-selector
  wallet-selector-modal --> close-button
  style wallet-selector-modal fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*

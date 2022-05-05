# wallet-selector



<!-- Auto Generated Below -->


## Methods

### `setSelector(selector: unknown) => Promise<void>`



#### Returns

Type: `Promise<void>`




## Dependencies

### Used by

 - [wallet-selector-modal](../wallet-selector-modal)

### Depends on

- [alert-message](alert-message)
- [wallet-options](wallet-options)
- [ledger-derivation-path](ledger-derivation-path)
- [wallet-network-changed](wallet-network-changed)

### Graph
```mermaid
graph TD;
  wallet-selector --> alert-message
  wallet-selector --> wallet-options
  wallet-selector --> ledger-derivation-path
  wallet-selector --> wallet-network-changed
  wallet-selector-modal --> wallet-selector
  style wallet-selector fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*

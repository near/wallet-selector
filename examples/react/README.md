# Near Wallet Selector React Example

This React example shows how to integrate Near Wallet Selector into your React application for easy Near wallet integration.

# Usage

Start the development server:
```bash
yarn nx serve react
```

Open your web browser and navigate to http://localhost:4200/ to see the React example in action.

You should be able to interact with the Near Wallet Selector within the example application.

## Folder Structure

The folder structure of this React project is organized to maintain a clean codebase. Below is an overview of the major directories and their purposes:

- **`components/`**: Contains custom React components used in the application like `Content`, `ExportContent`, `Form`, `Loading`, `Messages`, `SignIn`.
- **`contexts/`**: Wallet Selector and Wallet-selector export has been integrated into this folder.
    - **`WalletSelectorContext/`**: Wallet Selector integration.
    - **`WalletSelectorExportContext/`**: Wallet Selector Export integration.
- **`pages/`**: Main app pages.

- **`.eslintrc.json`**: ESLint configuration for code linting.
- **`.babelrc`**: Babel configuration file for transpiling JavaScript/TypeScript code.
- **`project.json`**: Project configuration file.
- **`README.md`**: The file you are currently reading, providing project documentation.
- **`tsconfig.json`**: The root TypeScript configuration file.

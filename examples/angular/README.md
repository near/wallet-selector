# Near Wallet Selector Angular Example

This Angular example shows how to integrate Near Wallet Selector into your Angular application for easy Near wallet integration.
# Usage

Start the development server:
```bash
yarn nx serve angular
```

Open your web browser and navigate to http://localhost:4200/wallet-selector to see the Angular example in action.

You should be able to interact with the Near Wallet Selector within the example application.

## Folder Structure

The folder structure of this Angular project is organized to maintain a clean codebase. Below is an overview of the major directories and their purposes:

- **`src/`**: This is the root directory for your Angular application.
  - **`app/`**: Contains the core application components and modules.
    - **`components/`**: Custom Angular components used in the application like `content`, `form`, `loading`, `messages` and `sign-in`.
    - **`pages/`**: Wallet Selector and Wallet-selector export has been integrated into this folder.
      - **`wallet-selector/`**: Wallet Selector integration.
      - **`wallet-selector-export/`**: Wallet Selector Export integration.
  - **`environments/`**: Environment configuration files.

- **`.eslintrc.json`**: ESLint configuration for code linting.
- **`jest.config.ts`**: Configuration file for Jest.
- **`project.json`**: Project configuration file.
- **`README.md`**: The file you are currently reading, providing project documentation.
- **`tsconfig.app.json`**: TypeScript configuration to Angular application.
- **`tsconfig.editor.json`**: TypeScript configuration for code editor.
- **`tsconfig.json`**: The root TypeScript configuration file.


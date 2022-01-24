import 'regenerator-runtime/runtime';
import React from 'react';
import TestRenderer from 'react-test-renderer';
import App from '../../App';
const { act } = TestRenderer;

// Declare stubs for contract, walletConnection, and nearConfig
const contract = {
  account: {
    connection: {},
    accountId: 'test.near'
  },
  contractId: 'test.near',
  getMessages: () => new Promise(() => {}),
  addMessage: () => ''
};
const walletConnection = {
  account: () => ({ _state: { amount: '1' + '0'.repeat(25) } }),
  requestSignIn: () => null,
  signOut: () => null,
  isSignedIn: () => false,
  getAccountId: () => 'test.near'
};
const nearConfig = {
  networkId: 'testnet',
  nodeUrl: 'https://rpc.testnet.near.org',
  contractName: 'test.near',
  walletUrl: 'https://wallet.testnet.near.org',
  helperUrl: 'https://near-contract-helper.onrender.com'
};

// For UI tests, use pattern from: https://reactjs.org/docs/test-renderer.html
let container;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

it('renders with proper title', () => {
  let testRenderer;

  act(() => {
    testRenderer = TestRenderer.create(
      <App contract={contract} wallet={walletConnection} nearConfig={nearConfig} />
    );
  });

  const testInstance = testRenderer.root;

  expect(testInstance.findByType('h1').children).toEqual(['NEAR Guest Book']);
});

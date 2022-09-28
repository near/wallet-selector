#!/usr/bin/env bash

OTP=123456
TAG=latest

npm publish dist/packages/core --tag "${TAG}" --otp "${OTP}"
npm publish dist/packages/modal-ui --tag "${TAG}" --otp "${OTP}"
npm publish dist/packages/wallet-utils --tag "${TAG}" --otp "${OTP}"
npm publish dist/packages/near-wallet --tag "${TAG}" --otp "${OTP}"
npm publish dist/packages/my-near-wallet --tag "${TAG}" --otp "${OTP}"
npm publish dist/packages/sender --tag "${TAG}" --otp "${OTP}"
npm publish dist/packages/math-wallet --tag "${TAG}" --otp "${OTP}"
npm publish dist/packages/nightly --tag "${TAG}" --otp "${OTP}"
npm publish dist/packages/ledger --tag "${TAG}" --otp "${OTP}"
npm publish dist/packages/wallet-connect --tag "${TAG}" --otp "${OTP}"
npm publish dist/packages/nightly-connect --tag "${TAG}" --otp "${OTP}"
npm publish dist/packages/meteor-wallet --tag "${TAG}" --otp "${OTP}"
npm publish dist/packages/default-wallets --tag "${TAG}" --otp "${OTP}"
npm publish dist/packages/modal-ui-js --tag "${TAG}" --otp "${OTP}"

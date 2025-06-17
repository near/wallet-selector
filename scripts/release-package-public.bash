OTP=112233
TAG=latest

npm publish dist/packages/hot-wallet --tag "${TAG}" --otp "${OTP}" --access public
npm publish dist/packages/react-hook --tag "${TAG}" --otp "${OTP}" --access public
npm publish dist/packages/intear-wallet --tag "${TAG}" --otp "${OTP}" --access public

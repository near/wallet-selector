import { detect } from "detect-browser";
import mobile from "is-mobile";

const HelperFunctions = {
  getBrowser() {
    return detect();
  },
  isMobile() {
    return mobile();
  }
};

export default HelperFunctions;

export function delay(fn: Function, wait: number, args?: any[]) {
  return setTimeout(() => {
    // eslint-disable-next-line prefer-spread
    return fn.apply(null, args);
  }, wait);
}

export function defer(fn: Function, args?: any[]) {
  return delay(fn, 0, args);
}

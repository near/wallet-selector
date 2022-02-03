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

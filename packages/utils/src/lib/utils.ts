import isMobile from "is-mobile";
import { BN } from "bn.js";
import { utils } from "near-api-js";

const parseNearAmount = utils.format.parseNearAmount;
const parseBigNumber = (value: string) => new BN(value);

export { isMobile, parseNearAmount, parseBigNumber };

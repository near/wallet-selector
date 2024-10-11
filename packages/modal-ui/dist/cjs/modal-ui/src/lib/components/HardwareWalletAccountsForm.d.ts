import React from "react";
import type { HardwareRoutes, HardwareWalletAccountState } from "./DerivationPath";
interface FormProps {
    accounts: Array<HardwareWalletAccountState>;
    onSelectedChanged: (index: number, selected: boolean) => void;
    onSubmit: (accounts: Array<HardwareWalletAccountState>, e: React.FormEvent<HTMLFormElement>) => void;
    onChangeRoute: (route: HardwareRoutes) => void;
}
declare const HardwareWalletAccountsForm: React.FC<FormProps>;
export default HardwareWalletAccountsForm;
//# sourceMappingURL=HardwareWalletAccountsForm.d.ts.map
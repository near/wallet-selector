import { Contract } from "near-api-js"

const NearContract = (account: any, contractId: any, views: any, changes: any) => {
    return new Contract(account, contractId,{
        viewMethods: views,
        changeMethods: changes        
    });
}   

export default NearContract
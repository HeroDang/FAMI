import * as httpRequest from '@/utils/httpRequest';

export const getAccountList= async () => {
    try {
        const res = await httpRequest.get('accounts/getlist', {
            
        });
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const createAccount= async (account) => {
    try {
        const res = await httpRequest.post('accounts/create',account);
        
        return res;
    } catch (error) {
        console.log(error);
    }
};
export const updateAccount= async (account,_id) => {
    try {
        const res = await httpRequest.put(`accounts/update/${_id}`,account);
        
        return res;
    } catch (error) {
        console.log(error);
    }
};
export const deleteAccount= async (_id) => {
    try {
        const res = await httpRequest.deleted(`accounts/delete/${_id}`);
        
        return res;
    } catch (error) {
        console.log(error);
    }
};

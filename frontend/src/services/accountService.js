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

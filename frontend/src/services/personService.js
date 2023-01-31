import * as httpRequest from '@/utils/httpRequest';

export const getListToForm = async () => {
    try {
        const res = await httpRequest.get('persons/getlisttoform');
        return res;
    } catch (error) {
        console.log(error);
    }
};

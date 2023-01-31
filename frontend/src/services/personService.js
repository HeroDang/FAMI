import * as httpRequest from '@/utils/httpRequest';

export const getListToForm = async () => {
    try {
        const res = await httpRequest.get('persons/getlisttoform');
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const getListToSpecForm = async () => {
    try {
        const res = await httpRequest.get('persons/getlisttospecform');
        return res;
    } catch (error) {
        console.log(error);
    }
};

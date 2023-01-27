import * as httpRequest from '@/utils/httpRequest';

export const getMEFormList = async () => {
    try {
        const res = await httpRequest.get('meform/getlist');
        // console.log('res', res);
        return res;
    } catch (error) {
        console.log(error);
    }
};

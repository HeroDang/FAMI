import * as httpRequest from '@/utils/httpRequest';

export const getExamBySpecFormId = async (specFormId) => {
    try {
        const res = await httpRequest.get(`exam/getExam/${specFormId}`);
        return res;
    } catch (error) {
        console.log(error);
    }
};

// export const getListToSpecForm = async () => {
//     try {
//         const res = await httpRequest.get('persons/getlisttospecform');
//         return res;
//     } catch (error) {
//         console.log(error);
//     }
// };

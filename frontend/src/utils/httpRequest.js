import axios from 'axios';

const httpRequest = axios.create({
    baseURL: "http://localhost:3001/",
});

export const get = async (path, option = {}) => {
    const reponse = await httpRequest.get(path, option);
    return reponse.data;
};

export default httpRequest;

//local / development
//Test / Staging
//UAT
//Production

import axios from "axios"
//доп настройки axios

// стандартный путь для отправки запросов
const instance = axios.create({
    //url
    baseURL: "http://94.26.250.179:8000/api/"
})

// добавляет токен в хедер запросов
// instance.interceptors.request.use(config => {
//     const myToken = window.localStorage.getItem('VodoleyToken');
//     config.headers.Authorization = `token ${myToken}`;
//     return config;
// })

export default instance
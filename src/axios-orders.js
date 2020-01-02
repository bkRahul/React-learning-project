import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-builder-59724.firebaseio.com/'
});

export default instance;
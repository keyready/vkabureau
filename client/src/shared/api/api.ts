import axios from 'axios';

import { USER_LOCALSTORAGE_KEY } from '@/shared/const';

axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

export const $api = axios.create({});

$api.interceptors.request.use((config) => {
    if (config.headers) {
        const token = localStorage.getItem(USER_LOCALSTORAGE_KEY);

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    }

    return config;
});

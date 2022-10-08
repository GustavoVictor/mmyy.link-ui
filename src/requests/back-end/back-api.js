import React, { useState } from 'react';
import axios from 'axios';

const back_api_url = 'https://localhost:7045';

axios.interceptors.request.use(
    config => { 
        const { origin } = new URL(config.url);
        const allowedOrigins = [apiUrl];
        const token = localStorage.getItem('token');

        if(allowedOrigins.includes(origin)){
            config.headers.authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);


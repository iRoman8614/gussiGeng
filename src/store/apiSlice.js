import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Настраиваем API для работы с базовым URL
export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://supavpn.lol' }), // Используем твой базовый URL
    endpoints: (builder) => ({
        getProfile: builder.query({
            query: (profileId) => `/profile/init?profileId=${profileId}`,
        }),
        startFarm: builder.query({
            query: (profileId) => `/farm/start?profileId=${profileId}`,
        }),
    }),
});

export const { useGetProfileQuery, useStartFarmQuery } = apiSlice;

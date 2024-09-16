import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const gameApi = createApi({
    reducerPath: 'gameApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://supavpn.lol' }),
    endpoints: (builder) => ({
        startGame: builder.query({
            query: (profileId) => `/game/start?profileId=${profileId}`,
        }),
        sendAnswer: builder.query({
            query: ({ profileId, sessionId, answer }) =>
                `/game/answer?profileId=${profileId}&sessionId=${sessionId}&answer=${answer}`,
        }),
    }),
});

export const { useStartGameQuery, useSendAnswerQuery } = gameApi;

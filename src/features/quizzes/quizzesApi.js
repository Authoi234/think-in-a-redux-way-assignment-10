import { apiSlice } from "../api/apiSlice";

export const quizzesApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getQuizzes: builder.query({
            query: () => '/quizzes',
            keepUnusedDataFor: 1500,
            providesTags: [
                "Quizzes"
            ]
        })
    }),
});

export const { useGetQuizzesQuery } = quizzesApi;
import { apiSlice } from "../api/apiSlice";

export const quizzesApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getQuizzes: builder.query({
            query: () => '/quizzes',
            keepUnusedDataFor: 1500,
            providesTags: [
                "Quizzes"
            ]
        }),
        GetQuizzesMarks: builder.query({
            query: () => "/quizMark",
            keepUnusedDataFor: 1500,
            providesTags: [
                "QuizzesMarks"
            ]
        }),
        getQuizMark: builder.query({
            query: ({ studentId, videoId }) => `/quizMark?student_id=${studentId}&video_id=${videoId}`,
            keepUnusedDataFor: 1500,
        }),
        addQuizMark: builder.mutation({
            query: (data) => ({
                url: '/quizMark',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: (result, error, arg) => [
                "Quizzes",
                "QuizzesMarks"
            ],
        })
    }),
});

export const { useGetQuizzesQuery, useGetQuizMarkQuery, useGetQuizzesMarksQuery, useAddQuizMarkMutation } = quizzesApi;
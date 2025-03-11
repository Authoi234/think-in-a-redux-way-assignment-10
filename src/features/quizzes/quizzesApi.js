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
        deleteQuiz: builder.mutation({
            query: (id) => ({
                url: `/quizzes/${id}`,
                method: 'delete',
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                const pathResult = dispatch(
                    apiSlice.util.updateQueryData("getQuizzes", undefined, (draft) => {
                        const index = draft?.findIndex((item) => item.id === arg);
                        if (index !== -1) {
                            draft?.splice(index, 1);
                        }
                    })
                );

                try {
                    await queryFulfilled;
                } catch (err) {
                    pathResult.undo();
                }
            },
            invalidatesTags: (result, error, arg) => [
                "Quizzes",
            ],
        }),
        getQuiz: builder.query({
            query: (id) => `/quizzes/${id}`,
            providesTags: (result, error, arg) => [{ type: "Quiz", id: arg }]
        }),
        editQuiz: builder.mutation({
            query: ({ id, data }) => ({
                url: `/quizzes/${id}`,
                method: 'PATCH',
                body: data,
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const { data: updatedQuiz } = await queryFulfilled;
                    dispatch(
                        apiSlice.util.updateQueryData(
                            "getQuizzes",
                            undefined,
                            (draft) => {
                                if (!draft) return;
                                const draftQuiz = draft?.find((item) => item?.id == updatedQuiz?.id);
                                if (draftQuiz) {
                                    Object.assign(draftQuiz, updatedQuiz);
                                };
                            }
                        )
                    );
                } catch (err) {

                }
            },
            invalidatesTags: (result, error, arg) => [
                "Quizzes",
                {
                    type: "Quiz",
                    id: arg?.id
                }
            ],
        }),
        addQuiz: builder.mutation({
            query: (data) => ({
                url: `/quizzes`,
                method: 'POST',
                body: data,
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const { data: newQuiz } = await queryFulfilled;
                    dispatch(
                        apiSlice.util.updateQueryData(
                            "getQuizzes",
                            undefined,
                            (draft) => {
                                if (!draft) return;
                                draft.push(newQuiz);
                            }
                        )
                    );
                } catch (err) {

                }
            },
            invalidatesTags: (result, error, arg) => [
                "Quizzes"
            ],
        }),
        getQuizMark: builder.query({
            query: ({ studentId, videoId }) => `/quizMark?student_id=${studentId}&video_id=${videoId}`,
            keepUnusedDataFor: 1500,
        }),
        getTotalQuizMark: builder.query({
            query: (studentId) => `/quizMark?student_id=${studentId}`,
            keepUnusedDataFor: 1500,
        }),
        addQuizMark: builder.mutation({
            query: (data) => ({
                url: '/quizMark',
                method: 'POST',
                body: data,
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const { data: quizMark } = await queryFulfilled;
                    dispatch(
                        apiSlice.util.updateQueryData("getQuizzezMarks", undefined, (draft) => {
                            draft.push(quizMark);
                        })
                    );
                } catch (err) {
                }
            },
            invalidatesTags: (result, error, arg) => [
                "Quizzes",
                "QuizzesMarks"
            ],
        })
    }),
});

export const { useGetQuizzesQuery, useGetQuizMarkQuery, useGetQuizzesMarksQuery, useGetTotalQuizMarkQuery, useAddQuizMarkMutation, useDeleteQuizMutation, useGetQuizQuery, useEditQuizMutation, useAddQuizMutation } = quizzesApi;
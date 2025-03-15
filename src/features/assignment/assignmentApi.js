import { apiSlice } from "../api/apiSlice";

export const assignmentApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAssignments: builder.query({
            query: () => '/assignments',
            keepUnusedDataFor: 500,
            providesTags: [
                "Assignments"
            ]
        }),
        getAssignment: builder.query({
            query: (assignmentId) => `/assignments/${assignmentId}`,
            keepUnusedDataFor: 1500,
            providesTags: (result, error, arg) => [{ type: "Assignment", id: arg }]
        }),
        deleteAssignment: builder.mutation({
            query: (id) => ({
                url: `/assignments/${id}`,
                method: 'delete',
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                const pathResult = dispatch(
                    apiSlice.util.updateQueryData("getAssignments", undefined, (draft) => {
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
                "Assignments",
            ],
        }),
        editAssignment: builder.mutation({
            query: ({ id, data }) => ({
                url: `/assignments/${id}`,
                method: 'PATCH',
                body: data,
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const { data: updatedAssignment } = await queryFulfilled;
                    dispatch(
                        apiSlice.util.updateQueryData(
                            "getAssignments",
                            undefined,
                            (draft) => {
                                const draftAssignment = draft?.find((item) => Number(item.id) == Number(updatedAssignment.id));
                                if (draftAssignment) {
                                    Object.assign(draftAssignment, updatedAssignment);
                                }
                            }
                        )
                    );
                } catch (err) {

                }
            },
            invalidatesTags: (result, error, arg) => [
                "Assignments",
                {
                    type: "Assignment",
                    id: arg?.id
                }
            ],
        }),
        addAssignment: builder.mutation({
            query: (data) => ({
                url: "/assignments",
                method: "POST",
                body: data,
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(
                        apiSlice.util.updateQueryData(
                            "getAssignments",
                            undefined,
                            (draft) => {
                                if (!draft) return;
                                draft.push(data)
                            }
                        )
                    )
                } catch (err) {

                }
            },
            invalidatesTags: [
                "Assignments"
            ]
        }),
        GetAssignmentsMarks: builder.query({
            query: () => "/assignmentMark",
            keepUnusedDataFor: 1500,
            providesTags: [
                "AssignmentsMarks"
            ]
        }),
        getAssignmentMark: builder.query({
            query: ({ studentId, assignmentId }) => `/assignmentMark?student_id=${studentId}&assignment_id=${assignmentId}`,
            keepUnusedDataFor: 1500,
        }),
        addAssignmentMark: builder.mutation({
            query: (data) => ({
                url: '/assignmentMark',
                method: 'POST',
                body: data,
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const { data: assginmentMark } = await queryFulfilled;
                    dispatch(
                        apiSlice.util.updateQueryData("GetAssignmentsMarks", undefined, (draft) => {
                            draft.push(assginmentMark);
                        })
                    );
                } catch (err) {
                }
            },
            invalidatesTags: (result, error, arg) => [
                "Assignments",
                "AssignmentsMarks",
            ],
        }),
        getTotalAssignmentMark: builder.query({
            query: (studentId) => `/assignmentMark?student_id=${studentId}`,
            keepUnusedDataFor: 1500,
        }),
        editAssignmentMark: builder.mutation({
            query: ({ id, data }) => ({
                url: `/assignmentMark/${id}`,
                method: 'PATCH',
                body: data,
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const { data: updatedAssignmentMark } = await queryFulfilled;
                    dispatch(
                        apiSlice.util.updateQueryData(
                            "GetAssignmentsMarks",
                            undefined,
                            (draft) => {
                                const draftAssignmentMark = draft?.find(
                                    (item) => Number(item.id) === Number(updatedAssignmentMark.id)
                                );
                                if (draftAssignmentMark) {
                                    Object.assign(draftAssignmentMark, updatedAssignmentMark);
                                }
                            }
                        )
                    );
                } catch (err) {

                }
            },
            invalidatesTags: (result, error, arg) => [
                "AssignmentsMarks"
            ],
        })
    }),
});

export const { useGetAssignmentsQuery, useGetAssignmentQuery, useGetAssignmentMarkQuery, useGetAssignmentsMarksQuery, useAddAssignmentMarkMutation, useGetTotalAssignmentMarkQuery, useDeleteAssignmentMutation, useEditAssignmentMutation, useAddAssignmentMutation, useEditAssignmentMarkMutation } = assignmentApi;
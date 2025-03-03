import { apiSlice } from "../api/apiSlice";

export const assignmentApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAssignments: builder.query({
            query: () => '/assignments',
            keepUnusedDataFor: 1500,
            providesTags: [
                "Assignments"
            ]
        }),
        getAssignment: builder.query({
            query: (assignmentId) => `/assignments/${assignmentId}`,
            keepUnusedDataFor: 1500
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
            invalidatesTags: (result, error, arg) => [
                "Assignments",
                "AssignmentsMarks",
            ],
        }),
        getTotalAssignmentMark: builder.query({
            query: (studentId) => `/assignmentMark?student_id=${studentId}`,
            keepUnusedDataFor: 1500,
        }),
    }),
});

export const { useGetAssignmentsQuery, useGetAssignmentQuery, useGetAssignmentMarkQuery, useGetAssignmentsMarksQuery, useAddAssignmentMarkMutation, useGetTotalAssignmentMarkQuery } = assignmentApi;
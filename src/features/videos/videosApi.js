import { apiSlice } from "../api/apiSlice";

export const videosApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getVideos: builder.query({
            query: () => '/videos',
            keepUnusedDataFor: 600,
            providesTags: [
                "Videos"
            ]
        }),
        getVideo: builder.query({
            query: (videoId) => `/videos/${videoId}`,
            providesTags: (result, error, arg) => [{type: "Video", id: arg}],
        })
    }),
});

export const { useGetVideosQuery, useGetVideoQuery } = videosApi;
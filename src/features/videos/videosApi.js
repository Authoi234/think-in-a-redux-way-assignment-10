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
            providesTags: (result, error, arg) => [{ type: "Video", id: arg }],
        }),
        editVideo: builder.mutation({
            query: ({ id, data }) => ({
                url: `/videos/${id}`,
                method: 'PATCH',
                body: data,
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const { data: updatedVideo } = await queryFulfilled;
                    dispatch(
                        apiSlice.util.updateQueryData(
                            "getVideos",
                            undefined,
                            (draft) => {
                                if (!draft) return;
                                const draftVideo = draft.find((v) => v?.id == updatedVideo?.id);
                                if (draftVideo) {
                                    Object.assign(draftVideo, updatedVideo);
                                };
                            }
                        )
                    );
                } catch (err) {

                }
            },
            invalidatesTags: (result, error, arg) => [
                "Videos",
                {
                    type: "Video",
                    id: arg?.id
                }
            ],
        })
    }),
});

export const { useGetVideosQuery, useGetVideoQuery } = videosApi;
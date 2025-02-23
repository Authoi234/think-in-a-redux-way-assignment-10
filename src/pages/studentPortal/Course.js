import React, { useEffect, useState } from 'react';
import VideoPlayer from './VideoPlayer';
import CourseSidebar from './CourseSidebar';
import { useGetVideoQuery, useGetVideosQuery } from '../../features/videos/videosApi';
import { useGetQuizzesQuery } from '../../features/quizzes/quizzesApi';

const Course = () => {
    const { data: videos, isLoading, isError } = useGetVideosQuery();
    const { data: quizzes, isLoading: isQuizzesLoading, isError: isQuizzesError } = useGetQuizzesQuery();
    const [videoId, setVideoId] = useState(1);
    const { data: video, isLoading: isPlayerLoading, isError: isPlayerError } = useGetVideoQuery(videoId);

    const handleVideoChange = (newId) => {
        setVideoId(newId);
    };

    const quizOfVideo = quizzes?.filter(quiz => quiz.video_id === videoId);

    return (
        <section class="py-6 bg-primary">
            <div class="mx-auto max-w-7xl px-5 lg:px-0">
                <div class="grid grid-cols-3 gap-2 lg:gap-8">
                    <VideoPlayer video={video} quizOfVideo={quizOfVideo}></VideoPlayer>
                    <CourseSidebar videos={videos} handleVideoChange={handleVideoChange} isLoading={isLoading} isError={isError}></CourseSidebar>
                </div>
            </div>
        </section>
    );
};

export default Course;
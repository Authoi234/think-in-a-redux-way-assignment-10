import React, { useEffect, useState } from 'react';
import VideoPlayer from './VideoPlayer';
import CourseSidebar from './CourseSidebar';
import { useGetVideoQuery, useGetVideosQuery } from '../../features/videos/videosApi';
import { useGetQuizMarkQuery, useGetQuizzesQuery } from '../../features/quizzes/quizzesApi';
import { useSelector } from 'react-redux';
import { useAddAssignmentMarkMutation, useGetAssignmentMarkQuery, useGetAssignmentsQuery } from '../../features/assignment/assignmentApi';

const Course = () => {
    const { user } = useSelector(state => state.auth);
    const [videoId, setVideoId] = useState(1);
    const { id: studentId } = user || {};

    const { data: videos, isLoading, isError } = useGetVideosQuery();
    const { data: video, isLoading: isPlayerLoading, isError: isPlayerError } = useGetVideoQuery(videoId);

    const { data: quizzes, isLoading: isQuizzesLoading, isError: isQuizzesError } = useGetQuizzesQuery();
    const { data: quizMark = {}, isLoading: isQuizMarkLoading, isError: isQuizMarkError } = useGetQuizMarkQuery({ studentId, videoId }, { refetchOnMountOrArgChange: true });

    const { data: assignments, isLoading: isAssignmentsLoading, isError: isAssignmentsError } = useGetAssignmentsQuery();

    const quizOfVideo = quizzes?.filter(quiz => quiz.video_id === videoId);
    const assignmentsOfVideo = (assignments || [])?.filter(assignment => assignment?.video_id === videoId);

    const assignmentId = assignmentsOfVideo?.[0]?.id;
    const { data: assignemntsMark, refetch:refetchOfAssginmentMark } = useGetAssignmentMarkQuery(
        { studentId: studentId, assignmentId, },
        { refetchOnMountOrArgChange: true, }
    );
    const [addAssignmentMark, {data:assignmentMarkAddData, isSuccess:isAssignmentMarkSuccess , isLoading: isAssignmentMarkLoading, isError:isAssignmentMarkError}] = useAddAssignmentMarkMutation();


    const handleVideoChange = (newId) => {
        setVideoId(newId);
    };

    return (
        <section className="py-6 bg-[#080e1b]">
            <div className="mx-auto max-w-7xl px-5 lg:px-0">
                <div className="grid grid-cols-3 gap-2 lg:gap-8">
                    <VideoPlayer addAssignmentMark={addAssignmentMark} video={video} refetchOfAssginmentMark={refetchOfAssginmentMark} isAssignmentMarkSuccess={isAssignmentMarkSuccess} isAssignmentMarkError={isAssignmentMarkError} isAssignmentMarkLoading={isAssignmentMarkLoading} quizMark={quizMark} assignmentsOfVideo={assignmentsOfVideo} assignemntsMark={assignemntsMark} quizOfVideo={quizOfVideo}></VideoPlayer>
                    <CourseSidebar videos={videos} handleVideoChange={handleVideoChange} isLoading={isLoading} isError={isError}></CourseSidebar>
                </div>
            </div>
        </section>
    );
};

export default Course;
import React, { useState } from 'react';
import VideoPlayer from './VideoPlayer';
import CourseSidebar from './CourseSidebar';

const Course = () => {
    const [test, setTest] = useState();

    return (
        <section class="py-6 bg-primary">
            <div class="mx-auto max-w-7xl px-5 lg:px-0">
                <div class="grid grid-cols-3 gap-2 lg:gap-8">
                    <VideoPlayer></VideoPlayer>
                    <CourseSidebar></CourseSidebar>
                </div>
            </div>
        </section>
    );
};

export default Course;
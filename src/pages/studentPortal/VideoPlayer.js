import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';

const VideoPlayer = ({ video, quizOfVideo }) => {
    const formattedDate = useMemo(() => {
        if (!video?.createdAt) return "";

        const date = new Date(video.createdAt);
        if (isNaN(date.getTime())) return "";

        return new Intl.DateTimeFormat("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric"
        }).format(date);
    }, [video?.createdAt]);

    return (
        <div class="col-span-full w-full space-y-8 lg:col-span-2">
            <iframe width="100%" class="aspect-video" src={video?.url}
                title="Things I wish I knew as a Junior Web Developer - Sumit Saha - BASIS SoftExpo 2023"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen></iframe>

            <div>
                <h1 class="text-lg font-semibold tracking-tight text-slate-100">
                    {video?.title}
                </h1>
                <h2 class=" pb-4 text-sm leading-[1.7142857] text-slate-400">Uploaded on {formattedDate}</h2>

                <div class="flex gap-4">
                    <a href="#"
                        class="px-3 font-bold py-1 border border-cyan text-cyan rounded-full text-sm hover:bg-cyan hover:text-primary">
                        এসাইনমেন্ট
                    </a>

                    {
                        quizOfVideo?.length ?
                            <Link
                                to={`/StudentPortal/quizzes/${video?.id}`}
                                class="px-3 font-bold py-1 border border-cyan text-cyan rounded-full text-sm hover:bg-cyan hover:text-primary">কুইজে
                                অংশগ্রহণ করুন
                            </Link>
                            :
                            <p style={{ borderColor: "red", borderWidth: '1px' }} class="px-3 font-bold py-1 border rounded-full text-sm  text-red-500">
                                কুইজ নেই
                            </p>
                    }
                </div>
                <p class="mt-4 text-sm text-slate-400 leading-6">
                    {video?.description}
                </p>


            </div>
        </div>
    );
};

export default VideoPlayer;
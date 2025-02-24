import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaXmark } from "react-icons/fa6";
import { MdAssignment } from "react-icons/md";
import { IoIosWarning } from "react-icons/io";

const VideoPlayer = ({ video, quizOfVideo, quizMark, assignmentsOfVideo }) => {
    console.log(assignmentsOfVideo)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [githubRepoLink, setGithubRepoLink] = useState("");

    const currentDate = new Date().toISOString();

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

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

    let quizContent = null;
    let assignmentContent = null;

    const modalOverlayStyle = {
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    };

    const modalStyle = {
        padding: "20px",
        borderRadius: "8px",
        textAlign: "center",
        color: "white",
        backgroundColor: "#0A1121"
    };

    const handleSubmitAssignment = (e) => {
        e.preventDefault();

    };

    // quiz Content
    if (quizOfVideo?.length && Object.keys(quizMark).length === 0) quizContent = <Link to={`/StudentPortal/quizzes/${video?.id}`} class="px-3 font-bold py-1 border border-cyan text-cyan rounded-full text-sm hover:bg-cyan hover:text-primary"> কুইজে অংশগ্রহণ করুন </Link>
    else quizContent = <p style={{ borderColor: "red", borderWidth: '1px' }} class="px-3 font-bold py-1 border rounded-full text-sm  text-red-500"> কুইজ নেই </p>

    // Assignment content
    if (assignmentsOfVideo?.length) assignmentContent = <button onClick={openModal} class="px-3 font-bold py-1 border border-cyan text-cyan rounded-full text-sm hover:bg-cyan hover:text-primary"> এসাইনমেন্ট </button>
    else assignmentContent = <p style={{ borderColor: "red", borderWidth: '1px' }} class="px-3 font-bold py-1 border rounded-full text-sm  text-red-500"> এসাইনমেন্ট নেই </p>

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
                    {
                        assignmentContent
                    }

                    {
                        quizContent
                    }
                </div>
                <p class="mt-4 text-sm text-slate-400 leading-6">
                    {video?.description}
                </p>

                {isModalOpen && <div style={modalOverlayStyle}>
                    <div style={modalStyle}>
                        <div style={{ display: 'flex', justifyContent: 'right', alignItems: "center" }}>
                            <button style={{ fontSize: '25px', padding: "3px", borderRadius: "50%", backgroundColor: "rgba(0,0,0,0.1)" }} onClick={closeModal}><FaXmark></FaXmark></button>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'left', alignItems: "center" }}>
                            <p style={{ display: 'flex', alignItems: "center", fontSize: '17px', padding: "3px", borderRadius: "50%", backgroundColor: "rgba(0,0,0,0.1)" }} onClick={closeModal}><MdAssignment></MdAssignment> <span style={{ padding: "5px" }}>Total Mark — {assignmentsOfVideo[0]?.totalMark}</span></p>
                        </div>
                        <div>
                            <h3 className='text-2xl px-5 py-3 font-semifold'>
                                {assignmentsOfVideo[0]?.title}
                            </h3>
                            <p style={{ fontSize: "20px" }}>
                                Video — {assignmentsOfVideo[0]?.video_title}
                            </p>
                            <hr className="w-full" style={{ borderColor: "red", borderWidth: "1px", margin: "4px 0" }} />
                            <form onSubmit={handleSubmitAssignment} style={{ textAlign: "start" }}>
                                <div style={{ marginBottom: "10px" }}>
                                    <label style={{ display: "block", fontWeight: "bold", color: "rgba(243, 243, 243, 0.74)", marginBottom: "4px" }}>GitHub Repository Link:</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={githubRepoLink}
                                        placeholder='Assignment Github Repository Link'
                                        onChange={(e) => setGithubRepoLink(e.target.value)}
                                        style={{ width: "100%", padding: "8px", border: "1px solid rgb(45, 45, 45)", backgroundColor: "rgb(52, 62, 65)", borderRadius: "4px" }}
                                    />
                                </div>
                                <button type="submit" className='btn' style={{ width: "100%", borderRadius: "5px", height: "40px" }}>
                                    Submit
                                </button>
                                <div className="w-full " style={{ padding: "10px", display: 'flex', justifyContent: "center", alignItems: "center", borderRadius: "5px", margin: "10px 0", backgroundColor: "rgba(250, 30, 5, 0.2)" }}>
                                    <IoIosWarning style={{color: "yellow"}} />
                                    <span style={{color: "rgba(243, 243, 243, 0.74)", fontSize: "15px"}}>Check the link Again Before Submitting. It cant be undone.</span>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>}

            </div>
        </div>
    );
};

export default VideoPlayer;
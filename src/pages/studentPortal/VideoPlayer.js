import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaXmark } from "react-icons/fa6";
import { MdAssignment, MdError } from "react-icons/md";
import { IoIosWarning } from "react-icons/io";
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const VideoPlayer = ({ video, quizOfVideo, quizMark, assignmentsOfVideo, assignemntsMark, addAssignmentMark, isAssignmentMarkLoading, isAssignmentMarkError, isAssignmentMarkSuccess, refetchOfAssginmentMark }) => {
    const { user } = useSelector(state => state.auth);
    const [isAssignmentSubmitted, setIsAssignmentSubmitted] = useState(false);
    const { id, name } = user;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [githubRepoLink, setGithubRepoLink] = useState("");

    useEffect(() => {
        if(isAssignmentMarkSuccess) {
            setIsModalOpen(false);
            toast("Assignment Successfully Submitted");
            setIsAssignmentSubmitted(true);
            refetchOfAssginmentMark();
        }
        
    }, [isAssignmentMarkSuccess, refetchOfAssginmentMark])

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
        backgroundColor: "#0A1121",
        width: "90%",
        maxWidth: "800px",
        maxHeight: "90vh",
        overflowY: "auto",
    };

    const handleSubmitAssignment = (e) => {
        e.preventDefault();
        const assignmentObject = {
            student_id: id,
            student_name: name,
            assignment_id: assignmentsOfVideo[0]?.id,
            title: assignmentsOfVideo[0]?.title,
            createdAt: currentDate,
            totalMark: assignmentsOfVideo[0]?.totalMark,
            mark: 0,
            repo_link: githubRepoLink,
            status: "pending"
        }

        addAssignmentMark(assignmentObject);
    };
    console.log(assignemntsMark)
    // quiz Content
    if (quizOfVideo?.length === 0) quizContent = <p style={{ borderColor: "red", borderWidth: '1px' }} className="px-3 font-bold py-1 border rounded-full text-sm  text-red-500"> কুইজ নেই </p>;
    else if ((quizOfVideo?.length > 0) && (Object.keys(quizMark).length === 0)) quizContent = <Link to={`/StudentPortal/quizzes/${video?.id}`} className="px-3 font-bold py-1 border border-cyan text-cyan rounded-full text-sm hover:bg-cyan hover:text-primary"> কুইজে অংশগ্রহণ করুন </Link>;
    else if ((quizOfVideo?.length > 0) && (Object.keys(quizMark).length > 0)) quizContent = <p style={{ borderColor: "yellow", borderWidth: '1px', color: "yellow" }} className="px-3 font-semibold py-1 border rounded-full text-sm"> কুইজ দিয়েছেন </p>

    // Assignment content
    if (assignmentsOfVideo?.length === 0) assignmentContent = <p style={{ borderColor: "red", borderWidth: '1px' }} className="px-3 font-bold py-1 border rounded-full text-sm  text-red-500"> এসাইনমেন্ট নেই </p>
    else if ((assignmentsOfVideo?.length > 0) && assignemntsMark?.length === 0) assignmentContent = <button onClick={openModal} className="px-3 font-bold py-1 border border-cyan text-cyan rounded-full text-sm hover:bg-cyan hover:text-primary"> এসাইনমেন্ট </button>
    else if ((assignmentsOfVideo?.length > 0) && ((assignemntsMark?.length > 0) || isAssignmentSubmitted)) assignmentContent = <button disabled style={{ borderColor: 'yellow' }} className="px-3 font-bold py-1 border text-yellow-500 rounded-full text-sm "> এসাইনমেন্ট দিয়েছেন </button>

    return (
        <div className="col-span-full w-full space-y-8 lg:col-span-2">
            <iframe width="100%" className="aspect-video" src={video?.url}
                title="Things I wish I knew as a Junior Web Developer - Sumit Saha - BASIS SoftExpo 2023"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen></iframe>

            <div>
                <h1 className="text-lg font-semibold tracking-tight text-slate-100">
                    {video?.title}
                </h1>
                <h2 className=" pb-4 text-sm leading-[1.7142857] text-slate-400">Uploaded on {formattedDate}</h2>

                <div className="flex gap-4">
                    {
                        assignmentContent
                    }

                    {
                        quizContent
                    }
                </div>
                <p className="mt-4 text-sm text-slate-400 leading-6">
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
                        <div style={{ width: "100%", display: 'flex', justifyContent: 'center', alignItems: "center" }}>
                            <img style={{ width: "250px" }} src={require("../../assets/image/studentWorkingInComputer.png")} alt="" />
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
                                <button disabled={isAssignmentMarkLoading} type="submit" className='btn' style={{ width: "100%", borderRadius: "5px", height: "40px" }}>
                                    Submit
                                </button>
                                <div className="w-full " style={{ padding: "10px", display: 'flex', justifyContent: "center", alignItems: "center", borderRadius: "5px", margin: "10px 0", backgroundColor: "rgba(250, 30, 5, 0.2)" }}>
                                    <IoIosWarning style={{ color: "yellow" }} />
                                    <span style={{ color: "rgba(243, 243, 243, 0.74)", fontSize: "15px" }}>Check the link Again Before Submitting. It cant be undone.</span>
                                </div>
                                {isAssignmentMarkError && <div className="w-full " style={{ padding: "10px", display: 'flex', justifyContent: "center", alignItems: "center", borderRadius: "5px", margin: "10px 0", backgroundColor: "rgba(250, 30, 5, 0.2)" }}>
                                    <MdError style={{ color: "red" }} />
                                    <span style={{ color: "rgba(243, 243, 243, 0.74)", fontSize: "15px" }}>An error occured</span>
                                </div>}

                            </form>
                        </div>
                    </div>
                </div>}

            </div>
        </div>
    );
};

export default VideoPlayer;
import React, { useEffect, useState } from 'react';
import { useAddVideoMutation, useDeleteVideoMutation, useGetVideosQuery } from '../../features/videos/videosApi';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { FaVideo, FaXmark } from 'react-icons/fa6';
import { MdError } from 'react-icons/md';

const Videos = () => {
    const { data: videos, refetch } = useGetVideosQuery();
    const [seeMore, setSeeMore] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [URL, setURL] = useState("");
    const [views, setViews] = useState("");
    const [duration, setDuration] = useState("");
    const navigate = useNavigate();
    const [deleteVideo, { isSuccess: isDeleteSucess }] = useDeleteVideoMutation();
    const [addVideo, { isSuccess: isAdded, isLoading, isError }] = useAddVideoMutation();
    const dispatch = useDispatch();

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    useEffect(() => {
        if (isDeleteSucess) {
            toast("Video deleted Successfully");
        }
    }, [isDeleteSucess]);

    useEffect(() => {
        if (isAdded) {
            toast("Video Was Added Successfully");
            refetch();
            closeModal();
        }
    }, [isAdded, refetch]);

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

    const handleAddVideo = (e) => {
        e.preventDefault();
        const newVideo = {
            title,
            description,
            url: URL,
            views,
            duration,
            createdAt: new Date().toISOString()
        };
        addVideo(newVideo);
    };

    return (
        <section class="py-6 bg-[#080e1b] min-h-screen">
            <div class="mx-auto max-w-full px-5 lg:px-20 text-white">
                <div class="px-3 py-20 bg-opacity-10">
                    <div class="w-full flex">
                        <button class="btn btn-info text-white ml-auto" onClick={openModal}>Add Video</button>
                    </div>
                    <div class="overflow-x-auto mt-4">
                        <table class="divide-y-1 text-base divide-gray-600 w-full">
                            <thead>
                                <tr>
                                    <th class="table-th">Video Title</th>
                                    <th class="table-th">Description</th>
                                    <th class="table-th">Action</th>
                                </tr>
                            </thead>

                            <tbody class="divide-y divide-slate-600/50">
                                {videos?.map(video => <tr key={video?.id}>
                                    <td class="table-td">{video?.title}</td>
                                    <td class="table-td"> {!seeMore ? (
                                        <>
                                            {video?.description?.slice(0, 50)}{".... "}
                                            <span onClick={() => setSeeMore(!seeMore)} style={{ color: "white", cursor: "pointer" }}>
                                                See More
                                            </span>
                                        </>
                                    ) : (
                                        <>
                                            {video?.description}{" "}
                                            <span onClick={() => setSeeMore(!seeMore)} style={{ color: "white", cursor: "pointer" }}>
                                                See Less
                                            </span>
                                        </>
                                    )}</td>
                                    <td class="table-td flex gap-x-2">
                                        <svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" onClick={() => deleteVideo(video?.id)}
                                            class="w-6 h-6 hover:text-red-500 cursor-pointer transition-all">
                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                        </svg>
                                        <svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" onClick={() => navigate(`/admin/editVideo/${video?.id}`)}
                                            class="w-6 h-6 hover:text-blue-500 cursor-pointer transition-all">
                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                        </svg>

                                    </td>
                                </tr>)}
                            </tbody>
                        </table>
                    </div>
                </div>
                {isModalOpen && <div style={modalOverlayStyle}>
                    <div style={modalStyle}>
                        <div style={{ display: 'flex', justifyContent: 'right', alignItems: "center" }}>
                            <button style={{ fontSize: '25px', padding: "3px", borderRadius: "50%", backgroundColor: "rgba(0,0,0,0.1)" }} onClick={closeModal}><FaXmark></FaXmark></button>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'left', alignItems: "center" }}>
                            <p style={{ display: 'flex', alignItems: "center", fontSize: '17px', padding: "3px", borderRadius: "50%", backgroundColor: "rgba(0,0,0,0.1)" }} onClick={closeModal}><FaVideo style={{ marginRight: "5px" }}></FaVideo><span> Add Video For Students</span></p>
                        </div>
                        <div style={{ width: "100%", display: 'flex', justifyContent: 'center', alignItems: "center" }}>
                            <img style={{ width: "250px" }} src={"https://visme.co/blog/wp-content/uploads/2021/09/How-to-Make-a-Video-thumbnail.jpg"} alt="" />
                        </div>
                        <div>
                            <h3 className='text-2xl px-5 py-3 font-semifold'>
                                Add New Video
                            </h3>
                            <p style={{ fontSize: "20px" }}>
                            </p>
                            <hr className="w-full" style={{ borderColor: "cyan", borderWidth: "1px", margin: "4px 0" }} />
                            <form onSubmit={handleAddVideo} style={{ textAlign: "start" }}>
                                <div style={{ marginBottom: "10px" }}>
                                    <label style={{ display: "block", fontWeight: "bold", color: "rgba(243, 243, 243, 0.74)", marginBottom: "4px" }}>Title:</label>
                                    <input
                                        type="text"
                                        name="title"
                                        placeholder='Video Title'
                                        onChange={(e) => setTitle(e.target.value)}
                                        style={{ width: "100%", padding: "8px", border: "1px solid rgb(45, 45, 45)", backgroundColor: "rgb(52, 62, 65)", borderRadius: "4px" }}
                                    />
                                </div>
                                <div style={{ marginBottom: "10px" }}>
                                    <label style={{ display: "block", fontWeight: "bold", color: "rgba(243, 243, 243, 0.74)", marginBottom: "4px" }}>Description:</label>
                                    <input
                                        type="text"
                                        name="description"
                                        placeholder='Video Description'
                                        onChange={(e) => setDescription(e.target.value)}
                                        style={{ width: "100%", padding: "8px", border: "1px solid rgb(45, 45, 45)", backgroundColor: "rgb(52, 62, 65)", borderRadius: "4px" }}
                                    />
                                </div>
                                <div style={{ marginBottom: "10px" }}>
                                    <label style={{ display: "block", fontWeight: "bold", color: "rgba(243, 243, 243, 0.74)", marginBottom: "4px" }}>URL:</label>
                                    <input
                                        type="text"
                                        name="url"
                                        placeholder='Video URL'
                                        onChange={(e) => setURL(e.target.value)}
                                        style={{ width: "100%", padding: "8px", border: "1px solid rgb(45, 45, 45)", backgroundColor: "rgb(52, 62, 65)", borderRadius: "4px" }}
                                    />
                                </div>
                                <div style={{ marginBottom: "10px" }}>
                                    <label style={{ display: "block", fontWeight: "bold", color: "rgba(243, 243, 243, 0.74)", marginBottom: "4px" }}>Views:</label>
                                    <input
                                        type="text"
                                        name="views"
                                        placeholder='Video views '
                                        onChange={(e) => setViews(e.target.value)}
                                        style={{ width: "100%", padding: "8px", border: "1px solid rgb(45, 45, 45)", backgroundColor: "rgb(52, 62, 65)", borderRadius: "4px" }}
                                    />
                                </div>
                                <div style={{ marginBottom: "10px" }}>
                                    <label style={{ display: "block", fontWeight: "bold", color: "rgba(243, 243, 243, 0.74)", marginBottom: "4px" }}>Duration:</label>
                                    <input
                                        type="text"
                                        name="duration"
                                        placeholder='Video duration'
                                        onChange={(e) => setDuration(e.target.value)}
                                        style={{ width: "100%", padding: "8px", border: "1px solid rgb(45, 45, 45)", backgroundColor: "rgb(52, 62, 65)", borderRadius: "4px" }}
                                    />
                                </div>
                                <button disabled={isLoading} type="submit" className='btn btn-accent text-white' style={{ width: "100%", borderRadius: "5px", height: "40px" }}>
                                    Submit
                                </button>
                                {isError && <div className="w-full " style={{ padding: "10px", display: 'flex', justifyContent: "center", alignItems: "center", borderRadius: "5px", margin: "10px 0", backgroundColor: "rgba(250, 30, 5, 0.2)" }}>
                                    <MdError style={{ color: "red" }} />
                                    <span style={{ color: "rgba(243, 243, 243, 0.74)", fontSize: "15px" }}>An error occured</span>
                                </div>}
                            </form>
                        </div>
                    </div>
                </div>}
            </div>
        </section>
    );
};

export default Videos;
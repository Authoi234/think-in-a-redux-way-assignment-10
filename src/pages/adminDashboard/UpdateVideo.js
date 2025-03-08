import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { MdOutlineDescription } from "react-icons/md";
import learningPortalImg from "../../assets/image/learningportal.svg";
import { useEditVideoMutation, useGetVideoQuery } from '../../features/videos/videosApi';
import { toast } from 'react-toastify';

const UpdateVideo = () => {
    const { videoId } = useParams();
    const { data: oldVideo } = useGetVideoQuery(videoId);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [url, setUrl] = useState("");
    const navigate = useNavigate();

    const [editVideo, { data, isSuccess }] = useEditVideoMutation();

    useEffect(() => {
        if (oldVideo) {
            setTitle(oldVideo.title || "");
            setDescription(oldVideo.description || "");
            setUrl(oldVideo.url || "");
        }
    }, [oldVideo]);

    useEffect(() => {
        if (isSuccess === true) {
            toast("Video Successfully Updated");
            navigate("/admin/videos")
        }
    }, [isSuccess, navigate]);

    const handleUpdate = (e) => {
        e.preventDefault();
        editVideo({ id: videoId, data: { title, description, url } });
    }

    return (
        <div style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }} className='min-h-screen'>

            <div className='text-white'>
                <div style={{ maxWidth: "600px", width: "100%" }} className="mx-auto px-5 lg:px-0">
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-100">
                        <img className="h-12 mx-auto" src={learningPortalImg} alt='' />
                        Update The Video, Number {videoId}
                    </h2>
                </div>

                <form onSubmit={handleUpdate} style={{ maxWidth: "600px", width: "100% ", margin: "20px 0" }}>
                    <div>
                        <label style={{ display: "block", fontWeight: "600", fontSize: "18px", marginBottom: "8px" }}>
                            Title
                        </label>
                        <input
                            type="text"
                            required
                            value={title}
                            placeholder="Enter Title"
                            onChange={(e) => setTitle(e.target.value)}
                            style={{
                                width: "100%",
                                padding: "10px",
                                fontSize: "16px",
                                border: "1px solid #ccc",
                                borderRadius: "5px",
                                outline: "none",
                                transition: "border 0.3s",
                                color: "black"
                            }}
                            onFocus={(e) => (e.target.style.border = "1px solid #007bff")}
                            onBlur={(e) => (e.target.style.border = "1px solid #ccc")}
                        />
                    </div>
                    <div>
                        <label style={{ display: "block", fontWeight: "600", fontSize: "18px", marginBottom: "8px" }}>
                            Description
                        </label>
                        <input
                            type="text"
                            required
                            value={description}
                            placeholder="Enter Description"
                            onChange={(e) => setDescription(e.target.value)}
                            style={{
                                width: "100%",
                                padding: "10px",
                                fontSize: "16px",
                                border: "1px solid #ccc",
                                borderRadius: "5px",
                                outline: "none",
                                transition: "border 0.3s",
                                color: "black"
                            }}
                            onFocus={(e) => (e.target.style.border = "1px solid #007bff")}
                            onBlur={(e) => (e.target.style.border = "1px solid #ccc")}
                        />
                    </div>
                    <div>
                        <label style={{ display: "block", fontWeight: "600", fontSize: "18px", marginBottom: "8px" }}>
                            Video Link ( url )
                        </label>
                        <input
                            type="text"
                            required
                            placeholder="Enter URL"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            style={{
                                width: "100%",
                                padding: "10px",
                                fontSize: "16px",
                                border: "1px solid #ccc",
                                borderRadius: "5px",
                                outline: "none",
                                transition: "border 0.3s",
                                color: "black"
                            }}
                            onFocus={(e) => (e.target.style.border = "1px solid #007bff")}
                            onBlur={(e) => (e.target.style.border = "1px solid #ccc")}
                        />
                    </div>
                    <button type="submit" style={{ width: "100%", padding: "15px 0", marginTop: "20px" ,fontSize: "20", color: "white", textAlign: "center", backgroundColor: "#007bff" }} className='btn rounded-md border-0'>Submit</button>
                </form> 
            </div>
        </div>
    );
};

export default UpdateVideo;
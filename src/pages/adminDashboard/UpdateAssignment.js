import React, { useEffect, useState } from 'react';
import { useEditAssignmentMutation, useGetAssignmentQuery } from '../../features/assignment/assignmentApi';
import { useNavigate, useParams } from 'react-router-dom';
import learningPortalImg from "../../assets/image/learningportal.svg";
import { toast } from 'react-toastify';

const UpdateAssignment = () => {
    const { assignmentId } = useParams();
    const { data: oldAssignment, refetch } = useGetAssignmentQuery(assignmentId, {
        refetchOnMountOrArgChange: true
    });
    const [title, setTitle] = useState("");
    const [totalMark, setTotalMark] = useState();
    const navigate = useNavigate();

    const [editAssignment, { data, isSuccess }] = useEditAssignmentMutation();

    useEffect(() => {
        if (oldAssignment) {
            setTitle(oldAssignment.title || "");
            setTotalMark(oldAssignment.totalMark || 0);
        }
    }, [oldAssignment]);

    useEffect(() => {
        if (isSuccess === true) {
            refetch();
            toast("Assignment Successfully Updated");
            navigate("/admin/assignments");
        }
    }, [isSuccess, navigate, refetch]);

    const handleUpdate = (e) => {
        e.preventDefault();
        editAssignment({
            id: assignmentId,
            data: {
                title,
                totalMark: Number(totalMark),
            },
        });
    }

    return (
        <div style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }} className='min-h-screen'>

            <div className='text-white'>
                <div style={{ maxWidth: "600px", width: "100%" }} className="mx-auto px-5 lg:px-0">
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-100">
                        <img className="h-12 mx-auto" src={learningPortalImg} alt='' />
                        Update The Assignment, Number {assignmentId}
                        <h3 className="text-2xl">Of the video {oldAssignment?.video_title}</h3>
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
                                color: "black",
                                fontFamily: "Tahoma, sans-serif"
                            }}
                            onFocus={(e) => (e.target.style.border = "1px solid #007bff")}
                            onBlur={(e) => (e.target.style.border = "1px solid #ccc")}
                        />
                    </div>
                    <div>
                        <label style={{ display: "block", fontWeight: "600", fontSize: "18px", marginBottom: "8px" }}>
                            Total Mark
                        </label>
                        <input
                            type="number"
                            required
                            value={totalMark}
                            placeholder="Enter Total Mark"
                            onChange={(e) => setTotalMark(e.target.value)}
                            style={{
                                width: "100%",
                                padding: "10px",
                                fontSize: "16px",
                                border: "1px solid #ccc",
                                borderRadius: "5px",
                                outline: "none",
                                transition: "border 0.3s",
                                color: "black",
                                fontFamily: "Tahoma, sans-serif"
                            }}
                            onFocus={(e) => (e.target.style.border = "1px solid #007bff")}
                            onBlur={(e) => (e.target.style.border = "1px solid #ccc")}
                        />
                    </div>
                    <div>
                        <button type='submit' className='w-full outline-0 btn text-xl font-semibold hover:bg-white hover:border-4 hover:border-[#007bff] bg-[#007bff] text-white hover:text-[#007bff] border-0 transition-all my-2 ' >Update</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateAssignment;
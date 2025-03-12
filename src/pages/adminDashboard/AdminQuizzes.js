import React, { useEffect, useState } from 'react';
import { useAddQuizMutation, useDeleteQuizMutation, useGetQuizzesQuery } from '../../features/quizzes/quizzesApi';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { MdDelete, MdError } from 'react-icons/md';
import { FaXmark } from 'react-icons/fa6';
import { GoTasklist } from 'react-icons/go';
import { useGetVideoQuery, useGetVideosQuery } from '../../features/videos/videosApi';

const AdminQuizzes = () => {
    const { data: quizzes, refetch } = useGetQuizzesQuery();
    const [deleteQuiz, { isSuccess: isDeleteSucess }] = useDeleteQuizMutation();
    const [seeMore, setSeeMore] = useState(false);
    const [selectedVideo, setSelectedVideo] = useState("");
    const [question, setQuestion] = useState("");
    const navigate = useNavigate();
    const [newOption, setNewOption] = useState("");
    const [options, setOptions] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { data: allVideos } = useGetVideosQuery();
    const [isSkip, setIsSkip] = useState(true);
    const [selectedVideoObjectData, setSelectedVideoObjectData] = useState(undefined);
    const [addQuiz, {isSuccess: isQuizAddSuccess}] = useAddQuizMutation();
    const { data: selectedVideoObject, isLoading: videoGetLoading } = useGetVideoQuery(Number(selectedVideo), { skip: isSkip, refetchOnMountOrArgChange: true });

    useEffect(() => {
        if (isDeleteSucess) {
            toast("Quiz deleted Successfully");
        }
    }, [isDeleteSucess]);

    useEffect(() => {
        if (isQuizAddSuccess) {
            refetch()
            setIsModalOpen(false);
            toast("Quiz added Successfully");
        }
    }, [isQuizAddSuccess, refetch]);

    useEffect(() => {
        if (selectedVideo) {
            setIsSkip(false);
        }
    }, [selectedVideo]);

    useEffect(() => {
        if (selectedVideoObject) {
            setSelectedVideoObjectData(selectedVideoObject);
        }
    }, [selectedVideoObject]);

    const generateId = () => Date.now();

    const addOption = () => {
        if (newOption.trim() === "") return;
        setOptions([...options, { id: generateId(), option: newOption, isCorrect: false }]);
        setNewOption("");
    };

    const toggleCorrectAnswer = (id) => {
        setOptions((prevOptions) =>
            prevOptions.map((opt) =>
                opt.id === id ? { ...opt, isCorrect: !opt.isCorrect } : opt
            )
        );
    };

    const handleDeleteOption = (id) => {
        setOptions(options.filter(opt => opt?.id !== id));
    };

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    useEffect(() => {
        if (isDeleteSucess) {
            toast("Video deleted Successfully");
        }
    }, [isDeleteSucess]);

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

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (videoGetLoading) {
            console.log("Video data is still loading...");
            return; 
        }

        if (!selectedVideoObjectData) {
            console.log("Video data not loaded yet!");
            return;
        }
       const { title } =selectedVideoObjectData;
        const newQuiz = {
            video_title:title,
            options: options,
            question: question,
            video_id: Number(selectedVideo)
        };
        addQuiz(newQuiz);
    };

    return (
        <section className=" py-6 bg-[#080e1b] min-h-screen">
            <div className="mx-auto max-w-full px-5 lg:px-20 text-white">
                <div className="px-3 py-20 bg-opacity-10">
                    <div className="w-full flex">
                        <button className="btn btn-info text-white ml-auto" onClick={openModal}>Add Quiz</button>
                    </div>
                    <div className="overflow-x-auto mt-4">
                        <table className="divide-y-1 text-base divide-gray-600 w-full">
                            <thead>
                                <tr>
                                    <th className="table-th">Question</th>
                                    <th className="table-th">Video</th>
                                    <th className="table-th justify-center">Action</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-slate-600/50">
                                {quizzes?.map(quiz => (
                                    <tr>
                                        <td className="table-td">Quiz {quiz?.id} - {quiz.question}</td>
                                        <td className="table-td"> {!seeMore ? (
                                            <>
                                                {quiz?.video_title?.slice(0, 30)}{".... "}
                                                <span onClick={() => setSeeMore(!seeMore)} style={{ color: "white", cursor: "pointer" }}>
                                                    See More
                                                </span>
                                            </>
                                        ) : (
                                            <>
                                                {quiz?.video_title}{" "}
                                                <span onClick={() => setSeeMore(!seeMore)} style={{ color: "white", cursor: "pointer" }}>
                                                    See Less
                                                </span>
                                            </>
                                        )}</td>
                                        <td className="table-td flex gap-x-2 justify-center">
                                            <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" onClick={() => deleteQuiz(quiz?.id)}
                                                className="w-6 h-6 hover:text-red-500 cursor-pointer transition-all">
                                                <path strokeLinecap="round" strokeLinejoin="round"
                                                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                            </svg>
                                            <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" onClick={() => navigate(`/admin/editQuiz/${quiz?.id}`)}
                                                className="w-6 h-6 hover:text-blue-500 cursor-pointer transition-all">
                                                <path strokeLinecap="round" strokeLinejoin="round"
                                                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                            </svg>

                                        </td>
                                    </tr>)
                                )}
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
                            <p style={{ display: 'flex', alignItems: "center", fontSize: '17px', padding: "3px", borderRadius: "50%", backgroundColor: "rgba(0,0,0,0.1)" }} onClick={closeModal}><GoTasklist style={{ marginRight: "5px" }}></GoTasklist><span> Add Quiz For Students Skills</span></p>
                        </div>
                        <div style={{ width: "100%", display: 'flex', justifyContent: 'center', alignItems: "center" }}>
                            <img style={{ width: "250px" }} src={"https://static.vecteezy.com/system/resources/previews/002/958/141/non_2x/exam-and-quiz-vector.jpg"} alt="" />
                        </div>
                        <div>
                            <h3 className='text-2xl px-5 py-3 font-semifold'>
                                Add New Quiz
                            </h3>
                            <p style={{ fontSize: "20px" }}>
                            </p>
                            <hr className="w-full" style={{ borderColor: "cyan", borderWidth: "1px", margin: "4px 0" }} />
                            <form onSubmit={handleSubmit} style={{ textAlign: "start" }}>
                                <div style={{ marginBottom: "10px" }}>
                                    <label style={{ display: "block", fontWeight: "bold", color: "rgba(243, 243, 243, 0.74)", marginBottom: "4px" }}>Question:</label>
                                    <input
                                        type="text"
                                        name="question"
                                        value={question}
                                        onChange={(e) => setQuestion(e?.target?.value)}
                                        required
                                        placeholder='Quiz Qestion'
                                        style={{ width: "100%", padding: "8px", border: "1px solid rgb(45, 45, 45)", backgroundColor: "rgb(52, 62, 65)", borderRadius: "4px" }}
                                    />
                                </div>
                                <div style={{ marginBottom: "10px" }}>
                                    <label style={{ display: "block", fontWeight: "bold", color: "rgba(243, 243, 243, 0.74)", marginBottom: "4px" }}>Choose Video:</label>
                                    <select value={selectedVideo} onChange={(e) => setSelectedVideo(Number(e?.target?.value))} required className="select select-accent w-full bg-[#4a4a4a] text-white">
                                        <option value={""} defaultChecked disabled={true} >Select Video</option>
                                        {
                                            allVideos?.map((video) => {
                                                return <option value={video?.id}>{video?.title}</option>
                                            })
                                        }
                                    </select>
                                </div>
                                <div style={{ marginBottom: "10px" }}>
                                    <label style={{ display: "block", fontWeight: "bold", color: "rgba(243, 243, 243, 0.74)", marginBottom: "4px" }}>Options:</label>
                                    <div className="text-white">
                                        {options.length === 0 ? (
                                            <p className="text-gray-400">No options added yet.</p>
                                        ) : (
                                            options.map((opt) => (
                                                <div key={opt.id} className="flex items-center justify-between gap-2 p-2 bg-gray-700 rounded mb-2">
                                                    <div className='flex justify-center items-center '>
                                                        <input
                                                            type="checkbox"
                                                            checked={opt.isCorrect}
                                                            onChange={() => toggleCorrectAnswer(opt.id)}
                                                            className="w-5 h-5 checkbox checkbox-md checkbox-accent text-white mr-2"
                                                            style={{ backgroundColor: "rgba(186, 233, 245, 0.5)" }}
                                                        />
                                                        <span className={`break-words break-all  ${opt.isCorrect ? "text-green-400 font-bold" : ""}`}>
                                                            {opt.option}
                                                        </span>
                                                    </div>
                                                    <button className='cursor-pointer' onClick={() => handleDeleteOption(opt?.id)} type='button'>
                                                        <MdDelete className='text-red-600'></MdDelete>
                                                    </button>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                    <div className="join w-full my-2">
                                        <input
                                            type="text"
                                            value={newOption}
                                            onChange={(e) => setNewOption(e.target.value)}
                                            placeholder="Enter an option"
                                            className="p-2 w-10/12 rounded-s-lg bg-gray-800 text-white border border-gray-600"
                                        />
                                        <button
                                            onClick={addOption}
                                            type='button'
                                            className="btn btn-info w-2/12 rounded-e-lg text-white rounded"
                                        >
                                            Add
                                        </button>
                                    </div>
                                </div>

                                <input type="submit" disabled={videoGetLoading || !selectedVideoObject} className='disabled:bg-sky-500 btn text-lg btn-accent text-white' style={{ width: "100%", borderRadius: "5px", height: "40px" }} value={videoGetLoading ? 'Loading...' : 'Submit'} />
                            </form>
                        </div>
                    </div>
                </div>}
            </div>
        </section>
    );
};

export default AdminQuizzes;
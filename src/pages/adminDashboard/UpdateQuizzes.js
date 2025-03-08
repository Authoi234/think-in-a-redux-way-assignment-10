import React, { useEffect, useState } from 'react';
import learningPortalImg from "../../assets/image/learningportal.svg";
import { useNavigate, useParams } from 'react-router-dom';
import { useEditQuizMutation, useGetQuizQuery } from '../../features/quizzes/quizzesApi';
import { toast } from 'react-toastify';
import { IoCheckbox } from "react-icons/io5";

const UpdateQuizzes = () => {
    const { quizId } = useParams();
    const { data: oldQuiz } = useGetQuizQuery(quizId);
    const [options, setOptions] = useState([]);
    const [question, setQuestion] = useState("");
    const navigate = useNavigate();

    const [editQuiz, { data, isSuccess }] = useEditQuizMutation();

    useEffect(() => {
        if (oldQuiz) {
            setQuestion(oldQuiz.question || "");
            setOptions(oldQuiz.options || []);
        }
    }, [oldQuiz]);

    useEffect(() => {
        if (isSuccess === true) {
            toast("Quiz Successfully Updated");
            navigate("/admin/quizzes")
        }
    }, [isSuccess, navigate]);

    const addOption = () => {
        const newId = options.length > 0 ? Math.max(...options.map(opt => opt.id)) + 1 : 1;
        const newOption = { id: newId, option: "", isCorrect: false };
        setOptions([...options, newOption]);
    };

    const updateOption = (id, value) => {
        setOptions(options.map(opt => opt.id === id ? { ...opt, option: value } : opt));
    };

    const toggleCorrect = (id) => {
        setOptions(options.map(opt => opt.id === id ? { ...opt, isCorrect: !opt.isCorrect } : opt));
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        editQuiz({ id: quizId, data: { question: question, options: [...options] } });
    }

    return (
        <div style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }} className='min-h-screen'>

            <div className='text-white'>
                <div style={{ maxWidth: "600px", width: "100%" }} className="mx-auto px-5 lg:px-0">
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-100">
                        <img className="h-12 mx-auto" src={learningPortalImg} alt='' />
                        Update The Quiz, Number {quizId}
                        <h3 className="text-2xl">Of the video {oldQuiz?.video_title}</h3>
                    </h2>
                </div>

                <form onSubmit={handleUpdate} style={{ maxWidth: "600px", width: "100% ", margin: "20px 0" }}>
                    <div>
                        <label style={{ display: "block", fontWeight: "600", fontSize: "18px", marginBottom: "8px" }}>
                            Question
                        </label>
                        <input
                            type="text"
                            required
                            value={question}
                            placeholder="Enter Question"
                            onChange={(e) => setQuestion(e.target.value)}
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
                            Options
                        </label>
                        {options.map(({ id, option, isCorrect }) => (
                            <div key={id} className="flex items-center">
                                <input type='checkbox' defaultChecked={isCorrect} className='checkbox border-blue-600 bg-blue-300 checked:bg-cyan-300 checked:text-white checked:border-0 checkbox-lg' onChange={() => toggleCorrect(id)} />
                                <input
                                    style={{
                                        width: "100%",
                                        padding: "10px",
                                        fontSize: "16px",
                                        border: "1px solid #ccc",
                                        borderRadius: "5px",
                                        outline: "none",
                                        transition: "border 0.3s",
                                        margin: "5px 5px",
                                        color: "black",
                                        fontFamily: "Tahoma, sans-serif"
                                    }}
                                    type="text"
                                    value={option}
                                    required
                                    onChange={(e) => updateOption(id, e.target.value)}
                                    placeholder="Enter option"
                                    className="flex-1"
                                />
                            </div>
                        ))}
                        <form className="flex justify-between items-start">
                            <div className="flex items-center" style={{ color: "skyblue" }}>  <IoCheckbox></IoCheckbox> <p>Are Correct Answers</p></div>
                            <button onClick={addOption} style={{ padding: "8px 12px", background: "#007bff", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }} className='mt-1' type='button'>Add Option</button>
                        </form>
                        <button type='submit' className='w-full btn text-xl font-semibold hover:bg-white hover:border hover:border-[#007bff] bg-[#007bff] text-white hover:text-[#007bff] border-0 transition-all my-2 ' >Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateQuizzes;
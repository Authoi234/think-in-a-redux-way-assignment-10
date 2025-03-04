import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAddQuizMarkMutation, useGetQuizMarkQuery, useGetQuizzesQuery } from '../../features/quizzes/quizzesApi';
import { useSelector } from 'react-redux';
import { useGetVideoQuery } from '../../features/videos/videosApi';

const Quizzes = () => {
    const { videoId } = useParams();
    const { data: quizzes, isLoading, isError } = useGetQuizzesQuery();
    const currentQuizzes = quizzes?.filter(quiz => Number(String(quiz.video_id)) === Number(videoId));
    const { data: video, isLoading: isVideoLoading, isError: isVideoError } = useGetVideoQuery(Number(videoId));
    const { user } = useSelector(state => state.auth);
    const [addQuizMark, { data: addQuizMarkData, isLoading: isAddLoading, isSuccess }] = useAddQuizMarkMutation();
    const { data: quizMarkData } = useGetQuizMarkQuery({ studentId: user?.id, videoId });
    const navigate = useNavigate();

    useEffect(() => {
        if (isSuccess === true) {
            navigate("/StudentPortal/leaderboard");
        }
    }, [isSuccess, navigate]);

    const handleSubmit = (event) => {
        event.preventDefault();

        const formData = [];
        let totalCorrect = 0;
        let totalWrong = 0;
        let totalQuiz = currentQuizzes?.length;
        let totalMark = totalQuiz * 5; 
        let mark = 0;

        const forms = document.querySelectorAll('.quizOptions');

        forms?.forEach((form, index) => {
            const quiz = currentQuizzes[index];

            const selectedOptions = Array.from(form.querySelectorAll('input[type="checkbox"]:checked'))?.map(input => {
                const optionId = input?.id?.replace("option", "")?.split("_q")[0]; // Extract option ID
                const selectedOption = quiz.options?.find(opt => String(opt.id) === optionId);

                return {
                    questionId: quiz.id,
                    selectedOptionId: selectedOption.id,
                    rightAnswer: selectedOption.isCorrect
                };
            });

            const allCorrect = selectedOptions.every(opt => opt.rightAnswer);
            const hasWrongAnswer = selectedOptions?.some(opt => !opt.rightAnswer);

            let quizMark = 0;
            if (allCorrect && selectedOptions?.length > 0) {
                quizMark = 5; 
                totalCorrect++;
            }
            if (hasWrongAnswer) { 
                quizMark = 0;
                totalWrong++;
            }

            mark += quizMark;
            formData.push({
                quizId: quiz.id,
                selectedOptions,
                quizMark
            });
        });

        if (mark > totalMark) {
            mark = totalMark; 
        }

        const resultSummary = {
            video_title: video?.title,
            student_name: user?.name,
            student_id: user?.id,
            video_id: Number(videoId),
            totalQuiz,
            totalCorrect,
            totalWrong,
            totalMark,
            mark
        };

        addQuizMark(resultSummary)

    };

    return (
        <section className="py-6 bg-primary">
            <div className="mx-auto max-w-7xl px-5 lg:px-0">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold">Quizzes for "Debounce Function in JavaScript - JavaScript Job Interview question"
                    </h1>
                    <p className="text-sm text-slate-200">Each question contains 5 Mark</p>
                </div>
                <div className="space-y-8 ">
                    {
                        currentQuizzes?.map((quiz, index) =>
                            <div className="quiz" key={quiz?.id}>
                                <h4 className="question">Quiz {index + 1} - {quiz?.question}</h4>
                                <form className="quizOptions" onSubmit={handleSubmit}>
                                    {quiz?.options?.map(option => <label for={`option${option?.id}_q${quiz?.id}`} key={option?.id}>
                                        <input type="checkbox" id={`option${option?.id}_q${quiz?.id}`} />
                                        {option?.option}
                                    </label>)}
                                </form>
                            </div>
                        )
                    }
                </div>

                <button
                    className="px-4 py-2 rounded-full bg-cyan block ml-auto mt-8 hover:opacity-90 active:opacity-100 active:scale-95 "
                    type='Submit'
                    onClick={handleSubmit}
                    disabled={quizMarkData?.length > 0 ? true : false}
                >
                    Submit
                </button>
            </div>
        </section>
    );
};

export default Quizzes;
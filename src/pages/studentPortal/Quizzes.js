import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetQuizzesQuery } from '../../features/quizzes/quizzesApi';
import { useSelector } from 'react-redux';

const Quizzes = () => {
    const { videoId } = useParams();
    const { data: quizzes, isLoading, isError } = useGetQuizzesQuery();
    const currentQuizzes = quizzes?.filter(quiz => Number(String(quiz.video_id)) === Number(videoId));
    const { user } = useSelector(state => state.auth);

    const handleSubmit = (event) => {
        event.preventDefault(); // Prevents page reload

        const formData = [];
        let totalCorrect = 0;
        let totalWrong = 0;
        let totalQuiz = currentQuizzes.length;
        let totalMark = totalQuiz * 5;
        let mark = 0;

        // Get all quiz forms
        const forms = document.querySelectorAll('.quizOptions');

        forms.forEach((form, index) => {
            const quiz = currentQuizzes[index];

            // Get selected options
            const selectedOptions = Array.from(form.querySelectorAll('input[type="checkbox"]:checked')).map(input => {
                const optionId = input.id.replace(`option`, "").split("_q")[0]; // Extract option ID
                const selectedOption = quiz.options.find(opt => String(opt.id) === optionId);

                return {
                    questionId: quiz.id,
                    selectedOptionId: selectedOption.id,
                    rightAnswer: selectedOption.isCorrect // True if correct, False otherwise
                };
            });

            // Check if all selected answers are correct
            const allCorrect = selectedOptions.every(opt => opt.rightAnswer);
            const hasWrongAnswer = selectedOptions.some(opt => !opt.rightAnswer);

            let quizMark = 0;
            if (allCorrect && selectedOptions.length > 0) {
                quizMark = 5;
                totalCorrect++;
            } else if (hasWrongAnswer) {
                totalWrong++;
            }

            mark += quizMark;

            formData.push({
                quizId: quiz.id,
                selectedOptions,
                quizMark
            });
        });

        const resultSummary = {
            student_name: user?.name,
            student_id: user?.id,
            video_id: Number(videoId),
            totalQuiz,
            totalCorrect,
            totalWrong,
            totalMark,
            mark
        };

        console.log(resultSummary)

    };

    return (
        <section class="py-6 bg-primary">
            <div class="mx-auto max-w-7xl px-5 lg:px-0">
                <div class="mb-8">
                    <h1 class="text-2xl font-bold">Quizzes for "Debounce Function in JavaScript - JavaScript Job Interview question"
                    </h1>
                    <p class="text-sm text-slate-200">Each question contains 5 Mark</p>
                </div>
                <div class="space-y-8 ">
                    {
                        currentQuizzes?.map((quiz, index) =>
                            <div class="quiz" key={quiz?.id}>
                                <h4 class="question">Quiz {index + 1} - {quiz?.question}</h4>
                                <form class="quizOptions" onSubmit={handleSubmit}>
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
                    class="px-4 py-2 rounded-full bg-cyan block ml-auto mt-8 hover:opacity-90 active:opacity-100 active:scale-95 "
                    type='Submit'
                    onClick={handleSubmit}
                >
                    Submit
                </button>
            </div>
        </section>
    );
};

export default Quizzes;
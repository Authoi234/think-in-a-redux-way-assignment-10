import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useGetTotalQuizMarkQuery } from '../../features/quizzes/quizzesApi';
import { useGetTotalAssignmentMarkQuery } from '../../features/assignment/assignmentApi';

const Leaderboard = () => {
    const [totalQuizMarks, setTotalQuizMarks] = useState(0);
    const [totalAsignmentMarks, setTotalAsignmentMarks] = useState(0);
    const { user } = useSelector((state) => state.auth) || {};
    const { data: studentQuizMarkData } = useGetTotalQuizMarkQuery(user?.id);
    const { data: studentAssignmentMarkData } = useGetTotalAssignmentMarkQuery(user?.id);

    useEffect(() => {
        const sum = studentQuizMarkData?.reduce((acc, obj) => Number(acc) + Number(obj.mark), 0);
        setTotalQuizMarks(sum);
    }, [studentQuizMarkData]);

    useEffect(() => {
        const sum = studentAssignmentMarkData?.reduce((acc, obj) => Number(acc) + Number(obj.mark), 0);
        setTotalAsignmentMarks(sum)
    }, [studentAssignmentMarkData]);

    return (
        <section className="py-6 bg-primary">
            <div className="mx-auto max-w-7xl px-5 lg:px-0">
                <div>
                    <h3 className="text-lg font-bold">Your Position in Leaderboard</h3>
                    <table className="text-base w-full border border-slate-600/50 rounded-md my-4">
                        <thead>
                            <tr>
                                <th className="table-th !text-center">Rank</th>
                                <th className="table-th !text-center">Name</th>
                                <th className="table-th !text-center">Quiz Mark</th>
                                <th className="table-th !text-center">Assignment Mark</th>
                                <th className="table-th !text-center">Total</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr className="border-2 border-cyan">
                                <td className="table-td text-center font-bold">4</td>
                                <td className="table-td text-center font-bold">{user?.name}</td>
                                <td className="table-td text-center font-bold">{totalQuizMarks}</td>
                                <td className="table-td text-center font-bold">{totalAsignmentMarks}</td>
                                <td className="table-td text-center font-bold">{totalAsignmentMarks + totalQuizMarks}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="my-8">
                    <h3 className="text-lg font-bold">Top 20 Result</h3>
                    <table className="text-base w-full border border-slate-600/50 rounded-md my-4">
                        <thead>
                            <tr className="border-b border-slate-600/50">
                                <th className="table-th !text-center">Rank</th>
                                <th className="table-th !text-center">Name</th>
                                <th className="table-th !text-center">Quiz Mark</th>
                                <th className="table-th !text-center">Assignment Mark</th>
                                <th className="table-th !text-center">Total</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr className="border-b border-slate-600/50">
                                <td className="table-td text-center">4</td>
                                <td className="table-td text-center">Saad Hasan</td>
                                <td className="table-td text-center">50</td>
                                <td className="table-td text-center">50</td>
                                <td className="table-td text-center">100</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
};

export default Leaderboard;
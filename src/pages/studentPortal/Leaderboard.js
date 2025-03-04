import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useGetQuizzesMarksQuery, useGetTotalQuizMarkQuery } from '../../features/quizzes/quizzesApi';
import { useGetAssignmentsMarksQuery, useGetTotalAssignmentMarkQuery } from '../../features/assignment/assignmentApi';
import { useGetUsersQuery } from '../../features/users/usersApi';

const Leaderboard = () => {
    const [totalQuizMarks, setTotalQuizMarks] = useState(0);
    const [totalAsignmentMarks, setTotalAsignmentMarks] = useState(0);
    const { user } = useSelector((state) => state.auth) || {};
    const { data: studentQuizMarkData } = useGetTotalQuizMarkQuery(user?.id);
    const {data: quizMarks} = useGetQuizzesMarksQuery();
    const {data: assignmentMarks} = useGetAssignmentsMarksQuery();
    const { data: studentAssignmentMarkData } = useGetTotalAssignmentMarkQuery(user?.id);
    const { data: allUsers, isLoading: isUsersLoading } = useGetUsersQuery();
    const studentUsers = allUsers?.filter(user => user.role === "student");

    useEffect(() => {
        const sum = studentQuizMarkData?.reduce((acc, obj) => Number(acc) + Number(obj.mark), 0);
        setTotalQuizMarks(sum);
    }, [studentQuizMarkData]);

    useEffect(() => {
        const sum = studentAssignmentMarkData?.reduce((acc, obj) => Number(acc) + Number(obj.mark), 0);
        setTotalAsignmentMarks(sum)
    }, [studentAssignmentMarkData]);

    const usersWithMarks = studentUsers?.map(user => {
        const quizMarksUser = quizMarks?.filter(quizMark => quizMark?.student_id === user?.id)
        const assignmentMarksUser = assignmentMarks?.filter(assignmentMark => assignmentMark?.student_id === user?.id);
        const userQuizMarks = quizMarksUser?.reduce((acc, obj) => acc + Number(obj.mark), 0) || 0;
        const userAssignmentMarks = assignmentMarksUser?.reduce((acc, obj) => acc + Number(obj.mark), 0) || 0;
        return {
            ...user,
            totalQuizMarks: userQuizMarks,
            totalAssignmentMarks: userAssignmentMarks,
            totalMarks: userQuizMarks + userAssignmentMarks
        };
    }) || [];

    const sortedUsers = [...usersWithMarks]?.sort((a, b) => b.totalMarks - a.totalMarks);

    const rankedUsers = [];
    let currentRank = 1;
    sortedUsers?.forEach((user, index) => {
        if (index > 0 && user.totalMarks < sortedUsers[index - 1].totalMarks) {
            currentRank = index + 1;
        }
        rankedUsers.push({ ...user, rank: currentRank });
    });

    const currentUserRank = rankedUsers?.find(u => u.id === user?.id)?.rank || "-";


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
                                <td className="table-td text-center font-bold">{currentUserRank}</td>
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

                        {!isUsersLoading ? <tbody>
                            {rankedUsers?.slice(0, 20)?.map(user => (
                                <tr className="border-b border-slate-600/50" key={user?.id}>
                                    <td className="table-td text-center">{user?.rank}</td>
                                    <td className="table-td text-center">{user?.name}</td>
                                    <td className="table-td text-center">{user?.totalQuizMarks}</td>
                                    <td className="table-td text-center">{user?.totalAssignmentMarks}</td>
                                    <td className="table-td text-center">{user?.totalMarks}</td>
                                </tr>
                            ))}
                        </tbody> : <div>Loading...</div>}
                    </table>
                </div>
            </div>
        </section>
    );
};

export default Leaderboard;
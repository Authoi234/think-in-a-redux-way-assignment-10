import React, { useEffect, useState } from 'react';
import { useEditAssignmentMarkMutation, useGetAssignmentsMarksQuery } from '../../features/assignment/assignmentApi';
import { toast } from 'react-toastify';

const AssignemntMarks = () => {
    const { data: assignemntMarks, refetch } = useGetAssignmentsMarksQuery();
    const [statusCounts, setStatusCounts] = useState({ pending: 0, published: 0 });
    const [editAssignmentMark, { isSuccess, isLoading }] = useEditAssignmentMarkMutation();

    useEffect(() => {
        const statuses = assignemntMarks?.map(item => item?.status);

        const pendingCount = statuses?.filter(status => status === 'pending')?.length;
        const publishedCount = statuses?.filter(status => status === 'published')?.length;

        setStatusCounts({ pending: pendingCount, published: publishedCount });
    }, [assignemntMarks]);

    useEffect(() => {
        if (isSuccess) {
            refetch();
            toast.success("Assignment mark updated successfully!");
        }
    }, [isSuccess, refetch]);

    return (
        <section className="py-6 bg-[#080e1b]">
            <div className="mx-auto max-w-full px-5 lg:px-20">
                <div className="px-3 py-20 bg-opacity-10">
                    <ul className="assignment-status">
                        <li>Total <span>{assignemntMarks?.length}</span></li>
                        <li>Pending <span>{statusCounts?.pending}</span></li>
                        <li>Mark Sent <span>{statusCounts?.published}</span></li>
                    </ul>
                    <div className="overflow-x-auto mt-4">
                        <table className="divide-y-1 text-base divide-gray-600 w-full">
                            <thead>
                                <tr>
                                    <th className="table-th">Assignment</th>
                                    <th className="table-th">Date</th>
                                    <th className="table-th">Student Name</th>
                                    <th className="table-th">Repo Link</th>
                                    <th className="table-th">Mark</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-slate-600/50">
                                {
                                    assignemntMarks?.map((item, i) => (
                                        <tr key={i}>
                                            <td className="table-td">{item?.title}</td>
                                            <td className="table-td">{new Date(item.createdAt).toLocaleString("en-GB", {
                                                day: "2-digit",
                                                month: "short",
                                                year: "numeric",
                                                hour: "2-digit",
                                                minute: "2-digit",
                                                second: "2-digit",
                                                hour12: true,
                                            })}</td>
                                            <td className="table-td">{item?.student_name}</td>
                                            <td className="table-td">{item?.repo_link}</td>
                                            {item?.status === "published" ? (
                                                <td className="table-td">{item?.mark}</td>
                                            ) : (
                                                <td className="table-td input-mark">
                                                    <form
                                                        className="table-td input-mark"
                                                        onSubmit={(e) => {
                                                            e.preventDefault();
                                                            const inputValue = e.target.elements[`markSet_${item?.id}`]?.value;
                                                            editAssignmentMark({
                                                                id: item?.id,
                                                                data: { mark: inputValue, status: "published" },
                                                            });
                                                        }}
                                                    >
                                                        <input
                                                            type="number"
                                                            className="w-16 p-1 bg-gray-700 text-white border rounded"
                                                            name={`markSet_${item?.id}`}
                                                            min="0"
                                                            max="100"
                                                        />
                                                        <button disabled={isLoading} type="submit" className="cursor-pointer">
                                                            <svg
                                                                className="w-6 h-6 text-green-500 cursor-pointer hover:text-green-400 ml-2"
                                                                fill="none"
                                                                stroke="currentColor"
                                                                viewBox="0 0 24 24"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth="2"
                                                                    d="M4.5 12.75l6 6 9-13.5"
                                                                />
                                                            </svg>
                                                        </button>
                                                    </form>
                                                </td>
                                            )}
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AssignemntMarks;
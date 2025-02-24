import React from 'react';

const Leaderboard = () => {
    return (
        <section class="py-6 bg-primary">
            <div class="mx-auto max-w-7xl px-5 lg:px-0">
                <div>
                    <h3 class="text-lg font-bold">Your Position in Leaderboard</h3>
                    <table class="text-base w-full border border-slate-600/50 rounded-md my-4">
                        <thead>
                            <tr>
                                <th class="table-th !text-center">Rank</th>
                                <th class="table-th !text-center">Name</th>
                                <th class="table-th !text-center">Quiz Mark</th>
                                <th class="table-th !text-center">Assignment Mark</th>
                                <th class="table-th !text-center">Total</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr class="border-2 border-cyan">
                                <td class="table-td text-center font-bold">4</td>
                                <td class="table-td text-center font-bold">Saad Hasan</td>
                                <td class="table-td text-center font-bold">50</td>
                                <td class="table-td text-center font-bold">50</td>
                                <td class="table-td text-center font-bold">100</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="my-8">
                    <h3 class="text-lg font-bold">Top 20 Result</h3>
                    <table class="text-base w-full border border-slate-600/50 rounded-md my-4">
                        <thead>
                            <tr class="border-b border-slate-600/50">
                                <th class="table-th !text-center">Rank</th>
                                <th class="table-th !text-center">Name</th>
                                <th class="table-th !text-center">Quiz Mark</th>
                                <th class="table-th !text-center">Assignment Mark</th>
                                <th class="table-th !text-center">Total</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr class="border-b border-slate-600/50">
                                <td class="table-td text-center">4</td>
                                <td class="table-td text-center">Saad Hasan</td>
                                <td class="table-td text-center">50</td>
                                <td class="table-td text-center">50</td>
                                <td class="table-td text-center">100</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
};

export default Leaderboard;
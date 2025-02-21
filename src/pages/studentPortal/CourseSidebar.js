import React from 'react';

const CourseSidebar = () => {
    return (
        <div
            class="col-span-full lg:col-auto max-h-[570px] overflow-y-auto bg-secondary p-4 rounded-md border border-slate-50/10 divide-y divide-slate-600/30">

            <div class="w-full flex flex-row gap-2 cursor-pointer hover:bg-slate-900 p-2 py-3">
                <svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z" />
                </svg>
                <div clas="flex flex-col w-full">
                    <a href="#">
                        <p class="text-slate-50 text-sm font-medium">Things I wish I knew as a Junior Web
                            Developer - Sumit Saha - BASIS SoftExpo 2023</p>
                    </a>
                    <div>
                        <span class="text-gray-400 text-xs mt-1">34.5 Mins</span>
                        <span class="text-gray-400 text-xs mt-1"> | </span>
                        <span class="text-gray-400 text-xs mt-1">241K views</span>
                    </div>
                </div>
            </div>

            <div class="w-full flex flex-row gap-2 cursor-pointer hover:bg-slate-900 p-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z" />
                </svg>
                <div clas="flex flex-col w-full">
                    <a href="#">
                        <p class="text-slate-50 text-sm font-medium">Introduction to Couse</p>
                    </a>
                    <div>
                        <span class="text-gray-400 text-xs mt-1">34.5 Mins</span>
                        <span class="text-gray-400 text-xs mt-1"> | </span>
                        <span class="text-gray-400 text-xs mt-1">241K views</span>
                    </div>
                </div>
            </div>

            <div class="w-full flex flex-row gap-2 cursor-pointer hover:bg-slate-900 p-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z" />
                </svg>
                <div clas="flex flex-col w-full">
                    <a href="#">
                        <p class="text-slate-50 text-sm font-medium">Introduction to Couse</p>
                    </a>
                    <div>
                        <span class="text-gray-400 text-xs mt-1">34.5 Mins</span>
                        <span class="text-gray-400 text-xs mt-1"> | </span>
                        <span class="text-gray-400 text-xs mt-1">241K views</span>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default CourseSidebar;
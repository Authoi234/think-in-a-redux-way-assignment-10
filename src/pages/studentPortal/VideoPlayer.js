import React from 'react';

const VideoPlayer = () => {
    return (
        <div class="col-span-full w-full space-y-8 lg:col-span-2">
            <iframe width="100%" class="aspect-video" src="https://www.youtube.com/embed/56zUkaXJnUA"
                title="Things I wish I knew as a Junior Web Developer - Sumit Saha - BASIS SoftExpo 2023"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen></iframe>

            <div>
                <h1 class="text-lg font-semibold tracking-tight text-slate-100">
                    Things I wish I knew as a Junior Web Developer - Sumit Saha - BASIS SoftExpo 2023
                </h1>
                <h2 class=" pb-4 text-sm leading-[1.7142857] text-slate-400">
                    Uploaded on 23 February
                    2020</h2>

                <div class="flex gap-4">
                    <a href="#"
                        class="px-3 font-bold py-1 border border-cyan text-cyan rounded-full text-sm hover:bg-cyan hover:text-primary">
                        এসাইনমেন্ট
                    </a>

                    <a href="./Quiz.html"
                        class="px-3 font-bold py-1 border border-cyan text-cyan rounded-full text-sm hover:bg-cyan hover:text-primary">কুইজে
                        অংশগ্রহণ
                        করুন</a>
                </div>
                <p class="mt-4 text-sm text-slate-400 leading-6">
                    আপনারা যারা বিগিনার হিসেবে রিয়্যাক্ট জেস নিয়ে কাজ করা শুরু করেছেন, তারা রিয়্যাক্ট এর বেশ
                    কিছু কনসেপ্ট ঠিক মতো আয়ত্ত না করতে পারার কারণে বিচিত্র কিছু সমস্যার সম্মুখীন হন এবং শেষ
                    পর্যন্ত বুঝতে না
                    পেরে হতাশ হয়ে পড়েন। তাদের জন্যই এই ভিডিওটি। এই ভিডিওতে আমি এমন ১০টি সমস্যার কথা তুলে ধরেছি
                    যেগুলো
                    বিগিনার হিসেবে আপনারা অহরহ সম্মুখীন হবেন। আশা করি ভিডিওটি দেখলে আপনাদের এই সমস্যাগুলো নিয়ে
                    আর কনফিউশন
                    থাকবেনা।
                </p>


            </div>
        </div>
    );
};

export default VideoPlayer;
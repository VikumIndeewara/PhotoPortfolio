// About.tsx
import React from 'react';
import CountUp from './CountUp'; // Import the new component
import { useInView } from '../hooks/InView'; // Import the scroll detection hook

const About = () => {
    // 1. Attach the useInView hook to the entire section
    const { ref, inView } = useInView(0.1); // Triggers when 10% of the section is visible

    return (
        // Attach the ref to the section
        <section id="about" className="bg-white py-24 md:py-32" ref={ref}>
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid md:grid-cols-2 gap-16 items-center">
                    <div className="relative h-[500px] md:h-[600px] overflow-hidden">
                        <img
                            src="https://images.pexels.com/photos/1408978/pexels-photo-1408978.jpeg?auto=compress&cs=tinysrgb&w=1200"
                            alt="Photographer at work"
                            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                        />
                    </div>

                    <div className="space-y-6">
                        <div className="space-y-2">
                            <p className="text-sm tracking-[0.3em] text-gray-500 uppercase">About Me</p>
                            <h2 className="text-5xl md:text-6xl font-bold text-black leading-tight">
                                Crafting Visual
                                <br />
                                <span className="italic font-light">Stories</span>
                            </h2>
                        </div>

                        <div className="space-y-4 text-gray-600 leading-relaxed text-lg">
                            <p>
                                With over a decade of experience in visual storytelling, I specialize in creating
                                timeless imagery that captures authentic moments and evokes powerful emotions.
                            </p>
                            <p>
                                My work spans across editorial, commercial, and documentary photography and
                                videography, collaborating with brands and individuals who value artistry and
                                authenticity.
                            </p>
                            <p>
                                Every project is an opportunity to push creative boundaries and deliver visuals
                                that resonate long after the moment has passed.
                            </p>
                        </div>

                        {/* 2. Replace static numbers with CountUp components */}
                        <div className="grid grid-cols-3 gap-8 pt-8">
                            <div>
                                <p className="text-4xl font-bold text-black">
                                    <CountUp 
                                        endValue={10} 
                                        duration={2000} // 2 seconds
                                        inView={inView}
                                        suffix="+" 
                                    />
                                </p>
                                <p className="text-sm text-gray-500 mt-2">Years Experience</p>
                            </div>
                            <div>
                                <p className="text-4xl font-bold text-black">
                                    {/* Note: We animate up to 500, the suffix handles the '+' */}
                                    <CountUp 
                                        endValue={500} 
                                        duration={2500} // 2.5 seconds
                                        inView={inView}
                                        suffix="+" 
                                    />
                                </p>
                                <p className="text-sm text-gray-500 mt-2">Projects Completed</p>
                            </div>
                            <div>
                                <p className="text-4xl font-bold text-black">
                                    <CountUp 
                                        endValue={50} 
                                        duration={2000} // 2 seconds
                                        inView={inView}
                                        suffix="+" 
                                    />
                                </p>
                                <p className="text-sm text-gray-500 mt-2">Global Clients</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
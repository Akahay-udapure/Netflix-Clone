import { Play, Info } from "lucide-react"; // modern beautiful icons

const VideoTitle = ({ title, overview, onPlayVideo }) => {
    return (
        <div className="w-screen absolute top-0 h-full flex flex-col justify-center px-6 md:px-24 text-white bg-linear-to-r to-transparent">
            {/* Title */}
            <h1 className="text-3xl my-20 md:text-4xl font-extrabold drop-shadow-[0_4px_10px_rgba(0,0,0,0.9)] leading-tight mb-4 animate-fadeInUp">
                {title}
            </h1>

            {/* Overview */}
            <p className="hidden md:block text-lg md:text-lg font-light w-full md:w-2/5 opacity-90 mb-8 leading-relaxed animate-fadeInUp">
                {overview}
            </p>

            {/* Buttons */}
            <div className="flex gap-3 animate-fadeInUp">
                <button
                    onClick={onPlayVideo}
                    className="cursor-pointer flex items-center gap-1.5 bg-white text-black font-medium py-1.5 md:py-2 px-4 md:px-6 text-base rounded-md hover:bg-gray-200 transition-all duration-200 shadow-md hover:scale-105">
                    <Play size={18} className="text-black" />
                    Play
                </button>

                <button className="cursor-pointer hidden md:flex items-center gap-1.5 bg-gray-600/70 text-white font-medium py-1.5 md:py-2 px-4 md:px-6 text-base rounded-md hover:bg-gray-500/80 backdrop-blur-sm transition-all duration-200 shadow-md hover:scale-105">
                    <Info size={18} />
                    More Info
                </button>
            </div>
        </div>
    );
};

export default VideoTitle;

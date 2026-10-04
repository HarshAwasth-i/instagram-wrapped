import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import ChestUpload from "../components/upload/ChestUpload";
import Background from "../components/layout/Background";
import { InstagramContext } from "../context/InstagramContext";
import { demoAnalytics } from "../utils/demoData";

function Home() {
  const navigate = useNavigate();
  const { setAnalytics, setSelectedYear } = useContext(InstagramContext);

  function handleTryDemo() {
    setAnalytics(demoAnalytics);
    setSelectedYear(2026);
    navigate("/dashboard");
  }

  return (
    <Background>
      <div className="
        min-h-screen
        flex
        flex-col
        items-center
        justify-center
        text-white
        px-6
        py-16
      ">

        {/* Small top label */}
        <div className="
          mb-6
          px-4
          py-2
          rounded-full
          border
          border-white/10
          bg-white/5
          backdrop-blur-sm
          text-xs
          md:text-sm
          tracking-[0.25em]
          uppercase
          text-gray-400
        ">
          Your Instagram. Your story.
        </div>

        {/* Main heading */}
        <h1 className="
          text-5xl
          md:text-7xl
          lg:text-8xl
          font-black
          tracking-[0.08em]
          text-center
          leading-none
          bg-gradient-to-r
          from-white
          via-[#e8dcc0]
          to-gray-400
          bg-clip-text
          text-transparent
        ">
          INSTAGRAM
          <br />
          WRAPPED
        </h1>

        {/* Description */}
        <p className="
          mt-7
          max-w-2xl
          text-center
          text-base
          md:text-lg
          text-gray-400
          leading-relaxed
        ">
          Turn your Instagram data into a personal year in review.
          <br className="hidden md:block" />
          Discover what your year looked like.
        </p>

        {/* Upload box */}
        <div className="mt-10 w-full flex justify-center">
          <ChestUpload />
        </div>

        {/* See-through Demo Button */}
        <div className="mt-6 flex flex-col sm:flex-row items-center gap-3">
          <button
            onClick={handleTryDemo}
            className="
              px-6
              py-3
              rounded-xl
              bg-lime-400/[0.12]
              border
              border-lime-400/40
              text-lime-300
              font-bold
              text-xs
              md:text-sm
              backdrop-blur-xl
              hover:bg-lime-400/[0.22]
              hover:border-lime-300
              hover:shadow-[0_0_25px_rgba(190,242,100,0.25)]
              active:scale-95
              transition-all
              duration-300
              cursor-pointer
              flex
              items-center
              gap-2
            "
          >
            <span>⚡</span>
            <span>Try Sample Demo (Instant Preview)</span>
          </button>
        </div>

        {/* Privacy message */}
        <div className="
          mt-6
          flex
          items-center
          gap-2
          text-sm
          text-gray-500
        ">
          <span>🔒</span>
          <span>Your data stays on your device (100% Client-Side)</span>
        </div>

        {/* Bottom hint */}
        <p className="
          mt-2
          text-xs
          text-gray-600
          text-center
        ">
          Upload your Instagram data export ZIP or click Sample Demo to explore
        </p>

      </div>
    </Background>
  );
}

export default Home;
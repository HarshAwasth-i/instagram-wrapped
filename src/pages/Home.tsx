import ChestUpload from "../components/upload/ChestUpload";
import Background from "../components/layout/Background";

function Home() {

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
          Upload your Instagram data export ZIP to get your personalized year in review
        </p>

      </div>
    </Background>
  );
}

export default Home;
import { useContext, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { InstagramContext } from "../../context/InstagramContext";

function WrappedStories() {
  const {
    analytics,
    selectedYear
  } = useContext(InstagramContext);

  const [current, setCurrent] = useState(0);

  if (!analytics) {
    return null;
  }

  const slides = [
    {
      emoji: "📸",
      eyebrow: "YOUR INSTAGRAM",
      title: "WRAPPED",
      value: selectedYear || "YEAR",
      description:
        "A look back at your Instagram world.",
      accent: "text-lime-300"
    },

    {
      emoji: "💬",
      eyebrow: "YOUR YEAR IN MESSAGES",
      title: "You had conversations.",
      value: analytics.messagesCount.toLocaleString(),
      suffix: "messages",
      description:
        "Every message helped tell the story of your year.",
      accent: "text-lime-300"
    },

    {
      emoji: "🫂",
      eyebrow: "YOUR TOP CONNECTION",
      title: analytics.topFriend || "Your people",
      value: analytics.topFriend
        ? `${analytics.topFriends?.[0]?.count || 0}`
        : "—",
      suffix: analytics.topFriend ? "messages together" : "",
      description:
        "Some conversations clearly mattered more than others.",
      accent: "text-pink-300"
    },

    {
      emoji: "❤️",
      eyebrow: "YOUR LIKES",
      title: "You showed some love.",
      value: analytics.likesGiven.toLocaleString(),
      suffix: "likes",
      description:
        "Scrolling was never just scrolling.",
      accent: "text-red-400"
    },

    {
      emoji: "📸",
      eyebrow: "YOUR CONTENT",
      title: "You were creating.",
      value: (
        analytics.postsCount +
        analytics.storiesCount +
        analytics.reelsCount
      ).toLocaleString(),
      suffix: "pieces of content",
      description:
        "Posts, stories and reels made up your year.",
      accent: "text-yellow-300"
    },

    {
      emoji: "👥",
      eyebrow: "YOUR CONNECTIONS",
      title: "Your Instagram circle",
      value: analytics.followersCount.toLocaleString(),
      suffix: "followers",
      description:
        "A snapshot of the people connected to you.",
      accent: "text-blue-300"
    },

    {
      emoji: "✨",
      eyebrow: "YOUR YEAR",
      title: "That's a wrap.",
      value: "YOU",
      description:
        "Your Instagram had its own story. This was yours.",
      accent: "text-lime-300"
    }
  ];

  const slide = slides[current];

  function nextSlide() {
    if (current < slides.length - 1) {
      setCurrent(current + 1);
    }
  }

  function previousSlide() {
    if (current > 0) {
      setCurrent(current - 1);
    }
  }

  return (
    <div className="fixed inset-0 z-[100] bg-[#090909] text-white flex items-center justify-center">

      {/* Background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-96 h-96 bg-lime-300/10 rounded-full blur-3xl -top-32 -left-32" />
        <div className="absolute w-96 h-96 bg-pink-400/10 rounded-full blur-3xl -bottom-32 -right-32" />
      </div>

      {/* Story container */}
      <div className="relative w-full max-w-3xl h-full md:h-[90vh] md:max-h-[850px] flex flex-col justify-between px-6 py-8">

        {/* Progress bars */}
        <div className="flex gap-2">
          {slides.map((_, index) => (
            <div
              key={index}
              className="h-1 flex-1 rounded-full bg-white/20 overflow-hidden"
            >
              <motion.div
                className="h-full bg-white"
                initial={{ width: "0%" }}
                animate={{
                  width:
                    index <= current
                      ? "100%"
                      : "0%"
                }}
                transition={{ duration: 0.3 }}
              />
            </div>
          ))}
        </div>

        {/* Main story */}
        <div className="flex-1 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{
                opacity: 0,
                x: 50
              }}
              animate={{
                opacity: 1,
                x: 0
              }}
              exit={{
                opacity: 0,
                x: -50
              }}
              transition={{
                duration: 0.4
              }}
              className="text-center w-full"
            >

              <div className="text-7xl md:text-8xl mb-8">
                {slide.emoji}
              </div>

              <p className="text-sm md:text-base uppercase tracking-[0.3em] text-gray-400 font-bold">
                {slide.eyebrow}
              </p>

              <h1 className="text-4xl md:text-6xl font-black mt-6">
                {slide.title}
              </h1>

              <div
                className={`text-6xl md:text-8xl font-black mt-8 ${slide.accent}`}
              >
                {slide.value}
              </div>

              {slide.suffix && (
                <p className="text-xl md:text-2xl text-gray-300 mt-3 font-semibold">
                  {slide.suffix}
                </p>
              )}

              <p className="text-gray-500 text-base md:text-lg mt-8 max-w-lg mx-auto">
                {slide.description}
              </p>

            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between">

          <button
            onClick={previousSlide}
            disabled={current === 0}
            className="
              px-5 py-3
              rounded-full
              bg-white/10
              border border-white/10
              text-gray-300
              disabled:opacity-30
              disabled:cursor-not-allowed
              hover:bg-white/20
              transition
            "
          >
            ← Back
          </button>

          <span className="text-sm text-gray-500">
            {current + 1} / {slides.length}
          </span>

          <button
            onClick={nextSlide}
            disabled={current === slides.length - 1}
            className="
              px-5 py-3
              rounded-full
              bg-white
              text-black
              font-bold
              disabled:opacity-30
              disabled:cursor-not-allowed
              hover:scale-105
              transition
            "
          >
            Next →
          </button>

        </div>

      </div>
    </div>
  );
}

export default WrappedStories;
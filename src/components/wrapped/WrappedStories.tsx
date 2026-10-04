import {
  useContext,
  useEffect,
  useState
} from "react";

import {
  motion,
  AnimatePresence
} from "framer-motion";

import {
  InstagramContext
} from "../../context/InstagramContext";


function WrappedStories({
  onClose
}: {
  onClose: () => void;
}) {

  const {
    analytics,
    selectedYear
  } = useContext(
    InstagramContext
  );


  const [
    current,
    setCurrent
  ] = useState(0);


  const [
    isPaused,
    setIsPaused
  ] = useState(false);


  // =========================
  // STORY DURATION
  // =========================

  const STORY_DURATION = 5000;


  if (!analytics) {
    return null;
  }


  // =========================
  // WRAPPED SLIDES
  // =========================

  const slides = [

    {
      emoji: "📸",
      eyebrow: "YOUR INSTAGRAM",
      title: "WRAPPED",
      value:
        selectedYear || "YEAR",
      description:
        "A look back at your Instagram world.",
      accent:
        "text-lime-300"
    },


    {
      emoji: "💬",
      eyebrow:
        "YOUR YEAR IN MESSAGES",
      title:
        "You had conversations.",
      value:
        analytics.messagesCount.toLocaleString(),
      suffix:
        "messages",
      description:
        "Every message helped tell the story of your year.",
      accent:
        "text-lime-300"
    },


    {
      emoji: "🫂",
      eyebrow:
        "YOUR TOP CONNECTION",
      title:
        analytics.topFriend ||
        "Your people",
      value:
        analytics.topFriend
          ? `${analytics.topFriends?.[0]?.count || 0}`
          : "—",
      suffix:
        analytics.topFriend
          ? "messages together"
          : "",
      description:
        "Some conversations clearly mattered more than others.",
      accent:
        "text-pink-300"
    },


    {
      emoji: "❤️",
      eyebrow:
        "YOUR LIKES",
      title:
        "You showed some love.",
      value:
        analytics.likesGiven.toLocaleString(),
      suffix:
        "likes",
      description:
        "Scrolling was never just scrolling.",
      accent:
        "text-red-400"
    },


    {
      emoji: "📸",
      eyebrow:
        "YOUR CONTENT",
      title:
        "You were creating.",
      value: (
        analytics.postsCount +
        analytics.storiesCount +
        analytics.reelsCount
      ).toLocaleString(),
      suffix:
        "pieces of content",
      description:
        "Posts, stories and reels made up your year.",
      accent:
        "text-yellow-300"
    },


    {
      emoji: "📅",
      eyebrow:
        "YOUR CREATOR MOMENT",
      title:
        analytics.mostActiveMonth !== "—"
          ? analytics.mostActiveMonth
          : "Your creative side",
      value:
        analytics.postsCount > 0
          ? analytics.postsCount.toLocaleString()
          : "—",
      suffix:
        analytics.postsCount > 0
          ? "posts across the year"
          : "",
      description:
        "That's when your creator energy showed up the most.",
      accent:
        "text-yellow-300"
    },


    {
      emoji: "👥",
      eyebrow:
        "YOUR CONNECTIONS",
      title:
        "Your Instagram circle",
      value:
        analytics.followersCount.toLocaleString(),
      suffix:
        "followers",
      description:
        "A snapshot of the people connected to you.",
      accent:
        "text-blue-300"
    },


    {
      emoji: "✨",
      eyebrow:
        "YOUR INSTAGRAM VIBE",
      title:
        analytics.messagesCount > 10000
          ? "Social Builder"
          : analytics.likesGiven > 20000
          ? "Like Machine"
          : analytics.likesGiven >
            analytics.sentMessages
          ? "Silent Observer"
          : analytics.postsCount < 5
          ? "Ghost Poster"
          : analytics.topFriend
          ? "Loyal Friend"
          : "Quiet Observer",
      value:
        "YOU",
      description:
        "Your activity says something about how you experienced Instagram.",
      accent:
        "text-purple-300"
    },


    {
      emoji: "✨",
      eyebrow:
        "YOUR YEAR",
      title:
        "That's a wrap.",
      value:
        "YOU",
      description:
        "Your Instagram had its own story. This was yours.",
      accent:
        "text-lime-300"
    }

  ];


  // =========================
  // CURRENT SLIDE
  // =========================

  const slide =
    slides[current];


  // =========================
  // NEXT SLIDE
  // =========================

  function nextSlide() {

    if (
      current <
      slides.length - 1
    ) {

      setCurrent(
        current + 1
      );

    }

  }


  // =========================
  // PREVIOUS SLIDE
  // =========================

  function previousSlide() {

    if (
      current > 0
    ) {

      setCurrent(
        current - 1
      );

    }

  }


  // =========================
  // AUTO PLAY
  // =========================

  useEffect(() => {

    // Stop auto-play
    // on final slide.

    if (
      current >=
      slides.length - 1
    ) {
      return;
    }


    // Stop timer
    // while paused.

    if (isPaused) {
      return;
    }


    const timer =
      setTimeout(() => {

        setCurrent(
          (previous) =>
            previous + 1
        );

      }, STORY_DURATION);


    return () => {

      clearTimeout(timer);

    };

  }, [
    current,
    isPaused,
    slides.length
  ]);


  // =========================
  // KEYBOARD CONTROLS
  // =========================

  useEffect(() => {

    function handleKeyDown(
      event: KeyboardEvent
    ) {

      if (
        event.key ===
        "ArrowRight" ||
        event.key ===
        " "
      ) {

        event.preventDefault();

        nextSlide();

      }


      if (
        event.key ===
        "ArrowLeft"
      ) {

        event.preventDefault();

        previousSlide();

      }


      if (
        event.key ===
        "Escape"
      ) {

        event.preventDefault();

        onClose();

      }

    }


    window.addEventListener(
      "keydown",
      handleKeyDown
    );


    return () => {

      window.removeEventListener(
        "keydown",
        handleKeyDown
      );

    };

  }, [
    current
  ]);


  // =========================
  // UI
  // =========================

  return (

    <div
      className="
        fixed
        inset-0
        z-[100]
        bg-[#090909]
        text-white
        flex
        items-center
        justify-center
      "
      onMouseEnter={() =>
        setIsPaused(true)
      }
      onMouseLeave={() =>
        setIsPaused(false)
      }
    >


      {/* =========================
          BACKGROUND GLOW
          ========================= */}

      <div
        className="
          absolute
          inset-0
          overflow-hidden
          pointer-events-none
        "
      >

        <div
          className="
            absolute
            w-96
            h-96
            bg-lime-300/10
            rounded-full
            blur-3xl
            -top-32
            -left-32
          "
        />

        <div
          className="
            absolute
            w-96
            h-96
            bg-pink-400/10
            rounded-full
            blur-3xl
            -bottom-32
            -right-32
          "
        />

      </div>


      {/* =========================
          STORY CONTAINER
          ========================= */}

      <div
        className="
          relative
          w-full
          max-w-3xl
          h-full
          md:h-[90vh]
          md:max-h-[850px]
          flex
          flex-col
          justify-between
          px-6
          py-8
        "
      >


        {/* =========================
            CLOSE BUTTON
            ========================= */}

        <button
          onClick={onClose}
          className="
            absolute
            top-8
            right-6
            z-30
            text-2xl
            text-gray-400
            hover:text-white
            transition
          "
          aria-label="Close Wrapped"
        >
          ✕
        </button>


        {/* =========================
            PROGRESS BARS
            ========================= */}

        <div
          className="
            flex
            gap-2
            pr-12
            relative
            z-20
          "
        >

          {slides.map(
            (_, index) => (

              <div
                key={index}
                className="
                  h-1
                  flex-1
                  rounded-full
                  bg-white/20
                  overflow-hidden
                "
              >

                <motion.div
                  className="
                    h-full
                    bg-white
                  "
                  initial={{
                    width: "0%"
                  }}
                  animate={{
                    width:
                      index < current
                        ? "100%"
                        : index > current
                        ? "0%"
                        : isPaused
                        ? undefined
                        : "100%"
                  }}
                  transition={{
                    duration:
                      index === current &&
                      !isPaused
                        ? STORY_DURATION /
                          1000
                        : 0.2,
                    ease:
                      "linear"
                  }}
                />

              </div>

            )
          )}

        </div>


        {/* =========================
            PAUSED INDICATOR
            ========================= */}

        {isPaused &&
          current <
            slides.length - 1 && (

          <div
            className="
              absolute
              top-14
              left-1/2
              -translate-x-1/2
              z-30
              px-3
              py-1
              rounded-full
              bg-black/50
              text-xs
              text-gray-400
              backdrop-blur-sm
            "
          >
            PAUSED
          </div>

        )}


        {/* =========================
            LEFT TAP ZONE
            ========================= */}

        <div
          onClick={previousSlide}
          className="
            absolute
            left-0
            top-20
            bottom-24
            w-1/3
            z-10
            cursor-pointer
          "
          aria-label="Previous story"
        />


        {/* =========================
            RIGHT TAP ZONE
            ========================= */}

        <div
          onClick={nextSlide}
          className="
            absolute
            right-0
            top-20
            bottom-24
            w-1/3
            z-10
            cursor-pointer
          "
          aria-label="Next story"
        />


        {/* =========================
            MAIN STORY
            ========================= */}

        <div
          className="
            flex-1
            flex
            items-center
            justify-center
            relative
            z-[5]
          "
        >

          <AnimatePresence
            mode="wait"
          >

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

              className="
                text-center
                w-full
              "
            >


              {/* EMOJI */}

              <div
                className="
                  text-7xl
                  md:text-8xl
                  mb-8
                "
              >
                {slide.emoji}
              </div>


              {/* EYEBROW */}

              <p
                className="
                  text-sm
                  md:text-base
                  uppercase
                  tracking-[0.3em]
                  text-gray-400
                  font-bold
                "
              >
                {slide.eyebrow}
              </p>


              {/* TITLE */}

              <h1
                className="
                  text-4xl
                  md:text-6xl
                  font-black
                  mt-6
                "
              >
                {slide.title}
              </h1>


              {/* MAIN VALUE */}

              <div
                className={`
                  text-6xl
                  md:text-8xl
                  font-black
                  mt-8
                  ${slide.accent}
                `}
              >
                {slide.value}
              </div>


              {/* SUFFIX */}

              {slide.suffix && (

                <p
                  className="
                    text-xl
                    md:text-2xl
                    text-gray-300
                    mt-3
                    font-semibold
                  "
                >
                  {slide.suffix}
                </p>

              )}


              {/* DESCRIPTION */}

              <p
                className="
                  text-gray-500
                  text-base
                  md:text-lg
                  mt-8
                  max-w-lg
                  mx-auto
                "
              >
                {slide.description}
              </p>


            </motion.div>

          </AnimatePresence>

        </div>


        {/* =========================
            NAVIGATION
            ========================= */}

        <div
          className="
            flex
            items-center
            justify-between
            relative
            z-20
          "
        >


          {/* BACK */}

          <button
            onClick={previousSlide}
            disabled={
              current === 0
            }
            className="
              relative
              z-20
              px-5
              py-3
              rounded-full
              bg-white/10
              border
              border-white/10
              text-gray-300
              disabled:opacity-30
              disabled:cursor-not-allowed
              hover:bg-white/20
              transition
            "
          >
            ← Back
          </button>


          {/* COUNTER */}

          <div
            className="
              relative
              z-20
              flex
              flex-col
              items-center
            "
          >

            <span
              className="
                text-sm
                text-gray-500
              "
            >
              {current + 1}
              {" / "}
              {slides.length}
            </span>


            {current <
              slides.length - 1 && (

              <span
                className="
                  text-[10px]
                  text-gray-600
                  mt-1
                "
              >
                {isPaused
                  ? "PAUSED"
                  : "AUTO PLAY"}
              </span>

            )}

          </div>


          {/* NEXT */}

          <button
            onClick={nextSlide}
            disabled={
              current ===
              slides.length - 1
            }
            className="
              relative
              z-20
              px-5
              py-3
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
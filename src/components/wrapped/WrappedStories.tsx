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


  const STORY_DURATION = 5000;

  const a = analytics || {
    messagesCount: 0,
    likesGiven: 0,
    sentMessages: 0,
    postsCount: 0,
    storiesCount: 0,
    reelsCount: 0,
    followersCount: 0,
    topFriend: "",
    topFriends: [],
    mostActiveMonth: "—",
    hourActivity: [],
    personality: "Quiet Observer"
  };

  // =========================
  // PERSONALITY
  // =========================

  const personality =
    a.messagesCount > 10000
      ? "Social Builder"
      : a.likesGiven > 20000
      ? "Like Machine"
      : a.likesGiven >
        a.sentMessages
      ? "Silent Observer"
      : a.postsCount < 5
      ? "Ghost Poster"
      : a.topFriend
      ? "Loyal Friend"
      : "Quiet Observer";


  const personalityEmoji =
    personality === "Social Builder"
      ? "🧱"
      : personality === "Like Machine"
      ? "❤️"
      : personality === "Silent Observer"
      ? "👀"
      : personality === "Ghost Poster"
      ? "👻"
      : personality === "Loyal Friend"
      ? "💕"
      : "✨";


  // =========================
  // CONTENT TOTAL
  // =========================

  const totalContent =
    a.postsCount +
    a.storiesCount +
    a.reelsCount;


  // =========================
  // SLIDES
  // =========================

  const slides = [

    // =========================
    // INTRO
    // =========================

    {
      type: "intro",

      emoji: "📸",

      eyebrow:
        "YOUR INSTAGRAM",

      title:
        "WRAPPED",

      value:
        selectedYear || "YEAR",

      description:
        "A look back at your Instagram world.",

      accent:
        "text-lime-300"
    },


    // =========================
    // MESSAGES
    // =========================

    {
      type: "messages",

      emoji: "💬",

      eyebrow:
        "YOUR YEAR IN MESSAGES",

      title:
        "You had conversations.",

      value:
        a.messagesCount.toLocaleString(),

      suffix:
        "messages",

      description:
        "Every message helped tell the story of your year.",

      accent:
        "text-lime-300"
    },


    // =========================
    // TOP FRIEND
    // =========================

    {
      type: "friend",

      emoji: "🫂",

      eyebrow:
        "YOUR TOP CONNECTION",

      title:
        a.topFriend ||
        "Your people",

      value:
        a.topFriend
          ? `${a.topFriends?.[0]?.count || 0}`
          : "—",

      suffix:
        a.topFriend
          ? "messages together"
          : "",

      description:
        "Some conversations clearly mattered more than others.",

      accent:
        "text-pink-300"
    },


    // =========================
    // LIKES
    // =========================

    {
      type: "likes",

      emoji: "❤️",

      eyebrow:
        "YOUR LIKES",

      title:
        "You showed some love.",

      value:
        a.likesGiven.toLocaleString(),

      suffix:
        "likes",

      description:
        "Scrolling was never just scrolling.",

      accent:
        "text-red-400"
    },


    // =========================
    // CONTENT
    // =========================

    {
      type: "content",

      emoji: "📸",

      eyebrow:
        "YOUR CONTENT",

      title:
        "You were creating.",

      value:
        totalContent.toLocaleString(),

      suffix:
        "pieces of content",

      description:
        "Posts, stories and reels made up your year.",

      accent:
        "text-yellow-300"
    },


    // =========================
    // CREATOR MOMENT
    // =========================

    {
      type: "month",

      emoji: "📅",

      eyebrow:
        "YOUR CREATOR MOMENT",

      title:
        a.mostActiveMonth !== "—"
          ? a.mostActiveMonth
          : "Your creative side",

      value:
        a.postsCount > 0
          ? a.postsCount.toLocaleString()
          : "—",

      suffix:
        a.postsCount > 0
          ? "posts across the year"
          : "",

      description:
        "That's when your creator energy showed up the most.",

      accent:
        "text-yellow-300"
    },


    // =========================
    // CONNECTIONS
    // =========================

    {
      type: "connections",

      emoji: "👥",

      eyebrow:
        "YOUR CONNECTIONS",

      title:
        "Your Instagram circle",

      value:
        a.followersCount.toLocaleString(),

      suffix:
        "followers",

      description:
        "A snapshot of the people connected to you.",

      accent:
        "text-blue-300"
    },


    // =========================
    // PERSONALITY
    // =========================

    {
      type: "personality",

      emoji:
        personalityEmoji,

      eyebrow:
        "YOUR INSTAGRAM VIBE",

      title:
        personality,

      value:
        "YOU",

      description:
        "Your activity says something about how you experienced Instagram.",

      accent:
        "text-purple-300"
    },


    // =========================
    // FINAL
    // =========================

    {
      type: "final",

      emoji:
        "✨",

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


  const slide =
    slides[current];


  // =========================
  // NEXT
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
  // PREVIOUS
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

    if (
      current >=
      slides.length - 1
    ) {

      return;

    }


    if (isPaused) {

      return;

    }


    const timer =
      setTimeout(() => {

        setCurrent(
          previous =>
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
  // KEYBOARD
  // =========================

  useEffect(() => {

    function handleKeyDown(
      event: KeyboardEvent
    ) {

      if (
        event.key ===
          "ArrowRight" ||
        event.key === " "
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
    current,
    slides.length,
    onClose
  ]);


  // =========================
  // MAIN UI
  // =========================

  if (!analytics) {
    return null;
  }

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
          BACKGROUND
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
            CLOSE
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
            PROGRESS
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
                        ? STORY_DURATION / 1000
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
            PAUSED
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
            LEFT TAP
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
            RIGHT TAP
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
            STORY CONTENT
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
                scale: 0.94,
                y: 20
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0
              }}
              exit={{
                opacity: 0,
                scale: 1.03,
                y: -20
              }}
              transition={{
                duration: 0.45
              }}
              className="
                text-center
                w-full
                max-w-2xl
              "
            >


              {/* =====================================================
                  INTRO
                  ===================================================== */}

              {slide.type === "intro" && (

                <div>

                  <motion.div
                    animate={{
                      rotate: [0, -8, 8, 0],
                      scale: [1, 1.08, 1]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 2
                    }}
                    className="
                      text-8xl
                      md:text-[120px]
                      mb-8
                    "
                  >
                    {slide.emoji}
                  </motion.div>


                  <p
                    className="
                      text-sm
                      uppercase
                      tracking-[0.35em]
                      text-lime-300
                      font-bold
                    "
                  >
                    {slide.eyebrow}
                  </p>


                  <h1
                    className="
                      text-6xl
                      md:text-8xl
                      font-black
                      mt-5
                    "
                  >
                    {slide.title}
                  </h1>


                  <div
                    className="
                      text-5xl
                      md:text-7xl
                      font-black
                      text-[#d8cfb5]
                      mt-5
                    "
                  >
                    {slide.value}
                  </div>


                  <p
                    className="
                      text-gray-400
                      text-lg
                      mt-7
                    "
                  >
                    {slide.description}
                  </p>

                </div>

              )}


              {/* =====================================================
                  MESSAGES
                  ===================================================== */}

              {slide.type === "messages" && (

                <div>

                  <div
                    className="
                      inline-flex
                      items-center
                      justify-center
                      w-28
                      h-28
                      md:w-36
                      md:h-36
                      rounded-full
                      bg-lime-300/10
                      border
                      border-lime-300/20
                      text-6xl
                      md:text-7xl
                      mb-8
                    "
                  >
                    {slide.emoji}
                  </div>


                  <p
                    className="
                      text-sm
                      uppercase
                      tracking-[0.3em]
                      text-gray-400
                      font-bold
                    "
                  >
                    {slide.eyebrow}
                  </p>


                  <h1
                    className="
                      text-4xl
                      md:text-5xl
                      font-black
                      mt-5
                    "
                  >
                    {slide.title}
                  </h1>


                  <div
                    className="
                      text-7xl
                      md:text-[110px]
                      font-black
                      text-lime-300
                      mt-6
                      leading-none
                    "
                  >
                    {slide.value}
                  </div>


                  <p
                    className="
                      text-xl
                      md:text-2xl
                      font-bold
                      text-white
                      mt-4
                    "
                  >
                    {slide.suffix}
                  </p>


                  <div
                    className="
                      mt-8
                      mx-auto
                      max-w-md
                      p-5
                      rounded-2xl
                      bg-white/5
                      border
                      border-white/10
                    "
                  >

                    <p
                      className="
                        text-gray-400
                        text-sm
                      "
                    >
                      {slide.description}
                    </p>

                  </div>

                </div>

              )}


              {/* =====================================================
                  TOP FRIEND
                  ===================================================== */}

              {slide.type === "friend" && (

                <div>

                  <div
                    className="
                      relative
                      mx-auto
                      w-32
                      h-32
                      md:w-40
                      md:h-40
                      rounded-full
                      bg-pink-400/10
                      border
                      border-pink-300/30
                      flex
                      items-center
                      justify-center
                      text-7xl
                      mb-8
                    "
                  >

                    {slide.emoji}

                    <div
                      className="
                        absolute
                        -right-2
                        -top-2
                        w-10
                        h-10
                        rounded-full
                        bg-pink-300
                        text-black
                        flex
                        items-center
                        justify-center
                        text-lg
                      "
                    >
                      ♥
                    </div>

                  </div>


                  <p
                    className="
                      text-sm
                      uppercase
                      tracking-[0.3em]
                      text-pink-300
                      font-bold
                    "
                  >
                    {slide.eyebrow}
                  </p>


                  <h1
                    className="
                      text-4xl
                      md:text-6xl
                      font-black
                      mt-5
                      break-words
                    "
                  >
                    {slide.title}
                  </h1>


                  <div
                    className="
                      text-6xl
                      md:text-8xl
                      font-black
                      text-pink-300
                      mt-6
                    "
                  >
                    {slide.value}
                  </div>


                  <p
                    className="
                      text-xl
                      md:text-2xl
                      text-gray-300
                      font-bold
                      mt-2
                    "
                  >
                    {slide.suffix}
                  </p>


                  <p
                    className="
                      text-gray-500
                      mt-7
                    "
                  >
                    {slide.description}
                  </p>

                </div>

              )}


              {/* =====================================================
                  LIKES
                  ===================================================== */}

              {slide.type === "likes" && (

                <div>

                  <motion.div
                    animate={{
                      scale: [1, 1.18, 1]
                    }}
                    transition={{
                      duration: 1.4,
                      repeat: Infinity,
                      repeatDelay: 1
                    }}
                    className="
                      text-8xl
                      md:text-[130px]
                      mb-6
                    "
                  >
                    {slide.emoji}
                  </motion.div>


                  <p
                    className="
                      text-sm
                      uppercase
                      tracking-[0.3em]
                      text-red-400
                      font-bold
                    "
                  >
                    {slide.eyebrow}
                  </p>


                  <h1
                    className="
                      text-4xl
                      md:text-5xl
                      font-black
                      mt-5
                    "
                  >
                    {slide.title}
                  </h1>


                  <div
                    className="
                      text-7xl
                      md:text-[110px]
                      font-black
                      text-red-400
                      mt-6
                      leading-none
                    "
                  >
                    {slide.value}
                  </div>


                  <p
                    className="
                      text-xl
                      text-gray-300
                      font-bold
                      mt-3
                    "
                  >
                    {slide.suffix}
                  </p>


                  <p
                    className="
                      text-gray-500
                      mt-7
                    "
                  >
                    {slide.description}
                  </p>

                </div>

              )}


              {/* =====================================================
                  CONTENT
                  ===================================================== */}

              {slide.type === "content" && (

                <div>

                  <div
                    className="
                      text-7xl
                      mb-6
                    "
                  >
                    {slide.emoji}
                  </div>


                  <p
                    className="
                      text-sm
                      uppercase
                      tracking-[0.3em]
                      text-yellow-300
                      font-bold
                    "
                  >
                    {slide.eyebrow}
                  </p>


                  <h1
                    className="
                      text-4xl
                      md:text-5xl
                      font-black
                      mt-5
                    "
                  >
                    {slide.title}
                  </h1>


                  <div
                    className="
                      text-7xl
                      md:text-[105px]
                      font-black
                      text-yellow-300
                      mt-6
                    "
                  >
                    {slide.value}
                  </div>


                  <p
                    className="
                      text-xl
                      font-bold
                      text-gray-300
                      mt-2
                    "
                  >
                    {slide.suffix}
                  </p>


                  {/* CONTENT BREAKDOWN */}

                  <div
                    className="
                      grid
                      grid-cols-3
                      gap-3
                      max-w-lg
                      mx-auto
                      mt-8
                    "
                  >

                    <div
                      className="
                        p-4
                        rounded-2xl
                        bg-white/5
                        border
                        border-white/10
                      "
                    >

                      <div className="text-2xl">
                        🎞️
                      </div>

                      <div
                        className="
                          text-2xl
                          font-black
                          mt-2
                        "
                      >
                        {analytics.reelsCount}
                      </div>

                      <div
                        className="
                          text-[10px]
                          uppercase
                          text-gray-500
                          font-bold
                        "
                      >
                        Reels
                      </div>

                    </div>


                    <div
                      className="
                        p-4
                        rounded-2xl
                        bg-white/5
                        border
                        border-white/10
                      "
                    >

                      <div className="text-2xl">
                        ▣
                      </div>

                      <div
                        className="
                          text-2xl
                          font-black
                          mt-2
                        "
                      >
                        {analytics.postsCount}
                      </div>

                      <div
                        className="
                          text-[10px]
                          uppercase
                          text-gray-500
                          font-bold
                        "
                      >
                        Posts
                      </div>

                    </div>


                    <div
                      className="
                        p-4
                        rounded-2xl
                        bg-white/5
                        border
                        border-white/10
                      "
                    >

                      <div className="text-2xl">
                        📖
                      </div>

                      <div
                        className="
                          text-2xl
                          font-black
                          mt-2
                        "
                      >
                        {analytics.storiesCount}
                      </div>

                      <div
                        className="
                          text-[10px]
                          uppercase
                          text-gray-500
                          font-bold
                        "
                      >
                        Stories
                      </div>

                    </div>

                  </div>

                </div>

              )}


              {/* =====================================================
                  CREATOR MONTH
                  ===================================================== */}

              {slide.type === "month" && (

                <div>

                  <div
                    className="
                      inline-flex
                      items-center
                      justify-center
                      w-28
                      h-28
                      rounded-3xl
                      bg-yellow-300/10
                      border
                      border-yellow-300/20
                      text-6xl
                      mb-8
                    "
                  >
                    {slide.emoji}
                  </div>


                  <p
                    className="
                      text-sm
                      uppercase
                      tracking-[0.3em]
                      text-yellow-300
                      font-bold
                    "
                  >
                    {slide.eyebrow}
                  </p>


                  <div
                    className="
                      text-5xl
                      md:text-7xl
                      font-black
                      text-yellow-300
                      mt-6
                    "
                  >
                    {slide.title}
                  </div>


                  <div
                    className="
                      mt-8
                      inline-block
                      px-8
                      py-5
                      rounded-3xl
                      bg-white/5
                      border
                      border-white/10
                    "
                  >

                    <div
                      className="
                        text-5xl
                        md:text-6xl
                        font-black
                      "
                    >
                      {slide.value}
                    </div>

                    <div
                      className="
                        text-gray-400
                        mt-2
                        font-semibold
                      "
                    >
                      {slide.suffix}
                    </div>

                  </div>


                  <p
                    className="
                      text-gray-500
                      mt-7
                    "
                  >
                    {slide.description}
                  </p>

                </div>

              )}


              {/* =====================================================
                  CONNECTIONS
                  ===================================================== */}

              {slide.type === "connections" && (

                <div>

                  <div
                    className="
                      text-7xl
                      mb-6
                    "
                  >
                    {slide.emoji}
                  </div>


                  <p
                    className="
                      text-sm
                      uppercase
                      tracking-[0.3em]
                      text-blue-300
                      font-bold
                    "
                  >
                    {slide.eyebrow}
                  </p>


                  <h1
                    className="
                      text-4xl
                      md:text-5xl
                      font-black
                      mt-5
                    "
                  >
                    {slide.title}
                  </h1>


                  <div
                    className="
                      mt-8
                      max-w-md
                      mx-auto
                      rounded-3xl
                      bg-blue-300/5
                      border
                      border-blue-300/20
                      p-8
                    "
                  >

                    <div
                      className="
                        text-6xl
                        md:text-8xl
                        font-black
                        text-blue-300
                      "
                    >
                      {slide.value}
                    </div>


                    <div
                      className="
                        text-xl
                        text-gray-300
                        font-bold
                        mt-2
                      "
                    >
                      {slide.suffix}
                    </div>


                    <div
                      className="
                        mt-6
                        flex
                        justify-center
                        gap-8
                        text-sm
                      "
                    >

                      <div>

                        <div
                          className="
                            text-2xl
                            font-black
                          "
                        >
                          {analytics.followingCount}
                        </div>

                        <div
                          className="
                            text-gray-500
                            uppercase
                            text-[10px]
                            font-bold
                          "
                        >
                          Following
                        </div>

                      </div>


                      <div>

                        <div
                          className="
                            text-2xl
                            font-black
                          "
                        >
                          {analytics.mutualFollowers}
                        </div>

                        <div
                          className="
                            text-gray-500
                            uppercase
                            text-[10px]
                            font-bold
                          "
                        >
                          Mutuals
                        </div>

                      </div>

                    </div>

                  </div>


                  <p
                    className="
                      text-gray-500
                      mt-7
                    "
                  >
                    {slide.description}
                  </p>

                </div>

              )}


              {/* =====================================================
                  PERSONALITY
                  ===================================================== */}

              {slide.type === "personality" && (

                <div>

                  <motion.div
                    animate={{
                      y: [0, -10, 0],
                      rotate: [0, 4, -4, 0]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity
                    }}
                    className="
                      text-8xl
                      md:text-[120px]
                      mb-8
                    "
                  >
                    {slide.emoji}
                  </motion.div>


                  <p
                    className="
                      text-sm
                      uppercase
                      tracking-[0.3em]
                      text-purple-300
                      font-bold
                    "
                  >
                    {slide.eyebrow}
                  </p>


                  <p
                    className="
                      text-gray-400
                      mt-5
                      uppercase
                      tracking-widest
                      text-xs
                    "
                  >
                    You were...
                  </p>


                  <h1
                    className="
                      text-5xl
                      md:text-7xl
                      font-black
                      text-purple-300
                      mt-3
                    "
                  >
                    {slide.title}
                  </h1>


                  <div
                    className="
                      mt-8
                      mx-auto
                      max-w-md
                      p-6
                      rounded-3xl
                      bg-purple-400/10
                      border
                      border-purple-300/20
                    "
                  >

                    <div
                      className="
                        text-gray-400
                        text-sm
                      "
                    >
                      YOUR INSTAGRAM PERSONALITY
                    </div>

                    <div
                      className="
                        text-2xl
                        font-black
                        mt-2
                      "
                    >
                      {slide.value}
                    </div>

                  </div>


                  <p
                    className="
                      text-gray-500
                      mt-7
                    "
                  >
                    {slide.description}
                  </p>

                </div>

              )}


              {/* =====================================================
                  FINAL
                  ===================================================== */}

              {slide.type === "final" && (

                <div>

                  <motion.div
                    animate={{
                      scale: [1, 1.15, 1],
                      rotate: [0, 8, -8, 0]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 1
                    }}
                    className="
                      text-8xl
                      md:text-[140px]
                      mb-8
                    "
                  >
                    {slide.emoji}
                  </motion.div>


                  <p
                    className="
                      text-sm
                      uppercase
                      tracking-[0.35em]
                      text-lime-300
                      font-bold
                    "
                  >
                    {slide.eyebrow}
                  </p>


                  <h1
                    className="
                      text-5xl
                      md:text-7xl
                      font-black
                      mt-6
                    "
                  >
                    {slide.title}
                  </h1>


                  <div
                    className="
                      text-7xl
                      md:text-[120px]
                      font-black
                      text-lime-300
                      mt-6
                    "
                  >
                    {slide.value}
                  </div>


                  <p
                    className="
                      text-gray-400
                      text-lg
                      mt-7
                      max-w-lg
                      mx-auto
                    "
                  >
                    {slide.description}
                  </p>


                  <button
                    onClick={onClose}
                    className="
                      mt-10
                      px-8
                      py-4
                      rounded-full
                      bg-lime-300
                      text-black
                      font-black
                      hover:scale-105
                      transition
                    "
                  >
                    Back to Dashboard
                  </button>

                </div>

              )}

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


          <div
            className="
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
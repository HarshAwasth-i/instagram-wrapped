import {
  useContext,
  useEffect,
  useState
} from "react";

import {
  useNavigate
} from "react-router-dom";

import {
  InstagramContext
} from "../context/InstagramContext";

import {
  analyzeInstagramData
} from "../utils/dataAnalyzer";

import CategoryTabs
  from "../components/dashboard/CategoryTabs";

import MessageStats
  from "../components/dashboard/MessageStats";

import MessageHighlights
  from "../components/dashboard/MessageHighlights";

import MessageActivity
  from "../components/dashboard/MessageActivity";

import LikesSection
  from "../components/dashboard/LikesSection";

import ContentSection
  from "../components/dashboard/ContentSection";

import ConnectionsSection
  from "../components/sections/ConnectionsSection";

import PersonalitySection
  from "../components/sections/PersonalitySection";

import TopFriends
  from "../components/dashboard/TopFriends";

import WrappedStories
  from "../components/wrapped/WrappedStories";

import Background
  from "../components/layout/Background";

import {
  demoAnalytics
} from "../utils/demoData";


function Dashboard() {

  const {
    analytics,
    setAnalytics,
    instagramData,
    selectedYear,
    setSelectedYear
  } = useContext(
    InstagramContext
  );

  const navigate =
    useNavigate();

  const [
    showWrapped,
    setShowWrapped
  ] = useState(false);

  const [
    activeTab,
    setActiveTab
  ] = useState("Messages");


  // =========================
  // FIND AVAILABLE YEARS
  // =========================

  const years =
    new Set<number>();

  if (instagramData) {

    // -------------------------
    // LIKES
    // -------------------------

    instagramData.likes?.forEach(
      (file: any) => {

        if (!Array.isArray(file)) {
          return;
        }

        file.forEach(
          (like: any) => {

            if (!like.timestamp) {
              return;
            }

            const year =
              new Date(
                like.timestamp * 1000
              ).getFullYear();

            years.add(year);

          }
        );

      }
    );


    // -------------------------
    // MESSAGES
    // -------------------------

    instagramData.messages?.forEach(
      (chat: any) => {

        if (!chat.messages) {
          return;
        }

        chat.messages.forEach(
          (message: any) => {

            if (!message.timestamp_ms) {
              return;
            }

            const year =
              new Date(
                message.timestamp_ms
              ).getFullYear();

            years.add(year);

          }
        );

      }
    );


    // -------------------------
    // POSTS
    // -------------------------

    instagramData.posts?.forEach(
      (file: any) => {

        if (!Array.isArray(file)) {
          return;
        }

        file.forEach(
          (post: any) => {

            if (!post.timestamp) {
              return;
            }

            const year =
              new Date(
                post.timestamp * 1000
              ).getFullYear();

            years.add(year);

          }
        );

      }
    );


    // -------------------------
    // STORIES
    // -------------------------

    instagramData.stories?.forEach(
      (file: any) => {

        if (
          !file.ig_stories ||
          !Array.isArray(
            file.ig_stories
          )
        ) {
          return;
        }

        file.ig_stories.forEach(
          (story: any) => {

            if (
              !story.creation_timestamp
            ) {
              return;
            }

            const year =
              new Date(
                story.creation_timestamp *
                  1000
              ).getFullYear();

            years.add(year);

          }
        );

      }
    );

  }


  // =========================
  // SORT YEARS
  // =========================

  const availableYears =
    Array.from(years).sort(
      (a, b) => b - a
    );


  // =========================
  // RESTORE / DEFAULT YEAR
  // =========================

  useEffect(() => {

    if (
      availableYears.length === 0
    ) {
      return;
    }

    // No saved year
    if (
      selectedYear === null
    ) {

      setSelectedYear(
        availableYears[0]
      );

      return;
    }

    // Saved year no longer exists
    if (
      !availableYears.includes(
        selectedYear
      )
    ) {

      setSelectedYear(
        availableYears[0]
      );

    }

  }, [
    selectedYear,
    availableYears.length
  ]);


  // =========================
  // CHANGE YEAR
  // =========================

  function handleYearChange(
    year: number
  ) {

    setSelectedYear(year);

    if (!instagramData) {
      return;
    }

    const yearAnalytics =
      analyzeInstagramData(
        instagramData,
        year
      );

    setAnalytics(
      yearAnalytics
    );

  }


  // =========================
  // SHARE
  // =========================

  async function handleShare() {

    try {

      if (
        navigator.share
      ) {

        await navigator.share({
          title:
            "My Instagram Wrapped",
          text:
            `My Instagram Wrapped ${selectedYear || ""}`,
          url:
            window.location.href
        });

      } else {

        await navigator.clipboard.writeText(
          window.location.href
        );

        alert(
          "Link copied to clipboard!"
        );

      }

    } catch {
      // User cancelled share.
      // No action needed.
    }

  }


  // =========================
  // NO DATA
  // =========================

  if (!analytics) {

    return (
      <Background className="flex items-center justify-center min-h-screen px-4">

        <div
          className="
            text-center
            bg-white/[0.03]
            backdrop-blur-xl
            border
            border-white/10
            rounded-3xl
            p-10
            md:p-14
            max-w-lg
            shadow-2xl
          "
        >

          <div
            className="
              text-6xl
              mb-6
            "
          >
            📂
          </div>

          <h1
            className="
              text-3xl
              md:text-4xl
              font-black
              text-white
              mb-3
            "
          >
            No data yet
          </h1>

          <p
            className="
              text-gray-400
              text-base
              md:text-lg
              mb-8
            "
          >
            Upload your Instagram data export to see your personalized year in review, or preview with sample data right now.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">

            <button
              onClick={() =>
                navigate("/")
              }
              className="
                px-6
                py-3.5
                rounded-xl
                bg-white/[0.05]
                border
                border-white/15
                text-white
                font-bold
                text-sm
                backdrop-blur-md
                hover:bg-white/[0.1]
                hover:border-white/30
                transition-all
                cursor-pointer
              "
            >
              ← Go Home & Upload
            </button>

            <button
              onClick={() => {
                setAnalytics(demoAnalytics);
                setSelectedYear(2026);
              }}
              className="
                px-6
                py-3.5
                rounded-xl
                bg-lime-400/18
                border
                border-lime-400/50
                text-lime-300
                font-bold
                text-sm
                backdrop-blur-md
                hover:bg-lime-400/28
                hover:border-lime-300
                hover:shadow-[0_0_25px_rgba(190,242,100,0.22)]
                transition-all
                cursor-pointer
              "
            >
              ⚡ Try Sample Demo
            </button>

          </div>

        </div>

      </Background>
    );

  }


  // =========================
  // DASHBOARD
  // =========================

  return (
    <Background className="min-h-screen">

      {/* =========================
          TOP HEADER
          ========================= */}

      <header
        className="
          border-b
          border-white/10
          px-5
          md:px-8
          py-3
          flex
          items-center
          justify-between
          gap-4
        "
      >

        {/* LOGO */}

        <div
          onClick={() => navigate("/")}
          className="
            flex
            items-center
            gap-3
            cursor-pointer
            group
          "
        >

          <div
            className="
              w-8
              h-8
              md:w-9
              md:h-9
              rounded-lg
              bg-lime-400/20
              border
              border-lime-400/50
              text-lime-300
              flex
              items-center
              justify-center
              font-black
              text-lg
              backdrop-blur-md
              group-hover:shadow-[0_0_15px_rgba(190,242,100,0.3)]
              transition-all
            "
          >
            I
          </div>

          <div
            className="
              leading-none
            "
          >

            <div
              className="
                text-sm
                md:text-base
                font-black
                tracking-wider
              "
            >
              INSTAGRAM
            </div>

            <div
              className="
                text-[9px]
                md:text-[10px]
                text-gray-500
                tracking-[0.3em]
                mt-1
              "
            >
              WRAPPED
            </div>

          </div>

        </div>


        {/* YEARS + UPLOAD NEW + SHARE */}

        <div
          className="
            flex
            items-center
            gap-1.5
            md:gap-2
            overflow-x-auto
          "
        >

          <span
            className="
              hidden
              md:block
              text-[10px]
              text-gray-500
              tracking-widest
              mr-1
            "
          >
            YEAR
          </span>

          {availableYears.map(
            (year) => (

              <button
                key={year}
                onClick={() =>
                  handleYearChange(
                    year
                  )
                }
                className={`
                  px-3
                  md:px-4
                  py-2
                  rounded-lg
                  font-bold
                  text-xs
                  md:text-sm
                  border
                  backdrop-blur-md
                  transition-all
                  duration-200
                  whitespace-nowrap
                  cursor-pointer

                  ${
                    selectedYear === year
                      ? `
                        bg-lime-400/20
                        text-lime-300
                        border-lime-400/60
                        shadow-[0_0_20px_rgba(190,242,100,0.22)]
                      `
                      : `
                        bg-white/[0.03]
                        text-gray-400
                        border-white/10
                        hover:bg-white/[0.08]
                        hover:border-white/20
                        hover:text-white
                      `
                  }
                `}
              >
                {year}
              </button>

            )
          )}

          <button
            onClick={() => navigate("/")}
            className="
              ml-1
              px-3
              md:px-4
              py-2
              rounded-lg
              border
              border-white/10
              bg-white/[0.03]
              text-gray-300
              text-xs
              md:text-sm
              font-bold
              backdrop-blur-md
              hover:bg-white/[0.08]
              hover:text-white
              hover:border-white/20
              transition-all
              whitespace-nowrap
              cursor-pointer
            "
          >
            ← Upload New
          </button>

          <button
            onClick={handleShare}
            className="
              px-3
              md:px-4
              py-2
              rounded-lg
              border
              border-white/15
              bg-white/[0.05]
              text-gray-200
              text-xs
              md:text-sm
              font-bold
              backdrop-blur-md
              hover:bg-white/[0.1]
              hover:text-white
              hover:border-white/30
              transition-all
              whitespace-nowrap
              cursor-pointer
              active:scale-95
            "
          >
            ↑ Share
          </button>

        </div>

      </header>


      {/* =========================
          HERO
          ========================= */}

      <section
        className="
          relative
          overflow-hidden
          px-5
          pt-8
          md:pt-10
          pb-5
          md:pb-6
          text-center
        "
      >

        {/* SUBTLE GLOW */}

        <div
          className="
            absolute
            top-0
            left-1/2
            -translate-x-1/2
            w-[500px]
            h-[250px]
            bg-lime-300/[0.04]
            blur-[100px]
            pointer-events-none
          "
        />

        <div
          className="
            relative
          "
        >

          <p
            className="
              text-lime-300
              uppercase
              tracking-[0.3em]
              text-[11px]
              md:text-xs
              font-black
              mb-3
            "
          >
            YOUR INSTAGRAM
          </p>

          <h1
            className="
              text-5xl
              md:text-6xl
              lg:text-7xl
              font-black
              tracking-tight
              leading-none
            "
          >
            WRAPPED
          </h1>

          <div
            className="
              text-3xl
              md:text-4xl
              font-bold
              text-[#d8cfb5]
              mt-2
            "
          >
            {selectedYear ||
              "YOUR YEAR"}
          </div>

          <p
            className="
              text-gray-500
              mt-2
              text-sm
              md:text-base
            "
          >
            A year of messages,
            likes, stories and
            everything in between.
          </p>

          <button
            onClick={() =>
              setShowWrapped(true)
            }
            className="
              mt-5
              px-8
              py-3.5
              rounded-full
              bg-lime-400/18
              border
              border-lime-400/50
              text-lime-300
              font-black
              text-sm
              md:text-base
              backdrop-blur-xl
              hover:scale-105
              hover:bg-lime-400/28
              hover:border-lime-300
              hover:shadow-[0_0_35px_rgba(190,242,100,0.32)]
              active:scale-95
              transition-all
              duration-300
              cursor-pointer
            "
          >
            ✨ View Your Wrapped
          </button>

        </div>

      </section>


      {/* =========================
          MAIN DASHBOARD
          ========================= */}

      <main
        className="
          w-full
          max-w-[1500px]
          mx-auto
          px-4
          md:px-6
          pb-16
        "
      >

        {/* =========================
            CATEGORY TABS
            ========================= */}

        <div
          className="
            rounded-xl
            border
            border-white/10
            bg-white/[0.02]
            p-1
            md:p-1.5
          "
        >

          <CategoryTabs
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />

        </div>


        {/* =========================
            CONTENT
            ========================= */}

        <div
          className="
            mt-4
            md:mt-5
          "
        >

          {/* =========================
              MESSAGES
              ========================= */}

          {activeTab ===
            "Messages" && (
            <>

              <div
                className="
                  text-center
                  mb-6
                  md:mb-8
                "
              >

                <p
                  className="
                    text-[10px]
                    md:text-xs
                    text-gray-600
                    uppercase
                    tracking-[0.3em]
                    mb-2
                  "
                >
                  YOUR SOCIAL LIFE
                </p>

                <h2
                  className="
                    text-3xl
                    md:text-4xl
                    font-black
                  "
                >
                  💬 Messages
                </h2>

                <p
                  className="
                    text-gray-500
                    text-sm
                    mt-2
                  "
                >
                  Your {selectedYear} in DMs
                </p>

              </div>

              <div
                className="
                  space-y-6
                  md:space-y-8
                "
              >

                <MessageStats />

                <MessageHighlights />

                <MessageActivity />

                <TopFriends />

              </div>

            </>
          )}


          {/* =========================
              LIKES
              ========================= */}

          {activeTab ===
            "Likes" && (
            <LikesSection />
          )}


          {/* =========================
              CONTENT
              ========================= */}

          {activeTab ===
            "Content" && (
            <ContentSection />
          )}


          {/* =========================
              CONNECTIONS
              ========================= */}

          {activeTab ===
            "Connections" && (
            <ConnectionsSection />
          )}


          {/* =========================
              PERSONALITY
              ========================= */}

          {activeTab ===
            "Personality" && (
            <PersonalitySection />
          )}

        </div>

      </main>


      {/* =========================
          WRAPPED STORIES
          ========================= */}

      {showWrapped && (
        <WrappedStories
          onClose={() =>
            setShowWrapped(false)
          }
        />
      )}

    </Background>
  );
}

export default Dashboard;
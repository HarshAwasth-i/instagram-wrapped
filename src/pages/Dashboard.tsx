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

      <div
        className="
          min-h-screen
          bg-black
          text-white
          flex
          items-center
          justify-center
        "
      >

        <div
          className="
            text-center
            bg-white/5
            border
            border-white/10
            rounded-3xl
            p-16
            max-w-lg
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
              font-bold
              text-white
              mb-4
            "
          >
            No data yet
          </h1>


          <p
            className="
              text-gray-400
              text-lg
              mb-10
            "
          >
            Upload your Instagram
            data export to see your
            year in review.
          </p>


          <button
            onClick={() =>
              navigate("/")
            }
            className="
              bg-lime-300
              text-black
              font-bold
              px-10
              py-4
              rounded-xl
              hover:bg-lime-200
              transition
              text-lg
            "
          >
            ← Go Home & Upload
          </button>

        </div>

      </div>

    );

  }


  // =========================
  // DASHBOARD
  // =========================

  return (

    <div
      className="
        min-h-screen
        bg-black
        text-white
        pb-20
      "
    >


      {/* =========================
          TOP HEADER
          ========================= */}

      <header
        className="
          w-full
          px-6
          md:px-8
          py-6
          flex
          flex-col
          md:flex-row
          md:items-start
          md:justify-between
          gap-6
        "
      >


        {/* LOGO */}

        <div
          className="
            text-lime-300
            text-3xl
            md:text-4xl
            font-black
            leading-[0.9]
            tracking-tight
          "
        >

          <div>
            INSTAGRAM
          </div>

          <div>
            WRAPPED
          </div>

        </div>


        {/* =========================
            YEARS + SHARE
            ========================= */}

        <div
          className="
            flex
            flex-wrap
            items-center
            justify-end
            gap-2
            md:max-w-[70%]
          "
        >


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
                  min-w-[64px]
                  px-4
                  py-3
                  rounded-md
                  font-bold
                  text-sm
                  border
                  transition-all
                  duration-200

                  ${
                    selectedYear === year
                      ? `
                        bg-lime-300
                        text-black
                        border-lime-300
                        shadow-lg
                      `
                      : `
                        bg-white/5
                        text-gray-300
                        border-white/15
                        hover:bg-white/10
                        hover:border-white/30
                      `
                  }
                `}
              >

                {year}

              </button>

            )
          )}


          {/* SHARE */}

          <button
            onClick={handleShare}
            className="
              px-5
              py-3
              rounded-md
              border
              border-white/20
              text-white
              text-sm
              font-bold
              hover:bg-white/10
              transition
              whitespace-nowrap
            "
          >
            ↑ SHARE
          </button>

        </div>

      </header>


      {/* =========================
          WRAPPED HERO
          ========================= */}

      <div
        className="
          text-center
          px-6
          mt-12
          mb-10
        "
      >

        <p
          className="
            text-lime-300
            uppercase
            tracking-[0.3em]
            text-sm
            font-bold
            mb-4
          "
        >
          YOUR INSTAGRAM
        </p>


        <h1
          className="
            text-6xl
            md:text-8xl
            font-black
            tracking-tight
          "
        >
          WRAPPED
        </h1>


        <div
          className="
            text-4xl
            md:text-5xl
            font-bold
            text-[#d8cfb5]
            mt-3
          "
        >
          {selectedYear ||
            "YOUR YEAR"}
        </div>


        <p
          className="
            text-gray-400
            mt-5
            text-lg
          "
        >
          A year of messages,
          likes, stories & chaos.
        </p>


        <button
          onClick={() =>
            setShowWrapped(true)
          }
          className="
            mt-8
            px-8
            py-4
            rounded-full
            bg-lime-300
            text-black
            font-black
            text-lg
            hover:scale-105
            transition
            shadow-lg
          "
        >
          ✨ View Your Wrapped
        </button>

      </div>


      {/* =========================
          CATEGORY TABS
          ========================= */}

      <CategoryTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />


      {/* =========================
          CONTENT
          ========================= */}

      <div
        className="
          px-6
          md:px-10
          mt-10
          pb-20
        "
      >


        {/* MESSAGES */}

        {activeTab ===
          "Messages" && (

          <>

            <h2
              className="
                text-4xl
                font-bold
                text-center
              "
            >
              💬 Messages
            </h2>


            <MessageStats />

            <MessageHighlights />

            <MessageActivity />

            <TopFriends />

          </>

        )}


        {/* LIKES */}

        {activeTab ===
          "Likes" && (

          <LikesSection />

        )}


        {/* CONTENT */}

        {activeTab ===
          "Content" && (

          <ContentSection />

        )}


        {/* CONNECTIONS */}

        {activeTab ===
          "Connections" && (

          <ConnectionsSection />

        )}


        {/* PERSONALITY */}

        {activeTab ===
          "Personality" && (

          <PersonalitySection />

        )}

      </div>


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

    </div>

  );

}


export default Dashboard;
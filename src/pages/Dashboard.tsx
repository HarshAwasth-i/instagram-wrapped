import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { InstagramContext } from "../context/InstagramContext";

import { analyzeInstagramData } from "../utils/dataAnalyzer";

import DashboardHeader from "../components/dashboard/DashboardHeader";
import CategoryTabs from "../components/dashboard/CategoryTabs";

import MessageStats from "../components/dashboard/MessageStats";
import MessageHighlights from "../components/dashboard/MessageHighlights";
import MessageActivity from "../components/dashboard/MessageActivity";

import LikesSection from "../components/dashboard/LikesSection";
import ContentSection from "../components/dashboard/ContentSection";
import ConnectionsSection from "../components/sections/ConnectionsSection";
import PersonalitySection from "../components/sections/PersonalitySection";
import TopFriends from "../components/dashboard/TopFriends";
import WrappedStories from "../components/wrapped/WrappedStories";

function Dashboard() {

  const {
    analytics,
    setAnalytics,
    instagramData,
    selectedYear,
    setSelectedYear
  } = useContext(InstagramContext);

  const navigate = useNavigate();

  const [activeTab, setActiveTab] =
    useState("Messages");


  // =========================
  // FIND AVAILABLE YEARS
  // =========================

  const years = new Set<number>();


  if (instagramData) {

    // -------------------------
    // LIKES
    // -------------------------

    instagramData.likes?.forEach((file: any) => {

      if (!Array.isArray(file)) return;

      file.forEach((like: any) => {

        if (like.timestamp) {

          const year =
            new Date(
              like.timestamp * 1000
            ).getFullYear();

          years.add(year);

        }

      });

    });


    // -------------------------
    // MESSAGES
    // -------------------------

    instagramData.messages?.forEach((chat: any) => {

      if (!chat.messages) return;

      chat.messages.forEach((message: any) => {

        if (message.timestamp_ms) {

          const year =
            new Date(
              message.timestamp_ms
            ).getFullYear();

          years.add(year);

        }

      });

    });


    // -------------------------
    // POSTS
    // -------------------------

    instagramData.posts?.forEach((file: any) => {

      if (!Array.isArray(file)) return;

      file.forEach((post: any) => {

        if (post.timestamp) {

          const year =
            new Date(
              post.timestamp * 1000
            ).getFullYear();

          years.add(year);

        }

      });

    });


    // -------------------------
    // STORIES
    // -------------------------

    instagramData.stories?.forEach((file: any) => {

      if (
        !file.ig_stories ||
        !Array.isArray(file.ig_stories)
      ) {
        return;
      }

      file.ig_stories.forEach((story: any) => {

        if (story.creation_timestamp) {

          const year =
            new Date(
              story.creation_timestamp * 1000
            ).getFullYear();

          years.add(year);

        }

      });

    });

  }


  const availableYears =
    Array.from(years).sort(
      (a, b) => b - a
    );


  // =========================
  // DEFAULT YEAR
  // =========================

  useEffect(() => {

    if (
      selectedYear === null &&
      availableYears.length > 0
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


    if (!instagramData) return;


    const yearAnalytics =
      analyzeInstagramData(
        instagramData,
        year
      );


    setAnalytics(yearAnalytics);

  }


  // =========================
  // NO DATA
  // =========================

  if (!analytics) {

    return (

      <div className="
        min-h-screen
        bg-black
        text-white
        flex
        items-center
        justify-center
      ">

        <div className="
          text-center
          bg-white/5
          border
          border-white/10
          rounded-3xl
          p-16
          max-w-lg
        ">

          <div className="text-6xl mb-6">
            📂
          </div>

          <h1 className="
            text-3xl
            font-bold
            text-white
            mb-4
          ">
            No data yet
          </h1>

          <p className="
            text-gray-400
            text-lg
            mb-10
          ">
            Upload your Instagram data export to see your year in review.
          </p>

          <button
            onClick={() => navigate("/")}
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


  return (

    <div className="
      min-h-screen
      bg-black
      text-white
      pb-20
    ">


      <DashboardHeader/>


      {/* =========================
          WRAPPED HERO
          ========================= */}

      <div className="
        text-center
        px-6
        mt-12
        mb-10
      ">

        <p className="
          text-lime-300
          uppercase
          tracking-[0.3em]
          text-sm
          font-bold
          mb-4
        ">
          YOUR INSTAGRAM
        </p>


        <h1 className="
          text-6xl
          md:text-8xl
          font-black
          tracking-tight
        ">
          WRAPPED
        </h1>


        <div className="
          text-4xl
          md:text-5xl
          font-bold
          text-[#d8cfb5]
          mt-3
        ">
          {selectedYear || "YOUR YEAR"}
        </div>


        <p className="
          text-gray-400
          mt-5
          text-lg
        ">
          A year of messages, likes, stories & chaos.
        </p>

      </div>


      {/* =========================
          YEAR SELECTOR
          ========================= */}

      {
        availableYears.length > 0 && (

          <div className="
            flex
            justify-center
            items-center
            gap-3
            flex-wrap
            px-6
            mt-8
          ">

            {
              availableYears.map(
                (year) => (

                  <button

                    key={year}

                    onClick={() =>
                      handleYearChange(year)
                    }

                    className={`
                      px-6
                      py-3
                      rounded-full
                      font-bold
                      transition
                      border
                      ${
                        selectedYear === year
                          ? `
                            bg-[#c8ff00]
                            text-black
                            border-[#c8ff00]
                          `
                          : `
                            bg-white/5
                            text-gray-300
                            border-white/10
                            hover:bg-white/10
                          `
                      }
                    `}

                  >

                    {year}

                  </button>

                )
              )
            }

          </div>

        )
      }


      <CategoryTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />


      <div className="
        px-10
        mt-10
        pb-20
      ">


        {
          activeTab === "Messages" && (

            <>

              <h2 className="
                text-4xl
                font-bold
                text-center
              ">

                💬 Messages

              </h2>


              <MessageStats/>

              <MessageHighlights/>

              <MessageActivity/>

              <TopFriends/>

            </>

          )
        }


        {
          activeTab === "Likes" && (

            <LikesSection/>

          )
        }


        {
          activeTab === "Content" && (

            <ContentSection/>

          )
        }


        {
          activeTab === "Connections" && (

            <ConnectionsSection/>

          )
        }


        {
          activeTab === "Personality" && (

            <PersonalitySection/>

          )
        }


      </div>


    </div>

  );

}


export default Dashboard;
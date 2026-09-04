import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { InstagramContext } from "../context/InstagramContext";

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


function Dashboard(){

  const { analytics } = useContext(InstagramContext);
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("Messages");



  if(!analytics){

    return(

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

          <div className="text-6xl mb-6">📂</div>

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



  return(


    <div className="
      min-h-screen
      bg-black
      text-white
      pb-20
    ">


      <DashboardHeader/>


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
          activeTab==="Messages" && (

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
          activeTab==="Likes" && (

            <LikesSection/>

          )
        }



        {
          activeTab==="Content" && (

            <ContentSection/>

          )
        }



        {
          activeTab==="Connections" && (

            <ConnectionsSection/>

          )
        }



        {
          activeTab==="Personality" && (

            <PersonalitySection/>

          )
        }


      </div>


    </div>


  );


}


export default Dashboard;
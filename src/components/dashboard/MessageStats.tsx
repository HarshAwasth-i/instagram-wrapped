import { useContext } from "react";
import { InstagramContext } from "../../context/InstagramContext";


function MessageStats() {

  const { analytics, selectedYear } =
    useContext(InstagramContext);


  if (!analytics) {
    return null;
  }


  const stats = [

    {
      title: "Total Messages",
      value: analytics.messagesCount,
      emoji: "💬"
    },

    {
      title: "Sent",
      value: analytics.sentMessages,
      emoji: "✈️"
    },

    {
      title: "Received",
      value: analytics.receivedMessages,
      emoji: "📥"
    },

    {
      title: "Conversations",
      value: analytics.conversationCount,
      emoji: "👥"
    }

  ];


  return (

    <div className="mt-10">


      {/* =========================
          SECTION INTRO
          ========================= */}

      <div className="
        text-center
        mb-10
      ">

        <p className="
          text-lime-300
          uppercase
          tracking-[0.25em]
          text-sm
          font-bold
          mb-3
        ">
          YOUR {selectedYear || ""} IN DMS
        </p>


        <h3 className="
          text-3xl
          md:text-4xl
          font-black
        ">
          You had a lot to say.
        </h3>


        <p className="
          text-gray-400
          mt-3
          text-lg
        ">
          Here's what your conversations looked like.
        </p>

      </div>


      {/* =========================
          STATS
          ========================= */}

      <div className="
        grid
        grid-cols-1
        md:grid-cols-2
        lg:grid-cols-4
        gap-6
      ">


        {
          stats.map((item) => (

            <div
              key={item.title}
              className="
                group
                bg-white/5
                border
                border-white/10
                rounded-3xl
                p-8
                transition-all
                duration-300
                hover:bg-white/10
                hover:border-lime-300/30
                hover:-translate-y-1
              "
            >


              <div className="
                flex
                items-center
                justify-between
                mb-6
              ">

                <div className="text-4xl">
                  {item.emoji}
                </div>


                <div className="
                  w-2
                  h-2
                  rounded-full
                  bg-lime-300
                  opacity-60
                " />

              </div>


              <h4 className="
                text-sm
                uppercase
                tracking-wider
                text-gray-400
                font-bold
                mb-3
              ">
                {item.title}
              </h4>


              <p className="
                text-4xl
                md:text-5xl
                font-black
                text-lime-300
              ">
                {item.value.toLocaleString()}
              </p>


            </div>

          ))
        }


      </div>


    </div>

  );

}


export default MessageStats;
import { useContext } from "react";
import { InstagramContext } from "../../context/InstagramContext";


function MessageHighlights() {

  const { analytics, selectedYear } =
    useContext(InstagramContext);


  if (!analytics) {
    return null;
  }


  const first = analytics.firstMessage;
  const last = analytics.lastMessage;


  function formatDate(date: any) {

    if (!date) return "";

    return new Date(date).toLocaleDateString(
      undefined,
      {
        day: "numeric",
        month: "short",
        year: "numeric"
      }
    );

  }


  return (

    <div className="mt-16">


      {/* =========================
          SECTION TITLE
          ========================= */}

      <div className="
        text-center
        mb-10
      ">

        <p className="
          text-[#d8cfb5]
          uppercase
          tracking-[0.25em]
          text-sm
          font-bold
          mb-3
        ">
          YOUR {selectedYear || ""} CONVERSATION
        </p>


        <h3 className="
          text-3xl
          md:text-4xl
          font-black
        ">
          Every year has a beginning & an ending.
        </h3>

      </div>


      {/* =========================
          MESSAGE CARDS
          ========================= */}

      <div className="
        grid
        grid-cols-1
        lg:grid-cols-2
        gap-8
      ">


        {/* FIRST MESSAGE */}

        <div className="
          relative
          overflow-hidden
          bg-gradient-to-br
          from-lime-300/10
          to-transparent
          border
          border-lime-300/30
          rounded-3xl
          p-8
          md:p-10
        ">

          <div className="
            absolute
            -right-8
            -top-8
            text-8xl
            opacity-10
          ">
            🌅
          </div>


          <p className="
            text-lime-300
            text-sm
            uppercase
            tracking-[0.2em]
            font-bold
            mb-6
          ">
            FIRST MESSAGE OF THE YEAR
          </p>


          <div className="
            text-5xl
            mb-6
          ">
            💬
          </div>


          <p className="
            text-2xl
            md:text-3xl
            font-bold
            leading-relaxed
            break-words
          ">
            "{first?.text || "No message found"}"
          </p>


          <div className="
            mt-8
            pt-6
            border-t
            border-white/10
          ">

            <p className="
              text-gray-400
              text-sm
              uppercase
              tracking-wider
            ">
              You were talking to
            </p>


            <p className="
              text-lg
              font-bold
              text-white
              mt-1
              break-words
            ">
              {first?.friend || "Unknown"}
            </p>


            <p className="
              text-gray-500
              mt-2
            ">
              {formatDate(first?.date)}
            </p>

          </div>

        </div>


        {/* LAST MESSAGE */}

        <div className="
          relative
          overflow-hidden
          bg-gradient-to-br
          from-yellow-300/10
          to-transparent
          border
          border-yellow-300/30
          rounded-3xl
          p-8
          md:p-10
        ">

          <div className="
            absolute
            -right-8
            -top-8
            text-8xl
            opacity-10
          ">
            🌙
          </div>


          <p className="
            text-yellow-300
            text-sm
            uppercase
            tracking-[0.2em]
            font-bold
            mb-6
          ">
            LAST MESSAGE OF THE YEAR
          </p>


          <div className="
            text-5xl
            mb-6
          ">
            📨
          </div>


          <p className="
            text-2xl
            md:text-3xl
            font-bold
            leading-relaxed
            break-words
          ">
            "{last?.text || "No message found"}"
          </p>


          <div className="
            mt-8
            pt-6
            border-t
            border-white/10
          ">

            <p className="
              text-gray-400
              text-sm
              uppercase
              tracking-wider
            ">
              You were talking to
            </p>


            <p className="
              text-lg
              font-bold
              text-white
              mt-1
              break-words
            ">
              {last?.friend || "Unknown"}
            </p>


            <p className="
              text-gray-500
              mt-2
            ">
              {formatDate(last?.date)}
            </p>

          </div>

        </div>


      </div>

    </div>

  );

}


export default MessageHighlights;
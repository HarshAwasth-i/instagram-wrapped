import { useContext } from "react";
import { InstagramContext } from "../../context/InstagramContext";

function PersonalitySection() {
  const {
    analytics,
    selectedYear
  } = useContext(InstagramContext);

  if (!analytics) {
    return null;
  }

  const personalities = [
    {
      title: "Social Builder",
      emoji: "🧱",
      description: "Maintains many active conversations",
      condition: analytics.messagesCount > 10000,
      color: "from-lime-300/10",
      border: "border-lime-300/30",
      text: "text-lime-300"
    },
    {
      title: "Like Machine",
      emoji: "❤️",
      description: "Shows love across Instagram",
      condition: analytics.likesGiven > 20000,
      color: "from-red-400/10",
      border: "border-red-400/30",
      text: "text-red-400"
    },
    {
      title: "Silent Observer",
      emoji: "👀",
      description: "Likes more than talks",
      condition:
        analytics.likesGiven >
        analytics.sentMessages,
      color: "from-yellow-300/10",
      border: "border-yellow-300/30",
      text: "text-yellow-300"
    },
    {
      title: "Ghost Poster",
      emoji: "👻",
      description: "Rarely posts but always online",
      condition: analytics.postsCount < 5,
      color: "from-purple-400/10",
      border: "border-purple-400/30",
      text: "text-purple-300"
    },
    {
      title: "Loyal Friend",
      emoji: "💕",
      description: "Has a bestie they message constantly",
      condition: analytics.topFriend,
      color: "from-pink-400/10",
      border: "border-pink-400/30",
      text: "text-pink-300"
    }
  ];

  const activePersonalities =
    personalities.filter(
      (item) => item.condition
    );

  return (
    <div className="space-y-16 pb-20">

      {/* HERO */}

      <div
        className="
          relative
          overflow-hidden
          bg-gradient-to-br
          from-purple-400/10
          via-white/5
          to-lime-300/10
          border
          border-white/10
          rounded-3xl
          p-10
          md:p-16
          text-center
        "
      >
        <div
          className="
            absolute
            -right-10
            -top-10
            text-[150px]
            opacity-5
          "
        >
          🧠
        </div>

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
          YOUR {selectedYear || ""} PERSONALITY
        </p>

        <h1
          className="
            text-4xl
            md:text-6xl
            font-black
          "
        >
          This was your Instagram era.
        </h1>

        <p
          className="
            text-gray-400
            mt-5
            text-lg
          "
        >
          Based on what you did, liked, posted and talked about.
        </p>
      </div>


      {/* PERSONALITY CARDS */}

      {activePersonalities.length > 0 ? (
        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            gap-6
          "
        >
          {activePersonalities.map(
            (item, index) => (
              <div
                key={item.title}
                className={`
                  relative
                  overflow-hidden
                  bg-gradient-to-br
                  ${item.color}
                  to-transparent
                  border
                  ${item.border}
                  rounded-3xl
                  p-8
                  md:p-10
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:bg-white/10
                `}
              >

                {/* BACKGROUND EMOJI */}

                <div
                  className="
                    absolute
                    -right-5
                    -top-5
                    text-8xl
                    opacity-5
                  "
                >
                  {item.emoji}
                </div>


                {/* NUMBER */}

                <div
                  className={`
                    text-xs
                    uppercase
                    tracking-[0.2em]
                    font-bold
                    ${item.text}
                  `}
                >
                  PERSONALITY #{index + 1}
                </div>


                {/* EMOJI */}

                <div className="text-6xl mt-6">
                  {item.emoji}
                </div>


                {/* TITLE */}

                <h2
                  className={`
                    text-3xl
                    md:text-4xl
                    font-black
                    mt-6
                    ${item.text}
                  `}
                >
                  {item.title}
                </h2>


                {/* STARS */}

                <div
                  className="
                    text-yellow-300
                    text-xl
                    tracking-widest
                    mt-4
                  "
                >
                  ★★★★★
                </div>


                {/* DESCRIPTION */}

                <p
                  className="
                    text-gray-300
                    text-lg
                    mt-5
                    leading-relaxed
                  "
                >
                  {item.description}
                </p>

              </div>
            )
          )}
        </div>
      ) : (
        <div
          className="
            bg-white/5
            border
            border-white/10
            rounded-3xl
            p-12
            text-center
          "
        >
          <div className="text-6xl">
            🧠
          </div>

          <h2
            className="
              text-3xl
              font-black
              mt-5
            "
          >
            Still figuring you out...
          </h2>

          <p
            className="
              text-gray-400
              mt-3
              text-lg
            "
          >
            Not enough activity matched one of your personality types.
          </p>
        </div>
      )}


      {/* PERSONALITY FOOTER */}

      <div
        className="
          bg-white/5
          border
          border-white/10
          rounded-3xl
          p-8
          md:p-10
          text-center
        "
      >
        <p
          className="
            text-[#e8dcc0]
            uppercase
            tracking-[0.25em]
            text-sm
            font-bold
          "
        >
          YOUR INSTAGRAM STORY
        </p>

        <p
          className="
            text-gray-400
            mt-4
            text-lg
          "
        >
          {activePersonalities.length} personality
          {activePersonalities.length === 1
            ? ""
            : " traits"} matched your activity in{" "}
          {selectedYear || "this year"}.
        </p>
      </div>

    </div>
  );
}

export default PersonalitySection;
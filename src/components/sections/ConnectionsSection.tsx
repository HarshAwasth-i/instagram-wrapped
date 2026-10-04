import { useContext } from "react";
import { InstagramContext } from "../../context/InstagramContext";

function ConnectionsSection() {
  const { analytics, selectedYear } =
    useContext(InstagramContext);

  if (!analytics) {
    return null;
  }

  const cards = [
    {
      icon: "👥",
      title: "Followers",
      value: analytics.followersCount,
      color: "text-lime-300",
      bg: "bg-lime-300/10",
      border: "border-lime-300/20",
    },
    {
      icon: "📈",
      title: "Following",
      value: analytics.followingCount,
      color: "text-[#e8dcc0]",
      bg: "bg-white/5",
      border: "border-white/10",
    },
    {
      icon: "🤝",
      title: "Mutuals",
      value: analytics.mutualFollowers,
      color: "text-[#e8dcc0]",
      bg: "bg-white/5",
      border: "border-white/10",
    },
    {
      icon: "🚫",
      title: "Not Following Back",
      value: analytics.notFollowingBack,
      color: "text-red-400",
      bg: "bg-red-400/5",
      border: "border-red-400/20",
    },
  ];

  return (
    <div className="space-y-16 pb-20">

      {/* HERO */}

      <div
        className="
          relative
          overflow-hidden
          bg-gradient-to-br
          from-lime-300/10
          via-white/5
          to-yellow-300/10
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
          👥
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
          YOUR INSTAGRAM CONNECTIONS
        </p>

        <h1
          className="
            text-4xl
            md:text-6xl
            font-black
          "
        >
          Your Instagram circle.
        </h1>

        <p
          className="
            text-gray-400
            mt-5
            text-lg
          "
        >
    Your current Instagram connection snapshot.
        </p>
      </div>


      {/* CONNECTION CARDS */}

      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-2
          lg:grid-cols-4
          gap-6
        "
      >
        {cards.map((card) => (
          <div
            key={card.title}
            className={`
              ${card.bg}
              border
              ${card.border}
              rounded-3xl
              p-8
              text-center
              transition-all
              duration-300
              hover:-translate-y-1
              hover:bg-white/10
            `}
          >
            <div className="text-5xl mb-5">
              {card.icon}
            </div>

            <p
              className="
                text-sm
                uppercase
                tracking-wider
                font-bold
                text-gray-400
              "
            >
              {card.title}
            </p>

            <p
              className={`
                text-5xl
                md:text-6xl
                font-black
                mt-4
                ${card.color}
              `}
            >
              {card.value.toLocaleString()}
            </p>
          </div>
        ))}
      </div>


      {/* SEARCH BEHAVIOR */}

      <div
        className="
          bg-white/5
          border
          border-white/10
          rounded-3xl
          p-8
          md:p-10
        "
      >
        <div className="mb-10">
          <p
            className="
              text-lime-300
              text-sm
              uppercase
              tracking-[0.2em]
              font-bold
              mb-3
            "
          >
            YOUR SEARCH HISTORY
          </p>

          <h2
            className="
              text-3xl
              md:text-4xl
              font-black
            "
          >
            What caught your attention?
          </h2>

          <p className="text-gray-400 mt-3">
            A look at the profiles you searched for.
          </p>
        </div>


        <div
          className="
            grid
            grid-cols-1
            lg:grid-cols-2
            gap-8
          "
        >

          {/* TOTAL SEARCHES */}

          <div
            className="
              bg-black/30
              border
              border-white/5
              rounded-2xl
              p-8
            "
          >
            <div className="text-4xl">
              🔍
            </div>

            <p
              className="
                text-gray-400
                text-sm
                uppercase
                tracking-wider
                font-bold
                mt-6
              "
            >
              TOTAL SEARCHES
            </p>

            <p
              className="
                text-5xl
                md:text-6xl
                font-black
                text-lime-300
                mt-3
              "
            >
              {analytics.totalSearches.toLocaleString()}
            </p>

            <p className="text-gray-500 mt-3">
              Searches recorded in your export.
            </p>
          </div>


          {/* TOP SEARCHES */}

          <div
            className="
              bg-black/30
              border
              border-white/5
              rounded-2xl
              p-8
            "
          >
            <p
              className="
                text-gray-400
                text-sm
                uppercase
                tracking-wider
                font-bold
                mb-6
              "
            >
              TOP SEARCHED
            </p>

            {analytics.topSearches?.length ? (
              <div className="space-y-4">
                {analytics.topSearches.map(
                  (item: any, index: number) => (
                    <div
                      key={index}
                      className="
                        flex
                        items-center
                        justify-between
                        gap-4
                        bg-white/5
                        rounded-xl
                        px-5
                        py-4
                      "
                    >
                      <div className="flex items-center gap-4 min-w-0">
                        <span
                          className="
                            text-lime-300
                            font-black
                            text-lg
                          "
                        >
                          #{index + 1}
                        </span>

                        <span
                          className="
                            text-[#e8dcc0]
                            font-bold
                            truncate
                          "
                        >
                          {item.username}
                        </span>
                      </div>

                      <span
                        className="
                          text-gray-400
                          text-sm
                          shrink-0
                        "
                      >
                        {item.count}
                      </span>
                    </div>
                  )
                )}
              </div>
            ) : (
              <p className="text-gray-500">
                No search data
              </p>
            )}
          </div>

        </div>
      </div>


      {/* LOGIN ACTIVITY */}

      <div
        className="
          bg-white/5
          border
          border-white/10
          rounded-3xl
          p-8
          md:p-10
        "
      >

        <div className="mb-10">
          <p
            className="
              text-[#e8dcc0]
              text-sm
              uppercase
              tracking-[0.2em]
              font-bold
              mb-3
            "
          >
            YOUR LOGIN ACTIVITY
          </p>

          <h2
            className="
              text-3xl
              md:text-4xl
              font-black
            "
          >
            When you came back.
          </h2>

          <p className="text-gray-400 mt-3">
            Your recorded Instagram login activity.
          </p>
        </div>


        {/* LOGIN STATS */}

        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-3
            gap-6
          "
        >

          {/* TOTAL LOGINS */}

          <div
            className="
              bg-black/30
              border
              border-white/5
              rounded-2xl
              p-8
            "
          >
            <div className="text-4xl">
              🔐
            </div>

            <p
              className="
                text-gray-400
                text-sm
                uppercase
                tracking-wider
                font-bold
                mt-6
              "
            >
              TOTAL LOGINS
            </p>

            <p
              className="
                text-5xl
                font-black
                text-lime-300
                mt-3
              "
            >
              {analytics.totalLogins.toLocaleString()}
            </p>
          </div>


          {/* DEVICES */}

          <div
            className="
              bg-black/30
              border
              border-white/5
              rounded-2xl
              p-8
            "
          >
            <div className="text-4xl">
              📱
            </div>

            <p
              className="
                text-gray-400
                text-sm
                uppercase
                tracking-wider
                font-bold
                mt-6
              "
            >
              DEVICES USED
            </p>

            <p
              className="
                text-5xl
                font-black
                text-[#e8dcc0]
                mt-3
              "
            >
              —
            </p>

            <p className="text-gray-500 mt-3">
              Device data unavailable.
            </p>
          </div>


          {/* RECENT ACTIVITY */}

          <div
            className="
              bg-lime-300/5
              border
              border-lime-300/20
              rounded-2xl
              p-8
            "
          >
            <div className="text-4xl">
              🕐
            </div>

            <p
              className="
                text-gray-400
                text-sm
                uppercase
                tracking-wider
                font-bold
                mt-6
              "
            >
              RECENT ACTIVITY
            </p>

            <p
              className="
                text-xl
                font-black
                text-lime-300
                mt-3
              "
            >
              {analytics.loginDevices?.length
                ? "Recorded"
                : "No data"}
            </p>

            <p className="text-gray-500 mt-3">
              Latest login activity from your export.
            </p>
          </div>

        </div>


        {/* RECENT LOGINS */}

        {analytics.loginDevices?.length > 0 && (
          <div className="mt-10">

            <p
              className="
                text-gray-400
                text-sm
                uppercase
                tracking-wider
                font-bold
                mb-5
              "
            >
              RECENT LOGINS
            </p>

            <div
              className="
                grid
                grid-cols-1
                md:grid-cols-3
                gap-5
              "
            >
              {analytics.loginDevices
                .slice(0, 3)
                .map(
                  (
                    date: string,
                    index: number
                  ) => (
                    <div
                      key={index}
                      className="
                        bg-white/5
                        border
                        border-white/10
                        rounded-2xl
                        p-6
                        text-center
                        transition
                        hover:bg-white/10
                      "
                    >
                      <div className="text-3xl">
                        📱
                      </div>

                      <p
                        className="
                          text-lg
                          font-bold
                          text-[#e8dcc0]
                          mt-4
                        "
                      >
                        {new Date(
                          date
                        ).toLocaleDateString(
                          "en-US",
                          {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                          }
                        )}
                      </p>

                      <p
                        className="
                          text-sm
                          text-gray-400
                          mt-1
                        "
                      >
                        {new Date(
                          date
                        ).toLocaleTimeString(
                          "en-US",
                          {
                            hour: "numeric",
                            minute: "2-digit",
                          }
                        )}
                      </p>

                      <p
                        className="
                          text-xs
                          text-gray-500
                          mt-3
                          uppercase
                          tracking-wider
                        "
                      >
                        Login #{index + 1}
                      </p>
                    </div>
                  )
                )}
            </div>

          </div>
        )}

      </div>

    </div>
  );
}

export default ConnectionsSection;
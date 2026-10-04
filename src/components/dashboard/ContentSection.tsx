import { useContext } from "react";
import { InstagramContext } from "../../context/InstagramContext";

function ContentSection() {
  const { analytics, selectedYear } =
    useContext(InstagramContext);

  if (!analytics) {
    return null;
  }

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const posts = analytics.contentTimeline?.posts || [];
  const stories = analytics.contentTimeline?.stories || [];
  const reels = analytics.contentTimeline?.reels || [];

  const maxValue = Math.max(
    ...posts,
    ...stories,
    ...reels
  );

  const safeMax = maxValue || 1;

  return (
    <div className="space-y-16">

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
          📸
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
          YOUR {selectedYear || ""} CONTENT
        </p>

        <h1
          className="
            text-4xl
            md:text-6xl
            font-black
          "
        >
          You were creating.
        </h1>

        <p
          className="
            text-gray-400
            mt-5
            text-lg
          "
        >
          Here's how your Instagram activity looked throughout the year.
        </p>
      </div>


      {/* CONTENT COUNTS */}

      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-3
          gap-6
        "
      >
        {[
          {
            emoji: "🎞️",
            title: "REELS POSTED",
            value: analytics.reelsCount,
          },
          {
            emoji: "▣",
            title: "POSTS SHARED",
            value: analytics.postsCount,
          },
          {
            emoji: "📖",
            title: "STORIES SHARED",
            value: analytics.storiesCount,
          },
        ].map((item) => (
          <div
            key={item.title}
            className="
              bg-white/5
              border
              border-white/10
              rounded-3xl
              p-8
              md:p-10
              text-center
              transition-all
              duration-300
              hover:bg-white/10
              hover:-translate-y-1
            "
          >
            <div className="text-5xl mb-5">
              {item.emoji}
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
              {item.title}
            </p>

            <p
              className="
                text-5xl
                md:text-6xl
                font-black
                text-lime-300
                mt-4
              "
            >
              {item.value}
            </p>
          </div>
        ))}
      </div>


      {/* CONTENT TIMELINE */}

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
            YOUR CREATOR TIMELINE
          </p>

          <h2
            className="
              text-3xl
              md:text-4xl
              font-black
            "
          >
            How your content came and went
          </h2>

          <p className="text-gray-400 mt-3">
            Posts, stories and reels across the year.
          </p>
        </div>


        {/* LEGEND */}

        <div
          className="
            flex
            flex-wrap
            justify-center
            gap-6
            mb-10
            text-sm
            text-gray-300
          "
        >
          <div className="flex items-center gap-2">
            <div
              className="
                w-3
                h-3
                rounded-full
                bg-gray-500
              "
            />
            Reels
          </div>

          <div className="flex items-center gap-2">
            <div
              className="
                w-3
                h-3
                rounded-full
                bg-lime-300
              "
            />
            Posts
          </div>

          <div className="flex items-center gap-2">
            <div
              className="
                w-3
                h-3
                rounded-full
                bg-[#e8d3a5]
              "
            />
            Stories
          </div>
        </div>


        {/* CHART */}

        <div
          className="
            h-80
            flex
            items-end
            gap-2
            md:gap-5
          "
        >
          {months.map((month, index) => {
            const reelValue = reels[index] ?? 0;
            const postValue = posts[index] ?? 0;
            const storyValue = stories[index] ?? 0;

            const reelHeight =
              (reelValue / safeMax) * 100;

            const postHeight =
              (postValue / safeMax) * 100;

            const storyHeight =
              (storyValue / safeMax) * 100;

            return (
              <div
                key={month}
                className="
                  flex-1
                  flex
                  flex-col
                  items-center
                  gap-3
                  min-w-0
                "
              >
                <div
                  className="
                    h-64
                    flex
                    items-end
                    justify-center
                    gap-1
                    w-full
                  "
                >
                  {/* REELS */}

                  <div
                    title={`Reels: ${reelValue}`}
                    style={{
                      height: `${reelHeight}%`,
                    }}
                    className="
                      w-1.5
                      md:w-3
                      bg-gray-500
                      rounded-t
                      transition-all
                      duration-500
                    "
                  />

                  {/* POSTS */}

                  <div
                    title={`Posts: ${postValue}`}
                    style={{
                      height: `${postHeight}%`,
                    }}
                    className="
                      w-1.5
                      md:w-3
                      bg-lime-300
                      rounded-t
                      transition-all
                      duration-500
                    "
                  />

                  {/* STORIES */}

                  <div
                    title={`Stories: ${storyValue}`}
                    style={{
                      height: `${storyHeight}%`,
                    }}
                    className="
                      w-1.5
                      md:w-3
                      bg-[#e8d3a5]
                      rounded-t
                      transition-all
                      duration-500
                    "
                  />
                </div>

                <span
                  className="
                    text-xs
                    md:text-sm
                    text-gray-400
                    font-bold
                  "
                >
                  {month}
                </span>
              </div>
            );
          })}
        </div>

        <p
          className="
            text-center
            text-xs
            text-gray-500
            mt-8
          "
        >
          Hover over the bars to see monthly counts.
        </p>
      </div>


      {/* CONTENT HIGHLIGHTS */}

      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-2
          gap-6
        "
      >

        {/* POSTING MONTH */}

        <div
          className="
            relative
            overflow-hidden
            bg-lime-300/5
            border
            border-lime-300/20
            rounded-3xl
            p-8
            md:p-10
          "
        >
          <div
            className="
              absolute
              right-5
              top-2
              text-7xl
              opacity-5
            "
          >
            📅
          </div>

          <p
            className="
              text-gray-400
              text-sm
              uppercase
              tracking-wider
              font-bold
            "
          >
            MOST ACTIVE POSTING MONTH
          </p>

          <h2
            className="
              text-4xl
              md:text-5xl
              font-black
              text-lime-300
              mt-5
            "
          >
            {analytics.mostActiveMonth}
          </h2>

          <p className="text-gray-500 mt-3">
            Your biggest posting month.
          </p>
        </div>


        {/* STORY MONTH */}

        <div
          className="
            relative
            overflow-hidden
            bg-yellow-300/5
            border
            border-yellow-300/20
            rounded-3xl
            p-8
            md:p-10
          "
        >
          <div
            className="
              absolute
              right-5
              top-2
              text-7xl
              opacity-5
            "
          >
            📈
          </div>

          <p
            className="
              text-gray-400
              text-sm
              uppercase
              tracking-wider
              font-bold
            "
          >
            PEAK STORY MONTH
          </p>

          <h2
            className="
              text-4xl
              md:text-5xl
              font-black
              text-[#e8d3a5]
              mt-5
            "
          >
            {analytics.peakStoryMonth}
          </h2>

          <p className="text-gray-500 mt-3">
            The month you shared the most stories.
          </p>
        </div>

      </div>

    </div>
  );
}

export default ContentSection;
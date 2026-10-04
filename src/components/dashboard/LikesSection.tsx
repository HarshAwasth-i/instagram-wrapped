import { useContext } from "react";
import { InstagramContext } from "../../context/InstagramContext";

function LikesSection() {
  const { analytics, selectedYear } =
    useContext(InstagramContext);

  if (!analytics) return null;

  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];

  const maxMonth = Math.max(
    ...(analytics.likesPerMonth || [])
  );

  const safeMaxMonth = maxMonth || 1;

  const maxHour = Math.max(
    ...(analytics.likeActivity || [])
  );

  const safeMaxHour = maxHour || 1;

  const busiestHour =
    analytics.likeActivity?.indexOf(maxHour) ?? 0;


  function formatHour(hour: number) {
    const suffix = hour >= 12 ? "PM" : "AM";

    const displayHour =
      hour % 12 === 0
        ? 12
        : hour % 12;

    return `${displayHour} ${suffix}`;
  }


  return (
    <div className="space-y-16">


      {/* =========================
          HERO
          ========================= */}

      <div className="
        relative
        overflow-hidden
        bg-gradient-to-br
        from-pink-500/10
        via-white/5
        to-lime-300/10
        border
        border-white/10
        rounded-3xl
        p-10
        md:p-16
        text-center
      ">

        <div className="
          absolute
          -top-10
          -right-10
          text-[150px]
          opacity-5
        ">
          ❤️
        </div>

        <p className="
          text-lime-300
          uppercase
          tracking-[0.3em]
          text-sm
          font-bold
          mb-4
        ">
          YOUR {selectedYear || ""} LOVE LANGUAGE
        </p>

        <div className="text-6xl mb-5">
          ❤️
        </div>

        <h2 className="
          text-xl
          md:text-2xl
          text-gray-300
          uppercase
          tracking-widest
          font-bold
        ">
          TOTAL LIKES GIVEN
        </h2>

        <h1 className="
          text-6xl
          md:text-8xl
          font-black
          text-[#c8ff00]
          mt-5
        ">
          {analytics.likesGiven.toLocaleString()}
        </h1>

        <p className="
          text-gray-400
          mt-5
          text-lg
        ">
          That's a lot of double taps.
        </p>

      </div>


      {/* =========================
          MONTHLY LIKES
          ========================= */}

      <div className="
        bg-white/5
        border
        border-white/10
        rounded-3xl
        p-8
        md:p-10
      ">

        <div className="mb-10">

          <p className="
            text-lime-300
            text-sm
            uppercase
            tracking-[0.2em]
            font-bold
            mb-3
          ">
            YOUR LIKE TIMELINE
          </p>

          <h2 className="
            text-3xl
            md:text-4xl
            font-black
          ">
            When you were showing love
          </h2>

          <p className="
            text-gray-400
            mt-3
          ">
            Your likes across the year.
          </p>

        </div>


        <div className="space-y-5">

          {(analytics.likesPerMonth || []).map(
            (value: number, index: number) => (

              <div
                key={index}
                className="
                  flex
                  items-center
                  gap-4
                  group
                "
              >

                <span className="
                  w-10
                  text-sm
                  text-gray-400
                  font-bold
                  shrink-0
                ">
                  {months[index]}
                </span>


                <div className="
                  flex-1
                  h-7
                  bg-white/5
                  rounded-full
                  overflow-hidden
                ">

                  <div
                    style={{
                      width: `${(value / safeMaxMonth) * 100}%`,
                    }}
                    className="
                      h-full
                      rounded-full
                      bg-gradient-to-r
                      from-pink-500
                      to-lime-300
                      transition-all
                      duration-500
                      group-hover:opacity-80
                    "
                  />

                </div>


                <span className="
                  w-20
                  text-right
                  text-sm
                  font-bold
                  text-white
                ">
                  {value.toLocaleString()}
                </span>

              </div>

            )
          )}

        </div>

      </div>


      {/* =========================
          LIKE ACTIVITY
          ========================= */}

      <div className="
        bg-white/5
        border
        border-white/10
        rounded-3xl
        p-8
        md:p-10
      ">

        <div className="
          flex
          flex-col
          md:flex-row
          md:items-end
          md:justify-between
          gap-5
          mb-10
        ">

          <div>

            <p className="
              text-pink-400
              text-sm
              uppercase
              tracking-[0.2em]
              font-bold
              mb-3
            ">
              YOUR DOUBLE-TAP CLOCK
            </p>

            <h2 className="
              text-3xl
              md:text-4xl
              font-black
            ">
              When you liked the most
            </h2>

            <p className="
              text-gray-400
              mt-3
            ">
              Your liking activity across the day.
            </p>

          </div>


          <div className="
            bg-pink-500/10
            border
            border-pink-500/20
            rounded-2xl
            px-6
            py-4
          ">

            <p className="
              text-xs
              uppercase
              tracking-wider
              text-gray-400
            ">
              Peak hour
            </p>

            <p className="
              text-2xl
              font-black
              text-pink-400
              mt-1
            ">
              {formatHour(busiestHour)}
            </p>

          </div>

        </div>


        <div className="
          flex
          items-end
          gap-1
          md:gap-2
          h-64
        ">

          {(analytics.likeActivity || []).map(
            (value: number, index: number) => (

              <div
                key={index}
                className="
                  flex-1
                  flex
                  flex-col
                  items-center
                  justify-end
                  h-full
                  group
                "
              >

                <div className="
                  opacity-0
                  group-hover:opacity-100
                  transition
                  text-[10px]
                  md:text-xs
                  text-white
                  mb-2
                ">
                  {value.toLocaleString()}
                </div>


                <div
                  style={{
                    height: `${Math.max(
                      (value / safeMaxHour) * 100,
                      value > 0 ? 4 : 0
                    )}%`,
                  }}
                  className={`
                    w-full
                    rounded-t-lg
                    transition-all
                    duration-500
                    ${
                      index === busiestHour
                        ? "bg-lime-300"
                        : "bg-gradient-to-t from-pink-600 to-orange-400"
                    }
                  `}
                />

              </div>

            )
          )}

        </div>


        <div className="
          flex
          justify-between
          text-xs
          text-gray-500
          mt-4
        ">
          <span>12 AM</span>
          <span>6 AM</span>
          <span>12 PM</span>
          <span>6 PM</span>
          <span>12 AM</span>
        </div>

      </div>


      {/* =========================
          RECENTLY LIKED
          ========================= */}

      <div className="
        bg-white/5
        border
        border-white/10
        rounded-3xl
        p-8
        md:p-10
      ">

        <div className="mb-10">

          <p className="
            text-lime-300
            text-sm
            uppercase
            tracking-[0.2em]
            font-bold
            mb-3
          ">
            YOUR RECENT DOUBLE TAPS
          </p>

          <h2 className="
            text-3xl
            md:text-4xl
            font-black
          ">
            Posts that caught your eye
          </h2>

          <p className="
            text-gray-400
            mt-3
          ">
            A few of the posts you liked most recently.
          </p>

        </div>


        <div className="space-y-4">

          {(analytics.likedContent || []).length > 0 ? (

            analytics.likedContent.map(
              (item: any, index: number) => (

                <div
                  key={index}
                  className="
                    flex
                    items-center
                    justify-between
                    gap-5
                    bg-black/30
                    border
                    border-white/10
                    rounded-2xl
                    p-5
                    md:p-6
                    transition
                    hover:bg-white/5
                    hover:border-lime-300/20
                  "
                >

                  <div className="
                    flex
                    items-center
                    gap-5
                    min-w-0
                  ">

                    <div className="
                      bg-[#c8d84b]
                      text-black
                      font-black
                      w-11
                      h-11
                      rounded-xl
                      flex
                      items-center
                      justify-center
                      shrink-0
                    ">
                      {index + 1}
                    </div>


                    <div className="min-w-0">

                      <p className="
                        text-lg
                        font-bold
                        text-white
                        truncate
                      ">
                        {item.caption || "Liked post"}
                      </p>


                      {item.timestamp && (

                        <p className="
                          text-sm
                          text-gray-500
                          mt-2
                        ">
                          {new Date(
                            item.timestamp * 1000
                          ).toLocaleDateString(
                            undefined,
                            {
                              day: "numeric",
                              month: "short",
                              year: "numeric"
                            }
                          )}
                        </p>

                      )}

                    </div>

                  </div>


                  {item.url && (

                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="
                        shrink-0
                        px-4
                        py-2
                        rounded-full
                        bg-white/5
                        border
                        border-white/10
                        text-sm
                        text-lime-300
                        font-bold
                        hover:bg-lime-300
                        hover:text-black
                        transition
                      "
                    >
                      Open ↗
                    </a>

                  )}

                </div>

              )
            )

          ) : (

            <p className="
              text-gray-500
              text-center
              py-10
            ">
              No liked post details available.
            </p>

          )}

        </div>

      </div>

    </div>
  );
}

export default LikesSection;
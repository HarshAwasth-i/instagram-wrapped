import { useContext } from "react";
import { InstagramContext } from "../../context/InstagramContext";


function TopFriends() {

  const { analytics, selectedYear } =
    useContext(InstagramContext);


  if (!analytics) {
    return null;
  }


  const medals = ["👑", "🥈", "🥉", "⭐", "⭐"];


  return (

    <div className="
      mt-16
      bg-white/5
      border
      border-white/10
      rounded-3xl
      p-8
      md:p-10
    ">


      {/* =========================
          HEADER
          ========================= */}

      <div className="
        text-center
        mb-10
      ">

        <p className="
          text-[#d8cfb5]
          text-sm
          uppercase
          tracking-[0.25em]
          font-bold
          mb-3
        ">
          YOUR {selectedYear || ""} INNER CIRCLE
        </p>


        <h2 className="
          text-3xl
          md:text-4xl
          font-black
        ">
          Who got the most messages?
        </h2>


        <p className="
          text-gray-400
          mt-3
        ">
          The people who appeared most often in your DMs.
        </p>

      </div>


      {/* =========================
          FRIEND LIST
          ========================= */}

      <div className="space-y-4">

        {
          analytics.topFriends?.length
            ? analytics.topFriends.map(
                (friend: any, index: number) => (

                  <div
                    key={index}
                    className={`
                      relative
                      overflow-hidden
                      flex
                      items-center
                      justify-between
                      gap-4
                      rounded-2xl
                      p-5
                      md:p-6
                      border
                      transition-all
                      duration-300
                      hover:-translate-y-1
                      ${
                        index === 0
                          ? `
                            bg-lime-300/10
                            border-lime-300/30
                          `
                          : `
                            bg-white/5
                            border-white/10
                            hover:bg-white/10
                          `
                      }
                    `}
                  >


                    {/* LEFT */}

                    <div className="
                      flex
                      items-center
                      gap-4
                      min-w-0
                    ">

                      <div className="
                        text-3xl
                        w-10
                        text-center
                        shrink-0
                      ">
                        {medals[index]}
                      </div>


                      <div className="min-w-0">

                        <p className={`
                          text-lg
                          md:text-xl
                          font-bold
                          truncate
                          ${
                            index === 0
                              ? "text-lime-300"
                              : "text-[#e8dcc0]"
                          }
                        `}>
                          {friend.name}
                        </p>


                        <p className="
                          text-xs
                          uppercase
                          tracking-wider
                          text-gray-500
                          mt-1
                        ">
                          {index === 0
                            ? "Your #1 conversation"
                            : `Rank ${index + 1}`
                          }
                        </p>

                      </div>

                    </div>


                    {/* MESSAGE COUNT */}

                    <div className="
                      text-right
                      shrink-0
                    ">

                      <p className={`
                        text-2xl
                        md:text-3xl
                        font-black
                        ${
                          index === 0
                            ? "text-lime-300"
                            : "text-white"
                        }
                      `}>
                        {friend.count.toLocaleString()}
                      </p>


                      <p className="
                        text-xs
                        uppercase
                        tracking-wider
                        text-gray-500
                        mt-1
                      ">
                        messages
                      </p>

                    </div>


                  </div>

                )
              )

            : (

              <div className="
                text-center
                py-12
                text-gray-500
              ">
                No conversations found
              </div>

            )
        }

      </div>


      {/* =========================
          FOOTER
          ========================= */}

      {
        analytics.topFriend && (

          <div className="
            mt-8
            text-center
            bg-black/30
            border
            border-white/5
            rounded-2xl
            p-5
          ">

            <p className="
              text-gray-400
              text-sm
            ">
              Your most messaged person in {selectedYear || "this year"} was
            </p>


            <p className="
              text-xl
              font-black
              text-lime-300
              mt-1
            ">
              {analytics.topFriend}
            </p>

          </div>

        )
      }


    </div>

  );

}


export default TopFriends;
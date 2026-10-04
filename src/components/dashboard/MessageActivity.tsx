import { useContext } from "react";
import { InstagramContext } from "../../context/InstagramContext";


function MessageActivity() {

  const { analytics } =
    useContext(InstagramContext);


  if (!analytics) {
    return null;
  }


  const hours = analytics.hourActivity;

  const max = Math.max(...hours);

  const safeMax = max || 1;


  // Find the busiest hour
  const busiestHour = hours.indexOf(max);


  function formatHour(hour: number) {

    const suffix = hour >= 12 ? "PM" : "AM";

    const displayHour =
      hour % 12 === 0
        ? 12
        : hour % 12;

    return `${displayHour} ${suffix}`;

  }


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
            text-lime-300
            text-sm
            uppercase
            tracking-[0.2em]
            font-bold
            mb-3
          ">
            YOUR CHAT CLOCK
          </p>


          <h2 className="
            text-3xl
            md:text-4xl
            font-black
          ">
            When you were most active
          </h2>


          <p className="
            text-gray-400
            mt-3
          ">
            Your messaging activity across the day.
          </p>

        </div>


        {/* BUSIEST HOUR */}

        <div className="
          bg-lime-300/10
          border
          border-lime-300/20
          rounded-2xl
          px-6
          py-4
          md:text-right
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
            text-lime-300
            mt-1
          ">
            {formatHour(busiestHour)}
          </p>

        </div>

      </div>


      {/* =========================
          CHART
          ========================= */}

      <div className="
        flex
        items-end
        gap-1
        md:gap-2
        h-64
        w-full
      ">

        {
          hours.map(
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
                  min-w-0
                  group
                "
              >

                {/* VALUE */}

                <div className="
                  opacity-0
                  group-hover:opacity-100
                  transition
                  text-[10px]
                  md:text-xs
                  text-white
                  mb-2
                  whitespace-nowrap
                ">
                  {value.toLocaleString()}
                </div>


                {/* BAR */}

                <div
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
                    group-hover:opacity-80
                  `}
                  style={{
                    height:
                      `${Math.max(
                        (value / safeMax) * 100,
                        value > 0 ? 4 : 0
                      )}%`
                  }}
                />

              </div>

            )
          )
        }

      </div>


      {/* =========================
          HOUR LABELS
          ========================= */}

      <div className="
        flex
        gap-1
        md:gap-2
        mt-3
      ">

        {
          hours.map(
            (_: number, index: number) => (

              <div
                key={index}
                className="
                  flex-1
                  text-center
                  text-[10px]
                  md:text-xs
                  text-gray-500
                "
              >

                {
                  index % 3 === 0
                    ? index
                    : ""
                }

              </div>

            )
          )
        }

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

  );

}


export default MessageActivity;
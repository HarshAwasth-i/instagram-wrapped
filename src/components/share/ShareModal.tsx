import {
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import { InstagramContext } from "../../context/InstagramContext";
import { toPng } from "html-to-image";

interface ShareModalProps {
  onClose: () => void;
}

export default function ShareModal({
  onClose,
}: ShareModalProps) {
  const { analytics, selectedYear } =
    useContext(InstagramContext);

  const cardRef = useRef<HTMLDivElement>(null);

  const [isBlurred, setIsBlurred] =
    useState(true);

  const [downloading, setDownloading] =
    useState(false);

  const [copied, setCopied] =
    useState(false);

  const [downloadDone, setDownloadDone] =
    useState(false);

  const year = selectedYear || new Date().getFullYear();

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener("keydown", onKey);

    return () =>
      window.removeEventListener(
        "keydown",
        onKey
      );
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // =========================
  // REAL ANALYTICS
  // =========================

  const messages =
    analytics?.messagesCount ?? 0;

  const likes =
    analytics?.likesGiven ?? 0;

  const reels =
    analytics?.reelsCount ?? 0;

  const stories =
    analytics?.storiesCount ?? 0;

  const topFriends =
    analytics?.topFriends ?? [];

  const topLikedAccounts =
    analytics?.topLikedAccounts ?? [];

  const personalityCards =
    analytics?.personalityCards ?? [];

  const personality =
    analytics?.personality ||
    "Quiet Observer";

  // =========================
  // DOWNLOAD
  // =========================

  async function handleDownload() {
    if (!cardRef.current) return;

    setDownloading(true);

    const blurredBefore = isBlurred;

    // Download should contain visible names
    if (blurredBefore) {
      setIsBlurred(false);
    }

    await new Promise((resolve) =>
      setTimeout(resolve, 150)
    );

    try {
      const dataUrl = await toPng(
        cardRef.current,
        {
          quality: 1,
          pixelRatio: 2,
          backgroundColor: "#0a0a0a",
        }
      );

      const link =
        document.createElement("a");

      link.download =
        `instagram-wrapped-${year}.png`;

      link.href = dataUrl;

      link.click();

      setDownloadDone(true);

      setTimeout(() => {
        setDownloadDone(false);
      }, 2500);
    } catch (error) {
      console.error(
        "Download failed:",
        error
      );
    } finally {
      if (blurredBefore) {
        setIsBlurred(true);
      }

      setDownloading(false);
    }
  }

  // =========================
  // COPY LINK
  // =========================

  async function handleCopyLink() {
    try {
      await navigator.clipboard.writeText(
        window.location.href
      );

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch {
      // Ignore clipboard errors
    }
  }

  // =========================
  // BLUR NAMES
  // =========================

  // function displayName(
  //   name: string
  // ) {
  //   if (!isBlurred) {
  //     return name;
  //   }

  //   return "••••••••";
  // }

  return (
    <div
      className="
        fixed
        inset-0
      z-9999
        flex
        items-center
        justify-center
        px-4
        py-6
      "
      style={{
        background:
          "radial-gradient(ellipse at 50% 0%, rgba(190,242,100,0.06) 0%, rgba(0,0,0,0.88) 60%)",
        backdropFilter:
          "blur(24px)",
        WebkitBackdropFilter:
          "blur(24px)",
      }}
    >
      {/* BACKDROP */}
      <div
        className="
          absolute
          inset-0
        "
        onClick={onClose}
      />

      <div
        className="
          relative
          z-10
          w-full
          max-w-md
          flex
          flex-col
          gap-3
          max-h-[95vh]
        "
      >

        {/* =========================
            HEADER
        ========================= */}

        <div
          className="
            flex
            items-center
            justify-between
            px-1
          "
        >
          <div
            className="
              text-lime-300
              font-black
              text-sm
              tracking-[0.12em]
              uppercase
            "
          >
            Share Your Recap
          </div>

          <button
            onClick={onClose}
            className="
              text-gray-400
              hover:text-white
              text-xl
              cursor-pointer
              transition
            "
          >
            ×
          </button>
        </div>

        {/* =========================
            BLUR BUTTON
        ========================= */}

        <button
          onClick={() =>
            setIsBlurred((prev) => !prev)
          }
          className="
            self-start
            px-3
            py-2
            rounded-lg
            bg-white/[0.06]
            border
            border-white/[0.06]
            text-gray-300
            text-xs
            font-semibold
            hover:bg-white/[0.1]
            transition
            cursor-pointer
          "
        >
          {isBlurred
            ? "◉ Show usernames"
            : "◉ Blur usernames"}
        </button>

        {/* =========================
            SHARE CARD
        ========================= */}

        <div
          ref={cardRef}
          className="
            rounded-2xl
            overflow-hidden
            select-none
            border
            border-white/[0.06]
          "
          style={{
            background:
              "linear-gradient(145deg, #171a1f 0%, #111318 55%, #151c18 100%)",
          }}
        >

          {/* TOP ACCENT */}

          <div
            className="
              h-[3px]
              w-full
            "
            style={{
              background:
                "linear-gradient(90deg, transparent, #bef264, #d9f99d, transparent)",
            }}
          />

          <div
            className="
              px-5
              py-6
            "
          >

            {/* TITLE */}

            <div className="text-center mb-5">
              <div
                className="
                  text-gray-300
                  text-xs
                  tracking-[0.2em]
                  font-bold
                "
              >
                INSTAGRAM
              </div>

              <div
                className="
                  text-lime-300
                  text-2xl
                  font-black
                  tracking-[0.12em]
                  mt-1
                "
              >
                WRAPPED {year}
              </div>
            </div>

            {/* =========================
                MAIN STATS
            ========================= */}

            <div
              className="
                grid
                grid-cols-2
                gap-3
                mb-5
              "
            >

              {/* MESSAGES */}

              <div
                className="
                  rounded-lg
                  bg-white/[0.035]
                  border
                  border-white/[0.03]
                  px-4
                  py-3
                  text-center
                "
              >
                <div
                  className="
                    text-lime-300
                    text-lg
                    font-black
                  "
                >
                  {messages.toLocaleString()}
                </div>

                <div
                  className="
                    text-[10px]
                    text-gray-500
                    mt-1
                  "
                >
                  Messages
                </div>
              </div>

              {/* LIKES */}

              <div
                className="
                  rounded-lg
                  bg-white/[0.035]
                  border
                  border-white/[0.03]
                  px-4
                  py-3
                  text-center
                "
              >
                <div
                  className="
                    text-[#e8dcc0]
                    text-lg
                    font-black
                  "
                >
                  {likes.toLocaleString()}
                </div>

                <div
                  className="
                    text-[10px]
                    text-gray-500
                    mt-1
                  "
                >
                  Likes
                </div>
              </div>

              {/* REELS */}

              <div
                className="
                  rounded-lg
                  bg-white/[0.035]
                  border
                  border-white/[0.03]
                  px-4
                  py-3
                  text-center
                "
              >
                <div
                  className="
                    text-gray-500
                    text-lg
                    font-black
                  "
                >
                  {reels.toLocaleString()}
                </div>

                <div
                  className="
                    text-[10px]
                    text-gray-500
                    mt-1
                  "
                >
                  Reels
                </div>
              </div>

              {/* STORIES */}

              <div
                className="
                  rounded-lg
                  bg-white/[0.035]
                  border
                  border-white/[0.03]
                  px-4
                  py-3
                  text-center
                "
              >
                <div
                  className="
                    text-green-400
                    text-lg
                    font-black
                  "
                >
                  {stories.toLocaleString()}
                </div>

                <div
                  className="
                    text-[10px]
                    text-gray-500
                    mt-1
                  "
                >
                  Stories
                </div>
              </div>

            </div>

            {/* =========================
                TOP 5 CHATS
            ========================= */}

            <div className="mb-5">

              <div
                className="
                  text-center
                  text-lime-300
                  text-sm
                  font-black
                  tracking-[0.08em]
                  mb-3
                "
              >
                TOP 5 CHATS
              </div>

              {topFriends.length > 0 ? (
                <div className="space-y-2">

                  {topFriends
                    .slice(0, 5)
                    .map(
                      (
                        friend: any,
                        index: number
                      ) => (
                        <div
                          key={`${friend.name}-${index}`}
                          className="
                            flex
                            items-center
                            gap-3
                            rounded-lg
                            bg-white/[0.035]
                            border
                            border-white/[0.03]
                            px-3
                            py-2.5
                          "
                        >

                          {/* RANK */}

                          <div
                            className="
                              w-5
                              text-center
                              text-xs
                              font-bold
                              text-gray-500
                            "
                          >
                            {index === 0
                              ? "👑"
                              : index === 1
                              ? "🥈"
                              : index === 2
                              ? "🥉"
                              : `${index + 1}`}
                          </div>

                          {/* NAME */}

                          <div
                            className="
                              flex-1
                              min-w-0
                              text-xs
                              font-semibold
                              text-gray-300
                              truncate
                            "
                            style={{
                              filter: isBlurred
                                ? "blur(5px)"
                                : "none",
                            }}
                          >
                            {friend.name}
                          </div>

                          {/* COUNT */}

                          <div
                            className="
                              text-[10px]
                              text-gray-500
                              font-bold
                            "
                          >
                            {Number(
                              friend.count || 0
                            ).toLocaleString()}
                          </div>

                        </div>
                      )
                    )}

                </div>
              ) : (
                <div
                  className="
                    text-center
                    text-xs
                    text-gray-600
                    py-4
                  "
                >
                  No conversations found
                </div>
              )}

            </div>

            {/* =========================
                MOST LIKED ACCOUNT
            ========================= */}

            <div
              className="
                rounded-lg
                px-4
                py-3
                mb-5
                border
                border-lime-300/10
              "
              style={{
                background:
                  "linear-gradient(90deg, rgba(190,242,100,0.12), rgba(190,242,100,0.04))",
              }}
            >

              <div
                className="
                  text-center
                  text-[10px]
                  text-gray-400
                  font-bold
                  mb-1
                "
              >
                Most Liked Account
              </div>

              {topLikedAccounts.length > 0 ? (
                <>
                  <div
                    className="
                      text-center
                      text-white
                      font-black
                      text-sm
                    "
                    style={{
                      filter: isBlurred
                        ? "blur(5px)"
                        : "none",
                    }}
                  >
                    ❤️{" "}
                    {
                      topLikedAccounts[0]
                        .username
                    }
                  </div>

                  <div
                    className="
                      text-center
                      text-[10px]
                      text-gray-500
                      mt-1
                    "
                  >
                    {Number(
                      topLikedAccounts[0]
                        .count || 0
                    ).toLocaleString()}{" "}
                    likes
                  </div>
                </>
              ) : (
                <div
                  className="
                    text-center
                    text-xs
                    text-gray-600
                  "
                >
                  No liked accounts found
                </div>
              )}

            </div>

            {/* =========================
                PERSONALITY
            ========================= */}

            <div
              className="
                flex
                flex-wrap
                justify-center
                gap-2
                mb-5
              "
            >

              {personalityCards.length > 0 ? (
                personalityCards
                  .slice(0, 3)
                  .map(
                    (
                      card: any,
                      index: number
                    ) => (
                      <div
                        key={`${card.title}-${index}`}
                        className="
                          rounded-full
                          bg-white/[0.08]
                          border
                          border-white/[0.05]
                          px-3
                          py-1.5
                          text-[10px]
                          text-gray-300
                          font-bold
                        "
                      >
                        {card.emoji}{" "}
                        {card.title}
                      </div>
                    )
                  )
              ) : (
                <div
                  className="
                    rounded-full
                    bg-white/[0.08]
                    border
                    border-white/[0.05]
                    px-3
                    py-1.5
                    text-[10px]
                    text-gray-300
                    font-bold
                  "
                >
                  🧠 {personality}
                </div>
              )}

            </div>

            {/* FOOTER */}

            <div
              className="
                border-t
                border-white/[0.08]
                pt-4
                text-center
              "
            >
              <div
                className="
                  text-xs
                  text-gray-400
                  font-bold
                "
              >
                Made with 💜
              </div>

              <div
                className="
                  text-[8px]
                  text-gray-700
                  tracking-[0.2em]
                  uppercase
                  mt-2
                "
              >
                instagram-wrapped
              </div>
            </div>

          </div>
        </div>

        {/* =========================
            ACTION BUTTONS
        ========================= */}

        <div className="flex gap-2.5">

          <button
            onClick={handleDownload}
            disabled={downloading}
            className="
              flex-1
              flex
              items-center
              justify-center
              gap-2
              py-3.5
              rounded-2xl
              border
              font-bold
              text-sm
              transition-all
              duration-200
              cursor-pointer
              active:scale-95
              disabled:opacity-60
            "
            style={{
              background: downloadDone
                ? "rgba(190,242,100,0.22)"
                : "rgba(190,242,100,0.12)",

              borderColor: downloadDone
                ? "rgba(190,242,100,0.8)"
                : "rgba(190,242,100,0.35)",

              color: "#bef264",
            }}
          >
            {downloading ? (
              <span className="animate-spin">
                ⟳
              </span>
            ) : downloadDone ? (
              "✓ Saved!"
            ) : (
              "⬇ Download"
            )}
          </button>

          <button
            onClick={handleCopyLink}
            className="
              flex-1
              flex
              items-center
              justify-center
              gap-2
              py-3.5
              rounded-2xl
              border
              border-white/10
              bg-white/[0.04]
              text-gray-300
              font-bold
              text-sm
              transition-all
              duration-200
              cursor-pointer
              hover:bg-white/[0.08]
              hover:border-white/20
              hover:text-white
              active:scale-95
            "
          >
            {copied
              ? "✓ Copied!"
              : "🔗 Copy Link"}
          </button>

        </div>

        {/* CLOSE */}

        <button
          onClick={onClose}
          className="
            py-3
            rounded-2xl
            border
            border-white/[0.06]
            bg-white/[0.02]
            text-gray-500
            font-bold
            text-sm
            transition-all
            duration-200
            cursor-pointer
            hover:bg-white/[0.05]
            hover:text-gray-300
            active:scale-95
          "
        >
          Close
        </button>

      </div>
    </div>
  );
}
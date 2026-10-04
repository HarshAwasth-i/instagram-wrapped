import {
  useContext,
  useEffect,
  useRef,
  useState
} from "react";

import { InstagramContext } from "../../context/InstagramContext";
import { toPng } from "html-to-image";

interface ShareModalProps {
  onClose: () => void;
}

export default function ShareModal({ onClose }: ShareModalProps) {
  const { analytics, selectedYear } = useContext(InstagramContext);
  const cardRef = useRef<HTMLDivElement>(null);
  const [isBlurred, setIsBlurred] = useState(true);
  const [downloading, setDownloading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [downloadDone, setDownloadDone] = useState(false);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const username = analytics?.username || "@yourhandle";
  const totalMessages = analytics?.totalMessages?.toLocaleString() ?? "—";
  const topFriend = analytics?.topFriends?.[0]?.name ?? "—";
  const totalLikes = analytics?.totalLikes?.toLocaleString() ?? "—";
  const totalStories = analytics?.totalStories?.toLocaleString() ?? "—";
  const personality = analytics?.personalityType ?? "Explorer";

  async function handleDownload() {
    if (!cardRef.current) return;
    setDownloading(true);
    const blurredBefore = isBlurred;
    if (blurredBefore) setIsBlurred(false);
    await new Promise(r => setTimeout(r, 150));
    try {
      const dataUrl = await toPng(cardRef.current, {
        quality: 1, pixelRatio: 2, backgroundColor: "#0a0a0a"
      });
      const link = document.createElement("a");
      link.download = `instagram-wrapped-${selectedYear || "2024"}.png`;
      link.href = dataUrl;
      link.click();
      setDownloadDone(true);
      setTimeout(() => setDownloadDone(false), 2500);
    } catch (err) {
      console.error("Download failed:", err);
    } finally {
      if (blurredBefore) setIsBlurred(true);
      setDownloading(false);
    }
  }

  async function handleCopyLink() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { /* silent */ }
  }

  const stats = [
    { label: "Messages", value: totalMessages, icon: "💬", bg: "rgba(190,242,100,0.07)" },
    { label: "Likes Given", value: totalLikes, icon: "❤️", bg: "rgba(248,113,113,0.07)" },
    { label: "Stories", value: totalStories, icon: "✨", bg: "rgba(167,139,250,0.07)" },
    { label: "Top Friend", value: topFriend, icon: "🌟", bg: "rgba(251,191,36,0.07)" },
  ];

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center px-4 py-6"
      style={{
        background: "radial-gradient(ellipse at 50% 0%, rgba(190,242,100,0.06) 0%, rgba(0,0,0,0.82) 60%)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)"
      }}
    >
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative z-10 w-full max-w-sm flex flex-col gap-3">

        <div className="text-center text-[10px] tracking-[0.35em] uppercase text-gray-600 mb-1">
          Share your {selectedYear || "year"} wrapped
        </div>

        {/* CARD */}
        <div
          ref={cardRef}
          className="rounded-3xl border border-white/10 overflow-hidden select-none"
          style={{ background: "linear-gradient(160deg, #111 0%, #0d0d0d 50%, #0a0f07 100%)" }}
        >
          <div className="h-[3px] w-full" style={{ background: "linear-gradient(90deg, transparent, #bef264, #a3e635, transparent)" }} />

          <div className="px-7 pt-6 pb-7">

            <p className="text-[10px] tracking-[0.35em] uppercase text-lime-300/60 mb-5">
              Instagram Wrapped
            </p>

            {/* USERNAME ROW */}
            <div className="flex items-center gap-3 mb-6">
              <div
                className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-lg flex-shrink-0"
                style={{ background: "linear-gradient(135deg, #1a1a1a, #2a2a2a)" }}
              >
                📸
              </div>
              <div className="flex-1 min-w-0">
                <div
                  className="text-white font-black text-lg leading-tight truncate transition-all duration-500"
                  style={{ filter: isBlurred ? "blur(8px)" : "none", userSelect: isBlurred ? "none" : "auto" }}
                >
                  {username}
                </div>
                <div className="text-[11px] text-gray-600 tracking-wide mt-0.5">
                  {selectedYear || "2024"} in review
                </div>
              </div>
              <button
                onClick={() => setIsBlurred(p => !p)}
                className="flex-shrink-0 w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-sm transition-all duration-200 cursor-pointer hover:border-lime-400/40 hover:bg-lime-400/10"
                title={isBlurred ? "Reveal username" : "Hide username"}
              >
                {isBlurred ? "👁️" : "🙈"}
              </button>
            </div>

            {/* STATS */}
            <div className="grid grid-cols-2 gap-3 mb-5">
              {stats.map(stat => (
                <div key={stat.label} className="rounded-xl p-3.5 border border-white/[0.06]" style={{ background: stat.bg }}>
                  <div className="text-xl mb-1">{stat.icon}</div>
                  <div className="text-white font-black text-base leading-tight truncate">{stat.value}</div>
                  <div className="text-[10px] text-gray-500 tracking-wide mt-0.5">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* PERSONALITY */}
            <div className="flex items-center gap-2.5 rounded-xl px-4 py-3 border border-lime-400/15" style={{ background: "rgba(190,242,100,0.05)" }}>
              <span className="text-lg">🧠</span>
              <div>
                <div className="text-lime-300 font-black text-sm">{personality}</div>
                <div className="text-[10px] text-gray-600">Your Instagram Personality</div>
              </div>
            </div>

            <div className="mt-5 flex items-center justify-between">
              <div className="text-[9px] text-gray-700 tracking-[0.2em] uppercase">instagram-wrapped.app</div>
              <div className="text-[9px] text-gray-700 tracking-[0.15em]">✦ {selectedYear || "2024"}</div>
            </div>

          </div>
        </div>

        {/* ACTIONS */}
        <div className="flex gap-2.5">
          <button
            onClick={handleDownload}
            disabled={downloading}
            className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl border font-bold text-sm transition-all duration-200 cursor-pointer active:scale-95 disabled:opacity-60"
            style={{
              background: downloadDone ? "rgba(190,242,100,0.22)" : "rgba(190,242,100,0.12)",
              borderColor: downloadDone ? "rgba(190,242,100,0.8)" : "rgba(190,242,100,0.35)",
              color: "#bef264"
            }}
          >
            {downloading ? <span className="animate-spin inline-block">⟳</span> : downloadDone ? <>✓ Saved!</> : <>⬇ Download</>}
          </button>
          <button
            onClick={handleCopyLink}
            className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl border border-white/10 bg-white/[0.04] text-gray-300 font-bold text-sm transition-all duration-200 cursor-pointer hover:bg-white/[0.08] hover:border-white/20 hover:text-white active:scale-95"
          >
            {copied ? "✓ Copied!" : "🔗 Copy Link"}
          </button>
        </div>

        <button
          onClick={onClose}
          className="py-3 rounded-2xl border border-white/[0.06] bg-white/[0.02] text-gray-500 font-bold text-sm transition-all duration-200 cursor-pointer hover:bg-white/[0.05] hover:text-gray-300 active:scale-95"
        >
          Close
        </button>

      </div>
    </div>
  );
}

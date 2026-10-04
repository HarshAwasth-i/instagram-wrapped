interface CategoryTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

function CategoryTabs({ activeTab, setActiveTab }: CategoryTabsProps) {
  const tabs = [
    { name: "Messages", icon: "💬" },
    { name: "Likes", icon: "♡" },
    { name: "Content", icon: "▣" },
    { name: "Connections", icon: "👥" },
    { name: "Personality", icon: "🎭" },
  ];

  return (
    <div className="flex items-center gap-2 md:gap-3 overflow-x-auto p-1 scrollbar-none">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.name;
        return (
          <button
            key={tab.name}
            onClick={() => setActiveTab(tab.name)}
            className={`
              px-5 py-2.5 md:px-6 md:py-3 rounded-xl font-bold text-xs md:text-sm
              transition-all duration-300 flex items-center gap-2 whitespace-nowrap
              cursor-pointer active:scale-95
              ${
                isActive
                  ? "bg-lime-400/18 text-lime-300 border border-lime-400/50 shadow-[0_0_24px_rgba(190,242,100,0.22)] backdrop-blur-xl"
                  : "bg-white/[0.03] text-gray-400 border border-white/10 hover:bg-white/[0.08] hover:text-white hover:border-white/20 backdrop-blur-md"
              }
            `}
          >
            <span>{tab.icon}</span>
            <span>{tab.name}</span>
          </button>
        );
      })}
    </div>
  );
}

export default CategoryTabs;
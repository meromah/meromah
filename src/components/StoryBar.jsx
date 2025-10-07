import React, { useState, useEffect } from "react";
import { PiCoinsLight } from "react-icons/pi";
import { LiaTachometerAltSolid } from "react-icons/lia";
import { IoLayersOutline } from "react-icons/io5";
import { TbAtom } from "react-icons/tb";

// Move constants outside component - no re-render overhead
const STORY_TITLES = ["Billing", "Charging", "Catalog", "Events"];

const STORY_DATA = {
  Billing: {
    color:"bg-red-400",
    icon: PiCoinsLight,
    header: "Real-Time Convergent Billing",
    description:
      "Instantaneous, accurate billing across all services and payment methods.",
    image:
      "https://cdn.prod.website-files.com/66e53bf67b6fc1646ce0777e/6787a3ad95199bfabb23a602_Logo-dark.svg",
  },
  Charging: {
    color:"bg-blue-400",
    icon: LiaTachometerAltSolid,
    header: "Dynamic Charging Engine",
    description:
      "Flexible, real-time charging for complex pricing models and promotions.",
    image:
      "https://cdn.prod.website-files.com/66e53bf67b6fc1646ce0777e/6787a3ad95199bfabb23a602_Logo-dark.svg",
  },
  Catalog: {
    color:"bg-green-400",
    icon: IoLayersOutline,
    header: "Unified Product Catalog",
    description:
      "Centralized management of all products, services, and pricing structures.",
    image:
      "https://cdn.prod.website-files.com/66e53bf67b6fc1646ce0777e/6787a3ad95199bfabb23a602_Logo-dark.svg",
  },
  Events: {
    color:"bg-cyan-400",
    icon: TbAtom,
    header: "Event Processing System",
    description:
      "High-throughput processing of usage events and network activity in real-time.",
    image:
      "https://cdn.prod.website-files.com/66e53bf67b6fc1646ce0777e/6787a3ad95199bfabb23a602_Logo-dark.svg",
  },
};

const INTERVAL_DURATION = 10000; // 10 seconds

function StoryBar() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [key, setKey] = useState(0);

  // Auto-advance every 10 seconds - resets when activeIndex changes
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % STORY_TITLES.length);
      setKey((prev) => prev + 1);
    }, INTERVAL_DURATION);

    return () => clearInterval(interval);
  }, [activeIndex]); // Add activeIndex as dependency

  // Reset animation when user manually clicks
  const handleTabClick = (index) => {
    if (index === activeIndex) return;
    setActiveIndex(index);
    setKey((prev) => prev + 1);
  };

  const activeTitle = STORY_TITLES[activeIndex];
  const activeStory = STORY_DATA[activeTitle];

  // Component for displaying title on mobile
  const DisplayTitleMobile = ({ title, story }) => {
    const color = story[title].color;
    const Icon = story[title].icon;

    return (
      <div className="story-title-active cursor-pointer transition-[width] duration-300 relative overflow-hidden group">
        <span className={`story-icon ${color}`}>
          <Icon />
        </span>
        <p className="z-10 animate-fade-in">{title}</p>

        {/* Progress bar - only render for active item */}
        <span className="absolute left-0 top-0 bottom-0 bg-primary-light rounded-r-xl animate-inset-grow" />
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white p-8 flex items-center justify-center">
      <div className="flex flex-col gap-1 w-full max-w-5xl mx-auto">
        {/* Story Title Tabs For Mobile Devices*/}
        <div className="items-center gap-0.5 flex sm:hidden transition-all duration-300">
          {
            <DisplayTitleMobile
              title={STORY_TITLES[activeIndex]}
              story={STORY_DATA}
            />
          }
        </div>
        {/* Story Title Tabs */}
        <div className="items-center gap-0.5 hidden sm:flex">
          {STORY_TITLES.map((title, index) => {
            const story = STORY_DATA[title];
            const color = story.color;
            const Icon = story.icon;
            const isActive = index === activeIndex;

            return (
              <div
                key={title}
                className={`${
                  isActive ? "story-title-active" : "story-title"
                } cursor-pointer transition-[width] duration-300 relative overflow-clip group`}
                onClick={() => handleTabClick(index)}
              >
                <span className={`story-icon ${color}`}>
                  <Icon />
                </span>
                <p className="z-10 pr-2 animate-fade-in">{title}</p>

                {/* Progress bar - only render for active item */}
                {isActive && (
                  <span
                    key={key}
                    className="absolute left-0 top-0 bottom-0 bg-primary-light rounded-r-xl animate-inset-grow"
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Story Content */}
        <div key={key} className="flex bg-secondary-light rounded-xl overflow-hidden text-base sm:flex-row flex-col transition-all duration-500">
          <div className="p-4 sm:p-20 sm:w-1/2 animate-fade-in">
            <div className="w-4/5 flex flex-col gap-4">
              <h3 className="font-bold text-2xl">{activeStory.header}</h3>
              <p className="text-neutral-700">{activeStory.description}</p>
            </div>
          </div>
          <div className="flex p-4 items-center bg-primary-blue sm:p-0 sm:w-1/2 justify-center text-white">
            <img
              src={activeStory.image}
              alt={activeTitle}
              className="max-w-xs"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default StoryBar;

import React, { useState } from "react";
import { useSpring, animated } from "@react-spring/web";

import { useSwipeable } from "react-swipeable";
// import LanguageSelection from "./LanguageSelection";
import LanguageSelection from "./LanguageSelection";
import { useTranslation } from "react-i18next";

// Import assets
import ad1 from "../assets/ad4.jpeg";
import ad2 from "../assets/ad2.jpeg";
import ad3 from "../assets/ad3.jpeg";

interface OnboardingScreen {
  id: number;
  type?: "component";
  component?: React.ReactNode;
  title?: string;
  description?: string;
  image?: string;
}

const OnboardingScreenPage: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<number>(0);

  const { t } = useTranslation();

  const onboardingScreens: OnboardingScreen[] = [
    { id: 0, type: "component", component: <LanguageSelection /> },
    { id: 1, title: "Welcome to the App", description: "Stay Organized: Effortlessly manage your tasks and goals all in one place.", image: ad3 },
    { id: 2, title: "Stay Organized", description: "Boost Productivity: Prioritize and track your progress with ease.", image: ad2 },
    { id: 3, title: "Get Started", description: "Achieve More: Turn your daily plans into accomplishments.", image: ad1 },
  ];

  const handleNext = () => {
    if (currentScreen < onboardingScreens.length - 1) {
      setCurrentScreen((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentScreen > 0) {
      setCurrentScreen((prev) => prev - 1);
    }
  };

  const handleSkip = () => {
    setCurrentScreen(onboardingScreens.length - 1);
  };

  const handleStart = () => {
    console.log("Onboarding completed, navigating to collections.");
    localStorage.setItem("hasCompletedOnboarding", "true");
    // navigate("/collections");
    // For demonstration purposes, we'll just navigate to the home page
    // navigate("/home");
    window.location.href = "/collections"; // Redirect to the home page
    window.location.reload();
  };

  const animationProps = useSpring({
    opacity: 1,
    transform: `translateX(-${currentScreen * 100}%)`,
    from: { opacity: 1, transform: `translateX(-${currentScreen * 100}%)` },
  });

  const swipeHandlers = useSwipeable({
    onSwipedLeft: handleNext,
    onSwipedRight: handlePrevious,
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-theme-bg" {...swipeHandlers}>
      {/* Onboarding Screens */}
      <div className="flex-grow relative overflow-hidden">
        <animated.div style={animationProps} className="flex transition-transform duration-500 ease-in-out w-full">
          {onboardingScreens.map((screen) => (
            <div key={screen.id} className="w-full flex-shrink-0 flex flex-col items-center justify-center p-4">
              {screen.type === "component" ? (
                <div className="flex-1">{screen.component}</div>
              ) : (
                <>
                  {screen.image && <img src={screen.image} alt={screen.title} className="w-64 h-64 mb-8 rounded-lg shadow-lg" />}
                  <p className="text-center mt-10 mb-4 text-theme-text">{screen.description}</p>
                </>
              )}
            </div>
          ))}
        </animated.div>
      </div>

      {/* Dot Indicators */}
      <div className="flex justify-center space-x-2 mb-4">
        {onboardingScreens.map((_, index) => (
          <div key={index} className={`w-2 h-2 rounded-full ${index === currentScreen ? "bg-theme-accent" : "bg-gray-300"}`} />
        ))}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between px-4 pb-3">
        {currentScreen < onboardingScreens.length - 1 ? (
          <button onClick={handleSkip} className="text-gray-400 hover:text-gray-900">{t("skip")}</button>
        ) : (
          <div></div>
        )}
        {currentScreen < onboardingScreens.length - 1 ? (
          <button onClick={handleNext} className="bg-theme-accent text-white px-6 py-1 rounded-lg">{t("next")}</button>
        ) : (
          <button onClick={handleStart} className="bg-theme-accent text-white px-6 py-1 rounded-lg">{t("start")}</button>
        )}
      </div>
    </div>
  );
};

export default OnboardingScreenPage;

import React, { useContext } from "react";
import { Typewriter } from "react-simple-typewriter";
import { ThemeContext } from "../context/ThemeContext";

export const Achievements = () => {
  const { theme } = useContext(ThemeContext);

  // Achievements data
  const achievements = [
    {
      id: 1,
      title: "10,000 Trees Planted",
      description:
        "Our community members have collectively planted over 10,000 trees in their local communities.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-12 w-12 text-green-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
          />
        </svg>
      ),
      progress: 100
    },
    {
      id: 2,
      title: "5,000 Garden Tips Shared",
      description:
        "Members have contributed thousands of gardening tips to help each other grow successfully.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-12 w-12 text-blue-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
          />
        </svg>
      ),
      progress: 100
    },
    {
      id: 3,
      title: "Wildlife Garden Challenge",
      description:
        "Creating gardens that support local wildlife and pollinators. Join our effort to reach 500 wildlife-friendly gardens.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-12 w-12 text-orange-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      ),
      progress: 65
    },
    {
      id: 4,
      title: "Community Composting",
      description:
        "Join 250 members already diverting garden waste from landfills through community composting initiatives.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-12 w-12 text-yellow-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
          />
        </svg>
      ),
      progress: 80
    }
  ];

  return (
    <div
      className={`p-12 transition-colors duration-200 ${theme === "dark"
        ? "bg-[#192837]"
        : "bg-gray-100"}`}
    >
      <div className="text-center mb-12">
        <h2
          className={`text-3xl md:text-4xl font-bold mb-3 transition-colors duration-200 ${theme ===
          "dark"
            ? "text-white"
            : "text-gray-900"}`}
        >
          Community Achievements
        </h2>
        <div className="flex justify-center">
          <div className="w-24 h-1 bg-primary rounded-full" />
        </div>
        <p
          className={`mt-4 text-lg max-w-2xl mx-auto transition-colors duration-200 ${theme ===
          "dark"
            ? "text-gray-300"
            : "text-gray-600"}`}
        >
          <Typewriter
            words={[
              "Together we're making the world greener, one garden at a time.",
              "Celebrating our community's environmental impact.",
              "Join us in creating a more sustainable future.",
              "Small actions add up to big environmental changes."
            ]}
            loop={true}
            cursor
            cursorStyle="|"
            typeSpeed={70}
            deleteSpeed={50}
            delaySpeed={1500}
          />
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {achievements.map(achievement =>
          <div
            key={achievement.id}
            className={`rounded-lg shadow-md overflow-hidden border p-6 transition-all duration-200 hover:shadow-lg ${theme ===
            "dark"
              ? "bg-gray-700 border-gray-600"
              : "bg-white border-gray-100"}`}
          >
            <div className="flex items-start space-x-4">
              <div
                className={`p-3 rounded-lg transition-colors duration-200 ${theme ===
                "dark"
                  ? "bg-gray-800"
                  : "bg-gray-100"}`}
              >
                {achievement.icon}
              </div>
              <div className="flex-1">
                <h3
                  className={`text-lg font-semibold mb-2 transition-colors duration-200 ${theme ===
                  "dark"
                    ? "text-white"
                    : "text-gray-900"}`}
                >
                  {achievement.title}
                </h3>
                <p
                  className={`mb-4 transition-colors duration-200 ${theme ===
                  "dark"
                    ? "text-gray-300"
                    : "text-gray-600"}`}
                >
                  {achievement.description}
                </p>
                <div
                  className={`w-full rounded-full h-4 mb-2 transition-colors duration-200 ${theme ===
                  "dark"
                    ? "bg-gray-600"
                    : "bg-gray-200"}`}
                >
                  <div
                    className={`bg-primary h-4 rounded-full transition-all duration-500 ease-in-out`}
                    style={{
                      width: `${achievement.progress}%`,
                      boxShadow:
                        theme === "dark"
                          ? "0 0 8px rgba(93, 92, 222, 0.6)"
                          : "none"
                    }}
                  />
                </div>
                <div
                  className={`text-sm text-right transition-colors duration-200 ${theme ===
                  "dark"
                    ? "text-gray-400"
                    : "text-gray-500"}`}
                >
                  {achievement.progress}% complete
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

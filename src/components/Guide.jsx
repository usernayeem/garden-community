import React from "react";

export const Guide = () => {
  const seasons = [
    {
      id: 1,
      name: "Spring",
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
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
          />
        </svg>
      ),
      description:
        "Awakening your garden after winter dormancy with vibrant blooms and new growth.",
      tasks: [
        "Start seeds indoors",
        "Prune shrubs and trees",
        "Prepare soil with compost",
        "Plant cool-season vegetables"
      ],
      borderColor: "border-green-200 dark:border-green-700"
    },
    {
      id: 2,
      name: "Summer",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-12 w-12 text-yellow-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      ),
      description:
        "Nurturing and maintaining your garden during the peak growing season.",
      tasks: [
        "Regular watering and mulching",
        "Harvest vegetables frequently",
        "Monitor for pests and diseases",
        "Prune flowering perennials"
      ],
      borderColor: "border-yellow-200 dark:border-yellow-700"
    },
    {
      id: 3,
      name: "Fall",
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
            d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
          />
        </svg>
      ),
      description:
        "Preparing your garden for the coming cold while enjoying the harvest season.",
      tasks: [
        "Plant spring-flowering bulbs",
        "Divide perennials",
        "Collect seeds for next year",
        "Apply fall fertilizer"
      ],
      borderColor: "border-orange-200 dark:border-orange-700"
    },
    {
      id: 4,
      name: "Winter",
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
            d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
          />
        </svg>
      ),
      description:
        "Protecting your garden during dormancy and planning for the coming spring.",
      tasks: [
        "Protect sensitive plants",
        "Plan next year's garden",
        "Maintain tools and equipment",
        "Start indoor herb garden"
      ],
      borderColor: "border-blue-200 dark:border-blue-700"
    }
  ];

  return (
    <div className="p-12 bg-gray-50 dark:bg-gray-800">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
          Seasonal Gardening Guide
        </h2>
        <div className="flex justify-center">
          <div className="w-24 h-1 bg-primary rounded-full" />
        </div>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Discover what to plant, maintain, and harvest during each season for a
          thriving garden year-round.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {seasons.map(season =>
          <div
            key={season.id}
            className={`rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1 border ${season.borderColor}`}
          >
            <div className="p-6">
              <div className="flex justify-center mb-4">
                {season.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 text-center">
                {season.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4 text-center">
                {season.description}
              </p>

              <div className="rounded-md mb-4">
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                  Key Gardening Tasks:
                </h4>
                <ul className="space-y-1">
                  {season.tasks.map((task, index) =>
                    <li key={index} className="flex items-start">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2 text-green-600 shrink-0 mt-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-gray-600 dark:text-gray-300">
                        {task}
                      </span>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

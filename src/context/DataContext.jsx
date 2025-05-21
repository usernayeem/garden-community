import { createContext, useEffect, useState } from "react";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [data, setData] = useState({
    gardeners: [],
    tips: [],
    error: null
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [gardenersResponse, tipsResponse] = await Promise.all([
          fetch("http://localhost:3000/gardeners"),
          fetch("http://localhost:3000/tips")
        ]);

        if (!gardenersResponse.ok || !tipsResponse.ok) {
          throw new Error("Network response was not ok");
        }

        const [gardenersData, tipsData] = await Promise.all([
          gardenersResponse.json(),
          tipsResponse.json()
        ]);

        setData({ gardeners: gardenersData, tips: tipsData, error: null });
      } catch (error) {
        setData(prevData => ({ ...prevData, error: error.message }));
        console.error("Fetch error:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <DataContext.Provider value={data}>
      {children}
    </DataContext.Provider>
  );
};

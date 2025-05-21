import { createContext, useEffect, useState } from "react";

export const DataContext = createContext();
export const DataProvider = ({ children }) => {
  const [gardeners, setGardeners] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/gardeners");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setGardeners(data);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <DataContext.Provider value={{ gardeners, setGardeners }}>
      {children}
    </DataContext.Provider>
  );
};

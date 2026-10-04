import { createContext, useState } from "react";


export const InstagramContext = createContext<any>(null);



export function InstagramProvider({ children }: any) {


  // =========================
  // SAVED ANALYTICS
  // =========================

  const savedAnalytics =
    localStorage.getItem("instagramAnalytics");


  const [analytics, setAnalyticsState] =
    useState(
      savedAnalytics
        ? JSON.parse(savedAnalytics)
        : null
    );


  // =========================
  // RAW INSTAGRAM DATA
  // =========================

  const [instagramData, setInstagramData] =
    useState<any>(null);


  // =========================
  // SELECTED YEAR
  // =========================
  //
  // null = all years
  //

  const [selectedYear, setSelectedYear] =
    useState<number | null>(null);


  // =========================
  // SET ANALYTICS
  // =========================

  function setAnalytics(data: any) {

    localStorage.setItem(
      "instagramAnalytics",
      JSON.stringify(data)
    );


    setAnalyticsState(data);

  }


  return (

    <InstagramContext.Provider

      value={{

        analytics,
        setAnalytics,

        instagramData,
        setInstagramData,

        selectedYear,
        setSelectedYear

      }}

    >

      {children}

    </InstagramContext.Provider>

  );

}
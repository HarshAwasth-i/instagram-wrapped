import {
  createContext,
  useEffect,
  useState
} from "react";


export const InstagramContext =
  createContext<any>(null);


// =========================
// INDEXED DB CONFIG
// =========================

const DB_NAME =
  "instagram-wrapped-db";

const STORE_NAME =
  "instagram-data";

const DATA_KEY =
  "parsed-instagram-data";


// =========================
// OPEN DATABASE
// =========================

function openDatabase(): Promise<IDBDatabase> {

  return new Promise((resolve, reject) => {

    const request =
      indexedDB.open(DB_NAME, 1);


    request.onupgradeneeded = () => {

      const db =
        request.result;

      if (
        !db.objectStoreNames.contains(
          STORE_NAME
        )
      ) {

        db.createObjectStore(
          STORE_NAME
        );

      }

    };


    request.onsuccess = () => {

      resolve(request.result);

    };


    request.onerror = () => {

      reject(request.error);

    };

  });

}


// =========================
// SAVE DATA
// =========================

async function saveInstagramData(
  data: any
) {

  try {

    const db =
      await openDatabase();


    return new Promise<void>(
      (resolve, reject) => {

        const transaction =
          db.transaction(
            STORE_NAME,
            "readwrite"
          );


        const store =
          transaction.objectStore(
            STORE_NAME
          );


        store.put(
          data,
          DATA_KEY
        );


        transaction.oncomplete = () => {

          db.close();

          resolve();

        };


        transaction.onerror = () => {

          db.close();

          reject(
            transaction.error
          );

        };

      }
    );

  } catch (error) {

    console.error(
      "Failed to save Instagram data:",
      error
    );

  }

}


// =========================
// LOAD DATA
// =========================

async function loadInstagramData() {

  try {

    const db =
      await openDatabase();


    return new Promise<any>(
      (resolve, reject) => {

        const transaction =
          db.transaction(
            STORE_NAME,
            "readonly"
          );


        const store =
          transaction.objectStore(
            STORE_NAME
          );


        const request =
          store.get(DATA_KEY);


        request.onsuccess = () => {

          db.close();

          resolve(
            request.result || null
          );

        };


        request.onerror = () => {

          db.close();

          reject(request.error);

        };

      }
    );

  } catch (error) {

    console.error(
      "Failed to load Instagram data:",
      error
    );

    return null;

  }

}


// =========================
// PROVIDER
// =========================

export function InstagramProvider({
  children
}: any) {


  // =========================
  // SAVED ANALYTICS
  // =========================

  const savedAnalytics =
    localStorage.getItem(
      "instagramAnalytics"
    );


  // =========================
  // SAVED YEAR
  // =========================

  const savedYear =
    localStorage.getItem(
      "instagramSelectedYear"
    );


  const [analytics, setAnalyticsState] =
    useState(
      savedAnalytics
        ? JSON.parse(savedAnalytics)
        : null
    );


  const [
    instagramData,
    setInstagramDataState
  ] = useState<any>(null);


  const [
    selectedYear,
    setSelectedYearState
  ] = useState<number | null>(
    savedYear
      ? Number(savedYear)
      : null
  );


  // =========================
  // LOAD INSTAGRAM DATA
  // =========================

  useEffect(() => {

    async function restoreData() {

      const savedData =
        await loadInstagramData();


      if (savedData) {

        setInstagramDataState(
          savedData
        );

      }

    }


    restoreData();

  }, []);


  // =========================
  // SET ANALYTICS
  // =========================

  function setAnalytics(
    data: any
  ) {

    localStorage.setItem(
      "instagramAnalytics",
      JSON.stringify(data)
    );


    setAnalyticsState(data);

  }


  // =========================
  // SET INSTAGRAM DATA
  // =========================

  function setInstagramData(
    data: any
  ) {

    setInstagramDataState(data);

    saveInstagramData(data);

  }


  // =========================
  // SET SELECTED YEAR
  // =========================

  function setSelectedYear(
    year: number | null
  ) {

    if (year === null) {

      localStorage.removeItem(
        "instagramSelectedYear"
      );

    } else {

      localStorage.setItem(
        "instagramSelectedYear",
        String(year)
      );

    }


    setSelectedYearState(year);

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
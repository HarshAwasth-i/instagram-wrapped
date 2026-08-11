import { createContext, useState } from "react";


export const InstagramContext = createContext<any>(null);



export function InstagramProvider({children}:any){


const savedAnalytics =
localStorage.getItem("instagramAnalytics");



const [analytics,setAnalyticsState] =
useState(
savedAnalytics 
? JSON.parse(savedAnalytics)
: null
);



const [instagramData,setInstagramData] =
useState<any>(null);



function setAnalytics(data:any){


localStorage.setItem(
"instagramAnalytics",
JSON.stringify(data)
);


setAnalyticsState(data);


}



return(

<InstagramContext.Provider

value={{
analytics,
setAnalytics,
instagramData,
setInstagramData
}}

>

{children}

</InstagramContext.Provider>

)


}
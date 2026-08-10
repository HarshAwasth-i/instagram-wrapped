import { createContext, useState } from "react";


export const InstagramContext = createContext<any>(null);



export function InstagramProvider({children}:any){


const saved =
localStorage.getItem("instagramAnalytics");



const [analytics,setAnalyticsState] =
useState<any>(
saved ? JSON.parse(saved) : null
);



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
setAnalytics
}}

>

{children}

</InstagramContext.Provider>

)

}
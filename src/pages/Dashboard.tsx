import { useContext, useState } from "react";

import { InstagramContext } from "../context/InstagramContext";

import DashboardHeader from "../components/dashboard/DashboardHeader";
import CategoryTabs from "../components/dashboard/CategoryTabs";

import MessageStats from "../components/dashboard/MessageStats";
import MessageHighlights from "../components/dashboard/MessageHighlights";

import LikesSection from "../components/dashboard/LikesSection";
import ContentSection from "../components/dashboard/ContentSection";
import ConnectionsSection from "../components/sections/ConnectionsSection";
import PersonalitySection from "../components/sections/PersonalitySection";


function Dashboard(){


const {analytics}=useContext(InstagramContext);


const [activeTab,setActiveTab]=useState("Messages");



if(!analytics){

return(

<div className="text-white">

Upload Instagram ZIP first

</div>

)

}



return(


<div className="
min-h-screen
bg-black
text-white
">


<DashboardHeader/>


<CategoryTabs
activeTab={activeTab}
setActiveTab={setActiveTab}
/>



<div className="
px-10
mt-10
">


{
activeTab==="Messages" && (

<>

<h2 className="
text-4xl
font-bold
text-center
">

💬 Messages

</h2>


<MessageStats/>

<MessageHighlights/>

</>

)

}




{
activeTab==="Likes" && (

<LikesSection/>

)

}




{
activeTab==="Content" && (

<ContentSection/>

)

}




{
activeTab==="Connections" && (

<ConnectionsSection/>

)
}




{
activeTab==="Personality" && (

<PersonalitySection/>

)
}



</div>


</div>


)


}


export default Dashboard;
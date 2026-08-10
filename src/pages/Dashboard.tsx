import { useContext } from "react";

import { InstagramContext } from "../context/InstagramContext";

import ActivityChart from "../components/ActivityChart";

import IntroStory from "../components/stories/IntroStory";
import FollowersStory from "../components/stories/FollowersStory";


function Dashboard(){

const {analytics} = useContext(InstagramContext);



if(!analytics){

return(

<div className="
h-screen
flex
items-center
justify-center
bg-black
text-white
text-3xl
">

Upload your Instagram ZIP first 🚀

</div>

)

}



return(

<div className="relative">


{/* Back Button */}

<button

onClick={()=>{
window.location.href="/upload";
}}

className="
fixed
top-6
left-6
z-50
bg-white
text-black
px-5
py-2
rounded-full
font-semibold
hover:scale-105
transition
"

>

← Upload Again

</button>



{/* Intro */}

<IntroStory />



{/* Followers */}

<FollowersStory

count={analytics.followersCount}

/>



{/* Chart */}

<div className="
bg-black
min-h-screen
p-10
">

<ActivityChart />

</div>



</div>

)

}


export default Dashboard;
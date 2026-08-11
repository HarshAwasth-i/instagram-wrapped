import { useState } from "react";

import IntroStory from "./stories/IntroStory";
import FollowersStory from "./stories/FollowersStory";
import LikesStory from "./stories/LikesStory";
import MessagesStory from "./stories/MessagesStory";
import FriendStory from "./stories/FriendStory";
import PersonalityStory from "./stories/PersonalityStory";
import { AnimatePresence, motion } from "framer-motion";


function StoryFlow({analytics}:any){


const [index,setIndex]=useState(0);



const stories=[


<IntroStory/>,

<FollowersStory
count={analytics.followersCount}
/>,


<LikesStory
count={analytics.likesGiven}
/>,


<MessagesStory
count={analytics.messagesCount}
/>,


<FriendStory
name={analytics.topFriend}
/>,


<PersonalityStory
personality={analytics.personality}
/>


];




function next(){

setIndex(
(prev)=>
(prev+1)%stories.length
);

}




function previous(){

setIndex(
(prev)=>
(prev-1+stories.length)%stories.length
);

}



return(

<div className="
relative
h-screen
overflow-hidden
">


{/* Progress Bars */}

<div className="
fixed
top-5
left-5
right-5
flex
gap-2
z-50
">

{

stories.map((_,i)=>(


<div

key={i}

className="
h-1
flex-1
bg-white/30
rounded
"

>

<div

className={`
h-full
bg-white
transition-all
${i<=index?"w-full":"w-0"}
`}

/>


</div>


))

}

</div>




<AnimatePresence mode="wait">


<motion.div

key={index}

initial={{
opacity:0,
x:100
}}

animate={{
opacity:1,
x:0
}}

exit={{
opacity:0,
x:-100
}}

transition={{
duration:0.5
}}

onClick={next}

>


{stories[index]}


</motion.div>


</AnimatePresence>




<button

onClick={previous}

className="
fixed
left-5
bottom-10
z-50
text-white
"

>

←

</button>




<button

onClick={next}

className="
fixed
right-5
bottom-10
z-50
text-white
"

>

→

</button>



</div>

)

}


export default StoryFlow;
import { useContext } from "react";
import { InstagramContext } from "../../context/InstagramContext";


function PersonalitySection(){

const {analytics}=useContext(InstagramContext);


if(!analytics)
return null;



const personalities=[


{
title:"Social Builder",
emoji:"🧱",
description:"Maintains many active conversations",
condition: analytics.messagesCount > 10000
},


{
title:"Like Machine",
emoji:"❤️",
description:"Shows love across Instagram",
condition: analytics.likesGiven > 20000
},


{
title:"Silent Observer",
emoji:"👀",
description:"Likes more than talks",
condition:
analytics.likesGiven > analytics.sentMessages
},


{
title:"Ghost Poster",
emoji:"👻",
description:"Rarely posts but always online",
condition:
analytics.postsCount < 5
},


{
title:"Loyal Friend",
emoji:"💕",
description:"Has a bestie they message constantly",
condition:
analytics.topFriend
}



];



return(


<div className="
space-y-10
">


<h1 className="
text-5xl
font-bold
text-center
text-[#e8dcc0]
">

🏆 YOUR PERSONALITY

</h1>


<p className="
text-center
text-xl
text-gray-400
">

Based on your Instagram activity

</p>




<div className="
grid
grid-cols-2
gap-8
">


{

personalities
.filter(item => item.condition)
.map(
(item,index)=>(


<div
key={index}
className="
bg-black/40
border
border-white/10
rounded-2xl
p-10
"
>


<div className="text-6xl">

{item.emoji}

</div>



<h2 className="
text-3xl
text-[#e8dcc0]
mt-5
">

{item.title}

</h2>



<div className="
text-yellow-400
text-2xl
mt-3
">

⭐⭐⭐⭐⭐

</div>



<p className="
text-gray-300
mt-5
text-lg
">

{item.description}

</p>


</div>


)


)

}


</div>



</div>


)

}


export default PersonalitySection;
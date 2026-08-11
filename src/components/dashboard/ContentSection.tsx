import { useContext } from "react";
import { InstagramContext } from "../../context/InstagramContext";


function ContentSection(){

const {analytics}=useContext(InstagramContext);


if(!analytics)
return null;



const months=[
"J","F","M","A","M","J",
"J","A","S","O","N","D"
];


const maxValue=Math.max(

...analytics.contentTimeline.posts,
...analytics.contentTimeline.stories,
...analytics.contentTimeline.reels

);



return(

<div className="space-y-10">



{/* TOP CARDS */}

<div className="
grid
grid-cols-3
gap-8
">


{
[
["🎞","REELS POSTED",analytics.reelsCount],
["▣","POSTS SHARED",analytics.postsCount],
["📖","STORIES SHARED",analytics.storiesCount]

].map((item:any,index:number)=>(


<div
key={index}
className="
bg-white/5
border
border-white/10
rounded-3xl
p-10
text-center
"
>


<div className="text-5xl">

{item[0]}

</div>



<h2 className="
mt-6
text-xl
font-bold
text-gray-300
">

{item[1]}

</h2>



<h1 className="
text-6xl
font-bold
text-[#c8d84b]
mt-5
">

{item[2]}

</h1>



</div>


))

}


</div>








{/* CONTENT TIMELINE */}



<div className="
bg-white/5
border
border-white/10
rounded-3xl
p-10
">


<h2 className="
text-3xl
font-bold
text-[#c8d84b]
mb-10
">

CONTENT TIMELINE

</h2>





{/* LEGEND */}


<div className="
flex
justify-center
gap-8
mb-10
text-gray-300
">


<div className="flex gap-2 items-center">

<div className="
w-5
h-5
bg-gray-500
rounded
"/>

Reels

</div>



<div className="flex gap-2 items-center">

<div className="
w-5
h-5
bg-[#c8d84b]
rounded
"/>

Posts

</div>



<div className="flex gap-2 items-center">

<div className="
w-5
h-5
bg-[#e8d3a5]
rounded
"/>

Stories

</div>



</div>







{/* CHART */}



<div className="
h-80
flex
items-end
gap-5
">


{
months.map((month,index)=>(


<div
key={index}
className="
flex-1
flex
flex-col
items-center
gap-3
"
>


<div className="
h-64
flex
items-end
gap-1
">


{/* REELS */}

<div

style={{
height:
`${(analytics.contentTimeline.reels[index]/maxValue)*100}%`
}}

className="
w-3
bg-gray-500
rounded-t
min-h-[2px]
"

/>




{/* POSTS */}


<div

style={{
height:
`${(analytics.contentTimeline.posts[index]/maxValue)*100}%`
}}

className="
w-3
bg-[#c8d84b]
rounded-t
min-h-[2px]
"

/>




{/* STORIES */}


<div

style={{
height:
`${(analytics.contentTimeline.stories[index]/maxValue)*100}%`
}}

className="
w-3
bg-[#e8d3a5]
rounded-t
min-h-[2px]
"

/>


</div>




<span className="
text-gray-300
font-bold
">

{month}

</span>



</div>


))

}


</div>



</div>








{/* HIGHLIGHTS */}



<div className="
grid
grid-cols-2
gap-8
">


<div className="
bg-white/5
border
border-white/10
rounded-2xl
p-8
">


<h2 className="
text-xl
font-bold
text-gray-300
">

📅 MOST ACTIVE POSTING MONTH

</h2>



<h1 className="
text-5xl
text-[#c8d84b]
font-bold
mt-5
">

{analytics.mostActiveMonth}

</h1>


</div>






<div className="
bg-white/5
border
border-white/10
rounded-2xl
p-8
">


<h2 className="
text-xl
font-bold
text-gray-300
">

📈 PEAK STORY MONTH

</h2>



<h1 className="
text-5xl
text-[#c8d84b]
font-bold
mt-5
">

{analytics.peakStoryMonth}

</h1>



</div>



</div>





</div>

)

}


export default ContentSection;
import { useContext } from "react";
import { InstagramContext } from "../../context/InstagramContext";


function LikesSection(){

const {analytics}=useContext(InstagramContext);


if(!analytics)
return null;



const months=[
"Jan","Feb","Mar","Apr",
"May","Jun","Jul","Aug",
"Sep","Oct","Nov","Dec"
];


const maxMonth=Math.max(...analytics.likesPerMonth);



const maxHour=Math.max(...analytics.likeActivity);



return(

<div className="space-y-10">


{/* HERO CARD */}

<div className="
bg-white/5
border
border-white/10
rounded-3xl
p-12
text-center
">

<div className="
text-6xl
mb-5
">
♡
</div>


<h2 className="
text-gray-300
text-xl
tracking-widest
font-bold
">

TOTAL LIKES GIVEN

</h2>


<h1 className="
text-7xl
font-bold
text-[#c8ff00]
mt-5
">

{analytics.likesGiven.toLocaleString()}

</h1>


</div>





{/* MONTHLY LIKES */}


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
mb-8
text-[#c8d84b]
">

LIKES PER MONTH

</h2>



<div className="space-y-5">


{
analytics.likesPerMonth.map(
(value:number,index:number)=>(

<div 
key={index}
className="
flex
items-center
gap-5
">


<span className="
w-12
text-gray-300
font-bold
">

{months[index]}

</span>



<div className="
flex-1
h-8
bg-white/10
rounded
overflow-hidden
">


<div

style={{
width:`${(value/maxMonth)*100}%`
}}

className="
h-full
bg-[#c8d84b]
"
/>


</div>



<span className="
w-16
text-right
text-white
">

{value}

</span>


</div>

)

)

}


</div>


</div>







{/* LIKE ACTIVITY */}


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
mb-10
text-[#c8d84b]
">

LIKE ACTIVITY BY HOUR

</h2>



<div className="
flex
items-end
gap-3
h-48
">


{
analytics.likeActivity.map(
(value:number,index:number)=>(


<div
key={index}
className="
flex-1
flex
flex-col
items-center
gap-2
">


<div

style={{
height:`${(value/maxHour)*100}%`
}}

className="
w-full
bg-pink-500
rounded-t-lg
min-h-[5px]
"
/>



<span className="
text-xs
text-gray-400
">

{
index%6===0
?
index
:
""
}

</span>


</div>


)

)

}


</div>


</div>








{/* TOP LIKED ACCOUNTS */}



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
mb-8
text-[#c8d84b]
">

TOP LIKED ACCOUNTS

</h2>



<div className="space-y-5">


{
analytics.topLikedAccounts.map(
(item:any,index:number)=>(


<div

key={index}

className="
flex
items-center
justify-between
bg-black/40
border
border-white/10
rounded-xl
p-5
"


>


<div className="
flex
items-center
gap-5
">


<div className="
bg-[#c8d84b]
text-black
font-bold
w-10
h-10
rounded-lg
flex
items-center
justify-center
">

{index+1}

</div>



<span className="
text-xl
font-bold
">

{item.username}

</span>


</div>



<div className="
text-xl
text-white
">

♡ {item.count}

</div>


</div>


)

)

}


</div>


</div>



</div>


)

}


export default LikesSection;
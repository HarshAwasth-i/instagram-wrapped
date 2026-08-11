import { useContext } from "react";
import { InstagramContext } from "../../context/InstagramContext";


function ConnectionsSection(){

const {analytics}=useContext(InstagramContext);


if(!analytics)
return null;



return(

<div className="space-y-12">


{/* HEADER */}

<div
className="
text-center
text-5xl
font-bold
text-[#e8dcc0]
"
>

👥 Connections

</div>





{/* CONNECTION CARDS */}

<div
className="
grid
grid-cols-4
gap-6
"
>



{
[
{
icon:"👥",
title:"Followers",
value:analytics.followersCount,
color:"text-lime-300"
},

{
icon:"👤+",
title:"New",
value:analytics.newFollowers,
color:"text-green-400"
},

{
icon:"📈",
title:"Following",
value:analytics.followingCount,
color:"text-[#e8dcc0]"
},

{
icon:"👥",
title:"Mutuals",
value:`≈${analytics.mutualFollowers}`,
color:"text-[#e8dcc0]"
}

].map((card,index)=>(


<div
key={index}
className="
bg-black/40
border
border-white/10
rounded-2xl
p-8
text-center
hover:bg-white/5
transition
"
>


<div className="text-5xl">
{card.icon}
</div>


<h2
className="
mt-5
text-xl
text-[#d8cfb5]
"
>

{card.title}

</h2>


<p
className={`
text-5xl
font-bold
mt-4
${card.color}
`}
>

{card.value}

</p>


</div>


))

}



</div>







{/* SEARCH BEHAVIOR */}


<div
className="
bg-black/40
border
border-white/10
rounded-2xl
p-10
grid
grid-cols-2
gap-10
"
>



<div>


<h2
className="
text-3xl
text-[#d8cfb5]
"
>

🔍 Search Behavior

</h2>


<p
className="
text-6xl
font-bold
text-white
mt-8
"
>

{analytics.totalSearches}

</p>


<p
className="
text-gray-400
text-xl
mt-2
"
>

Total Searches

</p>


</div>






<div>


<h2
className="
text-3xl
text-[#d8cfb5]
"
>

TOP SEARCHED

</h2>



<ol
className="
mt-8
space-y-5
text-xl
text-[#e8dcc0]
"
>


{

analytics.topSearches.length ?

analytics.topSearches.map(
(item:any,index:number)=>(

<li
key={index}
>

{index+1}. {item.username}

</li>

)

)

:

<p className="text-gray-500">

No search data

</p>


}



</ol>


</div>



</div>







{/* LOGIN ACTIVITY */}



<div
className="
bg-black/40
border
border-white/10
rounded-2xl
p-10
"
>



<h2
className="
text-3xl
text-[#d8cfb5]
"
>

📱 LOGIN ACTIVITY

</h2>





<div
className="
grid
grid-cols-3
gap-10
mt-10
"
>



<div>


<p
className="
text-5xl
font-bold
text-white
"
>

{analytics.totalLogins}

</p>


<p className="text-gray-400">

Total Logins

</p>


</div>







<div>


<p
className="
text-5xl
font-bold
text-white
"
>

{analytics.devicesUsed || "—"}

</p>


<p className="text-gray-400">

Devices Used

</p>


</div>







<div
className="
flex
items-center
justify-center
"
>


<div
className="
border
border-[#e8dcc0]
rounded-xl
px-8
py-5
text-center
"
>


<p
className="
text-xl
text-[#e8dcc0]
"
>

📱

</p>


<p
className="
text-xl
text-[#e8dcc0]
"
>

{
analytics.loginDevices?.length
?
"Recent Activity"
:
"Not Available"
}

</p>


<p
className="
text-gray-400
mt-2
"
>

Most Used

</p>


</div>



</div>




</div>






{/* DEVICE TAGS */}


<div
className="
flex
gap-4
mt-8
"
>


{
analytics.loginDevices?.length
?
analytics.loginDevices
.slice(0,3)
.map((date:string,index:number)=>(

<div
key={index}
className="
bg-white/10
rounded-xl
p-4
text-center
"
>

📱

<p className="text-sm mt-2">
{date}
</p>

</div>

))
:
null
}



</div>




</div>





</div>

)


}


export default ConnectionsSection;
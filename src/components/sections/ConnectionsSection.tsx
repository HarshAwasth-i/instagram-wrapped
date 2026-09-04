import { useContext } from "react";
import { InstagramContext } from "../../context/InstagramContext";


function ConnectionsSection(){

const {analytics}=useContext(InstagramContext);


if(!analytics)
return null;


return(

<div className="space-y-12 pb-20">


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
grid-cols-1
md:grid-cols-2
lg:grid-cols-4
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


<h2 className="
mt-5
text-xl
text-[#d8cfb5]
">

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
grid-cols-1
md:grid-cols-2
gap-10
"
>



<div>

<h2
className="
text-3xl
text-[#d8dcc0]
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


<p className="
text-gray-400
text-xl
mt-2
">

Total Searches

</p>


</div>





<div>


<h2
className="
text-3xl
text-[#d8dcc0]
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

<li key={index}>

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
text-[#d8dcc0]
"
>

📱 LOGIN ACTIVITY

</h2>





<div
className="
grid
grid-cols-1
md:grid-cols-3
gap-10
mt-10
"
>



<div>

<p className="
text-5xl
font-bold
text-white
">

{analytics.totalLogins}

</p>


<p className="text-gray-400">

Total Logins

</p>


</div>





<div>

<p className="
text-5xl
font-bold
text-white
">

—

</p>


<p className="text-gray-400">

Devices Used

</p>


</div>






<div
className="
border
border-[#e8dcc0]
rounded-xl
p-6
text-center
"
>


<p className="
text-3xl
">

📱

</p>


<p className="
text-[#e8dcc0]
text-xl
mt-2
">

Recent Activity

</p>


<p className="
text-gray-400
mt-2
">

Latest logins

</p>


</div>




</div>







{/* RECENT LOGIN TAGS */}


<div
className="
grid
grid-cols-1
md:grid-cols-3
gap-5
mt-10
"
>


{
analytics.loginDevices?.slice(0,3)
.map(
(date:string,index:number)=>(


<div
key={index}
className="
bg-white/10
rounded-xl
p-5
text-center
"
>

<p className="text-2xl">
📱
</p>


<p
className="
text-lg
text-[#e8dcc0]
mt-3
"
>
{
new Date(date).toLocaleDateString(
"en-US",
{
month:"long",
day:"numeric",
year:"numeric"
}
)
}
</p>


<p
className="
text-sm
text-gray-400
mt-1
"
>
{
new Date(date).toLocaleTimeString(
"en-US",
{
hour:"numeric",
minute:"2-digit"
}
)
}
</p>


<p
className="
text-xs
text-gray-500
mt-2
"
>
Login #{index+1}
</p>


</div>


)

)

}



</div>



</div>




</div>


)


}


export default ConnectionsSection;
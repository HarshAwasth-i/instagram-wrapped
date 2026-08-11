import { useContext } from "react";
import { InstagramContext } from "../../context/InstagramContext";


function ConnectionsSection(){

const {analytics}=useContext(InstagramContext);


if(!analytics)
return null;



return(

<div className="space-y-10">


{/* Header */}

<div className="
text-center
text-4xl
font-bold
text-[#e8dcc0]
">

👥 Connections

</div>





{/* Top Cards */}

<div className="
grid
grid-cols-4
gap-6
">


{/* Followers */}

<div className="
bg-black/40
border
border-white/10
rounded-2xl
p-8
text-center
">

<div className="text-5xl">
👥
</div>


<h2 className="
mt-4
text-[#d8cfb5]
text-xl
">

Followers

</h2>


<p className="
text-5xl
text-lime-300
font-bold
mt-4
">

{analytics.followersCount}

</p>


</div>





{/* New Followers */}

<div className="
bg-black/40
border
border-white/10
rounded-2xl
p-8
text-center
">


<div className="text-5xl">
👤+
</div>


<h2 className="
mt-4
text-[#d8cfb5]
text-xl
">

New

</h2>


<p className="
text-5xl
text-green-400
font-bold
mt-4
">

{analytics.newFollowers}

</p>


</div>






{/* Following */}

<div className="
bg-black/40
border
border-white/10
rounded-2xl
p-8
text-center
">


<div className="text-5xl">
📈
</div>


<h2 className="
mt-4
text-[#d8cfb5]
text-xl
">

Following

</h2>


<p className="
text-5xl
text-[#e8dcc0]
font-bold
mt-4
">

{analytics.followingCount}

</p>


</div>






{/* Mutual */}

<div className="
bg-black/40
border
border-white/10
rounded-2xl
p-8
text-center
">


<div className="text-5xl">
👥
</div>


<h2 className="
mt-4
text-[#d8cfb5]
text-xl
">

Mutuals

</h2>


<p className="
text-5xl
text-[#e8dcc0]
font-bold
mt-4
">

≈{analytics.mutualFollowers}

</p>


</div>



</div>






{/* Search Section */}

<div className="
bg-black/40
border
border-white/10
rounded-2xl
p-10
grid
grid-cols-2
gap-10
">



<div>


<h2 className="
text-3xl
text-[#d8cfb5]
">

🔍 Search Behavior

</h2>



<p className="
text-6xl
text-white
mt-8
">

{analytics.totalSearches}

</p>



<p className="
text-gray-400
text-xl
">

Total Searches

</p>


</div>





<div>


<h2 className="
text-3xl
text-[#d8cfb5]
">

TOP SEARCHED

</h2>



<ol className="
mt-8
space-y-4
text-xl
">


{
analytics.topSearches.map(
(item:any,index:number)=>(

<li key={index}>

{index+1}. {item.username}

</li>

)
)

}


</ol>


</div>



</div>






{/* Login Activity */}

<div className="
bg-black/40
border
border-white/10
rounded-2xl
p-10
">


<h2 className="
text-3xl
text-[#d8cfb5]
">

📱 LOGIN ACTIVITY

</h2>



<div className="
grid
grid-cols-3
gap-10
mt-10
">


<div>

<p className="text-5xl text-white">

{analytics.totalLogins}

</p>

<p className="text-gray-400">
Total Logins
</p>

</div>



<div>

<p className="text-5xl text-white">

{analytics.devicesUsed}

</p>

<p className="text-gray-400">
Devices Used
</p>

</div>




<div>

<p className="text-3xl text-[#e8dcc0]">

{analytics.mostUsedDevice || "Unknown"}

</p>


<p className="text-gray-400">
Most Used
</p>


</div>



</div>


</div>






</div>

)


}


export default ConnectionsSection;
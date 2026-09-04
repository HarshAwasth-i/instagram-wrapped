import { useContext } from "react";
import { InstagramContext } from "../../context/InstagramContext";


function TopFriends(){

const {analytics}=useContext(InstagramContext);


if(!analytics)
return null;



return(

<div
className="
bg-black/40
border
border-white/10
rounded-2xl
p-10
mt-10
"
>


<h2
className="
text-3xl
font-bold
text-[#e8dcc0]
mb-8
"
>

🏆 TOP 5 MOST MESSAGED PEOPLE 🏆

</h2>



<div className="space-y-5">


{
analytics.topFriends?.length
?

analytics.topFriends.map(
(friend:any,index:number)=>(


<div
key={index}
className="
flex
justify-between
items-center
bg-white/5
rounded-xl
p-5
"
>


<div
className="
flex
items-center
gap-5
"
>


<div
className="
text-3xl
"
>

{
index===0
?
"👑"
:
index===1
?
"🥈"
:
index===2
?
"🥉"
:
"⭐"
}

</div>


<p
className="
text-xl
text-[#e8dcc0]
"
>

{friend.name}

</p>


</div>



<p
className="
text-xl
text-lime-300
font-bold
"
>

{friend.count}

</p>



</div>


)

)

:

<p className="text-gray-500">

No conversations found

</p>

}


</div>



</div>


)

}


export default TopFriends;
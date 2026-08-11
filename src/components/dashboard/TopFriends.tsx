import { useContext } from "react";
import { InstagramContext } from "../../context/InstagramContext";
import {cleanText} from "../../utils/cleanText";


function TopFriends(){

const {analytics}=useContext(InstagramContext);


if(!analytics?.topFriends)
return null;



const total = analytics.messagesCount;



return(

<div
className="
mt-10
bg-white/5
border
border-white/10
rounded-2xl
p-8
"
>


<h2
className="
text-3xl
font-bold
text-lime-400
mb-8
text-center
"
>

🏆 TOP 5 MOST MESSAGED PEOPLE 🏆

</h2>



<div
className="
space-y-6
"
>


{
analytics.topFriends.map(
(friend:any,index:number)=>(


<div
key={index}
className="
bg-black/40
border
border-white/10
rounded-xl
p-6
"
>


<div
className="
flex
justify-between
items-center
"
>


<div>

<h3
className="
text-xl
font-bold
"
>

#{index+1} {cleanText(friend.name)}

</h3>


<p
className="
text-gray-400
mt-2
"
>

{friend.count} messages

</p>

</div>



<p
className="
text-lime-400
font-bold
"
>

{
((friend.count/total)*100)
.toFixed(1)
}

%

</p>


</div>



<div
className="
mt-4
h-3
bg-white/10
rounded-full
overflow-hidden
"
>


<div

className="
h-full
bg-lime-400
"

style={{

width:
`${(friend.count/total)*100}%`

}}

>


</div>


</div>


</div>


)

)

}


</div>


</div>

)

}


export default TopFriends;
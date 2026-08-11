import { useContext } from "react";
import { InstagramContext } from "../../context/InstagramContext";


function MessageStats(){

const {analytics}=useContext(InstagramContext);


if(!analytics)
return null;



const stats=[

{
title:"Total Messages",
value:analytics.messagesCount,
emoji:"💬"
},

{
title:"Sent",
value:analytics.sentMessages,
emoji:"✈️"
},

{
title:"Received",
value:analytics.receivedMessages,
emoji:"📥"
},

{
title:"Conversations",
value:analytics.conversationCount,
emoji:"👥"
}


];



return(

<div className="
grid
grid-cols-1
md:grid-cols-2
lg:grid-cols-4
gap-6
mt-10
">


{
stats.map((item)=>(


<div

key={item.title}

className="
bg-white/5
border
border-white/10
rounded-2xl
p-8
"


>


<div className="text-4xl mb-5">

{item.emoji}

</div>



<h3 className="
text-xl
font-bold
text-white
mb-4
">

{item.title}

</h3>



<p className="
text-5xl
font-bold
text-lime-400
">

{item.value}

</p>



</div>


))

}


</div>

)

}


export default MessageStats;
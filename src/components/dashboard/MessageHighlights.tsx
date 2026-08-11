import { useContext } from "react";
import { InstagramContext } from "../../context/InstagramContext";


function MessageHighlights(){

const {analytics}=useContext(InstagramContext);



if(!analytics)
return null;



const first = analytics.firstMessage;

const last = analytics.lastMessage;



return(

<div className="
grid
grid-cols-1
md:grid-cols-2
gap-8
mt-10
">


{/* First Message */}

<div className="
bg-white/5
border
border-lime-400/40
rounded-2xl
p-8
">


<h3 className="
text-lime-400
font-bold
text-xl
mb-5
">

FIRST MESSAGE OF THE YEAR

</h3>


<p className="
text-xl
break-words
">

{first?.text || "No message found"}

</p>


<p className="
mt-5
text-gray-400
">

with {first?.friend || "Unknown"}

</p>


<p className="
text-gray-500
mt-2
">

{
first?.date
?
String(first.date).slice(0,10)
:
""
}

</p>


</div>





{/* Last Message */}


<div className="
bg-white/5
border
border-yellow-300/40
rounded-2xl
p-8
">


<h3 className="
text-yellow-300
font-bold
text-xl
mb-5
">

LAST MESSAGE OF THE YEAR

</h3>


<p className="
text-xl
break-words
">

{last?.text || "No message found"}

</p>


<p className="
mt-5
text-gray-400
">

with {last?.friend || "Unknown"}

</p>


<p className="
text-gray-500
mt-2
">

{
last?.date
?
String(last.date).slice(0,10)
:
""
}

</p>


</div>



</div>

)

}


export default MessageHighlights;
import { useContext } from "react";
import { InstagramContext } from "../../context/InstagramContext";


function MessageActivity(){

const {analytics}=useContext(InstagramContext);


if(!analytics)
return null;


const hours = analytics.hourActivity;

const max = Math.max(...hours);



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
mb-10
"
>

MESSAGE ACTIVITY BY HOUR

</h2>



<div
className="
flex
items-end
gap-3
h-52
"
>


{
hours.map((value:number,index:number)=>(


<div
key={index}
className="
flex-1
flex
flex-col
items-center
h-full
justify-end
"
>


<div

className="
w-full
rounded-lg
bg-gradient-to-t
from-pink-600
to-orange-400
transition-all
duration-500
"

style={{

height:`${(value/max)*100}%`

}}

>


</div>



<span
className="
text-xs
text-gray-400
mt-3
"
>

{
index%6===0
?
index
:
""
}


</span>



</div>


))

}


</div>



</div>

)

}


export default MessageActivity;
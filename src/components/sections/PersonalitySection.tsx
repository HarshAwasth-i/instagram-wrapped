import { useContext } from "react";
import { InstagramContext } from "../../context/InstagramContext";


function PersonalitySection(){

const {analytics}=useContext(InstagramContext);


if(!analytics)
return null;


const cards = analytics.personalityCards || [];


return(

<div className="space-y-10">


<div className="
text-center
text-4xl
font-bold
text-[#e8dcc0]
">

🏆 YOUR PERSONALITY

</div>



<div className="
text-center
text-gray-400
text-xl
">

Based on your Instagram activity

</div>



<div className="
grid
grid-cols-2
gap-8
">


{
cards.map(
(card:any,index:number)=>(


<div
key={index}
className="
bg-black/40
border
border-white/10
rounded-2xl
p-8
"
>


<div className="text-6xl">

{card.emoji}

</div>


<h2 className="
text-3xl
text-[#e8dcc0]
mt-5
">

{card.title}

</h2>


<div className="
text-yellow-300
text-2xl
mt-3
">

{"⭐".repeat(card.score)}

</div>


<p className="
text-gray-400
mt-5
">

{card.description}

</p>


</div>


)

)


}


</div>


</div>

)


}


export default PersonalitySection;
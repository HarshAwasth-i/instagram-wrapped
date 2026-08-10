import {motion} from "framer-motion";


function StoryCard({title,value,emoji}:any){

return(

<motion.div

initial={{
scale:0.8,
opacity:0
}}

animate={{
scale:1,
opacity:1
}}

transition={{
duration:0.5
}}

className="
h-[600px]
w-[350px]
rounded-3xl
bg-gradient-to-br
from-purple-500
via-pink-500
to-orange-400
flex
flex-col
items-center
justify-center
text-white
shadow-2xl
"


>


<div className="text-7xl mb-8">
{emoji}
</div>


<h1 className="
text-3xl
font-semibold
">
{title}
</h1>


<p className="
text-7xl
font-bold
mt-5
">
{value}
</p>


</motion.div>


)

}


export default StoryCard;
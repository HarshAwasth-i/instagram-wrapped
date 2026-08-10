import {motion} from "framer-motion";


function WrappedCard({title,value,emoji}:any){

return(

<motion.div

initial={{
opacity:0,
y:50
}}

animate={{
opacity:1,
y:0
}}

transition={{
duration:0.6
}}

className="
bg-white/20
backdrop-blur-xl
rounded-3xl
p-8
text-center
shadow-lg
"

>


<div className="text-5xl mb-4">
{emoji}
</div>


<h2 className="text-xl">
{title}
</h2>


<p className="
text-5xl
font-bold
mt-3
">
{value}
</p>


</motion.div>

)

}


export default WrappedCard;
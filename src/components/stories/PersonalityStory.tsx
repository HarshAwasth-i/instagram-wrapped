function PersonalityStory({personality}:any){

return(

<div

className="
h-screen
flex
items-center
justify-center
bg-gradient-to-br
from-purple-700
via-indigo-600
to-blue-700
text-white
"

>


<div className="text-center">


<div className="
text-7xl
mb-8
">

🎭

</div>



<h2 className="
text-3xl
">

Your Instagram Personality

</h2>



<h1 className="
text-5xl
font-bold
mt-8
max-w-3xl
"

>

{personality || "🌱 Quiet Observer"}

</h1>



<p className="
text-xl
mt-8
text-white/80
">

Based on your Instagram activity

</p>



</div>


</div>

)

}


export default PersonalityStory;
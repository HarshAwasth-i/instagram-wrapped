function LikesStory({count}:any){

return(

<div

className="
h-screen
flex
items-center
justify-center
bg-gradient-to-br
from-red-500
via-pink-500
to-purple-600
text-white
"

>


<div className="text-center">


<div className="
text-7xl
mb-8
">

❤️

</div>



<h2 className="
text-3xl
">

You spread love

</h2>



<h1 className="
text-8xl
font-bold
mt-5
">

{count}

</h1>



<p className="
text-2xl
mt-5
">

likes given

</p>



</div>


</div>

)

}


export default LikesStory;
function FollowersStory({count}:any){

return(

<div className="
h-screen
flex
items-center
justify-center
bg-gradient-to-br
from-purple-600
to-pink-500
text-white
">


<div className="text-center">


<h2 className="text-3xl">
You gained
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

followers 👥

</p>


</div>


</div>

)

}


export default FollowersStory;
function FriendStory({name}:any){

return(

<div

className="
h-screen
flex
items-center
justify-center
bg-gradient-to-br
from-orange-500
via-red-500
to-pink-600
text-white
"

>


<div className="text-center">


<div className="
text-7xl
mb-8
">

🔥

</div>



<h2 className="
text-3xl
">

Your closest connection

</h2>



<h1 className="
text-6xl
font-bold
mt-8
"

>

{name || "Someone special"}

</h1>



<p className="
text-2xl
mt-6
">

Your most talked-about person

</p>



</div>


</div>

)

}


export default FriendStory;
function MessagesStory({count}:any){

return(

<div

className="
h-screen
flex
items-center
justify-center
bg-gradient-to-br
from-blue-600
via-cyan-500
to-indigo-700
text-white
"

>


<div className="text-center">


<div className="
text-7xl
mb-8
">

💬

</div>



<h2 className="
text-3xl
">

You kept the conversations alive

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

messages exchanged

</p>



</div>


</div>

)

}


export default MessagesStory;
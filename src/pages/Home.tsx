import ChestUpload from "../components/upload/ChestUpload";
import Background from "../components/layout/Background";


function Home(){

return(

<Background>


<div className="
min-h-screen
flex
flex-col
items-center
justify-center
text-white
">


<h1
className="
text-5xl
md:text-7xl
font-bold
tracking-widest
text-center
"
>

INSTAGRAM WRAPPED

</h1>



<p className="
text-xl
text-gray-400
mb-12
">

Upload your Instagram data export
to see your year in review

</p>



<ChestUpload/>



<div className="
mt-10
text-gray-400
">

🔒 All data stays on your device

</div>



</div>


</Background>

)

}


export default Home;
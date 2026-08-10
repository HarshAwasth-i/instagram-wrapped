import { UploadCloud } from "lucide-react";
import { motion } from "framer-motion";

import {
useRef,
useState,
useContext
}
from "react";


import {
parseInstagramZip
}
from "../../utils/zipParser";


import {
analyzeInstagramData
}
from "../../utils/dataAnalyzer";


import {
InstagramContext
}
from "../../context/InstagramContext";



function ChestUpload(){


const inputRef =
useRef<HTMLInputElement>(null);



const [file,setFile] =
useState<File | null>(null);



const {setAnalytics} =
useContext(InstagramContext);





async function handleFile(selectedFile:File){


if(
!selectedFile.name.endsWith(".zip")
){

alert("Please upload ZIP file");

return;

}



setFile(selectedFile);



const instagramData =
await parseInstagramZip(selectedFile);



const analytics =
analyzeInstagramData(instagramData);

console.log(
"Instagram Analytics:",
analytics
);


setAnalytics(analytics);



}





return(

<motion.div

initial={{
opacity:0,
y:40
}}

animate={{
opacity:1,
y:0
}}

transition={{
duration:0.8
}}


onClick={()=>
inputRef.current?.click()
}



onDragOver={(e)=>
e.preventDefault()
}



onDrop={(e)=>{

e.preventDefault();


const dropped =
e.dataTransfer.files[0];


if(dropped){

handleFile(dropped);

}


}}



className="
w-[420px]
h-[420px]
border
border-white/20
rounded-2xl
bg-[#181818]/70
shadow-2xl
flex
flex-col
items-center
justify-center
cursor-pointer
hover:bg-white/10
transition
"


>


<input

ref={inputRef}

type="file"

accept=".zip"

hidden


onChange={(e)=>{


const selected =
e.target.files?.[0];


if(selected){

handleFile(selected);

}


}}


/>



<div className="
text-7xl
mb-8
">

🧰

</div>



<div className="
flex
items-center
gap-3
text-white
text-xl
font-bold
">


<UploadCloud/>


{

file
?
file.name
:
"DROP YOUR ZIP"

}


</div>




<p className="
text-gray-400
mt-4
">


{

file
?
"Ready to analyze"
:
"or click to browse"

}


</p>



</motion.div>

)

}



export default ChestUpload;
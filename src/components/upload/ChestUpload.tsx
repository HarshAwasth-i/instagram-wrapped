import { motion } from "framer-motion";

import {
useRef,
useState,
useContext
} from "react";

import {
parseInstagramZip
} from "../../utils/zipParser";

import {
analyzeInstagramData
} from "../../utils/dataAnalyzer";

import {
InstagramContext
} from "../../context/InstagramContext";



function ChestUpload(){

const inputRef =
useRef<HTMLInputElement | null>(null);



const [file,setFile] =
useState<File | null>(null);



const {
setAnalytics,
setInstagramData
}=useContext(InstagramContext);





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


// DEBUG LIKES STRUCTURE

console.log(
"LIKES LENGTH:",
instagramData.likes.length
);


console.log(
"LIKE FILE 0:",
instagramData.likes[0]
);


console.log(
"FIRST LIKE OBJECT:",
instagramData.likes[0]?.[0]
);


console.log(
"SECOND LIKE FILE FIRST OBJECT:",
instagramData.likes[2]?.[0]
);

console.log(
"SEARCH RAW DATA:",
instagramData.searches
);


console.log(
"LOGIN RAW DATA:",
instagramData.loginActivity
);
console.log(
"LOGIN SAMPLE:",
instagramData.loginActivity[1]
);
setInstagramData(instagramData);



console.log(
"Parsed Instagram Data:",
instagramData
);



// SAVE COMPLETE INSTAGRAM DATA ✅

setInstagramData(instagramData);




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



<div className="text-6xl mb-8">

🧰

</div>



<div className="
text-2xl
font-bold
">

{

file
?
file.name
:
"DROP YOUR ZIP"

}

</div>



<div className="
mt-5
text-gray-400
">

{

file
?
"Ready to analyze"
:
"or click to browse"

}

</div>



</motion.div>


)

}


export default ChestUpload;
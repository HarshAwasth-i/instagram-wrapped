import { motion } from "framer-motion";

import {
useRef,
useState,
useContext
} from "react";

import { useNavigate } from "react-router-dom";


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


const navigate = useNavigate();


const inputRef =
useRef<HTMLInputElement | null>(null);



const [file,setFile] =
useState<File | null>(null);
const [loading,setLoading] = useState(false);



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
setLoading(true);



try {

  const instagramData =
    await parseInstagramZip(selectedFile);


  console.log(
    "FIRST LIKE ITEM:",
    instagramData.likes[0]?.[0]
  );


  console.log(
    "SEARCH RAW DATA:",
    instagramData.searches
  );


  console.log(
    "LOGIN RAW DATA:",
    instagramData.loginActivity
  );



  setInstagramData(instagramData);


  console.log(
    "Parsed Instagram Data:",
    instagramData
  );



  const analytics =
    analyzeInstagramData(instagramData);


  console.log(
    "Instagram Analytics:",
    analytics
  );


  setAnalytics(analytics);

  navigate("/dashboard");

} catch (err) {

  console.error("Failed to parse ZIP:", err);
  alert("Failed to parse the Instagram ZIP. Please make sure it is a valid Instagram data export.");

} finally {

  setLoading(false);

}

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



🧰



{
loading ?

<>
<div className="text-3xl">
⛏️
</div>

<div className="
text-xl
mt-5
text-[#d8cfb5]
">
MINING YOUR DATA...
</div>

<div className="
text-gray-400
mt-2
">
Extracting chunks from your Instagram world
</div>
</>

:

<>

<div className="text-5xl">
🧰
</div>


<div className="mt-5">
{
file
?
file.name
:
"DROP YOUR ZIP"
}
</div>


<div className="text-gray-400">
{
file
?
"Ready to analyze"
:
"or click to browse"
}
</div>


</>

}



</motion.div>


)


}


export default ChestUpload;
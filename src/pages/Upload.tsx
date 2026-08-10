import {useState} from "react";
import {parseInstagramZip} from "../utils/instagramParser";


function Upload(){

const [file,setFile] = useState<File | null>(null);


async function handleAnalyze(){

    if(!file){
        alert("Please upload file");
        return;
    }


    const result = await parseInstagramZip(file);


    console.log(result);

}


return(

<div className="min-h-screen bg-black text-white flex items-center justify-center">


<div className="bg-white/10 p-10 rounded-2xl text-center">


<h1 className="text-4xl font-bold mb-5">
Upload Instagram Data
</h1>



<input

type="file"

accept=".zip"

onChange={(e)=>{

if(e.target.files){

setFile(e.target.files[0])

}

}}

className="block mx-auto mb-5"

/>



<button

onClick={handleAnalyze}

className="
bg-pink-500
px-6
py-3
rounded-full
"

>

Analyze

</button>


</div>


</div>


)


}


export default Upload;
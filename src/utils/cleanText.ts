export function cleanText(text:string){

if(!text)
return "Unknown";


try{

return text
.replace(/ðŸ./g,"")
.trim();

}

catch{

return text;

}

}
import JSZip from "jszip";


export async function parseInstagramZip(file:File){


const zip =
await JSZip.loadAsync(file);



const instagramData:any={

followers:[],
following:[],
likes:[],
comments:[],
messages:[],
posts:[]

};



for(const path of Object.keys(zip.files)){


const currentFile =
zip.files[path];



if(currentFile.dir)
continue;



if(!path.endsWith(".json"))
continue;



const content =
await currentFile.async("string");



try{


const json =
JSON.parse(content);



console.log(
"Reading:",
path
);



// Followers

if(
path.endsWith("followers_1.json")
){

instagramData.followers.push(json);

}


// Following

else if(path.endsWith("following.json")){


    if(json.relationships_following){

        instagramData.following =
        json.relationships_following;

    }
    else{

        instagramData.following.push(json);

    }


}


// Likes

else if(
path.includes("likes")
||
path.includes("liked")
){

instagramData.likes.push(json);

}


// Comments

else if(
path.includes("comments")
){

instagramData.comments.push(json);

}


// Messages

else if(
path.includes("message")
||
path.includes("inbox")
){

instagramData.messages.push(json);

}


// Posts

else if(
path.includes("posts")
||
path.includes("media")
){

instagramData.posts.push(json);

}



}

catch(error){

console.log(
"Skipping invalid JSON:",
path
);

}


}



console.log(
"FINAL INSTAGRAM DATA:",
instagramData
);



return instagramData;


}
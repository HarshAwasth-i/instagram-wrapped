import JSZip from "jszip";


export async function parseInstagramZip(file: File){


const zip =
await JSZip.loadAsync(file);



const instagramData:any = {


followers:[],
following:[],
likes:[],
comments:[],
messages:[],
posts:[],


// Connections
searches:[],
loginActivity:[]

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





// -------------------------
// Followers
// -------------------------

if(
path.endsWith("followers_1.json")
){

instagramData.followers.push(json);

}





// -------------------------
// Following
// -------------------------

else if(
path.endsWith("following.json")
){


if(json.relationships_following){

instagramData.following =
json.relationships_following;

}
else{

instagramData.following.push(json);

}

}





// -------------------------
// Searches
// -------------------------

else if(
path.includes("recent_searches")
||
path.includes("profile_searches")
){


console.log(
"SEARCH FILE FOUND:",
path
);


instagramData.searches.push(json);


}





// -------------------------
// Login Activity
// -------------------------

else if(
path.includes("login_and_profile_creation")
||
path.includes("login_activity")
){


console.log(
"LOGIN FILE FOUND:",
path
);


instagramData.loginActivity.push(json);


}





// -------------------------
// Likes
// -------------------------

else if(
path.includes("likes")
||
path.includes("liked")
){

instagramData.likes.push(json);

}





// -------------------------
// Comments
// -------------------------

else if(
path.includes("comments")
){

instagramData.comments.push(json);

}





// -------------------------
// Messages
// -------------------------

else if(
path.includes("messages")
||
path.includes("inbox")
){

instagramData.messages.push(json);

}





// -------------------------
// Posts
// -------------------------

else if(
path.includes("posts")
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



console.log(
"DATA KEYS:",
Object.keys(instagramData)
);



return instagramData;


}
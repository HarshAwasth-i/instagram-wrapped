export function analyzeInstagramData(data:any){


const analytics:any={


followersCount:0,
followingCount:0,


// Connections
newFollowers:0,
mutualFollowers:0,

totalSearches:0,
topSearches:[],


totalLogins:0,
devicesUsed:0,
mostUsedDevice:"",
loginDevices:[],



// Likes
likesGiven:0,
commentsCount:0,

likesPerMonth:Array(12).fill(0),

likeActivity:Array(24).fill(0),

topLikedAccounts:[],



// Messages
messagesCount:0,

sentMessages:0,
receivedMessages:0,

conversationCount:0,

hourActivity:Array(24).fill(0),



// Highlights
firstMessage:null,
lastMessage:null,



// Friends
topFriend:"",
topFriends:[],



// Personality
personality:"",
personalityCards:[],



// Content

contentLikes:{
    post:0,
    reel:0,
    story:0
},


reelsCount:0,
postsCount:0,
storiesCount:0,


contentTimeline:{
    reels:Array(12).fill(0),
    posts:Array(12).fill(0),
    stories:Array(12).fill(0)
},


mostActiveMonth:"",
peakStoryMonth:""


};




// =========================
// FOLLOWERS
// =========================


if(data.followers?.length){

let count=0;


data.followers.forEach((item:any)=>{


if(Array.isArray(item)){

item.forEach((user:any)=>{

if(user.string_list_data){

count+=user.string_list_data.length;

}

});

}

else if(item.string_list_data){

count+=item.string_list_data.length;

}


});


analytics.followersCount=count;

}





// =========================
// FOLLOWING
// =========================


if(data.following?.length){


let count=0;


data.following.forEach((item:any)=>{


if(item.string_list_data){

count+=item.string_list_data.length;

}


});


analytics.followingCount=count;
// -------------------------
// Connection Insights
// -------------------------

analytics.newFollowers = Math.floor(
    analytics.followersCount * 0.1
);


analytics.mutualFollowers =
Math.min(
    analytics.followersCount,
    analytics.followingCount
);
// =========================
// SEARCH ANALYTICS
// =========================


if(data.searches?.length){

let searchMap:any={};


data.searches.forEach((item:any)=>{


if(item.string_map_data){

let value =
Object.values(item.string_map_data)[0] as any;


if(value?.value){

analytics.totalSearches++;


searchMap[value.value] =
(searchMap[value.value] || 0) + 1;

}

}


});



analytics.topSearches =
Object.entries(searchMap)
.sort(
(a:any,b:any)=>b[1]-a[1]
)
.slice(0,5)
.map(
(item:any)=>({

username:item[0],
count:item[1]

})
);


}

}









if(data.likes?.length){

let count=0;

let monthLikes = Array(12).fill(0);

let likedAccounts:any={};



data.likes.forEach((item:any)=>{


if(Array.isArray(item)){


item.forEach((like:any)=>{


count++;



// monthly likes

if(like.timestamp){

const month =
new Date(like.timestamp * 1000)
.getMonth();


monthLikes[month]++;

}



// account name

let username = "";


// New Instagram likes format
if(like.label_values?.length){


like.label_values.forEach((label:any)=>{


let value =
label.value ||
label.title ||
"";



if(value.includes("instagram.com")){


let parts =
value.split("/");


// Find username after instagram.com
let index =
parts.indexOf("instagram.com");


if(index !== -1 && parts[index + 1]){

username = parts[index + 1];

}


}
else if(value && !username){

username=value;

}


});


}



// Fallback for old Instagram format
if(!username){


username =
like.title ||
like.string_list_data?.[0]?.title ||
"";


}



if(username){


    likedAccounts[username] =
    (likedAccounts[username] || 0) + 1;


}



});



}



});



analytics.likesGiven = count;



analytics.likesPerMonth = monthLikes;



analytics.topLikedAccounts =
Object.entries(likedAccounts)
.sort(
    (a:any,b:any)=>b[1]-a[1]
)
.slice(0,5)
.map(
    ([username,count]:any)=>({

        username,
        count

    })
);



}


// =========================
// COMMENTS
// =========================


if(data.comments?.length){


let count=0;


data.comments.forEach((item:any)=>{


if(Array.isArray(item)){

count+=item.length;

}


});


analytics.commentsCount=count;


}





// =========================
// MESSAGES
// =========================


let friendMap:any={};



if(data.messages?.length){


data.messages.forEach((chat:any)=>{


if(!chat.messages)
return;



analytics.conversationCount++;



chat.messages.forEach((msg:any)=>{



analytics.messagesCount++;




// hour activity

if(msg.timestamp_ms){

let hour=
new Date(msg.timestamp_ms).getHours();


analytics.hourActivity[hour]++;


}




// sent received


if(msg.sender_name==="Harsh Awasthi"){

analytics.sentMessages++;

}
else{


analytics.receivedMessages++;



friendMap[msg.sender_name]=
(friendMap[msg.sender_name]||0)+1;


}




// first last message


if(msg.timestamp_ms){


const date=new Date(msg.timestamp_ms);


const messageData={

text:msg.content || "Media message",

date,

friend:msg.sender_name || "Unknown"

};



if(
!analytics.firstMessage ||
date < analytics.firstMessage.date
){

analytics.firstMessage=messageData;

}



if(
!analytics.lastMessage ||
date > analytics.lastMessage.date
){

analytics.lastMessage=messageData;

}


}



});


});


}




// =========================
// TOP FRIEND
// =========================


let max=0;


Object.entries(friendMap)
.forEach(([name,count]:any)=>{


if(count>max){

max=count;

analytics.topFriend=name;

}


});






// =========================
// CONTENT ANALYTICS
// =========================



const monthNames=[

"January",
"February",
"March",
"April",
"May",
"June",
"July",
"August",
"September",
"October",
"November",
"December"

];



let postMonths=Array(12).fill(0);

let storyMonths=Array(12).fill(0);

let reelMonths=Array(12).fill(0);





// POSTS


if(data.posts?.length){


data.posts.forEach((item:any)=>{


if(Array.isArray(item)){


item.forEach((post:any)=>{


if(post.timestamp){


let month=
new Date(post.timestamp*1000)
.getMonth();


postMonths[month]++;


analytics.postsCount++;


}


});


}


});


}







// STORIES


if(data.stories?.length){


data.stories.forEach((item:any)=>{


if(Array.isArray(item)){


item.forEach((story:any)=>{


if(story.timestamp){


let month=
new Date(story.timestamp*1000)
.getMonth();


storyMonths[month]++;


analytics.storiesCount++;


}


});


}


});


}






analytics.contentTimeline={

posts:postMonths,

stories:storyMonths,

reels:reelMonths

};





// most active posting month


let maxPost=
Math.max(...postMonths);


analytics.mostActiveMonth=
monthNames[
postMonths.indexOf(maxPost)
];





// peak story month


let maxStory=
Math.max(...storyMonths);


analytics.peakStoryMonth=
monthNames[
storyMonths.indexOf(maxStory)
];






// =========================
// SEARCH ANALYTICS
// =========================


let searchMap:any={};


if(data.searches?.length){


data.searches.forEach((file:any)=>{


const searches =
file.searches_user || [];



searches.forEach((item:any)=>{


const username =
item.title;



if(username){


searchMap[username] =
(searchMap[username] || 0) + 1;


}


});


});



}



analytics.totalSearches =
Object.values(searchMap)
.reduce(
(sum:any,value:any)=>sum+value,
0
);



analytics.topSearches =
Object.entries(searchMap)
.sort(
(a:any,b:any)=>b[1]-a[1]
)
.slice(0,5)
.map(
([username,count]:any)=>({

username,
count

})
);







// =========================
// LOGIN ACTIVITY
// =========================


if(data.loginActivity?.length){


let loginDates:string[] = [];


data.loginActivity.forEach((item:any)=>{


Object.values(item).forEach((value:any)=>{


if(Array.isArray(value)){


value.forEach((entry:any)=>{


if(entry.title){

loginDates.push(entry.title);

}


});


}


});


});



analytics.totalLogins = loginDates.length;


// store latest few login dates for UI
analytics.loginDevices = loginDates.slice(0,3);


// Instagram does not provide actual device names
analytics.devicesUsed = 0;


analytics.mostUsedDevice = "";



}


// =========================
// PERSONALITY
// =========================


let personality=[];
let cards=[];



if(analytics.messagesCount>50000){


personality.push("Chat Machine");


cards.push({

title:"Social Builder",

emoji:"🧱",

description:"Maintains many active conversations",

score:5

});


}
else if(analytics.messagesCount>10000){


personality.push("Social Butterfly");


cards.push({

title:"Social Butterfly",

emoji:"💬",

description:"Always keeping conversations alive",

score:4

});


}





if(analytics.likesGiven>20000){


personality.push("Like Machine");


cards.push({

title:"Like Machine",

emoji:"❤️",

description:"Shows love across Instagram",

score:5

});


}
else if(analytics.likesGiven>5000){


cards.push({

title:"Supportive Friend",

emoji:"💖",

description:"Always engaging with others",

score:3

});


}



if(analytics.postsCount<10){


cards.push({

title:"Silent Observer",

emoji:"👀",

description:"Likes more than posts",

score:5

});


}




analytics.personalityCards=cards;




if(analytics.followersCount>1000){

personality.push("⭐ Influencer");

}




if(personality.length===0){

personality.push("🌱 Quiet Observer");

}




analytics.personality=
personality.join(" • ");





return analytics;


}
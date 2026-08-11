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






// =========================
// LIKES
// =========================


if(data.likes?.length){


let count=0;


data.likes.forEach((item:any)=>{


if(Array.isArray(item)){

count+=item.length;

}


});


analytics.likesGiven=count;


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
// LOGIN ANALYTICS
// =========================


let deviceMap:any={};



if(data.loginActivity?.length){



data.loginActivity.forEach((file:any)=>{



const history =
file.account_history_login_history || [];



history.forEach((login:any)=>{


const device =
login.string_map_data?.["Device"]?.value ||
login.title ||
"Unknown Device";



if(device !== "Unknown Device"){

deviceMap[device] =
(deviceMap[device] || 0)+1;

}



});


});


}



analytics.loginDevices =
Object.keys(deviceMap);



analytics.devicesUsed =
analytics.loginDevices.length;



analytics.totalLogins =
Object.values(deviceMap)
.reduce(
(sum:any,value:any)=>sum+value,
0
);



let maxDevice="";

let maxCount=0;



Object.entries(deviceMap)
.forEach(([device,count]:any)=>{


if(count>maxCount){

maxCount=count;
maxDevice=device;

}


});



analytics.mostUsedDevice=maxDevice;

// =========================
// PERSONALITY
// =========================


let personality=[];



if(analytics.messagesCount>50000){

personality.push("💬 Chat Machine");

}
else if(analytics.messagesCount>10000){

personality.push("💬 Social Butterfly");

}



if(analytics.likesGiven>20000){

personality.push("❤️ Like Machine");

}
else if(analytics.likesGiven>5000){

personality.push("❤️ Supportive Friend");

}




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
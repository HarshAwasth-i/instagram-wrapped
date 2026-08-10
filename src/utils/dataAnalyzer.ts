export function analyzeInstagramData(data: any) {

    const analytics = {

        followersCount: 0,

        followingCount: 0,

        likesGiven: 0,

        commentsCount: 0,

        messagesCount: 0,

        topFriend: "",

        personality: ""

    };


    // -------------------------
    // Followers
    // -------------------------
if (data.followers?.length) {

    let count = 0;


    data.followers.forEach((item:any)=>{


        if(Array.isArray(item)){

            item.forEach((user:any)=>{

                if(user.string_list_data){

                    count += user.string_list_data.length;

                }

            });

        }


        else if(item.string_list_data){

            count += item.string_list_data.length;

        }


    });


    analytics.followersCount = count;

}



    // -------------------------
    // Following
    // -------------------------

    if (data.following?.length) {

        let count = 0;


        data.following.forEach((item: any) => {


            if (item.string_list_data) {

                count += item.string_list_data.length;

            }


        });


        analytics.followingCount = count;

    }



    // -------------------------
    // Likes
    // -------------------------

    if (data.likes?.length) {

        let count = 0;


        data.likes.forEach((item: any) => {


            if (Array.isArray(item)) {

                count += item.length;

            }


        });


        analytics.likesGiven = count;

    }



    // -------------------------
    // Comments
    // -------------------------

    if (data.comments?.length) {

        let count = 0;


        data.comments.forEach((item: any) => {


            if (Array.isArray(item)) {

                count += item.length;

            }


        });


        analytics.commentsCount = count;

    }



    // -------------------------
    // Messages
    // -------------------------

    if (data.messages?.length) {

        let count = 0;


        data.messages.forEach((item: any) => {


            if (item.messages) {

                count += item.messages.length;

            }


        });


        analytics.messagesCount = count;

    }
// -------------------------
// Top Friend
// -------------------------

if(data.messages?.length){

    let friendMap:any = {};


    data.messages.forEach((chat:any)=>{


        if(chat.title && chat.messages){


            friendMap[chat.title] =
            chat.messages.length;


        }


    });



    let max = 0;
    let bestFriend = "";


    Object.entries(friendMap).forEach(
        ([name,count]:any)=>{


        if(count > max){

            max = count;
            bestFriend = name;

        }


    });


    analytics.topFriend = bestFriend;

}

// -------------------------
// Personality
// -------------------------

let personality = [];


// Message based

if(analytics.messagesCount > 50000){

    personality.push("💬 Chat Machine");

}
else if(analytics.messagesCount > 10000){

    personality.push("💬 Social Butterfly");

}


// Likes based

if(analytics.likesGiven > 20000){

    personality.push("❤️ Like Machine");

}
else if(analytics.likesGiven > 5000){

    personality.push("❤️ Supportive Friend");

}


// Followers based

if(analytics.followersCount > 1000){

    personality.push("⭐ Influencer");

}


// Posts based

if(data.posts?.length){

    let postCount = 0;


    data.posts.forEach((item:any)=>{

        if(Array.isArray(item)){

            postCount += item.length;

        }

    });


    if(postCount > 100){

        personality.push("📸 Content Creator");

    }

}


// Default

if(personality.length === 0){

    personality.push("🌱 Quiet Observer");

}


analytics.personality =
personality.join(" • ");


    return analytics;

}
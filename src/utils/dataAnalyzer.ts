function cleanText(text: string) {
  try {
    return decodeURIComponent(escape(text));
  } catch {
    return text;
  }
}

export function analyzeInstagramData(data: any) {
  const analytics: any = {
    followersCount: 0,
    followingCount: 0,

    // Connections

    notFollowingBack: 0,
    notFollowingYou: 0,
    mutualFollowers: 0,

    totalSearches: 0,
    topSearches: [],

    totalLogins: 0,
    devicesUsed: 0,
    mostUsedDevice: "",
    loginDevices: [],

    // Likes
    likesGiven: 0,
    commentsCount: 0,
    likesPerMonth: Array(12).fill(0),
    likeActivity: Array(24).fill(0),
    topLikedAccounts: [],

    // Messages
    messagesCount: 0,
    sentMessages: 0,
    receivedMessages: 0,
    conversationCount: 0,
    hourActivity: Array(24).fill(0),

    // Highlights
    firstMessage: null,
    lastMessage: null,

    // Friends
    topFriend: "",
    topFriends: [],

    // Personality
    personality: "",
    personalityCards: [],

    // Content
    contentLikes: { post: 0, reel: 0, story: 0 },
    reelsCount: 0,
    postsCount: 0,
    storiesCount: 0,

    contentTimeline: {
      reels: Array(12).fill(0),
      posts: Array(12).fill(0),
      stories: Array(12).fill(0),
    },

    mostActiveMonth: "",
    peakStoryMonth: "",
  };


// =========================
// FOLLOWERS & FOLLOWING
// =========================

// Store usernames in Sets so we can compare
// followers and following efficiently.
const followerSet = new Set<string>();
const followingSet = new Set<string>();


// =========================
// FOLLOWERS
// =========================

if (data.followers?.length) {

  data.followers.forEach((file: any) => {

    // Some Instagram exports contain
    // the users directly as an array.
    if (Array.isArray(file)) {

      file.forEach((user: any) => {

        if (user.string_list_data) {

          user.string_list_data.forEach((item: any) => {

            if (item.value) {
              followerSet.add(item.value);
            }

          });

        }

      });

    }

    // Other exports may contain
    // relationships_followers.
    else if (file.relationships_followers) {

      file.relationships_followers.forEach((user: any) => {

        user.string_list_data?.forEach((item: any) => {

          if (item.value) {
            followerSet.add(item.value);
          }

        });

      });

    }

    // Direct string_list_data fallback
    else if (file.string_list_data) {

      file.string_list_data.forEach((item: any) => {

        if (item.value) {
          followerSet.add(item.value);
        }

      });

    }

  });

}


// =========================
// FOLLOWING
// =========================

if (data.following?.length) {

  data.following.forEach((user: any) => {

    // Standard Instagram format
    if (user.string_list_data) {

      user.string_list_data.forEach((item: any) => {

        if (item.value) {
          followingSet.add(item.value);
        }

      });

    }

  });

}


// =========================
// COUNTS
// =========================

analytics.followersCount = followerSet.size;
analytics.followingCount = followingSet.size;


// =========================
// MUTUAL FOLLOWERS
// =========================

// People who follow you AND you follow them.
let mutualCount = 0;

followerSet.forEach((username) => {

  if (followingSet.has(username)) {
    mutualCount++;
  }

});

analytics.mutualFollowers = mutualCount;


// =========================
// NOT FOLLOWING BACK
// =========================

// People you follow who don't follow you back.
let notFollowingBack = 0;

followingSet.forEach((username) => {

  if (!followerSet.has(username)) {
    notFollowingBack++;
  }

});

analytics.notFollowingBack = notFollowingBack;


// =========================
// FOLLOWERS YOU DON'T FOLLOW
// =========================

// People who follow you but you don't follow them.
let notFollowingYou = 0;

followerSet.forEach((username) => {

  if (!followingSet.has(username)) {
    notFollowingYou++;
  }

});

analytics.notFollowingYou = notFollowingYou;


  // =========================
  // LIKES
  // =========================

  if (data.likes?.length) {
    let count = 0;
    let monthLikes = Array(12).fill(0);
    let hourLikes = Array(24).fill(0);
    let likedAccounts: any = {};

    data.likes.forEach((item: any) => {
      if (Array.isArray(item)) {
        item.forEach((like: any) => {
          count++;

          // Monthly likes
          if (like.timestamp) {
            const date = new Date(like.timestamp * 1000);
            const month = date.getMonth();
            monthLikes[month]++;

            // Hourly likes
            const hour = date.getHours();
            hourLikes[hour]++;
          }

          // Account name
          let username = "";

          // New Instagram likes format
          if (like.label_values?.length) {
            like.label_values.forEach((label: any) => {
              let value = label.value || label.title || "";
              if (value.includes("instagram.com")) {
                let parts = value.split("/");
                let idx = parts.indexOf("instagram.com");
                if (idx !== -1 && parts[idx + 1]) {
                  username = parts[idx + 1];
                }
              } else if (value && !username) {
                username = value;
              }
            });
          }

          // Fallback for old Instagram format
          if (!username) {
            username =
              like.title || like.string_list_data?.[0]?.title || "";
          }

          if (username) {
            likedAccounts[username] = (likedAccounts[username] || 0) + 1;
          }
        });
      }
    });

    analytics.likesGiven = count;
    analytics.likesPerMonth = monthLikes;
    analytics.likeActivity = hourLikes;

    analytics.topLikedAccounts = Object.entries(likedAccounts)
      .sort((a: any, b: any) => b[1] - a[1])
      .map(([username, cnt]: any) => ({
        username: cleanText(username),
        count: cnt,
      }))
      .filter(
        (item: any) =>
          item.username &&
          item.username.length > 2 &&
          !item.username.includes("❤️") &&
          !item.username.includes("💖")
      )
      .slice(0, 5);
  }


  // =========================
  // COMMENTS
  // =========================

  if (data.comments?.length) {
    let count = 0;
    data.comments.forEach((item: any) => {
      if (Array.isArray(item)) {
        count += item.length;
      }
    });
    analytics.commentsCount = count;
  }


  // =========================
  // MESSAGES
  // =========================

  let friendMap: any = {};

  // --- Step 1: detect who the account owner is ---
  // The owner is the person who appears most as sender_name across all chats.
  // We do a pre-pass to count occurrences.
  let senderTotals: any = {};
  if (data.messages?.length) {
    data.messages.forEach((chat: any) => {
      if (!chat.messages) return;
      chat.messages.forEach((msg: any) => {
        if (msg.sender_name) {
          senderTotals[msg.sender_name] =
            (senderTotals[msg.sender_name] || 0) + 1;
        }
      });
    });
  }

  // The owner is the sender with the highest count (they DM themselves in every thread)
  const ownerName: string =
    Object.entries(senderTotals).sort(
      (a: any, b: any) => b[1] - a[1]
    )[0]?.[0] || "";

  if (data.messages?.length) {
    data.messages.forEach((chat: any) => {
      if (!chat.messages) return;

      analytics.conversationCount++;

      chat.messages.forEach((msg: any) => {
        analytics.messagesCount++;

        // Hour activity
        if (msg.timestamp_ms) {
          const hour = new Date(msg.timestamp_ms).getHours();
          analytics.hourActivity[hour]++;
        }

        // Sent vs received
        if (msg.sender_name === ownerName) {
          analytics.sentMessages++;
        } else {
          analytics.receivedMessages++;
          friendMap[msg.sender_name] =
            (friendMap[msg.sender_name] || 0) + 1;
        }

        // First / last message
        if (msg.timestamp_ms) {
          const date = new Date(msg.timestamp_ms);
          const messageData = {
            text: cleanText(msg.content || "Media message"),
            date,
            friend: cleanText(msg.sender_name || "Unknown"),
          };

          if (!analytics.firstMessage || date < analytics.firstMessage.date) {
            analytics.firstMessage = messageData;
          }
          if (!analytics.lastMessage || date > analytics.lastMessage.date) {
            analytics.lastMessage = messageData;
          }
        }
      });
    });
  }


  // =========================
  // TOP FRIEND
  // =========================

  analytics.topFriends = Object.entries(friendMap)
    .sort((a: any, b: any) => b[1] - a[1])
    .slice(0, 5)
    .map(([name, count]: any) => ({
      name: cleanText(name),
      count,
    }));

  analytics.topFriend = analytics.topFriends[0]?.name || "";

  console.log("TOP FRIENDS:", analytics.topFriends);


  // =========================
  // CONTENT ANALYTICS
  // =========================

  const monthNames = [
    "January", "February", "March", "April",
    "May", "June", "July", "August",
    "September", "October", "November", "December",
  ];

  let postMonths = Array(12).fill(0);
  let storyMonths = Array(12).fill(0);
  let reelMonths = Array(12).fill(0);


  // POSTS
  if (data.posts?.length) {
    data.posts.forEach((item: any) => {
      if (Array.isArray(item)) {
        item.forEach((post: any) => {
          if (post.timestamp) {
            const month = new Date(post.timestamp * 1000).getMonth();
            postMonths[month]++;
            analytics.postsCount++;
          }
        });
      }
    });
  }


  // STORIES
  if (data.stories?.length) {
    data.stories.forEach((item: any) => {
      if (Array.isArray(item)) {
        item.forEach((story: any) => {
          if (story.timestamp) {
            const month = new Date(story.timestamp * 1000).getMonth();
            storyMonths[month]++;
            analytics.storiesCount++;
          }
        });
      }
    });
  }


  analytics.contentTimeline = {
    posts: postMonths,
    stories: storyMonths,
    reels: reelMonths,
  };


  // Most active posting month
  const maxPost = Math.max(...postMonths);
  analytics.mostActiveMonth = monthNames[postMonths.indexOf(maxPost)] || "—";

  // Peak story month
  const maxStory = Math.max(...storyMonths);
  analytics.peakStoryMonth = monthNames[storyMonths.indexOf(maxStory)] || "—";


  // =========================
  // SEARCH ANALYTICS
  // =========================

  let searchMap: any = {};

  if (data.searches?.length) {
    data.searches.forEach((file: any) => {
      // Format A: file has a top-level array of search objects
      if (Array.isArray(file)) {
        file.forEach((item: any) => {
          if (item.string_map_data) {
            const value = Object.values(item.string_map_data)[0] as any;
            if (value?.value) {
              searchMap[value.value] = (searchMap[value.value] || 0) + 1;
            }
          }
        });
      }
      // Format B: file has searches_user array
      else if (file.searches_user) {
        file.searches_user.forEach((item: any) => {
          const username = item.title;
          if (username) {
            searchMap[username] = (searchMap[username] || 0) + 1;
          }
        });
      }
      // Format C: item itself has string_map_data
      else if (file.string_map_data) {
        const value = Object.values(file.string_map_data)[0] as any;
        if (value?.value) {
          searchMap[value.value] = (searchMap[value.value] || 0) + 1;
        }
      }
    });
  }

  analytics.totalSearches = Object.values(searchMap).reduce(
    (sum: any, val: any) => sum + val,
    0
  ) as number;

  analytics.topSearches = Object.entries(searchMap)
    .sort((a: any, b: any) => b[1] - a[1])
    .slice(0, 5)
    .map(([username, count]: any) => ({
      username: cleanText(username),
      count,
    }));


  // =========================
  // LOGIN ACTIVITY
  // =========================

  if (data.loginActivity?.length) {
    let loginDates: string[] = [];

    data.loginActivity.forEach((item: any) => {
      Object.values(item).forEach((value: any) => {
        if (Array.isArray(value)) {
          value.forEach((entry: any) => {
            if (entry.title) {
              loginDates.push(entry.title);
            }
          });
        }
      });
    });

    analytics.totalLogins = loginDates.length;
    analytics.loginDevices = loginDates.slice(0, 3);
    analytics.devicesUsed = 0;
    analytics.mostUsedDevice = "";
  }


  // =========================
  // PERSONALITY
  // =========================

  let personality: string[] = [];
  let cards: any[] = [];

  if (analytics.messagesCount > 50000) {
    personality.push("Chat Machine");
    cards.push({
      title: "Social Builder",
      emoji: "🧱",
      description: "Maintains many active conversations",
      score: 5,
    });
  } else if (analytics.messagesCount > 10000) {
    personality.push("Social Butterfly");
    cards.push({
      title: "Social Butterfly",
      emoji: "💬",
      description: "Always keeping conversations alive",
      score: 4,
    });
  }

  if (analytics.likesGiven > 20000) {
    personality.push("Like Machine");
    cards.push({
      title: "Like Machine",
      emoji: "❤️",
      description: "Shows love across Instagram",
      score: 5,
    });
  } else if (analytics.likesGiven > 5000) {
    cards.push({
      title: "Supportive Friend",
      emoji: "💖",
      description: "Always engaging with others",
      score: 3,
    });
  }

  if (analytics.postsCount < 10) {
    cards.push({
      title: "Silent Observer",
      emoji: "👀",
      description: "Likes more than posts",
      score: 5,
    });
  }

  analytics.personalityCards = cards;

  if (analytics.followersCount > 1000) {
    personality.push("⭐ Influencer");
  }

  if (personality.length === 0) {
    personality.push("🌱 Quiet Observer");
  }

  analytics.personality = personality.join(" • ");

  return analytics;
}
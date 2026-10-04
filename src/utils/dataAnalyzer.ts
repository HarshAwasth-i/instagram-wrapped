function cleanText(text: string) {
  try {
    return decodeURIComponent(escape(text));
  } catch {
    return text;
  }
}
export function analyzeInstagramData(
  data: any,
  selectedYear?: number
) {  
    // =========================
  // YEAR FILTER
  // =========================

  const isInSelectedYear = (
    timestamp: number,
    isMilliseconds = false
  ) => {
    if (!selectedYear) return true;

    const date = new Date(
      isMilliseconds
        ? timestamp
        : timestamp * 1000
    );

    return date.getFullYear() === selectedYear;
  };
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
    likedContent: [],

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
      // Instagram's current export stores username in "title"
      if (user.title) {
        followingSet.add(user.title);
      }

      // Fallback for older Instagram export formats
      else if (user.string_list_data) {
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

    // Used for Top Liked Accounts
    let likedAccounts: any = {};

    // Used for actual liked posts
    let likedContent: any[] = [];

    data.likes.forEach((item: any) => {
      if (Array.isArray(item)) {
        item.forEach((like: any) => {
            if (
    like.timestamp &&
    !isInSelectedYear(like.timestamp)
  ) {
    return;
  }
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

          // =========================
          // STORE LIKED POST
          // =========================

          // Instagram's liked_posts export contains
          // the actual post URL and caption.
    // =========================
// STORE LIKED POST DATA
// =========================

let caption = "";
let url = "";
let timestamp = like.timestamp || null;

// Instagram export may store these
// inside label_values.
if (like.label_values?.length) {
  like.label_values.forEach((label: any) => {
    const labelName = (
      label.label ||
      label.name ||
      ""
    ).toLowerCase();

    const value = label.value || "";

    if (labelName === "caption") {
      caption = value;
    }

    if (labelName === "url") {
      url = value;
    }

    // In case timestamp is also stored here
    if (labelName === "timestamp" && !timestamp) {
      timestamp = Number(value) || null;
    }
  });
}

// Fallback for other Instagram export formats
if (!caption) {
  caption =
    like.Caption ||
    like.caption ||
    "";
}

if (!url) {
  url =
    like.URL ||
    like.url ||
    "";
}

// Store the real liked post
likedContent.push({
  caption: cleanText(caption || "Liked post"),
  url,
  timestamp,
});

          // =========================
          // ACCOUNT NAME
          // =========================

          let username = "";

          // New Instagram likes format
          if (like.label_values?.length) {
            like.label_values.forEach((label: any) => {
              const value = label.value || "";

              // Only accept an actual Instagram profile URL
              if (value.includes("instagram.com/u/")) {
                const parts = value.split("/u/");

                if (parts[1]) {
                  username = parts[1].split("/")[0];
                }
              }
            });
          }

          // Fallback for older Instagram format
          if (!username) {
            username =
              like.title ||
              like.string_list_data?.[0]?.title ||
              "";
          }

          // Only store a genuine-looking username
          if (
            username &&
            !username.includes("instagram.com") &&
            !username.includes("http") &&
            !username.includes(" ") &&
            username.length > 2
          ) {
            likedAccounts[username] =
              (likedAccounts[username] || 0) + 1;
          }
        });
      }
    });

    // =========================
    // LIKE ANALYTICS
    // =========================

    analytics.likesGiven = count;
    analytics.likesPerMonth = monthLikes;
    analytics.likeActivity = hourLikes;

    // =========================
    // TOP LIKED ACCOUNTS
    // =========================

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

    // =========================
    // LIKED CONTENT
    // =========================

    analytics.likedContent = likedContent
      .sort(
        (a, b) =>
          (b.timestamp || 0) -
          (a.timestamp || 0)
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
      } else if (item?.comments_media_comments && Array.isArray(item.comments_media_comments)) {
        count += item.comments_media_comments.length;
      } else if (typeof item === "object" && item !== null) {
        Object.values(item).forEach((val: any) => {
          if (Array.isArray(val)) count += val.length;
        });
      }
    });

    analytics.commentsCount = count;
  }

// =========================
// MESSAGES
// =========================

let friendMap: any = {};

// --- Step 1: detect who the account owner is ---
// We keep this across all messages so the
// sender identification remains consistent.
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


// The owner is the sender with the highest
// number of messages.
const ownerName: string =
  Object.entries(senderTotals).sort(
    (a: any, b: any) => b[1] - a[1]
  )[0]?.[0] || "";


if (data.messages?.length) {

  data.messages.forEach((chat: any) => {

    if (!chat.messages) return;

    // Track whether this conversation has
    // at least one message in the selected year.
    let hasMessagesInSelectedYear = false;


    chat.messages.forEach((msg: any) => {

      // =========================
      // YEAR FILTER
      // =========================

      if (
        msg.timestamp_ms &&
        !isInSelectedYear(
          msg.timestamp_ms,
          true
        )
      ) {
        return;
      }


      // Count this message
      analytics.messagesCount++;


      hasMessagesInSelectedYear = true;


      // =========================
      // HOUR ACTIVITY
      // =========================

      if (msg.timestamp_ms) {

        const hour = new Date(
          msg.timestamp_ms
        ).getHours();

        analytics.hourActivity[hour]++;

      }


      // =========================
      // SENT VS RECEIVED
      // =========================

      if (msg.sender_name === ownerName) {

        analytics.sentMessages++;

      }

      else {

        analytics.receivedMessages++;


        // Track friends only for the
        // selected year's messages.
        friendMap[msg.sender_name] =
          (friendMap[msg.sender_name] || 0) + 1;

      }


      // =========================
      // FIRST / LAST MESSAGE
      // =========================

      if (msg.timestamp_ms) {

        const date =
          new Date(msg.timestamp_ms);


        const messageData = {

          text: cleanText(
            msg.content ||
            "Media message"
          ),

          date,

          friend: cleanText(
            msg.sender_name ||
            "Unknown"
          ),

        };


        // Earliest message in selected year
        if (
          !analytics.firstMessage ||
          date < analytics.firstMessage.date
        ) {

          analytics.firstMessage =
            messageData;

        }


        // Latest message in selected year
        if (
          !analytics.lastMessage ||
          date > analytics.lastMessage.date
        ) {

          analytics.lastMessage =
            messageData;

        }

      }

    });


    // =========================
    // CONVERSATIONS
    // =========================

    // Only count conversations that actually
    // contain a message from the selected year.
    if (hasMessagesInSelectedYear) {

      analytics.conversationCount++;

    }

  });

}


// =========================
// TOP FRIEND
// =========================

analytics.topFriends =
  Object.entries(friendMap)

    .sort(
      (a: any, b: any) =>
        b[1] - a[1]
    )

    .slice(0, 5)

    .map(
      ([name, count]: any) => ({

        name: cleanText(name),

        count,

      })
    );


analytics.topFriend =
  analytics.topFriends[0]?.name || "";




// =========================
// CONTENT ANALYTICS
// =========================

const monthNames = [
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
  "December",
];


let postMonths = Array(12).fill(0);
let storyMonths = Array(12).fill(0);
let reelMonths = Array(12).fill(0);


// =========================
// POSTS
// =========================

if (data.posts?.length) {

  data.posts.forEach((item: any) => {

    if (!Array.isArray(item)) return;


    item.forEach((post: any) => {

      if (!post.timestamp) return;


      // Ignore posts outside selected year
      if (
        !isInSelectedYear(
          post.timestamp
        )
      ) {
        return;
      }


      const date =
        new Date(
          post.timestamp * 1000
        );


      const month =
        date.getMonth();


      postMonths[month]++;

      analytics.postsCount++;

    });

  });

}


// =========================
// STORIES
// =========================

if (data.stories?.length) {

  data.stories.forEach((file: any) => {

    if (
      !file.ig_stories ||
      !Array.isArray(file.ig_stories)
    ) {
      return;
    }


    file.ig_stories.forEach(
      (story: any) => {

        if (!story.creation_timestamp) {
          return;
        }


        // Ignore stories outside selected year
        if (
          !isInSelectedYear(
            story.creation_timestamp
          )
        ) {
          return;
        }


        const date =
          new Date(
            story.creation_timestamp * 1000
          );


        const month =
          date.getMonth();


        storyMonths[month]++;

        analytics.storiesCount++;

      }
    );

  });

}


// =========================
// REELS
// =========================

if (data.reels?.length) {
  data.reels.forEach((item: any) => {
    const list = Array.isArray(item)
      ? item
      : item.ig_reels || item.ig_clips || [];

    if (!Array.isArray(list)) return;

    list.forEach((reel: any) => {
      const ts =
        reel.creation_timestamp ||
        reel.timestamp;

      if (!ts || !isInSelectedYear(ts)) return;

      const month = new Date(ts * 1000).getMonth();
      reelMonths[month]++;
      analytics.reelsCount++;
    });
  });
}


// =========================
// CONTENT TIMELINE
// =========================

analytics.contentTimeline = {

  posts: postMonths,

  stories: storyMonths,

  reels: reelMonths,

};


// =========================
// MOST ACTIVE MONTH
// =========================

const maxPost =
  Math.max(...postMonths);


analytics.mostActiveMonth =
  maxPost > 0
    ? monthNames[
        postMonths.indexOf(maxPost)
      ]
    : "—";


// =========================
// PEAK STORY MONTH
// =========================

const maxStory =
  Math.max(...storyMonths);


analytics.peakStoryMonth =
  maxStory > 0
    ? monthNames[
        storyMonths.indexOf(maxStory)
      ]
    : "—";

// =========================
// SEARCH ANALYTICS
// =========================

let searchMap: any = {};

if (data.searches?.length) {

  data.searches.forEach((file: any) => {

    // =========================
    // PROFILE SEARCHES
    // =========================

    if (file.searches_user) {

      file.searches_user.forEach((item: any) => {

        const username = item.title;

        if (!username) {
          return;
        }

        // Instagram stores the timestamp
        // inside string_list_data
        const searchData =
          item.string_list_data?.[0];

        const timestamp =
          searchData?.timestamp;

        // If a year is selected,
        // only count timestamped searches.
        if (
          selectedYear &&
          !timestamp
        ) {
          return;
        }

        // Filter by selected year
        if (
          timestamp &&
          !isInSelectedYear(timestamp)
        ) {
          return;
        }

        searchMap[username] =
          (searchMap[username] || 0) + 1;

      });

    }


    // =========================
    // SEARCH QUERY FORMAT
    // =========================

    if (file.label_values) {

      let searchQuery = "";
      let timestamp = 0;

      file.label_values.forEach(
        (item: any) => {

          // Actual searched text
          if (
            item.label === "Search query"
          ) {
            searchQuery =
              item.value || "";
          }

          // Actual search timestamp
          if (
            item.label === "Update time"
          ) {
            timestamp =
              item.timestamp_value || 0;
          }

        }
      );


      if (!searchQuery) {
        return;
      }

      // If a year is selected,
      // ignore records without timestamps.
      if (
        selectedYear &&
        !timestamp
      ) {
        return;
      }

      // Filter by selected year
      if (
        timestamp &&
        !isInSelectedYear(timestamp)
      ) {
        return;
      }

      searchMap[searchQuery] =
        (searchMap[searchQuery] || 0) + 1;

    }

  });

}


// =========================
// SEARCH RESULTS
// =========================

analytics.totalSearches =
  Object.values(searchMap).reduce(
    (sum: any, value: any) =>
      sum + value,
    0
  ) as number;

analytics.topSearches =
  Object.entries(searchMap)
    .sort(
      (a: any, b: any) =>
        b[1] - a[1]
    )
    .slice(0, 5)
    .map(
      ([username, count]: any) => ({
        username: cleanText(username),
        count,
      })
    );



 // =========================
// LOGIN ACTIVITY
// =========================

if (data.loginActivity?.length) {

  let loginDates: string[] = [];


  data.loginActivity.forEach(
    (item: any) => {

      Object.values(item).forEach(
        (value: any) => {

          if (!Array.isArray(value)) {
            return;
          }


          value.forEach(
            (entry: any) => {

              if (!entry.title) {
                return;
              }


              // Instagram login history stores
              // the login date inside "title".
              const loginTimestamp =
                new Date(
                  entry.title
                ).getTime();


              // Ignore invalid dates
              if (
                Number.isNaN(
                  loginTimestamp
                )
              ) {
                return;
              }


              // Convert milliseconds to seconds
              // because isInSelectedYear()
              // expects seconds by default.
              if (
                !isInSelectedYear(
                  loginTimestamp,
                  true
                )
              ) {
                return;
              }


              loginDates.push(
                entry.title
              );

            }
          );

        }
      );

    }
  );


  analytics.totalLogins =
    loginDates.length;


  // Keep the existing structure.
  analytics.loginDevices =
    loginDates.slice(0, 3);


  // Your export does not provide
  // reliable device information.
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
      description:
        "Maintains many active conversations",
      score: 5,
    });
  } else if (analytics.messagesCount > 10000) {
    personality.push("Social Butterfly");

    cards.push({
      title: "Social Butterfly",
      emoji: "💬",
      description:
        "Always keeping conversations alive",
      score: 4,
    });
  }

  if (analytics.likesGiven > 20000) {
    personality.push("Like Machine");

    cards.push({
      title: "Like Machine",
      emoji: "❤️",
      description:
        "Shows love across Instagram",
      score: 5,
    });
  } else if (analytics.likesGiven > 5000) {
    cards.push({
      title: "Supportive Friend",
      emoji: "💖",
      description:
        "Always engaging with others",
      score: 3,
    });
  }

  if (analytics.postsCount < 10) {
    cards.push({
      title: "Silent Observer",
      emoji: "👀",
      description:
        "Likes more than posts",
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

  analytics.personality =
    personality.join(" • ");

  return analytics;
}
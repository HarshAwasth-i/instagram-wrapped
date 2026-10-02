export interface InstagramData {

followers:any[];

following:any[];

likes:any[];

comments:any[];

messages:any[];

posts:any[];

}



export interface InstagramAnalytics {

  followersCount: number;

  followingCount: number;

  mutualFollowers: number;

  notFollowingBack: number;

  notFollowingYou: number;

  likesGiven: number;

  commentsCount: number;

  messagesCount: number;

  topFriend: string;

  personality: string;

}
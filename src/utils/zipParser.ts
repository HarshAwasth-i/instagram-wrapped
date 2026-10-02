import JSZip from "jszip";


export async function parseInstagramZip(file: File) {

  const zip = await JSZip.loadAsync(file);

  const instagramData: any = {
    followers: [],
    following: [],
    likes: [],
    comments: [],
    messages: [],
    posts: [],
    stories: [],

    // Connections
    searches: [],
    loginActivity: [],
  };



  for (const path of Object.keys(zip.files)) {

    const currentFile = zip.files[path];

    if (currentFile.dir) continue;

    if (!path.endsWith(".json")) continue;

    const content = await currentFile.async("string");

    try {

      const json = JSON.parse(content);

      console.log("Reading:", path);


      // -------------------------
      // Followers
      // -------------------------

     if (
  path.endsWith("followers.json") ||
  /followers_\d+\.json$/.test(path)
) {
  instagramData.followers.push(json);
}


      // -------------------------
      // Following
      // -------------------------

      else if (path.endsWith("following.json")) {
        if (json.relationships_following) {
          instagramData.following = json.relationships_following;
        } else {
          instagramData.following.push(json);
        }
      }


      // -------------------------
      // Searches
      // -------------------------

      else if (
        path.includes("recent_searches") ||
        path.includes("profile_searches") ||
        path.includes("word_or_phrase_searches") ||
        path.includes("account_searches")
      ) {
        console.log("SEARCH FILE FOUND:", path);
        instagramData.searches.push(json);
      }


      // -------------------------
      // Login Activity
      // -------------------------

      else if (
        path.includes("login_and_profile_creation") ||
        path.includes("login_and_account_creation") ||
        path.includes("login_activity")
      ) {
        console.log("LOGIN FILE FOUND:", path);
        instagramData.loginActivity.push(json);
      }


      // -------------------------
      // Likes
      // -------------------------

      else if (
        path.includes("liked_posts") ||
        path.includes("liked_comments") ||
        (path.includes("likes") && !path.includes("stories")) ||
        path.includes("liked")
      ) {
        instagramData.likes.push(json);
      }


      // -------------------------
      // Comments
      // -------------------------

      else if (path.includes("comments")) {
        instagramData.comments.push(json);
      }


      // -------------------------
      // Messages / Inbox
      // -------------------------

      else if (
        path.includes("messages") ||
        path.includes("inbox")
      ) {
        instagramData.messages.push(json);
      }


      // -------------------------
      // Stories
      // -------------------------

      else if (path.includes("stories")) {
        instagramData.stories.push(json);
      }


      // -------------------------
      // Posts
      // -------------------------

      else if (path.includes("posts")) {
        instagramData.posts.push(json);
      }


    } catch (error) {
      console.log("Skipping invalid JSON:", path);
    }

  }



  console.log("FINAL INSTAGRAM DATA:", instagramData);
  console.log("DATA KEYS:", Object.keys(instagramData));

  return instagramData;

}
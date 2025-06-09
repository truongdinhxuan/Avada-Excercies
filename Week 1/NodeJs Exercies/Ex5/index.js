// 3. Filter only users with more than 3 comments.
import { fetchAllData } from '../HelperAPI.js'
const fetchAPI = async () => {
    const { users, comments, posts } = await fetchAllData()
    // console.log(comments)
    const mergeData = users.map(user => {
        const userPosts = posts.filter(post => post.userId === user.id);
        const userPostIds = userPosts.map(post => post.id);
        const userComments = comments.filter(comment => userPostIds.includes(comment.postId))
        return {
            ...user,
            posts: userPosts,
            comments: userComments,
            countComments: userComments.length,
            countPosts: userPosts.length
        };
    })
    const topCommenter = mergeData.reduce((prev, current) => {
        return current.countComments > prev.countComments ? current : prev;
    });

    const topPoster = mergeData.reduce((prev, current) => {
        return current.countPosts > prev.countPosts ? current : prev;
    });

    console.log("TOP COMMENTER")
    console.log(topCommenter.name)
    console.log("TOP POSTER")
    console.log(topPoster.name)
}

fetchAPI()
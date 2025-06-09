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
            comments: userComments
        };
    })
    
    const filteredUser = mergeData.filter(user => user.comments.length > 3)

    console.dir(filteredUser, { depth: null });

}

fetchAPI()
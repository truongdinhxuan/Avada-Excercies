// 2. Get all the posts and comments from the API. Map the data with the users array. The data format should be like this
const {APIHelper} = require ('../APIHelper')

const loadData = async () => {
    const { users, comments, posts } = await APIHelper()

    const mergeData = users.map(user => {
        const userPosts = posts.filter(post => post.userId === user.id)
        const userPostIds = userPosts.map(post => post.id)
        const userComments = comments.filter(comment => userPostIds.includes(comment.postId))
// const user= {posts:1}
        return {
            ...user,
            posts: 2,
            comments: userComments
        };
    })

    console.dir(mergeData, { depth: null });

}

loadData()
// 3. Filter only users with more than 3 comments.
const {APIHelper} = require ('../APIHelper')
const loadData = async () => {
    const { users, comments, posts } = await APIHelper()
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

    console.dir(mergeData, { depth: null });

}

loadData()
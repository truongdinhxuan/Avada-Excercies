// 3. Filter only users with more than 3 comments.
const { APIHelper } = require('../APIHelper')
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
    //sua
    // const topCommenter = mergeData[0]
    // const topPoster = mergeData[0]

    // for (n=0;n<mergeData.length;n++){
    //     const user = mergeData[n]
    //     if (user.countComments>topCommenter.countComments){
    //         topCommenter=user
    //     }
    //     if (user.countPosts>topPoster.countPosts){
    //         topPoster=user
    //     }
    // }
    // console.log("TOP COMMENTER")
    // console.log(topCommenter.name)
    // console.log("TOP POSTER")
    // console.log(topPoster.name)
    const topCommenter = mergeData.reduce((prev, current) => {
        return (prev.countComments > current.countComments) ? prev : current
    })
    const topPoster = mergeData.reduce((prev, current) => {
        return (prev.countPosts > current.countPosts) ? prev : current
    })
    console.log("TOP COMMENTER")
    console.log(topCommenter.name)
    console.log("TOP POSTER")
    console.log(topPoster.name)
}

loadData()
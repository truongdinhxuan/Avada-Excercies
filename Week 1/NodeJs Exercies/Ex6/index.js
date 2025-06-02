//Sort the list of users by the postsCount value descending?
const fetchAPI = async () => {
    const usersData = await fetch("https://jsonplaceholder.typicode.com/users")
    const commentsData = await fetch("https://jsonplaceholder.typicode.com/comments")
    const postsData = await fetch("https://jsonplaceholder.typicode.com/posts")

    const users = await usersData.json()
    const posts = await postsData.json()
    const comments = await commentsData.json()
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

    mergeData.sort((a,b) => b.countPosts - a.countPosts)
    console.dir(mergeData, {depth: null})
}

fetchAPI()
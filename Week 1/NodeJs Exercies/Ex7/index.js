const loadData = async () => {
    const [responsePost, responseComment] = await Promise.all([
        fetch("https://jsonplaceholder.typicode.com/posts/1"),
        fetch("https://jsonplaceholder.typicode.com/comments?postId=1")
    ])
    const post = await responsePost.json()
    const comments = await responseComment.json()

    const mergeData = {
        ...post,
        comments: comments
    }
    console.log(mergeData)
}

loadData()
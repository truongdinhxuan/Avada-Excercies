export const APIHelper = async () => {
    try {
        const [usersRes, commentsRes, postsRes] = await Promise.all([
            fetch("https://jsonplaceholder.typicode.com/users"),
            fetch("https://jsonplaceholder.typicode.com/comments"),
            fetch("https://jsonplaceholder.typicode.com/posts")
        ])
        if (!usersRes.ok || !commentsRes.ok || !postsRes.ok) {
            throw new Error("One or more requests failed.")
        }
        const users = await usersRes.json()
        const comments = await commentsRes.json()
        const posts = await postsRes.json()

        return { users, comments, posts }
    } catch (error) {
        console.error("Error fetching API data:", error)
    }
}
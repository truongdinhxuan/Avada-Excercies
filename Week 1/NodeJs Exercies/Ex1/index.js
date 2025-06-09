// 1. Get data from all users from API above. You will get a list of 10 users.
const loadData = async () => {
    try {
        const data = await fetch("https://jsonplaceholder.typicode.com/users")
        if (!data.ok) {
            throw new Error(`HTTP error! status: ${data.status}`);
        }
        const response = await data.json()
        console.log(response)
    } catch (error) {
        console.error(error)
    }
}
loadData()
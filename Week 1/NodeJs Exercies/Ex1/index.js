// 1. Get data from all users from API above. You will get a list of 10 users.
const fetchAPI = async () => {
    const data = await fetch("https://jsonplaceholder.typicode.com/users")
    const response = await data.json()
    console.log(response)
}
fetchAPI()
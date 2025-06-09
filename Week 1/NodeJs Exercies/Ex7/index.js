/**
 * 
 * @param {*} id 
 */
const fetchPostAndComments = async (id) => {
    const [post, comments] = await Promise.all([
        fetchAPI("/posts/" + id), 
        fetchAPI(`/comments?postId=${id}`) // string literal
    ]);
    const mergeData = {
        ...post,
        comments
    }
    console.log(mergeData)
}

/**
 * 
 * @param {*} url 
 * @returns 
 */
async function fetchAPI(url) {
    const response = await fetch("https://jsonplaceholder.typicode.com" + url);
    const data = await response.json();

    return data;
}

const admin = require("firebase-admin");
const serviceAccount = require("../../serviceAccount.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
})

const db = admin.firestore();
const todoRef = db.collection("todos");

const getTodos = async () => {
    try {
        const snapshot = await todoRef.get();
        const todos = [];
        snapshot.forEach(doc => {
            todos.push({ id: doc.id, ...doc.data() });
        });
        return todos;
    } catch (error) {
        console.error("Error getting todos:", error);
        throw error;
    }
}
const newTodo = async (data) => {
    try {
        await todoRef.add(data);
        console.log("added");
    } catch (error) {
        console.error("Error posting todos:", error);
        throw error;
    }
}
module.exports = {getTodos, newTodo}
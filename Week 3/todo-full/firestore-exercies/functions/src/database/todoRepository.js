const admin = require("firebase-admin");
admin.initializeApp()

const db = admin.firestore();
const todoRef = db.collection("todos");

const getTodos = async () => {
  const snapshot = await todoRef.get();
  const todos = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
  return {
    data: todos
  };
}
const newTodo = async (data) => {
  const docRef = todoRef.doc();
  const todoData = {
    id: docRef.id,
    ...data,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  await docRef.set(todoData);
  return todoData;
}
const updateTodo = async (id, data) => {
  await todoRef.doc(id).update({
    ...data,
    updatedAt: new Date().toISOString()
  });
}
const updateBulkTodo = async (updates) => {
  const batch = todoRef.firestore.batch();
  console.log(updates)
  for (const update of updates) {
    const {id, ...updateData} = update;
    const snapshot = await todoRef.where("id", "==", id).get();

    if (!snapshot.empty) {
      const docRef = snapshot.docs[0].ref;
      batch.update(docRef, updateData);
    } else {
      console.warn(`Todo with id ${id} not found`);
    }
  }
  await batch.commit();
}
const deleteTodo = async (id) => {
  await todoRef.doc(id).delete();
}
const deleteTodoInBulk = async (ids) => {
  const snapshot = await todoRef.where("id", "in", ids).get();
  const batch = todoRef.firestore.batch();

  snapshot.docs.forEach(doc => {
    batch.delete(doc.ref);
  });
  await batch.commit();
}
module.exports = {getTodos, newTodo, deleteTodo, updateTodo, updateBulkTodo, deleteTodoInBulk}
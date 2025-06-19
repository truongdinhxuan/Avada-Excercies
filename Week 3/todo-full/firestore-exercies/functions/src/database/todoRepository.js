const admin = require("firebase-admin");
admin.initializeApp()

const db = admin.firestore();
const todoRef = db.collection("todos");

/**
 *
 * @returns {Promise<{data: (*&{id: *})[]}>}
 */
async function getTodos({limit, orderBy}) {
  let query = todoRef;

  if (orderBy && (orderBy === "asc" || orderBy === "desc")) {
    query = query.orderBy("createdAt", orderBy);
  }
  if (limit) {
    query = query.limit(parseInt(limit, 10));
  }

  const snapshot = await query.get();
  const todos = snapshot.docs.map(function (doc) {
    return {
      id: doc.id,
      ...doc.data()
    };
  });
  return {
    data: todos
  };
}

/**
 *
 * @param data
 * @returns {Promise<*&{id: string, createdAt: Date, updatedAt: Date}>}
 */
async function newTodo(data) {
  const docRef = todoRef.doc();
  const todoData = {
    id: docRef.id,
    ...data,
    createdAt: new Date(),
    updatedAt: new Date()
  };

  await docRef.set(todoData);
  return todoData;
}

/**
 *
 * @param id
 * @param data
 * @returns {Promise<void>}
 */
async function updateTodo(id, data) {
  await todoRef.doc(id).update({
    ...data,
    updatedAt: new Date()
  });
}

/**
 *
 * @param updates
 * @returns {Promise<void>}
 */
async function updateBulkTodo(updates) {
  const batch = todoRef.firestore.batch();

  const queryPromises = updates.map(update => {
    const {id} = update;
    // where id truoc
    return todoRef.where("id", "==", id).get();
  });

  const snapshots = await Promise.all(queryPromises);
  const batchPromises = snapshots.map((snapshot, index) => {
    return new Promise((resolve) => {
      const {id, ...updateData} = updates[index];
      if (!snapshot.empty) {
        // document reference
        const docRef = snapshot.docs[0].ref;
        batch.update(docRef, updateData);
        resolve();
      } else {
        console.warn(`Todo with id ${id} not found`);
        resolve(); // return ko
      }
    });
  });
  // chờ promise xong
  await Promise.all(batchPromises);
  // mới commit
  await batch.commit();
}

/**
 *
 * @param id
 * @returns {Promise<void>}
 */
async function deleteTodo(id) {
  await todoRef.doc(id).delete();
}

/**
 *
 * @param ids
 * @returns {Promise<void>}
 */
async function deleteTodoInBulk(ids) {
  const snapshot = await todoRef.where("id", "in", ids).get();
  const batch = todoRef.firestore.batch();

  const batchPromises = snapshot.docs.map(doc => {
    return new Promise((resolve) => {
      batch.delete(doc.ref);
      resolve();
    })
  })
  await Promise.all(batchPromises);
  await batch.commit();
}

module.exports = {getTodos, newTodo, deleteTodo, updateTodo, updateBulkTodo, deleteTodoInBulk}
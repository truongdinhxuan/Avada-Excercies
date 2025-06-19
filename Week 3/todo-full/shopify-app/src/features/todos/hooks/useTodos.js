import { getAllTodos, createTodo, deleteTodo, deleteTodos, updateTodo, updateTodos } from "../../../api/todo.service"
import { useState, useCallback, useEffect } from "react"

export const useTodos = () => {
  const [items, setItems] = useState([])
  const [selectedItems, setSelectedItems] = useState([])
  const [errorMessage, setErrorMessage] = useState('')

  // Fetch all todo items on component mount
  const fetchTodos = async () => {
    try {
      const response = await getAllTodos();
      if (response && response.data) {
        const todos = response.data.map(todo => ({
          id: todo.id,
          title: todo.title,
          isCompleted: todo.isCompleted
        }));
        setItems(todos);
      }
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const create = useCallback(async (title) => {
    try {
      const newItem = {
        title,
        isCompleted: false
      }
      await createTodo(newItem)
      const response = await getAllTodos();
      if (response && response.data) {
        const todos = response.data.map(todo => ({
          id: todo.id,
          title: todo.title,
          isCompleted: todo.isCompleted
        }));
        setItems(todos);
      }
    } catch (error) {
      console.error(error.response.data.error);
    }
  }, [])

  const removeTodo = useCallback(async (indices) => {
    try {
      const indexes = Array.isArray(indices) ? indices : [indices];

      const itemsToDelete = items.filter((_, index) => indexes.includes(index));
      const idsToDelete = itemsToDelete.map(item => item.id);

      const deletePromises = idsToDelete.map(id => deleteTodo(id));
      await Promise.all(deletePromises);

      setItems(prev => prev.filter((_, index) => !indexes.includes(index)));
    } catch (error) {
      console.error(error.response.data.error);
    }
  }, [items])

  const removeTodos = useCallback(async (ids) => {
    try {
      await deleteTodos(ids)
      setItems(prev => prev.filter(item => !ids.includes(item.id)));
    } catch (error) {
      console.error(error.response.data.error);
    }
  }, [])
  const toggleStatusTodo = useCallback(async (itemId) => {
    try {
      const currentItem = items.find(item => item.id === itemId);
      if (!currentItem) return;
      const updateData = {
        ...currentItem,
        isCompleted: !currentItem.isCompleted
      }
      console.log('Updating item:', updateData);
      await updateTodo(itemId, updateData)
      // local update
      setItems(prev =>
        prev.map(item =>
          item.id === itemId
            ? { ...item, isCompleted: !item.isCompleted }
            : item
        )
      )
    } catch (error) {
      console.error('Error updating item completion status:', error);
    }
  }, [items]);
  const handleCompleteStatusTodos = useCallback(async (itemSelected) => {
    try {
      const itemsToUpdate = items.filter(item => itemSelected.includes(item.id));
      const updatePromises = itemsToUpdate.map(item => ({
        id: item.id,
        isCompleted: true
      }));

      console.log('Updating todos:', updatePromises);
      await updateTodos(updatePromises);
      // local update
      setItems(prev =>
        prev.map(item =>
          itemSelected.includes(item.id)
            ? { ...item, isCompleted: true }
            : item
        )
      );
    } catch (error) {
      console.error('Error updating todos status:', error);
    }
  }, [items])
  const handleInCompleteStatusTodos = useCallback(async (itemSelected) => {
    try {
      const itemsToUpdate = items.filter(item => itemSelected.includes(item.id));

      const updatePromises = itemsToUpdate.map(item => ({
        id: item.id,
        isCompleted: false
      }));

      await updateTodos(updatePromises);
      setItems(prev =>
        prev.map(item =>
          itemSelected.includes(item.id)
            ? { ...item, isCompleted: false }
            : item
        )
      );
    } catch (error) {
      console.error('Error updating item completion status:', error);
    }
  }, [items]);
  return { items, create, removeTodo, removeTodos, toggleStatusTodo, handleCompleteStatusTodos, handleInCompleteStatusTodos };
}
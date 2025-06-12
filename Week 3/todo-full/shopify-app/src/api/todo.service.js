import instance from "./api.service"

export const getAllTodos = async () => {
    return instance.get('todos')
}
export const createTodo = async (data) => {
    return instance.post('todos', data)
}
export const deleteTodo = async (id) => {
    return instance.delete(`todos/${id}`)
}
export const deleteTodos = async (ids) => {
    return instance.delete('todos', { data: { ids } })
}
export const updateTodo = async (id, data) => {
    return instance.put(`todos/${id}`, data)
}
export const updateTodos = async (data) => {
    return instance.put(`todos`, data)
}
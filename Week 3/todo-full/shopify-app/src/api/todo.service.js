import instance from "./api.service"

export const getAllTodos = async () => {
    return instance('todos')
}
export const createTodo = async (data) => {
    return instance.post('todos', data)
}
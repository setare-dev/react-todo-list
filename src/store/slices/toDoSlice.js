import { createSlice } from '@reduxjs/toolkit';

const toDoSlice = createSlice({
    name: 'Todo',
    initialState: {
        list: []
    },
    reducers: {
        setTodos: (state, { payload }) => {
            state.list = payload;
        },
        addTodo: (state, action) => {
            state.list.unshift(action.payload)
        },
        deleteTodo: (state, action) => {
            state.list = state.list.filter(todo => todo.id !== action.payload)
        },
        toggleDone: (state, action) => {
            state.list = state.list.map((todo) => {
                return todo.id === action.payload ? {
                    ...todo,
                    done: !todo.done
                } : todo
            })
        },
        editTodo: (state, { payload }) => {
            state.list = state.list.map(todo => todo.id === payload.id ? { ...todo, text: payload.text } : todo)
        },

    }
})

export const { addTodo, deleteTodo, toggleDone, editTodo, setTodos } = toDoSlice.actions;
export default toDoSlice.reducer;
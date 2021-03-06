import todoApi from '../../api/todoApi';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addTodo } from './../../store/slices/toDoSlice';
import { ToastAlert } from '../../customAlert';
const AddTodos = () => {
    const dispatch = useDispatch();
    const [inputTodo, setInputTodo] = useState("");

    const inputTodoHandler = (e) => setInputTodo(e.target.value);

    const addTodoHandler = async () => {

        if (inputTodo.length > 0) {
            const newTodo = {
                text: inputTodo,
                done: false
            }
            try {
                const res = await todoApi.post('/to_do', newTodo);
                dispatch(addTodo(res.data.data))
                setInputTodo('')
                ToastAlert('Added successfully')
            } catch (error) {
                console.log(error)
            }


        }
    }

    const keyDownHandler = (e) => {
        if (e.key === 'Enter') {
            addTodoHandler()
        }
    }
    return (
        <div className="flex mt-4">
            <input
                value={inputTodo}
                onChange={inputTodoHandler}
                onKeyDown={keyDownHandler}
                className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker" placeholder="Add Todo" />
            <button
                onClick={addTodoHandler}
                className="flex-no-shrink p-2 border-2 rounded text-sky-700 border-sky-700 hover:text-white hover:bg-sky-700">Add</button>
        </div>
    )
}

export default AddTodos
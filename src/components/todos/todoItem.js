import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { QuestionAlert, ToastAlert } from '../../customAlert';
import { deleteTodo, toggleDone, editTodo } from './../../store/slices/toDoSlice'

const TodoItem = ({ todo }) => {

    const [editMode, setEditMode] = useState();
    const [editText, setEditText] = useState('');

    const dispatch = useDispatch();

    const deleteTodoHandeler = async () => {
        const result = await QuestionAlert()
        if (result) {
            try {
                const res = await axios.delete(`https://6292d1a74e324aacf6dc841a.endapi.io/to_do/${todo.id}`);
                if (res.status === 200) {
                    dispatch(deleteTodo(todo.id))
                    ToastAlert('Deleted successfully')
                }
            } catch (error) {
                console.log(error);
            }
        }
    }

    const toggleDoneHandeler = async () => {
        try {
            const res = await axios.put(`https://6292d1a74e324aacf6dc841a.endapi.io/to_do/${todo.id}`, {
                done: !todo.done
            });
            if (res.status === 200) {
                dispatch(toggleDone(todo.id))
            }
        } catch (error) {
            console.log(error);
        }

    }

    const editTodoHandeler = async () => {
        console.log("edit");
        try {
            const res = await axios.put(`https://6292d1a74e324aacf6dc841a.endapi.io/to_do/${todo.id}`, {
                text: editText
            });
            if (res.status === 200) {
                dispatch(editTodo({ id: todo.id, text: editText }))
                setEditMode(false)
            }
        } catch (error) {
            console.log(error);
        }

    }

    const inputEditHandler = (e) => setEditText(e.target.value);



    return (
        <div className="flex mb-4 items-center" >
            {editMode ? <> <input className='w-full text-grey-darkest h-11 px-2 border-2 border-blue-600 rounded-md mr-2' onChange={inputEditHandler} value={editText} /> <button
                onClick={editTodoHandeler}
                className="flex-no-shrink p-2 ml-2 border-2 rounded  border-blue-600 text-white bg-blue-600">Edit</button></> : <> <p className={`w-full text-grey-darkest ${todo.done ? `line-through  text-green-700` : `text-grey-700`}`}>{todo.text}</p> {todo.done ? <button
                    onClick={toggleDoneHandeler}
                    className="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-white text-grey-500 border-grey-500 hover:bg-gray-500">NotDone</button> : <button
                        onClick={toggleDoneHandeler}
                        className="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-white text-lime-600 border-lime-600 hover:bg-lime-600">Done</button>}
                <button
                    onClick={() => {
                        setEditMode(true);
                        setEditText(todo.text)
                    }}
                    className="flex-no-shrink p-2 ml-2 border-2 rounded text-blue-600 border-blue-600 hover:text-white hover:bg-blue-600">Edit</button>
                <button
                    onClick={deleteTodoHandeler}
                    className="flex-no-shrink p-2 ml-2 border-2 rounded text-red-600 border-red-600 hover:text-white hover:bg-red-600">Remove</button> </>}


        </div >
    )
}

export default TodoItem
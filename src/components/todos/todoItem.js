import todoApi from '../../api/todoApi';
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
                const res = await todoApi.delete(`/to_do/${todo.id}`);
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
        console.log(!todo.done);
        try {
            const res = await todoApi.put(`/to_do/${todo.id}`, {
                done: !todo.done,
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
            const res = await todoApi.put(`/to_do/${todo.id}`, {
                text: editText
            });
            if (res.status === 200) {
                dispatch(editTodo({ id: todo.id, text: editText }))
                setEditMode(false)
                ToastAlert('Edited successfully')
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
                className="flex-no-shrink p-2 ml-2 border-2 rounded  border-blue-600 text-white bg-blue-600">Edit</button></> :
                <>
                    {todo.done && <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-1 text-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>}
                    <p className={`w-full text-grey-darkest ${todo.done ? `line-through  text-green-700` : `text-grey-700`}`}>{todo.text}</p>
                    <button
                        onClick={toggleDoneHandeler}
                        className={`flex-no-shrink p-1 h-9  ml-4 mr-2 border-2 rounded hover:text-white  ${!todo.done ? `text-grey-500 border-grey-500 hover:bg-gray-500` : `text-lime-600 border-lime-600 hover:bg-lime-600`}`}>{!todo.done ? "Done" : "NotDone"}</button>
                    <button
                        onClick={() => {
                            setEditMode(true);
                            setEditText(todo.text)
                        }}
                        className="flex-no-shrink p-2 ml-2 border-2 rounded text-blue-600 border-blue-600 hover:text-white hover:bg-blue-600"><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg></button>
                    <button
                        onClick={deleteTodoHandeler}
                        className="flex-no-shrink p-2 ml-2 border-2 rounded text-red-600 border-red-600 hover:text-white hover:bg-red-600"><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg></button> </>}
        </div >
    )
}

export default TodoItem
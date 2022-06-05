import { toast } from 'react-toastify'
import Swal from 'sweetalert2'

const ToastAlert = (message, TYPE = 'success') => {
    return toast(message, {
        position: 'bottom-left',
        type: TYPE,
        autoClose: 3000,
        rtl: true,
        theme: 'colored',
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
    })
}

const QuestionAlert = (
    html = 'Are you sure?',
    confirmButtonText = 'Yes',
    cancelButtonText = 'No'
) => {
    return new Promise((resolve) => {
        // eslint-disable-next-line no-promise-executor-return
        return Swal.fire({
            icon: 'question',
            html,
            showConfirmButton: true,
            showCancelButton: true,
            confirmButtonText,
            cancelButtonText,
        }).then((result) => {
            if (result.isConfirmed) return resolve(true)
            return resolve(false)
        })
    })
}

export { ToastAlert, QuestionAlert }

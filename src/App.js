import TodosSection from './components/todos'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
const App = () => {

  return (
    <>
      <TodosSection />
      <ToastContainer />
    </>
  );
}

export default App;

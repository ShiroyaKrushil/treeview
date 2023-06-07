import './App.css';
import TreeView from './Treeview';
// import Modal from './demo'
import Modal from './Modal';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <div>
      <ToastContainer />
        <TreeView />
    </div>
  );
}

export default App;

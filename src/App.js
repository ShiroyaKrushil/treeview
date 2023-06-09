import './App.css';
import TreeView from './pages/Treeview';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux';
import { store } from './service/store/Store'

function App() {
  return (
    <div>
      <Provider store={store}>
        <ToastContainer />
        <TreeView />
      </Provider>
    </div>
  );
}
export default App;

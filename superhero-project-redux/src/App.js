import { Provider } from "react-redux";

import './App.css';
import Routes from './routes';
import store from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
}

export default App;

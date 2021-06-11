import './App.css';
import Routes from './routes';

import AuthProvider from "./context/auth/Provider";
import SuperHeroProvider from "./context/superhero/Provider";

function App() {
  return (
    <AuthProvider>
      <SuperHeroProvider>
        <Routes />
      </SuperHeroProvider>
    </AuthProvider>
  );
}

export default App;

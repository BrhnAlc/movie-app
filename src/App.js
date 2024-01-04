
import './App.css';
import AuthContextProvider from './context/AuthContext';
import MovieContextProvider from './context/MovieContext';
import AppRouter from './router/AppRouter';
import { ToastContainer } from 'react-toastify';


function App() {
  return (
    <div className="dark:bg-gray-dark-main min-h-screen">
      <AuthContextProvider>
        <MovieContextProvider>
            <AppRouter/>
            <ToastContainer />
        </MovieContextProvider>
      </AuthContextProvider>
    </div>
  );
}

export default App;

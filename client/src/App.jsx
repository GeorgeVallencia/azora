import NavBar from './components/NavBar';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Root from './pages/Root';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { UserContextProvider } from './context/UserContext';
import ProfilePage from './pages/ProfilePage';
import CheckOutPage from './pages/CheckOutPage';


const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: '/login',
        element: <LoginPage />
      },
      {
        path: '/register',
        element: <RegisterPage />
      },
      {
        path: '/profile',
        element: <ProfilePage />
      },
      {
        path: '/payment',
        element: <CheckOutPage />
      }
    ]
  }
]);

function App() {

  return(
    <UserContextProvider>
      <RouterProvider router={router} />
    </UserContextProvider>
  );
}

export default App;
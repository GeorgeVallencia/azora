import NavBar from './components/NavBar';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Root from './pages/Root';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { UserContextProvider } from './context/UserContext';
import ProfilePage from './pages/ProfilePage';
import CheckOutPage from './pages/CheckOutPage';
import DashboardPage from './pages/DashboardPage';
import GoalsPage from './pages/GoalsPage';
import HabitsPage from './pages/HabitsPage';
import TimeTrackingPage from './pages/TimeTrackingPage';
import FeaturesPage from './pages/FeaturesPage';
import PricingPage from './pages/PricingPage';
import AboutPage from './pages/AboutPage';
import IntegrationsPage from './pages/IntegrationsPage';
import ChangelogPage from './pages/ChangelogPage';
import BlogPage from './pages/BlogPage';
import CareersPage from './pages/CareersPage';
import ContactPage from './pages/ContactPage';
import HelpCenterPage from './pages/HelpCenterPage';
import DocumentationPage from './pages/DocumentationPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsOfServicePage from './pages/TermsOfServicePage';


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
      },
      {
        path: '/dashboard',
        element: <DashboardPage />
      },
      {
        path: '/goals',
        element: <GoalsPage />
      },
      {
        path: '/habits',
        element: <HabitsPage />
      },
      {
        path: '/time-tracking',
        element: <TimeTrackingPage />
      },
      {
        path: '/features',
        element: <FeaturesPage />
      },
      {
        path: '/pricing',
        element: <PricingPage />
      },
      {
        path: '/about',
        element: <AboutPage />
      },
      {
        path: '/integrations',
        element: <IntegrationsPage />
      },
      {
        path: '/changelog',
        element: <ChangelogPage />
      },
      {
        path: '/blog',
        element: <BlogPage />
      },
      {
        path: '/careers',
        element: <CareersPage />
      },
      {
        path: '/contact',
        element: <ContactPage />
      },
      {
        path: '/help',
        element: <HelpCenterPage />
      },
      {
        path: '/docs',
        element: <DocumentationPage />
      },
      {
        path: '/privacy',
        element: <PrivacyPolicyPage />
      },
      {
        path: '/terms',
        element: <TermsOfServicePage />
      }
    ]
  }
]);

function App() {

  return (
    <UserContextProvider>
      <RouterProvider router={router} />
    </UserContextProvider>
  );
}

export default App;
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from './layouts/RootLayout';
import Home from './pages/Home';
import Api from './pages/Api';
import Examples from './pages/Examples';

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <RootLayout />,
      children: [
        { index: true, element: <Home /> },
        { path: 'api/*', element: <Api /> },
        { path: 'examples', element: <Examples /> },
      ],
    },
  ],
  {
    basename: import.meta.env.BASE_URL,
  }
);

export default function App() {
  return <RouterProvider router={router} />;
}

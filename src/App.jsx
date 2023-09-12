import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import {
  About,
  Landing,
  HomeLayout,
  Cocktail,
  Error,
  Newsletter,
  SinglePageError,
} from './pages';

import { loader as landingLoader } from './pages/Landing';
import { loader as singlePageLoader } from './pages/Cocktail';
import { action as newsletterAction } from './pages/Newsletter';

import {
  QueryClient,
  QueryClientProvider,
  useQueryClient,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
});

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
        errorElement: <SinglePageError />,
        loader: landingLoader(queryClient),
      },

      {
        path: 'Newsletter',
        element: <Newsletter />,
        action: newsletterAction,
      },
      {
        path: 'Cocktail/:id',
        errorElement: <SinglePageError />,
        loader: singlePageLoader(queryClient),
        element: <Cocktail />,
      },

      {
        path: 'About',
        element: <About />,
      },
    ],
  },
]);

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />;
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
export default App;

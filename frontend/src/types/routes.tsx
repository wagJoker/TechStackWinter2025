import { lazy, Suspense } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import { Loader2 } from 'lucide-react'

const Layout = lazy(() => import('./components/Layout'))
const ArtworkList = lazy(() => import('./components/ArtworkList'))
const ArtworkForm = lazy(() => import('./components/ArtworkForm'))
const Auth = lazy(() => import('./components/Auth'))
const NotFound = lazy(() => import('./components/NotFound'))

const Loading = () => (
  <div className="flex h-screen items-center justify-center">
    <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
  </div>
)

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Suspense fallback={<Loading />}>
        <Layout />
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<Loading />}>
            <ArtworkList />
          </Suspense>
        ),
      },
      {
        path: 'add',
        element: (
          <Suspense fallback={<Loading />}>
            <ArtworkForm />
          </Suspense>
        ),
      },
      {
        path: 'edit/:id',
        element: (
          <Suspense fallback={<Loading />}>
            <ArtworkForm />
          </Suspense>
        ),
      },
      {
        path: 'auth',
        element: (
          <Suspense fallback={<Loading />}>
            <Auth />
          </Suspense>
        ),
      },
      {
        path: '*',
        element: (
          <Suspense fallback={<Loading />}>
            <NotFound />
          </Suspense>
        ),
      },
    ],
  },
])
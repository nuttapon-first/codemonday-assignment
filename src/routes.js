import { lazy } from 'react'

const Covid = lazy(() => import('./views/Covid'))
const Details = lazy(() => import('./views/Details'))

const routes = [
    { path: '/', exact: true, name: 'Home' },
    { path: '/covid', name: 'covid', component: Covid },
    { path: '/details', name: 'details', component: Details }
]

export default routes
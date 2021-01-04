import MainLayout from 'layouts/MainLayout'
import Index from 'pages/Index'
import Error404 from 'pages/Error404'
import Config from 'pages/Config'
import Sync from 'pages/Sync'

const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [
      { path: '', component: Index },
      { path: 'config', component: Config },
      { path: 'sync', component: Sync }
    ]
  },

  { path: '*', component: Error404 }
]

export default routes

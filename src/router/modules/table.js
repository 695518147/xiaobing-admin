/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const tableRouter = {
  path: '/table',
  component: Layout,
  redirect: '/table/order-table',
  name: 'Table',
  meta: {
    title: '模块',
    icon: 'table'
  },
  children: [
    {
      path: 'ordertype-table',
      component: () => import('@/views/table/ordertype-table'),
      name: 'ordertype-table',
      meta: { title: '类别配置' }
    },
    {
      path: 'order-table',
      component: () => import('@/views/table/order-table'),
      name: 'order-table',
      meta: { title: '指令配置' }
    },
    {
      path: 'tip-table',
      component: () => import('@/views/table/tip-table'),
      name: 'tip-table',
      meta: { title: '提示配置' }
    }
  ]
}
export default tableRouter

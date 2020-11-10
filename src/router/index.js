import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import('../views/home/Home.vue')
const Category = () => import('../views/category/Category.vue')
const Cart = () => import('../views/cart/Cart.vue')
const Profile = () => import('../views/profile/Profile.vue')
const Detail = () => import('../views/detail/Detail.vue')
// 安装插件
Vue.use(VueRouter)

// 创建router
const routes = [
	{
		path: '',
		redirect: '/home'
	},
	{
		path: '/home',
		component: Home
	},
	{
		path: '/cart',
		component: Cart
	},
	{
		path: '/profile',
		component: Profile
	},
	{
		path: '/category',
		component: Category
	},
	{
		path: '/detail/:id',
		component: Detail
	}
]

const router = new VueRouter({
	routes,
	mode: 'history'
})

// 导出路由
export default router
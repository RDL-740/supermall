import axios from 'axios'

export function request(config) {
	// 创建axios实例
	const instance = axios.create({
		baseURL: 'http://152.136.185.210:8000/api/w6',
		timeout: 500
	})

	// axios拦截器
	instance.interceptors.response.use(config => {
		// 处理拦截到的响应数据
		

		// 把处理后的数据返回出去
		return config
	}, err => {
		console.log(err)
	})

	// 返回结果
	return instance(config)
}
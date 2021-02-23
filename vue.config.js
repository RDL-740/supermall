module.exports = {
	// 别名配置
	configureWebpack: {
		resolve: {
			extensions: [],
			alias: {
				'assets': '@/assets',
				'common': '@/common', 
				'components': '@/components',
				'network': '@/network',
				'views': '@/views'
			}
		}
	}
}
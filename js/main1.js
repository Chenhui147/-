/*
	配置模块

 */
require.config({
	paths: {
		"jquery": "jquery-1.11.3",
		"jquery-cookie": "jquery.cookie",
		"homePage": "homePage",
	},
	//设置，模块之间的依赖关系
	shim: {
		//保证，先加载JQuery，再加载
		"jquery-cookie": ["jquery"],
		/*
			定义不遵从AMD规范的js文件

		 */
		/*"parabola": {
			exports: "_"
		}*/
	}
})

//主动调用
require(["homePage"], function(homePage){
	homePage.homePage();
})
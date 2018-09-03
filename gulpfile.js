var gulp = require("gulp");
/*
	设置gulp任务gulp.task(),它有两个参数：
	第一个参数  任务的名字
	第二个参数  任务的回调函数
 */

//用gulp进行文件拷贝 
//1、拷贝html文件 
gulp.task("copyhtml",function(){//dist是一个文件夹，文件拷贝后要放的文件夹，如果没有这个文件夹，会自动创建    
return gulp.src("html/*.html").pipe(gulp.dest("dist")).pipe(connect.reload()); 
});


//2、拷贝图片
gulp.task("copyImg",function(){     
return gulp.src("images/**/*").pipe(gulp.dest("dist/images")).pipe(connect.reload());//这就是将images文件里的所有格式的图片和文件都拷贝过去了
});


//3、拷贝数据文件(例如.json、.txt、.xml文件)将这些文件一起拷贝  同时要排除掉一些文件，用!号排除指定文件
gulp.task("copyData",function(){
	return gulp.src("data/*.json").pipe(gulp.dest("dist/data")).pipe(connect.reload());
});

gulp.task("copyJs",function(){
	return gulp.src("js/*.js").pipe(gulp.dest("dist/js")).pipe(connect.reload());
});


//4、一次性执行多个命令
gulp.task("all",["copyhtml","copyImg","copyData","copyJs"],function(){//当所有任务结束以后执行的函数
	console.log("执行完毕");
	//三个任务同时启动，是异步执行的
})


//5、监听  监听各任务以后就会实时改变
gulp.task("watch",function(){
	/*gulp.watch()有两个参数
	第一个参数，是我们要检测的文件路径，注意如果是一个路径直接传参，如果超过一个路径直接写数组
	第二个参数，如果检测文件发生改变，去执行的任务，必须是数组*/

	gulp.watch("html/*.html",["copyhtml"]);
	gulp.watch("images/**/*",["copyImg"]);
	gulp.watch("data/*.json",["copyData"]);
	gulp.watch("scss/*.scss",["sass"]);
	gulp.watch("js/*.js",["copyJs"]);
})


//gulp插件
/*
	一、gulp-sass-china插件是用来编译.scss/.sass文件的，将这两种文件编译成.css文件

	用了scss以后，我们编写css的时候，就可以像编写js代码一样，应用一些语法，快速编程。

	gulp-scss 在苹果系统上使用
	gulp-sass-china  在windows下使用
 */

 //二、压缩css的插件 gulp-minify-css
 //三、重名命插件 gulp-rename

 var sass = require("gulp-sass-china");
 var minifyCss = require("gulp-minify-css");
 var rename = require("gulp-rename");
 gulp.task("sass",function(){
 	return gulp.src("scss/*.scss")
 	.pipe(sass())
 	.pipe(gulp.dest("dist/css"))
 	.pipe(connect.reload());
 });


 //四、在项目下搭建临时的服务器的插件 gulp-connect
 var connect = require("gulp-connect");
 gulp.task("server",function(){
 	/*
		让文件发生改变以后，自动更新
		并且页面上自动更新
	 */
 	connect.server({
 		root:"dist",//设置根目录
 		port:9000,//端口
 		livereload: true //实时刷新
 	})
 })


 //设置默认的gulp任务 因为要将服务和监听同时启动
 gulp.task("default",["server","watch"]);//输入gulp命令就可以运行了


 //五、合并两个文件成为一个文件的插件 gulp-concat
 /* 六、压缩js文件的插件 gulp-uglify
	开发版本  xxx.js
	上线版本  xxx.min.js
*/

var concat = require("gulp-concat");
var uglifyJs = require("gulp-uglify");
gulp.task("concat",function(){
	return gulp.src(["*.js","!gulpfile.js"]).pipe(concat("index.js")).pipe(gulp.dest("dist/js")).pipe(uglifyJs()).pipe(rename("index.min.js")).pipe(gulp.dest("dist/js")).pipe(connect.reload());
})






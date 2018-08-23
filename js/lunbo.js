define(["jquery"],function($){
	var lunbo = function({leftBtn,rightBtn,imgs,circlebtn,circlebtnI,ul1}){
			/*所传参数：
			1、$("#box>.leftBtn")  
			2、$("#box>.rightBtn") 
			3、$("#box>ul>li>a>img")
			4、$('#box>.circlebtn')
			5、$("#box>.circlebtn>i")
			6、$("#box>ul")
			*/


			//1、左右按钮的移入、移出
			$(leftBtn).mouseover(function(){
				$(this).css("background","url(images/btn.png) no-repeat");
			}).mouseout(function(){
				$(this).css("background","url(images/btn.png) no-repeat -83px 0");
			})

			$(rightBtn).mouseover(function(){
				$(this).css("background","url(images/btn.png) no-repeat -41px 0");
			}).mouseout(function(){
				$(this).css("background","url(images/btn.png) no-repeat -124px 0");
			})

			//创建小圆点按钮
			var length = $(imgs).size();
			//console.log(length);
			for(var i = 0;i < length;i++){
				$("<i></i>").appendTo($(circlebtn));
			}

			//鼠标划过按钮改变背景色,点击按钮改变图片和背景色
			var currentIndex1 = 0;
			$(circlebtnI).eq(currentIndex1.attr("class","active"));
			$(circlebtnI).mouseover(function(){
				$(this).css("background","#fff");
			}).mouseout(function() {
				$(this).css("background","#899496");
			}).click(function() {
				currentIndex1= $(this).index();
				change1();
			});


			//在点击和自动轮播的时候,既要改变图片，也要改变按钮的背景
			function change1(){
				//图片变化
				$(ul1).stop().animate({left:-$(imgs).eq(0).width() * currentIndex1}, 500);
				//改变按钮背景
				$(circlebtnI).attr("class"," ").eq(currentIndex1.attr("class","active"));
				//console.log(currentIndex1;
			}

			//点击左右按钮的时候也要改变图片
			$(leftBtn).click(function(){
				if (currentIndex1== 0) {
					currentIndex1= length - 1;
					change1();
				}else{
					currentIndex1-= 1;
					change1();
				}
			});

			$(rightBtn).click(function(){
				currentIndex1+= 1;
				if (currentIndex1== length) {
					currentIndex1= 0;
				}
				change1();
			});	
		}
	return {
		lunbo:lunbo
	}
})
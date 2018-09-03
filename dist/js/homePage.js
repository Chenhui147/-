define(["cookieSet","jquery", "jquery-cookie"],function(cookie2,$){
	var homePage = function(){
		//head部分
		$("#head>.head-con a:not('.buyCar')").mouseover(function() {
			$(this).css("color","#fff");
		}).mouseout(function() {
			$(this).css("color","#b7b7b7");
		});

		//head中的购物车
		//页面一加载就把购物车的数量展现出来
		var oCarNum = $("#head > .head-con > div > .buyCar > a>span:nth-child(2)");
		cookie2.buyNumber($(oCarNum));
		cookie2.buyCarColor($(oCarNum));

		var oCarUl = $("#head > .head-con > div > .buyCar > ul");
		$("#head>.head-con>div>.buyCar").mouseenter(function() {
			$(oCarUl).html("");
			//展现购物车的商品
			cookie2.buyMsg("../data/listPage.json");
		});

		//购物车的移入/移出
		$("#head>.head-con>div>.buyCar").mouseover(function() {
			$(this).css({background:"#fff",color:"#ff732a"});
			$("#head>.head-con>div>.buyCar>a").css({color:"#ff732a"});
			$(this).find("ul").stop().animate({
				"height":$(oCarUl).attr("iHeight")
			},300);
		}).mouseout(function() {
			$(this).find("ul").stop().animate({
				height:0
			},300,function(){
				$(this).parent().css({background:"#424242"});
				$("#head>.head-con>div>.buyCar>a").css({color:"#b7b7b7"});
				cookie2.buyCarColor($(oCarNum));
			});
		});


		//nav1部分
		$.ajax({
			url: '../data/nav1.json',
			method:"GET",
			success:function(arr){
				for(var i = 0;i < arr.length;i++){
					var oLi = $(`<li></li>`);
					oLi.appendTo($(".nav1-con > ul"));
					$(`<a href="#">${arr[i].title}</a>`).attr("id",i).appendTo(oLi);
					var arr2 = arr[i].child;
					var length1 = arr2.length;		
					if (length1) {
						var oDiv = $(`<div></div>`);
						oDiv.appendTo($ ('.nav1-con'));
						for(var j = 0;j < length1;j++){
							var oUl = $(`<ul></ul>`);
							var oLi1 = $(`<li>${arr2[j].isNew}</li>`);
							oLi1.appendTo(oUl);
							if (arr2[j].isNew.length == 0) {
								oLi1.css("visibility","hidden");
							}
						$(`<li><a href="/detailPage.html?id=${arr2[j].id}"><img src="${arr2[j].img}" alt=""></a></li>
							<li>${arr2[j].phoneName}</li>
							<li>${arr2[j].price}</li>`).appendTo(oUl);
						oUl.appendTo(oDiv);						
						}
					}									
				}
				$(".nav1-con > div").mouseover(function() {
		 			$(this).stop().animate({"height":"228px"},300);
		 		}).mouseout(function() {
		 			$(this).stop().animate({"height":"0"},300);
		 		});	
			},
			error:function(msg){
				console.log(msg);
			}
		});

		$(".nav1-con > ul").on("mouseenter","a",function(){
			 index = this.id;
			$(this).css("color","#fb6906");		
			//console.log(index);
		 	$(".nav1-con > div").eq(index).css("zIndex","3").stop().animate({"height":"228px"},300);		
		 }).on("mouseleave","a",function(){
		 	$(this).css("color","#4c4c4c");
		 	$(".nav1-con > div").eq(index).stop().animate({"height":"0"},300);
		 });

		 //给input中的a添加移入/移出事件
		 $(".nav1-con > p > a:not('.nav1-con > p > a:nth-of-type(1)')").hover(function(){
		 	$(this).css({"background":"#fc6b00","color":"#fff"});
		 },function(){
		 	$(this).css({"background":"#efefef","color":"#767772"});
		 })

		 $(".nav1-con > p > a:nth-of-type(1)").hover(function(){
		 	$(this).css({"background":"#fc6b00","color":"#fff!important"});
		 },function(){
		 	$(this).css({"background":"#fff","color":"#5d5e56"});
		 });


		 //轮播图中的左导航栏部分
		 $.ajax({
		 	url: '../data/switchable.json',
		 	type: 'GET',
		 })
		 .done(function(arr) {		 	
		 	//console.log(arr);
		 		for(var i = 0;i < arr.length;i++){
		 			if (typeof arr[i] == "string") {//这是创建轮播图的图片
		 				$(`<li><a href="#"><img src="${arr[i]}" alt=""></a></li>`).appendTo($('.switchable-con .right > ul '));
		 			}else{
		 				$(`<li>
							<a href="#">${arr[i].title}</a>
							<span class="iconfont icon-right"></span>
						</li>`).appendTo($('.switchable-con .left'));
						var oDiv = $("<div></div>");
						oDiv.appendTo($('.switchable-con .left'));
						var arr2 = arr[i].child;
						for(var j = 0;j < arr2.length;j++){
							var oUl = $("<ul></ul>");
							for(var k = 0;k < arr2[j].length;k++){
								$(`<a href="/detailPage.html?id=${arr2[j][k].id}">
									<img src="${arr2[j][k].img}" alt="">
									<span>${arr2[j][k].name}</span>
								</a>`).appendTo(oUl);
							}
							oUl.appendTo(oDiv);
						}
		 			}
		 		}
		 		//左导航部分
		 		$(".switchable-con .left > li").mouseenter(function() {
		 			$(this).css("background","#ff6702");
		 			var index = $(this).index() / 2;
		 			//console.log($(this).index());
		 			$(".switchable-con .left > div").css("display","none").eq(index).css("display","block");
		 		}).mouseleave(function() {
		 			$(this).css("background","#585858");
		 			$(".switchable-con .left > div").css("display","none");
		 		});
		 		$(".switchable-con .left > div").hover(function(){
		 			$(this).css("display","block");
		 		},function(){
		 			$(this).css("display","none");
		 		});
		 		$(".switchable-con .left > div > ul > a").hover(function(){
		 			$(this).css("color","#f86d28");
		 		},function(){
		 			$(this).css("color","#182c23");
		 		});


				 //轮播图部分
				 //1、左右按钮的移入、移出
				$(".switchable-con >.right>.leftBtn").mouseover(function(){
					$(this).css("background","url(../images/lunboPic/btn.png) no-repeat");
				}).mouseout(function(){
					$(this).css("background","url(../images/lunboPic/btn.png) no-repeat -83px 0");
				})

				$(".switchable-con >.right>.rightBtn").mouseover(function(){
					$(this).css("background","url(../images/lunboPic/btn.png) no-repeat -41px 0");
				}).mouseout(function(){
					$(this).css("background","url(../images/lunboPic/btn.png) no-repeat -124px 0");
				})

				//创建小圆点按钮
				var length = $(".switchable-con >.right>ul>li>a>img").size();
				//console.log(length);
				for(var i = 0;i < length;i++){
					$("<i></i>").appendTo($('.switchable-con >.right>.circlebtn'));
				}

				//鼠标划过按钮改变背景色,点击按钮改变图片和背景色
				var currentIndex = 0;
				$(".switchable-con >.right>.circlebtn>i").eq(currentIndex).attr("class","active");
				$(".switchable-con >.right>.circlebtn>i").mouseover(function(){
					$(this).css("background","#fff");
				}).mouseout(function() {
					$(this).css("background","#899496");
				}).click(function() {
					currentIndex = $(this).index();
					change();
				});


			//在点击和自动轮播的时候,既要改变图片，也要改变按钮的背景
			function change(){
				//图片变化
				$(".switchable-con >.right>ul").stop().animate({left:-$(".switchable-con >.right>ul>li>a>img:eq(1)").width() * currentIndex}, 500);
				//改变按钮背景
				$(".switchable-con >.right>.circlebtn>i").attr("class"," ").eq(currentIndex).attr("class","active");
				//console.log(currentIndex);
			}

			//点击左右按钮的时候也要改变图片
			$(".switchable-con >.right>.leftBtn").click(function(){
				if (currentIndex == 0) {
					currentIndex = length - 1;
					change();
				}else{
					currentIndex -= 1;
					change();
				}
			});

			$(".switchable-con >.right>.rightBtn").click(function(){
				currentIndex += 1;
				if (currentIndex == length) {
					currentIndex = 0;
				}
				change();
			});

			//自动轮播
			function autoPlay(){
				currentIndex += 1;
				if (currentIndex == length) {
					currentIndex = 0;
				}
				change();
				//console.log(currentIndex);
			}
			 var timer = setInterval(function(){
				autoPlay();
			},2000);

		//鼠标移入box的时候停止自动轮播，移出又开始自动轮播
			$(".switchable-con >.right").hover(function(){
				clearInterval(timer);
			},function(){
				timer = setInterval(function(){
						autoPlay();
				},2000);
			})				
		 })
		 .fail(function() {
		 	console.log("error");
		 });


		 //server部分的效果
		 $(".server-con > div > a").hover(function(){
		 		$(this).css("color","#fffbf8");
		 },function(){
		 	$(this).css("color","#c8c3bf");
		 })



		 //flashPurchase小米闪购部分
		 $.ajax({
		 	url: '../data/flashPurchase.json',
		 })
		 .done(function(arr) {
		 	//console.log(arr);
		 	for(var i = 0;i < arr.length;i++){
		 		if (typeof arr[i] == "string") {
		 			$(".flashPurchase-con > .left > h5").html(arr[i]);
		 		}else{
		 			var oA = $("<a href='#'></a>");
		 			$(`
					<img src="${arr[i].img}" alt="">
					<li>${arr[i].name}</li>
					<li>${arr[i].describe}</li>
					<span>${arr[i].price}</span>
					<span>${arr[i].oldPrice}</span>
				`).appendTo(oA);
		 		//给每个设置随机颜色的上边框
		 		var str = randomColor();
		 		oA.css("borderTop",`1px solid ${str}`);
		 		oA.appendTo($('.flashPurchase-con > .right > ul'));
		 		}
		 	}

		 	//设置ul的宽度
		 	var length2 = arr.length - 1;
		 	var ulWidth = length2*$(".flashPurchase-con > .right > ul > a:eq(1)").outerWidth(true);
		 	var oUl22 = $('.flashPurchase-con > .right > ul');
		 	$(oUl22).css("width",ulWidth);

		 	//给左右按钮添加点击事件			
			var length22 = $(oUl22).find('a').size() / 4;
			var index33 = 0;
			$(".flashPurchase-con > h1 > a").eq(0).click(function() {
				index33++;
				//console.log(index33);
				$(this).css("color","#f9900d").siblings().css("color","#afafaf");
				if (index33 <= length22 - 1) {
					$(oUl22).stop().animate({left:-972 * index33}, 500);	
				}else{
					$(this).css("color","#e8e8e8");
					index33 = length22 - 1;
				}	
			}); 
			$(".flashPurchase-con > h1 > a").eq(1).click(function() {
				$(this).css("color","#f9900d").siblings().css("color","#afafaf");
				index33--;
				//console.log(index33);
				if (index33 >= 0) {
					$(oUl22).stop().animate({left:-972 * index33}, 500);
				}else{
					$(this).css("color","#e8e8e8");
					index33 = 0;
				}	
			}); 


			//flashPurchase中的倒计时
			setInterval(function(){				
				var str = countDown(2018,8,27,14,30,20);
				var arr = str.split(",");
				$(".flashPurchase-con > .left > span:nth-of-type(1)").html(arr[0]);
				$(".flashPurchase-con > .left > span:nth-of-type(3)").html(arr[1]);
				$(".flashPurchase-con > .left > span:nth-of-type(5)").html(arr[2]);
			},1000);

		 })
		 .fail(function() {
		 	console.log("error");
		 });


		//phone手机部分
		$("#phone > .phone-con > h1 > a").hover(function(){
			$(this).css("color","#ff7d3c").find('span').css("color","#ff7d3c");
		},function(){
			$(this).css("color","#383836").find('span').css("color","#afafaf");
		});

		//动态创建phone手机部分的数据
		$.ajax({
			url: '../data/phone.json',
		})
		.done(function(arr) {
			//console.log(arr);
			for(var i = 0;i < arr.length;i++){
				if (typeof arr[i] == "string") {
					$("#phone > .phone-con > .left > img").attr("src",`${arr[i]}`);
				}else{
					var oA = $(`<a href='/detailPage.html?id=${arr[i].id}'></a>`);
					$(`<img src="${arr[i].img}" alt="">
						<li>${arr[i].name}</li>
						<li>${arr[i].describe}</li>
						<span>${arr[i].price}</span>
						<span>${arr[i].oldPrice}</span>
					`).appendTo(oA);
					if (arr[i].discount.length != 0) {
						$(`<i>${arr[i].discount}</i>`).appendTo(oA);
					}
					oA.appendTo($('#phone > .phone-con > .right'));
				}
			}

			//phone部分的效果
			floatUp($("#phone > .phone-con > .right > a"));
			floatUp($("#phone > .phone-con > .left"));
			console.log("success");
		})
		.fail(function() {
			console.log("error");
		});



		//fiveBlock版块的数据处理
		$.ajax({
			url: '../data/fiveBlock.json'
		})
		.done(function(arr) {
			//console.log(arr);
			var index11 = 0;
			var index22 = 0;
			for(var i = 0;i < arr.length;i++){
				if (typeof arr[i] == "string"){
					$("#fiveBlock > .fiveBlock-con > .ad2 > img").eq(index11).attr("src",`${arr[i]}`);
					index11++;
				}else{
					var arr2 = arr[i];
					var oFather = $('#fiveBlock > .fiveBlock-con > div').eq(index22);
					var oDiv1 = oFather.find('.left');
					var oDiv2 = oFather.find('.right');
					var oH1 = oFather.find('h1');
					index22++;
					for(var j = 0;j < arr2.length;j++){
						if (typeof arr2[j] == "string") {
							$(`<a href=""><img src="${arr2[j]}" alt=""></a>`).appendTo(oDiv1);
						}else{
							$(`<i>${arr2[j].title}</i>`).appendTo(oH1);
							var oUl = $("<ul></ul>");
							oUl.appendTo(oDiv2);
							var arr3 = arr2[j].child;
							for(var k = 0;k < arr3.length;k++){
								if (k == 4) {
									var oLi = $("<li></li>");
									oLi.appendTo(oUl);
									for(var r = 0;r < arr3[k].length;r++){
										$(`<a href='#'>
								<span>${arr3[k][r].name}</span>
								<span>${arr3[k][r].price}</span>
								<img src="${arr3[k][r].img}" alt="">
							</a>`).appendTo(oLi);
							}
						}else{
							var oA = $(`<a href='#' id="${arr3[k].id}"></a>`);
							$(`<img src="${arr3[k].img}" alt="">
								<li>${arr3[k].name}</li>
								<li>${arr3[k].describe}</li>
								<span>${arr3[k].price}</span>
								<span>${arr3[k].oldPrice}</span>
								<b>${arr3[k].evaluate}
								<li>${arr3[k].from}</li>
							</b>`).appendTo(oA);
							if (arr3[k].discount.length != 0) {
									$(`<i>${arr3[k].discount}</i>`).appendTo(oA);
									}
							oA.appendTo(oUl);
								}
							}
						}
					}

					//各个选项卡的效果
					oDiv2.find("ul").css("display","none").eq(0).css("display","block");
				}
			}
			//数据加载完成 开始写js效果
			fiveBlockSelect($("#fiveBlock > .fiveBlock-con > .HomeAppliance>h1>i"),$("#fiveBlock > .fiveBlock-con > .HomeAppliance>.right>ul"));
			fiveBlockSelect($("#fiveBlock > .fiveBlock-con > .intelligent>h1>i"),$("#fiveBlock > .fiveBlock-con > .intelligent>.right>ul"));
			fiveBlockSelect($("#fiveBlock > .fiveBlock-con > .match>h1>i"),$("#fiveBlock > .fiveBlock-con > .match>.right>ul"));
			fiveBlockSelect($("#fiveBlock > .fiveBlock-con > .accessories>h1>i"),$("#fiveBlock > .fiveBlock-con > .accessories>.right>ul"));
			fiveBlockSelect($("#fiveBlock > .fiveBlock-con > .surrounding>h1>i"),$("#fiveBlock > .fiveBlock-con > .surrounding>.right>ul"));

			floatUp($("#fiveBlock > .fiveBlock-con > div>.right>ul>a"));
			floatUp($("#fiveBlock > .fiveBlock-con > div>.right>ul>li>a"));
			floatUp($("#fiveBlock > .fiveBlock-con > div>.left>a"));

			$("#fiveBlock > .fiveBlock-con > div>.right>ul>a").mouseover(function(){
				$(this).find('b').stop().animate({
					height:"75px"}, 300).css("paddingTop","5px");
			}).mouseout(function(){
				$(this).find('b').stop().animate({
					height:"0px"}, 300).css("paddingTop","0");});
			console.log("success");
		})
		.fail(function() {
			console.log("error");
		})



		//recommended为你推荐部分
		$.ajax({
			url: '../data/recommended.json',
		})
		.done(function(arr) {
			//console.log(arr);
			for(var i = 0;i < arr.length;i++){
				$(`<a href='#' id="${arr[i].id}">
						<img src="${arr[i].img}" alt="">
						<li>${arr[i].name}</li>
						<span>${arr[i].price}</span>
						<li>${arr[i].describe}</li>
					</a> `).appendTo($('#recommended > .recommended-con > .recommendedPic > ul'));
			}

			//给左右按钮添加点击事件
			var oUl22 = $('#recommended > .recommended-con > .recommendedPic > ul');
			var length22 = $(oUl22).find('a').size() / 5;
			var index33 = 0;
			$("#recommended > .recommended-con > h1 > a").eq(0).click(function() {
				index33++;
				//console.log(index33);
				$(this).css("color","#f9900d").siblings().css("color","#afafaf");
				if (index33 <= length22 - 1) {
					$(oUl22).stop().animate({left:-1215 * index33}, 500);	
				}else{
					$(this).css("color","#e8e8e8");
					index33 = length22 - 1;
				}	
			}); 
			$("#recommended > .recommended-con > h1 > a").eq(1).click(function() {
				$(this).css("color","#f9900d").siblings().css("color","#afafaf");
				index33--;
				//console.log(index33);
				if (index33 >= 0) {
					$(oUl22).stop().animate({left:-1215 * index33}, 500);
				}else{
					$(this).css("color","#e8e8e8");
					index33 = 0;
				}	
			}); 
			floatUp($("#recommended > .recommended-con > .recommendedPic > ul > a"));
			console.log("success");
		})
		.fail(function() {
			console.log("error");
		})


		//视频部分
		$("#video > .video-con > ul > li > a").mouseover(function() {
			$(this).find('i').css({"background":"#ff6600","border":"none"});
		}).mouseout(function() {
			$(this).find('i').css({"background":"","border":"2px solid #fff"});
		});
		floatUp($("#video > .video-con > ul > li"));
		$(".mark > div > p > span").click(function() {
			$(".mark > div > p").css("display","none");
			$(".mark > div > video").css("display","block");
		});
		$(".mark > div > span > span ").hover(function() {
			$(this).css("background","#c90130");
		}, function() {
			$(this).css("background","");
		}).click(function() {
			$(".mark").css("display","none");
			$(".mark > div > p").css("display","block");
			$(".mark > div > video").css("display","none");
		});
		$("#video > .video-con > ul > li > a").click(function(){
			$(".mark").css("display","block");
		});


		//bottom底部
		$(".bottom-con > h1 > a").hover(function() {
			$(this).css("color","#ff6b00");
		}, function() {
			$(this).css("color","#5a5a5c");
		});
		$(".bottom-con > div > ul > li > a").hover(function() {
			$(this).css("color","#ff6b00");
		}, function() {
			$(this).css("color","#848484");
		});
		$(".bottom-con > ul > li:nth-child(4)").hover(function() {
			$(this).css("background","#f35808").find("a").css("color","#fff");
		}, function() {
			$(this).css("background","").find("a").css("color","#f35808");
		});

		$("#bottom2 .bottom2-con > p > a").hover(function() {
			$(this).css("color","#ff6b00");
		}, function() {
			$(this).css("color","#848484");
		});
		
		
		
	


	}
	return {
		homePage:homePage
	}
});






//随机颜色
	function randomColor(){
			var str = "rgba("+parseInt(Math.random()*256)+","+parseInt(Math.random()*256)+","+parseInt(Math.random()*256)+",1)";
			return str;
		}

	 //倒计时
	function countDown(year,month,day,hour,minute,second){
			//之所以写month-1是因为在计算机里面传入的七月,实际上指的是八月
			var d1 = new Date(year,month-1,day,hour,minute,second);
			var d2 = new Date();
			//获取两时间相差的秒数
			var millisecond1 = d1.getTime();
			var millisecond2 = d2.getTime();

			var hour1 = null;
			var minute1 = null;
			var second1 = null;
			if(millisecond1 <= millisecond2){
				hour1 = "00";
				minute1 = "00";
				second1 = "00";
			}else{
				var intervalTime = (millisecond1 - millisecond2) / 1000;
				hour1 = parseInt(intervalTime / 3600);
				minute1 = parseInt((intervalTime - hour1*3600) / 60);
				second1 = parseInt(intervalTime - hour1*3600 - minute1*60);	
			}
			var str = hour1+","+minute1+","+second1;		
			return str;			
		}


		function floatUp(node){
			$(node).hover(function(){
				$(this).css({"boxShadow":"0 15px 30px rgba(0,0,0,0.1)","transform":"translate3d(0,-2px,0)"});
			},function(){
				$(this).css({"boxShadow":"","transform":""});
			});
		}


		function fiveBlockSelect(node1,node2){
			$(node1).mouseover(function(){
				$(this).css({"color": "#ff6e00",
 				"borderBottom": "2px solid #ff6e00"}).siblings().css({"color": "#58383d","borderBottom": "none"});
 				$(node2).css("display","none").eq($(this).index()).css("display","block");
				});
		}
		


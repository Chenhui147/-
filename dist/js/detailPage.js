define(["cookieSet","jquery", "jquery-cookie"],function(cookie2,$){
	var detailPage = function(){
		//侧导航栏的弹入弹出
		$(".nav1-con > ul > li>#navLeft").hover(function() {
			$(".switchable-con>.left").css("display","block");
		}, function() {
			$(".switchable-con>.left").css("display","none");
		});

		$(".switchable-con>.left").hover(function() {
			$(this).css("display","block");
		}, function() {
			$(this).css("display","none");
		});

		/*小米home图标切换*/
		$(".nav1-con > a").hover(function() {
			$(this).find('img').attr("src","images/home.jpg");
		}, function() {
			$(this).find('img').attr("src","images/nav1pic/logo.png");
		});

		//导航栏2部分的效果
		$("#nav2 > a").hover(function() {
			$(this).css("color","#ff6702");
		}, function() {
			if ($(this).index() == 1) {
				$(this).css("color","#5d5f5a");
			}else{
				$(this).css("color","#615b5f");
			}	
		});

		/*导航栏2部分*/
		$(window).scroll(function(){
			if ($(document).scrollTop() >= 140) {
				$("#nav2").css({"position":"fixed","top":"0","left":"0"});
			}else{
				$("#nav2").css({"position":""});
			}
		});
		$(window).scroll(function(){
			if ($(document).scrollTop() >= 140 && $(document).scrollTop() <= 790) {
				$(".detail-con > .left").css({"position":"fixed","top":"60px","left":"0"});
				//console.log($(document).scrollTop());
			}else{
				if ($(document).scrollTop() > 790) {
					$(".detail-con > .left").css({"position":"relative","top":"600px","left":"0"});
				}else{
					$(".detail-con > .left").css({"position":"relative","top":"","left":""});
				}
			}
		});

		/*未登录提示*/
		$(".prompt > span").click(function() {
			$(".prompt").css("display","none");
		});


		//获取detail.html?id=222中对应的id
		var urlStr = window.location.href;
		//console.log(urlStr);
		var goodId = Number(urlStr.split("=")[1]);
		

		//1、动态加载详情页数据
		$.ajax({
			url: '../data/detail.json',
		})
		.done(function(arr) {
			//console.log(arr);
			for(var i = 0;i < arr.length;i++){
				if (arr[i].id == goodId) {
					$("#nav2 > span").html(`${arr[i].title1}`);
					$("#nav2 > a:nth-of-type(1)").html(`${arr[i].title2}`);
					$(".detail-con > .right > h2").html(`${arr[i].title1}`);
					$(`<span>${arr[i].describe1}</span><span>${arr[i].describe2}</span><br/>
				<span>${arr[i].price}</span><span>${arr[i].oldPrice}</span>`).appendTo($('.detail-con > .right > p:nth-of-type(1)'));
					var arr1 = arr[i].img;
					for(var j = 0;j < arr1.length;j++){
						$(`<ul>
				<li><img src="${arr1[j][0]}" alt=""></li>
				<li><img src="${arr1[j][1]}" alt=""></li>
				<li><img src="${arr1[j][2]}" alt=""></li>
				<li><img src="${arr1[j][3]}" alt=""></li>
			</ul>`).insertBefore($('.detail-con > .left>.leftBtn'));
					}

					var arr2 = arr[i].gifts;
					for(var k = 0;k < arr2.length;k++){
						$(`<p class="gifts"><span>${arr2[k][0]}</span>${arr2[k][1]}</p>`).insertBefore($('.detail-con > .right > .address'));
					}

					var arr3 = arr[i].version;
					for(var q = 0;q < arr3.length;q++){
						$(`<b><span>${arr3[q][0]}</span><span>${arr3[q][1]}</span><span>${arr3[q][2]}</span></b>`).appendTo($('.detail-con > .right > div:nth-of-type(1) > .selectVersion'));
					}

					var arr4 = arr[i].color;
					for(var r = 0;r < arr4.length;r++){
						$(`<b><img src="${arr4[r][0]}" alt=""><span>${arr4[r][1]}</span></b>`).appendTo($('.detail-con > .right > div:nth-of-type(1) > .selectColor '));
					}

					var arr5 = arr[i].security;
					for(var s = 0;s < arr5.length;s++){
						$(`<div class="security">
				<span>√</span>
				<h5>${arr5[s].title}</h5>
				<p>${arr5[s].describe}</p>
				<p><i>√</i>我已阅读<a href="#">服务条款</a> | <a href="#">常见问题</a><span>${arr5[s].price}</span></p>
			</div>`).insertBefore($('.detail-con > .right>.totalPrice'));
					}

					$(".detail-con > .right > .totalPrice > p > span:nth-child(1)").html(`${arr[i].title1}`);
					$(".detail-con > .right > .totalPrice > p > span:nth-child(4)").html(`${arr[i].price}`);
					$(".detail-con > .right > .totalPrice > p > span:nth-child(5)").html(`${arr[i].oldPrice}`);
					$(`<a id="${arr[i].id}">加入购物车</a>`).insertAfter($('.detail-con > .right>.totalPrice'));
				}
			}


			//2、数据加载完毕开始写detail-con的各部分功能
			//detail详情部分的轮播图
			//创建小圆点按钮
			var length = $(".detail-con > .left > ul:nth-of-type(1) > li").size();
				//console.log(length);
			for(var i = 0;i < length;i++){
				$("<i></i>").appendTo($('.detail-con > .left > .circlebtn'));
			}

			//鼠标划过按钮改变背景色,点击按钮改变图片和背景色
			var currentIndex = 0;
			$(".detail-con > .left > .circlebtn > i").eq(currentIndex).attr("class","active");
			$(".detail-con > .left > .circlebtn > i").mouseover(function(){
				$(this).css("background","#a1a1a1");
			}).mouseout(function() {
				$(this).css("background","#c8c8c8");
			}).click(function() {
				currentIndex = $(this).index();
				//console.log(currentIndex);
				change();
			});

			//在点击和自动轮播的时候,既要改变图片，也要改变按钮的背景
			function change(){
				//图片变化
				$(".detail-con > .left > ul").stop().animate({left:-$(".detail-con > .left > ul > li > img:eq(1)").width() * currentIndex}, 500);
				//改变按钮背景
				$(".detail-con > .left > .circlebtn > i").attr("class"," ").eq(currentIndex).attr("class","active");
				//console.log(currentIndex);
			}

			//点击左右按钮的时候也要改变图片
			$(".detail-con > .left > .leftBtn").click(function(){
				if (currentIndex == 0) {
					currentIndex = length - 1;
					change();
				}else{
					currentIndex -= 1;
					change();
				}
			});

			$(".detail-con > .left > .rightBtn").click(function(){
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
			},3000);


			//鼠标移入box的时候停止自动轮播，移出又开始自动轮播
			$(".detail-con > .left").hover(function(){
				clearInterval(timer);
			},function(){
				timer = setInterval(function(){
						autoPlay();
				},3000);
			});	


			//detail-con部分的购物车按钮的移入移出效果
			$(".detail-con > .right > a:nth-of-type(1)").hover(function() {
				$(this).css("background","#f35808");
			}, function() {
				$(this).css("background","#ff6702");
			});	

			//点击加入购物车按钮，加入购物车
			cookie2.addCarClick2($(".detail-con > .right > a:nth-of-type(1)"));
			
			
			//detail-con中的服务保障部分security的按钮功能	
			$(".detail-con > .right > .security > span").click(function() {
				if ($(this).css("backgroundColor") == "rgb(255, 103, 2)") {
					$(this).css("background","#fff");
				    $(this).siblings('p').find('i').css("background","#fff");
				    $(".detail-con > .right > .totalPrice > h5").siblings('h1').remove();
				    totalPrice();
				}else{
					$(this).css("background","#ff6702").parent().siblings('.security').find("span").css("background","#fff");
				    $(this).siblings('p').find('i').css("background","#ff6702");
				    $(this).parent().siblings('.security').find('p').find('i').css("background","#fff");
				    var str1 = $(this).siblings('h5').html();
					var str2 = $(this).siblings('p').find("span").html();
						var oH1 = $(`<h1><span>${str1}</span><span>${str2}</span></h1>`);
						oH1.insertBefore($(".detail-con > .right > .totalPrice > h5"));
						$(oH1).siblings('h1').remove();
						totalPrice();
					}
			});	

			$(".detail-con > .right > .security > p:nth-of-type(2) > i").click(function() {
				if ($(this).css("backgroundColor") == "rgb(255, 103, 2)") {
					$(this).css("background","#fff");
				    $(this).parent().siblings('span').css("background","#fff");
				    $(".detail-con > .right > .totalPrice > h5").siblings('h1').remove();
				}else{
					$(this).css("background","#ff6702").parent().parent().siblings('.security').find('p').find('i').css("background","#fff");
				    $(this).parent().siblings('span').css("background","#ff6702");
				    $(this).css("background","#ff6702").parent().parent().siblings('.security').find('span').css("background","#fff");
				    var str1 = $(this).parent().siblings('h5').html();
					var str2 = $(this).siblings('span').html();
						var oH1 = $(`<h1><span>${str1}</span><span>${str2}</span></h1>`);
						oH1.insertBefore($(".detail-con > .right > .totalPrice > h5"));
						$(oH1).siblings('h1').remove();
				}
			});	

			//选择版本按钮
			$(".detail-con > .right > div:nth-of-type(1) > .selectVersion > b").click(function() {
					$(this).css("borderColor","#ff6702").siblings("b").css("borderColor","#e0e0e0");
					$(".detail-con > .right > .totalPrice > p > span:nth-child(2)").html($(this).find('span').eq(0).html());
					$(".detail-con > .right > .totalPrice > p > span:nth-child(4)").html($(this).find('span').eq(1).html());
					$(".detail-con > .right > p:nth-of-type(1) > span:nth-of-type(3)").html($(this).find('span').eq(1).html());
					$(".detail-con > .right > p:nth-of-type(1) > span:nth-of-type(4)").html($(this).find('span').eq(2).html());
					totalPrice();	
			});

			//选择颜色按钮
			$(".detail-con > .right > div:nth-of-type(1) > .selectColor > b").click(function() {
					$(this).css("borderColor","#ff6702").siblings("b").css("borderColor","#e0e0e0");
					$(".detail-con > .right > .totalPrice > p > span:nth-child(3)").html($(this).find('span').html());
					$(".detail-con > .left > ul").eq($(this).index()).css("display","block").siblings('ul').css("display","none");	
			});
			console.log("success");
		})
		.fail(function() {
			console.log("error");
		})
		

		//detail详情部分的轮播图
		//1、左右按钮的移入、移出
		$(".detail-con > .left > .leftBtn ").mouseover(function(){
			$(this).css("background","url(../images/lunboPic/btn.png) no-repeat");
			}).mouseout(function(){
				$(this).css("background","url(../images/lunboPic/btn.png) no-repeat -83px 0");
			});

		$(".detail-con >.left >.rightBtn").mouseover(function(){
			$(this).css("background","url(../images/lunboPic/btn.png) no-repeat -41px 0");
		}).mouseout(function(){
			$(this).css("background","url(../images/lunboPic/btn.png) no-repeat -124px 0");
		})

		//detail-con部分喜欢按钮的移入移出效果
		$(".detail-con > .right > a:nth-of-type(2)").hover(function() {
			$(this).css("background","#757575");
		}, function() {
			$(this).css("background","#b0b0b0");
		});	

		//价格总计部分
		function totalPrice(){
			var sum = 0;
			var num1 = parseInt($(".detail-con > .right > .totalPrice > p > span:nth-child(4)").html());
			var oSpan9 = $(".detail-con > .right > .totalPrice > h1 > span:nth-child(2)");
			if (oSpan9.length != 0) {
				var num2 = parseInt($(oSpan9).html());
				sum = num1 + num2;
			}else{
				sum = num1;
			}
			
			$(".detail-con > .right > .totalPrice > h5>span").html(sum+"元");
		}
	}

	return {
		detailPage:detailPage
	}
})





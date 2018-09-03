define(["cookieSet","jquery", "jquery-cookie"],function(cookieSet,$){
	var listPage = function(){
		/*成功加入购物车部分*/
		$(" #successAdd > .successAdd-con .right > a").eq(0).hover(function() {
			$(this).css("background","#fff");
		}, function() {
			$(this).css("background","");
		});
		$(" #successAdd > .successAdd-con .right > a").eq(1).hover(function() {
			$(this).css("background","#f35808");
		}, function() {
			$(this).css("background","#ff6702");
		});

		//将地址栏传过来的数据进行解析 unescape,decodeURI,decodeURIComponent
		var urlStr2 = decodeURI(window.location.href);
		var arr70 = urlStr2.split("=");
		var arr72 = urlStr2.split("?");
		var id22 = arr70[3];
		var desc22 = arr70[1].split("&")[0];
		var price22 = arr70[2].split("&")[0];
		$("#successAdd > .successAdd-con > .left > p").html(`${desc22} ${price22}`);
		
		//同时将信息存入cookie  
		if (!$.cookie("goodsMsg")) {//第一次设置cookie
			$.cookie("goodsMsg",`[{id:"${id22}",desc22:"${desc22}",price22:"${price22}"}]`,{expires:7});
		}else{//不是第一次设置cookie
			var arr = eval($.cookie("goodsMsg"));
			console.log(arr);
			for(var i = 0;i < arr.length;i++){
				if (arr[i].desc22 != desc22) {
					arr.push({id:id22,desc22:desc22,price22:price22});
					var str = JSON.stringify(arr);
					$.cookie("goodsMsg",str,{expires:7});
				}
			}
		}

		$("#successAdd > .successAdd-con > .right > a:nth-child(2)").attr("href",`/shoppingCartList.html?${arr72[1]}`);
		
		/*relatedRecommend相关推荐部分*/
		//1、动态加载相关推荐部分的数据
		$.ajax({
			url: "../data/listPage.json",
		})
		.done(function(arr) {
			//console.log(arr);
			for(var i = 0;i < arr.length;i++){
				$(`<li>
						<a href="#">
							<img src="${arr[i].img}" alt="">
							<span>${arr[i].describe}</span>
						</a>
						<p>${arr[i].price}</p>
						<span>${arr[i].evaluate}</span>
						<b id="${arr[i].id}">加入购物车</b>
						<i>成功加入购物车</i>
					</li>`).appendTo($('#relatedRecommend > .relatedRecommend-con > div:nth-of-type(1) > ul'));
			}
			//购物车按钮的显现
			$("#relatedRecommend > .relatedRecommend-con > div:nth-of-type(1) > ul > li").hover(function() {
					$(this).find('span').eq(1).css("display","none");
					$(this).find('b').css("display","block");
				}, function() {
					$(this).find('span').eq(1).css("display","block");
					$(this).find('b').css("display","none");
				});

			//购物车按钮背景色的改变
			$("#relatedRecommend > .relatedRecommend-con > div:nth-of-type(1) > ul > li > b").hover(function() {
					$(this).css({"background":"#f35808","color":"#fff"});
				}, function() {
					$(this).css({"background":"","color":"#e87826"});
				});

			//商品加入购物车部分
			var oB = $(" #relatedRecommend > .relatedRecommend-con > div:nth-of-type(1) > ul > li > b");
			var oCarNum = $("#head > .head-con > div > .buyCar > a>span:nth-child(2)");
			cookieSet.addCarClick($(oB),$(oCarNum));

			//将加入购物车成功按钮显现
			$(oB).click(function() {
				$(this).siblings('i').animate({height:"35px"}, 500,function(){
					$(this).delay(500).animate({height:"0px"}, 1000);
				});	
			});

			
			console.log("success");
		})
		.fail(function() {
			console.log("error");
		});

		//小圆点按钮效果
		$("#relatedRecommend > .relatedRecommend-con > div:nth-of-type(2) > b").hover(function() {
			$(this).css("background","#f35808");
		}, function() {
			$(this).css("background","#aaaaaa");
		}).click(function() {
			$(this).css({"background":"#fff","border":"2px solid #f35808"}).siblings().css({"background":"#aaaaaa","border":"0"});
			$("#relatedRecommend > .relatedRecommend-con > div:nth-of-type(1) > ul").stop().animate({left:-1200*$(this).index()}, 500);
		});	
	}

	return {
		listPage:listPage
	}
})







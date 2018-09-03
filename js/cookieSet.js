define(["jquery", "jquery-cookie"],function($){
	var addCarClick = function(node,node1){
		//1、给加入购物车按钮添加点击事件
		$(node).click(function() {
			var id = this.id;
			//2、点击按钮后要加入购物车,存入cookie  首先要考虑一下是否已经设置了cookie,如果没有，就将商品id和num存入cookie中，值的形式[{id:id,num:num}]
			if (!$.cookie("goods")) {//第一次设置cookie
				$.cookie("goods",`[{id:${id},num:1}]`,{expires:7});
			}else{//判断该商品是否加入过购物车
				var arr = eval($.cookie("goods"));
				var different = true;//假设都没加入过购物车
				for(var j = 0;j < arr.length;j++){
					if (arr[j].id == id) {//加入过购物车
						different = false;
						//console.log(arr[j].num);
						arr[j].num++;
						var str = JSON.stringify(arr);
						$.cookie("goods",str,{expires:7});
					}
				}
				if (different) {//该商品没有加入过购物车
					arr.push({id:id,num:1});
					var str = JSON.stringify(arr);
					$.cookie("goods",str,{expires:7});
				}
			}
			buyNumber(node1);
			buyCarColor(node1);
		});
	}

	var addCarClick2 = function(node){
		//1、给加入购物车按钮添加点击事件
		$(node).click(function() {
			var id = this.id;
			//2、点击按钮后要加入购物车,存入cookie  首先要考虑一下是否已经设置了cookie,如果没有，就将商品id和num存入cookie中，值的形式[{id:id,num:num}]
			if (!$.cookie("goods")) {//第一次设置cookie
				$.cookie("goods",`[{id:${id},num:1}]`,{expires:7});
			}else{//判断该商品是否加入过购物车
				var arr = eval($.cookie("goods"));
				var different = true;//假设都没加入过购物车
				for(var j = 0;j < arr.length;j++){
					if (arr[j].id == id) {//加入过购物车
						different = false;
						//console.log(arr[j].num);
						arr[j].num++;
						var str = JSON.stringify(arr);
						$.cookie("goods",str,{expires:7});
					}
				}
				if (different) {//该商品没有加入过购物车
					arr.push({id:id,num:1});
					var str = JSON.stringify(arr);
					$.cookie("goods",str,{expires:7});
				}
			}

			//设置购物车按钮的href属性 href="/listPage.html?describe=&price="
			var str91 = $(".detail-con > .right > .totalPrice > p > span:nth-child(1)").html();
			var str92 = $(".detail-con > .right > .totalPrice > p > span:nth-child(2)").html();
			var str93 = $(".detail-con > .right > .totalPrice > p > span:nth-child(3)").html();
			var str94 = $(".detail-con > .right > .totalPrice > h5 > span").html();
			var str90 = str91 + str92 + str93;
			var urlStr = window.location.href;
			var goodId2 = urlStr.split("=")[1];
			$(".detail-con > .right > a:nth-of-type(1)").attr("href",`/listPage.html?describe=${str90}&price=${str94}&id=${goodId2}`);
		});
	}


	//2、将加入购物车的商品信息展示出来
	var buyMsg = function(url1,str){
		$.ajax({
		url:url1,
		success:function(arr){
			if ($.cookie("goods")) {
				var cookieArr = eval($.cookie("goods"));
				if (cookieArr.length == 0) {
					$('#head > .head-con > div > .buyCar> ul').html("购物车中还没有商品,赶紧选购吧").css("fontSize","25px");
				}
				for(var i = 0;i < cookieArr.length;i++){
					for(var j = 0;j < arr.length;j++){
						if (cookieArr[i].id == arr[j].id) {
							$(`<li>
							<a href="#">
								<img src="${arr[j].img}" alt="">
								<p>
									${arr[j].describe}
								</p>
							</a>
							<i><span>${arr[j].price}</span> X<span>${cookieArr[i].num}</span>&ensp;<span id="${cookieArr[i].id}">X</span></i>
						</li>`).appendTo($('#head > .head-con > div > .buyCar > ul'));
							}					
						}

							//将存在cookie名为goodsMsg的商品信息拿出来
							var arr3 = eval($.cookie("goodsMsg"));
							for(var k = 0;k < arr3.length;k++){
								if (cookieArr[i].id == arr3[k].id) {
								$(`<li>
							<a href="#">
								<img src="images/detailPic/detail35.jpg" alt="">
								<p>
									${arr3[k].desc22}
								</p>
							</a>
							<i><span>${arr3[k].price22}</span> X<span>${cookieArr[i].num}</span>&ensp;<span id="${cookieArr[i].id}">X</span></i>
						</li>`).appendTo($('#head > .head-con > div > .buyCar > ul'));
								}	
							}		
					}
				}else{
					$('#head > .head-con > div > .buyCar> ul').html("购物车中还没有商品,赶紧选购吧");
				}

				var oCarUl = $("#head > .head-con > div > .buyCar > ul");
				$(oCarUl).css("height","auto");
				$(oCarUl).attr("iHeight",`${$("#head > .head-con > div > .buyCar > ul").height()}`);
				$(oCarUl).css("height","0");

				//给head中的购物车的li,添加移入/移出事件
				$("#head > .head-con > div > .buyCar > ul > li").hover(function() {
					$(this).find('a').css("color","#f65703");

					//给head中的购物车的删除按钮添加移入/移出事件/点击事件
					$(this).find('i').find("span").eq(2).css("display","inline").hover(function() {
						$(this).css("color","#4d4c52");
					}, function() {
						$(this).css("color","#d2d0d0");
					}).click(function() {
						var id = this.id;
						$(this).parent().parent("li").animate({"height":0},300,function(){
							$(this).remove();
							removeCookie(id,$("#head > .head-con > div > .buyCar > a>span:nth-child(2)"));
							
						});
					});
				}, function() {
					$(this).find('a').css("color","#4d4c52");
					$(this).find('i').find("span").eq(2).css("display","none");
				});

			},		
			error:function(msg){
				alert(msg);
			}
		})
	}


	//3、购物车颜色的改变
	var buyCarColor = function(node){
		if ($(node).html() != "0") {
		$("#head > .head-con > div > .buyCar").css({"background":"#f35808"});
		$("#head > .head-con > div > .buyCar>a").css({"color":"#fff"});
		}else{
			$("#head > .head-con > div > .buyCar").css({"background":"#424242"});
			$("#head > .head-con > div > .buyCar>a").css({"color":"#b7b7b7"});
		}
	}

	//4、改变购物车的数量
	var  buyNumber = function(node){
		var arr = eval($.cookie("goods"));
		var sum = 0;
		if (arr) {
			for(var i = 0;i < arr.length;i++){
			sum+=arr[i].num;
			}
			$(node).html(sum);
		}else{
			$(node).html(0);
		}
		
	}

	//删除对应id的cookie中的商品
	var removeCookie = function(id,node){
		var arr = eval($.cookie("goods"));
		if (arr) {
			for(var i = 0;i < arr.length;i++){
				if (arr[i].id == id) {
					arr.splice(i,1);
					var str = JSON.stringify(arr);
					$.cookie("goods",str,{expires:7});
					buyNumber(node);
				}
			}
		}
		if (arr.length == 0) {
			$('#head > .head-con > div > .buyCar> ul').html("购物车中还没有商品,赶紧选购吧").css("fontSize","25px");
		}
	}

	return {
		addCarClick:addCarClick,
		buyMsg:buyMsg,
		buyCarColor:buyCarColor,
		buyNumber:buyNumber,
		removeCookie:removeCookie,
		addCarClick2:addCarClick2
	}
})
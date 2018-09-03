define(["jquery", "jquery-cookie"],function($){
	var shoppingCartList = function(){
		/*小米home图标切换*/
		$("#top2 > .top2-con > a").hover(function() {
			$(this).find('img').attr("src","images/home.jpg");
		}, function() {
			$(this).find('img').attr("src","images/nav1pic/logo.png");
		});


		/* shopCartList购物车列表部分 */
		//1、获取cookie中的商品,将其展示出来
		buyMsg2("../data/listPage.json");
		function buyMsg2(url1){
			$.ajax({
			url:url1,
			success:function(arr){
				if ($.cookie("goods")) {
					var cookieArr = eval($.cookie("goods"));
					if (cookieArr.length == 0) {
						$(" #shopCartList > .shopCartList-con > .emptyCart").css("display","block");
						$("#shopCartList > .shopCartList-con > p").css("display","none");
						$("#shopCartList > .shopCartList-con > .settlement").css("display","none");
					}else{
						$(" #shopCartList > .shopCartList-con > .emptyCart").css("display","none");
						$("#shopCartList > .shopCartList-con > p").css("display","block");
						$("#shopCartList > .shopCartList-con > .settlement").css("display","block");
					}
					for(var i = 0;i < cookieArr.length;i++){
						for(var j = 0;j < arr.length;j++){
							if (cookieArr[i].id == arr[j].id) {
								$(`<li>
						<i>√</i>
						<a href="#">
							<img src="${arr[j].img}" alt="">
							<span>${arr[j].describe}</span>
						</a>
						<span>${arr[j].price}</span>
						<b><span>-</span><span>${cookieArr[i].num}</span><span>+</span></b>
						<span>${arr[j].price}</span>
						<span id="${cookieArr[i].id}">×</span>
					</li>`).appendTo($('#shopCartList > .shopCartList-con > ul'));
								}					
							}
								//将存在cookie名为goodsMsg的商品信息拿出来
							var arr3 = eval($.cookie("goodsMsg"));
							for(var k = 0;k < arr3.length;k++){
								if (cookieArr[i].id == arr3[k].id) {
								$(`<li>
							<i>√</i>
							<a href="#">
								<img src="images/detailPic/detail35.jpg" alt="">
								<span>${arr3[k].desc22}</span>
							</a>
							<span>${arr3[k].price22}</span>
							<b><span>-</span><span>1</span><span>+</span></b>
							<span>${arr3[k].price22}</span>
							<span id="${cookieArr[i].id}">×</span>
						</li>`).appendTo($('#shopCartList > .shopCartList-con > ul'));
								}	
							}		
						}
					}else{
						$("#shopCartList > .shopCartList-con > p").css("display","none");
						$('#shopCartList > .shopCartList-con > ul').html("购物车空空如也");
					}


				//2、数据加载完毕,开始添加事件
				//选中按钮的移入、移出、点击事件
				$("#shopCartList > .shopCartList-con i").hover(function() {
					$(this).css("color","#696967");
				}, function() {
					$(this).css("color","#fff");
				});

				var sum = 0;
				var number2 = 0;
				var oIs = $("#shopCartList > .shopCartList-con>ul>li>i");
				$(oIs).click(function() {
					if ($(this).css("backgroundColor") == "rgb(255, 103, 2)") {
						$(this).css({"background":"#fff"});
						$("#shopCartList > .shopCartList-con>p>i").css({"background":"#fff"});
						var num = parseInt($(this).siblings('span').eq(1).html());
						var num2 = parseInt($(this).siblings('b').find("span").eq(1).html()); 
						sum-=num;
						number2-=num2;
						$("#shopCartList > .shopCartList-con > .settlement > span:nth-of-type(2) > b").html(sum);
						$("#shopCartList > .shopCartList-con > .settlement > span:nth-of-type(1) > span:nth-child(2)").html(number2);
					}else{
						$(this).css({"background":"#ff6702",color:"#fff"});
						var num = parseInt($(this).siblings('span').eq(1).html());
						var num2 = parseInt($(this).siblings('b').find("span").eq(1).html()); 
						sum+=num;
						number2+=num2;
						$("#shopCartList > .shopCartList-con > .settlement > span:nth-of-type(2) > b").html(sum);
						$("#shopCartList > .shopCartList-con > .settlement > span:nth-of-type(1) > span:nth-child(2)").html(number2);
						var isAllSelect = true;
						for(var i = 0;i < oIs.length;i++){
							if ($(oIs).eq(i).css("backgroundColor") != "rgb(255, 103, 2)") {
								isAllSelect = false;
							}
						}
						if (isAllSelect) {
							$("#shopCartList > .shopCartList-con>p>i").css({"background":"#ff6702",color:"#fff"});
						}
					}
				});

				//全选按钮的事件
				$("#shopCartList > .shopCartList-con>p>i").click(function() {
					if ($(this).css("backgroundColor") == "rgb(255, 103, 2)") {
						$(this).css({"background":"#fff"});
						$("#shopCartList > .shopCartList-con>ul>li>i").css({"background":"#fff"});
						$("#shopCartList > .shopCartList-con > .settlement > span:nth-of-type(2) > b").html(0);
						$("#shopCartList > .shopCartList-con > .settlement > span:nth-of-type(1) > span:nth-child(2)").html(0);
						sum = 0;
						number2 = 0;
					}else{
						$(this).css({"background":"#ff6702",color:"#fff"});
						$("#shopCartList > .shopCartList-con>ul>li>i").css({"background":"#ff6702",color:"#fff"});
						var oSpans = $("#shopCartList > .shopCartList-con > ul > li>span:nth-of-type(2)");
						var oSpans2 = $("#shopCartList > .shopCartList-con > ul > li > b > span:nth-child(2)");
						var sum2 = totalNumber(oSpans);
						$("#shopCartList > .shopCartList-con > .settlement > span:nth-of-type(2) > b").html(sum2);
						 sum = sum2;

						var number21 = totalNumber(oSpans2);
						$("#shopCartList > .shopCartList-con > .settlement > span:nth-of-type(1) > span:nth-child(2)").html(number21);
						$("#shopCartList > .shopCartList-con > .settlement > span:nth-of-type(1) > span:nth-child(1)").html(number21)
						number2 = number21;
					}
				});


				//数量增减按钮
				//数量减按钮
				$("#shopCartList > .shopCartList-con > ul > li > b > span:nth-child(1)").click(function(){
					var num12 = parseInt($(this).siblings('span').eq(0).html());
					var singlePrice = parseInt($(this).parent().siblings('span').eq(0).html());
					var startNum = num12 * singlePrice;
					if (num12 == 1) {
						num12 = 1;
					}else{
						num12--;	
					}
					$(this).siblings('span').eq(0).html(num12);
					var subtotal = num12 * singlePrice;
					$(this).parent().siblings('span').eq(1).html(subtotal);
					if ($(this).parent().siblings('i').css("backgroundColor") == "rgb(255, 103, 2)") {
						sum = sum + subtotal - startNum;
						$("#shopCartList > .shopCartList-con > .settlement > span:nth-of-type(2) > b").html(sum);
					}
				});
				//数量加按钮
				$("#shopCartList > .shopCartList-con > ul > li > b > span:nth-child(3)").click(function(){
					var num12 = parseInt($(this).siblings('span').eq(1).html());
					var singlePrice = parseInt($(this).parent().siblings('span').eq(0).html());
					var startNum = num12 * singlePrice;
						num12++;
					$(this).siblings('span').eq(1).html(num12);
					var subtotal = num12 * singlePrice;
					$(this).parent().siblings('span').eq(1).html(subtotal);
					if ($(this).parent().siblings('i').css("backgroundColor") == "rgb(255, 103, 2)") {
						sum = sum + (subtotal - startNum);
						$("#shopCartList > .shopCartList-con > .settlement > span:nth-of-type(2) > b").html(sum);
					}
				});

				//删除按钮
				$("#shopCartList > .shopCartList-con > ul > li > span:nth-of-type(3)").click(function() {
					var id = this.id;
					$(this).parent("li").animate({"height":0},300,function(){
							$(this).remove();
							removeCookie(id);
						});
					//console.log($.cookie("goods"));
					if (!$.cookie("goods")) {
						$("#shopCartList > .shopCartList-con > p").css("display","none");
					}else{
						$("#shopCartList > .shopCartList-con > p").css("display","block");
					}
				});
			},		
			error:function(msg){
				alert(msg);
				}
			})
		}

		//给加入购物车按钮添加事件委托事件/使页面刷新，更新购物车列表
		$(" #relatedRecommend > .relatedRecommend-con > div:nth-of-type(1) > ul").on("click","b",function(){
			$(this).siblings('i').animate({height:"35px"}, 500,function(){
					location.reload();
				});	
		});
	}

	return {
		shoppingCartList:shoppingCartList
	}
})



//计算总量
function totalNumber(node){
	var sum2 = 0;
	var num = 0;
	for(var i = 0;i < node.length;i++){
		num = parseInt($(node).eq(i).html());
		sum2+=num;
	}
	return sum2;
}

function removeCookie(id){
		var arr = eval($.cookie("goods"));
		if (arr) {
			for(var i = 0;i < arr.length;i++){
				if (arr[i].id == id) {
					arr.splice(i,1);
					var str = JSON.stringify(arr);
					$.cookie("goods",str,{expires:7});
				}
			}
		}
		if (arr.length == 0) {
			$(" #shopCartList > .shopCartList-con > .emptyCart").css("display","block");
			$("#shopCartList > .shopCartList-con > p").css("display","none");
			$("#shopCartList > .shopCartList-con > .settlement").css("display","none");
		}
	}
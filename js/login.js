define(["jquery", "jquery-cookie"],function($){
	var login = function(){
		//表单部分的js效果
		$("#login > form > .p3 > a:not('.a1')").hover(function() {
			$(this).css("color","#ef5b01");
		}, function() {
			$(this).css("color","#9ea2a5");
		});
		//表单选项卡效果
		$("#login > div > div >form > .p3 > a:nth-of-type(1)").click(function() {
			$(this).parents("form").css("display","none").siblings('form').css("display","block");
		});

		$("#login > div > h1 > a").click(function() {
			$("#login > div > div").css("display","none").eq($(this).index()).css("display","block");
			$(this).css("color","#ff6700").siblings('a').css("color","#6a6054");
		});

		//bottom部分的js效果
		$("#bottom > p > a").hover(function() {
			$(this).css("color","#1f2b37");
		}, function() {
			$(this).css("color","#706e6f");
		});

		/*//阻止表单提交空数据(还有待研究)
		$("#login > div > div > form").submit(function(ev) {
			console.log($(this).siblings('p').find('input').val() == null);
			if ($(this).find('p').find('input').val() == null) {
				$("#login > div > div > form > span").css("display","inline");
				ev.preventDefault();	
			}
		});*/
	}


	return {
		login:login
	}
})






























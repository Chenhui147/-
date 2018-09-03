define(["jquery", "jquery-cookie"],function($){
	var register = function(){
		//协议同意按钮
		$("#register >.register-con > form > p > span").click(function() {
			if ($(this).css("color") == "rgb(255, 103, 2)") {
				$(this).css("color","#b9b9b9");
			}else{
				$(this).css("color","#ff6702");
			}
		});

		//bottom部分的js效果
		$("#bottom > p > a").hover(function() {
			$(this).css("color","#1f2b37");
		}, function() {
			$(this).css("color","#706e6f");
		});

		//表单验证
		var oSpan = $("#register >.register-con > form > span");
		$("#register >.register-con > form > input:nth-of-type(1)").blur(function() {
			//手机号验证和邮箱验证
			var str1 = $(this).val();
			str1 = str1.replace(/\s/g,"");
			if (str1.length == 0) {
				$(this).off("blur");
			}else{
				if (str1.length == 11 && /^1/.test(str1)&& /[0-9]/g.test(str1) || /@[a-zA-Z]{2,10}.com$/.test(str1)) {
					$(oSpan).html("*符合要求").css("color","green");
				}else{
					$(oSpan).html("*请输入正确的手机号码/邮箱号").css("color","red");
				}
			}
		});

		/*//阻止表单提交空数据(还有待研究)
		$("#register .register-con > form").submit(function(ev) {
			console.log($(this).siblings('input').val() == null);
			if ($(this).siblings('input').val() == null) {
				$(oSpan).html("*请输入正确的手机号码和密码").css("color","red");
				ev.preventDefault();	
			}
		});*/
		
	}

	return {
		register:register
	}
})
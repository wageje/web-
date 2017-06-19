$(function(){
// 登录模态框居中
	$('document').ready(function(){
		var Height=$('#myModal').outerHeight(true);//获取模态框高度
		var Top=$('#modalLi').offset().top;//获取模态框距浏览器顶部高度
		var Hei=window.screen.height/4-Height/2-Top;//计算top值
		$('#modalContent').offset({top:Hei});
		// $.ajax({
		// 			url:"demo/Day1/post.php",
		// 			dataType:"json",
		// 			type:"POST",
		// 		})
	//验证码部分	
		var arr=[0,1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F','G','H','J','K','L','M','N','P','Q','R','S','T','U','V','W','X','Y','Z']
		var Sp1=$(arr).get(Math.floor(Math.random()*34)).toString();
		var Sp2=$(arr).get(Math.floor(Math.random()*34)).toString();
		var Sp3=$(arr).get(Math.floor(Math.random()*34)).toString();
		var Sp4=$(arr).get(Math.floor(Math.random()*34)).toString();
		$('#validateSpan1').html(Sp1);
		$('#validateSpan2').html(Sp2);
		$('#validateSpan3').html(Sp3);
		$('#validateSpan4').html(Sp4);
		var value=Sp1+Sp2+Sp3+Sp4;//获取验证码
		var	validateValue=value.toLowerCase()//验证码转为小写		
//登录提交验证
		$('#loginBtn').click(function(){
			var user=$("#userName").val();
			var pass=$("#password").val();
			var validate=$("#validateValue").val();
			if (user==""){
			    $("#nameSp").text("请输入用户名");
			    $("#userName").focus();
			    return false;//用户名为空时
			}else if(pass==""){
			    $("#passwordSp").text("请输入密码");
			    $("#password").focus();
			    return false;//密码为空时
			}else if (validate=="") {
				$("#validateSp").text("请输入验证码");
			    $("#validateValue").focus();
			    return false;//验证码为空时			
			}else if(validate!==validateValue){
				$("#validateSp").text("验证码错误");
			    $("#validateValue").focus();					
				return false;//验证码错误时
			}else{
			//输入正确时传输数据给后台验证账号密码，并接收验证结果
				$.ajax({
					url:"post.php",
					dataType:"json",
					type:"POST",
					data:{userId:user,password:pass},
					success:function(data){				
					    //登录成功3秒后跳转
					    if (data==1) {
					    	var num=3;
					    	function time(){
					    		if (num>0) {
					    			num--;
					    			setTimeout(time,1000);
					    			$('#myModalLabel').text('登录成功，正在跳转'+num+'s');
					    			$('#myModalLabel').css('color','#3A5FCD');
					    		//cookie写入
					    			$.cookie('userId',user,{expires:0.25});						    				
					    		}else if (num==0) {
					    			$('#myModalLabel').text('欢迎登陆');
					    			$('#myModalLabel').css('color','#000');					    			
					    			$('#myModal').modal('hide');
					    			$('#loginUl').hide();
					    			$('#userUl').show();
					    		}
					    	};
					    	time();
					    }else if(data==0) {
					    	$("#nameSp").text("账号或密码错误");
					    	$("#userName").focus();
					    	return false;//账号或密码错误时
					    }
					},
					error:function(){
						alert('服务器失去连接');//请求出错处理
					}
				})
			}	
		});
	//登录框输入错误，用户更改后取消警告 
		var input=$('#loginForm input');
		var span=$('#loginForm>span');
			input.length=3;
			span.length=3;
		for (var i = 0; i < 3; i++) {
			(function(n){
				$(input.get(n)).change(function(){
					$(span.get(n)).text('');	
				})	
			})(i)
		}
	});			
// 注销登录并清除cookie
	$('#unlogin').click(function(){
		$.cookie('userId',null,{expires:-1});
		$('#loginUl').show();
		$('#userUl').hide();			
	})
//读取cookie判断是否已登录	
	$(document).ready(function(){
		if ($.cookie('userId')) {
			$('#loginUl').hide();
			$('#userUl').show();
		}
	})
// 书籍按钮切换
	var bookLi=$('#bookUl>li');
	$('#bookUl').on('click','li',function(){
		var li=this;
		bookLi.each(function(index){
			if (this==li) {				
				$('#carousel-279086').carousel(index);
			}
		})
	});
});

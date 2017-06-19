$(function(){
	$('#password').keyup(function(){
		var passNum=$('#password').val().length
		if (passNum<=6) {
			$('#passUl li:first-child').css('background','red')
										.css('display','inline-block')
										.text('强度较弱');
			$('#passUl li:nth-child(2n)').css('display','none');
			$('#passUl li:last-child').css('display','none');							
		}else if (passNum>6&&passNum<=8) {
			$('#passUl li:nth-child(2n+1)').css('display','none');		
			$('#passUl li:nth-child(2n)').css('background','orange')
										.css('display','inline-block')
										.text('强度适中');			
		}else if (passNum>=10) {
			$('#passUl li:first-child').css('display','none');
			$('#passUl li:nth-child(2n)').css('display','none');			
			$('#passUl li:last-child').css('background','green')
										.css('display','inline-block')
										.text('强度较高');				
		}
	})
	//验证码部分	
	var arr=[0,1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F','G','H','J','K','L',
	'M','N','P','Q','R','S','T','U','V','W','X','Y','Z']
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
		var user = $("#userName").val();
		var pass = $("#password").val();
		var validate = $("#validateValue").val();
		if (user == ""){
			$("#nameSp").text("请输入用户名");
			$("#userName").focus();
			return false;//用户名为空时
		}else if(pass == ""){
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
		//输入正确时调用后台数据验证账号密码
			$.ajax({
				url:"login.json",    
				dataType:"json",   
				type:"get",   
				success:function(data){
					$.each(data,function(index){
						var userName=data[index].userId;
						var password=data[index].password;
						//登录成功3秒后跳转
						if (user==userName&&pass==password) {
					   	 	var num=3;
					    	function time(){
						    	if (num>0) {
						    		num--;
						    		setTimeout(time,1000);
						    		$('#myModalLabel').text('登录成功，正在跳转'+num+'s');
						    		$('#myModalLabel').css('color','red');					    				
						    	}else if (num==0) {
						    		$('#myModal').modal('hide');
							    	$('#loginUl').hide();
							    	$('#userUl').show();
						    	}
						    };
						    time();
						}else if(user!==userName&&pass==password) {
						   	$("#nameSp").text("账号不存在");
				   			$("#userName").focus();
				    		return false;//用户名错误时
						}else if (user==userName&&pass!==password) {
							$("#passwordSp").text("密码错误");
							$("#password").focus();
				    		return false;//密码错误时
					    }else if (user!==userName&&pass!==password) {
						    $("#nameSp").text("账号或密码错误");
				   			$("#userName").focus();
				    		return false;//账号密码都错误时
						}
					})
				},
				error:function(){
					alert('服务器失去连接');//请求出错处理
				}
			});	
		}				
	});	
});

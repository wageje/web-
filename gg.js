// logo标题动态加载
$(document).ready(function(){
	$('#headSp1').animate({left:0},1000);
	$('#headSp2').animate({top:10},1500)
				.animate({top:-20},'fast')	
				.animate({top:0},'fast');		
});
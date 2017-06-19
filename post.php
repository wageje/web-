<?php
header("Content-type:text/html;charset=utf-8");
//获取提交数据
$userId=$_POST['userId'];
$password=$_POST['password'];
//数据库链接
$servername = "sdm173965143.my3w.com";
$username = "sdm173965143";
$sqlpassword = "wa568115";
$dbname = "sdm173965143_db";
$con =mysqli_connect($servername, $username, $sqlpassword, $dbname);
//数据库查询
$sql = "SELECT `password` FROM login WHERE `userId`='".$userId."' AND `password` ='".$password."'";
$result = mysqli_query($con,$sql);
//判断结果
if (mysqli_num_rows($result)<1) {
    echo 0;
}else {
    echo 1;
}
?>
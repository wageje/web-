<?php
header("Content-type:text/html;charset=utf-8");
//获取提交数据
$userId=$_POST['userId'];
$password=$_POST['password'];
$Email=$_POST['Email'];
$Question=iconv("UTF-8", "GB2312//IGNORE",$_POST['Question']);//汉字转码
$Answer=iconv("UTF-8", "GB2312//IGNORE",$_POST['Answer']);
// //数据库链接
$servername = "sdm173965143.my3w.com";
$username = "sdm173965143";
$sqlpassword = "wa568115";
$dbname = "sdm173965143_db";
$con =mysqli_connect($servername, $username, $sqlpassword, $dbname);
 //数据库查询

$sqluser = "SELECT `userId` FROM login WHERE `userId`='".$userId."'";
$resultuser = mysqli_query($con,$sqluser);
//判断账号是否存在
if (mysqli_num_rows($resultuser)<1) {
    $sqlemail = "SELECT `Email` FROM login WHERE `Email`='".$Email."'";
    $resultemail = mysqli_query($con,$sqlemail);
    //判断邮箱是否已被使用注册
    if (mysqli_num_rows($resultemail)<1) {
        $sql = "insert `login`(`userId`,`password`,`Email`,`Question`,`Answer`) values('".$userId."','".$password."','".$Email."','".$Question."','".$Answer."')";
        $result = mysqli_query($con,$sql);
        //判断注册数据写入是否成功
        if ($result) {
            echo json_encode('success');
        }else {
            echo json_encode('error');
        }
    }else {
        echo json_encode('emailError');
    }
}else {
    echo json_encode('userError');
}
?>
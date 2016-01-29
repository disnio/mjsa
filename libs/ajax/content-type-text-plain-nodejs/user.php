<?php  
// header('content-type:application:json;charset=utf8');  
// header('content-type:text/html;charset=utf8');  
header('Access-Control-Allow-Origin:*');  
// header('Access-Control-Allow-Origin:http://client.ycdl.com');  
// header('Access-Control-Allow-Origin: x-requested-with');
header('Access-Control-Allow-Methods:GET,POST,OPTIONS');  
// header('Access-Control-Allow-Credentials:true');
// header('Access-Control-Allow-Headers:x-requested-with,content-type');  
header('Access-Control-Allow-Headers:Content-Type, Authorization, Accept,X-Requested-With');  
/*$string = <<<XML
<?xml version='1.0'?> 
<document>
 <title>Forty What?</title>
 <from>Joe</from>
 <to>Jane</to>
</document>
XML;*/

// $xml = simplexml_load_string($string);
// sleep(3);
// echo $string;    
// echo $_POST;
$callback = $_GET["callback"];  
// $callback = $_POST['callback'];
$ret = array(  
    'username' => $_GET['username'], 
    'id' => $_GET['id'], 
    // 'username' => isset($_POST['username'])? $_POST['username'] : '', 
    // 'id' => isset($_POST['id'])? $_POST['id'] : '', 
    // "req" => $_GET, 
    // $_POST,
    // 'username' => "Allen"
    // "inp" => file_get_contents("php://input")
);  
// echo json_encode($ret);  
echo $callback.'('.urldecode(json_encode($ret)).')';
 
exit; 
?> 
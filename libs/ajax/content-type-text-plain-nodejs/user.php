<?php  
header('content-type:application:json;charset=utf8');  
// header('content-type:text/html;charset=utf8');  
header('Access-Control-Allow-Origin:*');  
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
// $callback = $_GET["callback"];  
// $callback = $_POST['callback'];

// 接收 json 数据:
// $_POST=json_decode(file_get_contents('php://input'), true); 
// 接收 x-www-form: 
$data = explode('&', file_get_contents("php://input"));
foreach ($data as $val) {
    if (!empty($val)) {
        list($key, $value) = explode('=', $val);   
        $_POST[$key] = urldecode($value);
    }
}

$ret = array(  
    // 'username' => $_GET['username'], 
    // 'id' => $_GET['id'], 
    'username' => $_POST['username'], 
    'id' => $_POST['id'], 
    // 'username' => $HTTP_RAW_POST_DATA['username'], 
    // 'id' =>  $HTTP_RAW_POST_DATA['id'], 
    // "req" => $_GET, 
    // $_POST,
    // 'username' => "Allen"
    // "inp" => file_get_contents("php://input")
);  
echo json_encode($ret);  
// echo $callback.'('.urldecode(json_encode($ret)).')';
// echo $callback.'('.urldecode(json_encode($ret)).')';
 
exit; 
?> 
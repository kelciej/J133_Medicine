<?php

// require 'Interface/ItemProxy.php';
// require 'Interface/UserChecker.php';

// $factory=new ItemProxyFactory();
// $itemProxy=$factory->getItemProxy("VENDOR");

//require 'Interface/Item.php';
//
//$list=getSampleBriefItemList();
//
//
//$arr=get_object_vars($list[0]);
//print_r($arr);
//echo json_encode($arr);


// foreach ($ist  as $item)
// {
// 	if($item->mIsOTC===NULL) echo "true\n";
// 	else echo "false\n";
// }

// $json=json_encode($list);
// var_dump($json);


// require 'Interface/UserChecker.php';

// $typelist=array("CUSTOMER","VENDOR","MANAGER");
// $userCheckerFactory=new UserCheckerFactory();
// foreach ($typelist as $type)
// {
// 	$userChecker=$userCheckerFactory->getInstance($type);
// 	$userChecker->login("hello", "123456");
// 	$userChecker->register("hello", "123456");
// 	$userChecker->checkAccess("hello", md5("123456"));
// }


//require_once '../Business/Item.php';
//
//$factory=new ItemFactory();
//$item=$factory->getSampleInstance();
//$item->mBriefDescription='ddd';
//print_r($item);
//

//use Doctrine\ORM\Tools\Setup;
//use Doctrine\ORM\EntityManager;
//
//require_once "../vendor/autoload.php";
//
//$isDevMode=true;
//$config=Setup::createAnnotationMetadataConfiguration(array(__DIR__."/src"),$isDevMode);
//
//$conn=array(
//	'driver'=>'pdo_sqlite',
//	'path'=>__DIR__.'/db.sqlite'
//);
//
//$entityManager=EntityManager::create($conn, $config);

/**
 * Userchecker test
 */

require_once "../Business/toolbox/UserChecker.php";

$customerChecker=new ManagerChecker();
$id=$customerChecker->register("test2","fasdfnawg" );
if(is_null($id))
{
	echo "failed\n";
}
else
{
	echo "id:".$id."\n";
}
$result=$customerChecker->login("test2","fasdfnawg" );
if(!is_null($result))
{
	$id=$result['id'];
	$token=$result['token'];
	echo "id:".$result['id'].";token:".$result['token']."\n";
}
else
{
	echo "login failed\n";
}
$result=$customerChecker->checkAccess($id, $token);
if($result=="success")
{
	echo "success\n";
}
elseif($result=="fail")
{
	echo "failed\n";
}
else echo "invalid\n";

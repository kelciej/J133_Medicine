<?php
/**
 * Created by PhpStorm.
 * User: johns
 * Date: 2016/5/21
 * Time: 14:12
 */

use Doctrine\ORM\Tools\Setup;
use Doctrine\ORM\EntityManager;

require_once dirname(__FILE__).'/'."vendor/autoload.php";

$isDevMode=false;
//$paths=array("/path/to/entity-files");
$paths=array(
	__DIR__."/src",
	__DIR__."/DataAccess"
);
$config=Setup::createAnnotationMetadataConfiguration($paths,$isDevMode);

//$dbParams=array(
//	'driver'=>'pdo_mysql',
//	'user'=>'root',
//	'password'=>'123456',
//	'dbname'=>'j133'
//);

$dbParams=array(
	'host'=>'rds76ac7pi0a1ow5ionlo.mysql.rds.aliyuncs.com',
	'driver'=>'pdo_mysql',
	'user'=>'j133_10131701',
	'password'=>'j133_10131701',
	'dbname'=>'j133'
);

/**
 * @return EntityManager
 * @throws \Doctrine\ORM\ORMException
 */
function getEM()
{
	$isDevMode=false;
//$paths=array("/path/to/entity-files");
	$paths=array(
		__DIR__."/src",
		__DIR__."/DataAccess"
	);
	$config=Setup::createAnnotationMetadataConfiguration($paths,$isDevMode);

	$dbParams=array(
		'host'=>'rds76ac7pi0a1ow5ionlo.mysql.rds.aliyuncs.com',
		'driver'=>'pdo_mysql',
		'user'=>'j133_10131701',
		'password'=>'j133_10131701',
		'dbname'=>'j133'
	);
	return EntityManager::create($dbParams, $config);
}

$entityManager=EntityManager::create($dbParams, $config);
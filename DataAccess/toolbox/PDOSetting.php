<?php
/**
 * Created by PhpStorm.
 * User: johns
 * Date: 2016/5/18
 * Time: 16:41
 */

class MyPDO extends PDO
{
	public function __construct($file = 'PDOSetting.ini')
	{
		if (!$settings = parse_ini_file($file, TRUE)) throw new exception('Unable to open ' . $file . '.');

		$dsn = $settings['database']['driver'] .
			':host=' . $settings['database']['host'] .
//			';port=' . $settings['database']['port'] .
			';dbname=' . $settings['database']['schema'];

		parent::__construct($dsn, $settings['database']['username'], $settings['database']['password']);
	}
}

//$pdo=new MyPDO();
//$sta=$pdo->prepare("select * from user order by id desc limit 0,10");
//$sta->execute();
//$count=$sta->rowCount();
//echo $count."\n";
//$result=$sta->fetchAll();
//
//foreach ($result as $item) {
//	echo $item['id'];
//	echo $item['name']."\n";
//}
//
//$sta=$pdo->prepare('insert into user(name) VALUES(:name)');
//$sta->execute(array(':name'=>'hello'));
//$id=$pdo->lastInsertId();
//echo $id."\n";
//$count=$sta->rowCount();
//echo $count;

//require_once "../../bootstrap.php";
//require_once "../DItem.php";
//
//$item=new DItem();
//$item->mName="sample";
//$item->mBrand="sample brand";
//$item->mPrice=990;
//$item->mInventory=10;
//$item->mStoreId=1;
//$item->mBriefDescription="sample description";
//$item->mManufacturer="sample manufacturer";
//$entityManager=getEM();
//$entityManager->persist($item);
//$entityManager->flush();
//
//$newItem=$entityManager->getRepository("DItem")->findOneBy(
//	array('mId'=>2)
//);
//$queryBuilder=$entityManager->getRepository("DItem")->createQueryBuilder('q');
//$queryBuilder->where('q.mId>1');
//$queryBuilder->setFirstResult(0);
//$queryBuilder->setMaxResults(5);
////$queryBuilder->select('DItem');
//$query=$queryBuilder->getQuery();
//$newItem=$query->getArrayResult();
//foreach ($newItem as $item)
//{
//	print_r($item);
//}


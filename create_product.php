<?php
/**
 * Created by PhpStorm.
 * User: johns
 * Date: 2016/5/21
 * Time: 14:25
 */

require_once "bootstrap.php";

$newProductName=$argv[1];

$product=new Product();
$product->setName($newProductName);

$entityManager->persist($product);
$entityManager->flush();

echo "Create Product with ID".$product->getId()."\n";
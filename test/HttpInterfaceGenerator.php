<?php
require 'Interface/ItemProxy.php';

$proxyfactory=new ItemProxyFactory();
$customerProxy=$proxyfactory->getItemProxy("CUSTOMER");
$list=$customerProxy->searchItemByName("ddd");
echo json_encode($list);
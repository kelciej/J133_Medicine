<?php
/**
 * Created by PhpStorm.
 * User: johns
 * Date: 2016/5/22
 * Time: 13:31
 */

require_once "../Business/toolbox/ItemProxy.php";

$itemProxy=new ItemProxy();
//$item=$itemProxy->loadItem(8);
//var_dump($item);

$items=$itemProxy->getItemsByName("感冒灵", 1, 1);
foreach ($items as $item) {
	var_dump($item);
}

//$item=new DrugItem();
//$item->mName="感冒灵";
//$item->mBrand="j133";
//$item->mManufacturer="j133";
//$item->mInventory=100;
//$item->mStoreId=2;
//$item->mStatus=0;
//$manual=new Manual();
//$manual->mName="manual 感冒灵";
//$manual->mDurationOfEfficacy=180;
//$manual->mApprovalNumbers="kkm:2322rt425";
//$manual->mManufacturer="j133";
//$item->mManual=$manual;
//$itemProxy->saveItem($item);
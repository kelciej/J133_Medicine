<?php
require_once dirname(__FILE__).'/'."../../bootstrap.php";
require_once dirname(__FILE__).'/'."../Item.php";
require_once dirname(__FILE__).'/'."../../DataAccess/DItem.php";
require_once dirname(__FILE__).'/'."../../DataAccess/DStore.php";
require_once dirname(__FILE__).'/'."../../DataAccess/DManual.php";
require_once dirname(__FILE__).'/'."../../DataAccess/DImgURL.php";


interface ICustomerItemProxy
{
	/**
	 * @param $name
	 * @return int
	 */
	function getNumOfItemByName($name);

	/**
	 * get brief info of items associated with $name
	 * @param string $name
	 * @return array an array of BriefItemInfo
	 */
	function getItemsByName($name,$pageNo,$pageSize);

	/**
	 * @param $id category's id
	 * @return int
	 */
	function getNumOfItemByCategoryId($id);

	/**
	 * @param $id category's id
	 * @return array an array of BriefItemInfo
	 */
	function getItemsByCategoryId($id,$pageNo,$pageSize);

	/**
	 * get an instance of Item from database with all its members
	 * @param int $id
	 * @return DrugItem an instance of DrugItem if success, NULL if failed.
	 */
	function loadItem($id);
}

interface IStoreItemProxy
{
	/**
	 * get an instance of Item from database with all its members
	 * @param int $id
	 * @return DrugItem an instance of DrugItem if success, NULL if failed.
	 */
	function loadItem($id);

	/**
	 * save the item info to database with all it's members.
	 * if the item does not have an id, then insert it and fill its id with retrn value.
	 * if a member has not an id,then insert and fill it with the return value.
	 * @param DrugItem $item
	 * @return bool true if success, false otherwise.
	 */
	function saveItem(DrugItem $item);

	/**
	 * @param $id int item's id
	 * @return bool true if success and false otherwise.
	 */
	function putOn($id);

	/**
	 * @param $id
	 * @return bool true if success and false otherwise.
	 */
	function putOff($id);

	/**
	 * @param $id store's id
	 * @return int
	 */
	function getNumOfItemByStoreId($id,$pageNo,$pageSize);

	/**
	 * @param $id store's id
	 * @return array an array of BriefItemInfo
	 */
	function getItemsByStoreId($id);
}

interface IManagerItemProxy
{
	/**
	 * @param $name
	 * @return int
	 */
	function getNumOfItemByName($name);
	/**
	 * get brief info of items associated with $name
	 * @param string $name
	 * @return array an array of BriefItemInfo
	 */
	function getItemsByName($name,$pageNo,$pageSize);

	/**
	 * get an instance of Item from database with all its members
	 * @param int $id
	 * @return DrugItem an instance of DrugItem if success, NULL if failed.
	 */
	function loadItem($id);

	/**
	 * @param $id
	 * @return bool true if success and false otherwise.
	 */
	function putOff($id);

	/**
	 * @param $id store's id
	 * @return int
	 */
	function getNumOfItemByStoreId($id,$pageNo,$pageSize);
	/**
	 * @param $id store's id
	 * @return array an array of BriefItemInfo
	 */
	function getItemsByStoreId($id);

	/**
	 * @param $id category's id
	 * @return int
	 */
	function getNumOfItemByCategoryId($id);
	/**
	 * @param $id category's id
	 * @return array an array of BriefItemInfo
	 */
	function getItemsByCategoryId($id,$pageNo,$pageSize);
}

/**
 * interface of ItemProxy
 * @author johns
 *
 */
interface IItemProxy extends  ICustomerItemProxy,IStoreItemProxy,IManagerItemProxy
{
	/**
	 * @param $name
	 * @return int
	 */
	function getNumOfItemByName($name);
	
	/**
	 * get an instance of Item from database with all its members
	 * @param int $id
	 * @return DrugItem an instance of DrugItem if success, NULL if failed.
	 */
	function loadItem($id);
	
	/**
	 * save the item info to database with all it's members.
	 * if the item does not have an id, then insert it and fill its id with retrn value.
	 * if a member has not an id,then insert and fill it with the return value.
	 * @param DrugItem $item
	 * @return bool true if success, false otherwise.
	 */
	function saveItem(DrugItem $item);

	/**
	 * @param $id int item's id
	 * @return bool true if success and false otherwise.
	 */
	function putOn($id);

	/**
	 * @param $id
	 * @return bool true if success and false otherwise.
	 */
	function putOff($id);

	/**
	 * @param $id store's id
	 * @return int
	 */
	function getNumOfItemByStoreId($id,$pageNo,$pageSize);
	/**
	 * @param $id store's id
	 * @return array an array of BriefItemInfo
	 */
	function getItemsByStoreId($id);

	/**
	 * @param $id category's id
	 * @return int
	 */
	function getNumOfItemByCategoryId($id);
	/**
	 * @param $id category's id
	 * @return array an array of BriefItemInfo
	 */
	function getItemsByCategoryId($id,$pageNo,$pageSize);
	
}

/**
 * sample ItemProxy
 * @author johns
 *
 */
class SItemProxy implements IItemProxy
{
	public function getItemsByName($name,$pageNo,$pageSize)
	{
		$arr=array();
		$num=5;
		for($i=0;$i<$num;$i++)
		{
			$obj=new BriefItemInfo();
			$obj->mName=$name;
			$obj->mID=rand(10,100);
			$arr+=array($obj);
		}
		return $arr;
	}
	
	public function loadItem($id)
	{
		$factory=new ItemFactory();
		$item=$factory->getInstance();
		$item->mName="sample";
		$item->mId=$id;
		return $item;
	}
	
	public function saveItem(DrugItem $item)
	{
		if(isset($item->mId)) return true;
		else $item->mId=mt_rand(1000,10000);
		return true;
	}

	/**
	 * @param $name
	 * @return int
	 */
	function getNumOfItemByName($name)
	{
		return 5;
	}

	/**
	 * @param $id int item's id
	 * @return bool true if success and false otherwise.
	 */
	function putOn($id)
	{
		return true;
	}

	/**
	 * @param $id
	 * @return bool true if success and false otherwise.
	 */
	function putOff($id)
	{
		return true;
	}

	/**
	 * @param $id store's id
	 * @return int
	 */
	function getNumOfItemByStoreId($id, $pageNo, $pageSize)
	{
		return 5;
	}

	/**
	 * @param $id store's id
	 * @return array an array of BriefItemInfo
	 */
	function getItemsByStoreId($id)
	{
		$arr=array();
		$num=5;
		for($i=0;$i<$num;$i++)
		{
			$obj=new BriefItemInfo();
			$obj->mName="sample";
			$obj->mID=$id;
			$arr+=array($obj);
		}
		return $arr;
	}

	/**
	 * @param $id category's id
	 * @return int
	 */
	function getNumOfItemByCategoryId($id)
	{
		return 5;
	}

	/**
	 * @param $id category's id
	 * @return array an array of BriefItemInfo
	 */
	function getItemsByCategoryId($id, $pageNo, $pageSize)
	{
		$arr=array();
		$num=5;
		for($i=0;$i<$num;$i++)
		{
			$obj=new BriefItemInfo();
			$obj->mName="sample";
			$obj->mID=rand(100,1000);
			$arr+=array($obj);
		}
		return $arr;
	}
	
}

class ItemProxyFactory
{
	/**
	 * @return ICustomerItemProxy
	 */
	public function getCustomerItemProxy()
	{
		return new SItemProxy();
	}

	/**
	 * @return IStoreItemProxy
	 */
	public function getStoreItemProxy()
	{
		return new SItemProxy();
	}

	/**
	 * @return IManagerItemProxy
	 */
	public function getManagerItemProxy()
	{
		return new SItemProxy();
	}
}

class ItemProxy implements IItemProxy
{

	/**
	 * get brief info of items associated with $name
	 * @param string $name
	 * @return array an array of BriefItemInfo
	 */
	function getItemsByName($name, $pageNo, $pageSize)
	{
		$em=getEM();
		$queryBuilder=$em->getRepository("DItem")->createQueryBuilder("q");
		$queryBuilder->where("q.mName like '%:name%'");
//			->setParameter(':name', $name);
		$query=$queryBuilder->getQuery();
		$query->execute();
		$items=$query->getResult();
		$briefItemInfos=array();
		foreach ($items as $item)
		{
			$briefItemInfo=new DrugItem();
			$this->fillBriefItem($briefItemInfo, $item);
			$briefItemInfos+=$briefItemInfo;
		}
		return $briefItemInfos;
	}

	/**
	 * @param $name
	 * @return int
	 */
	function getNumOfItemByName($name)
	{
		// TODO: Implement getNumOfItemByName() method.
	}

	/**
	 * get an instance of Item from database with all its members
	 * @param int $id
	 * @return DrugItem an instance of DrugItem if success, NULL if failed.
	 */
	function loadItem($id)
	{
		$em=getEM();
		$item=$em->find("DItem", $id);
		if(is_null($item)) return null;

		$factory=new ItemFactory();
		$drugItem=$factory->getInstance();
		//fill simple
		$this->fillDrugItem($drugItem, $item);
		//fill manual
		if(!is_null($item->mManualId))
		{
			$dManual=$em->find("DManual", $item->mManualId);
			$manual=new Manual();
			$this->fillManual($manual, $dManual);
			$drugItem->mManual=$manual;
		}
		// fill urls
		$dImgUrls=$em->getRepository("DImgURL")->findBy(array('mItemId'=>$id));
		$arr=array();
		foreach ($dImgUrls as $url) {
			$arr+=array($url->mURL);
		}
		$drugItem->mURLs=$arr;
		
		//fill store name
		$storeId=$item->mStoreId;
		$dStore=$em->find("DStore", $storeId);
		$drugItem->mStoreName=$dStore->mName;
		
		return $drugItem;
		
	}

	/**
	 * save the item info to database with all it's members.
	 * if the item does not have an id, then insert it and fill its id with retrn value.
	 * if a member has not an id,then insert and fill it with the return value.
	 * @param DrugItem $item
	 * @return bool true if success, false otherwise.
	 */
	function saveItem(DrugItem $item)
	{
		$em=getEM();
		$dItem=new DItem();
		$this->fillDItem($dItem, $item);
		$em->persist($dItem);
		
		$manual=$item->mManual;
		$dManual=new DManual();
		$this->fillDManual($dManual,$manual );
		$em->persist($dManual);
		$em->flush();
		$dItem->mManualId=$dManual->mId;

		$urls=$em->getRepository("DImgURL")->findBy(array('mItemId'=>$item->mId));
		foreach ($urls as $url) {
			$em->remove($url);
		}

		if(!is_null($item->mURLs))
		{
			foreach ($item->mURLs as $url) {
				$dImgURL=new DImgURL();
				$dImgURL->mItemId=$item->mId;
				$dImgURL->mURL=$url;
				$em->persist($dImgURL);
			}
		}

		
		$em->flush();
	}

	/**
	 * @param $id int item's id
	 * @return bool true if success and false otherwise.
	 */
	function putOn($id)
	{
		// TODO: Implement putOn() method.
	}

	/**
	 * @param $id
	 * @return bool true if success and false otherwise.
	 */
	function putOff($id)
	{
		// TODO: Implement putOff() method.
	}

	/**
	 * @param $id store's id
	 * @return int
	 */
	function getNumOfItemByStoreId($id, $pageNo, $pageSize)
	{
		// TODO: Implement getNumOfItemByStoreId() method.
	}

	/**
	 * @param $id store's id
	 * @return array an array of BriefItemInfo
	 */
	function getItemsByStoreId($id)
	{
		// TODO: Implement getItemsByStoreId() method.
	}

	/**
	 * @param $id category's id
	 * @return int
	 */
	function getNumOfItemByCategoryId($id)
	{
		// TODO: Implement getNumOfItemByCategoryId() method.
	}

	/**
	 * @param $id category's id
	 * @return array an array of BriefItemInfo
	 */
	function getItemsByCategoryId($id, $pageNo, $pageSize)
	{
		// TODO: Implement getItemsByCategoryId() method.
	}
	
	private function fillDrugItem(DrugItem $des,DItem $src)
	{
		$des->mId					=$src->mId;
		$des->mApprovalNumbers	=$src->mApprovalNumbers;
		$des->mBrand				=$src->mBrand;
		$des->mBriefDescription	=$src->mBriefDescription;
		$des->mCategoryId			=$src->mCategoryId;
		$des->mFormulation		=$src->mFormulation;
		$des->mGenericName		=$src->mGenericName;
		$des->mInventory			=$src->mInventory;
		$des->mIsOTC				=$src->mIsOTC;
		$des->mManufacturer		=$src->mManufacturer;
//		$des->mManual
		$des->mName					=$src->mName;
		$des->mPrice				=$src->mPrice;
		$des->mStoreId				=$src->mStoreId;
		$des->mSpecification		=$src->mSpecification;
		$des->mStatus				=$src->mStatus;
//		$des->mStoreName
//		$des->mURLs
	}
	
	private function fillBriefItem(BriefItemInfo $des,DItem $src)
	{
		$des->mID					=$src->mId;
		$des->mBrand				=$src->mBrand;
//		$des->mImgURL
		$des->mInventory			=$src->mInventory;
		$des->mIsOTC				=$src->mIsOTC;
		$des->mName					=$src->mName;
		$des->mPrice				=$src->mPrice;
//		$des->mStoreName
	}
	
	private function fillDItem(DItem $des, DrugItem $src)
	{
		$des->mId					=$src->mId;
		$des->mApprovalNumbers	=$src->mApprovalNumbers;
		$des->mBrand				=$src->mBrand;
		$des->mBriefDescription	=$src->mBriefDescription;
		$des->mCategoryId			=$src->mCategoryId;
		$des->mFormulation		=$src->mFormulation;
		$des->mGenericName		=$src->mGenericName;
		$des->mInventory			=$src->mInventory;
		$des->mIsOTC				=$src->mIsOTC;
		$des->mManufacturer		=$src->mManufacturer;
		$des->mName					=$src->mName;
		$des->mPrice				=$src->mPrice;
		$des->mStoreId				=$src->mStoreId;
		$des->mSpecification		=$src->mSpecification;
		$des->mStatus				=$src->mStatus;
	}

	private function fillManual(Manual $des,DManual $src)
	{
		$des->mApprovalNumbers=$src->mApprovalNumbers;
		$des->mChemicalComposition= $src->mChemicalComposition;
		$des->mContradictions=$src->mContradictions;
		$des->mDescription=$src->mDescription;
		$des->mDosageAndAdministration=$src->mDosageAndAdministration;
		$des->mDurationOfEfficacy=$src->mDurationOfEfficacy;
		$des->mFunctions=$src->mFunctions;
		$des->mId=$src->mId;
		$des->mIndications=$src->mIndications;
		$des->mManufacturer=$src->mManufacturer;
		$des->mMaterials=$src->mManufacturer;
		$des->mName=$src->mName;
		$des->mSpecification=$src->mSpecification;
		$des->mStorage=$src->mStorage;
		$des->mWarnings=$src->mWarnings;
	}

	private function fillDManual(DManual $des,Manual $src)
	{
		$des->mApprovalNumbers=$src->mApprovalNumbers;
		$des->mChemicalComposition= $src->mChemicalComposition;
		$des->mContradictions=$src->mContradictions;
		$des->mDescription=$src->mDescription;
		$des->mDosageAndAdministration=$src->mDosageAndAdministration;
		$des->mDurationOfEfficacy=$src->mDurationOfEfficacy;
		$des->mFunctions=$src->mFunctions;
		$des->mId=$src->mId;
		$des->mIndications=$src->mIndications;
		$des->mManufacturer=$src->mManufacturer;
		$des->mMaterials=$src->mManufacturer;
		$des->mName=$src->mName;
		$des->mSpecification=$src->mSpecification;
		$des->mStorage=$src->mStorage;
		$des->mWarnings=$src->mWarnings;
	}
}
<?php

/**
 * Drug Item info
 * @author johns
 *
 */
class DrugItem
{
	/**
	 * 商品编号
	 * @var int
	 */
	public $mId                   ;			//商品编号
	/**
	 * 药品名称
	 * @var string
	 */
	public $mName                 ;         //药品名称
	/**
	 * 品牌
	 * @var string
	 */
	public $mBrand                ;         //品牌
	/**
	 * 规格
	 * @var string
	 */
	public $mSpecification        ;         //规格
	/**
	 * 药品简单说明
	 * @var string
	 */
	public $mBriefDescription     ;         //药品简单说明
	/**
	 * 价格（单位为分）
	 * @var int
	 */
	public $mPrice                ;         //价格（单位为分）
	/**
	 * 通用名
	 * @var string
	 */
	public $mGenericName          ;         //通用名
	/**
	 * 批准文号
	 * @var string
	 */
	public $mApprovalNumbers      ;         //批准文号
	/**
	 * 剂型
	 * @var string
	 */
	public $mFormulation          ;         //剂型
	/**
	 * 生产企业
	 * @var string
	 */
	public $mManufacturer         ;         //生产企业
	/**
	 * 库存状态
	 * @var int
	 */
	public $mInventory            ;         //库存状态
	/**
	 * 商家名
	 * @var string
	 */
	public $mStoreName         ;         //商家名
	/**
	 * 说明书
	 * @var Manual
	 */
	public $mManual               ;         //说明书
	/**
	 * 商家Id
	 * @var Store
	 */
	public $mStoreId                ;         //商家Id
	/**
	 * 大图URL
	 * @var array of URL
	 */
	public $mURLs				  ;			//大图URL
	/**
	 * 状态，1为上架，0为下架
	 * @var int
	 */
	public $mStatus				;		//状态，1为上架，0为下架

	/**
	 * 商品类别编号
	 * @var int
	 */
	public $mCategoryId;					//商品类别编号

	/**
	 * 非处方药,
	 * @var bool
	 */
	public $mIsOTC;						//非处方药,
}

/**
 * Drug Item info factory
 * @author johns
 *
 */
class ItemFactory
{
	/**
	 * get an instance of DrugItem
	 * @return DrugItem instance of DrugItem
	 */
	function getInstance()
	{
		$item=new DrugItem();
		return $item;
	}

	/**
	 * get an instance of DrugItem filled with sample content
	 * @return DrugItem
	 */
	function getSampleInstance()
	{
		$item=new DrugItem();
		$item->mId=rand(1000,10000);
		$item->mName='sampleName';
		$item->mBrand='J133';
		$item->mSpecification='sample Specification';
		$item->mBriefDescription='sample brief description';
		$item->mPrice=990;
		$item->mGenericName='sample generic name';
		$item->mApprovalNumbers='unknown';
		$item->mFormulation='unknown';
		$item->mManufacturer='unknown';
		$item->mInventory=0;
		$item->mStoreName='unknown';
		$item->mManual=null;
		$item->mStoreId=0;
		$item->mURLs='http://c1.yaofangwang.net/Common/Upload/Medicine/172/172663/5387ee0c-d510-488a-805e-b387c3aba3317619.jpg_syp.jpg';
		$item->mStatus=0;
		$item->mCategoryId=0;

		return $item;
	}
}

/**
 * Drug Item's brief info
 * @author johns
 *
 */
class BriefItemInfo
{
	/**
	 * 商品编号
	 * @var int
	 */
	public $mID;						//商品编号
	/**
	 * 药品名称
	 * @var string
	 */
	public $mName;                      //药品名称
	/**
	 * 药品简图URL
	 * @var string
	 */
	public $mImgURL;                    //药品简图URL
	/**
	 * 商品品牌
	 * @var string
	 */
	public $mBrand;                     //商品品牌
	/**
	 * 商家名称
	 * @var string
	 */
	public $mStoreName;                 //商家名称
	/**
	 * 价格（分）
	 * @var int
	 */
	public $mPrice;                     //价格
	/**
	 * 库存
	 * @var int
	 */
	public $mInventory;                 //库存
	/**
	 * 是否OTC
	 * @var bool
	 */
	public $mIsOTC;                     //是否OTC
}


/**
 * BriefItemInfo factory
 * @author johns
 *
 */
class BriefItemInfoFactory
{
	/**
	 * get an instance of BriefItemInfo
	 * @return BriefItemInfo an instance of BriefItemInfo
	 */
	public function getInstance()
	{
		return new BriefItemInfo();
	}
}


class Manual
{
	/**
	 * 说明书编号
	 * @var int
	 */
	public $mId							;//说明书编号
	/**
	 * 药品名称
	 * @var string
	 */
	public $mName;//药品名称
	/**
	 * 产品介绍
	 * @var string
	 */
	public $mDescription;//产品介绍
	/**
	 * 产品规格
	 * @var string
	 */
	public $mSpecification;//产品规格
	/**
	 * 产品原料
	 * @var string
	 */
	public $mMaterials;//产品原料
	/**
	 * 标志性成分及含量
	 * @var string
	 */
	public $mChemicalComposition;//标志性成分及含量
	/**
	 * 药品功能
	 * @var string
	 */
	public $mFunctions;//药品功能
	/**
	 * 适宜人群
	 * @var string
	 */
	public $mIndications;//适宜人群
	/**
	 * 不适宜人群
	 * @var string
	 */
	public $mContradictions;//不适宜人群
	/**
	 * 使用方法及使用量
	 * @var string
	 */
	public $mDosageAndAdministration;//使用方法及使用量
	/**
	 * 保质期（日）
	 * @var integer
	 */
	public $mDurationOfEfficacy;//保质期（日）
	/**
	 * 注意事项
	 * @var string
	 */
	public $mWarnings;//注意事项
	/**
	 * 贮藏方法
	 * @var string
	 */
	public $mStorage;//贮藏方法
	/**
	 * 批准文号
	 * @var string
	 */
	public $mApprovalNumbers;//批准文号
	/**
	 * 生产企业
	 * @var string
	 */
	public $mManufacturer;//生产企业
}

class ItemPackage
{
	/**
	 * 查询到的总数
	 * @var int
	 */
	public $tatal;
	/**
	 * 部分数据
	 * @var array an array of BriefItemInfo
	 */
	public $data;
}
?>

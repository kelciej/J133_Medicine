<?php
/**
 * Created by PhpStorm.
 * User: johns
 * Date: 2016/5/21
 * Time: 17:13
 */

/**
 * @Entity
 * Class DItem
 */
class DItem
{
	/**
	 * 商品编号
	 * @var int
	 * @Id
	 * @Column(type="integer")
	 * @GeneratedValue
	 */
	public $mId                   ;			//商品编号
	/**
	 * 药品名称
	 * @var string
	 * @Column(length=40)
	 */
	public $mName                 ;         //药品名称
	/**
	 * 品牌
	 * @var string
	 * @Column(length=40)
	 */
	public $mBrand                ;         //品牌
	/**
	 * 规格
	 * @var string
	 * @Column(length=40,nullable=true)
	 */
	public $mSpecification        ;         //规格
	/**
	 * 药品简单说明
	 * @var string
	 * @Column(length=1000,nullable=true)
	 */
	public $mBriefDescription     ;         //药品简单说明
	/**
	 * 价格（单位为分）
	 * @var int
	 * @Column(type="integer",nullable=true)
	 */
	public $mPrice                ;         //价格（单位为分）
	/**
	 * 通用名
	 * @var string
	 * @Column(length=40,nullable=true)
	 */
	public $mGenericName          ;         //通用名
	/**
	 * 批准文号
	 * @var string
	 * @Column(length=40,nullable=true)
	 */
	public $mApprovalNumbers      ;         //批准文号
	/**
	 * 剂型
	 * @var string
	 * @Column(length=40,nullable=true)
	 */
	public $mFormulation          ;         //剂型
	/**
	 * 生产企业
	 * @var string
	 * @Column(length=40)
	 */
	public $mManufacturer         ;         //生产企业
	/**
	 * @var int
	 * @Column(type="integer",nullable=true)
	 */
	public $mManualId				 ;
	/**
	 * 库存状态
	 * @var int
	 * @Column(length=40)
	 */
	public $mInventory            ;         //库存状态
//	/**
//	 * 商家名
//	 * @var string
//	 * @Column(length=40,nullable=true)
//	 */
//	public $mBusinessName         ;         //商家名
	/**
	 * 商家编号
	 * @var int
	 * @Column(type="integer")
	 */
	public $mStoreId                ;         // 商家编号
	/**
	 * 状态，1为上架，0为下架
	 * @var int
	 * @Column(type="integer")
	 */
	public $mStatus				;		//状态，1为上架，0为下架

	/**
	 * 商品类别编号
	 * @var int
	 * @Column(type="integer",nullable=true)
	 */
	public $mCategoryId;					//商品类别编号

	/**
	 * 非处方药,
	 * @var bool 
	 * @Column(type="boolean",nullable=true)
	 */
	public $mIsOTC;						//非处方药,
}
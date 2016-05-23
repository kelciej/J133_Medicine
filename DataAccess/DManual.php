<?php

/**
 * Created by PhpStorm.
 * User: johns
 * Date: 2016/5/22
 * Time: 8:41
 */

/**
 * Class Manual
 * @Entity
 */
class DManual
{
	/**
	 * 说明书编号
	 * @var int
	 * @Id
	 * @GeneratedValue
	 * @Column(type="integer")
	 */
	public $mId							;//说明书编号
	/**
	 * 药品名称
	 * @var string
	 * @Column(length=40)
	 */
	public $mName;//药品名称
	/**
	 * 产品介绍
	 * @var string
	 * @Column(length=600,nullable=true)
	 */
	public $mDescription;//产品介绍
	/**
	 * 产品规格
	 * @var string
	 * @Column(length=40,nullable=true)
	 */
	public $mSpecification;//产品规格
	/**
	 * 产品原料
	 * @var string
	 * @Column(length=200,nullable=true)
	 */
	public $mMaterials;//产品原料
	/**
	 * 标志性成分及含量
	 * @var string
	 * @Column(length=200,nullable=true)
	 */
	public $mChemicalComposition;//标志性成分及含量
	/**
	 * 药品功能
	 * @var string
	 * @Column(length=200,nullable=true)
	 */
	public $mFunctions;//药品功能
	/**
	 * 适宜人群
	 * @var string
	 * @Column(length=200,nullable=true)
	 */
	public $mIndications;//适宜人群
	/**
	 * 不适宜人群
	 * @var string
	 * @Column(length=200,nullable=true)
	 */
	public $mContradictions;//不适宜人群
	/**
	 * 使用方法及使用量
	 * @var string
	 * @Column(length=200,nullable=true)
	 */
	public $mDosageAndAdministration;//使用方法及使用量
	/**
	 * 保质期（日）
	 * @var int
	 * @Column(type="integer")
	 */
	public $mDurationOfEfficacy;//保质期（日）
	/**
	 * 注意事项
	 * @var string
	 * @Column(length=200,nullable=true)
	 */
	public $mWarnings;//注意事项
	/**
	 * 贮藏方法
	 * @var string
	 * @Column(length=100,nullable=true)
	 */
	public $mStorage;//贮藏方法
	/**
	 * 批准文号
	 * @var string
	 * @Column(length=140)
	 */
	public $mApprovalNumbers;//批准文号
	/**
	 * 生产企业
	 * @var string
	 * @Column(length=40)
	 */
	public $mManufacturer;//生产企业
}
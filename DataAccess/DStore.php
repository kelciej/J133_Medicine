<?php

/**
 * Created by PhpStorm.
 * User: johns
 * Date: 2016/5/22
 * Time: 8:15
 */

require_once dirname(__FILE__).'/'."DStoreAccess.php";

/**
 * Class DStore
 * @Entity
 */
class DStore
{
	/**
	 * 商家编号
	 * @var int
	 * @Id
	 * @OneToOne(targetEntity="DStoreAccess")
	 * @JoinColumn(name="DStoreAccess_Id",referencedColumnName="mId")
	 */
	public $mId                   ;//商家编号
	/**
	 * 商家名称
	 * @var string
	 * @Column(length=40)
	 */
	public $mName                 ;//商家名称
	/**
	 * 真实姓名
	 * @var string
	 * @Column(length=40)
	 */
	public $mRealName             ;//真实姓名
	/**
	 * 邮箱
	 * @var string
	 * @Column(length=60)
	 */
	public $mEmail                ;//邮箱
	/**
	 * 手机
	 * @var string
	 * @Column(length=20)
	 */
	public $mMobileNumber         ;//手机
	/**
	 * 所在地区（省、市、区）
	 * @var string
	 * @Column(length=40)
	 */
	public $mDistrict             ;//所在地区（省、市、区）
	/**
	 * 详细地址
	 * @var string
	 * @Column(length=40)
	 */
	public $mDetailAddress        ;//详细地址
}
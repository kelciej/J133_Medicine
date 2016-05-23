<?php

/**
 * Created by PhpStorm.
 * User: johns
 * Date: 2016/5/22
 * Time: 8:07
 */

/**
 * Class DCustomer
 * @Entity
 */
class DCustomer
{
	/**
	 * 顾客编号
	 * @var int
	 * @Id
	 * @OneToOne(targetEntity="DCustomerAccess")
	 * @JoinColumn(name="DCustomerAccess_Id",referencedColumnName="mId");
	 */
	public $mId                 ;//顾客编号
	/**
	 * 用户名
	 * @var string
	 * @Column(length=40)
	 */
	public $mName               ;//用户名
	/**
	 * 真实姓名
	 * @var string
	 * @Column(length=40,nullable=true)
	 */
	public $mRealName           ;//真实姓名
	/**
	 * 性别
	 * @var string "male" or "female"
	 * @Column(length=8,nullable=true)
	 */
	public $mGender             ;//性别
	/**
	 * 生日
	 * @var string
	 * @Column(length=40,nullable=true)
	 */
	public $mBirthday           ;//生日
	/**
	 * 邮箱
	 * @var string
	 * @Column(length=60)
	 */
	public $mEmail              ;//邮箱
	/**
	 * 手机
	 * @var string
	 * @Column(length=20)
	 */
	public $mMobileNumber       ;//手机
	/**
	 * 所在地区（省、市、区）
	 * @var string
	 * @Column(length=40,nullable=true)
	 */
	public $mDistrict           ;//所在地区（省、市、区）
	/**
	 * 详细地址
	 * @var string
	 * @Column(length=60,nullable=true)
	 */
	public $mDetailAddress      ;//详细地址
}
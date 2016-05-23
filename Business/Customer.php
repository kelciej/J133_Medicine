<?php

/**
 * Customer info
 * @author johns
 *
 */
class Customer
{
	/**
	 * 顾客编号
	 * @var int
	 */
	public $mId                 ;//顾客编号
	/**
	 * 用户名
	 * @var string
	 */
	public $mName               ;//用户名
	/**
	 * 真实姓名
	 * @var string
	 */
	public $mRealName           ;//真实姓名
	/**
	 * 性别
	 * @var string "male" or "female"
	 */
	public $mGender             ;//性别
	/**
	 * 生日
	 * @var string
	 */
	public $mBirthday           ;//生日
	/**
	 * 邮箱
	 * @var string
	 */
	public $mEmail              ;//邮箱
	/**
	 * 手机
	 * @var string
	 */
	public $mMobileNumber       ;//手机
	/**
	 * 所在地区（省、市、区）
	 * @var string
	 */
	public $mDistrict           ;//所在地区（省、市、区）
	/**
	 * 详细地址
	 * @var string
	 */
	public $mDetailAddress      ;//详细地址

	/**
	 * 收货地址
	 * @var array
	 */
	public $mDeliveryAddresses	;//收货地址
}

/**
 * Customer info factory
 * @author johns
 *
 */
class CustomerFactory
{
	/**
	 * get an instance
	 * @return Customer an instance of Customer
	 */
	public function getInstance()
	{
		return new Customer();
	}
}

class BriefCustomerInfo
{
	/**
	 * 顾客编号
	 * @var int
	 */
	public $mId                 ;//顾客编号
	/**
	 * 用户名
	 * @var string
	 */
	public $mName               ;//用户名
	/**
	 * 真实姓名
	 * @var string
	 */
	public $mRealName           ;//真实姓名
	/**
	 * 性别
	 * @var string "male" or "female"
	 */
	public $mGender             ;//性别
	/**
	 * 邮箱
	 * @var string
	 */
	public $mEmail              ;//邮箱
	/**
	 * 手机
	 * @var string
	 */
	public $mMobileNumber       ;//手机
	/**
	 * 所在地区（省、市、区）
	 * @var string
	 */
	public $mDistrict           ;//所在地区（省、市、区）
	/**
	 * 详细地址
	 * @var string
	 */
	public $mDetailAddress      ;//详细地址
}

class DeliveryAddress
{
	/**
	 * 收货地址编号
	 * @var int
	 */
	public $mId;//收货地址编号
	/**
	 * 收货人姓名
	 * @var string
	 */
	public $mName;//收货人姓名
	/**
	 * 所在地区（省、市、区）
	 * @var string
	 */
	public $mDistrict;//所在地区（省、市、区）
	/**
	 * 详细地址
	 * @var string
	 */
	public $mDetailAddress;//详细地址
	/**
	 * 手机号码
	 * @var string
	 */
	public $mMobileNumber;//手机号码
	/**
	 * 邮政编码
	 * @var string
	 */
	public $mPostalCode;//邮政编码
}
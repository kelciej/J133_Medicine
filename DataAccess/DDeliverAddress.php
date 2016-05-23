<?php

/**
 * Created by PhpStorm.
 * User: johns
 * Date: 2016/5/22
 * Time: 9:24
 */

/**
 * Class DDeliveryAddress
 * @Entity
 */
class DDeliveryAddress
{
	/**
	 * 收货地址编号
	 * @var int
	 * @Id
	 * @GeneratedValue
	 * @Column(type="integer")
	 */
	public $mId;//收货地址编号

	/**
	 * 消费者编号
	 * @var integer
	 * @ManyToOne(targetEntity="DCustomerAccess")
	 * @JoinColumn(name="DCustomer_Id",referencedColumnName="mId")
	 */
	public $mCustomerId;//消费者编号
	/**
	 * 收货人姓名
	 * @var string
	 * @Column(length=20)
	 */
	public $mName;//收货人姓名
	/**
	 * 所在地区（省、市、区）
	 * @var string
	 * @Column(length=60)
	 */
	public $mDistrict;//所在地区（省、市、区）
	/**
	 * 详细地址
	 * @var string
	 * @Column(length=60)
	 */
	public $mDetailAddress;//详细地址
	/**
	 * 手机号码
	 * @var string
	 * @Column(length=20)
	 */
	public $mMobileNumber;//手机号码
	/**
	 * 邮政编码
	 * @var string
	 */
	public $mPostalCode;//邮政编码
}
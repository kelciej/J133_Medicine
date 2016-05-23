<?php

/**
 * Created by PhpStorm.
 * User: johns
 * Date: 2016/5/22
 * Time: 9:02
 */

/**
 * Class Order
 * @Entity
 */
class DOrder
{
	/**
	 * 订单编号
	 * @var int
	 * @Id
	 * @GeneratedValue
	 * @Column(type="integer")
	 */
	public $mId;           		//订单编号
	/**
	 * 订单日期
	 * @var string yyyy-mm-dd kk:MM:ss
	 * @Column(type="datetime")
	 */
	public $mDate;         		//订单日期
	/**
	 * 金额（单位为分）
	 * @var int
	 * @Column(type="integer")
	 */
	public $mTotalFee;     		//金额（单位为分）
	/**
	 * 订单状态
	 * @var string "Submitted"|"Payed"|"StoreConfirmed"|"CustomerConfirmed"
	 * @Column(length=30)
	 */
	public $mStatus;       		//订单状态
	/**
	 * 收货人姓名
	 * @var string
	 * @Column(length=30)
	 */
	public $mName;         		//收货人姓名
	/**
	 * 所在地区（省、市、区）
	 * @var string
	 * @Column(length=60)
	 */
	public $mDistrict;     		//所在地区（省、市、区）
	/**
	 * 详细地址
	 * @var string
	 * @Column(length=60)
	 */
	public $mDetailAddress;		//详细地址
	/**
	 * 手机号码
	 * @var string
	 * @Column(length=20)
	 */
	public $mMobileNumber; 		//手机号码
	/**
	 * 电子邮箱
	 * @var string
	 * @Column(length=60,nullable=true)
	 */
	public $mEmail;        		//电子邮箱
	/**
	 * 邮政编码
	 * @var string
	 * @Column(length=14)
	 */
	public $mPostalCode;   		//邮政编码

	/**
	 * 运单号
	 * @var string
	 * @Column(length=60,nullable=true)
	 */
	public $mDeliveryId;			//运单号
}
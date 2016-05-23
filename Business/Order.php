<?php
/**
 * Created by PhpStorm.
 * User: johns
 * Date: 2016/5/8
 * Time: 21:47
 */

class Order
{
	/**
	 * 订单编号
	 * @var int
	 */
	public $mId;           		//订单编号
	/**
	 * 订单日期
	 * @var string yyyy-mm-dd kk:MM:ss
	 */
	public $mDate;         		//订单日期
	/**
	 * 订单商品
	 * @var array an array of ListItem
	 */
	public $mItems;		//订单商品
	/**
	 * 金额（单位为分）
	 * @var int
	 */
	public $mTotalFee;     		//金额（单位为分）
	/**
	 * 订单状态
	 * @var string "Submitted"|"Payed"|"StoreConfirmed"|"CustomerConfirmed"
	 */
	public $mStatus;       		//订单状态
	/**
	 * 收货人姓名
	 * @var string
	 */
	public $mName;         		//收货人姓名
	/**
	 * 所在地区（省、市、区）
	 * @var string
	 */
	public $mDistrict;     		//所在地区（省、市、区）
	/**
	 * 详细地址
	 * @var string
	 */
	public $mDetailAddress;		//详细地址
	/**
	 * 手机号码
	 * @var string
	 */
	public $mMobileNumber; 		//手机号码
	/**
	 * 电子邮箱
	 * @var string
	 */
	public $mEmail;        		//电子邮箱
	/**
	 * 邮政编码
	 * @var string
	 */
	public $mPostalCode;   		//邮政编码

	/**
	 * 运单号
	 * @var string
	 */
	public $mDeliveryId;			//运单号
}

class ListItem
{
	/**
	 * 条目编号
	 * @var int
	 */
	public $mId;    				//条目编号
	/**
	 * 商品
	 * @var DrugItem
	 */
	public $mItem;              	//商品
	/**
	 * 商品价格（单位为分）
	 * @var int
	 */
	public $mPrice;             	//商品价格（单位为分）
	/**
	 * 商品数量
	 * @var int
	 */
	public $mCount;              	//商品数量
}

class BriefOrderInfo
{
	/**
	 * 订单编号
	 * @var int
	 */
	public $mId;           		//订单编号
	/**
	 * 订单日期
	 * @var string yyyy-mm-dd kk:MM:ss
	 */
	public $mDate;         		//订单日期
	/**
	 * 订单商品
	 * @var array an array of BriefListItem
	 */
	public $mBriefItems;		//订单商品
	/**
	 * 金额（单位为分）
	 * @var int
	 */
	public $mTotalFee;     		//金额（单位为分）
	/**
	 * 订单状态
	 * @var string "Submitted"|"Payed"|"StoreConfirmed"|"CustomerConfirmed"
	 */
	public $mStatus;       		//订单状态
	/**
	 * 收货人姓名
	 * @var string
	 */
	public $mName;         		//收货人姓名
	/**
	 * 所在地区（省、市、区）
	 * @var string
	 */
	public $mDistrict;     		//所在地区（省、市、区）
	/**
	 * 详细地址
	 * @var string
	 */
	public $mDetailAddress;		//详细地址
	/**
	 * 手机号码
	 * @var string
	 */
	public $mMobileNumber; 		//手机号码
	/**
	 * 电子邮箱
	 * @var string
	 */
	public $mEmail;        		//电子邮箱
	/**
	 * 邮政编码
	 * @var string
	 */
	public $mPostalCode;   		//邮政编码
	/**
	 * 商家编号，分拆订单后由系统提供
	 * @var int
	 */
	public $mStoreId;				//商家编号
}

class BriefListItem
{
	/**
	 * 条目编号
	 * @var int
	 */
	public $mId;    				//条目编号
	/**
	 * 商品
	 * @var int
	 */
	public $mItemId;             	//商品

	/**
	 * 商品名
	 * @var string
	 */
	public $mItemName;			//商品名
	/**
	 * 商品图URL
	 * @var string
	 */
	public $mItemURL;				//商品图URL
	/**
	 * 商品价格（单位为分）,下单时的价格，从ListItem本身获得
	 * @var int
	 */
	public $mPrice;             	//商品价格（单位为分）
	/**
	 * 商品数量
	 * @var int
	 */
	public $mCount;              	//商品数量
	/**
	 * 商家编号，分拆订单后由系统提供
	 * @var int
	 */
	public $mStoreId;				//商家编号
}

class OrderFactory
{
	/**
	 * @return Order
	 */
	public function getInstance()
	{
		return new Order();
	}
	
	public function getSampleInstance()
	{
		$order=new Order();
		
	}
}
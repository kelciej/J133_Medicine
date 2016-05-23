<?php
/**
 * Store info
 * @author johns
 *
 */
class Store
{
	/**
	 * 商家编号
	 * @var int
	 */
	public $mId                   ;//商家编号
	/**
	 * 商家名称
	 * @var string
	 */
	public $mName                 ;//商家名称
	/**
	 * 真实姓名
	 * @var string
	 */
	public $mRealName             ;//真实姓名
	/**
	 * 邮箱
	 * @var string
	 */
	public $mEmail                ;//邮箱
	/**
	 * 手机
	 * @var string
	 */
	public $mMobileNumber         ;//手机
	/**
	 * 所在地区（省、市、区）
	 * @var string
	 */
	public $mDistrict             ;//所在地区（省、市、区）
	/**
	 * 详细地址
	 * @var string
	 */
	public $mDetailAddress        ;//详细地址
}

/**
 * Store info factory
 * @author johns
 *
 */
class StoreFactory
{
	/**
	 * get an instance of Store info
	 * @return Store an instance of Store
	 */
	public function getInstance()
	{
		return new Store();
	}
}
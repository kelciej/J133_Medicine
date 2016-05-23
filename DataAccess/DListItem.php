<?php

/**
 * Created by PhpStorm.
 * User: johns
 * Date: 2016/5/22
 * Time: 9:09
 */

/**
 * Class DListItem
 * @Entity
 */
class DListItem
{
	/**
	 * 条目编号
	 * @var int
	 * @Id
	 * @GeneratedValue
	 * @Column(type="integer")
	 */
	public $mId;    				//条目编号
	/**
	 * 商品Id
	 * @var int
	 * @ManyToOne(targetEntity="DItem")
	 * @JoinColumn(name="DItem_id",referencedColumnName="mId")
	 */
	public $mItemId;              	//商品Id
	/**
	 * 订单Id
	 * @var int
	 * @ManyToOne(targetEntity="DOrder")
	 * @JoinColumn(name="DOrder_id",referencedColumnName="mId")
	 */
	public $mOrderId;					//订单Id
	/**
	 * 商品价格（单位为分）
	 * @var int
	 * @Column(type="integer")
	 */
	public $mPrice;             	//商品价格（单位为分）
	/**
	 * 商品数量
	 * @var int
	 * Column(type="integer")
	 */
	public $mCount;              	//商品数量
}
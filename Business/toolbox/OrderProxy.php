<?php
/**
 * Created by PhpStorm.
 * User: johns
 * Date: 2016/5/11
 * Time: 18:47
 */

require_once '../Order.php';
require_once '../Item.php';

interface ICustomerOrderProxy
{
	/**
	 * @param $id int order's id
	 * @return Order
	 */
	function loadOrder($id);

	/**
	 * @param $id int customer's id
	 * @return BriefOrderInfo
	 */
	function getNumOfOrderByCustomerId($id);

	/**
	 * @param $id int customer's id
	 * @param $pageNo int page number
	 * @param $pageSize int page size
	 * @return BriefOrderInfo
	 */
	function getOrdersByCustomerId($id,$pageNo,$pageSize);

	/**
	 * submit an order to system, NOTICE this order object will be useless if success
	 * BECAUSE the order will be separated if necessary
	 * @param Order $order
	 * @return bool true if success, false otherwise
	 */
	function submitOrder(Order $order);

	/**
	 * cancel an order identified by $id
	 * @param $id int order's id
	 * @return bool true if success, false otherwise.
	 */
	function cancelOrder($id);

	/**
	 * @param $id int order's id
	 * @return bool true if success, false otherwise
	 */
	function customerConfirm($id);
}

interface IStoreOrderProxy
{
	/**
	 * @param $id int store's id
	 * @return BriefOrderInfo
	 */
	function getOrderByStoreId($id);

	/**
	 * confirm an order by filling the delivery id.
	 * @param $id int order's id
	 * @param $DeliveryId string delivery id
	 * @return mixed
	 */
	function storeConfirm($id,$DeliveryId);
}

interface IManagerOrderProxy
{

}

interface ISystemOrderProxy
{
	/**
	 * @param $id int order'id
	 * @return bool true if success, false otherwise
	 */
	function pay($id);
}

interface IOrderProxy extends ICustomerOrderProxy,IStoreOrderProxy,IManagerOrderProxy,ISystemOrderProxy
{
	
}

class SOrderProxy implements  IOrderProxy
{
	/**
	 * @param $id int order's id
	 * @return Order
	 */
	function loadOrder($id)
	{
		$order=new Order();
		$order->mId=rand(1000,10000);
		$order->mDate=(new DateTime())->format('yyyy-mm-dd kk:MM:ss');
		$listItem=new ListItem();
		$listItem->mIdrand(1000,10000);
		$listItem->mCount=1;
		$listItem->mPrice=990;
		$listItem->mItem=new DrugItem();
	}

	/**
	 * @param $id int customer's id
	 * @return BriefOrderInfo
	 */
	function getNumOfOrderByCustomerId($id)
	{
		// TODO: Implement getNumOfOrderByCustomerId() method.
	}

	/**
	 * @param $id int customer's id
	 * @param $pageNo int page number
	 * @param $pageSize int page size
	 * @return BriefOrderInfo
	 */
	function getOrdersByCustomerId($id, $pageNo, $pageSize)
	{
		// TODO: Implement getOrdersByCustomerId() method.
	}

	/**
	 * submit an order to system, NOTICE this order object will be useless if success
	 * BECAUSE the order will be separated if necessary
	 * @param Order $order
	 * @return bool true if success, false otherwise
	 */
	function submitOrder(Order $order)
	{
		// TODO: Implement submitOrder() method.
	}

	/**
	 * cancel an order identified by $id
	 * @param $id int order's id
	 * @return bool true if success, false otherwise.
	 */
	function cancelOrder($id)
	{
		// TODO: Implement cancelOrder() method.
	}

	/**
	 * @param $id int order's id
	 * @return bool true if success, false otherwise
	 */
	function customerConfirm($id)
	{
		// TODO: Implement customerConfirm() method.
	}

	/**
	 * @param $id int store's id
	 * @return BriefOrderInfo
	 */
	function getOrderByStoreId($id)
	{
		// TODO: Implement getOrderByStoreId() method.
	}

	/**
	 * confirm an order by filling the delivery id.
	 * @param $id int order's id
	 * @param $DeliveryId string delivery id
	 * @return mixed
	 */
	function storeConfirm($id, $DeliveryId)
	{
		// TODO: Implement storeConfirm() method.
	}

	/**
	 * @param $id int order'id
	 * @return bool true if success, false otherwise
	 */
	function pay($id)
	{
		// TODO: Implement pay() method.
	}
}
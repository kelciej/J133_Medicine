<?php
/**
 * Created by PhpStorm.
 * User: johns
 * Date: 2016/5/8
 * Time: 21:44
 */

interface IStoreDataHelper
{
	/**
	 * @param $id store's id
	 * @return DStore
	 */
	function  getStore($id);

	/**
	 * @param DStore $store
	 * @return bool true if success, false if failed.
	 */
	function  putStore(DStore $store);

	/**
	 * @param $id
	 * @return bool true if success, false otherwise
	 */
	function  deleteStore($id);
}


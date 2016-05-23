<?php
/**
 * Created by PhpStorm.
 * User: johns
 * Date: 2016/5/8
 * Time: 21:48
 */

interface IAuthDataHelper
{
	/**
	 * @param $name string user's name
	 * @param $pass string password
	 * @return int id if success, -1 otherwise
	 */
	function login($name,$pass);

	/**
	 * @param $id int user's id
	 * @param $token string access token
	 * @return bool true if success, false otherwise
	 */
	function checkAccess($id,$token);

	/**
	 * @param $name string user's name
	 * @param $pass string password
	 * @return int id if success, -1 otherwise
	 */
	function register($name,$pass);
}

class SCustomerAuthHelper implements IAuthDataHelper
{

	/**
	 * @param $name string user's name
	 * @param $pass string password
	 * @return int id if success, -1 otherwise
	 */
	function login($name, $pass)
	{
		return 1242342322;
	}

	/**
	 * @param $id int user's id
	 * @param $token string access token
	 * @return bool true if success, false otherwise
	 */
	function checkAccess($id, $token)
	{
		return true;
	}

	/**
	 * @param $name string user's name
	 * @param $pass string password
	 * @return int id if success, -1 otherwise
	 */
	function register($name, $pass)
	{
		return 2132422342;
	}
}

class SStoreAuthHelper implements IAuthDataHelper
{
	/**
	 * @param $name string user's name
	 * @param $pass string password
	 * @return int id if success, -1 otherwise
	 */
	function login($name, $pass)
	{
		return 1242342322;
	}

	/**
	 * @param $id int user's id
	 * @param $token string access token
	 * @return bool true if success, false otherwise
	 */
	function checkAccess($id, $token)
	{
		return true;
	}

	/**
	 * @param $name string user's name
	 * @param $pass string password
	 * @return int id if success, -1 otherwise
	 */
	function register($name, $pass)
	{
		return 2132422342;
	}
}

class SManagerAuthHelper implements IAuthDataHelper
{
	/**
	 * @param $name string user's name
	 * @param $pass string password
	 * @return int id if success, -1 otherwise
	 */
	function login($name, $pass)
	{
		return 1242342322;
	}

	/**
	 * @param $id int user's id
	 * @param $token string access token
	 * @return bool true if success, false otherwise
	 */
	function checkAccess($id, $token)
	{
		return true;
	}

	/**
	 * @param $name string user's name
	 * @param $pass string password
	 * @return int id if success, -1 otherwise
	 */
	function register($name, $pass)
	{
		return 2132422342;
	}
}
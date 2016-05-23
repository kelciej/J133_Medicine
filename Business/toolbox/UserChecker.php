<?php

require_once dirname(__FILE__).'/'."../../bootstrap.php";
require_once dirname(__FILE__).'/'."../../DataAccess/DCustomerAccess.php";
require_once dirname(__FILE__).'/'."../../DataAccess/DStoreAccess.php";
require_once dirname(__FILE__).'/'."../../DataAccess/DManagerAccess.php";

interface IUserChecker
{
	/**
	 * login
	 * @param string $name user's login name
	 * @param string $pass password
	 * @return array|NULL array['id']:id  array['token'] access token; return null if failed
	 */
	function login($name,$pass);
	/**
	 * register a user
	 * @param string $name register name
	 * @param string $pass password
	 * @return integer uid if success, -1 otherwise.
	 */
	function register($name,$pass);
	/**
	 * check access using token string
	 * @param string $uid user's id
	 * @param string $token the token string
	 * @return string "success" if success,"timeout" if exceed time limit,"fail" if failed.
	 */
	function checkAccess($uid,$token);
}


/**
 * sample CustomerChecker
 * @author johns
 *
 */
class SCunstomerChecker implements IUserChecker
{
	public function login($name,$pass)
	{
		echo "sample customerChecker.login invoked\n";
		return md5($name.$pass);
	}
	public function register($name,$pass)
	{
		echo "sample customerChecker.register invoked\n";
	}
	public function checkAccess($uid,$token)
	{
		echo "sample customerChecker.chekcAccess invoked\n";
	}
}

/**
 * sample StoreChecker
 * @author johns
 *
 */
class SStoreChecker implements IUserChecker
{
	public function login($uid,$pass)
	{
		echo "sample vendorChecker.login invoked\n";
		return md5($uid.$pass);
	}
	public function register($name,$pass)
	{
		echo "sample vendorChecker.register invoked\n";
	}
	public function checkAccess($uid,$token)
	{
		echo "sample vendorChecker.chekcAccess invoked\n";
	}
}

/**
 * sample ManagerChecker
 * @author johns
 *
 */
class SManagerChecker implements IUserChecker
{
	public function login($uid,$pass)
	{
		echo "sample managerChecker.login invoked\n";
		return md5($uid.$pass);
	}
	public function register($name,$pass)
	{
		echo "sample managerChecker.register invoked\n";
	}
	public function checkAccess($uid,$token)
	{
		echo "sample managerChecker.chekcAccess invoked\n";
	}
}

/**
 * UserChecker's Factory
 * @author johns
 *
 */
class UserCheckerFactory
{
	/**
	 * get a UserChecker of $type
	 * @param string $type : one of "CUSTOMER","STORE","MANAGER"
	 * @return instance of IUserChecker
	 */
	public function getInstanceOfType($type)
	{
		switch($type)
		{
			case "CUSTOMER":
				echo "customer userchecker\n";
				return new SCunstomerChecker();
				break;
			case "Store":
				echo "vendor userchecker\n";
				return new SStoreChecker();
				break;
			case "MANAGER":
				echo "manager userchecker\n";
				return new SManagerChecker();
				break;
			default:
				return new CustomerChecker();
				break;
		}
	}
}


class CustomerChecker implements IUserChecker
{
	/**
	 * login
	 * @param string $name user's login name
	 * @param string $pass password
	 * @return array|NULL array['id']:id  array['token'] access token; return null if failed
	 */
	function login($name, $pass)
	{
		$em=getEM();
		$accessItem=$em->getRepository("DCustomerAccess")->findOneBy(array('mName'=>$name,'mPassword'=>$pass));
		if(is_null($accessItem)) return null;
		$token=md5(time().$accessItem->mId."kkm");
		$accessItem->mToken=$token;
		$em->persist($accessItem);
		$em->flush();
		$arr=array('id'=>$accessItem->mId,'token'=>$token);
		return $arr;
	}

	/**
	 * register a user
	 * @param string $name register name
	 * @param string $pass password
	 * @return integer uid if success, -1 otherwise.
	 */
	function register($name, $pass)
	{
		$em=getEM();
		$accessItem=$em->getRepository("DCustomerAccess")->findOneBy(array('mName'=>$name));
		if(!is_null($accessItem)) return -1;

		$dAC=new DCustomerAccess();
		$dAC->mName=$name;
		$dAC->mPassword=$pass;
		$dAC->mToken=md5(time());
		$em->persist($dAC);
		$em->flush();
		return $dAC->mId;
	}

	/**
	 * check access using token string
	 * @param string $uid user's id
	 * @param string $token the token string
	 * @return string "success" if success,"timeout" if exceed time limit,"fail" if failed.
	 */
	function checkAccess($uid, $token)
	{
		$em=getEM();
		$accessItem=$em->getRepository("DCustomerAccess")->findOneBy(array('mId'=>$uid,'mToken'=>$token));
		if(is_null($accessItem)) return "fail";
		return "success";
	}
}

class StoreChecker implements IUserChecker
{
	/**
	 * login
	 * @param string $name user's login name
	 * @param string $pass password
	 * @return array|NULL array['id']:id  array['token'] access token; return null if failed
	 */
	function login($name, $pass)
	{
		$em=getEM();
		$accessItem=$em->getRepository("DStoreAccess")->findOneBy(array('mName'=>$name,'mPassword'=>$pass));
		if(is_null($accessItem)) return null;
		$token=md5(time().$accessItem->mId."kkm");
		$accessItem->mToken=$token;
		$em->persist($accessItem);
		$em->flush();
		$arr=array('id'=>$accessItem->mId,'token'=>$token);
		return $arr;
	}

	/**
	 * register a user
	 * @param string $name register name
	 * @param string $pass password
	 * @return integer uid if success, -1 otherwise.
	 */
	function register($name, $pass)
	{
		$em=getEM();
		$accessItem=$em->getRepository("DStoreAccess")->findOneBy(array('mName'=>$name));
		if(!is_null($accessItem)) return -1;

		$dAC=new DStoreAccess();
		$dAC->mName=$name;
		$dAC->mPassword=$pass;
		$dAC->mToken=md5(time());
		$em->persist($dAC);
		$em->flush();
		return $dAC->mId;
	}

	/**
	 * check access using token string
	 * @param string $uid user's id
	 * @param string $token the token string
	 * @return string "success" if success,"timeout" if exceed time limit,"fail" if failed.
	 */
	function checkAccess($uid, $token)
	{
		$em=getEM();
		$accessItem=$em->getRepository("DStoreAccess")->findOneBy(array('mId'=>$uid,'mToken'=>$token));
		if(is_null($accessItem)) return "fail";
		return "success";
	}
}

class ManagerChecker implements IUserChecker
{
	/**
	 * login
	 * @param string $name user's login name
	 * @param string $pass password
	 * @return array|NULL array['id']:id  array['token'] access token; return null if failed
	 */
	function login($name, $pass)
	{
		$em=getEM();
		$accessItem=$em->getRepository("DManagerAccess")->findOneBy(array('mName'=>$name,'mPassword'=>$pass));
		if(is_null($accessItem)) return null;
		$token=md5(time().$accessItem->mId."kkm");
		$accessItem->mToken=$token;
		$em->persist($accessItem);
		$em->flush();
		$arr=array('id'=>$accessItem->mId,'token'=>$token);
		return $arr;
	}

	/**
	 * register a user
	 * @param string $name register name
	 * @param string $pass password
	 * @return integer uid if success, -1 otherwise.
	 */
	function register($name, $pass)
	{
		$em=getEM();
		$accessItem=$em->getRepository("DManagerAccess")->findOneBy(array('mName'=>$name));
		if(!is_null($accessItem)) return -1;

		$dAC=new DManagerAccess();
		$dAC->mName=$name;
		$dAC->mPassword=$pass;
		$dAC->mToken=md5(time());
		$em->persist($dAC);
		$em->flush();
		return $dAC->mId;
	}

	/**
	 * check access using token string
	 * @param string $uid user's id
	 * @param string $token the token string
	 * @return string "success" if success,"timeout" if exceed time limit,"fail" if failed.
	 */
	function checkAccess($uid, $token)
	{
		$em=getEM();
		$accessItem=$em->getRepository("DManagerAccess")->findOneBy(array('mId'=>$uid,'mToken'=>$token));
		if(is_null($accessItem)) return "fail";
		return "success";
	}
}
<?php
/**
 * Manager info
 * @author johns
 *
 */
class Manager
{
	/**
	 * 管理员编号
	 * @var int
	 */
	public $mId     ;//管理员编号
	/**
	 * 管理员姓名
	 * @var string
	 */
	public $mName   ;//管理员姓名	
}

/**
 * Manager info factory
 * @author johns
 *
 */
class ManagerFactory
{
	/**
	 * get an instance of Manager info
	 * @return Manager an instance of Manager
	 */
	public function getInstance()
	{
		return new Manager();
	}
}
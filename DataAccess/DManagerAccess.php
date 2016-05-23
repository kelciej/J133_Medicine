<?php

/**
 * Created by PhpStorm.
 * User: johns
 * Date: 2016/5/22
 * Time: 8:36
 */

/**
 * Class DManagerAccess
 * @Entity
 */
class DManagerAccess
{
	/**
	 * @var int
	 * @Id
	 * @Column(type="integer")
	 * @GeneratedValue
	 */
	public $mId;
	/**
	 * 登录名
	 * @var string
	 * @Column(length=60,unique=true)
	 */
	public $mName;
	/**
	 * 密码
	 * @var string
	 * @Column(length=30)
	 */
	public $mPassword;
	/**
	 * access token
	 * @var string
	 * @Column(length=140)
	 */
	public $mToken;
}
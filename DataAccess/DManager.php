<?php

/**
 * Created by PhpStorm.
 * User: johns
 * Date: 2016/5/22
 * Time: 8:36
 */

/**
 * Class DManager
 * @Entity
 */
class DManager
{
	/**
	 * 管理员编号
	 * @var int
	 * @Id
	 * @OneToOne(targetEntity="DManagerAccess")
	 * @JoinColumn(name="DManagerAccess_Id",referencedColumnName="mId")
	 */
	public $mId                   ;//管理员编号
	/**
	 * 商家名称
	 * @var string
	 * @Column(length=40)
	 */
	public $mName                 ;//管理员名称
	/**
	 * 真实姓名
	 * @var string
	 * @Column(length=40)
	 */
	public $mRealName             ;//真实姓名
	/**
	 * 邮箱
	 * @var string
	 * @Column(length=60)
	 */
	public $mEmail                ;//邮箱
	/**
	 * 手机
	 * @var string
	 * @Column(length=20)
	 */
	public $mMobileNumber         ;//手机
}
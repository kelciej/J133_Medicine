<?php

/**
 * Created by PhpStorm.
 * User: johns
 * Date: 2016/5/22
 * Time: 12:27
 */

/**
 * Class DCategory
 * @Entity
 */
class DCategory
{
	/**
	 * 类型id
	 * @var int
	 * @Id
	 * @GeneratedValue
	 * @Column(type="integer")
	 */
	public $mId;
	/**
	 * 类型名
	 * @var string
	 * @Column(length=30)
	 */
	public $mName;
}
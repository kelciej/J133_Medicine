<?php

/**
 * Created by PhpStorm.
 * User: johns
 * Date: 2016/5/21
 * Time: 14:19
 */

/** @Entity */
class Product
{
	/**
	 * @Id
	 * @Column(type="integer")
	 * @GeneratedValue
	 * */
	protected $id;
	/** @Column(length=140) */
	protected $name;

	public function getId()
	{
		return $this->id;
	}

	public function getName()
	{
		return $this->name;
	}

	public function setName($name)
	{
		$this->name=$name;
	}

}
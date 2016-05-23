<?php

/**
 * Created by PhpStorm.
 * User: johns
 * Date: 2016/5/22
 * Time: 8:53
 */

/**
 * Class DImgURL
 * @Entity
 */
class DImgURL
{
	/**
	 * @var int
	 * @Id
	 * @ManyToOne(targetEntity="DItem")
	 * @JoinColumn(name="DItem_id",referencedColumnName="mId")
	 */
	public $mItemId;
	/**
	 * @var string
	 * @Id
	 * @Column(length=160)
	 */
	public $mURL;
}
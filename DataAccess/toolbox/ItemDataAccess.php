<?php
/**
 * Created by PhpStorm.
 * User: johns
 * Date: 2016/5/8
 * Time: 16:07
 */

interface IItemDataHelper
{
    /**
     * @param DItem $item
     * @return DItem DItem that just inserted or NULL if failed.
     */
    function putItem(DItem $item);

    /**
     * @param $id int item's id
     * @return DItem DItem that was found or NULL if not exists
     */
    function getItem($id);

    /**
     * @param $name string name
     * @return array an array of DItem
     */
    function searchItemByName($name);
}

class SItemDataHelper implements IItemDataHelper
{

    /**
     * @param DItem $item
     * @return DItem DItem that just inserted or NULL if failed.
     */
    function putItem(DItem $item)
    {
        // TODO: Implement putItem() method.
    }

    /**
     * @param $id int item's id
     * @return DItem DItem that was found or NULL if not exists
     */
    function getItem($id)
    {
        // TODO: Implement getItem() method.
    }

    /**
     * @param $name string name
     * @return array an array of DItem
     */
    function searchItemByName($name)
    {
        // TODO: Implement searchItemByName() method.
    }
}

class ItemDataHelperFactory
{
    /**
     * @return IItemDataHelper
     */
    public function getInstance()
    {
        return   new SItemDataHelper();
    }
}
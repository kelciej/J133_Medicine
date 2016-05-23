<?php
/**
 * Created by PhpStorm.
 * User: johns
 * Date: 2016/5/8
 * Time: 18:29
 */

interface ICustomerDataHelper
{
    /**
     * @param $id customer's id
     * @return DCustomer
     */
    function getCustomer($id);

    /**
     * @param DCustomer $customer
     * @return bool true if success, false otherwise
     */
    function putCustomer(DCustomer $customer);

    /**
     * @param $id customer's id
     * @return bool true if success, false otherwise
     */
    function deleteCustomer($id);
}

class SCustomerDataHelper implements ICustomerDataHelper
{

    /**
     * @param $id customer's id
     * @return DCustomer
     */
    function getCustomer($id)
    {
        // TODO: Implement getCustomer() method.
    }

    /**
     * @param DCustomer $customer
     * @return bool true if success, false otherwise
     */
    function putCustomer(DCustomer $customer)
    {
        // TODO: Implement putCustomer() method.
    }

    /**
     * @param $id customer's id
     * @return bool true if success, false otherwise
     */
    function deleteCustomer($id)
    {
        // TODO: Implement deleteCustomer() method.
    }
}

class CustomerDataHelperFactory
{
    /**
     * get an instance of ICustomerDataHelper
     * @return ICustomerDataHelper
     */
    public function getInstance()
    {
        return new SCustomerDataHelper();
    }
}
<?php
/**
 * Created by PhpStorm.
 * User: johns
 * Date: 2016/5/8
 * Time: 20:40
 */

interface IManagerUserProxy
{
    /**
     * @param $name customer's name
     * @return array an array of BriefCustomerInfo
     */
    public function searchCustomerByName($name);

    /**
     * @param $id customer's id
     * @return BriefCustomerInfo
     */
    public function getBriefCustomerInfoById($id);

    /**
     * @param Customer $customer
     * @return bool true if success and false otherwise.
     */
    public function deleteCustomer(Customer $customer);
    public function searchStoreByName($name);
    public function getStoreById($id);
    public function deleteStore(Store $store);
}

interface IStoreUserProxy
{
    public function getStoreById($name);
    public function updateStore(Store $store);
}

interface ICustomerUserProxy
{
    public function searchCustomerByName($name);
    public function getCustomerById($id);
    public function getBriefCustomerInfoById($id);
    public function updateCustomer(Customer $customer);
}

interface IUserProxy extends IManagerUserProxy,IStoreUserProxy,ICustomerUserProxy
{

}

class SUserProxy implements IUserProxy
{

    public function searchCustomerByName($name)
    {
        // TODO: Implement searchCustomerByName() method.
    }

    public function getCustomerById($id)
    {
        // TODO: Implement getCustomerById() method.
    }

    public function deleteCustomer(Customer $customer)
    {
        // TODO: Implement deleteCustomer() method.
    }

    public function searchStoreByName($name)
    {
        // TODO: Implement searchStoreByName() method.
    }

    public function getStoreById($id)
    {
        // TODO: Implement getStoreById() method.
    }

    public function deleteStore(Store $store)
    {
        // TODO: Implement deleteStore() method.
    }

    public function updateStore(Store $store)
    {
        // TODO: Implement updateStore() method.
    }

    public function updateCustomer(Customer $customer)
    {
        // TODO: Implement updateCustomer() method.
    }

    public function getBriefCustomerInfoById($id)
    {
        // TODO: Implement getBriefCustomerInfoById() method.
    }
}

class UserProxyFactory
{
    /**
     * @return IManagerUserProxy
     */
    public function getManagerUserProxy()
    {
        return new SUserProxy();
    }

    /**
     * @return  IStoreUserProxy
     */
    public function getStoreUserProxy()
    {
        return new SUserProxy();
    }

    /**
     * @return ICustomerUserProxy
     */
    public function getCustomerUserProxy()
    {
        return new SUserProxy();
    }
}
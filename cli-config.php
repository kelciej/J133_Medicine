<?php
/**
 * Created by PhpStorm.
 * User: johns
 * Date: 2016/5/21
 * Time: 14:13
 */

require_once "bootstrap.php";

return \Doctrine\ORM\Tools\Console\ConsoleRunner::createHelperSet($entityManager);
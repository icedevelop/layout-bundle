<?php
/**
 * Created by PhpStorm.
 * User: bruno
 * Date: 7/26/17
 * Time: 5:07 PM
 */

namespace retItalia\LayoutBundle\Entity;

/**
 * Class CachedObject
 * @package ExternalBundle\Entity
 */
class CachedObject
{

    /**
     * @var
     */
    private $cached;

    /**
     * @var
     */
    private $valore;

    /**
     * @return mixed
     */
    public function getCached()
    {
        return $this->cached;
    }

    /**
     * @param mixed $cached
     */
    public function setCached($cached)
    {
        $this->cached = $cached;
    }

    /**
     * @return mixed
     */
    public function getValore()
    {
        return $this->valore;
    }

    /**
     * @param mixed $valore
     */
    public function setValore($valore)
    {
        $this->valore = $valore;
    }


}
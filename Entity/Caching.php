<?php
/**
 * Created by PhpStorm.
 * User: bruno
 * Date: 7/26/17
 * Time: 4:32 PM
 */

namespace retItalia\LayoutBundle\Entity;

class Caching
{

    private $memcachedClient;

    /**
     * Caching constructor.
     */
    public function __construct()
    {
        // pass a single DSN string to register a single server with the client
        //$this->memcachedClient = MemcachedAdapter::createConnection(
        //    'memcached://127.0.0.1'
        //);
        $this->memcachedClient = new \Memcached();
        $this->memcachedClient->addServer("localhost", 11211);
    }

    /**
     * @param $nome
     * @param $valore
     * @param int $tempo
     */
    public function effettuaCache($nome,$valore, $tempo=86400) {

        //Cacho
        $cachedObject=new CachedObject();
        $cachedObject->setCached(true);
        if (empty($valore))
            $cachedObject->setValore("");
        else
            $cachedObject->setValore($valore);
        $this->memcachedClient->set($nome, $cachedObject,86400);
    }

    /**
     * @param $nome
     * @return mixed
     */
    public function estraiCache($nome) {

        //inizalizzo l'oggetto
        $cachedObject=new CachedObject();

        //Estraggo
        $valore=$this->memcachedClient->get($nome);

        //Mi testo se c'è qualcosa cachato o no
        if (empty($valore)) {
            $cachedObject->setCached(false);
        } else {
            $cachedObject->setCached(true);
            $cachedObject->setValore($valore->getValore());
        }

        return $cachedObject;

    }

    /**
     * @param $nome
     */
    public function svuotaCache($nome) {

        //Cacho
        //$cachedObject=new CachedObject();
        $this->memcachedClient->delete($nome);
    }

    /**
     *
     */
    public function svuotamentoTotale() {

        //Cacho
        $this->memcachedClient->flush();
    }
}
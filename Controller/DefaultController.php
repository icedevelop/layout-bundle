<?php

namespace retItalia\LayoutBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class DefaultController extends Controller
{

    private $memcachedClient;
    private $header;
    private $head;
    private $end;

    public function EstraiAssetsHeadAction()
    {
        return $this->render('retItaliaLayoutBundle:Default:AssetsHead.html.twig');
    }

    public function EstraiAssetsEndAction()
    {
        return $this->render('retItaliaLayoutBundle:Default:AssetsEnd.html.twig');
    }

    /**
     * @Route("/portale/sezioni/head")
     */
    public function EstraiHeadPortaleAction()
    {

        try {

            //Gestisco la cache
            $caching=$this->get('servizio.caching');
            $this->memcachedClient=$caching;

            //Estraggo dalla cache
            $cachedObject=$this->memcachedClient->estraiCache("headIntranetBase");

            //Controllo se è cachato
            //if ($cachedObject->getCached()) {

            //Li ho cachati, li estraggo dalla cache
            //  $this->head=$cachedObject->getValore();

            //} else {

            //Non li ho cachati, li estraggo e li cacho
            $this->EffettuaCache();

            //}

        }
        catch (\Exception $e) {

            //Non blocco l'esecuzione perchè male che va non esce l'header, ma il sito è funzionante. Questa modifica è stata effettuata a seguito dei numerosi blocchi di testsitoita
            $logger = $this->get('logger');
            $logger->error('Codice:500 Descrizione:'.$e->getMessage());
        }

        //restituisco il render
        return $this->render('@retItaliaLayout/Default/index.html.twig', array(
            'dati' => $this->head
        ));
    }

    /**
     * @Route("/portale/sezioni/header")
     */
    public function EstraiHeaderPortaleAction()
    {

        try {

            //Gestisco la cache
            $caching=$this->get('servizio.caching');
            $this->memcachedClient=$caching;

            ///Estraggo dalla cache
            $cachedObject=$this->memcachedClient->estraiCache("headerIntranetBase");

            //Controllo se è cachato
            // if ($cachedObject->getCached()) {

            //Li ho cachati, li estraggo dalla cache
            //    $this->header=$cachedObject->getValore();

            //} else {

            //Non li ho cachati, li estraggo e li cacho
            $this->EffettuaCache();

            //  }

        }
        catch (\Exception $e) {

            //Non blocco l'esecuzione perchè male che va non esce l'header, ma il sito è funzionante. Questa modifica è stata effettuata a seguito dei numerosi blocchi di testsitoita
            $logger = $this->get('logger');
            $logger->error('Codice:500 Descrizione:'.$e->getMessage());
        }

        return $this->render('@retItaliaLayout/Default/index.html.twig', array(
            'dati' => $this->header
        ));
    }

    /**
     * @Route("/portale/sezioni/end")
     */
    public function EstraiEndPortaleAction()
    {

        try {

            //Gestisco la cache
            $caching=$this->get('servizio.caching');
            $this->memcachedClient=$caching;

            ///Estraggo dalla cache
            $cachedObject=$this->memcachedClient->estraiCache("endIntranetBase");

            //Controllo se è cachato
            //  if ($cachedObject->getCached()) {

            //Li ho cachati, li estraggo dalla cache
            //     $this->end=$cachedObject->getValore();

            //} else {

            //Non li ho cachati, li estraggo e li cacho
            $this->EffettuaCache();

            //}

        }
        catch (\Exception $e) {

            //Non blocco l'esecuzione perchè male che va non esce l'header, ma il sito è funzionante. Questa modifica è stata effettuata a seguito dei numerosi blocchi di testsitoita
            $logger = $this->get('logger');
            $logger->error('Codice:500 Descrizione:'.$e->getMessage());

        }

        return $this->render('@retItaliaLayout/Default/index.html.twig', array(
            'dati' => $this->end
        ));
    }

    private function EffettuaCache() {

        //Estraggo l'url del servizio relativo alle sezioni del portale
        $servizioSezioniIntranet=$this->container->getParameter('ws_sezioni_intranet');

        $progettoIntranet=$this->container->getParameter('progetto_intranet');

        $client = new \GuzzleHttp\Client();
        $res = $client->request('GET', $servizioSezioniIntranet);

        //Estraggo le qualifiche
        $arraySezioni=json_decode($res->getBody());

        //Estraggo le sezioni
        $this->head=str_replace("{intranet-app}", $progettoIntranet, $arraySezioni->items->head);
        $this->header=str_replace("{intranet-app}", $progettoIntranet, $arraySezioni->items->header);
        $this->end=str_replace("{intranet-app}", $progettoIntranet, $arraySezioni->items->end);

        //Cacho
        $this->memcachedClient->effettuaCache("headIntranetBase",$this->head);
        $this->memcachedClient->effettuaCache("headerIntranetBase",$this->header);
        $this->memcachedClient->effettuaCache("endIntranetBase",$this->end);

    }

    /**
     * @Route("/portale/svuota-cache")
     */
    public function SvuotaCacheAction()
    {

        try {

            //Gestisco la cache
            $caching=$this->get('servizio.caching');
            $caching->svuotamentoTotale();

        }
        catch (\Exception $e) {

            //Non blocco l'esecuzione perchè male che va non esce l'header, ma il sito è funzionante. Questa modifica è stata effettuata a seguito dei numerosi blocchi di testsitoita
            $logger = $this->get('logger');
            $logger->error('Codice:500 Descrizione:'.$e->getMessage());

        }

        return $this->render('@retItaliaLayout/Default/index.html.twig', array(
            'dati' => $this->end
        ));
    }

}

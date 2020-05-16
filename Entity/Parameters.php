<?php
/**
 * Created by PhpStorm.
 * User: bruno
 * Date: 23/05/18
 * Time: 12.55
 */

namespace retItalia\LayoutBundle\Entity;


class Parameters
{

    /**
     * Link to parameters progetto_intranet
     * @var string
     */
    private $progetto_intranet;

    /**
     * Link to parameters ws_sezioni_intranet
     * @var string
     */
    private $ws_sezioni_intranet;

    /**
     * Link to parameters url_toolkit
     * @var string
     */
    private $url_toolkit;

    /**
     * Creates a new instance
     */
    public function __construct($progetto_intranet, $ws_sezioni_intranet, $url_toolkit) {
        $this->progetto_intranet = $progetto_intranet;
        $this->ws_sezioni_intranet = $ws_sezioni_intranet;
        $this->url_toolkit = $url_toolkit;
    }

    /**
     * @return string
     */
    public function getProgettoIntranet()
    {
        return $this->progetto_intranet;
    }

    /**
     * @return string
     */
    public function getWsSezioniIntranet()
    {
        return $this->ws_sezioni_intranet;
    }

    /**
     * @return string
     */
    public function getUrlToolkit()
    {
        return $this->url_toolkit;
    }

}
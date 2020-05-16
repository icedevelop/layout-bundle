<?php

namespace retItalia\LayoutBundle\DependencyInjection;

use Symfony\Component\Config\Definition\Builder\TreeBuilder;
use Symfony\Component\Config\Definition\ConfigurationInterface;

/**
 * This is the class that validates and merges configuration from your app/config files.
 *
 * To learn more see {@link http://symfony.com/doc/current/cookbook/bundles/configuration.html}
 */
class Configuration implements ConfigurationInterface
{
    /**
     * {@inheritdoc}
     */
    public function getConfigTreeBuilder()
    {
        $treeBuilder = new TreeBuilder();

        //Estraggo la configurazione da /app/config/config.yml
        $rootNode = $treeBuilder->root('ret_italia_layout');
        $rootNode
            ->children()
                ->arrayNode('parameters')
                    ->children()
                        ->scalarNode('progetto_intranet')->end()
                        ->scalarNode('ws_sezioni_intranet')->end()
                        ->scalarNode('url_toolkit')->end()
                    ->end()
                ->end()
            ->end()
        ;

        return $treeBuilder;

    }
}

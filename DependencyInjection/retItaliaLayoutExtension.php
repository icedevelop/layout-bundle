<?php

namespace retItalia\LayoutBundle\DependencyInjection;

use Symfony\Component\DependencyInjection\ContainerBuilder;
use Symfony\Component\Config\FileLocator;
use Symfony\Component\HttpKernel\DependencyInjection\Extension;
use Symfony\Component\DependencyInjection\Loader;

/**
 * This is the class that loads and manages your bundle configuration.
 *
 * @link http://symfony.com/doc/current/cookbook/bundles/extension.html
 */
class retItaliaLayoutExtension extends Extension
{
    /**
     * {@inheritdoc}
     */
    public function load(array $configs, ContainerBuilder $container)
    {
        $configuration = new Configuration();
        $config = $this->processConfiguration($configuration, $configs);

        $loader = new Loader\YamlFileLoader($container, new FileLocator(__DIR__.'/../Resources/config'));
        $loader->load('services.yml');

        //Setto i parametri per il servizio tramite DI
        $definition = $container->getDefinition('parameters_class');
        $definition->replaceArgument(0, $config['parameters']['progetto_intranet']);
        $definition->replaceArgument(1, $config['parameters']['ws_sezioni_intranet']);
        $definition->replaceArgument(2, $config['parameters']['url_toolkit']);

    }
}

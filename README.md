ServicesBundle
=============

This bundle implements the agid ita web toolkit.

Note
----

The bundle is under heavy development and should not be used at this time.


Documentation
-------------

This bundle substitute the base page and implements the agid ita web toolkit


Installation
============

Step 1: Download the Bundle
---------------------------

Attention, all releases with tags 1.*.* are compatible with Symfony until 3.4.

All releases with tags 2.*.* are compatible with Symfony 4

Open a command console, enter your project directory and execute the
following command to download the latest stable version of this bundle:

```console
$ composer require retitalia/layout-bundle
```

This command requires you to have Composer installed globally, as explained
in the [installation chapter](https://getcomposer.org/doc/00-intro.md)
of the Composer documentation.

Step 2: Enable the Bundle
-------------------------

Then, enable the bundle by adding it to the list of registered bundles
in the `app/AppKernel.php` file of your project:

```php
<?php
// app/AppKernel.php

// ...
class AppKernel extends Kernel
{
    public function registerBundles()
    {
        $bundles = array(
            // ...

            new retItalia\LayoutBundle\retItaliaLayoutBundle(),
        );

        // ...
    }

    // ...
}
```

Until Symfony 3.4
----

app/Resorces/views/base.html.twig should be
```php
{% extends '@retItaliaLayout/Default/base.html.twig' %}
```

In app/config/config.yml add:
```php
    - { resource: '@retItaliaLayoutBundle/Resources/config/services.yml'}
```

and

```php
	ret_italia_layout:
	    parameters:
		progetto_intranet: '%progetto_intranet%'
		ws_sezioni_intranet: '%ws_sezioni_intranet%'
		url_toolkit: '%url_toolkit%'

```

and

```php
	# Twig Configuration
	twig:
	    globals:
		retItalia_LayoutBundle: '@parameters_class'
```

In app/config/parameters.yml add:
```php
	progetto_intranet: '<progetto_intranet>'
	ws_sezioni_intranet: '<ws_sezioni_intranet>'
	url_toolkit: '<url_toolkit>'
```

The correct values for parameters can be get from
https://gitlab.com/retitalia/contenitore-bundle-comuni

publish assets:

```php
php bin/console assets:install --symlink web
```

From Symfony 4
----

app/Resorces/views/base.html.twig should be
```php
{% extends '@retItaliaLayout/Default/base.html.twig' %}
```

In app/config/config.yml add:
```php
    - { resource: '@retItaliaLayoutBundle/Resources/config/services.yml'}
```

and

```php
	ret_italia_layout:
	    parameters:
		progetto_intranet: '%progetto_intranet%'
		ws_sezioni_intranet: '%ws_sezioni_intranet%'
		url_toolkit: '%url_toolkit%'

```

and

```php
	# Twig Configuration
	twig:
	    globals:
		retItalia_LayoutBundle: '@parameters_class'
```

In app/config/parameters.yml add:
```php
	progetto_intranet: '<progetto_intranet>'
	ws_sezioni_intranet: '<ws_sezioni_intranet>'
	url_toolkit: '<url_toolkit>'
```

The correct values for parameters can be get from
https://gitlab.com/retitalia/contenitore-bundle-comuni

publish assets:

```php
php bin/console assets:install --symlink web
```


Usage
-------
The bundle exposes 2 templates, the `base` template that includes a standard page without a right-hand side menu and a `baseWithMenu` template that includes a menu on the right side.

To use the `base` template:
app/Resorces/views/base.html.twig should be
```php
{% extends '@retItaliaLayout/Default/base.html.twig' %}
```

To use the `baseWithMenu` template:
app/Resorces/views/base.html.twig should be
```php
{% extends '@retItaliaLayout/Default/baseWithMenu.html.twig' %}
```

The Menu block is called `menu`, to use it just insert the individual lines, for example:
```php
<li role="treeitem" class="u-border-left-m"><a href="#">Riga Menù</a></li>
```

The class u-border-left-m set a gray bar on the left of the row and indicates that that row is selected. It must be used only for the selected row. An example can be view in `ExampleMenu.html.twig`

Furthermore, both templates expose a breadcrumb block where to define the breadcrumb as follows:
```php
<li class="Breadcrumb-item"><a class="Breadcrumb-link u-color-50" href="#">Breadcrumbroot</a></li>
```php
If the row is the last, it must not have the <a> tag

The bundle exposes a `tastiFunzione` block that is positioned just below the breadcrumb.

The body block is named `body`



License
-------

This bundle is under the MIT license.

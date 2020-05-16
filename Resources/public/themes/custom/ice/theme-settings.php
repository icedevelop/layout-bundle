<?php

/**
 * @file
 * Add custom theme settings to the ZURB Foundation theme.
 */

use Drupal\Core\Form\FormStateInterface;

/**
 * Implements hook_form_FORM_ID_alter().
 */
function ice_form_system_theme_settings_alter(&$form, FormStateInterface &$form_state, $form_id = NULL) {
  // Work-around for a core bug affecting admin themes. See issue #943212.
  if (isset($form_id)) {
    return;
  }

  // Header settings.
  $form['header_settings']['ice_second_afferent_administration_name'] = [
    '#type' => 'textfield',
    '#title' => t('Second Afferent Administration Name'),
    '#description' => t('Here you can customize the second afferent Administration name in the site header.'),
    '#default_value' => theme_get_setting('header_settings.ice_second_afferent_administration_name'),
  ];
  $form['header_settings']['ice_second_afferent_administration_url'] = [
    '#type' => 'url',
    '#title' => t('Second Afferent Administration URL'),
    '#description' => t('Here you can customize the second afferent Administration URL in the site header. Insert a full absolute url like http://www.example.com.'),
    '#default_value' => theme_get_setting('header_settings.ice_second_afferent_administration_url'),
  ];

  $form['header_settings']['ice_slogan_url'] = [
    '#type' => 'textfield',
    '#title' => t('ICE website slogan link'),
    '#description' => t('Here you can customize the link for website slogan in the site header.'),
    '#default_value' => theme_get_setting('header_settings.ice_slogan_url'),
  ];

}

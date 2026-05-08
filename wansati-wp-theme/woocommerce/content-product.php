<?php
/**
 * Product loop card.
 *
 * @package Wansati
 */

defined('ABSPATH') || exit;

global $product;

if (! $product instanceof WC_Product) {
	$product = wc_get_product(get_the_ID());
}

if (! $product instanceof WC_Product || ! $product->is_visible()) {
	return;
}

get_template_part('template-parts/components/product-card', null, array('product' => $product));

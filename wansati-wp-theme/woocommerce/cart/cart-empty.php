<?php
/**
 * Empty cart template override.
 *
 * @package Wansati
 */

defined('ABSPATH') || exit;

wc_print_notices();

do_action('woocommerce_cart_is_empty');
?>
<main class="site-main site-main--cart-empty">
	<section class="wansati-page-hero">
		<div class="wansati-container">
			<p class="wansati-page-hero__eyebrow"><?php esc_html_e('Shopping Cart', 'wansati'); ?></p>
			<h1 class="wansati-page-hero__title"><?php esc_html_e('Your cart is empty.', 'wansati'); ?></h1>
			<p class="wansati-page-hero__description"><?php esc_html_e('Discover signature Wansati pieces, fragrances, and care rituals to begin your next order.', 'wansati'); ?></p>
		</div>
	</section>

	<section class="wansati-page-shell wansati-container">
		<div class="wansati-empty-state wansati-empty-state--large">
			<p class="wansati-empty-state__eyebrow"><?php esc_html_e('Nothing in your bag yet', 'wansati'); ?></p>
			<h2><?php esc_html_e('Start with the latest Wansati collection.', 'wansati'); ?></h2>
			<p><?php esc_html_e('Once you add products, quantity updates, discounts, shipping, and payment options will continue to run through WooCommerce as normal.', 'wansati'); ?></p>

			<?php if (wc_get_page_id('shop') > 0) : ?>
				<div class="wansati-inline-actions">
					<a class="wansati-button wansati-button--primary" href="<?php echo esc_url(wc_get_page_permalink('shop')); ?>"><?php esc_html_e('Return to shop', 'wansati'); ?></a>
				</div>
			<?php endif; ?>
		</div>
	</section>
</main>

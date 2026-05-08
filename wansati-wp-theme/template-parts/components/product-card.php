<?php
/**
 * Reusable product card component.
 *
 * @package Wansati
 */

if (! defined('ABSPATH')) {
	exit;
}

$product = $args['product'] ?? null;

if (! class_exists('WC_Product') || ! function_exists('woocommerce_template_loop_add_to_cart')) {
	return;
}

if (! $product instanceof WC_Product) {
	return;
}

$product_link = get_permalink($product->get_id());
$category_list = wc_get_product_category_list($product->get_id(), ', ');
$stock_html    = wc_get_stock_html($product);
$button_html   = '';
$previous_product = $GLOBALS['product'] ?? null;

// Preserve WooCommerce's native loop button behavior for AJAX add-to-cart, variation routing, and plugin hooks.
$GLOBALS['product'] = $product;

ob_start();
woocommerce_template_loop_add_to_cart();
$button_html = trim((string) ob_get_clean());

if ($previous_product instanceof WC_Product) {
	$GLOBALS['product'] = $previous_product;
} else {
	unset($GLOBALS['product']);
}

if ($button_html !== '') {
	$button_html = (string) preg_replace('/class="/', 'class="wansati-button wansati-button--primary wansati-button--block ', $button_html, 1);
}
?>
<article <?php wc_product_class('wansati-product-card', $product); ?>>
	<div class="wansati-product-card__media">
		<?php if ($product->is_on_sale()) : ?>
			<span class="wansati-product-card__badge"><?php esc_html_e('Sale', 'wansati'); ?></span>
		<?php endif; ?>

		<?php if (! $product->is_in_stock()) : ?>
			<span class="wansati-product-card__badge wansati-product-card__badge--dark"><?php esc_html_e('Sold Out', 'wansati'); ?></span>
		<?php endif; ?>

		<a class="wansati-product-card__image-link" href="<?php echo esc_url($product_link); ?>">
			<?php echo $product->get_image('wansati-product-card', array('class' => 'wansati-product-card__image')); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
		</a>

		<button class="wansati-product-card__wishlist" type="button" data-open-panel="wansati-side-wishlist" aria-controls="wansati-side-wishlist" aria-expanded="false">
			<?php echo wansati_theme_get_icon_svg('heart'); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
			<span class="screen-reader-text"><?php esc_html_e('Open wishlist', 'wansati'); ?></span>
		</button>
	</div>

	<div class="wansati-product-card__body">
		<?php if ($category_list) : ?>
			<p class="wansati-product-card__taxonomy"><?php echo wp_kses_post($category_list); ?></p>
		<?php endif; ?>

		<h3 class="wansati-product-card__title">
			<a href="<?php echo esc_url($product_link); ?>"><?php echo esc_html($product->get_name()); ?></a>
		</h3>

		<div class="wansati-product-card__price">
			<?php echo wp_kses_post($product->get_price_html()); ?>
		</div>

		<?php if ($stock_html) : ?>
			<div class="wansati-product-card__stock">
				<?php echo wp_kses_post($stock_html); ?>
			</div>
		<?php endif; ?>

		<?php if ($button_html) : ?>
			<div class="wansati-product-card__actions">
				<?php echo $button_html; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
			</div>
		<?php endif; ?>
	</div>
</article>

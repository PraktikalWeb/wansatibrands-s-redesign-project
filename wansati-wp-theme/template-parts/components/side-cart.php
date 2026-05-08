<?php
/**
 * Side cart drawer.
 *
 * @package Wansati
 */

if (! defined('ABSPATH')) {
	exit;
}
?>
<aside id="wansati-side-cart" class="wansati-panel wansati-panel--side" aria-hidden="true">
	<div class="wansati-panel__dialog">
		<div class="wansati-panel__header">
			<p class="wansati-panel__eyebrow"><?php esc_html_e('Your Cart', 'wansati'); ?></p>
			<button type="button" class="wansati-panel__close" data-close-panel="wansati-side-cart">
				<?php echo wansati_theme_get_icon_svg('close'); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
				<span class="screen-reader-text"><?php esc_html_e('Close cart', 'wansati'); ?></span>
			</button>
		</div>

		<div class="wansati-panel__body" data-wansati-mini-cart>
			<?php if (function_exists('woocommerce_mini_cart')) : ?>
				<?php woocommerce_mini_cart(); ?>
			<?php else : ?>
				<div class="wansati-empty-state">
					<h3><?php esc_html_e('WooCommerce is not active.', 'wansati'); ?></h3>
				</div>
			<?php endif; ?>
		</div>
	</div>
</aside>

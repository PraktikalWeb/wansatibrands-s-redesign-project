<?php
/**
 * Custom single product content shell.
 *
 * @package Wansati
 */

defined('ABSPATH') || exit;

global $product;

do_action('woocommerce_before_single_product');

if (post_password_required()) {
	echo get_the_password_form(); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
	return;
}
?>
<article id="product-<?php the_ID(); ?>" <?php wc_product_class('wansati-single-product', $product); ?>>
	<div class="wansati-single-product__main">
		<div class="wansati-single-product__gallery">
			<?php do_action('woocommerce_before_single_product_summary'); ?>
		</div>

		<div class="summary entry-summary wansati-single-product__summary">
			<p class="wansati-single-product__eyebrow">
				<?php echo esc_html($product && $product->is_on_sale() ? __('Limited Offer', 'wansati') : __('Wansati Edit', 'wansati')); ?>
			</p>

			<?php // Preserve the native WooCommerce summary hook stack for price, variations, add-to-cart, meta, and extension output. ?>
			<?php do_action('woocommerce_single_product_summary'); ?>

			<div class="wansati-single-product__secondary-actions">
				<button type="button" class="wansati-button wansati-button--secondary" data-open-panel="wansati-side-wishlist" aria-controls="wansati-side-wishlist" aria-expanded="false">
					<?php echo wansati_theme_get_icon_svg('heart'); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
					<span><?php esc_html_e('Save for later', 'wansati'); ?></span>
				</button>
				<a class="wansati-button wansati-button--ghost" href="<?php echo esc_url(home_url('/contact/')); ?>">
					<?php echo wansati_theme_get_icon_svg('arrow-right'); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
					<span><?php esc_html_e('Need help?', 'wansati'); ?></span>
				</a>
			</div>

			<div class="wansati-single-product__assurance">
				<div class="wansati-single-product__assurance-item">
					<?php echo wansati_theme_get_icon_svg('truck'); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
					<div>
						<strong><?php esc_html_e('Shipping & delivery', 'wansati'); ?></strong>
						<p><?php esc_html_e('Rates, delivery options, and taxes stay managed by WooCommerce at checkout.', 'wansati'); ?></p>
					</div>
				</div>

				<div class="wansati-single-product__assurance-item">
					<?php echo wansati_theme_get_icon_svg('shield-check'); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
					<div>
						<strong><?php esc_html_e('Secure payment', 'wansati'); ?></strong>
						<p><?php esc_html_e('Payfast, Yoco, WooPayments, and other active gateways render natively during checkout.', 'wansati'); ?></p>
					</div>
				</div>

				<div class="wansati-single-product__payment-strip" aria-label="<?php esc_attr_e('Accepted payment brands', 'wansati'); ?>">
					<img src="<?php echo esc_url(get_theme_file_uri('/assets/images/visa-logo.svg')); ?>" alt="<?php esc_attr_e('Visa', 'wansati'); ?>">
					<img src="<?php echo esc_url(get_theme_file_uri('/assets/images/mastercard-logo.svg')); ?>" alt="<?php esc_attr_e('Mastercard', 'wansati'); ?>">
					<img src="<?php echo esc_url(get_theme_file_uri('/assets/images/payfast-logo.svg')); ?>" alt="<?php esc_attr_e('Payfast', 'wansati'); ?>">
					<img src="<?php echo esc_url(get_theme_file_uri('/assets/images/yoco-logo.svg')); ?>" alt="<?php esc_attr_e('Yoco', 'wansati'); ?>">
				</div>
			</div>
		</div>
	</div>

	<div class="wansati-single-product__extras">
		<?php do_action('woocommerce_after_single_product_summary'); ?>
	</div>
</article>
<?php do_action('woocommerce_after_single_product'); ?>

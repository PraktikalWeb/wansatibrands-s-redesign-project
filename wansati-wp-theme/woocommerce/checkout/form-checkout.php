<?php
/**
 * Checkout form scaffold preserving native WooCommerce gateway and order hooks.
 *
 * @package Wansati
 */

defined('ABSPATH') || exit;

do_action('woocommerce_before_checkout_form', $checkout);

if (! $checkout->is_registration_enabled() && $checkout->is_registration_required() && ! is_user_logged_in()) {
	echo esc_html(apply_filters('woocommerce_checkout_must_be_logged_in_message', __('You must be logged in to checkout.', 'wansati')));
	return;
}
?>
<main class="site-main site-main--checkout">
	<section class="wansati-page-hero">
		<div class="wansati-container">
			<p class="wansati-page-hero__eyebrow"><?php esc_html_e('Checkout', 'wansati'); ?></p>
			<h1 class="wansati-page-hero__title"><?php esc_html_e('Complete your order.', 'wansati'); ?></h1>
		</div>
	</section>

	<section class="wansati-page-shell wansati-container">
		<div class="wansati-inline-actions">
			<a class="wansati-button wansati-button--secondary" href="<?php echo esc_url(wc_get_cart_url()); ?>"><?php esc_html_e('Return to cart', 'wansati'); ?></a>
		</div>

		<form name="checkout" method="post" class="checkout woocommerce-checkout" action="<?php echo esc_url(wc_get_checkout_url()); ?>" enctype="multipart/form-data" aria-label="<?php esc_attr_e('Checkout', 'wansati'); ?>">
			<div class="wansati-checkout-layout">
				<div class="wansati-checkout-main">
					<?php if ($checkout->get_checkout_fields()) : ?>
						<?php do_action('woocommerce_checkout_before_customer_details'); ?>
						<div class="col2-set" id="customer_details">
							<div class="col-1">
								<?php do_action('woocommerce_checkout_billing'); ?>
							</div>

							<div class="col-2">
								<?php do_action('woocommerce_checkout_shipping'); ?>
							</div>
						</div>
						<?php do_action('woocommerce_checkout_after_customer_details'); ?>
					<?php endif; ?>
				</div>

				<aside class="wansati-checkout-sidebar">
					<?php do_action('woocommerce_checkout_before_order_review_heading'); ?>
					<h3 id="order_review_heading"><?php esc_html_e('Your order', 'wansati'); ?></h3>
					<?php do_action('woocommerce_checkout_before_order_review'); ?>
					<div id="order_review" class="woocommerce-checkout-review-order">
						<?php do_action('woocommerce_checkout_order_review'); ?>
					</div>
					<?php do_action('woocommerce_checkout_after_order_review'); ?>

					<div class="wansati-checkout-note">
						<p class="wansati-panel__eyebrow"><?php esc_html_e('Secure Checkout', 'wansati'); ?></p>
						<p><?php esc_html_e('Payment gateways, totals, coupons, shipping, and discount rules are rendered by WooCommerce and its active gateway extensions.', 'wansati'); ?></p>
					</div>
				</aside>
			</div>
		</form>
	</section>
</main>
<?php do_action('woocommerce_after_checkout_form', $checkout); ?>

<?php
/**
 * Thank you page scaffold.
 *
 * @package Wansati
 */

defined('ABSPATH') || exit;

do_action('woocommerce_before_thankyou', $order ? $order->get_id() : 0);
?>
<main class="site-main site-main--thankyou">
	<section class="wansati-page-hero">
		<div class="wansati-container">
			<p class="wansati-page-hero__eyebrow"><?php esc_html_e('Order Confirmation', 'wansati'); ?></p>
			<h1 class="wansati-page-hero__title">
				<?php if ($order) : ?>
					<?php esc_html_e('Thank you. Your order has been received.', 'wansati'); ?>
				<?php else : ?>
					<?php esc_html_e('Thank you for your order.', 'wansati'); ?>
				<?php endif; ?>
			</h1>
		</div>
	</section>

	<section class="wansati-page-shell wansati-container">
		<div class="wansati-content-card">
			<?php if ($order) : ?>
				<?php if ($order->has_status('failed')) : ?>
					<p><?php esc_html_e('Unfortunately your order cannot be processed as the originating bank or merchant has declined your transaction. Please attempt your purchase again.', 'wansati'); ?></p>
					<div class="wansati-inline-actions">
						<a class="wansati-button wansati-button--primary" href="<?php echo esc_url($order->get_checkout_payment_url()); ?>"><?php esc_html_e('Pay', 'wansati'); ?></a>
						<?php if (is_user_logged_in()) : ?>
							<a class="wansati-button wansati-button--secondary" href="<?php echo esc_url(wc_get_page_permalink('myaccount')); ?>"><?php esc_html_e('My account', 'wansati'); ?></a>
						<?php endif; ?>
					</div>
				<?php else : ?>
					<ul class="woocommerce-order-overview woocommerce-thankyou-order-details order_details">
						<li class="woocommerce-order-overview__order order">
							<?php esc_html_e('Order number:', 'wansati'); ?>
							<strong><?php echo esc_html($order->get_order_number()); ?></strong>
						</li>
						<li class="woocommerce-order-overview__date date">
							<?php esc_html_e('Date:', 'wansati'); ?>
							<strong><?php echo esc_html(wc_format_datetime($order->get_date_created())); ?></strong>
						</li>
						<li class="woocommerce-order-overview__email email">
							<?php esc_html_e('Email:', 'wansati'); ?>
							<strong><?php echo esc_html($order->get_billing_email()); ?></strong>
						</li>
						<li class="woocommerce-order-overview__total total">
							<?php esc_html_e('Total:', 'wansati'); ?>
							<strong><?php echo wp_kses_post($order->get_formatted_order_total()); ?></strong>
						</li>
						<?php if ($order->get_payment_method_title()) : ?>
							<li class="woocommerce-order-overview__payment-method method">
								<?php esc_html_e('Payment method:', 'wansati'); ?>
								<strong><?php echo esc_html($order->get_payment_method_title()); ?></strong>
							</li>
						<?php endif; ?>
					</ul>

					<div class="wansati-inline-actions">
						<a class="wansati-button wansati-button--secondary" href="<?php echo esc_url(wansati_theme_get_shop_url()); ?>"><?php esc_html_e('Continue shopping', 'wansati'); ?></a>
						<?php if (is_user_logged_in()) : ?>
							<a class="wansati-button wansati-button--primary" href="<?php echo esc_url(wc_get_endpoint_url('orders', '', wc_get_page_permalink('myaccount'))); ?>"><?php esc_html_e('View orders', 'wansati'); ?></a>
						<?php endif; ?>
					</div>
				<?php endif; ?>

				<?php do_action('woocommerce_thankyou_' . $order->get_payment_method(), $order->get_id()); ?>
				<?php do_action('woocommerce_thankyou', $order->get_id()); ?>
			<?php else : ?>
				<p><?php esc_html_e('We could not load order details for this confirmation screen.', 'wansati'); ?></p>
			<?php endif; ?>
		</div>

		<?php if ($order && ! $order->has_status('failed')) : ?>
			<div class="wansati-thankyou-layout">
				<div class="wansati-thankyou-layout__main">
					<?php wc_get_template('order/order-details.php', array('order' => $order)); ?>
				</div>

				<div class="wansati-thankyou-layout__sidebar">
					<?php wc_get_template('order/order-details-customer.php', array('order' => $order)); ?>
				</div>
			</div>
		<?php endif; ?>
	</section>
</main>

<?php
/**
 * Cart template scaffold with native WooCommerce fields and hooks preserved.
 *
 * @package Wansati
 */

defined('ABSPATH') || exit;

do_action('woocommerce_before_cart');
?>
<main class="site-main site-main--cart">
	<section class="wansati-page-hero">
		<div class="wansati-container">
			<p class="wansati-page-hero__eyebrow"><?php esc_html_e('Shopping Cart', 'wansati'); ?></p>
			<h1 class="wansati-page-hero__title"><?php esc_html_e('Review your cart.', 'wansati'); ?></h1>
		</div>
	</section>

	<section class="wansati-page-shell wansati-container">
		<div class="wansati-inline-actions">
			<a class="wansati-button wansati-button--secondary" href="<?php echo esc_url(wansati_theme_get_shop_url()); ?>"><?php esc_html_e('Continue shopping', 'wansati'); ?></a>
		</div>

		<form class="woocommerce-cart-form" action="<?php echo esc_url(wc_get_cart_url()); ?>" method="post">
			<div class="wansati-cart-layout">
				<div class="wansati-cart-table-wrapper">
					<?php do_action('woocommerce_before_cart_table'); ?>
					<table class="shop_table shop_table_responsive cart woocommerce-cart-form__contents" cellspacing="0">
						<thead>
							<tr>
								<th class="product-remove"><span class="screen-reader-text"><?php esc_html_e('Remove', 'wansati'); ?></span></th>
								<th class="product-thumbnail"><?php esc_html_e('Product', 'wansati'); ?></th>
								<th class="product-name"><?php esc_html_e('Details', 'wansati'); ?></th>
								<th class="product-price"><?php esc_html_e('Price', 'wansati'); ?></th>
								<th class="product-quantity"><?php esc_html_e('Quantity', 'wansati'); ?></th>
								<th class="product-subtotal"><?php esc_html_e('Total', 'wansati'); ?></th>
							</tr>
						</thead>
						<tbody>
							<?php do_action('woocommerce_before_cart_contents'); ?>

							<?php foreach (WC()->cart->get_cart() as $cart_item_key => $cart_item) : ?>
								<?php
								$product        = apply_filters('woocommerce_cart_item_product', $cart_item['data'], $cart_item, $cart_item_key);
								$product_id     = apply_filters('woocommerce_cart_item_product_id', $cart_item['product_id'], $cart_item, $cart_item_key);
								$product_link   = apply_filters('woocommerce_cart_item_permalink', $product && $product->is_visible() ? $product->get_permalink($cart_item) : '', $cart_item, $cart_item_key);

								if (! $product || ! $product->exists() || $cart_item['quantity'] <= 0 || ! apply_filters('woocommerce_cart_item_visible', true, $cart_item, $cart_item_key)) {
									continue;
								}
								?>
								<tr <?php echo wc_get_cart_item_class('', $cart_item, $cart_item_key); ?>>
									<td class="product-remove">
										<?php
										echo apply_filters(
											'woocommerce_cart_item_remove_link',
											sprintf(
												'<a href="%s" class="remove" aria-label="%s" data-product_id="%s" data-product_sku="%s">&times;</a>',
												esc_url(wc_get_cart_remove_url($cart_item_key)),
												esc_attr(sprintf(__('Remove %s from your cart', 'wansati'), wp_strip_all_tags($product->get_name()))),
												esc_attr((string) $product_id),
												esc_attr($product->get_sku())
											),
											$cart_item_key
										);
										?>
									</td>

									<td class="product-thumbnail">
										<?php
										$thumbnail = apply_filters('woocommerce_cart_item_thumbnail', $product->get_image('woocommerce_thumbnail'), $cart_item, $cart_item_key);

										if ($product_link) {
											printf('<a href="%1$s">%2$s</a>', esc_url($product_link), $thumbnail); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
										} else {
											echo $thumbnail; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
										}
										?>
									</td>

									<td class="product-name" data-title="<?php esc_attr_e('Product', 'wansati'); ?>">
										<?php
										$product_name = $product_link
											? sprintf('<a href="%1$s">%2$s</a>', esc_url($product_link), esc_html($product->get_name()))
											: esc_html($product->get_name());

										echo wp_kses_post(apply_filters('woocommerce_cart_item_name', $product_name, $cart_item, $cart_item_key));

										do_action('woocommerce_after_cart_item_name', $cart_item, $cart_item_key);

										echo wc_get_formatted_cart_item_data($cart_item); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped

										if ($product->backorders_require_notification() && $product->is_on_backorder($cart_item['quantity'])) {
											echo wp_kses_post('<p class="backorder_notification">' . esc_html__('Available on backorder', 'wansati') . '</p>');
										}
										?>
									</td>

									<td class="product-price" data-title="<?php esc_attr_e('Price', 'wansati'); ?>">
										<?php echo wp_kses_post(apply_filters('woocommerce_cart_item_price', WC()->cart->get_product_price($product), $cart_item, $cart_item_key)); ?>
									</td>

									<td class="product-quantity" data-title="<?php esc_attr_e('Quantity', 'wansati'); ?>">
										<?php
										if ($product->is_sold_individually()) {
											$product_quantity = sprintf('1 <input type="hidden" name="cart[%s][qty]" value="1">', esc_attr($cart_item_key));
										} else {
											$product_quantity = woocommerce_quantity_input(
												array(
													'input_name'   => "cart[{$cart_item_key}][qty]",
													'input_value'  => $cart_item['quantity'],
													'max_value'    => $product->get_max_purchase_quantity(),
													'min_value'    => '0',
													'product_name' => $product->get_name(),
												),
												$product,
												false
											);
										}

										echo apply_filters('woocommerce_cart_item_quantity', $product_quantity, $cart_item_key, $cart_item); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
										?>
									</td>

									<td class="product-subtotal" data-title="<?php esc_attr_e('Total', 'wansati'); ?>">
										<?php echo wp_kses_post(apply_filters('woocommerce_cart_item_subtotal', WC()->cart->get_product_subtotal($product, $cart_item['quantity']), $cart_item, $cart_item_key)); ?>
									</td>
								</tr>
							<?php endforeach; ?>

							<?php do_action('woocommerce_cart_contents'); ?>

							<tr>
								<td colspan="6" class="actions">
									<?php if (wc_coupons_enabled()) : ?>
										<div class="coupon">
											<label for="coupon_code" class="screen-reader-text"><?php esc_html_e('Coupon:', 'wansati'); ?></label>
											<input type="text" name="coupon_code" class="input-text" id="coupon_code" value="" placeholder="<?php esc_attr_e('Coupon code', 'wansati'); ?>">
											<button type="submit" class="button" name="apply_coupon" value="<?php esc_attr_e('Apply coupon', 'wansati'); ?>"><?php esc_html_e('Apply coupon', 'wansati'); ?></button>
											<?php do_action('woocommerce_cart_coupon'); ?>
										</div>
									<?php endif; ?>

									<button type="submit" class="button" name="update_cart" value="<?php esc_attr_e('Update cart', 'wansati'); ?>"><?php esc_html_e('Update cart', 'wansati'); ?></button>

									<?php do_action('woocommerce_cart_actions'); ?>
									<?php wp_nonce_field('woocommerce-cart', 'woocommerce-cart-nonce'); ?>
								</td>
							</tr>

							<?php do_action('woocommerce_after_cart_contents'); ?>
						</tbody>
					</table>
					<?php do_action('woocommerce_after_cart_table'); ?>
				</div>

				<aside class="wansati-cart-totals">
					<?php do_action('woocommerce_before_cart_collaterals'); ?>
					<div class="cart-collaterals">
						<?php do_action('woocommerce_cart_collaterals'); ?>
					</div>
					<?php do_action('woocommerce_after_cart_collaterals'); ?>
				</aside>
			</div>
		</form>
	</section>
</main>
<?php do_action('woocommerce_after_cart'); ?>

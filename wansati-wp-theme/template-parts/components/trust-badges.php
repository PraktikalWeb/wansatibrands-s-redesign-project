<?php
/**
 * Trust badges strip.
 *
 * @package Wansati
 */

if (! defined('ABSPATH')) {
	exit;
}
?>
<section class="wansati-trust-badges">
	<div class="wansati-container wansati-trust-badges__grid">
		<div class="wansati-trust-badge">
			<?php echo wansati_theme_get_icon_svg('truck'); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
			<div>
				<h2><?php esc_html_e('Nationwide Delivery', 'wansati'); ?></h2>
				<p><?php esc_html_e('We ship across South Africa.', 'wansati'); ?></p>
			</div>
		</div>
		<div class="wansati-trust-badge">
			<?php echo wansati_theme_get_icon_svg('gem'); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
			<div>
				<h2><?php esc_html_e('Premium Quality', 'wansati'); ?></h2>
				<p><?php esc_html_e('Crafted with care and lasting elegance.', 'wansati'); ?></p>
			</div>
		</div>
		<div class="wansati-trust-badge">
			<?php echo wansati_theme_get_icon_svg('crown'); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
			<div>
				<h2><?php esc_html_e('Exclusive Designs', 'wansati'); ?></h2>
				<p><?php esc_html_e('Signature styles designed to feel unmistakably Wansati.', 'wansati'); ?></p>
			</div>
		</div>
		<div class="wansati-trust-badge">
			<?php echo wansati_theme_get_icon_svg('shield-check'); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
			<div>
				<h2><?php esc_html_e('Quick Payment', 'wansati'); ?></h2>
				<p><?php esc_html_e('Secure checkout through native WooCommerce gateways.', 'wansati'); ?></p>
			</div>
		</div>
	</div>
</section>

<?php
/**
 * Side wishlist drawer scaffold.
 *
 * @package Wansati
 */

if (! defined('ABSPATH')) {
	exit;
}
?>
<aside id="wansati-side-wishlist" class="wansati-panel wansati-panel--side" aria-hidden="true">
	<div class="wansati-panel__dialog">
		<div class="wansati-panel__header">
			<p class="wansati-panel__eyebrow"><?php esc_html_e('Wishlist', 'wansati'); ?></p>
			<button type="button" class="wansati-panel__close" data-close-panel="wansati-side-wishlist">
				<?php echo wansati_theme_get_icon_svg('close'); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
				<span class="screen-reader-text"><?php esc_html_e('Close wishlist', 'wansati'); ?></span>
			</button>
		</div>

		<div class="wansati-panel__body">
			<?php do_action('wansati_theme_wishlist_drawer'); ?>
		</div>
	</div>
</aside>

<?php
/**
 * Brand story section.
 *
 * @package Wansati
 */

if (! defined('ABSPATH')) {
	exit;
}
?>
<section class="wansati-brand-story">
	<div class="wansati-container wansati-brand-story__grid">
		<div class="wansati-brand-story__media">
			<img src="https://www.wansatibrands.co.za/wp-content/uploads/2025/09/DSC_6474-scaled.jpg" alt="<?php esc_attr_e('The Wansati woman', 'wansati'); ?>">
		</div>
		<div class="wansati-brand-story__content">
			<p class="wansati-section__eyebrow"><?php esc_html_e('Our Story', 'wansati'); ?></p>
			<h2><?php esc_html_e('The Meaning of Wansati', 'wansati'); ?></h2>
			<blockquote>
				<?php esc_html_e('Wansati means woman in Xitsonga — a name that carries confidence, culture, softness, strength, and timeless elegance.', 'wansati'); ?>
			</blockquote>
			<p><?php esc_html_e('Wansati Brands is a lifestyle label for everyone. The visual direction of this theme is being ported from the React redesign while the underlying commerce layer remains native to WordPress and WooCommerce.', 'wansati'); ?></p>
			<div class="wansati-inline-actions">
				<a class="wansati-button wansati-button--primary" href="<?php echo esc_url(home_url('/about/')); ?>">
					<?php esc_html_e('Read Our Story', 'wansati'); ?>
				</a>
			</div>
		</div>
	</div>
</section>

<?php
/**
 * Home hero section.
 *
 * @package Wansati
 */

if (! defined('ABSPATH')) {
	exit;
}

// TODO: Replace these remote fallback hero images with Media Library attachments
// or theme-managed assets once staging content is finalized.
$hero_images = array(
	'https://www.wansatibrands.co.za/wp-content/uploads/2025/10/DSC_6563-scaled.jpg',
	'https://www.wansatibrands.co.za/wp-content/uploads/2025/09/DSC_6469-scaled.jpg',
	'https://www.wansatibrands.co.za/wp-content/uploads/2025/09/DSC_6315-scaled.jpg',
	'https://www.wansatibrands.co.za/wp-content/uploads/2025/09/DSC_6391-scaled.jpg',
);
?>
<section class="wansati-hero" data-hero-slider>
	<div class="wansati-hero__slides">
		<?php foreach ($hero_images as $index => $image_url) : ?>
			<div class="wansati-hero__slide<?php echo 0 === $index ? ' is-active' : ''; ?>" data-hero-slide>
				<img src="<?php echo esc_url($image_url); ?>" alt="<?php echo esc_attr(sprintf(__('Wansati hero look %d', 'wansati'), $index + 1)); ?>">
			</div>
		<?php endforeach; ?>
	</div>

	<div class="wansati-hero__overlay"></div>

	<div class="wansati-hero__content wansati-container">
		<p class="wansati-hero__eyebrow"><?php esc_html_e('Wansati Brands', 'wansati'); ?></p>
		<h1><?php esc_html_e('Elegance. Presence. Power.', 'wansati'); ?></h1>
		<p><?php esc_html_e('Shop exclusive African-inspired fashion, signature scents, luxury body care, and refined lifestyle essentials with a premium WooCommerce foundation.', 'wansati'); ?></p>
		<div class="wansati-inline-actions">
			<a class="wansati-button wansati-button--primary" href="<?php echo esc_url(wansati_theme_get_shop_url()); ?>">
				<?php esc_html_e('Shop All Products', 'wansati'); ?>
			</a>
			<a class="wansati-button wansati-button--ghost" href="#wansati-category-tiles">
				<?php esc_html_e('Explore Collections', 'wansati'); ?>
			</a>
		</div>
	</div>

	<div class="wansati-hero__dots">
		<?php foreach ($hero_images as $index => $image_url) : ?>
			<button class="wansati-hero__dot<?php echo 0 === $index ? ' is-active' : ''; ?>" type="button" data-hero-dot="<?php echo esc_attr((string) $index); ?>">
				<span class="screen-reader-text"><?php echo esc_html(sprintf(__('Go to slide %d', 'wansati'), $index + 1)); ?></span>
			</button>
		<?php endforeach; ?>
	</div>
</section>

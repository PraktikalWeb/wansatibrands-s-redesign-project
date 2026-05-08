<?php
/**
 * Featured collections.
 *
 * @package Wansati
 */

if (! defined('ABSPATH')) {
	exit;
}

// TODO: These remote image URLs are fallback art direction only. Replace them
// with Media Library images or product category thumbnails during content entry.
$collections = array(
	array(
		'title'   => __('Kimono', 'wansati'),
		'slug'    => 'kimono',
		'eyebrow' => __('Popular Collection', 'wansati'),
		'cta'     => __('Explore', 'wansati'),
		'image'   => 'https://i0.wp.com/www.wansatibrands.co.za/wp-content/uploads/2025/10/DSC_6646-scaled.jpg?w=864&ssl=1',
	),
	array(
		'title'   => __('Exclusive Range', 'wansati'),
		'slug'    => 'exclusive-range',
		'eyebrow' => __('Popular Collection', 'wansati'),
		'cta'     => __('Explore', 'wansati'),
		'image'   => 'https://i0.wp.com/www.wansatibrands.co.za/wp-content/uploads/2025/10/DSC_6494-scaled.jpg?w=864&ssl=1',
	),
	array(
		'title'   => __('Menswear', 'wansati'),
		'slug'    => 'men',
		'eyebrow' => __('Popular Collection', 'wansati'),
		'cta'     => __('Explore', 'wansati'),
		'image'   => 'https://i0.wp.com/www.wansatibrands.co.za/wp-content/uploads/2026/01/DSC_5487-1-1-scaled.jpg?w=2048&ssl=1',
	),
);
?>
<section class="wansati-home-section wansati-home-section--accent">
	<div class="wansati-container">
		<div class="wansati-section__heading wansati-section__heading--centered">
			<p class="wansati-section__eyebrow"><?php esc_html_e('Popular Collections', 'wansati'); ?></p>
			<h2><?php esc_html_e('Collection Highlights', 'wansati'); ?></h2>
		</div>

		<div class="wansati-collection-grid wansati-collection-grid--three">
			<?php foreach ($collections as $collection) : ?>
				<?php
				$card_context = wansati_theme_get_collection_card_context($collection);

				get_template_part(
					'template-parts/components/collection-card',
					null,
					$card_context
				);
				?>
			<?php endforeach; ?>
		</div>
	</div>
</section>

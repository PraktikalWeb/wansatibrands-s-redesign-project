<?php
/**
 * Home category tiles.
 *
 * @package Wansati
 */

if (! defined('ABSPATH')) {
	exit;
}

$tiles = array(
	array(
		'title'   => __('Women', 'wansati'),
		'slug'    => 'women',
		'eyebrow' => __('Shop Now', 'wansati'),
		'image'   => 'https://i0.wp.com/www.wansatibrands.co.za/wp-content/uploads/2025/10/DSC_6522-scaled.jpg?w=864&ssl=1',
	),
	array(
		'title'   => __('Men', 'wansati'),
		'slug'    => 'men',
		'eyebrow' => __('Shop Now', 'wansati'),
		'image'   => 'https://i0.wp.com/www.wansatibrands.co.za/wp-content/uploads/2026/01/DSC_5487-1-1-scaled.jpg?w=2048&ssl=1',
	),
	array(
		'title'   => __('Kids', 'wansati'),
		'slug'    => 'kids',
		'eyebrow' => __('Shop Now', 'wansati'),
		'image'   => 'https://i0.wp.com/www.wansatibrands.co.za/wp-content/uploads/2026/01/DSC_5880.jpg?w=864&ssl=1',
	),
	array(
		'title'   => __('Fragrance', 'wansati'),
		'slug'    => 'fragrances',
		'eyebrow' => __('Shop Now', 'wansati'),
		'image'   => 'https://i0.wp.com/www.wansatibrands.co.za/wp-content/uploads/2025/09/d35246f2-017e-41eb-96c4-c7ae49a34b45.jpeg?w=2047&ssl=1',
	),
	array(
		'title'   => __('Body Care', 'wansati'),
		'slug'    => 'body-care',
		'eyebrow' => __('Shop Now', 'wansati'),
		'image'   => 'https://i0.wp.com/www.wansatibrands.co.za/wp-content/uploads/2023/09/Body.jpg?w=1181&ssl=1',
	),
	array(
		'title'   => __('Sale', 'wansati'),
		'slug'    => 'sale',
		'eyebrow' => __('Shop Now', 'wansati'),
		'image'   => 'https://i0.wp.com/www.wansatibrands.co.za/wp-content/uploads/2025/10/DSC_6494-scaled.jpg?w=864&ssl=1',
	),
);
?>
<section id="wansati-category-tiles" class="wansati-home-section wansati-container">
	<div class="wansati-section__heading wansati-section__heading--centered">
		<p class="wansati-section__eyebrow"><?php esc_html_e('Primary Collections', 'wansati'); ?></p>
		<h2><?php esc_html_e('Shop by Category', 'wansati'); ?></h2>
	</div>

	<div class="wansati-collection-grid wansati-collection-grid--six">
		<?php foreach ($tiles as $tile) : ?>
			<?php
			$card_context = wansati_theme_get_collection_card_context($tile);

			get_template_part(
				'template-parts/components/collection-card',
				null,
				$card_context
			);
			?>
		<?php endforeach; ?>
	</div>
</section>

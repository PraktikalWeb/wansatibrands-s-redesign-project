<?php
/**
 * Homepage product sections.
 *
 * @package Wansati
 */

if (! defined('ABSPATH')) {
	exit;
}

$sections = array(
	array(
		'title' => __('Dresses', 'wansati'),
		'slug'  => 'dresses',
		'cta'   => __('Explore Dresses', 'wansati'),
	),
	array(
		'title' => __('Menswear', 'wansati'),
		'slug'  => 'men-wear',
		'cta'   => __('Explore Menswear', 'wansati'),
	),
	array(
		'title' => __('Fragrances', 'wansati'),
		'slug'  => 'fragrances',
		'cta'   => __('Explore Fragrances', 'wansati'),
	),
);
?>
<section class="wansati-home-section wansati-container">
	<div class="wansati-section__heading wansati-section__heading--centered">
		<p class="wansati-section__eyebrow"><?php esc_html_e('New Arrivals', 'wansati'); ?></p>
		<h2><?php esc_html_e('Shop the Signature Edit', 'wansati'); ?></h2>
	</div>

	<?php foreach ($sections as $section) : ?>
		<?php
		$term = get_term_by('slug', $section['slug'], 'product_cat');
		$query_args = array(
			'post_type'      => 'product',
			'post_status'    => 'publish',
			'posts_per_page' => 4,
		);

		if ($term && ! is_wp_error($term)) {
			$query_args['tax_query'] = array(
				array(
					'taxonomy' => 'product_cat',
					'field'    => 'term_id',
					'terms'    => $term->term_id,
				),
			);
		}

		$section_query = new WP_Query($query_args);
		$section_url   = $term && ! is_wp_error($term) ? get_term_link($term) : wansati_theme_get_shop_url();
		?>
		<div class="wansati-product-section">
			<div class="wansati-product-section__header">
				<h3><?php echo esc_html($section['title']); ?></h3>
				<a href="<?php echo esc_url($section_url); ?>">
					<span><?php echo esc_html($section['cta']); ?></span>
					<?php echo wansati_theme_get_icon_svg('arrow-right'); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
				</a>
			</div>

			<?php if ($section_query->have_posts()) : ?>
				<div class="wansati-product-grid">
					<?php
					while ($section_query->have_posts()) :
						$section_query->the_post();
						global $product;
						get_template_part('template-parts/components/product-card', null, array('product' => $product));
					endwhile;
					?>
				</div>
				<?php wp_reset_postdata(); ?>
			<?php else : ?>
				<div class="wansati-empty-state">
					<h3><?php esc_html_e('Products will appear here once WooCommerce data is connected.', 'wansati'); ?></h3>
				</div>
			<?php endif; ?>
		</div>
	<?php endforeach; ?>
</section>

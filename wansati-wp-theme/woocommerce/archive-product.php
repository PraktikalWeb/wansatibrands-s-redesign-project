<?php
/**
 * Product archives.
 *
 * @package Wansati
 */

defined('ABSPATH') || exit;

get_header();

do_action('woocommerce_before_main_content');

$archive_title       = woocommerce_page_title(false);
$archive_description = '';
$current_term_id     = 0;
$featured_tags       = get_terms(
	array(
		'taxonomy'   => 'product_tag',
		'hide_empty' => true,
		'number'     => 8,
	)
);
$total_products      = (int) wc_get_loop_prop('total');

if (is_tax('product_cat') || is_tax('product_tag')) {
	$archive_description = term_description();

	$queried_object = get_queried_object();

	if ($queried_object instanceof WP_Term) {
		$current_term_id = (int) $queried_object->term_id;
	}
} else {
	$shop_page_id = wc_get_page_id('shop');

	if ($shop_page_id > 0) {
		$archive_description = wp_kses_post(wpautop(get_post_field('post_content', $shop_page_id)));
	}
}
?>
<section class="wansati-shop-hero">
	<p class="wansati-shop-hero__eyebrow"><?php esc_html_e('Shop Wansati', 'wansati'); ?></p>
	<h1><?php echo esc_html($archive_title); ?></h1>
	<?php if ($archive_description) : ?>
		<div class="wansati-shop-hero__description"><?php echo wp_kses_post($archive_description); ?></div>
	<?php endif; ?>
</section>

<?php if (woocommerce_product_loop()) : ?>
	<section class="wansati-shop-layout">
		<aside class="wansati-shop-sidebar">
			<?php
			get_template_part(
				'template-parts/components/shop-filters',
				null,
				array(
					'current_term_id' => $current_term_id,
					'featured_tags'   => $featured_tags,
				)
			);
			?>
		</aside>

		<div class="wansati-shop-results">
			<div class="wansati-shop-toolbar">
				<div class="wansati-shop-toolbar__actions">
					<button type="button" class="wansati-shop-filter-toggle" data-open-panel="wansati-shop-filters-panel" aria-controls="wansati-shop-filters-panel" aria-expanded="false">
						<?php echo wansati_theme_get_icon_svg('menu'); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
						<span><?php esc_html_e('Filters', 'wansati'); ?></span>
					</button>

					<div class="wansati-shop-toolbar__count">
						<?php woocommerce_result_count(); ?>
					</div>
				</div>
				<div class="wansati-shop-toolbar__ordering">
					<?php woocommerce_catalog_ordering(); ?>
				</div>
			</div>

			<?php do_action('woocommerce_before_shop_loop'); ?>

			<?php woocommerce_product_loop_start(); ?>
				<?php while (have_posts()) : ?>
					<?php the_post(); ?>
					<?php wc_get_template_part('content', 'product'); ?>
				<?php endwhile; ?>
			<?php woocommerce_product_loop_end(); ?>

			<?php do_action('woocommerce_after_shop_loop'); ?>
		</div>
	</section>

	<aside id="wansati-shop-filters-panel" class="wansati-panel wansati-panel--menu wansati-panel--filters" aria-hidden="true">
		<div class="wansati-panel__dialog">
			<div class="wansati-panel__header">
				<div>
					<p class="wansati-panel__eyebrow"><?php esc_html_e('Product Listing', 'wansati'); ?></p>
					<h2 class="wansati-panel__title"><?php esc_html_e('Filters', 'wansati'); ?></h2>
				</div>
				<button type="button" class="wansati-panel__close" data-close-panel="wansati-shop-filters-panel">
					<?php echo wansati_theme_get_icon_svg('close'); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
					<span class="screen-reader-text"><?php esc_html_e('Close filters', 'wansati'); ?></span>
				</button>
			</div>

			<div class="wansati-panel__body">
				<?php
				get_template_part(
					'template-parts/components/shop-filters',
					null,
					array(
						'current_term_id' => $current_term_id,
						'featured_tags'   => $featured_tags,
					)
				);
				?>
			</div>

			<div class="wansati-shop-filter-panel__footer">
				<button type="button" class="wansati-button wansati-button--primary wansati-button--block" data-close-panel="wansati-shop-filters-panel">
					<?php
					printf(
						esc_html(
							/* translators: %d: number of products. */
							_n('Show %d Product', 'Show %d Products', $total_products, 'wansati')
						),
						$total_products
					);
					?>
				</button>
			</div>
		</div>
	</aside>
<?php else : ?>
	<div class="wansati-empty-state wansati-empty-state--large wansati-shop-empty">
		<p class="wansati-empty-state__eyebrow"><?php esc_html_e('No Matches', 'wansati'); ?></p>
		<h2><?php esc_html_e('No products match this selection.', 'wansati'); ?></h2>
		<p><?php esc_html_e('Try a broader search, browse a different collection, or return to the full shop.', 'wansati'); ?></p>
		<div class="wansati-inline-actions">
			<a class="wansati-button wansati-button--primary" href="<?php echo esc_url(wansati_theme_get_shop_url()); ?>"><?php esc_html_e('Browse All Products', 'wansati'); ?></a>
		</div>
		<?php do_action('woocommerce_no_products_found'); ?>
	</div>
<?php endif; ?>

<?php
do_action('woocommerce_after_main_content');

get_footer();

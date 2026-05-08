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
			<div class="wansati-shop-sidebar__card">
				<h2><?php esc_html_e('Browse Collections', 'wansati'); ?></h2>
				<ul class="wansati-shop-sidebar__list">
					<?php
					wp_list_categories(
						array(
							'taxonomy'         => 'product_cat',
							'title_li'         => '',
							'hide_empty'       => true,
							'show_count'       => true,
							'depth'            => 1,
							'orderby'          => 'name',
							'current_category' => $current_term_id,
						)
					);
					?>
				</ul>
			</div>

			<?php
			$featured_tags = get_terms(
				array(
					'taxonomy'   => 'product_tag',
					'hide_empty' => true,
					'number'     => 8,
				)
			);
			?>

			<?php if (! empty($featured_tags) && ! is_wp_error($featured_tags)) : ?>
				<div class="wansati-shop-sidebar__card">
					<h2><?php esc_html_e('Popular Tags', 'wansati'); ?></h2>
					<div class="wansati-shop-sidebar__tags">
						<?php foreach ($featured_tags as $featured_tag) : ?>
							<?php $featured_tag_link = get_term_link($featured_tag); ?>
							<?php if (! is_wp_error($featured_tag_link)) : ?>
								<a href="<?php echo esc_url($featured_tag_link); ?>"><?php echo esc_html($featured_tag->name); ?></a>
							<?php endif; ?>
						<?php endforeach; ?>
					</div>
				</div>
			<?php endif; ?>
		</aside>

		<div class="wansati-shop-results">
			<div class="wansati-shop-toolbar">
				<div class="wansati-shop-toolbar__count">
					<?php woocommerce_result_count(); ?>
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
<?php else : ?>
	<?php do_action('woocommerce_no_products_found'); ?>
<?php endif; ?>

<?php
do_action('woocommerce_after_main_content');

get_footer();

<?php
/**
 * Product archive filter/sidebar content.
 *
 * @package Wansati
 */

if (! defined('ABSPATH')) {
	exit;
}

$current_term_id = isset($args['current_term_id']) ? (int) $args['current_term_id'] : 0;
$featured_tags   = $args['featured_tags'] ?? get_terms(
	array(
		'taxonomy'   => 'product_tag',
		'hide_empty' => true,
		'number'     => 8,
	)
);
?>
<div class="wansati-shop-filters">
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
</div>

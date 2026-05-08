<?php
/**
 * Search overlay.
 *
 * @package Wansati
 */

if (! defined('ABSPATH')) {
	exit;
}

$suggested_terms = get_terms(
	array(
		'taxonomy'   => 'product_cat',
		'hide_empty' => true,
		'number'     => 4,
		'orderby'    => 'count',
		'order'      => 'DESC',
	)
);

$fallback_suggestions = array(
	array(
		'label' => __('New Arrivals', 'wansati'),
		'url'   => wansati_theme_get_collection_url('new-arrivals'),
	),
	array(
		'label' => __('Dresses', 'wansati'),
		'url'   => wansati_theme_get_collection_url('dresses'),
	),
	array(
		'label' => __('Fragrances', 'wansati'),
		'url'   => wansati_theme_get_collection_url('fragrances'),
	),
	array(
		'label' => __('The Journal', 'wansati'),
		'url'   => home_url('/blog/'),
	),
);
?>
<div id="wansati-search-overlay" class="wansati-search-overlay" aria-hidden="true">
	<div class="wansati-search-overlay__inner">
		<div class="wansati-search-overlay__header">
			<p class="wansati-panel__eyebrow"><?php esc_html_e('Site Search', 'wansati'); ?></p>
			<button type="button" class="wansati-panel__close" data-close-search>
				<?php echo wansati_theme_get_icon_svg('close'); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
				<span class="screen-reader-text"><?php esc_html_e('Close search', 'wansati'); ?></span>
			</button>
		</div>

		<form class="wansati-search-form wansati-search-form--overlay" role="search" method="get" action="<?php echo esc_url(home_url('/')); ?>">
			<label>
				<span class="screen-reader-text"><?php esc_html_e('Search', 'wansati'); ?></span>
				<input type="search" name="s" value="<?php echo esc_attr(get_search_query()); ?>" placeholder="<?php esc_attr_e('Search products, collections, and pages', 'wansati'); ?>" data-search-overlay-input>
			</label>
			<button class="wansati-button wansati-button--dark" type="submit"><?php esc_html_e('Search', 'wansati'); ?></button>
		</form>

		<div class="wansati-search-overlay__suggestions">
			<?php if (! empty($suggested_terms) && ! is_wp_error($suggested_terms)) : ?>
				<?php foreach ($suggested_terms as $suggested_term) : ?>
					<?php $suggested_term_link = get_term_link($suggested_term); ?>
					<?php if (! is_wp_error($suggested_term_link)) : ?>
						<a href="<?php echo esc_url($suggested_term_link); ?>"><?php echo esc_html($suggested_term->name); ?></a>
					<?php endif; ?>
				<?php endforeach; ?>
			<?php else : ?>
				<?php foreach ($fallback_suggestions as $suggestion) : ?>
					<a href="<?php echo esc_url($suggestion['url']); ?>"><?php echo esc_html($suggestion['label']); ?></a>
				<?php endforeach; ?>
			<?php endif; ?>
		</div>
	</div>
</div>

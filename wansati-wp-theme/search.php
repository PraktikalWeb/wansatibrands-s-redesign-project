<?php
/**
 * Search results template.
 *
 * @package Wansati
 */

get_header();

$result_count = (int) $GLOBALS['wp_query']->found_posts;
?>
<main id="primary" class="site-main">
	<section class="wansati-page-hero">
		<div class="wansati-container">
			<p class="wansati-page-hero__eyebrow"><?php esc_html_e('Site Search', 'wansati'); ?></p>
			<h1 class="wansati-page-hero__title">
				<?php
				printf(
					/* translators: %s: search query. */
					esc_html__('Results for “%s”', 'wansati'),
					esc_html(get_search_query())
				);
				?>
			</h1>
			<form class="wansati-search-form wansati-search-form--hero" role="search" method="get" action="<?php echo esc_url(home_url('/')); ?>">
				<label>
					<span class="screen-reader-text"><?php esc_html_e('Search', 'wansati'); ?></span>
					<input type="search" name="s" value="<?php echo esc_attr(get_search_query()); ?>" placeholder="<?php esc_attr_e('Search products, collections, articles, and pages', 'wansati'); ?>">
				</label>
				<button class="wansati-button wansati-button--dark" type="submit"><?php esc_html_e('Search', 'wansati'); ?></button>
			</form>
		</div>
	</section>

	<section class="wansati-page-shell wansati-container">
		<?php if (have_posts()) : ?>
			<div class="wansati-search-results__summary">
				<?php
				printf(
					/* translators: %d: result count. */
					esc_html(_n('%d result found', '%d results found', $result_count, 'wansati')),
					$result_count
				);
				?>
			</div>

			<div class="wansati-search-results__grid">
				<?php while (have_posts()) : the_post(); ?>
					<?php if ('product' === get_post_type() && function_exists('wc_get_product') && class_exists('WC_Product')) : ?>
						<?php
						$search_product = wc_get_product(get_the_ID());

						if ($search_product instanceof WC_Product) {
							get_template_part('template-parts/components/product-card', null, array('product' => $search_product));
							continue;
						}
						?>
					<?php endif; ?>

					<article <?php post_class('wansati-post-card'); ?>>
						<a class="wansati-post-card__link" href="<?php the_permalink(); ?>">
							<?php if (has_post_thumbnail()) : ?>
								<div class="wansati-post-card__media">
									<?php the_post_thumbnail('large'); ?>
								</div>
							<?php endif; ?>
							<div class="wansati-post-card__content">
								<p class="wansati-post-card__eyebrow"><?php echo esc_html(get_post_type_object(get_post_type())->labels->singular_name ?? __('Result', 'wansati')); ?></p>
								<h2><?php the_title(); ?></h2>
								<p><?php echo esc_html(wp_trim_words(get_the_excerpt(), 30)); ?></p>
							</div>
						</a>
					</article>
				<?php endwhile; ?>
			</div>
			<?php the_posts_pagination(); ?>
		<?php else : ?>
			<div class="wansati-empty-state">
				<h2><?php esc_html_e('No results found.', 'wansati'); ?></h2>
				<p><?php esc_html_e('Try a broader term or browse the shop and collections instead.', 'wansati'); ?></p>
			</div>
		<?php endif; ?>
	</section>
</main>
<?php
get_footer();

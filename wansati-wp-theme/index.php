<?php
/**
 * Main fallback template.
 *
 * @package Wansati
 */

get_header();
?>
<main id="primary" class="site-main">
	<section class="wansati-page-shell wansati-container">
		<?php if (have_posts()) : ?>
			<div class="wansati-post-grid">
				<?php
				while (have_posts()) :
					the_post();
					?>
					<article <?php post_class('wansati-post-card'); ?>>
						<a class="wansati-post-card__link" href="<?php the_permalink(); ?>">
							<?php if (has_post_thumbnail()) : ?>
								<div class="wansati-post-card__media">
									<?php the_post_thumbnail('large'); ?>
								</div>
							<?php endif; ?>
							<div class="wansati-post-card__content">
								<p class="wansati-post-card__eyebrow"><?php echo esc_html(get_post_type_object(get_post_type())->labels->singular_name ?? __('Post', 'wansati')); ?></p>
								<h2><?php the_title(); ?></h2>
								<p><?php echo esc_html(wp_trim_words(get_the_excerpt(), 26)); ?></p>
							</div>
						</a>
					</article>
				<?php endwhile; ?>
			</div>
			<?php the_posts_pagination(); ?>
		<?php else : ?>
			<div class="wansati-empty-state">
				<h1><?php esc_html_e('Nothing found', 'wansati'); ?></h1>
				<p><?php esc_html_e('This content is not available yet.', 'wansati'); ?></p>
			</div>
		<?php endif; ?>
	</section>
</main>
<?php
get_footer();

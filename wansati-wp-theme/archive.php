<?php
/**
 * Archive template.
 *
 * @package Wansati
 */

get_header();
?>
<main id="primary" class="site-main">
	<section class="wansati-page-hero">
		<div class="wansati-container">
			<p class="wansati-page-hero__eyebrow"><?php esc_html_e('Archive', 'wansati'); ?></p>
			<h1 class="wansati-page-hero__title"><?php the_archive_title(); ?></h1>
			<?php the_archive_description('<div class="wansati-page-hero__description">', '</div>'); ?>
		</div>
	</section>

	<section class="wansati-page-shell wansati-container">
		<?php if (have_posts()) : ?>
			<div class="wansati-post-grid">
				<?php while (have_posts()) : the_post(); ?>
					<article <?php post_class('wansati-post-card'); ?>>
						<a class="wansati-post-card__link" href="<?php the_permalink(); ?>">
							<?php if (has_post_thumbnail()) : ?>
								<div class="wansati-post-card__media">
									<?php the_post_thumbnail('large'); ?>
								</div>
							<?php endif; ?>
							<div class="wansati-post-card__content">
								<p class="wansati-post-card__eyebrow"><?php echo esc_html(get_the_date()); ?></p>
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
				<h2><?php esc_html_e('No posts available yet.', 'wansati'); ?></h2>
			</div>
		<?php endif; ?>
	</section>
</main>
<?php
get_footer();

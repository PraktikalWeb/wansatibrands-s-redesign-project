<?php
/**
 * Single post template.
 *
 * @package Wansati
 */

get_header();
?>
<main id="primary" class="site-main">
	<?php while (have_posts()) : the_post(); ?>
		<section class="wansati-page-hero">
			<div class="wansati-container">
				<p class="wansati-page-hero__eyebrow"><?php esc_html_e('Journal Entry', 'wansati'); ?></p>
				<h1 class="wansati-page-hero__title"><?php the_title(); ?></h1>
				<p class="wansati-page-hero__meta"><?php echo esc_html(get_the_date()); ?> · <?php the_author(); ?></p>
			</div>
		</section>

		<section class="wansati-page-shell wansati-container">
			<article <?php post_class('wansati-content-card wansati-content-card--article'); ?>>
				<?php if (has_post_thumbnail()) : ?>
					<div class="wansati-article-featured-image">
						<?php the_post_thumbnail('full'); ?>
					</div>
				<?php endif; ?>

				<div class="wansati-entry-content">
					<?php the_content(); ?>
				</div>
			</article>
		</section>
	<?php endwhile; ?>
</main>
<?php
get_footer();

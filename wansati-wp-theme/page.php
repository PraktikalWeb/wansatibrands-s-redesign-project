<?php
/**
 * Standard page template.
 *
 * @package Wansati
 */

get_header();

$is_woocommerce_shell_page = function_exists('is_cart') && (is_cart() || is_checkout() || is_account_page());
?>
<?php if ($is_woocommerce_shell_page) : ?>
	<?php while (have_posts()) : the_post(); ?>
		<?php the_content(); ?>
	<?php endwhile; ?>
<?php else : ?>
	<main id="primary" class="site-main">
		<?php while (have_posts()) : the_post(); ?>
			<section class="wansati-page-hero">
				<div class="wansati-container">
					<p class="wansati-page-hero__eyebrow"><?php esc_html_e('Page', 'wansati'); ?></p>
					<h1 class="wansati-page-hero__title"><?php the_title(); ?></h1>
				</div>
			</section>

			<section class="wansati-page-shell wansati-container">
				<article <?php post_class('wansati-content-card'); ?>>
					<?php the_content(); ?>
				</article>
			</section>
		<?php endwhile; ?>
	</main>
<?php endif; ?>
<?php
get_footer();

<?php
/**
 * 404 template.
 *
 * @package Wansati
 */

get_header();
?>
<main id="primary" class="site-main">
	<section class="wansati-page-shell wansati-container">
		<div class="wansati-empty-state wansati-empty-state--large">
			<p class="wansati-empty-state__eyebrow"><?php esc_html_e('404', 'wansati'); ?></p>
			<h1><?php esc_html_e('The page you requested could not be found.', 'wansati'); ?></h1>
			<p><?php esc_html_e('The redesign scaffold is in place, but this route does not exist yet on the WordPress side.', 'wansati'); ?></p>
			<div class="wansati-inline-actions">
				<a class="wansati-button wansati-button--primary" href="<?php echo esc_url(home_url('/')); ?>">
					<?php esc_html_e('Return Home', 'wansati'); ?>
				</a>
				<a class="wansati-button wansati-button--secondary" href="<?php echo esc_url(wansati_theme_get_shop_url()); ?>">
					<?php esc_html_e('Browse Shop', 'wansati'); ?>
				</a>
			</div>
		</div>
	</section>
</main>
<?php
get_footer();

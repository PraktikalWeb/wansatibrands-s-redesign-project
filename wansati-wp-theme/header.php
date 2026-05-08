<?php
/**
 * The header for the theme.
 *
 * @package Wansati
 */

if (! defined('ABSPATH')) {
	exit;
}

$menu_items  = wansati_theme_get_primary_menu_items();
$account_url = wansati_theme_get_account_url();
$cart_count  = function_exists('WC') && WC()->cart ? WC()->cart->get_cart_contents_count() : 0;
?>
<!doctype html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo('charset'); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

<div id="page" class="site">
	<header id="masthead" class="site-header wansati-header" data-header>
		<div class="wansati-header__inner wansati-container">
			<div class="wansati-header__top">
				<button class="wansati-header__mobile-toggle" type="button" data-open-panel="wansati-mobile-menu" aria-controls="wansati-mobile-menu" aria-expanded="false">
					<?php echo wansati_theme_get_icon_svg('menu'); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
					<span class="screen-reader-text"><?php esc_html_e('Open menu', 'wansati'); ?></span>
				</button>

				<div class="wansati-brand">
					<?php if (has_custom_logo()) : ?>
						<?php the_custom_logo(); ?>
					<?php else : ?>
						<a class="wansati-brand__wordmark" href="<?php echo esc_url(home_url('/')); ?>">
							<span><?php bloginfo('name'); ?></span>
						</a>
					<?php endif; ?>
				</div>

				<form class="wansati-header-search wansati-header-search--desktop" role="search" method="get" action="<?php echo esc_url(home_url('/')); ?>">
					<label>
						<span class="screen-reader-text"><?php esc_html_e('Search the site', 'wansati'); ?></span>
						<input type="search" name="s" value="<?php echo esc_attr(get_search_query()); ?>" placeholder="<?php esc_attr_e('Search products, collections, and stories', 'wansati'); ?>">
					</label>
					<button type="submit">
						<?php echo wansati_theme_get_icon_svg('search'); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
						<span class="screen-reader-text"><?php esc_html_e('Submit search', 'wansati'); ?></span>
					</button>
				</form>

				<div class="wansati-header__actions">
					<button class="wansati-icon-button wansati-header-search-toggle" type="button" data-open-search aria-controls="wansati-search-overlay" aria-expanded="false">
						<?php echo wansati_theme_get_icon_svg('search'); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
						<span class="screen-reader-text"><?php esc_html_e('Open search', 'wansati'); ?></span>
					</button>
					<a class="wansati-icon-button" href="<?php echo esc_url($account_url); ?>">
						<?php echo wansati_theme_get_icon_svg('user'); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
						<span class="screen-reader-text"><?php esc_html_e('My account', 'wansati'); ?></span>
					</a>
					<button class="wansati-icon-button" type="button" data-open-panel="wansati-side-wishlist" aria-controls="wansati-side-wishlist" aria-expanded="false">
						<?php echo wansati_theme_get_icon_svg('heart'); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
						<span class="screen-reader-text"><?php esc_html_e('Open wishlist', 'wansati'); ?></span>
					</button>
					<button class="wansati-icon-button" type="button" data-open-panel="wansati-side-cart" aria-controls="wansati-side-cart" aria-expanded="false">
						<?php echo wansati_theme_get_icon_svg('bag'); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
						<span class="wansati-icon-button__count" data-wansati-cart-count><?php echo esc_html((string) $cart_count); ?></span>
						<span class="screen-reader-text"><?php esc_html_e('Open cart', 'wansati'); ?></span>
					</button>
				</div>
			</div>

			<?php get_template_part('template-parts/header/mega-menu', null, array('menu_items' => $menu_items)); ?>
		</div>
	</header>

	<?php get_template_part('template-parts/header/mobile-menu', null, array('menu_items' => $menu_items)); ?>
	<?php get_template_part('template-parts/components/search-overlay'); ?>
	<?php get_template_part('template-parts/components/side-cart'); ?>
	<?php get_template_part('template-parts/components/side-wishlist'); ?>

	<div id="content" class="site-content">

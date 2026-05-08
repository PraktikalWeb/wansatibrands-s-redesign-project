<?php
/**
 * Wansati theme functions and definitions.
 *
 * @package Wansati
 */

if (! defined('ABSPATH')) {
	exit;
}

define('WANSATI_THEME_VERSION', '0.1.0');

/**
 * Resolve a theme asset version from filemtime where possible.
 */
function wansati_theme_asset_version(string $relative_path): string {
	$absolute_path = get_theme_file_path($relative_path);

	if (file_exists($absolute_path)) {
		return (string) filemtime($absolute_path);
	}

	return WANSATI_THEME_VERSION;
}

/**
 * Theme setup.
 */
function wansati_theme_setup(): void {
	load_theme_textdomain('wansati', get_template_directory() . '/languages');

	add_theme_support('title-tag');
	add_theme_support('post-thumbnails');
	add_theme_support('custom-logo', array(
		'height'      => 120,
		'width'       => 360,
		'flex-height' => true,
		'flex-width'  => true,
	));
	add_theme_support(
		'html5',
		array(
			'search-form',
			'comment-form',
			'comment-list',
			'gallery',
			'caption',
			'style',
			'script',
		)
	);
	add_theme_support('editor-styles');
	add_editor_style('assets/css/main.css');

	add_theme_support('woocommerce');
	add_theme_support('wc-product-gallery-zoom');
	add_theme_support('wc-product-gallery-lightbox');
	add_theme_support('wc-product-gallery-slider');

	register_nav_menus(
		array(
			'primary' => __('Primary Menu', 'wansati'),
			'footer'  => __('Footer Menu', 'wansati'),
			'legal'   => __('Legal Menu', 'wansati'),
		)
	);

	add_image_size('wansati-product-card', 720, 960, true);
	add_image_size('wansati-collection-card', 1200, 1500, true);
	add_image_size('wansati-hero', 1920, 2400, true);
}
add_action('after_setup_theme', 'wansati_theme_setup');

/**
 * Enqueue theme assets.
 */
function wansati_theme_enqueue_assets(): void {
	wp_enqueue_style('wansati-style', get_stylesheet_uri(), array(), wansati_theme_asset_version('/style.css'));
	wp_enqueue_style('wansati-main', get_theme_file_uri('/assets/css/main.css'), array('wansati-style'), wansati_theme_asset_version('/assets/css/main.css'));
	wp_enqueue_style('wansati-woocommerce', get_theme_file_uri('/assets/css/woocommerce.css'), array('wansati-main'), wansati_theme_asset_version('/assets/css/woocommerce.css'));
	wp_enqueue_style('wansati-responsive', get_theme_file_uri('/assets/css/responsive.css'), array('wansati-main', 'wansati-woocommerce'), wansati_theme_asset_version('/assets/css/responsive.css'));

	wp_enqueue_script('wansati-main', get_theme_file_uri('/assets/js/main.js'), array(), wansati_theme_asset_version('/assets/js/main.js'), true);
	$side_cart_dependencies = array('wansati-main');

	if (class_exists('WooCommerce')) {
		$side_cart_dependencies[] = 'wc-cart-fragments';
	}

	wp_enqueue_script('wansati-side-cart', get_theme_file_uri('/assets/js/side-cart.js'), $side_cart_dependencies, wansati_theme_asset_version('/assets/js/side-cart.js'), true);
	wp_enqueue_script('wansati-wishlist', get_theme_file_uri('/assets/js/wishlist.js'), array('wansati-main'), wansati_theme_asset_version('/assets/js/wishlist.js'), true);
	wp_enqueue_script('wansati-search', get_theme_file_uri('/assets/js/search.js'), array('wansati-main'), wansati_theme_asset_version('/assets/js/search.js'), true);
	wp_enqueue_script('wansati-filters', get_theme_file_uri('/assets/js/filters.js'), array('wansati-main'), wansati_theme_asset_version('/assets/js/filters.js'), true);

	wp_localize_script(
		'wansati-main',
		'wansatiTheme',
		array(
			'ajaxUrl'       => admin_url('admin-ajax.php'),
			'homeUrl'       => home_url('/'),
			'shopUrl'       => function_exists('wc_get_page_permalink') ? wc_get_page_permalink('shop') : home_url('/shop/'),
			'cartUrl'       => function_exists('wc_get_cart_url') ? wc_get_cart_url() : home_url('/cart/'),
			'checkoutUrl'   => function_exists('wc_get_checkout_url') ? wc_get_checkout_url() : home_url('/checkout/'),
			'accountUrl'    => function_exists('wc_get_page_permalink') ? wc_get_page_permalink('myaccount') : wp_login_url(),
			'isWooEnabled'  => class_exists('WooCommerce'),
			'isUserLoggedIn'=> is_user_logged_in(),
		)
	);

	if (is_singular() && comments_open() && get_option('thread_comments')) {
		wp_enqueue_script('comment-reply');
	}

	if (class_exists('WooCommerce')) {
		wp_enqueue_script('wc-add-to-cart');
	}
}
add_action('wp_enqueue_scripts', 'wansati_theme_enqueue_assets');

/**
 * Safe head cleanup.
 */
function wansati_theme_cleanup(): void {
	remove_action('wp_head', 'wp_generator');
	remove_action('wp_head', 'rsd_link');
	remove_action('wp_head', 'wlwmanifest_link');
}
add_action('init', 'wansati_theme_cleanup');

/**
 * Replace WooCommerce wrappers with theme wrappers.
 */
function wansati_theme_setup_woocommerce_wrappers(): void {
	if (! class_exists('WooCommerce')) {
		return;
	}

	remove_action('woocommerce_before_main_content', 'woocommerce_output_content_wrapper', 10);
	remove_action('woocommerce_after_main_content', 'woocommerce_output_content_wrapper_end', 10);

	add_action('woocommerce_before_main_content', 'wansati_theme_woocommerce_wrapper_open', 10);
	add_action('woocommerce_after_main_content', 'wansati_theme_woocommerce_wrapper_close', 10);
}
add_action('after_setup_theme', 'wansati_theme_setup_woocommerce_wrappers', 20);

/**
 * Move the default shop ordering and count into the custom archive toolbar.
 */
function wansati_theme_customize_shop_loop_actions(): void {
	if (! class_exists('WooCommerce')) {
		return;
	}

	remove_action('woocommerce_before_shop_loop', 'woocommerce_result_count', 20);
	remove_action('woocommerce_before_shop_loop', 'woocommerce_catalog_ordering', 30);
}
add_action('after_setup_theme', 'wansati_theme_customize_shop_loop_actions', 25);

/**
 * Open WooCommerce wrapper.
 */
function wansati_theme_woocommerce_wrapper_open(): void {
	echo '<main id="primary" class="site-main site-main--woocommerce"><div class="wansati-container">';
}

/**
 * Close WooCommerce wrapper.
 */
function wansati_theme_woocommerce_wrapper_close(): void {
	echo '</div></main>';
}

/**
 * WooCommerce layout defaults.
 *
 * @param array<string, mixed> $args Related args.
 * @return array<string, mixed>
 */
function wansati_theme_related_products_args(array $args): array {
	$args['posts_per_page'] = 4;
	$args['columns']        = 4;

	return $args;
}
add_filter('woocommerce_output_related_products_args', 'wansati_theme_related_products_args');

/**
 * Use four shop columns on large layouts.
 */
function wansati_theme_loop_shop_columns(): int {
	return 4;
}
add_filter('loop_shop_columns', 'wansati_theme_loop_shop_columns');

/**
 * Keep theme cart UI in sync with WooCommerce fragments.
 *
 * @param array<string, string> $fragments Fragment map.
 * @return array<string, string>
 */
function wansati_theme_cart_fragments(array $fragments): array {
	if (! function_exists('WC') || ! WC()->cart) {
		return $fragments;
	}

	ob_start();
	?>
	<span class="wansati-icon-button__count" data-wansati-cart-count><?php echo esc_html((string) WC()->cart->get_cart_contents_count()); ?></span>
	<?php
	$fragments['[data-wansati-cart-count]'] = ob_get_clean();

	ob_start();
	?>
	<div class="wansati-panel__body" data-wansati-mini-cart>
		<?php woocommerce_mini_cart(); ?>
	</div>
	<?php
	$fragments['[data-wansati-mini-cart]'] = ob_get_clean();

	return $fragments;
}
add_filter('woocommerce_add_to_cart_fragments', 'wansati_theme_cart_fragments');

/**
 * Ensure front-end search includes products alongside pages and posts.
 */
function wansati_theme_tune_search_query(WP_Query $query): void {
	if (is_admin() || ! $query->is_main_query() || ! $query->is_search()) {
		return;
	}

	$query->set('post_type', array('product', 'page', 'post'));
}
add_action('pre_get_posts', 'wansati_theme_tune_search_query');

/**
 * Resolve the shop URL safely.
 */
function wansati_theme_get_shop_url(): string {
	if (function_exists('wc_get_page_permalink')) {
		$shop_url = wc_get_page_permalink('shop');

		if ($shop_url) {
			return $shop_url;
		}
	}

	return home_url('/shop/');
}

/**
 * Resolve a collection or category URL from a product category slug.
 */
function wansati_theme_get_collection_url(string $slug = ''): string {
	if ($slug === '') {
		return wansati_theme_get_shop_url();
	}

	$term = get_term_by('slug', $slug, 'product_cat');

	if ($term && ! is_wp_error($term)) {
		$link = get_term_link($term);

		if (! is_wp_error($link)) {
			return $link;
		}
	}

	return wansati_theme_get_shop_url();
}

/**
 * Resolve a product category image by slug, falling back to the provided URL.
 */
function wansati_theme_get_collection_image_url(string $slug, string $fallback = ''): string {
	$term = get_term_by('slug', $slug, 'product_cat');

	if ($term && ! is_wp_error($term)) {
		$thumbnail_id = (int) get_term_meta($term->term_id, 'thumbnail_id', true);

		if ($thumbnail_id) {
			$image_url = wp_get_attachment_image_url($thumbnail_id, 'wansati-collection-card');

			if ($image_url) {
				return $image_url;
			}
		}
	}

	return $fallback;
}

/**
 * Return a product category count by slug.
 */
function wansati_theme_get_collection_count(string $slug): int {
	$term = get_term_by('slug', $slug, 'product_cat');

	if ($term && ! is_wp_error($term)) {
		return (int) $term->count;
	}

	return 0;
}

/**
 * Build a collection card context from product category data with design fallbacks.
 *
 * @param array<string, mixed> $defaults Card defaults.
 * @return array<string, mixed>
 */
function wansati_theme_get_collection_card_context(array $defaults): array {
	$slug      = isset($defaults['slug']) ? (string) $defaults['slug'] : '';
	$image_url = isset($defaults['image']) ? (string) $defaults['image'] : '';
	$title     = isset($defaults['title']) ? (string) $defaults['title'] : '';
	$eyebrow   = isset($defaults['eyebrow']) ? (string) $defaults['eyebrow'] : '';
	$cta       = isset($defaults['cta']) ? (string) $defaults['cta'] : __('Shop Now', 'wansati');
	$fit       = isset($defaults['fit']) ? (string) $defaults['fit'] : 'cover';
	$count     = 0;
	$url       = $slug !== '' ? wansati_theme_get_collection_url($slug) : '#';

	if ($slug !== '') {
		$term = get_term_by('slug', $slug, 'product_cat');

		if ($term && ! is_wp_error($term)) {
			$title     = $term->name ?: $title;
			$count     = (int) $term->count;
			$image_url = wansati_theme_get_collection_image_url($slug, $image_url);
		}
	}

	return array(
		'title'     => $title,
		'url'       => $url,
		'image_url' => $image_url,
		'eyebrow'   => $eyebrow,
		'count'     => $count,
		'cta'       => $cta,
		'fit'       => $fit,
	);
}

/**
 * Build the default navigation map from the React design.
 *
 * @return array<int, array<string, mixed>>
 */
function wansati_theme_get_default_navigation(): array {
	return array(
		array(
			'title'    => __('Women', 'wansati'),
			'slug'     => 'women',
			'children' => array(
				array('title' => __('New Arrivals', 'wansati'), 'slug' => 'new-arrivals'),
				array('title' => __('Dresses', 'wansati'), 'slug' => 'dresses'),
				array('title' => __('African Print', 'wansati'), 'slug' => 'african-print'),
				array('title' => __('Everyday Wear', 'wansati'), 'slug' => 'everyday-wear'),
				array('title' => __('Exclusive Range', 'wansati'), 'slug' => 'exclusive-range'),
				array('title' => __('Two-piece Sets', 'wansati'), 'slug' => 'two-piece-set'),
				array('title' => __('Kimono', 'wansati'), 'slug' => 'kimono'),
				array('title' => __('Fragrance', 'wansati'), 'slug' => 'women-fragrance'),
			),
		),
		array(
			'title'    => __('Men', 'wansati'),
			'slug'     => 'men',
			'children' => array(
				array('title' => __('African Print', 'wansati'), 'slug' => 'african-print'),
				array('title' => __('Fragrance', 'wansati'), 'slug' => 'men-fragrance'),
			),
		),
		array(
			'title'    => __('Kids', 'wansati'),
			'slug'     => 'kids',
			'children' => array(
				array('title' => __('Boys', 'wansati'), 'slug' => 'boys'),
				array('title' => __('Girls', 'wansati'), 'slug' => 'girls'),
			),
		),
		array(
			'title'    => __('Body Care', 'wansati'),
			'slug'     => 'body-care',
			'children' => array(
				array('title' => __('Bathing', 'wansati'), 'slug' => 'bathing'),
				array('title' => __('Foot Care', 'wansati'), 'slug' => 'foot-care'),
				array('title' => __('Facial Care', 'wansati'), 'slug' => 'facial-care'),
			),
		),
		array(
			'title'    => __('Fragrance', 'wansati'),
			'slug'     => 'fragrances',
			'children' => array(
				array('title' => __('Women', 'wansati'), 'slug' => 'women-fragrance'),
				array('title' => __('Men', 'wansati'), 'slug' => 'men-fragrance'),
				array('title' => __('Unisex', 'wansati'), 'slug' => 'unisex-fragrance'),
				array('title' => __('Home', 'wansati'), 'slug' => 'home-fragrance'),
			),
		),
		array(
			'title'    => __('Home & Living', 'wansati'),
			'slug'     => 'home-fragrance',
			'children' => array(),
		),
		array(
			'title'    => __('Sale', 'wansati'),
			'slug'     => 'sale',
			'highlight'=> true,
			'children' => array(),
		),
	);
}

/**
 * Get menu items for the header. Prefer WordPress menus, otherwise use the design fallback.
 *
 * @return array<int, array<string, mixed>>
 */
function wansati_theme_get_primary_menu_items(): array {
	$locations = get_nav_menu_locations();
	$fallback  = wansati_theme_get_default_navigation();

	if (empty($locations['primary'])) {
		return $fallback;
	}

	$menu_items = wp_get_nav_menu_items($locations['primary']);

	if (empty($menu_items)) {
		return $fallback;
	}

	$indexed = array();
	$tree    = array();

	foreach ($menu_items as $menu_item) {
		$indexed[$menu_item->ID] = array(
			'id'        => (int) $menu_item->ID,
			'title'     => $menu_item->title,
			'url'       => $menu_item->url,
			'highlight' => in_array('is-sale', (array) $menu_item->classes, true),
			'children'  => array(),
		);
	}

	foreach ($menu_items as $menu_item) {
		$parent_id = (int) $menu_item->menu_item_parent;
		$item_id   = (int) $menu_item->ID;

		if ($parent_id > 0 && isset($indexed[$parent_id])) {
			$indexed[$parent_id]['children'][] = $indexed[$item_id];
			continue;
		}

		$tree[] = $indexed[$item_id];
	}

	return $tree;
}

/**
 * Footer menu fallback.
 *
 * @return array<int, array<string, string>>
 */
function wansati_theme_get_footer_link_fallback(): array {
	return array(
		array('label' => __('Home', 'wansati'), 'url' => home_url('/')),
		array('label' => __('About Us', 'wansati'), 'url' => home_url('/about/')),
		array('label' => __('Shop', 'wansati'), 'url' => wansati_theme_get_shop_url()),
		array('label' => __('Blog', 'wansati'), 'url' => home_url('/blog/')),
		array('label' => __('Contact', 'wansati'), 'url' => home_url('/contact/')),
		array('label' => __('Privacy Policy', 'wansati'), 'url' => home_url('/privacy-policy/')),
		array('label' => __('Terms & Conditions', 'wansati'), 'url' => home_url('/terms-and-conditions/')),
		array('label' => __('Returns Policy', 'wansati'), 'url' => home_url('/returns-policy/')),
	);
}

/**
 * Get WooCommerce account URL safely.
 */
function wansati_theme_get_account_url(): string {
	if (function_exists('wc_get_page_permalink')) {
		$account_url = wc_get_page_permalink('myaccount');

		if ($account_url) {
			return $account_url;
		}
	}

	return wp_login_url();
}

/**
 * Inline icon set used across the initial scaffold.
 */
function wansati_theme_get_icon_svg(string $icon, string $class = ''): string {
	$icons = array(
		'search'       => '<svg class="%1$s" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="7"></circle><path d="m20 20-3.5-3.5"></path></svg>',
		'user'         => '<svg class="%1$s" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 21a8 8 0 0 0-16 0"></path><circle cx="12" cy="8" r="4"></circle></svg>',
		'heart'        => '<svg class="%1$s" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m12 20.8-1.1-1C5.2 14.7 2 11.8 2 8.3 2 5.5 4.2 3.3 7 3.3c1.6 0 3.2.7 4.2 1.9 1-1.2 2.6-1.9 4.2-1.9 2.8 0 5 2.2 5 5 0 3.5-3.2 6.4-8.9 11.5Z"></path></svg>',
		'bag'          => '<svg class="%1$s" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 7h12l1 13H5L6 7Z"></path><path d="M9 7a3 3 0 0 1 6 0"></path></svg>',
		'menu'         => '<svg class="%1$s" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 6h18"></path><path d="M3 12h18"></path><path d="M3 18h18"></path></svg>',
		'close'        => '<svg class="%1$s" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>',
		'arrow-right'  => '<svg class="%1$s" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14"></path><path d="m13 5 7 7-7 7"></path></svg>',
		'chevron-down' => '<svg class="%1$s" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"></path></svg>',
		'truck'        => '<svg class="%1$s" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 17H5V6h10v11"></path><path d="M10 9h6l3 3v5h-3"></path><circle cx="8" cy="18" r="2"></circle><circle cx="18" cy="18" r="2"></circle></svg>',
		'crown'        => '<svg class="%1$s" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m3 8 4.5 4L12 5l4.5 7L21 8l-2 11H5L3 8Z"></path></svg>',
		'gem'          => '<svg class="%1$s" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 3-3 6 9 12 9-12-3-6H6Z"></path><path d="m3 9h18"></path><path d="m9 3 3 6 3-6"></path></svg>',
		'shield-check' => '<svg class="%1$s" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3 5 6v6c0 5 3.5 8 7 9 3.5-1 7-4 7-9V6l-7-3Z"></path><path d="m9.5 12 1.8 1.8 3.7-3.8"></path></svg>',
	);

	if (! isset($icons[$icon])) {
		return '';
	}

	return sprintf($icons[$icon], esc_attr(trim('wansati-icon ' . $class)));
}

/**
 * Fallback output for the wishlist drawer until a dedicated wishlist plugin is chosen.
 */
function wansati_theme_render_wishlist_placeholder(): void {
	echo '<div class="wansati-empty-state">';
	echo '<p class="wansati-empty-state__eyebrow">' . esc_html__('Wishlist', 'wansati') . '</p>';
	echo '<h3>' . esc_html__('Wishlist integration is ready for phase 2.', 'wansati') . '</h3>';
	echo '<p>' . esc_html__('This drawer is scaffolded for a future plugin or custom wishlist implementation without affecting WooCommerce cart and checkout behavior.', 'wansati') . '</p>';
	echo '</div>';
}
add_action('wansati_theme_wishlist_drawer', 'wansati_theme_render_wishlist_placeholder', 10);

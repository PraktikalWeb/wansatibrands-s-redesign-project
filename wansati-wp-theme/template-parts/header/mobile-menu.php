<?php
/**
 * Mobile menu drawer.
 *
 * @package Wansati
 */

if (! defined('ABSPATH')) {
	exit;
}

$menu_items = $args['menu_items'] ?? array();
?>
<aside id="wansati-mobile-menu" class="wansati-panel wansati-panel--menu" aria-hidden="true">
	<div class="wansati-panel__dialog">
		<div class="wansati-panel__header">
			<p class="wansati-panel__eyebrow"><?php esc_html_e('Navigation', 'wansati'); ?></p>
			<button type="button" class="wansati-panel__close" data-close-panel="wansati-mobile-menu">
				<?php echo wansati_theme_get_icon_svg('close'); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
				<span class="screen-reader-text"><?php esc_html_e('Close menu', 'wansati'); ?></span>
			</button>
		</div>

		<nav class="wansati-mobile-nav" aria-label="<?php esc_attr_e('Mobile menu', 'wansati'); ?>">
			<ul class="wansati-mobile-nav__list">
				<?php foreach ($menu_items as $item) : ?>
					<?php
					$item_title = $item['title'] ?? '';
					$item_url   = $item['url'] ?? wansati_theme_get_collection_url($item['slug'] ?? '');
					$children   = $item['children'] ?? array();
					?>
					<li class="wansati-mobile-nav__item">
						<a class="wansati-mobile-nav__link" href="<?php echo esc_url($item_url); ?>">
							<span><?php echo esc_html($item_title); ?></span>
							<?php echo wansati_theme_get_icon_svg('arrow-right', 'wansati-mobile-nav__arrow'); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
						</a>

						<?php if (! empty($children)) : ?>
							<ul class="wansati-mobile-nav__sublist">
								<?php foreach ($children as $child) : ?>
									<?php
									$child_title = $child['title'] ?? '';
									$child_url   = $child['url'] ?? wansati_theme_get_collection_url($child['slug'] ?? '');
									?>
									<li>
										<a href="<?php echo esc_url($child_url); ?>"><?php echo esc_html($child_title); ?></a>
									</li>
								<?php endforeach; ?>
							</ul>
						<?php endif; ?>
					</li>
				<?php endforeach; ?>
			</ul>
		</nav>
	</div>
</aside>

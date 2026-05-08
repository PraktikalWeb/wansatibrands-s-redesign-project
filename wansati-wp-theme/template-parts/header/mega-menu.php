<?php
/**
 * Desktop navigation and mega menu.
 *
 * @package Wansati
 */

if (! defined('ABSPATH')) {
	exit;
}

$menu_items = $args['menu_items'] ?? array();
?>
<nav class="wansati-nav wansati-nav--desktop" aria-label="<?php esc_attr_e('Primary menu', 'wansati'); ?>">
	<ul class="wansati-nav__list">
		<?php foreach ($menu_items as $item) : ?>
			<?php
			$item_title = $item['title'] ?? '';
			$item_url   = $item['url'] ?? wansati_theme_get_collection_url($item['slug'] ?? '');
			$children   = $item['children'] ?? array();
			$highlight  = ! empty($item['highlight']);
			?>
			<li class="wansati-nav__item<?php echo $highlight ? ' is-highlight' : ''; ?>">
				<a class="wansati-nav__link" href="<?php echo esc_url($item_url); ?>">
					<?php echo esc_html($item_title); ?>
					<?php if (! empty($children)) : ?>
						<?php echo wansati_theme_get_icon_svg('chevron-down', 'wansati-nav__chevron'); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
					<?php endif; ?>
				</a>

				<?php if (! empty($children)) : ?>
					<div class="wansati-mega-menu">
						<div class="wansati-mega-menu__inner">
							<p class="wansati-mega-menu__eyebrow">
								<?php
								printf(
									/* translators: %s: menu title. */
									esc_html__('Explore %s', 'wansati'),
									esc_html($item_title)
								);
								?>
							</p>
							<ul class="wansati-mega-menu__links">
								<?php foreach ($children as $child) : ?>
									<?php
									$child_title = $child['title'] ?? '';
									$child_url   = $child['url'] ?? wansati_theme_get_collection_url($child['slug'] ?? '');
									?>
									<li>
										<a href="<?php echo esc_url($child_url); ?>">
											<span><?php echo esc_html($child_title); ?></span>
											<?php echo wansati_theme_get_icon_svg('arrow-right', 'wansati-mega-menu__arrow'); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
										</a>
									</li>
								<?php endforeach; ?>
							</ul>
							<a class="wansati-mega-menu__shop-all" href="<?php echo esc_url($item_url); ?>">
								<?php
								printf(
									/* translators: %s: menu title. */
									esc_html__('Shop All %s', 'wansati'),
									esc_html($item_title)
								);
								?>
							</a>
						</div>
					</div>
				<?php endif; ?>
			</li>
		<?php endforeach; ?>
	</ul>
</nav>

<?php
/**
 * Reusable collection card component.
 *
 * @package Wansati
 */

if (! defined('ABSPATH')) {
	exit;
}

$title     = $args['title'] ?? '';
$url       = $args['url'] ?? '#';
$image_url = $args['image_url'] ?? '';
$eyebrow   = $args['eyebrow'] ?? '';
$count     = $args['count'] ?? 0;
$cta       = $args['cta'] ?? __('Shop Now', 'wansati');
$fit       = $args['fit'] ?? 'cover';
?>
<article class="wansati-collection-card">
	<a class="wansati-collection-card__link" href="<?php echo esc_url($url); ?>">
		<div class="wansati-collection-card__image-wrap">
			<?php if ($image_url) : ?>
				<img class="wansati-collection-card__image<?php echo $fit === 'contain' ? ' is-contain' : ''; ?>" src="<?php echo esc_url($image_url); ?>" alt="<?php echo esc_attr($title); ?>">
			<?php endif; ?>
			<div class="wansati-collection-card__overlay">
				<span class="wansati-button wansati-button--primary"><?php echo esc_html($cta); ?></span>
			</div>
		</div>
		<div class="wansati-collection-card__content">
			<?php if ($eyebrow) : ?>
				<p class="wansati-collection-card__eyebrow"><?php echo esc_html($eyebrow); ?></p>
			<?php endif; ?>
			<h3><?php echo esc_html($title); ?></h3>
			<?php if ($count) : ?>
				<p class="wansati-collection-card__count">
					<?php
					printf(
						/* translators: %d: number of products. */
						esc_html(_n('%d product', '%d products', (int) $count, 'wansati')),
						(int) $count
					);
					?>
				</p>
			<?php endif; ?>
		</div>
	</a>
</article>

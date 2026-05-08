<?php
/**
 * Footer markup.
 *
 * @package Wansati
 */

if (! defined('ABSPATH')) {
	exit;
}

$footer_links = wansati_theme_get_footer_link_fallback();
?>
<footer id="colophon" class="site-footer wansati-footer">
	<div class="wansati-container">
		<div class="wansati-footer__grid">
			<div class="wansati-footer__brand">
				<div class="wansati-brand wansati-brand--footer">
					<?php if (has_custom_logo()) : ?>
						<?php the_custom_logo(); ?>
					<?php else : ?>
						<a class="wansati-brand__wordmark" href="<?php echo esc_url(home_url('/')); ?>">
							<span><?php bloginfo('name'); ?></span>
						</a>
					<?php endif; ?>
				</div>
				<p><?php esc_html_e('Bold fashion, rich culture, and confident living designed to feel unmistakably Wansati.', 'wansati'); ?></p>
			</div>

			<div>
				<h2><?php esc_html_e('Quick Links', 'wansati'); ?></h2>
				<ul class="wansati-footer__links">
					<?php foreach ($footer_links as $link) : ?>
						<li><a href="<?php echo esc_url($link['url']); ?>"><?php echo esc_html($link['label']); ?></a></li>
					<?php endforeach; ?>
				</ul>
			</div>

			<div>
				<h2><?php esc_html_e('Contact Us', 'wansati'); ?></h2>
				<div class="wansati-footer__contact">
					<p><?php esc_html_e('Have questions or suggestions?', 'wansati'); ?></p>
					<a href="mailto:info@wansatibrands.co.za">info@wansatibrands.co.za</a>
					<p><?php esc_html_e('Need assistance? Give us a call.', 'wansati'); ?></p>
					<a href="tel:+27676253986">+27 67 625 3986</a>
				</div>
			</div>

			<div>
				<h2><?php esc_html_e('Visit Us', 'wansati'); ?></h2>
				<p>
					<?php esc_html_e('Room 914, Ottawa Mall, 94 Helen Joseph Street, Johannesburg, 2001', 'wansati'); ?>
				</p>
			</div>
		</div>

		<div class="wansati-footer__payments">
			<div>
				<p class="wansati-footer__eyebrow"><?php esc_html_e('Payment Options', 'wansati'); ?></p>
				<p><?php esc_html_e('Secure checkout with Payfast and Yoco.', 'wansati'); ?></p>
			</div>
			<div class="wansati-footer__payment-logos">
				<img src="<?php echo esc_url(get_theme_file_uri('/assets/images/payfast-logo.svg')); ?>" alt="<?php esc_attr_e('Payfast', 'wansati'); ?>">
				<img src="<?php echo esc_url(get_theme_file_uri('/assets/images/yoco-logo.svg')); ?>" alt="<?php esc_attr_e('Yoco', 'wansati'); ?>">
			</div>
		</div>

		<div class="wansati-footer__subfooter">
			<p><?php echo esc_html(sprintf(__('© %s Wansati Brands. All rights reserved.', 'wansati'), wp_date('Y'))); ?></p>
			<div class="wansati-footer__legal">
				<a href="<?php echo esc_url(home_url('/privacy-policy/')); ?>"><?php esc_html_e('Privacy Policy', 'wansati'); ?></a>
				<a href="<?php echo esc_url(home_url('/terms-and-conditions/')); ?>"><?php esc_html_e('Terms & Conditions', 'wansati'); ?></a>
				<a href="<?php echo esc_url(home_url('/returns-policy/')); ?>"><?php esc_html_e('Returns Policy', 'wansati'); ?></a>
			</div>
		</div>
	</div>
</footer>

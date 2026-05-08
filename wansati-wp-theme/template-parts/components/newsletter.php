<?php
/**
 * Newsletter block.
 *
 * @package Wansati
 */

if (! defined('ABSPATH')) {
	exit;
}
?>
<section class="wansati-newsletter">
	<div class="wansati-container">
		<div class="wansati-newsletter__inner">
			<p class="wansati-section__eyebrow"><?php esc_html_e('Join the Wansati Family', 'wansati'); ?></p>
			<h2><?php esc_html_e('Receive new arrivals, stories, and exclusive updates.', 'wansati'); ?></h2>
			<p><?php esc_html_e('This form is currently a visual placeholder and is ready to be connected to Omnisend or another approved signup flow in a later phase.', 'wansati'); ?></p>
			<form class="wansati-newsletter__form" action="#" method="post" onsubmit="return false;">
				<label>
					<span class="screen-reader-text"><?php esc_html_e('Email address', 'wansati'); ?></span>
					<input type="email" placeholder="<?php esc_attr_e('Enter your email address', 'wansati'); ?>" required>
				</label>
				<button class="wansati-button wansati-button--dark" type="submit"><?php esc_html_e('Subscribe', 'wansati'); ?></button>
			</form>
		</div>
	</div>
</section>

<?php
/**
 * My account scaffold preserving WooCommerce account hooks.
 *
 * @package Wansati
 */

defined('ABSPATH') || exit;

$is_logged_in = is_user_logged_in();
?>
<main class="site-main site-main--account">
	<section class="wansati-page-hero">
		<div class="wansati-container">
			<p class="wansati-page-hero__eyebrow"><?php echo esc_html($is_logged_in ? __('My Account', 'wansati') : __('Account Access', 'wansati')); ?></p>
			<h1 class="wansati-page-hero__title"><?php echo esc_html($is_logged_in ? __('Manage your Wansati account.', 'wansati') : __('Sign in and manage your Wansati account.', 'wansati')); ?></h1>
		</div>
	</section>

	<section class="wansati-page-shell wansati-container">
		<div class="woocommerce wansati-account-layout<?php echo $is_logged_in ? '' : ' wansati-account-layout--auth'; ?>">
			<?php if ($is_logged_in) : ?>
				<aside class="wansati-account-sidebar">
					<?php do_action('woocommerce_before_account_navigation'); ?>
					<?php do_action('woocommerce_account_navigation'); ?>
					<?php do_action('woocommerce_after_account_navigation'); ?>
				</aside>
			<?php endif; ?>

			<div class="wansati-account-main">
				<?php do_action('woocommerce_before_account_content'); ?>
				<?php do_action('woocommerce_account_content'); ?>
				<?php do_action('woocommerce_after_account_content'); ?>
			</div>
		</div>
	</section>
</main>

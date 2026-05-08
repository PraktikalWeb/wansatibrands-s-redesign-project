<?php
/**
 * Front page template.
 *
 * @package Wansati
 */

get_header();
?>
<main id="primary" class="site-main site-main--front">
	<?php get_template_part('template-parts/sections/home-hero'); ?>
	<?php get_template_part('template-parts/sections/home-category-tiles'); ?>
	<?php get_template_part('template-parts/sections/home-product-sections'); ?>
	<?php get_template_part('template-parts/sections/home-featured-collections'); ?>
	<?php get_template_part('template-parts/sections/brand-story'); ?>
	<?php get_template_part('template-parts/components/trust-badges'); ?>
	<?php get_template_part('template-parts/components/newsletter'); ?>
</main>
<?php
get_footer();

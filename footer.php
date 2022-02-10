<?php
/**
 * The template for displaying the footer.
 *
 * Contains the body & html closing tags.
 *
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}

$is_elementor_theme_exist = function_exists( 'elementor_theme_do_location' );

if ( ! cb_child_process_location( 'footer' ) && ( ! $is_elementor_theme_exist || ! elementor_theme_do_location( 'footer' ) ) ) {
	get_template_part( 'template-parts/footer' );
}
?>

<?php wp_footer(); ?>

</body>
</html>

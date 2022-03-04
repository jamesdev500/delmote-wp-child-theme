<?php
/**
 * The template for displaying the header.
 *
 * This is the template that displays all of the <head> section, opens the <body> tag and adds the site's header
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}
?>
<!doctype html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="profile" href="http://gmpg.org/xfn/11">
	<?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>

<?php
	if (isset($_SERVER['HTTP_DNT']) && $_SERVER['HTTP_DNT'] == 1) {
		/* Do Not Track is enabled */
	}
?>

<?php
$is_elementor_theme_exist = function_exists( 'elementor_theme_do_location' );

if ( ! cb_child_process_location( 'header' ) && ( ! $is_elementor_theme_exist || ! elementor_theme_do_location( 'header' ) ) ) {
	get_template_part( 'template-parts/header' );
}
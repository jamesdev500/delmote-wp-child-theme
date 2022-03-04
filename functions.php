<?php

/**
 * Child functions and definitions.
 */

/**
 * Process single location
 *
 * @return void
 */
function cb_child_process_location($location = null) {

	if (!function_exists('jet_theme_core')) {
		return false;
	}
	if (!defined('ELEMENTOR_VERSION')) {
		return false;
	}

	$done = jet_theme_core()->locations->do_location($location);

	return $done;
}

/**
 * Load child theme css and optional scripts
 *
 * @return void
 */
function hello_elementor_child_enqueue_scripts() {
	wp_enqueue_style(
		'hello-elementor-child-style',
		get_stylesheet_directory_uri() . '/style.css',
		[
			'hello-elementor-theme-style',
		],
		'1.0.0'
	);

	wp_enqueue_script('my-script', get_stylesheet_directory_uri() . '/assets/js/main.js', array(), '1.0.0', true);
	wp_localize_script('my-script', 'ajaxUrl', admin_url('admin-ajax.php'));

	/**
	 * Post ID 987 = Contact Us - B2B Page
	 */
	if (is_page(987)) {
		wp_enqueue_script('contact-us-b2b', get_stylesheet_directory_uri() . '/assets/js/contact-us-b2b.js', array('jquery'));
		wp_localize_script('contact-us-b2b', 'ajaxUrl', admin_url('admin-ajax.php'));
	}

	/**
	 * Post ID 681 = All Stories Page
	 */
	if (is_page(681)) {
		wp_enqueue_script('contact-us-b2b', get_stylesheet_directory_uri() . '/assets/js/all-stories.js', array('jquery'));
	}
}
add_action('wp_enqueue_scripts', 'hello_elementor_child_enqueue_scripts', 12);

/**
 * Include code library
 */
require_once('inc/helper-functions.php');
require_once('inc/ajax-functions.php');

function ele_disable_page_title($return) {
	return false;
}
add_filter('hello_elementor_page_title', 'ele_disable_page_title');

function myscript() {
?>
	<!-- Global site tag (gtag.js) - Google Analytics -->
	<script async src="https://www.googletagmanager.com/gtag/js?id=UA-214931493-1"></script>
	<script>
		window.dataLayer = window.dataLayer || [];

		function gtag() {
			dataLayer.push(arguments);
		}
		gtag('js', new Date());

		gtag('config', 'UA-214931493-1');
	</script>


<?php
}
add_action('wp_head', 'myscript', 1);

function modify_plugin_list() {
	global $wp_list_table;
	$hidearr = array('dynamictags/dynamic-tags.php');
	$myplugins = $wp_list_table->items;
	foreach ($myplugins as $key => $val) {
		if (in_array($key, $hidearr)) {
			unset($wp_list_table->items[$key]);
		}
	}
}
add_action('pre_current_active_plugins', 'modify_plugin_list');

// Add Shortcode for FDP Stocks
function get_fdp_stocks($atts) {

	$json = file_get_contents('https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=FDP&interval=5min&apikey=MTS38OI5EZ84FD8A');

	$data = json_decode($json, true);

	$response_arr = json_decode($json, true);
	$quote = $response_arr['Global Quote'];
	$price = $quote['05. price'];
	$change = $quote['09. change'];
	$percent = $quote['10. change percent'];

	// Attributes
	$atts = shortcode_atts(
		array(
			'value' => '',
		),
		$atts
	);

	$v = $atts['value'];
	switch ($v) {
		case 'price':
			echo '<sup>$</sup>' . round($price, 2);
			break;
		case 'change':
			echo round($change, 2);
			break;
		case 'percent':
			echo round($percent, 2);
			break;
		default:
			echo 'please add correct value';
	}
}
add_shortcode('FDP', 'get_fdp_stocks');

// Get Parent Page
function get_parent() {
	$current = $post->ID;
	$parent = $post->post_parent;
	$grandparent_get = get_post($parent);
	$grandparent = $grandparent_get->post_parent;
?>
	<h3>
		<a href="<?php if ($root_parent = get_permalink($grandparent) !== $root_parent = get_permalink($current)) {
						echo get_permalink($grandparent);
					} else {
						echo get_permalink($parent);
					} ?>">
			<?php if ($root_parent = get_the_title($grandparent) !== $root_parent = get_the_title($current)) {
				echo get_the_title($grandparent);
			} else {
				echo get_the_title($parent);
			} ?>
		</a>
	</h3>
<?php
}
add_shortcode('parent', 'get_parent');

// Get Children / Siblings
function get_child() {
	global $wp_query;
	if (empty($wp_query->post->post_parent)) {
		$parent = $wp_query->post->ID;
	} else {
		$parent = $wp_query->post->post_parent;
	} ?>
	<?php if (wp_list_pages("title_li=&child_of=$parent&echo=0")) : ?>
		<ul>
			<?php wp_list_pages("title_li=&child_of=$parent"); ?>
		</ul>
<?php endif;
}
add_shortcode('children', 'get_child');

// Add CPTs to search results
/* function dm_search_filter($query) {
	if ($query->is_search) {

		$query->set('post_type', array('post', 'page', 'products', 'farms', 'news'));
	}
	return $query;
}
add_filter('pre_get_posts', 'dm_search_filter'); */

// Set _post_type meta field when a new post has been created
function set_post_type_meta($post_id) {
	$post_type = (in_array(get_post_type($post_id), ['post', 'news'])) ? get_post_type($post_id) : 'website';

	update_post_meta($post_id, '_post_type', $post_type);
}
add_action('save_post', 'set_post_type_meta');

// exclude product post type on search
function shapeSpace_filter_search($query) {
	if (!$query->is_admin && $query->is_search) {
		$query->set('post_type', array('post', 'page', 'our-people', 'brands', 'history', 'news'));
	}
	return $query;
}
add_filter('pre_get_posts', 'shapeSpace_filter_search');



//add_theme_support( 'post-thumbnails' );
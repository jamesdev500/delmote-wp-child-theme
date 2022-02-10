<?php

// Return search result count per post type
function get_search_results_count() {
	$search_results = wp_remote_request('https://delmontedev.wpengine.com/wp-json/wp/v2/search?search=' . $_GET['s'] . '&per_page=100', array(
		'headers' => array(
			'Authorization' => 'Basic ' . base64_encode('demo:500designs')
		)
	));	

	if ($search_results) {
		$search_results = json_decode(wp_remote_retrieve_body($search_results));

		foreach ($search_results as $search_result) {
			if (get_post_type($search_result->id) === 'post') {
				$types['post']++;
			} else if (get_post_type($search_result->id) === 'news') {
				$types['news']++;
			} else {
				$types['website']++;
			}
	
			$types['all']++;
		}
	
		wp_send_json_success($types);
	} else {
		wp_send_json_error();
	}


	/* $args = array(
		'post_type' => array('post', 'page', 'our-people', 'brands', 'history', 'news'),
		's' => $_GET['s'],
		'posts_per_page' => -1
	);

	$my_query = new WP_Query($args);

	$types = array();

	if ($my_query->have_posts()) {
		while ($my_query->have_posts()) : $my_query->the_post();
			if (get_post_type() === 'post') {
				$types['post']++;
			} else if (get_post_type() === 'news') {
				$types['news']++;
			} else {
				$types['website']++;
			}

			$types['all']++;

		endwhile;

		wp_reset_post_data();

		wp_send_json_success($remote_get);

	} else {
		wp_send_json_error();
	} */
}
add_action('wp_ajax_get_search_results_count', 'get_search_results_count');
add_action('wp_ajax_nopriv_get_search_results_count', 'get_search_results_count');

function get_product_categories() {
	$region = $_GET['region'];
	$locations = array();

	$args = array(
		'taxonomy' => 'product-category',
		'hide_empty' => false
	);

	$terms = get_terms($args);

	if (!empty($region)) {
		foreach ($terms as $term) {
			// wp_send_json_success($term);
			$term_location = get_term_meta($term->term_id, 'location', true);
			if ($term_location[$region] == 'true') {
				array_push($locations, $term);
			}
		}
	}

	wp_send_json_success($locations);
}
add_action('wp_ajax_get_product_categories', 'get_product_categories');
add_action('wp_ajax_nopriv_get_product_categories', 'get_product_categories');

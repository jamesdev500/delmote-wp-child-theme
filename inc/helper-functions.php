<?php

// Set custom field post type for each posts
function set_post_custom_post_type() {
	$posts = get_posts([
		'post_type' => array(
			'post',
			'page',
			'farms',
			'products',
			'product-links',
			'sustainability-progr',
			'continents',
			'offices',
			'news',
			'timeline',
			'related-content',
			'history',
			'our-people',
			'brands'
		),
		'post_status' => 'any',
		'posts_per_page' => -1, // getting all posts of a post type
		'no_found_rows' => true, // speeds up a query significantly and can be set to 'true' if we don't use pagination
		'fields' => 'ids' // again, for performance
	]);

	// now check meta and update custom fields for every post
	foreach ($posts as $post_id) {

		$post_type = get_post_type($post_id);

		if (!in_array(get_post_type($post_id), array('post', 'news'))) {
			$post_type = 'website';
		}

		update_post_meta($post_id, '_post_type', $post_type);

		/* $post_type = get_post_meta($post_id, '_post_type', TRUE);

		if (!$post_type) {
			update_post_meta($post_id, '_post_type', get_post_type($post_id));
		} */
	}
}
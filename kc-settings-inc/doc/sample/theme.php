<?php
add_filter( 'kc_plugin_settings', 'mytheme_options' );
function mytheme_options( $settings ) {
	$options = array(
		'sample_section' => array(
			'id'			=> 'sample_section',
			'title'		=> 'Sample Options',
			'desc'		=> '<p>Some description about this options group</p>',
			'fields'	=> array(
				'sample_input' => array(
					'id'		=> 'sample_input',
					'title'	=> 'Simple input',
					'desc'	=> 'Just a simple input field',
					'type'	=> 'input'
				),
				'date' => array(
					'id'		=> 'date',
					'title'	=> 'Date input',
					'type'	=> 'date'
				),
				'sample_textarea' => array(
					'id'		=> 'sample_textarea',
					'title'	=> 'Textarea',
					'desc'	=> 'An ordinary text area where you can write some long texts',
					'type'	=> 'textarea'
				),
				'sample_checkbox' => array(
					'id'			=> 'sample_checkbox',
					'title'		=> 'Checkboxes (checkbox)',
					'desc'		=> 'You can select one or more',
					'type'		=> 'checkbox',
					'options'	=> array(
						'cbox1'	=> 'Option #1',
						'cbox2'	=> 'Option #2'
					)
				),
				'sample_radio' => array(
					'id'			=> 'sample_radio',
					'title'		=> 'Radioboxes (radio)',
					'desc'		=> 'You can only select one here',
					'type'		=> 'radio',
					'options'	=> array(
						'radio1'	=> 'Option #1',
						'radio2'	=> 'Option #2 (Default)',
						'radio3'	=> 'Option #3'
					),
					'default'	=> 'radio2'
				),
				'sample_select' => array(
					'id'			=> 'sample_select',
					'title'		=> 'Dropdown options (select)',
					'desc'		=> 'You can only select one option here',
					'type'		=> 'select',
					'options'	=> array(
						'select3'	=> 'Option #1',
						'select2'	=> 'Option #2',
						'select1'	=> 'Option #3'
					)
				),
				'sample_multiselect' => array(
					'id'			=> 'sample_multiselect',
					'title'		=> 'Dropdown options (multiple select)',
					'desc'		=> 'You can select more than one option here',
					'type'		=> 'multiselect',
					'options'	=> array(
						'select3'	=> 'Option #1',
						'select2'	=> 'Option #2',
						'select1'	=> 'Option #3',
						'select4'	=> 'Option #4',
						'select5'	=> 'Option #5',
						'select6'	=> 'Option #6'
					)
				),
				'sample_callback_1' => array(
					'id'		=> 'sample_callback_1',
					'title'	=> 'Categories (callback)',
					'desc'	=> 'You can only select one <a href="'.admin_url('edit-tags.php?taxonomy=category').'">category</a> here',
					'type'	=> 'special',
					'cb'		=> 'kc_dropdown_options',
					'args'	=> array(
						'prefix'	=> 'anything',
						'section'	=> 'sample_section',
						'id'			=> 'sample_callback_1',
						'mode'		=> 'categories'
					)
				),
				'sample_callback_2' => array(
					'id'		=> 'sample_callback_2',
					'title'	=> 'Pages (callback)',
					'desc'	=> 'You can only select one <a href="'.admin_url('edit.php?post_type=page').'">page</a> here',
					'type'	=> 'special',
					'cb'		=> 'kc_dropdown_options',
					'args'	=> array(
						'prefix'	=> 'anything',
						'section'	=> 'sample_section',
						'id'			=> 'sample_callback_2'
					)
				),
				'sample_multiinput' => array(
					'id'		=> 'sample_multiinput',
					'title'	=> 'Multi input (multiinput)',
					'desc'	=> 'Input field with your own custom label, to create an array',
					'type'	=> 'multiinput'
				),
				'sample_file' => array(
					'id'		=> 'sample_file',
					'title'	=> 'File selection',
					'type'	=> 'file',
					'mode'	=> 'single'
				),
				'sample_callback_3' => array(
					'id'		=> 'sample_callback_3',
					'title'	=> 'Callback',
					'desc'	=> 'Callback with static argument',
					'type'	=> 'special',
					'cb'		=> 'kcs_sample_callback_static',
					'args'	=> "Hey, I'm the static callback argument"
				),
				'sample_callback_4' => array(
					'id'		=> 'sample_callback_4',
					'title'	=> 'Callback',
					'desc'	=> 'Callback with dynamic argument (function return value)',
					'type'	=> 'special',
					'cb'		=> 'kcs_sample_callback_dynamic',
					'args'	=> 'kcs_sample_callback_dynamic_args'
				)
			)
		)
	);

	$my_settings = array(
		'prefix'				=> 'anything',
		'menu_location'	=> 'themes.php',
		'menu_title'		=> 'My Theme Settings',
		'page_title'		=> 'My Theme Settings Page',
		'options'				=> $options
	);

	$settings[] = $my_settings;
	return $settings;
}


function kcs_sample_callback_static( $field, $db_value, $args ) {
	return $args;
}


function kcs_sample_callback_dynamic( $field, $db_value, $args ) {
	$output  = "I'm gonna give you the value from your argument function.<br />";
	$output .= "Your field name is <b>{$args}</b>, right?";
	return $output;
}


function kcs_sample_callback_dynamic_args( $field, $db_value ) {
	// You can do whatever you want here and then return in
	// So your callback function can process it.

	return $field['field']['name'];
}

?>
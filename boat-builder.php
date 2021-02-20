<?php
/*
Plugin Name: Boat Builder
Plugin URI:  https://avid-boats.com
Description: A way for customers to customize their boats and get pricing. 
Version:     1.0
Author:      Wesley Harmon
Author URI:  https://avid-baots.com
Text Domain: boat-builder
*/

function boatBuilder_post_type()
{
  register_post_type(
    'boatbuilder_boats',
    [
      'labels' => [
        'name'          => __('Boats', 'boat-builder'),
        'singular_name' => __('Boat', 'boat-builder'),
      ],
      'public'      => true,
      'has_archive' => false,
      'supports' => array('title')
    ]
  );
}

add_action('init', 'boatBuilder_post_type');

function boatBuilder_parts_box()
{
  global $pagenow;
  if ($pagenow == 'post.php' && (get_post_type() == 'boatbuilder_boats')) {
    add_meta_box(
      'boatBuilder_parts_box',
      'Parts Section',
      'boatBuilder_parts_box_html',
      'boatbuilder_boats'
    );
  }
}
add_action('add_meta_boxes', 'boatBuilder_parts_box');

function boatBuilder_parts_box_html()
{
?>
  <div id="boat-parts-box"></div>
<?php
}

function boatBuilder_cpt_enqueue($hook_suffix)
{
  $cpt = 'boatbuilder_boats';
  if (in_array($hook_suffix, array('post.php', 'post-new.php'))) {
    $screen = get_current_screen();
    if (is_object($screen) && $cpt == $screen->post_type) {
      global $post;
      $id = $post->ID;
      if ($id) {
        $metaData = get_post_meta($id, 'boatbuilder_parts', true);
        if ($metaData) {
          $rawJavascriptData = $metaData;
        } else {
          $rawJavascriptData = [];
        }
      } else {
        $rawJavascriptData = [];
      }
      $assetPath = plugins_url('admin/assets-manifest.json', __FILE__);
      $response = wp_remote_get($assetPath);
      $assetsArr = json_decode($response['body']);
      $cssFile = $assetsArr->{'main.css'};
      $jsFile = $assetsArr->{'main.js'};
      wp_enqueue_style('admin-boat-parts-style', plugins_url('admin/' . $cssFile, __FILE__), array(), 0.1);
      wp_enqueue_script('admin-boat-parts-script', plugins_url('admin/' . $jsFile, __FILE__), array('jquery-ui-core'), 0.1, true);
      wp_localize_script('admin-boat-parts-script', 'rawJavascriptData', $rawJavascriptData);
    }
  }
}

add_action('admin_enqueue_scripts', 'boatBuilder_cpt_enqueue');

function boatBuilder_save_postdata($post_id)
{
  if (array_key_exists('boatbuilder-admin-app-data', $_POST)) {
    update_post_meta(
      $post_id,
      'boatbuilder_parts',
      $_POST['boatbuilder-admin-app-data']
    );
    //delete_post_meta($post_id, 'boatbuilder_parts');
  }
}
add_action('save_post', 'boatBuilder_save_postdata');

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
    'boat-builder',
    [
      'labels' => [
        'name'          => __('Boats', 'boat-builder'),
        'singular_name' => __('Boat', 'boat-builder'),
      ],
      'public'      => true,
      'has_archive' => true,
      'supports' => array('title', 'thumbnail')
    ]
  );
}

add_action('init', 'boatBuilder_post_type');

function boatBuilder_parts_box()
{
  global $pagenow;
  if ($pagenow == 'post.php' && (get_post_type() == 'boat-builder')) {
    add_meta_box(
      'boatBuilder_parts_box',
      'Parts Section',
      'boatBuilder_parts_box_html',
      'boat-builder'
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
  $cpt = 'boat-builder';
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

function boatbuilder_post_content($content)
{
  global $post;
  if ($post->post_type === 'boat-builder') {
    return '<div id="boatbuilder-app"></div>';
  }
  return $content;
}
add_filter('the_content', 'boatbuilder_post_content');

function boatbuilder_front_scripts()
{
  global $post;
  if ($post->post_type === 'boat-builder') {
    $id = $post->ID;
    $image = get_the_post_thumbnail_url( $id, 'full' );
    if ($id) {
      $metaData = get_post_meta($id, 'boatbuilder_parts', true);
      if ($metaData) {
        $rawJavascriptData = json_decode($metaData);
        $rawJavascriptData->post = $post;
        $rawJavascriptData->image = $image;
      } else {
        $rawJavascriptData->post = $post;
        $rawJavascriptData->image = $image;
      }
    } else {
      $rawJavascriptData = [];
    }
    $assetPath = plugins_url('front/assets-manifest.json', __FILE__);
    $response = wp_remote_get($assetPath);
    $assetsArr = json_decode($response['body']);
    $cssFile = $assetsArr->{'main.css'};
    $jsFile = $assetsArr->{'main.js'};
    $pdfFile = $assetsArr->{'pdf.js'};
    wp_enqueue_style('front-boat-parts-style', plugins_url('front/' . $cssFile, __FILE__), array(), 0.1);
    wp_enqueue_script('front-boat-parts-script', plugins_url('front/' . $jsFile, __FILE__), array('jquery-ui-core'), 0.1, true);
    wp_enqueue_script('front-boat-parts-pdf', plugins_url('front/' . $pdfFile, __FILE__), array('jquery-ui-core'), 0.1, true);
    wp_localize_script('front-boat-parts-script', 'rawFormData', json_encode($rawJavascriptData));
  }
}
add_action('wp_enqueue_scripts', 'boatbuilder_front_scripts');

add_filter('single_template', 'my_custom_template');

function boatbuilder_load_template( $template ) {
  global $post;

  if ( 'boat-builder' === $post->post_type && locate_template( array( 'single-boat-builder.php' ) ) !== $template ) {
      return plugin_dir_path( __FILE__ ) . 'single-boat-builder.php';
  }

  return $template;
}

add_filter( 'single_template', 'boatbuilder_load_template' );

function send_email($form_email, $form_name, $form_body, $file_path) {
  $email_subject = 'Message from '. get_bloginfo('name') . ' - ' . $form_email;
  $headers = "From: '" . $form_name . "' <" . $form_email . "> \r\n";
  $headers .= "Reply-To: ". strip_tags($form_email) . "\r\n";
  $headers .= "Content-Type:text/html;charset=utf-8";
  $email_message = '<html><body>';
  $email_message .= "<table>";
  $email_message .= "<tr><td>NAME: </td><td>" . $form_name . "</td></tr>";
  $email_message .= "<tr><td>MESSAGE: </td><td>" . $form_message . "</td></tr>";
  $email_message .= "</table>";
  $email_message .= "</body></html>";
  wp_mail('no-reply@localhost.com', $email_subject, $email_message, $headers, $file_path);
}


function sendEmailForm(WP_REST_Request $request) {
  $response = array(
    'status' => 304,
    'message' => 'There was an error sending the form.'
  );
  $parameters = $request->get_json_params();
  $siteName = wp_strip_all_tags(trim(get_option('blogname')));
  $contactEmail = wp_strip_all_tags(trim($parameters['contact_email']));

  if(empty($contactEmail)) {
    $response['status'] = 400;
    $response['message'] = 'Email field is required.';
    return $response;
    exit();
  }

  if(!filter_var($contactEmail, FILTER_VALIDATE_EMAIL)){
    $response['status'] = 400;
    $response['message'] = 'Email is not valid.';
    return $response;
    exit();
  }
  $body = "<p><b>Email:</b> $contactEmail</p>";
  if (true /* send email */) {
    $response['status'] = 200;
    $response['message'] = $body;
  }
  
  return json_decode(json_encode($response));
  exit();
}

function sendDealerForm(WP_REST_Request $request) {
  $response = array(
    'status' => 304,
    'message' => 'There was an error sending the form.'
  );
  $parameters = $_POST;
  if(count($_POST) <= 0) {return $response; exit();}
  $siteName = wp_strip_all_tags(trim(get_option('blogname')));
  $contactFname= wp_strip_all_tags(trim($parameters['contact_fname']));
  $contactLname= wp_strip_all_tags(trim($parameters['contact_lname']));
  $contactEmail = wp_strip_all_tags(trim($parameters['contact_email']));
  $contactPhone= wp_strip_all_tags(trim($parameters['contact_phone']));
  $contactAddress = wp_strip_all_tags(trim($parameters['contact_address']));
  $contactCity= wp_strip_all_tags(trim($parameters['contact_city']));
  $contactState= wp_strip_all_tags(trim($parameters['contact_state']));
  $contactZip= wp_strip_all_tags(trim($parameters['contact_zip']));
  $theFile = isset($_FILES['the_file']) ? $_FILES['the_file'] : false;

  if(empty($contactFname)) {
    $response['status'] = 400;
    $response['message'] = 'First Name field is required.';
    return $response;
    exit();
  }

  if(empty($contactLname)) {
    $response['status'] = 400;
    $response['message'] = 'Last Name field is required.';
    return $response;
    exit();
  }
  if(empty($contactEmail)) {
    $response['status'] = 400;
    $response['message'] = 'Email field is required.';
    return $response;
    exit();
  }

  if(empty($contactPhone)) {
    $response['status'] = 400;
    $response['message'] = 'Phone field is required.';
    return $response;
    exit();
  }
  if(empty($contactAddress)) {
    $response['status'] = 400;
    $response['message'] = 'Address field is required.';
    return $response;
    exit();
  }
  if(empty($contactCity)) {
    $response['status'] = 400;
    $response['message'] = 'City field is required.';
    return $response;
    exit();
  }
  if(empty($contactState)) {
    $response['status'] = 400;
    $response['message'] = 'State field is required.';
    return $response;
    exit();
  }
  if(empty($contactZip)) {
    $response['status'] = 400;
    $response['message'] = 'Zip field is required.';
    return $response;
    exit();
  }
  if(!$theFile) {
    return $response;
    exit();
  }

  if(!preg_match('/^[a-zA-Z]+$/', $contactFname)) {
    $response['status'] = 400;
    $response['message'] = 'Only a-z characters are allowed for names.';
    return $response;
    exit();
  }
  if(!preg_match('/^[a-zA-Z]+$/', $contactLname)) {
    $response['status'] = 400;
    $response['message'] = 'Only a-z characters are allowed for names.';
    return $response;
    exit();
  }


  if(!filter_var($contactEmail, FILTER_VALIDATE_EMAIL)){
    $response['status'] = 400;
    $response['message'] = 'Email is not valid.';
    return $response;
    exit();
  }

  if(!preg_match('/^[0-9]*$/', $contactPhone)) {
    $response['status'] = 400;
    $response['message'] = 'Phone is not valid.';
    return $response;
    exit();
  }

  if(!preg_match('/^\d{5}(?:[-]\d{4})?$/', $contactZip)) {
    $response['status'] = 400;
    $response['message'] = 'Zip is not valid';
    return $response;
    exit();
  }

  $saved = file_put_contents(plugin_dir_path( __FILE__ ) . 'temp/myboat.pdf', file_get_contents($theFile['tmp_name']));

  if(!$saved) {
    return $response;
    exit();
  }
  $subject = "(New message sent from site $siteName) <$contactEmail>";
  $body = "<p><b>Email:</b> $contactEmail</p>";
  if (true /* send email */) {
    $response['status'] = 200;
    $response['message'] = $body;
  }
  return $response;
  exit();
}

add_action('rest_api_init', function () {
  $version = 'v1';
  $base = 'boat-builder';
  register_rest_route( $base .'/' . $version, '/email', array(
    'methods' => 'POST',
    'callback' => 'sendEmailForm'
  ));
  register_rest_route( $base .'/' . $version, '/dealer', array(
    'methods' => 'POST',
    'callback' => 'sendDealerForm'
  ));
});
<?php
/*
Plugin Name: Boat Builder
Plugin URI:  https://avid-boats.com
Description: A way for customers to customize their boats and get pricing. 
Version:     1.0.1
Author:      Wesley Harmon
Author URI:  https://avid-boats.com
Text Domain: boat-builder
*/

require __DIR__.'/vendor/plugin-update-checker/plugin-update-checker.php';
$boat_builder_update_checker = Puc_v4_Factory::buildUpdateChecker(
	'https://github.com/clayharmon/boatbuilder-wp/',
	__FILE__,
	'boat-builder'
);
$boat_builder_update_checker->getVcsApi()->enableReleaseAssets();

define('BOATBUILDER_CURRENT_VERSION',  '1.0');

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
        $rawJavascriptData->app_version = BOATBUILDER_CURRENT_VERSION;
      } else {
        $rawJavascriptData->post = $post;
        $rawJavascriptData->image = $image;
        $rawJavascriptData->app_version = BOATBUILDER_CURRENT_VERSION;
      }
    } else {
      $rawJavascriptData = [];
    }
    $assetPath = plugins_url('front/assets-manifest.json', __FILE__);
    $response = wp_remote_get($assetPath);
    $assetsArr = json_decode($response['body']);
    $cssFile = $assetsArr->{'main.css'};
    $jsFile = $assetsArr->{'main.js'};
    $pdfFile = $assetsArr->{'pdf-btns.js'};
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

function send_email($to_email, $from_email, $reply_to, $subject, $body, $file_path) {
  $siteName = wp_strip_all_tags(trim(get_option('blogname')));
  $headers = "From: '" . $siteName. "' <" . $from_email . "> \r\n";
  $headers .= "Reply-To: ". strip_tags($reply_to) . "\r\n";
  $headers .= "Content-Type:text/html;charset=utf-8";
  $message = '<html><body>';
  $message .= $body;
  $message.= "</body></html>";
  return wp_mail( $to_email, $subject, $message, $headers, $file_path );
}


function sendEmailForm(WP_REST_Request $request) {
  $response = array(
    'status' => 304,
    'message' => 'There was an error sending the form.'
  );
  $parameters = $_POST;
  if(count($_POST) <= 0) {return $response; exit();}
  $siteName = wp_strip_all_tags(trim(get_option('blogname')));
  $boatbuilder_options = get_option('boatbuilder_store');
  $contactEmail = wp_strip_all_tags(trim($parameters['contact_email']));
  $theFile = isset($_FILES['the_file']) ? $_FILES['the_file'] : false;

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
  if ( ! function_exists( 'wp_handle_upload' ) ) {
    require_once( ABSPATH . 'wp-admin/includes/file.php' );
  }
  $saved = wp_handle_upload($theFile, array('test_form' => false, 'mimes' => array("pdf" => "application/pdf")));

  if(isset( $saved['error']) ){
    return $response;
    exit();
  }
  $body_admin = "<p><b>Email:</b>" . $contactEmail . "</p>";
  $body_user = "<h1>Congratulations!</h1><p>We hope you like your custom build. Feel free to contact us at <a href='mailto:info@avid-boats.com'>info@avid-boats.com</a></p>";

  $userSend = send_email($contactEmail, "no-reply@avid-boats.com", "info@avid-boats.com", "Avid Boats: Your Custom Build.", $body_user, $saved['file']);
  $adminSend = send_email($boatbuilder_options['sendto'], "no-reply@avid-boats.com", $contactEmail, "New Boat Build: Email Form", $body_admin, $saved['file']);
  
  $deleted = unlink($saved['file']);
  if ($userSend && $adminSend && $deleted) {
    $response['status'] = 200;
    $response['message'] = "Form submission was successful!";
  }
  
  return $response;
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
  $boatbuilder_options = get_option('boatbuilder_store');
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

  if ( ! function_exists( 'wp_handle_upload' ) ) {
    require_once( ABSPATH . 'wp-admin/includes/file.php' );
  }
  $saved = wp_handle_upload($theFile, array('test_form' => false, 'mimes' => array("pdf" => "application/pdf")));

  if(isset( $saved['error']) ){
    return $response;
    exit();
  }

  $body_admin = "<p><b>Name: </b>" . $contactFname . " " . $contactLname ."</p>";
  $body_admin .= "<p><b>Email:</b>" . $contactEmail . "</p>";
  $body_admin .= "<p><b>Phone:</b>" . $contactPhone . "</p>";
  $body_admin .= "<p><b>Address:</b>" . $contactAddress . ", " . $contactCity . ", " . $contactState . " " . $contactZip . "</p>";
  $body_user = "<h1>Congratulations!</h1><p>We hope you like your custom build. Feel free to contact us at <a href='mailto:info@avid-boats.com'>info@avid-boats.com</a></p>";

  $userSend = send_email($contactEmail, "no-reply@avid-boats.com", "info@avid-boats.com", "Avid Boats: Your Custom Build.", $body_user, $saved['file']);
  $adminSend = send_email($boatbuilder_options['sendto'], "no-reply@avid-boats.com", $contactEmail, "New Boat Build: Dealer Form", $body_admin, $saved['file']);

  $deleted = unlink($saved['file']);
  if ($userSend && $adminSend && $deleted) {
    $response['status'] = 200;
    $response['message'] = "Form submission was successful!";
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

function boatBuilder_admin_nonce_notice() {
  if(isset($_GET['nonce_verify']) && $_GET['nonce_verify'] === 'false'){
    echo '<div class="error notice"><p>Sorry, your nonce did not verify. Please try again.</p></div>';
  }
}
add_action( 'admin_notices', 'boatBuilder_admin_nonce_notice' );

add_action( 'admin_action_boatbuilder_admin_form', 'boatBuilder_admin_form_action' );
function boatBuilder_admin_form_action(){
  if ( !isset( $_POST['boatbuilder_admin_verify'] ) || !wp_verify_nonce( $_POST['boatbuilder_admin_verify'], 'boatbuilder_admin_update_settings' ) ) {
    wp_redirect( $_SERVER['HTTP_REFERER'] . '&nonce_verify=false');
    exit();
  }
  $boatbuilder_options = [];

  if( isset( $_POST['boatbuilder_sendto'] ) ){
    $value = esc_sql( $_POST['boatbuilder_sendto'] );
    $boatbuilder_options['sendto'] = $value;
  }

  update_option('boatbuilder_store', $boatbuilder_options);
  wp_redirect( $_SERVER['HTTP_REFERER'] . '&nonce_verify=true' );
  exit();
}


function boatBuilder_add_settings_page(){
  add_options_page(
    'Boat Builder',
    'Boat Builder',
    'manage_options',
    'boat-builder',
    'boatBuilder_settings_html'
  );
}
add_action( 'admin_menu', 'boatBuilder_add_settings_page' );
function boatBuilder_settings_html(){
  $boatbuilder_options = get_option('boatbuilder_store');

  $sendto_value = (isset($boatbuilder_options['sendto']) && $boatbuilder_options['sendto']) ? $boatbuilder_options['sendto'] : "";
  ?>
  <div class="wrap">
    <h1>Boat Builder Settings</h1>
    <form style="padding:10px 0;" method="POST" action="<?php echo admin_url( 'admin.php' ); ?>">


    <table class="form-table" role="presentation">
      <tbody>
        <tr>
          <th scope="row"><label for="sendto">From Admin Email(s):</label></th>
          <td>
            <input name="boatbuilder_sendto" type="email" multiple id="boatbuilder_sendto" value="<?php echo $sendto_value ?>" class="regular-text">
            <p class="description" id="boatbuilder-sendto-description">Enter a single or comma seperated list of emails for when a customer "sends to dealer" or sends to their email.</p>
          </td>
        </tr>
      </tbody>
    </table>
      <?php wp_nonce_field( 'boatbuilder_admin_update_settings', 'boatbuilder_admin_verify' ); ?>
      
      <input type="hidden" name="action" value="boatbuilder_admin_form" />
      <input style="margin:10px 0;" type="submit" name="submit" id="submit" class="button button-primary" value="Save Changes" />
    </form>
  </div>
  <?php
}
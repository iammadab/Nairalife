<?php include 'meta.php';?>
<link href="css/login.css" rel="stylesheet" type="text/css" />

<!-- begin::Body -->
<body class="kt-quick-panel--right kt-demo-panel--right kt-offcanvas-panel--right kt-header--fixed kt-header-mobile--fixed kt-subheader--fixed kt-subheader--enabled kt-subheader--solid kt-aside--enabled kt-aside--fixed kt-page--loading">

<!-- begin:: Page -->
<div class="kt-grid kt-grid--ver kt-grid--root">
<div class="kt-grid kt-grid--hor kt-grid--root  kt-login kt-login--v1" id="kt_login">
<div class="kt-grid__item kt-grid__item--fluid kt-grid kt-grid--desktop kt-grid--ver-desktop kt-grid--hor-tablet-and-mobile">


<!--begin::Content-->
<div class="kt-grid__item kt-grid__item--fluid  kt-grid__item--order-tablet-and-mobile-1  kt-login__wrapper">

<!--begin::Head-->
<div class="kt-login__bottom">

</div>

<!--end::Head-->

<!--begin::Body-->
<div class="kt-login__body" id="login-section">

<!--begin::Signin-->
<div class="kt-login__form">
<?php include 'formhead.php';?>
<div class="kt-login__title">
<h3>Upgrade Your Nairascore</h3>
<p>Improve your chances of getting contributions faster below</p>
</div>

<!-- <div class="error" style="display:none;">Invalid Username or Password</div> -->



<!--begin::Form-->
<form class="kt-form" action="" novalidate="novalidate">

<div class="form-group">
<select class="custom-select bank-name">
<option>Choose type below</option>
<option value="1">Do you have a guarantor?</option>
<option value="2">Do you have Nairalife tokens?</option>
</select>
</div>

<div class="form-group">
<input class="form-control" type="text" placeholder="Enter your guarantor code or Token Nigeria ID" 
name="username" autocomplete="off" required="true">
</div>


<div class="kt-login__btn">
<button id="kt_login_signin_submit" class="btn btn-primary btn-tall btn-pill kt-login__btn-primary">
<span>Submit</span>
</button>
</div>


</form>

<!--end::Form-->

<!--begin::Divider-->
<div class="kt-login__divider">
<div class="kt-divider">
<span></span>
<span>OR</span>
<span></span>
</div>
</div>
<!--end::Divider-->

<!--begin::Options-->
<div class="kt-login__bottom">
<a href="#" class="kt-link kt-login__signup-link">Skip >></a>
</div>

<!--end::Options-->
</div>

<!--end::Signin-->
</div>

<!--end::Body-->



































</div>
<!--end::Content-->

</div>
</div>
</div>

<!-- end:: Page -->
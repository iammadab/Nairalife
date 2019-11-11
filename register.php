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
<div class="kt-login__body" id="register-form">

<!--begin::Signin-->
<div class="kt-login__form">
<?php include 'formhead.php';?>
<div class="kt-login__title">
<h3>Create An Account</h3>
<p>Join other Nairalife members below</p>
</div>

<div class="alert alert-danger alert-bold fade show kt-margin-b-20 register-error" role="alert">
<div class="alert-icon"><i class="flaticon-warning"></i></div>
<div class="alert-text">
Invalid Username or Password
</div>
</div>

<!--begin::Form-->
<form class="kt-form" action="" novalidate="novalidate">
<div class="form-group">
<input class="form-control" type="text" placeholder="Enter your full name" name="name" autocomplete="off">
</div>
<div class="form-group">
<input class="form-control" type="text" placeholder="Enter your phone number" name="phone" autocomplete="off">
</div>
<div class="form-group">
<input class="form-control" type="password" placeholder="Enter your password" name="password">
<p class="passerror" style="color: red; display: none;">password must be at least 6 characters</p>
</div>
<!--begin::Action-->
<div class="kt-login__actions kt-margin-t-30">
By clicking on "Join Us" you agree with our <br>
<a href="/terms" class="kt-link kt-login__signup-link">Terms of Service</a> and
<a href="/privacy" class="kt-link kt-login__signup-link">Privacy Policy</a>
</div>
<!--end::Action-->
<div class="kt-login__btn kt-margin-t-10">
<button id="kt_login_signin_submit" class="btn btn-primary-main btn-tall btn-pill kt-login__btn-primary">
<i class="flaticon-users-1"></i> Join Us
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
<span class="kt-login__signup-label">Already have an account?</span>&nbsp;&nbsp;
<a href="/login" class="kt-link kt-login__signup-link">Login</a>
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
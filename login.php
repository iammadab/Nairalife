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
<h3>Login Account</h3>
<p>Enter your account details below</p>
</div>

<!-- <div class="error" style="display:none;">Invalid Username or Password</div> -->


<div class="alert alert-danger alert-bold fade show kt-margin-b-20 login-error" role="alert">
<div class="alert-icon"><i class="flaticon-warning"></i></div>
<div class="alert-text">
Invalid Phone Number or Password
</div>
</div>

<div class="alert alert-success alert-bold fade show kt-margin-b-20 none login-success" role="alert">
<div class="alert-icon"><i class="flaticon-warning"></i></div>
<div class="alert-text">
Your password has been changed successfully. Login below
</div>
</div>


<!--begin::Form-->
<form class="kt-form" action="" novalidate="novalidate">
<div class="form-group">
	<input class="form-control" type="text" placeholder="Enter your phone number" name="username" autocomplete="off" required="true">
</div>
<div class="form-group">
	<input class="form-control" type="password" placeholder="Enter your password" name="password" required="true">
</div>



<div class="kt-login__btn">
<button id="kt_login_signin_submit" class="btn btn-primary btn-tall btn-pill kt-login__btn-primary">
<i class="la la-unlock"></i><span>Enter Account </span>
</button>
</div>

<!--begin::Action-->
<div class="kt-login__actions">
<a href="/forgot" class="kt-link kt-login__link-forgot">Forgot Password?</a>
</div>
<!--end::Action-->



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
<span class="kt-login__signup-label">Don't have an account yet?</span>&nbsp;&nbsp;
<a href="/register" class="kt-link kt-login__signup-link">Register</a>
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
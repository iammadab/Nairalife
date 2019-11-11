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
<h3>Welcome To Nairalife, Akin Wumi</h3>
<p>Please tell us somethings about you <br> so that we can provide the best service to you</p>
</div>

<!-- <div class="error" style="display:none;">Invalid Username or Password</div> -->



<!--begin::Form-->
<form class="kt-form" action="" novalidate="novalidate">

<div class="form-group">
<select class="custom-select bank-name">
<option>Choose your sex</option>
<option value="Unity Bank">Male</option>
<option value="Wema Bank">Female</option>
</select>
</div>


<div class="form-group">
<select class="custom-select bank-name">
<option>Relationship status</option>
<option value="Single">Single</option>
<option value="Engaged">Engaged</option>
<option value="Married">Married</option>
</select>
</div>


<div class="form-group">
<select class="custom-select bank-name">
<option>What is your official title?</option>
<option value="">None</option>
<option value="Mr.">Mr.</option>
<option value="Mrs.">Mrs.</option>
<option value="Miss.">Miss.</option>
<option value="Dr.">Dr.</option>
<option value="Mazi">Mazi</option>
<option value="Ogbeni">Ogbeni</option>
<option value="Otunba">Otunba</option>
<option value="Chairman">Chairman</option>
<option value="Chairwoman">Chairwoman</option>
</select>
</div>

<div class="form-group">
<textarea class="form-control" name="bvn" style="height:95px" placeholder="Can you describe yourself?">
</textarea>
</div>

<div class="form-group">
<div class="custom-file">
<input type="file" class="custom-file-input" id="customFile">
<label class="custom-file-label" for="customFile" style="color:#333;">Upload profile picture (optional)</label>
</div>
</div>


<!--begin::Divider-->
<div class="kt-login__divider kt-margin-t-30">
<div class="kt-divider">
<span></span>
<span>Please give us more information about your current occupation</span>
<span></span>
</div>
</div>
<!--end::Divider-->




<div class="form-group">
<select class="custom-select bank-name">
<option>How do you earn a living</option>
<option value="Unity Bank">Freelancing</option>
<option value="Wema Bank">Cooperate Work</option>
<option value="Wema Bank">Others</option>
</select>
</div>




<div class="form-group">
<textarea class="form-control" name="bvn" style="height:95px" placeholder="Can you describe it?">
</textarea>
</div>




<div class="form-group">
<select class="custom-select bank-name">
<option>How much do you earn monthly?</option>
<option value="Unit Bank">Between 30,000 - 50,000</option>
<option value="Wema Bank">Between 50,000 - 100,000</option>
<option value="Wema Bank">Between 100,000 - 200,000</option>
<option value="Wema Bank">Between 200,000 - 500,000</option>
<option value="Wema Bank">Between 500,000 - 1,000,000</option>
<option value="Wema Bank">Between 1,000,000 - 5,000,000</option>
<option value="Wema Bank">Between 5,00,000 and above</option>
</select>
</div>



<div class="form-group">
<div class="custom-file">
<input type="file" class="custom-file-input" id="customFile">
<label class="custom-file-label" for="customFile" style="color:#333;">Upload proof (optional)</label>
</div>
<p class="text-muted kt-margin-l-10">
<span class="text-danger">*</span>
Please note that a valid proof can be your account statement, proof of occupation including ID and it will increase
your reputation on Nairalife.
</p>
</div>




<!--begin::Divider-->
<div class="kt-login__divider kt-margin-t-30">
<div class="kt-divider">
<span></span>
<span>Please give us more information about your Nairalife goals</span>
<span></span>
</div>
</div>
<!--end::Divider-->



<div class="form-group">
<select class="custom-select bank-name">
<option>How much contributions do you want to receive?</option>
<option value="Unit Bank">30,000 Monthly</option>
<option value="Wema Bank">60,000 Monthly</option>
<option value="Wema Bank">150,000 Yearly</option>
</select>
</div>


<div class="form-group">
<select class="custom-select bank-name">
<option>How much contributions can you make?</option>
<option value="Unit Bank">1,000 Daily</option>
<option value="Wema Bank">5,000 Weekly</option>
<option value="Wema Bank">10,000 Monthly</option>
</select>
</div>



<div class="form-group">
<textarea class="form-control" name="bvn" style="height:95px" 
placeholder="What do you want to use the contributions for when you receive it?">
</textarea>
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
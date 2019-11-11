<?php 
include 'meta.php';
include 'header.php';
$title='Account Settings';
$link='Settings';
include 'link.php';
?>


<!--begin::Portlet-->
<div class="kt-portlet btopzero">

<div class="kt-portlet__body">

<ul class="nav nav-tabs  nav-tabs-line nav-tabs-bolder nav-tabs-line-primary" role="tablist">
<li class="nav-item">
<a class="nav-link active" data-toggle="tab" href="#kt_tabs_7_1" role="tab">
<i class="la la-edit"></i> Profile Information
</a>
</li>
<li class="nav-item">
<a class="nav-link" data-toggle="tab" href="#kt_tabs_7_2" role="tab">
<i class="la la-bank"></i> Bank Account
</a>
</li>
<li class="nav-item">
<a class="nav-link" data-toggle="tab" href="#kt_tabs_7_3" role="tab">
<i class="la la-credit-card"></i> Card Details
</a>
</li>
<li class="nav-item">
<a class="nav-link" data-toggle="tab" href="#kt_tabs_7_4" role="tab">
<i class="la la-unlock"></i> Change Password
</a>
</li>
</ul>

<div class="tab-content">



<div class="tab-pane active" id="kt_tabs_7_1" role="tabpanel">

	
<div class="form-group">
<label>Full Name</label>
<input type="text" class="form-control form-control-lg info-name" name="name" value="Akin Wumi">
</div>

<div class="form-group">
<label>Phone Number</label>
<input type="text" class="form-control form-control-lg info-phone" name="phone" value="08127596979" readonly="readonly">
</div>

<div class="form-group">
<label>Sex</label>	
<select class="custom-select bank-name" style="height:55px;">
<option value="Single">Male</option>
<option value="Engaged">Female</option>
</select>
</div>


<div class="form-group">
<label>Official Title</label>	
<select class="custom-select bank-name" style="height:55px;">
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
<label>Relationship Status</label>	
<select class="custom-select bank-name" style="height:55px;">
<option value="Single">Single</option>
<option value="Engaged">Engaged</option>
<option value="Married">Married</option>
</select>
</div>


<div class="form-group">
<label>Bio</label>	
<textarea class="form-control" name="bvn" style="height:95px" placeholder="I am a pan-africanist. Passionate about creating wealth for all Africans">
</textarea>
</div>



<div class="kt-form__actions kt-text-align-center-mobile kt-margin-t-30">
<button class="btn btn-primary btn-taller btn-wide kt-font-bold save-information">
<i class="la la-edit"></i> Save Information
</button>
</div>
<!--end: Form Actions -->

</div>
<!--end: tab-pane -->




<div class="tab-pane" id="kt_tabs_7_2" role="tabpanel">

<div class="form-group">
<label>Account Name</label>
<input type="text" class="form-control form-control-lg info-account-name" name="account_name" value="Akin Wumi">
</div>

<div class="form-group">
<label>Account Number</label>
<input type="text" class="form-control form-control-lg info-account-number" name="account_number" value="0088236241">
</div>

<div class="form-group">
<label>Bank Name</label>
<input type="text" class="form-control form-control-lg info-bank-name" name="bank_name" value="Access Bank (Diamond)">
</div>

<div class="kt-form__actions kt-text-align-center-mobile kt-margin-t-30">
<button class="btn btn-primary btn-taller btn-wide kt-font-bold save-information">
<i class="la la-edit"></i> Save Information
</button>
</div>
<!--end: Form Actions -->

</div>
<!--end: tab-pane -->




<div class="tab-pane" id="kt_tabs_7_3" role="tabpanel">

	
<div class="form-group">
<label>Card No</label>
<input type="text" class="form-control form-control-lg info-account-name" name="account_name" value="01827653414416251">
</div>

<div class="form-group">
<label>Card CVV</label>
<input type="text" class="form-control form-control-lg info-account-number" name="account_number" value="179">
</div>

<div class="form-group">
<label>Card Pin</label>
<input type="password" class="form-control form-control-lg info-bank-name" name="bank_name" value="1826">
</div>

<div class="form-group">
<label>Card Date</label>
<input type="text" class="form-control form-control-lg info-bank-name" name="bank_name" value="03/20">
</div>

<div class="kt-form__actions kt-text-align-center-mobile kt-margin-t-30">
<button class="btn btn-primary btn-taller btn-wide kt-font-bold save-information">
<i class="la la-edit"></i> Save Information
</button>
</div>
<!--end: Form Actions -->

</div>
<!--end: tab-pane -->





<div class="tab-pane" id="kt_tabs_7_4" role="tabpanel">

<div class="form-group">
<label>Current Password</label>
<input type="password" class="form-control form-control-lg current-password" name="fname">
</div>

<div class="form-group">
<label>New Password</label>
<input type="password" class="form-control form-control-lg new-password" name="lname">
<p class="settings-pass-error" style="color: red; display: none;">password must be at least 6 characters</p>
</div>


<div class="form-group">
<label>Repeat New Password</label>
<input type="password" class="form-control form-control-lg repeat-new-password" name="lname">
</div>



<div class="kt-form__actions kt-text-align-center-mobile kt-margin-t-30">
<button class="btn btn-primary btn-taller btn-wide kt-font-bold change-password">
<i class="la la-unlock"></i> Change Password
</button>
</div>
<!--end: Form Actions -->

</div>
<!--end: tab-pane -->



</div>
<!--end::tab-content-->
</div>
<!--end::portlet__body-->
</div>
<!--end::Portlet-->



<?php include 'footer.php';?>
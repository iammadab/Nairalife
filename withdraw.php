<?php 
include 'meta.php';
include 'header.php';
$title='Withdraw Money';
$link='withdraw';
include 'link.php';
?>

<div class="kt-portlet btopzero">


<div class="kt-portlet__body">
<div class="alert alert-secondary alert-bold fade show kt-margin-t-20 kt-margin-b-20" role="alert">
<div class="alert-icon"><i class="la la-info-circle kt-font-brand"></i></div>
<div class="alert-text">
Please, enter the amount you want to withdraw below.
</div>
</div>


<div class="form-group">
<label>Enter Amount</label>
<input type="text" class="form-control form-control-lg">
</div>

<div class="kt-form__actions kt-text-align-center-mobile">
<button type="button" class="btn btn-tall btn-primary">Withdraw <i class="flaticon-add-label-button kt-margin-l-5"></i></button>
</div>


</div>
<!--end::Portlet-head-->
</div>
<!--end::Portlet-->

<?php include 'footer.php';?>
<!--Begin::Section-->
<div class="row">
<div class="col-lg-12 kt-margin-t-20 kt-margin-b-0">

<!--begin::Portlet-->
<div class="kt-portlet">
<div class="kt-portlet__body">
<ul class="nav nav-tabs  nav-tabs-line nav-tabs-bolder nav-tabs-line-primary" role="tablist">
<li class="nav-item">
<a class="nav-link active" data-toggle="tab" href="#kt_tabs_7_1" role="tab">
<i class="flaticon2-writing kt-margin-r-5"></i> Group Info
</a>
</li>
<li class="nav-item">
<a class="nav-link" data-toggle="tab" href="#kt_tabs_7_2" role="tab">
<i class="flaticon-users-1 kt-margin-r-5"></i> Group Members
</a>
</li>
<li class="nav-item">
<a class="nav-link" data-toggle="tab" href="#kt_tabs_7_3" role="tab">
<i class="la la-money kt-margin-r-5"></i>Contributions
</a>
</li>
<li class="nav-item">
<a class="nav-link" data-toggle="tab" href="#kt_tabs_7_6" role="tab">
<i class="la la-history kt-margin-r-5"></i>Receiving Order
</a>
</li>
<li class="nav-item">
<a class="nav-link" data-toggle="tab" href="#kt_tabs_7_4" role="tab">
<i class="flaticon2-chat-1 kt-margin-r-5"></i> Group Comments
</a>
</li>
<li class="nav-item">
<a class="nav-link" data-toggle="tab" href="#kt_tabs_7_5" role="tab">
<i class="la la-question-circle kt-margin-r-5"></i> Group Questions
</a>
</li>
</ul>
<div class="tab-content">
<?php 
include 'abt.php';
include 'members.php';
include 'contributions.php';
include 'order.php';
include 'comments.php';
include 'faq.php'; 
?>	
</div>
<!--end::tab-content-->
</div>
<!--end::portlet__body-->
</div>
<!--end::Portlet-->


</div>
<!-- end::col-lg-12-->
</div>
<!-- end::row -->
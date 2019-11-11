<!-- begin:: Subheader -->
<div class="kt-subheader   kt-grid__item" id="kt_subheader">
<div class="kt-subheader__main">	
<h3 class="kt-subheader__title"><?php echo $title;?></h3>
<div class="kt-subheader__breadcrumbs">
<a href="/" class="kt-subheader__breadcrumbs-home"><i class="flaticon2-shelter"></i></a>
<a href="/home" class="kt-subheader__breadcrumbs-link">
Home
</a>
<?php 
if($link):
?>
<span class="kt-subheader__breadcrumbs-separator"></span>
<a href="<%= link %>" class="kt-subheader__breadcrumbs-link">
<?php echo $link;?>
</a>
<?php
endif;
?>
</div>

</div>

<div class="kt-subheader__toolbar">
<div class="kt-subheader__wrapper">
<a href="/withdraw" class="btn btn-secondary kt-subheader__btn-options kt-margin-r-5">
Withdraw <span class="flaticon-add-label-button kt-margin-l-10"></span>
</a>
<a href="/invest" class="btn btn-warning kt-subheader__btn-options">
Contribute <span class="flaticon2-plus kt-margin-l-10"></span>
</a>
</div>
</div>
</div>
<!-- end:: Subheader -->

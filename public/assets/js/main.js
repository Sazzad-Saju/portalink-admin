$(document).ready(function() {

    /*
    ===================================
        HEADER AREA
    ===================================
    */
    // $(".header_accordion").hover(function() {
    //     $(".header_acc_content").slideDown();
    // }, function() {
    //     $(".header_acc_content").slideUp();
    // });

    $(document).on("click", ".header_acc_content .sub_accordion li , .header_acc_content > li > a ", function() {
        $(".header_acc_content").css('display' , 'none');
    });

    $(document).on("hover", ".header_acc_content", function() {
        $(".header_acc_content").css('display' , 'block');
    });

    $(document).on('click', '.header_area .header_account', function() {
        $('.header_account > span').toggleClass('header_account_arrow');
        $('.header_account_inner').slideToggle();
    });

    $(document).on('click', '.header_accordion > span', function() {
        $('.header_acc_content').slideToggle();
    });
});
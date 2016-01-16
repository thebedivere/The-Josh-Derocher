$(document).ready(function () {
    $('.toggle-more').click(function (e) {
        var toggleId = $(this).attr('id');
        var toggleIndex = toggleId.replace('toggle-', '');
        $("#card-" + toggleIndex).toggleClass('move-up');
        e.stopPropagation();
    });
    $(document).click(function () {
        $('.move-up').removeClass('move-up');
    });
    $(document).scroll(function () {
        $('.move-up').delay( 1000 ).removeClass('move-up');
    });
});
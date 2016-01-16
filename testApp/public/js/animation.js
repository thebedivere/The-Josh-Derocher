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
        $('.move-up').delay(1000).removeClass('move-up');
    });

    $(function () {
        $('a[href*=#]:not([href=#])').click(function () {
            if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                if (target.length) {
                    $('html,body').animate({
                        scrollTop: target.offset().top
                    }, 1000);
                    return false;
                }
            }
        });
    });
});
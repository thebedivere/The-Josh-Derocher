$(document).ready(function () {
    $(function () {
        $('.toggle-more').click(function () {
            var toggleId = $(this).attr('id');
            var toggleIndex = toggleId.replace('toggle-', '');
            $("#card-" + toggleIndex).toggleClass('move-up');
        });
    });
    $(function () {
        $('.toggle-less').click(function () {
            var toggleId = $(this).attr('id');
            var toggleIndex = toggleId.replace('toggle-less-', '');
            $("#card-" + toggleIndex).removeClass('move-up');
        });
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
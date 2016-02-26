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

});
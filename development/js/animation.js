$(document).ready(function () {
    console.log("Animation ready");
    $(this).click(function () {
        console.log(this);
    });
    $('div').click(function () {
        var toggleId = $(this).attr('id');
        var toggleIndex = toggleId.replace('toggle-', '');
        console.log('clicked ');
        $("#card-" + toggleIndex).toggleClass('open');
    });
    console.log("Animation ready 2");
});

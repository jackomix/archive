$.when($.getScript("/js/jquery.lettering-0.6.1.min.js")).done(function(){
    $(document).ready(function () {
        $('.side-text').each(function(){
            console.log("yep");
            $(this).lettering();
        });
    });
});
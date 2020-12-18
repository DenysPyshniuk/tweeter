//Function to show a counter of characters and to show and hide errors
$(document).ready(function() {
    $("#tweet-text").on("keyup", function() {
        let length = $(this).val().length;
        if (length > 0 && length <= 140) {
            $('#error1').hide();
            $('#error2').hide();
        }
        let $counter = $(".counter");
        $counter.val(140 - length);
        if ($counter.val() < 0) {
            $counter.css({ color: "red" });
        } else {
            $counter.css({ color: "#545149" });
        }
    });
});
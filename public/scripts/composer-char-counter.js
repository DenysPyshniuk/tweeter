$(document).ready(function () {
  $("#tweet-text").on("input", function () {
    let length = $(this).val().length;
    let $counter = $(".counter");
    $counter.val(140 - length);
    if ($counter.val() < 0) {
      $counter.css({ color: "red" });
    } else {
      $counter.css({ color: "#545149;" });
    }
  });
});

// (() => {
//   const $tweetText = $("#tweet-text"); // this is an obj
//   const update = () => {
//     const chars = 140 - $tweetText.val().length;
//     const $counter = $("#counter");
//     $counter.text(chars);
//   };
//   $tweetText.on("keyup", update); //<=====HERE
// });

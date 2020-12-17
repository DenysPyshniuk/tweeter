/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {
    // Test / driver code (temporary). Eventually will get this from the server.
    const tweetData = [{
            user: {
                name: "Cosmo",
                avatars: "fas fa-user-astronaut fa-3x",
                handle: "@Armstrong",
            },
            content: {
                text: "Everyting is going okay!",
            },
            created_at: 1461116232227,
        },

        {
            user: {
                name: "Pluto",
                avatars: "fas fa-robot fa-3x ",
                handle: "@Alian",
            },
            content: {
                text: "How it's going there on The Earth?",
            },
            created_at: 1461116232227,
        },
    ];

    function createTweetElement(tweet) {
        const name = tweet.user.name;
        const avatars = tweet.user.avatars;
        const handle = tweet.user.handle;
        const text = tweet.content.text;
        const timePosted = tweet.created_at;
        const timePast = moment(timePosted).toNow(true);
        let $tweet = `<article class="tweet-article">
              <div class="top-article">
                <div class="icon-name">
                  <i class = '${avatars}' > </i>
                  <p> ${name} </p>
                </div>
                <div class="handle">
                  <p> ${handle} </p>
                </div>
              </div>
              <header class = "header-article">
                <h5> ${text} </h5>
              </header>
              <footer class = "footer-article">
                <div >
                  <p> ${timePast} </p>
                  <i class="fas fa-retweet"></i>
                </div>
              </footer>
            </article> `;
        return $($tweet);
    }

    const renderTweets = function(tweetData) {
        // loops through tweets
        for (let element of tweetData) {
            // calls createTweetElement for each tweet
            const $tweet = createTweetElement(element);
            // takes return value and appends it to the tweets container
            // to add it to the page so we can make sure it's got all the right elements, classes, etc.
            $("#tweets-container").append($tweet);
        }
    };

    //Preventing Default Behaviour of the Form
    $("form").submit(function(event) {
        event.preventDefault();
        $.ajax({ type: "POST", url: "/tweets", data: $(this).serialize() })
            .then(console.log("It works!"));
    });

    renderTweets(tweetData);
});
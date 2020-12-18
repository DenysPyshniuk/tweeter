//jQuery's document ready function
$(document).ready(function() {

//Function takes in array of objects and render them to the DOM
    const renderTweets = function(tweetData) {
        // loops through tweets
        for (let element of tweetData) {
            // calls createTweetElement for each tweet
            const $tweet = createTweetElement(element);
            // takes return value and appends it to the tweets container
            $("#tweets-container").prepend($tweet);
        }
    };

//GET ajax request for tweet
    const loadTweets = function() {
        $.ajax({
            type: "GET",
            url: "/tweets",
            dataType: "json",
            success: function(data) {
                console.log('Success: ', data);
                $("#tweets-container").empty();
                renderTweets(data);
            }
        });
    }
    loadTweets();

//Validates if input was provided and it's not more then 140 characters
    const validation = function(tweet) {
        if (tweet === '') {
            $('#error1').slideDown();
        } else if (tweet.length > 140) {
            $('#error2').slideDown()
        } else {
            return true;
        }
    }

//Escape function to prevent vulnerability of the textarea
    const escape = function(str) {
        let div = document.createElement('div');
        div.appendChild(document.createTextNode(str));
        return div.innerHTML;
    }
//Function to create new article
    const createTweetElement = function(tweet) {
        const escape = function(str) {
            let div = document.createElement('div');
            div.appendChild(document.createTextNode(str));
            return div.innerHTML;
        }
        const name = tweet.user.name;
        const avatars = 'fas fa-user-astronaut fa-3x';
        const handle = tweet.user.handle;
        const text = tweet.content.text;
        const timePosted = tweet.created_at;
        const timePast = moment(timePosted).toNow(true);
        let $tweet = `<article class="tweet-article">
                <header class="top-article">
                <div class="icon-name">
                    <i class = '${escape(avatars)}' > </i>
                    <p> ${escape(name)} </p>
                </div>
                <div class="handle">
                    <p> ${escape(handle)} </p>
                </div>
                </header>
                <body class = "body-article">
                <h5> ${escape(text)} </h5>
                </body>
                <footer class = "footer-article">
                    <div class="time">
                    <p> ${escape(timePast)} </p>
                </div>
                <div class="share-icons">
                    <i class="far fa-bookmark"></i>
                    <i class="far fa-share-square"></i>
                    <i class="far fa-heart"></i>
                </div>
                </footer>
            </article> `;
        return $($tweet);
    }
//Preventing Default Behaviour of the Form & Post a tweet
    $("form").submit(function(event) {
        event.preventDefault();
        if (validation($("#tweet-text").val())) {
            validation($("#tweet-text").val());
            $.ajax({ type: "POST", url: "/tweets", data: $(this).serialize() })
                .then(() => {
                    console.log('It works!');
                    $("#tweet-text").val("");
                    $(".counter").val("140")
                    loadTweets();
                });
        }
    });
});
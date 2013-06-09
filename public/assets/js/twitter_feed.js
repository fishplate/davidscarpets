JQTWEET = {

    // Set twitter username, number of tweets & id/class to append tweets
    user: 'Davids_Carpets',
    numTweets: 4,
    appendTo: '#jstwitter',
    // core function of jqtweet
    loadTweets: function () {
        $.ajax({
                url: 'http://api.twitter.com/1/statuses/user_timeline.json/',
                type: 'GET',
                dataType: 'jsonp',
                data: {
                    screen_name: JQTWEET.user,
                    include_rts: false,
                    count: JQTWEET.numTweets,
                    include_entities: true
                },
                success: function (data, textStatus, xhr) {
                    var html = '<div class="tweet"><p class="tweetText">TWEET_TEXT</p>IMG_TAG<div class="time">AGO</div></div>';
                    var img;
                    // append tweets into page
                    for (var i = 0; i < data.length; i++) {

                        //this is where we grab the image, only generate the HTML code if media entities were found in the JSON data
                        try {
                            if (data[i].entities.media) {
                                img = '<a href="' + data[i].entities.media[0].media_url + '" class="fancybox" rel="group">';
                                img += '<img src="' + data[i].entities.media[0].media_url + '" class="twitterImage"  />';
                                img += '</a>';


                                img_link = '<a href="' + data[i].entities.media[0].media_url + ' "class="showLink">View Photo';
                                img_link += '</a>';
                                img_link += '<img src="' + data[i].entities.media[0].media_url + '" class="twitterImage"  />';

                            } else {
                                img = '';
                            }
                        } catch (e) {
                            //e
                        }

                        $(JQTWEET.appendTo).append(
                            html.replace('IMG_TAG', img)
                            .replace(img, img_link)
                            .replace('TWEET_TEXT', JQTWEET.ify.clean(data[i].text, img))
                            .replace(/USER/g, data[i].user.screen_name)
                            .replace('AGO', JQTWEET.timeAgo(data[i].created_at))
                            .replace(/ID/g, data[i].id_str));

                    }

                    

                    $(".twitterImage").hide();

                    $(".showLink").live('click', function (e) {
                        e.preventDefault();
                        $(this).next(".twitterImage").show();
                        $(this).text('Hide Photo').css('display', 'block').removeClass("showLink").addClass("hideLink");

                    });

                    $(".hideLink").live('click', function (e) {
                        e.preventDefault();
                        $(this).next(".twitterImage").hide();
                        $(this).text('View Photo').removeClass("hideLink").addClass("showLink");

                    });



                }
            });

    },


    /**
     * relative time calculator FROM TWITTER
     * @param {string} twitter date string returned from Twitter API
     * @return {string} relative time like "2 minutes ago"
     */
    timeAgo: function (dateString) {
        var rightNow = new Date();
        var then = new Date(dateString);

        /*if ($.browser.msie) {
                                                // IE can't parse these crazy Ruby dates
                                                then = Date.parse(dateString.replace(/( \+)/, ' UTC$1'));
                                }*/

        var diff = rightNow - then;

        var second = 1000,
            minute = second * 60,
            hour = minute * 60,
            day = hour * 24,
            week = day * 7;

        if (isNaN(diff) || diff < 0) {
            return ""; // return blank string if unknown
        }

        if (diff < second * 2) {
            // within 2 seconds
            return "right now";
        }

        if (diff < minute) {
            return Math.floor(diff / second) + " seconds ago";
        }

        if (diff < minute * 2) {
            return "about 1 minute ago";
        }

        if (diff < hour) {
            return Math.floor(diff / minute) + " minutes ago";
        }

        if (diff < hour * 2) {
            return "about 1 hour ago";
        }

        if (diff < day) {
            return Math.floor(diff / hour) + " hours ago";
        }

        if (diff > day && diff < day * 2) {
            return "yesterday";
        }

        if (diff < day * 365) {
            return Math.floor(diff / day) + " days ago";
        } else {
            return "over a year ago";
        }
    }, // timeAgo()


    /**
     * The Twitalinkahashifyer!
     * http://www.dustindiaz.com/basement/ify.html
     * Eg:
     * ify.clean('your tweet text');
     */
    ify: {

        //the purpose of hasIMG parameter is to remove all the unnessary links if there is images,
        //otherwise, parse link as usual
        link: function (tweet, hasIMG) {
            return tweet.replace(/\b(((https*\:\/\/)|www\.)[^\"\']+?)(([!?,.\)]+)?(\s|$))/g, function (link, m1, m2, m3, m4) {
                var http = m2.match(/w/) ? 'http://' : '';
                if (hasIMG) return '';
                else return '<a class="twtr-hyperlink" target="_blank" href="' + http + m1 + '">' + ((m1.length > 25) ? m1.substr(0, 24) + '...' : m1) + '</a>' + m4;
            });
        },

        at: function (tweet) {
            return tweet.replace(/\B[@＠]([a-zA-Z0-9_]{1,20})/g, function (m, username) {
                return '<a target="_blank" class="twtr-atreply" href="http://twitter.com/intent/user?screen_name=' + username + '">@' + username + '</a>';
            });
        },

        list: function (tweet) {
            return tweet.replace(/\B[@＠]([a-zA-Z0-9_]{1,20}\/\w+)/g, function (m, userlist) {
                return '<a target="_blank" class="twtr-atreply" href="http://twitter.com/' + userlist + '">@' + userlist + '</a>';
            });
        },

        hash: function (tweet) {
            return tweet.replace(/(^|\s+)#(\w+)/gi, function (m, before, hash) {
                return before + '<a target="_blank" class="twtr-hashtag" href="http://twitter.com/search?q=%23' + hash + '">#' + hash + '</a>';
            });
        },

        //added hasIMG parameter
        clean: function (tweet, hasIMG) {
            return this.hash(this.at(this.list(this.link(tweet, hasIMG))));
        }
    } // ify

};



// start jqtweet!
JQTWEET.loadTweets();
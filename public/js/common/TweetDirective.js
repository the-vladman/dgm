'use strict';

define( function () {
    return function ( $window, $location ) {
        return {
            restrict    : 'A',
            scope       : {
                tweet       : '=',
                tweetUrl    : '='
            },
            link        : function ( scope, element, attrs ) {
                // Check for Twitter SDK
                if ( !$window.twttr ) {
                    $.getScript('//platform.twitter.com/widgets.js', function () {
                        renderTweetButton();
                    });
                } else {
                    renderTweetButton();
                }

                var watchAdded  = false;
                function renderTweetButton() {
                    if ( !scope.tweet && !watchAdded ) {
                        watchAdded      = true;
                        var unbindWatch = scope.$watch( 'tweet', function ( newValue, oldValue ) {
                            if ( newValue ) {
                                renderTweetButton();
                                unbindWatch();
                            }
                        });

                        return;
                    } else {
                        element.html( '<a href="https://twitter.com/share" class="twitter-share-button" data-text="' + scope.tweet + '" data-url="' + (scope.tweetUrl || $location.absUrl()) + '" data-via="DatosGobMx">Tweet</a>' );
                        $window.twttr.widgets.load( element.parent()[0] );
                    }
                }
            }
        };
    };
});
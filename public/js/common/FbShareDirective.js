'use strict';

define( function () {
    return function ( $window, $location ) {
        return {
            restrict    : 'A',
            scope       : {
                fbShare : '=?'
            },
            link        : function ( scope, element, attrs ) {
                if ( !$window.FB ) {
                    $.getScript( '//connect.facebook.net/es_LA/all.js', function () {
                        FB.init({
                            xfbml : true,
                            version: 'v2.0'
                        });

                        renderLikeButton();
                    });
                } else {
                    renderLikeButton();
                }

                var watchAdded  = false;
                function renderLikeButton() {
                    if ( !!attrs.fbLike && !scope.fbLike && !watchAdded ) {
                        watchAdded          = true;
                        var unbindWatch     = scope.$watch( 'fbLike', function ( newValue, oldValue ) {
                        if ( newValue ) {
                            renderLikeButton();
                            unbindWatch();
                        }

                        });
                        return;
                    } else {
                        element.html( '<div class="fb-share-button"' + ( !!scope.fbLike ? ' data-href="' + scope.fbLike + '"' : '') + ' data-layout="button_count"></div>' );
                        $window.FB.XFBML.parse( element.parent()[0] );
                    }
                }
            }
        };
    };
});
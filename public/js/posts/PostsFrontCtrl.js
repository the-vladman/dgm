'use strict';

define( function () {
    return function ( $scope, $stateParams, $sce, Posts ) {
        $scope.post     = Posts.get( $stateParams.post, true );

        $scope.$on( Posts.getEvent( 'RETRIEVED' ), function () {
            $scope.content  = $sce.trustAsHtml( $scope.post.content );

            var disqusShortname         = 'datosgobmx',
                config                  = function () {
                    this.language           = 'es_MX';
                    this.page.url           = location;
                    this.page.identifier    = $scope.post.slug;
                    this.page.title         = $scope.post.name;
                    this.experiment.enable_scroll_container = false;
                };

            if ( window.DISQUS == undefined ) {
                window.disqus_config    = config;
                ( function () {
                    var dsq     = document.createElement( 'script' );
                    dsq.type    = 'text/javascript';
                    dsq.async   = true;
                    dsq.src     = '//' + disqusShortname + '.disqus.com/embed.js';
                    ( document.getElementsByTagName( 'head' )[0] || document.getElementsByTagName( 'body' )[0]).appendChild( dsq );
                })();
            } else {
                DISQUS.reset({
                    reload  : true,
                    config  : config
                });
            }
        });
    };
});
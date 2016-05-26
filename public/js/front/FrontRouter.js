'use strict';

define( function () {
    return function ( $stateProvider ) {
        $stateProvider
            .state( 'front', {
                abstract    : true,
                views       : {
                    application         : {
                        templateUrl     : 'partials/front/base',
                        controller      : 'FrontCtrl'
                    }
                }
            })
            .state( 'home', {
                abstract    : true,
                parent      : 'front',
                views       : {
                    'front-container'   : {
                        templateUrl     : 'partials/front/home'
                    }
                }
            })
            .state( 'landing', {
                parent      : 'home',
                url         : '/',
                views       : {
                    'landing-search'    : {
                        templateUrl     : 'partials/front/landingSearch',
                        controller      : 'LandingSearchCtrl'
                    },
                    'landing-data'      : {
                        templateUrl     : 'partials/front/landingData',
                        controller      : 'LandingDataCtrl'
                    },
                    'landing-tools'     : {
                        templateUrl     : 'partials/front/landingTools',
                        controller      : 'LandingPostsCtrl'
                    },
                    'landing-blog'      : {
                        templateUrl     : 'partials/front/landingBlog',
                        controller      : 'LandingPostsCtrl'
                    },
                    'landing-subscribe' : {
                        templateUrl     : 'partials/front/landingSubscribe',
                        controller      : 'LandingSubscribeCtrl'
                    }
                }
            })
            .state( 'front.category', {
                url     : '/categoria/:category',
                views   : {
                    'front-container'   : {
                        templateUrl     : 'partials/categories/category',
                        controller      : 'CategoriesContentCtrl'
                    }
                }
            })
            .state( 'front.post', {
                url     : '/{section:herramientas|blog}/:post?category&tag',
                views   : {
                    'front-container'   : {
                        templateUrl     : 'partials/posts/front',
                        controller      : 'PostsFrontCtrl'
                    }
                }
            })
            .state( 'front.section', {
                params  : {
                    category_id : null,
                    section_id  : null
                },
                url     : '/{section:herramientas|blog}?category&tag',
                views   : {
                    'front-container'   : {
                        templateUrl     : 'partials/posts/section',
                        controller      : 'PostsSectionCtrl'
                    }
                }
            });
    };
});
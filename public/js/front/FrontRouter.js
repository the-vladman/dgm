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
            .state( 'about', {
                parent  : 'front',
                url     : '/acerca',
                views   : {
                    'front-container'   : {
                        templateUrl     : 'partials/front/about',
                        controller      : 'FrontAboutCtrl'
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
                        templateUrl     : 'partials/data/table',
                        controller      : 'DataLoadCtrl'
                    },
                    'landing-tools'     : {
                        templateUrl     : 'partials/front/posts',
                        controller      : 'FrontPostsCtrl'
                    },
                    'landing-blog'      : {
                        templateUrl     : 'partials/front/posts',
                        controller      : 'FrontPostsCtrl'
                    },
                    'landing-subscribe' : {
                        templateUrl     : 'partials/front/landingSubscribe',
                        controller      : 'LandingSubscribeCtrl'
                    }
                }
            })
            .state( 'category', {
                abstract    : true,
                parent      : 'front',
                url         : '/categoria',
                views       : {
                    'front-container'   : {
                        templateUrl     : 'partials/categories/front'
                    }
                }
            })
            .state( 'category.details', {
                url         : '/:category',
                views       : {
                    'category-header'   : {
                        templateUrl     : 'partials/categories/header',
                        controller      : 'CategoriesHeaderCtrl'
                    },
                    'category-data'     : {
                        templateUrl     : 'partials/data/table',
                        controller      : 'DataLoadCtrl'
                    },
                    'category-tools'    : {
                        templateUrl     : 'partials/front/posts',
                        controller      : 'FrontPostsCtrl'
                    },
                    'category-blog'     : {
                        templateUrl     : 'partials/front/posts',
                        controller      : 'FrontPostsCtrl'
                    },
                    'category-extras'   : {
                        templateUrl     : 'partials/categories/extras',
                        controller      : 'CategoriesExtraCtrl'
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
            })
            .state( '404', {
                parent  : 'front',
                url     : '/404',
                views   : {
                    'front-container'   : {
                        templateUrl     : 'partials/front/404'
                    }
                }
            });
    };
});
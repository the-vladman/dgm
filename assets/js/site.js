var Site    = {

    init            : function () {
        Site._loadTweets();
        Site._pageViews();
        Site._setCategories();
        Site._setData();
        Site._setForm();
        Site._setHovers();
        Site._setResources();
        Site._setSubscribe();
        Site._setVideo();
    },

    _alert          : function ( msg, type ) {
        $( '#system-notification' ).css( 'display', 'block' );
        $( '#system-notification .notification' ).addClass( type );
        $( '#system-notification p' ).html( msg );
        $( '#system-notification .notification-container' ).slideDown();

        var timer   = setTimeout( function () {
            $( '#system-notification .notification-container' ).slideUp();
            $( '#system-notification .notification' ).removeClass( type );
            $( '#system-notification p' ).html( '' );
            $( '#system-notification' ).css( 'display', 'none' );
        }, 3500 );

        $( '#system-notification .glyphicon-remove' ).click( function () {
            $( '#system-notification .notification-container' ).slideUp();
            $( '#system-notification .notification' ).removeClass( type );
            $( '#system-notification p' ).html( '' );
            $( '#system-notification' ).css( 'display', 'none' );
            clearTimeout( timer );
        });
    },

    _loadTweets     : function () {
        $.get( 'tweets.json',
            function ( data ) {
                for ( var i = 0; i < data.length; i++ ) {
                    var element = $( '<div class="col-lg-4 col-md-4 col-sm-4 col-xs-12 tweet"><div class="inner"><p>' + data[i].content + '</p><p class="small">' + data[i].date + '</p><div class="author"><div class="pull-left avatar"><img src="' + data[i].avatar + '"></div><div class="pull-left"><p>' + data[i].author + '</p><a href="https://twitter.com/' +data[i].author_handler + '" target="_blank">@' + data[i].author_handler + '</a></div></div></div></div>' );
                    $( '#tweets-container' ).append( element );
                }
            });
    },

    _pageViews      : function () {
        var path    = window.location.pathname,
            loc     = null;

        path        = path.substring( 1 );

        if ( path.charAt( path.length - 1 ) == '/' ) {
            path    = path.substring( 0, path.length - 1 );
        } else {
            path    = path.replace( '.html', '' );
        }

        if ( path == '' ) {
            loc     = 'datos.landing';
        } else {
            loc     = 'datos.' + path.replace( /\//g, '.' );
        }

        udm_( 'http://b.scorecardresearch.com/b?c1=2&c2=17183199&ns_site=gobmx&name=' + loc );
    },

    _setCategories  : function () {
        var el      = $( '#categories ul li' ),
            width   = el.length * el.width();

        $( '#categories ul' ).width( width );
    },

    _setData        : function () {
        var link    = 'http://ng-ckan.bitslice.net/';

        if ( $( '#tab-recents' ).length > 0 ) {
            $.get( 'http://catalogo.datos.gob.mx/api/3/action/package_search', {
                    rows    : 3,
                    start   : 0
                }, function ( data ) {
                    var results = data.result.results,
                        list    = $( '#tab-recents tbody' );

                    for ( var i = 0; i < results.length; i++ ) {
                        var organization    = ( results[i].organization ) ? results[i].organization.title : ( results[i].groups && ( results[i].groups.length > 0 ) ) ? results[i].groups[0].display_name : '',
                            el              = $('<tr data-link="' + link + '#/conjuntos/' + results[i].name + '"><td>' + results[i].title + '</td><td width="20%">' + organization.substring( 0, 20 ) + '</td><td width="20%">' + results[i].metadata_modified.substring( 0, 10 ) + '</td></tr>');

                        list.append( el );
                        el.click( function ( e ) {
                            window.open( el.attr( 'data-link' ), '_blank' );
                        });
                    }
                });
        }

        if ( $( '#tab-downloads' ).length > 0 ) {
            $.get( 'http://catalogo.datos.gob.mx/api/3/action/package_search', {
                    rows    : 3,
                    start   : 0,
                    sort    : 'views_recent desc'
                }, function ( data ) {
                    var results = data.result.results,
                        list    = $( '#tab-downloads tbody' );

                    for ( var i = 0; i < results.length; i++ ) {
                        var organization    = ( results[i].organization ) ? results[i].organization.title : ( results[i].groups && ( results[i].groups.length > 0 ) ) ? results[i].groups[0].display_name : '',
                            el              = $('<tr data-link="' + link + '#/conjuntos/' + results[i].name + '"><td>' + results[i].title + '</td><td width="20%">' + organization.substring( 0, 20 ) + '</td><td width="20%">' + results[i].metadata_modified.substring( 0, 10 ) + '</td></tr>');
                        list.append( el );
                        el.click( function ( e ) {
                            window.open( el.attr( 'data-link' ), '_blank' );
                        });
                    }
                });
        }

        if ( $( '#data-tab-recents' ).length > 0 ) {
            var section     = $( '#data-tab-recents' ).attr( 'data-tag' );
            $.get( 'http://catalogo.datos.gob.mx/api/3/action/package_search', {
                    q       : 'tags:' + section,
                    rows    : 3,
                    start   : 0
                }, function ( data ) {
                    var results = data.result.results,
                        table   = $( '#data-tab-recents table tbody' );

                    if ( results.length > 0 ) {
                        $( '#category-data' ).removeClass( 'hidden' );
                    }

                    for ( var i = 0; i < results.length; i++ ) {
                        table.append( $('<tr><td><a href="' + link + '#/conjuntos/' + results[i].name + '" target="_blank">' + results[i].title + '</a></td><td><a href="' + link + '#/instituciones/' + results[i].organization.name + '" target="_blank">' + results[i].organization.title + '</a></td><td>' + results[i].metadata_modified.substring( 0, 10 ) + '</td><td><span class="label" data-format="csv">CSV</span><span class="label" data-format="klm">KLM</span></td><td class="ic-dataset"><a href="' + link + '#/conjuntos/' + results[i].name + '" target="_blank"><img src="/assets/img/ic-dataset.png"></a></td></tr>'));
                    }
                });
        }

        if ( $( '#data-tab-downloads' ).length > 0 ) {
            var section     = $( '#data-tab-downloads' ).attr( 'data-tag' );
            $.get( 'http://catalogo.datos.gob.mx/api/3/action/package_search', {
                    q       : 'tags:' + section,
                    rows    : 3,
                    start   : 0,
                    sort    : 'views_recent desc'
                }, function ( data ) {
                    var results = data.result.results,
                        table   = $( '#data-tab-downloads table tbody' );

                    for ( var i = 0; i < results.length; i++ ) {
                        table.append( $('<tr><td><a href="' + link + '#/conjuntos/' + results[i].name + '" target="_blank">' + results[i].title + '</a></td><td><a href="' + link + '#/instituciones/' + results[i].organization.name + '" target="_blank">' + results[i].organization.title + '</a></td><td>' + results[i].metadata_modified.substring( 0, 10 ) + '</td><td><span class="label" data-format="csv">CSV</span><span class="label" data-format="klm">KLM</span></td><td class="ic-dataset"><a href="' + link + '#/conjuntos/' + results[i].name + '" target="_blank"><img src="/assets/img/ic-dataset.png"></a></td></tr>'));
                    }
                });
        }
    },

    _setForm        : function () {
        $( '#search-form' ).submit( function ( e ) {
            e.preventDefault();

            window.open( 'http://ng-ckan.bitslice.net/#/conjuntos?q=' + $( '#search-keyword' ).val(), '_blank' );
            $( '#search-keyword' ).val( '' );
        });
    },

    _setHovers      : function () {
        var item    = $( '.navigation-item .item-img' ),
            img     = $( '.navigation-item img' ),
            link;
        item.height( img.height() );
        $( '.navigation-item .link-center' ).css({
            bottom  : ( img.height() ) / 2
        });

        $( '.navigation-item' ).hover( function ( e ) {
            $( '.item-hover', e.currentTarget ).slideToggle( function () {
                link    = $( '.link-center.first', e.currentTarget );
                link.css({
                    bottom  : ( img.height() - link.height() ) / 2,
                    opacity : 1
                }).removeClass( 'first' );
            });
        });

        $( '.post-item' ).hover( function ( e ) {
            $( '.post-overlay', e.currentTarget ).stop().slideToggle();
            $( '.post-overlay', e.currentTarget ).unbind( 'click' ).click( function ( e ) {
                window.location.href    = $( e.currentTarget ).attr( 'data-link' );
            });
        });

        $( '.navigation-item .item-hover' ).click( function ( e ) {
            window.location.href    = $( 'a', $( e.currentTarget ).parent().next() ).attr( 'href' );
        });

        $( '.resource-item .item-hover' ).click( function ( e ) {
            window.location.href    = $( 'a', $( e.currentTarget ) ).attr( 'href' );
        });
    },

    _setResources   : function () {
        var item    = $( '.resource-item .item' );
        item.height( item.width() );

        $( '.resource-item' ).hover( function ( e ) {
            $( '.item-hover', e.currentTarget ).slideToggle();
        });
    },

    _setSubscribe   : function () {
        $( '#subscribe-form' ).submit( function ( e ) {
            e.preventDefault();

            var form    = $( this ),
                email   = form.find( '.form-control' );

            if ( email.val() == '' ) {
                Site._alert( 'Por favor ingrese una dirección de correo', 'error' );
                email.focus();
            } else {
                $.ajax({
                    type        : form.attr( 'method' ),
                    url         : form.attr( 'action' ),
                    data        : form.serialize(),
                    cache       : false,
                    dataType    : 'json',
                    contentType : "application/json; charset=utf-8",
                    error       : function( err ) {
                        Site._alert( 'Uups, algo paso que no pudimos registrate, intenta más tarde.', 'error' );
                        email.focus();
                    },
                    success     : function( data ) {
                        if ( data.result != "success" ) {
                            Site._alert( 'Al parecer el correo electrónico que ingresaste no existe o es invalido.', 'error' );
                            email.focus();
                        } else {
                            Site._alert( 'Para completar tu registro verifica tu correo electrónico.', 'info' );
                            email.val( '' );
                        }
                    }
                });
            }
        });
    },

    _setVideo       : function () {
        $( '#toggle-video' ).click( function ( e ) {
            e.preventDefault();

            $( '#home-video' ).slideToggle();
        });
    }
}

$( document ).ready( Site.init );
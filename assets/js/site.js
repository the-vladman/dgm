var Site    = {

    init            : function () {
        Site._setData();
        Site._setHovers();
        Site._setResources();
    },

    _setData        : function () {
        if ( $( '#tab-recents' ).length > 0 ) {
            $.get( 'http://catalogo.datos.gob.mx/api/3/action/package_search', {
                    rows    : 3,
                    start   : 0
                }, function ( data ) {
                    var results = data.result.results,
                        list    = $( '#tab-recents ul' );

                    for ( var i = 0; i < results.length; i++ ) {
                        list.append( $('<li><a href="http://busca.datos.gob.mx/#/conjuntos/' + results[i].name + '" target="_blank">' + results[i].title + '</a></li>') );
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
                        list    = $( '#tab-downloads ul' );

                    for ( var i = 0; i < results.length; i++ ) {
                        list.append( $('<li><a href="http://busca.datos.gob.mx/#/conjuntos/' + results[i].name + '" target="_blank">' + results[i].title + '</a></li>') );
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
                        table.append( $('<tr><td>' + results[i].title + '</td><td>' + results[i].organization.title + '</td><td>' + results[i].metadata_modified.substring( 0, 10 ) + '</td><td><span class="label" data-format="csv">CSV</span><span class="label" data-format="klm">KLM</span></td><td class="ic-dataset"><img src="/assets/img/ic-dataset.png"></td></tr>'));
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
                        table.append( $('<tr><td>' + results[i].title + '</td><td>' + results[i].organization.title + '</td><td>' + results[i].metadata_modified.substring( 0, 10 ) + '</td><td><span class="label" data-format="csv">CSV</span><span class="label" data-format="klm">KLM</span></td><td class="ic-dataset"><img src="/assets/img/ic-dataset.png"></td></tr>'));
                    }
                });
        }
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
    }
}

$( document ).ready( Site.init );
var Site    = {
    init        : function () {
        Site._setTabs();
    },

    _setTabs    : function () {
        $( '.nav-tabs a' ).click( function ( e ) {
            e.preventDefault()
            $( this ).tab( 'show' )
        });
    }
}

$( document ).ready( Site.init );
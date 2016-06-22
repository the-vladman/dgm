'use strict';

define( function () {
    return function ( $scope ) {
        $scope.subscribe    = function ( e ) {
            e.preventDefault();
            if ( $scope.email ) {
                var form        = $( e.currentTarget ),
                    emailEl     = $( 'input[name="EMAIL"]', form );

                $.ajax({
                    type        : form.attr( 'method' ),
                    url         : form.attr( 'action' ),
                    data        : form.serialize(),
                    cache       : false,
                    dataType    : 'json',
                    contentType : "application/json; charset=utf-8",
                    success     : function( data ) {
                        if ( data.result != "success" ) {
                            alert( 'Al parecer el correo electrónico que ingresaste no existe o es invalido.' );
                            emailEl.focus();
                        } else {
                            alert( 'Para completar tu registro verifica tu correo electrónico.' );
                            $scope.email    = '';
                        }
                    },
                    error       : function( err ) {
                        if ( err.result != "success" ) {
                            alert( 'Al parecer el correo electrónico que ingresaste no existe o es invalido.' );
                            emailEl.focus();
                        } else {
                            alert( 'Para completar tu registro verifica tu correo electrónico.' );
                            $scope.email    = '';
                        }
                    }
                });
            }
        };
    };
});
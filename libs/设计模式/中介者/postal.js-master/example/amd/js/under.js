require.config( {
	paths : {
		underscore  : "libs/underscore/underscore",
		jquery      : "libs/jquery/jquery-min"
	}
} );

require( [ "jquery" ], function ( $ ) {
	$( function () {
		require( [ "underppp" ] );
	} );
} );
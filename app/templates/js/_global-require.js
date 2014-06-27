require.config({
	shim: {},
	paths: {}
});
<% if (includeModernizr) { %>
define('modernizr', [], Modernizr);
<% } %>
<% if (includeJquery) { %>
if (typeof jQuery === 'function') {
    define( 'jquery', function () { return jQuery; } );
}
<% } %>
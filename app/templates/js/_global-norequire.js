(function(<% if (includeJquery) { %>$, <% } %>window, document) {

    window.<%= _.camelize(projectName) %> = window.<%= _.camelize(projectName) %> || {};

    <%= _.camelize(projectName) %>.init = function() {
        
    };

    <%= _.camelize(projectName) %>.Utils = {

        addWindowResizeHandler: function(handler) {
            if (window.addEventListener)
                window.addEventListener("resize", handler, false);
            else
                window.attachEvent("onresize", handler, this);
        },

        removeWindowResizeHandler: function(handler) {
            if (window.removeEventListener)
                window.removeEventListener("resize", handler, false);
            else
                window.detachEvent("onresize", handler, this);
        }

    };

    <% if (includeJquery) { %>$(document).ready(function() {<% } %>
        <%= _.camelize(projectName) %>.init();
    <% if (includeJquery) { %>});<% } %>

})(<% if (includeJquery) { %>jQuery, <% } %>window, document);
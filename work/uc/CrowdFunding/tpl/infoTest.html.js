define(function() {
    return '<%_.each(datas, function(item, index){ %> <a href="javascript:void(0);" city-id="<%= item.ID %>" city-value="<%= item.Value %>"><%= item.Name %></a> <%}); %>';
});
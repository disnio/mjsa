$(function(){
    $('.jAutochecklist').jAutochecklist();

    $('#ex2').jAutochecklist({
        width: 300,
        listWidth: 400,
        listMaxHeight: 300
    });
    $('#ex3').jAutochecklist({
        popup: false
    });
    $('#ex4').jAutochecklist({
        firstItemSelectAll: true,
        popupMaxItem: 20
    });
    $('#ex5').jAutochecklist({
        popupSizeDelta: 0
    });
    $('#ex6').jAutochecklist({
        showValue: true
    });
    $('#ex7').jAutochecklist({
        textAllSelected: 'All items selected',
        textEmpty: 'Nothing is selected',
        textNoResult: 'Found nothing',
        textSearch: 'Search something here',
        textMoreItem : 'and {0} more...'
    });
    $('#ex8').jAutochecklist({
        checkbox: true
    });
    $('#ex9').jAutochecklist({
        firstItemSelectAll: true
    });
    $('#ex10').jAutochecklist({
        multiple: false
    });


    $('#ex15').jAutochecklist({
        firstItemSelectAll: true,
        onItemClick: function(val, li, valBefore, valAfter){
            alert('Selected:'+val+'. Before:'+valBefore+'. After:'+valAfter);
            if (valAfter.length>2)
                return false;
        }
    });
    $('#ex16').jAutochecklist({
        onClose: function(val){
            alert('Selected: ' + val);
        }
    });
    $('#ex17').jAutochecklist();
    var list = $('#ex18').jAutochecklist();
    list.jAutochecklist('buildFromJSON', [
    {
        html: 'Item 1',
        val: 1,
        selected:true
    },
    {
        html: 'Item 2',
        val: 2
    }
    ]);

    $('#ex19').jAutochecklist({
        showValue: true
    });

    $('#ex20').jAutochecklist({
        remote: {
            source: 'data.json',
            loadMoreOnScroll: true,
            fnQuery: function(obj, text, offset){
                $.getJSON('data.json', {
                    text: text,
                    offset: offset
                }, function(json){
                    //build the list from a VALID json
                    obj.jAutochecklist('buildFromJSON', json, true, offset>0);
                });
            }
        }
    });

    $('#ex21').jAutochecklist({
        popup: false,
        width: 500,
        remote: {
            minLength: 3,
            loadMoreOnScroll: true,
            fnQuery: function(obj, text, offset){
                //API deprecated, for more parameter detail, see https://developers.google.com/web-search/docs/#fonje
                $.getJSON('http://ajax.googleapis.com/ajax/services/search/web?v=1.0&rsz=8&start='+offset+'&q='+text+'&callback=?', function(data){
                    var results = data.responseData.results;
                    var json = [];
                    for (var i in results){
                        var d = results[i];
                        json.push({
                            html: '<h4><a href="' + d.url + '" target="_blank">' + d.title + '</a></h4>' + d.content
                        });
                    }

                    obj.jAutochecklist('buildFromJSON', json, true, offset>0);
                });
            },
            fnPredict: function(val, input){    //custom function for suggestion
                /* google suggest do not return JSONP data, we must use a proxy
                In this case, we'll use a php script for example

                    echo file_get_contents($_GET['url']);
                */

                $.getJSON('proxy.php', {
                    url: 'http://google.com/complete/search?output=firefox&q=' + escape(val)
                }, function(json) {
                    var result;
                    var suggest = json[1];
                    suggest.sort();

                    for (var i in suggest){
                        var text = suggest[i].toLowerCase();
                        var index = text.indexOf(val);
                        index += val.length;
                        //find the index of the following space character
                        var sp_index = text.indexOf(' ', index);
                        //if reaching the end without space, get all text from starting index
                        result = val + (sp_index===-1 ? text.substr(index) : text.substring(index, sp_index));
                        if (result !== val){
                            input.val(result);
                            return;
                        }
                    }
                });
            }
        }
    });

    $('#destroy').click(function(){
        $('#test1').jAutochecklist('destroy');
    });
    $('#rebuild').click(function(){
        $('#test1').jAutochecklist();
    });
    $('#selectall').click(function(){
        $('#test1').jAutochecklist('selectAll');
    });
    $('#deselectall').click(function(){
        $('#test1').jAutochecklist('deselectAll');
    });
    $('#open').click(function(){
        $('#test1').jAutochecklist('open');
        setTimeout(function(){
            $('#test1').jAutochecklist('close');
        }, 2000);
    });
    $('#check').click(function(){
        $('#jAutochecklist_wrapper_test1').find('.jAutochecklist_input1').prop('checked', true);
    });
    $('#update').click(function(){
        $('#test1').jAutochecklist('update');
    });
    $('#count').click(function(){
        var count = $('#test1').jAutochecklist('count');
        alert(count + ' items are selected');
    });
    $('#get').click(function(){
        var val = $('#test1').jAutochecklist('get');
        alert('Selected: ' + val);
    });
    $('#getall').click(function(){
        var val = $('#test1').jAutochecklist('getAll');
        alert('All values are: ' + val);
    });
    $('#setadd').click(function(){
        $('#test1').jAutochecklist('set', [3,4]);
    });
    $('#setrem').click(function(){
        $('#test1').jAutochecklist('set', [4,5,6], true);
    });
    $('#unset').click(function(){
        $('#test1').jAutochecklist('unset', [5]);
    });
    $('#fromjson').click(function(){
        $('#test1').jAutochecklist('buildFromJSON', [
        {
            html: 'Item 1',
            val: 1,
            selected:true
        },
        {
            html: 'Item 2',
            val: 2
        }
        ]);
    });
    $('#disable').click(function(){
        $('#test1').jAutochecklist('disable');
    });
    $('#enable').click(function(){
        $('#test1').jAutochecklist('enable');
    });
});
// Autocomplete
 $("#EquipName").autocomplete({
     source: function(request, response) {
         $.ajax({
             url: "http://localhost:3609/Equip/Equipment/GetEquip", //ajax取值 
             type: "get",
             data: {
                 "SearchName": request.term
             },
             success: function(result) {
                 response($.map(result, function(item) {
                     return {
                         code: item.EquipNum1,
                         name: item.EquipName,
                         label: "(" + item.EquipNum1 + ")" + " " + item.EquipName
                     };
                 }));
             }
         });
     },
     // elect代表选中后执行的函数，将设备名称和设备代码分别赋值给两个输入框
     select: function(event, ui) {
         $("#EquipName").val(ui.item.name);
         $("#EquipNum").val(ui.item.code);
         return false;
     },
     autoFocus: true
 });
//http://www.w3cschool.cc/jqueryui/jqueryui-widget-factory-how.html 自定义插件演示
 $.widget( "custom.progressbar", {
    options: {
        value: 0
    },
    _create: function() {
        this.options.value = this._constrain(this.options.value);
        this.element.addClass( "progressbar" );
        this.refresh();
    },
    _setOption: function( key, value ) {
        if ( key === "value" ) {
            value = this._constrain( value );
        }
        this._super( key, value );
    },
    _setOptions: function( options ) {
        this._super( options );
        this.refresh();
    },
    refresh: function() {
        var progress = this.options.value + "%";
        this.element.text( progress );
        if ( this.options.value == 100 ) {
            this._trigger( "complete", null, { value: 100 } );
        }
    },
    _constrain: function( value ) {
        if ( value > 100 ) {
            value = 100;
        }
        if ( value < 0 ) {
            value = 0;
        }
        return value;
    },
    _destroy: function() {
        this.element
            .removeClass( "progressbar" )
            .text( "" );
    }
});
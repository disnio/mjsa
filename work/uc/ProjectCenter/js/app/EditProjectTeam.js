/* 
 * @Author: Allen
 * @Date:   2016-02-03 09:37:24
 * @Last Modified by:   Allen
 * @Last Modified time: 2016-08-03 14:20:04
 */
'use strict';
require(['ut','ui','purl','bdeditor', 'validate', 'jquery.fileupload', 'bdlang'],
    function(UT, UI, purl, UE, validate) {

        $(function() {            
            $('textarea').each(function (i, v) { 
                var id = $(this).attr('id');                
                UE.getEditor(id); 
            
            });          

        });
    }
);

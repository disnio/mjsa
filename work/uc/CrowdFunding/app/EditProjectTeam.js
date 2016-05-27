/* 
 * @Author: Allen
 * @Date:   2016-02-03 09:37:24
 * @Last Modified by:   Allen
 * @Last Modified time: 2016-04-14 16:49:04
 */
'use strict';
require(['jquery', '_', './js/uc.ut', './js/uc.ui', 'purl','bdeditor', 'validate', 'jquery.fileupload', 'bdlang'],
    function($, _, UT, UI, purl, UE, validate) {

        $(function() {            
            $('textarea').each(function (i, v) { 
                var id = $(this).attr('id');                
                UE.getEditor(id); 
            
            });          

        });
    }
);

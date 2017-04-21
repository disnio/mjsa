/* 
 * @Author: Allen
 * @Date:   2016-01-13 09:37:24
 * @Last Modified by:   Allen
 * @Last Modified time: 2016-09-10 14:44:43
 */
'use strict';
require(['ut', 'ui', 'purl', 'bdeditor', 'validate', 'jquery.fileupload', 'bdlang', 'maxlength'],
    function(UT, UI, purl, UE, validate) {

        $(function() {
            var te;
            $('textarea').each(function(i, v) {
                var id = $(this).attr('id');
                te = UE.getEditor(id);
            });

            // 项目简介字数限制
            $('.edui-body-container').maxlength({
                maxCharacters: 10,
                statusText: " 个剩余字数",
                ue:{
                    isuse: true,
                    id:"Introduction",
                    UE:UE
                }
            }); 

        });
    }
);

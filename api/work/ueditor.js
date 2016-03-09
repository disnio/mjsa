ueditor-1.2.2 修改文件上传：
image.js 
callback: editor.options.imagePath 去
// if ($(".edui-image-upload2", $w).length < 1) 
$(".edui-image-content", $w).append($item);

Upload：
uploadTpl 改为 name="files[]"
uploadComplete json = r;
submit:
$('.edui-image-file').fileupload();
always:
var r = result.files.files[0]; 
r.state = "SUCCESS";
me.uploadComplete(r);
$(this).unbind('load');
$(this).remove();
// $(me.dialog).delegate


{"originalName":"777.jpg","name":"14561061395943.jpg","url":"upload\/20160222\/14561061395943.jpg","size"
:9548,"type":".jpg","state":"SUCCESS"}

{"files":[{"name":"444.jpg","originalName":"444.jpg","size":7767,"type":"image/jpeg","deleteType":"DELETE"
,"url":"http://allen.ucdl.cn:3000/uploads/20160222-0956/444.jpg","deleteUrl":"http://allen.ucdl.cn:3000
/upload?editorid=myEditor/444.jpg"}]}
---------------------------------------------
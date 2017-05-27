$(function() {
	
	$("#avatarUpload").uploadify({
		'auto'				: true,
		'multi'				: false,
		'uploadLimit'		: 1,
		'formData'			: {'uid':'18'},
		'buttonText'		: 'Upload',
		'height'			: 30,
		'width'				: 80,
		'removeCompleted'	: true,
		'swf'				: 'uploadify/uploadify.swf',
		'uploader'			: 'upload.php',
		'fileTypeExts'		: '*.gif; *.jpg; *.jpeg; *.png;',
		'fileSizeLimit'		: '1024KB',
		'onUploadSuccess' : function(file, data, response) {


			var append = '?' + new Date().getTime();
			
			var msg = $.parseJSON(data);

			$("#control").show();
			$(".jcrop-holder img").attr("src",msg.result_des+append);

			if( msg.result_code == 1 ){
				$("#img").val(msg.result_des);
				$("#target").attr("src",msg.result_des+append);
				$(".preview").attr("src",msg.result_des+append);
				$('#target').Jcrop({
					minSize: [50,50],
					setSelect: [0,0,200,200],
					onChange: updatePreview,
					onSelect: updatePreview,
					onSelect: updateCoords,
					aspectRatio: 1
				},
				function(){
					// Use the API to get the real image size
					var bounds = this.getBounds();
					boundx = bounds[0];
					boundy = bounds[1];
					// Store the API in the jcrop_api variable
					jcrop_api = this;
				});
			} else {
				alert('Failure');
			}
		}
    });
    

	var jcrop_api, boundx, boundy;
	
	function updateCoords(c)
	{
		$('#x').val(c.x);
		$('#y').val(c.y);
		$('#w').val(c.w);
		$('#h').val(c.h);
	};
	function checkCoords()
	{
		if (parseInt($('#w').val())) return true;
		alert('请上传图片');
		return false;
	};
	function updatePreview(c){
		if (parseInt(c.w) > 0){
			var rx = 90 / c.w;
			var ry = 90 / c.h;
			$('#preview').css({
				width: Math.round(rx * boundx) + 'px',
            	height: Math.round(ry * boundy) + 'px',
            	marginLeft: '-' + Math.round(rx * c.x) + 'px',
            	marginTop: '-' + Math.round(ry * c.y) + 'px'
			});
		}
	};
	
	$("#avatar_submit").click(function(){
		var img = $("#img").val();
		var x = $("#x").val();
		var y = $("#y").val();
		var w = $("#w").val();
		var h = $("#h").val();
		if( checkCoords() ){
			$.ajax({
				type: "POST",
				url: "resize.php",
				data: {"img":img,"x":x,"y":y,"w":w,"h":h},
				dataType: "json",
				success: function(msg){
					if( msg.result_code == 1 ){
							$('#avatar').attr('src',msg.result_des.small);
					} else {
						alert("Failure");
					}
				}
			});
		}
		$()
		$('#avatarUpload').uploadify('cancel', '*');
		$("#control").hide();

	});
});
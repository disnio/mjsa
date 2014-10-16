// 代码整理：懒人之家 www.lanrenzhijia.com
		function showPreview(event) {
			$("#featured-preview").show();
		};

		function hidePreview(event) {
			$("#featured-preview").hide();
		};

		function updatePreview(index) {
			$("#featured-preview img").hide().eq( index ).show();
		};

		function movePreview(event) {
			var content_position = $("#featured-content").offset();

			$("#featured-preview").css("left", event.pageX - content_position.left - 160);
		};

		$(document).ready(function() {
			var content_els		= $("#featured-content a");
			var overlay_wrap	= $("#featured-overlay");
			var overlay_els		= $("div", overlay_wrap)

			overlay_els
				.css('opacity', 0)
				.mousemove( movePreview )
				.mouseenter(function() {
					updatePreview( overlay_els.index( this ) );
				})
				.click(function() {
					window.location.href = content_els.eq( overlay_els.index( this ) ).attr("href");
				})
				.show();

			overlay_wrap
				.mouseenter( showPreview )
				.mouseleave( hidePreview );

		});
	var curid = 0;
		var n = $(".chanegecolor").attr("name");
		$(".chanegecolor img").click(function(){
		 var number = $(this).attr('name');
		 var cH = $(".chanegecolor img").length;
		for(var i=0;i<=cH;i++){
		$(".sPic .info tr").eq(i).hide();
		$(".bigPic .info tr").eq(i).hide();
		$(".chanegecolor span").eq(i).removeClass("b00eaff");
		}
		$(".sPic .info tr").eq(number).show();
		$(".bigPic .info tr").eq(number).show();
		$(".chanegecolor span").eq(number).addClass("b00eaff");
		var s = $(".chanegecolor").attr('name',number);
		$(".sPic .info tr").eq(number).find("td").removeClass("current");
		$(".sPic .info tr").eq(number).find("td").eq(0).addClass("current");
		$(".bigPic .info").scrollLeft(0)
		return curid = 0;
		  })
		$(".sPic .info td").click(function(){
		  var n = $(".chanegecolor").attr('name');
			$(".sPic .info tr").eq(n).find("td").removeClass("current");
			$(this).addClass("current");
			curid = $(this).index();
			$(".bigPic .info").animate({"scrollLeft":curid*818})
		})
		$(".bigPic a.btnleft").click(function(){
		 var n = $(".chanegecolor").attr('name');
			curid--;
			if(curid<0){
				alert("已经是第一张了！");
				curid=0;
			}else{
				$(".bigPic .info").animate({"scrollLeft":curid*818})
			}
			$(".sPic .info tr").eq(n).find("td").removeClass("current");
			$(".sPic .info tr").eq(n).find("td").eq(curid).addClass("current");
		})
		$(".bigPic a.btnright").click(function(){
		 var n = $(".chanegecolor").attr('name');
			curid++;
			if(curid>$(".sPic .info tr").eq(n).find("td").size()-1){
				alert("已经是最后一张了！");
				curid=$(".sPic .info tr").eq(n).find("td").size()-1;
			}else{
				$(".bigPic .info").animate({"scrollLeft":curid*818})
			}
			$(".sPic .info tr").eq(n).find("td").removeClass("current");
			$(".sPic .info tr").eq(n).find("td").eq(curid).addClass("current");
		})
		$(".sPic a.btnleft").click(function(){
			$(".sPic .info").animate({"scrollLeft":"-=113"})
		})
		$(".sPic a.btnright").click(function(){
			$(".sPic .info").animate({"scrollLeft":"+=113"})
		})
		
		/* 代码整理：97站长网 - www.97zzw.com */
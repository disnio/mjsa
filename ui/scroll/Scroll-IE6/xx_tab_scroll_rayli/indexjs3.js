// JavaScript Document
//头部横向滚动
$(function(){
    $(".slide dl:gt(1)").css("left","960px") 
    $(".slide dl:eq(0)").css("left","-960px") 
    var i=1;
    var play=function(){
        if(i<2){ i++; }else{ i=0; }
        $(".slide dl").eq(i-1).animate({left:"-960px"}, 500);
        $(".slide dl").eq(i).animate({left:"0"}, 500);
        $(".slide dl").not(i).css("left","960px") ;
        $(".slide dl").not(i-1).css("left","960px") ;
    }
    $(".prev").click(function(){
        $(".slide dl").eq(i-1).animate({left:"0"}, 500);
        $(".slide dl").eq(i).animate({left:"960px"}, 500);
        $(".slide dl").not(i).css("left","-960px") ;
        $(".slide dl").not(i-1).css("left","-960px") ;
        if(i>0){
          i--;
        }else{
          i=2;
        }
    });
    $(".next").click(play);
    var setinterval;
    var stop = function(){window.clearInterval(setinterval);};
    var go = function(){
      setinterval = window.setInterval(function(){play();},8000);
    }; //endof go
    $(".slide").mouseover(function(){stop()})
    $(".slide").mouseout(function(){go()})
    go();
})
//头部横向滚动 ad
$(function(){
		  $(".slide_ad dl:gt(1)").css("left","680px") 
		  $(".slide_ad dl:eq(0)").css("left","-680px") 
		  var i=1;
		  var play=function(){
			  if(i<2){
				  i++;
			  }else{
				  i=0;
			  }
			  $(".slide_ad dl").eq(i-1).animate({left:"-680px"}, 500);
			  $(".slide_ad dl").eq(i).animate({left:"0"}, 500);
			  $(".slide_ad dl").not(i).css("left","680px") ;
			  $(".slide_ad dl").not(i-1).css("left","680px") ;
		  }
		  $(".prev_ad").click(function(){
									  $(".slide_ad dl").eq(i-1).animate({left:"0"}, 500);
									  $(".slide_ad dl").eq(i).animate({left:"680px"}, 500);
									  $(".slide_ad dl").not(i).css("left","-680px") ;
									  $(".slide_ad dl").not(i-1).css("left","-680px") ;
									  if(i>0){
										  i--;
									  }else{
										  i=2;
									  }
									  });
		  $(".next_ad").click(play);
		  var setinterval;
		  var stop = function(){window.clearInterval(setinterval);};
		  var go = function(){
			  setinterval = window.setInterval(function(){play();},8000);
		  }; //endof go
		  $(".slide_ad").mouseover(function(){stop()})
		  $(".slide_ad").mouseout(function(){go()})
		  go();
		  })
//热点文字滚动
function AutoScroll(obj){   
        $(obj).find("ul:first").animate({   
                marginTop:"-27px"  
        },500,function(){   
                $(this).css({marginTop:"0px"}).find("li:first").appendTo(this);   
        });   
}   
$(document).ready(function(){
						   setInterval('AutoScroll("#scrollDiv")',5000) 
}); 
//焦点图和tab
function cur(ele,currentClass,tag){
    ele= $(ele)? $(ele):ele;
    if(!tag){
        ele.addClass(currentClass).siblings().removeClass(currentClass);
    }else{
            ele.addClass(currentClass).siblings(tag).removeClass(currentClass);
    }
}
$.fn.tab=function(options){
    var org={
        tabId:    "",
    	tabTag:   "li",
        conId:    "",
    	conTag:   "dl",
        curClass: "cur",
        act:      "click",
        dft:      0,
        effact:   "fade",
        auto:     false,
        autotime: 5000,
        aniSpeed: 500
    }    
    
    $.extend(org,options);
    
    var t=false;
    var k=0;
    var _this=$(this);
    var tagwrp=$(org.tabId);
    var conwrp=$(org.conId);
    var tag=tagwrp.find(org.tabTag);
    var con=conwrp.find(org.conTag);
    var len=tag.length;
    var curtag=tag.eq(org.dft);
    cur(curtag,org.curClass);
    con.eq(org.dft).show().siblings(org.conTag).hide();

    tag.each(function(i){
        tag.eq(i).bind(org.act,function(){
            cur(this,org.curClass);
            k=i;
			//广告
			var sdli=$("#rlsdtag li");
			var j=0;
			sdli.click(function(){
				j=$(this).index();
				if(j==1){$("#tac").show();}
				if(j!=1){$("#tac").hide()}
			})
			//广告
            switch(org.effact){              
                case "fade"    : con.eq(i).fadeIn("fast").siblings(org.conTag).fadeOut("fast");
                break;
                case "fades"   : con.eq(i).fadeIn(500).siblings(org.conTag).fadeOut(500);
                break;
                default        : con.eq(i).show().siblings(org.conTag).hide();
                break;
            }            
        })                                      
    })    

    if(org.auto){
        var drive=function(){
            if(org.act=="mouseover"){
                tag.eq(k).mouseover();
                }else if(org.act=="click"){
                tag.eq(k).click();
                }            
            k++;            
            if(k==len) k=0;            
            }
        t=setInterval(drive,org.autotime);    
    }        
}	

$(function(){
    $("#rlsdfoc").tab({
        tabId:"#rlsdtag",
        conId:"#rlsdcon",
        auto:true,
        effact: "fades"
    })
    $("#trytab").tab({
        act:"mouseover",
        tabId:"#trytag",
        conId:"#trycon"
    }) 
})	

function select_layer(obj){
	    $("#"+obj+"_cont").hide();
		$("#"+obj).click(function(){
			if($("#"+obj+"_cont").is(":hidden")){
				$("#"+obj).addClass("zbk_f2").removeClass("zbk_f1");
				$("#"+obj+"_cont").show().addClass("border1");
				$(this).blur();
				$("#"+obj+"_cont").children("ul").children("li").children("div").children("p").click(function(){
					var txt=$(this).text();
					$("#"+obj+"_name").text(txt);
					$("#"+obj+"_cont").hide();
					$("#"+obj).addClass("zbk_f1").removeClass("zbk_f2");
			  });
			}
			else{
				$("#"+obj+"_cont").hide();
				$("#"+obj).addClass("zbk_f1").removeClass("zbk_f2");
				};
		});
		
		$(document).click(function(event){  
          if( $(event.target).attr("id") != obj ){  
             $("#"+obj+"_cont").hide();
			 $("#"+obj).addClass("zbk_f1").removeClass("zbk_f2");
          } 
       });
		$("#"+obj).children($("#"+obj+"_name")).click(function(){
			if($("#"+obj+"_cont").is(":hidden")){
				$("#"+obj).addClass("zbk_f2").removeClass("zbk_f1");
				$("#"+obj+"_cont").show().addClass("border1");
				$("#"+obj+"_cont").children("ul").children("li").children("div").children("p").click(function(){
					var txt=$(this).text();
					$("#"+obj+"_name").text(txt);
					$("#"+obj+"_cont").hide();
					$("#"+obj).addClass("zbk_f1").removeClass("zbk_f2");
					
				});
				return false;
			}
			else{
				$("#"+obj+"_cont").hide();
				$("#"+obj).addClass("zbk_f1").removeClass("zbk_f2");
				return false;
			   }								   
		});
	   
 };
$(function(){
      select_layer("select_1");
	  select_layer("select_2");
	  select_layer("select_3");
});


function select_layer1(obj){
	    $("#"+obj+"_cont").hide();
		//alert("a")
		$("#"+obj).click(function(){
			if($("#"+obj+"_cont").is(":hidden")){
				$("#"+obj).addClass("wbk_f2").removeClass("wbk_f1");
				$("#"+obj+"_cont").show().addClass("border1");
				$("#"+obj+"_cont").children("ul").children("li").children("div").children("p").click(function(){
			    var txt=$(this).text();
				$("#"+obj+"_name").text(txt);
				$("#"+obj+"_cont").hide();
				$("#"+obj).addClass("wbk_f1").removeClass("wbk_f2");
				//$("#"+obj).addClass("wbk_f1").removeClass("wbk_f2");
			  });
			}
			else{
				$("#"+obj+"_cont").hide();
				$("#"+obj).addClass("wbk_f1").removeClass("wbk_f2");
				}
		});
		$(document).click(function(event){  
          if( $(event.target).attr("id") != obj ){  
             $("#"+obj+"_cont").hide();
			 $("#"+obj).addClass("wbk_f1").removeClass("wbk_f2");
          }  
      });  
	  $("#"+obj).children($("#"+obj+"_name")).click(function(){
			if($("#"+obj+"_cont").is(":hidden")){
				$("#"+obj).addClass("wbk_f2").removeClass("wbk_f1");
				$("#"+obj+"_cont").show().addClass("border1");
				$("#"+obj+"_cont").children("ul").children("li").children("div").children("p").click(function(){
					var txt=$(this).text();
					$("#"+obj+"_name").text(txt);
					$("#"+obj+"_cont").hide();
					$("#"+obj).addClass("wbk_f1").removeClass("zbk_f2");
					
				});
				return false;
			}
			else{
				$("#"+obj+"_cont").hide();
				$("#"+obj).addClass("wbk_f1").removeClass("wbk_f2");
				return false;
			   }								   
		});
    	
};

$(function(){
	  select_layer1("select_4");
	  select_layer1("select_5");
	  select_layer1("select_6");
});

	

//照片墙
	var imgwidth=81;
	var painum=3;//一行放几列
	var hangshu;//行数
	var lieshu;//第几列。
	function pblimgover(n){
		
		$(".zpqimglh img").eq(n).css("opacity",1);		
		$("#zqpaid").attr("href",zpqurl[n+1]);
		$("#zpqwz").html(zpqwenzi[n+1]);
		
		$(".zpqhong").css("display","block");
		$(".zpqhtit").css("display","block");
		hangshu=Math.floor(n/painum);
		lieshu=(n%painum);
		$(".zpqhong").css("top",imgwidth*hangshu);
		$(".zpqhong").css("left",imgwidth*lieshu);
		
		$(".zpqhtit").css("top",imgwidth*hangshu);
		var lastlie=(n+1)%painum;
		if(lastlie!=0){
			$(".zpqhtit").css("left",imgwidth*(lieshu+1));
		}else{
			$(".zpqhtit").css("left",imgwidth*(painum-2));
		}
	}
	function closezpq(){
			$(".zpqimglh img").css("opacity",0.7);
			$(".zpqhong").css("display","none");
			$(".zpqhtit").css("display","none");
		}
	$(document).ready(function(e) {
        $(".zpqimglh").mouseover(function(){
			var nowimg=$(".zpqimglh").index(this); 
			pblimgover(nowimg);
		})
		$(".zpqhong").mouseout(function(){
			closezpq();
		});
		$(".zqpacss").mouseout(function(){closezpq()});
    });

//社区下照片墙
$(function(){
		   $(".photo_sq").mouseover(function(){
											 $(this).addClass("photo_sq_on");
											 })
		   $(".photo_sq").mouseout(function(){
											 $(this).removeClass("photo_sq_on");
											 })
		   $(".photo_sq_right").mouseover(function(){
											 $(".photo_sq_right").addClass("photo_sq_on");
											 $("#right_sqphoto").addClass("borderlee").removeClass("borderldd")
											 })
		   $(".photo_sq_right").mouseout(function(){
											 $(".photo_sq_right").removeClass("photo_sq_on");
											 $("#right_sqphoto").addClass("borderldd").removeClass("borderlee")
											 })
		   })
/*滚动*/
var speed=30;
var Direction = 0;
document.getElementById("demo2").innerHTML = document.getElementById("demo1").innerHTML;
document.getElementById("demo").scrollLeft = 0;
function Marquee(){
  if(Direction==0){
	  if(document.getElementById("demo2").offsetWidth - document.getElementById("demo").scrollLeft <= 0){
		  document.getElementById("demo").scrollLeft -= document.getElementById("demo2").offsetWidth;
	  }else{
		  document.getElementById("demo").scrollLeft++;
	  }
  }else{
	  if(document.getElementById("demo").scrollLeft == 0){
		  document.getElementById("demo").scrollLeft = document.getElementById("demo2").offsetWidth;
	  }else{
		  document.getElementById("demo").scrollLeft--;
	  }
  }
} 
function setDirection(val)
{
	Direction = val;
}

var MyMar = setInterval("Marquee()",speed);

document.getElementById("demo").onmouseover=function(){
  clearInterval(MyMar);
}

document.getElementById("demo").onmouseout=function(){
  MyMar = setInterval("Marquee()", speed);
} 



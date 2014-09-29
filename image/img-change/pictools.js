function SetImgAutoSize(o,w,h,t,f)
{
//o对象 w宽度 h高度 t缩放标准（宽或高） f是否允许拉伸
var img=new Image();
img.src=o.src
var stat=false;
var MaxWidth=w;
var MaxHeight=h;
var HeightWidth=img.height/img.width;
var WidthHeight=img.width/img.height;
//if(img.readyState!="complete")return false;//火狐不兼容 取消判断
if(f==0){
	if(t==0){
	  if(img.width>MaxWidth){
	  img.width=MaxWidth;
	  img.height=MaxWidth*HeightWidth;
	  }
	}
	else if(t==1){
	  if(img.height>MaxHeight){
	  img.height=MaxHeight;
	  img.width=MaxHeight*WidthHeight;
	  }
	}
	else{
	  if(img.width>MaxWidth){
	  img.width=MaxWidth;
	  img.height=MaxWidth*HeightWidth;
	  }
	  if(img.height>MaxHeight){
	  img.height=MaxHeight;
	  img.width=MaxHeight*WidthHeight;
	  }
	}
}
else if(f==1)
{
	if(t==0){
	  img.width=MaxWidth;
	  img.height=MaxWidth*HeightWidth;
	}
	else if(t==1){
	  img.height=MaxHeight;
	  img.width=MaxHeight*WidthHeight;
	}
	else{
	  img.width=MaxWidth;
	  img.height=MaxHeight;
	}
}
else
{
	stat=true;
}
o.width=img.width;
o.height=img.height;
}
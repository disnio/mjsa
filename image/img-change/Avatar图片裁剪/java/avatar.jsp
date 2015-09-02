<%@ page language="java" import="java.util.*" pageEncoding="gbk"%>
<%@page import="java.net.URLEncoder"%>
<%@page import="cn.cbsw.file.utils.FileUpload"%>
<%@page import="java.io.FileOutputStream"%>
<%!
//编辑页面中包含 camera.swf 的 HTML 代码
public String renderHtml(String id,String basePath)
{
	// 把需要回传的自定义参数都组装在 input 里
	//$input = urlencode( "uid={$uid}" );

	String uc_api =URLEncoder.encode(basePath+"/ImgCropper/avatar.jsp");
	String urlCameraFlash = "camera.swf?nt=1&inajax=1&appid=1&input=1&uploadSize=200&ucapi="+uc_api;
	urlCameraFlash = "<script src=\"common.js?B6k\" type=\"text/javascript\"></script><script type=\"text/javascript\">document.write(AC_FL_RunContent(\"width\",\"450\",\"height\",\"253\",\"scale\",\"exactfit\",\"src\",\""+urlCameraFlash+"\",\"id\",\"mycamera\",\"name\",\"mycamera\",\"quality\",\"high\",\"bgcolor\",\"#ffffff\",\"wmode\",\"transparent\",\"menu\",\"false\",\"swLiveConnect\",\"true\",\"allowScriptAccess\",\"always\"));</script>";

	return urlCameraFlash;
}
public String getFileExt(String fileName) {
    // 下面取到的扩展名错误，只有三位，而如html的文件则有四位
    // extName = fileName.substring(fileName.length() - 3, fileName.length()); //扩展名
    int dotindex = fileName.lastIndexOf(".");
    String extName = fileName.substring(dotindex, fileName.length());
    extName = extName.toLowerCase(); //置为小写
    return extName;
}
private byte[] getFlashDataDecode(String src)
{
	char []s=src.toCharArray();
	int len=s.length;
    byte[] r = new byte[len / 2];
    for (int i = 0; i < len; i = i + 2)
    {
        int k1 = s[i] - 48;
        k1 -= k1 > 9 ? 7 : 0;
        int k2 = s[i + 1] - 48;
        k2 -= k2 > 9 ? 7 : 0;
        r[i / 2] = (byte)(k1 << 4 | k2);
    }
    return r;
}
public boolean saveFile(String path,byte[]b){
	try{
		FileOutputStream fs = new FileOutputStream(path);
	    fs.write(b, 0, b.length);
	    fs.close();
		return false;
	}catch(Exception e){
	    return true;
	}
}
%>

<%
String action= request.getParameter("a");
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
if(action==null){
	%>
	<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
	<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
	<meta http-equiv="Content-Type" content="text/html; charset=GBK" />
	</head>
	<body>
	<%
	out.print(renderHtml("5",basePath));
	%>
	</body></html>
	<%
}else if("uploadavatar".equals(action)){//上传图片,可以自己实现
		FileUpload fu = null;
		fu = new FileUpload();
		fu.doUpload(session.getServletContext(), request);// 上传文件
		String res = fu.getErrMessage();
		if (!res.equals("Success.")) {
			out.print("error");
		}else{
			Iterator ir = fu.tmpFiles.iterator();
			while (ir.hasNext()) {// 将文件写入正式目录或数据库
				String fpath = (String) ir.next();
				fpath=fpath.substring(fpath.lastIndexOf("/"));
				out.clear();
				out.print(basePath+"/FileUploadTmp"+fpath);
			}
		}
		
}else if("rectavatar".equals(action)){//缩略图
	String avatar1 = request.getParameter("avatar1");//大
	String avatar2 = request.getParameter("avatar2");//中
	String avatar3 = request.getParameter("avatar3");//小
	out.clear();
	if(saveFile(session.getServletContext().getRealPath("/FileUploadTmp/1big.jpg"),getFlashDataDecode(avatar1))){
		out.print("<?xml version=\"1.0\" ?><root><face success=\"0\"/></root>");
	}else{
		out.print("<?xml version=\"1.0\" ?><root><face success=\"1\"/></root>");
	}
	
}
%>

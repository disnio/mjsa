using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.IO;

namespace flash实现头像上传的两种方式.swfupload实现上传
{
    /// <summary>
    /// UploadImg1 的摘要说明
    /// </summary>
    public class UploadImg1 : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            HttpPostedFile file = context.Request.Files["Filedata"];//接受文件
            string fileName = Path.GetFileName(file.FileName);//获取文件名
            string fileExt = Path.GetExtension(fileName);//获取文件类型
            if (fileExt.Equals(".jpg", StringComparison.InvariantCultureIgnoreCase))
            {
                //构建一个路径，网站根目录/UploadImg/年份/月/
                string dircStr = "/UploadImg/" + DateTime.Now.Year + "/" + DateTime.Now.Month + "/";
                //在服务器的物理路径创建一个文件夹，不能写Path.GetDirectoryName（dircStr），这样获取到的是虚拟路径
                Directory.CreateDirectory(Path.GetDirectoryName(context.Server.MapPath(dircStr)));
                //为避免图片重名，使用guid重命名图片
                string fileLoadName = dircStr + Guid.NewGuid().ToString() + fileExt;
                //保存图片到服务器的物理路径
                file.SaveAs(context.Server.MapPath(fileLoadName));
                //响应报文返回路径名，已便于前台显示
                context.Response.Write(fileLoadName);
                
            }
            
        }

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
}
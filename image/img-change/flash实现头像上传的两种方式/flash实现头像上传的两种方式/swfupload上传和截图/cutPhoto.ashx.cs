using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.IO;
using System.Drawing;

namespace flash实现头像上传的两种方式.swfupload上传和截图
{
    /// <summary>
    /// cutPhoto 的摘要说明
    /// </summary>
    public class cutPhoto : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            string action = context.Request["action"];
            if (action == "up")//表示上传
            {
                HttpPostedFile file = context.Request.Files["Filedata"];//接收文件.
                string fileName = Path.GetFileName(file.FileName);//获取文件名。
                string fileExt = Path.GetExtension(fileName);//获取文件类型.
                if (fileExt.Equals(".jpg",StringComparison.InvariantCultureIgnoreCase))
                {
                    using (Image img = Image.FromStream(file.InputStream))//根据上传的文件创建一个Image.
                    {
                        file.SaveAs(context.Server.MapPath("/UploadImg/" + fileName));
                        context.Response.Write("ok:/UploadImg/" + fileName + ":" + img.Width + ":" + img.Height);
                    }
                }
            }
            else if (action == "cut")//头像截取
            {
                int x = Convert.ToInt32(context.Request.Form["x"]);
                int y = Convert.ToInt32(context.Request.Form["y"]);
                int width = Convert.ToInt32(context.Request.Form["width"]);
                int height = Convert.ToInt32(context.Request.Form["height"]);
                string imgSrc = context.Request.Form["imgSrc"];//获取上传成功的图片路径
                //根据传递过来的范围，将该范围的图片画到画布上，将画布保存。
                using (Bitmap map = new Bitmap(width, height))
                {
                    using (Graphics g = Graphics.FromImage(map))//为画布创建画笔.
                    {
                        using (Image img = Image.FromFile(context.Server.MapPath(imgSrc)))//创建img
                        {
                            //将图片画到画布上
                            //第一：对哪张图片进行操作
                            //二：画多么大
                            //三：画哪部分
                            g.DrawImage(img, new Rectangle(0, 0, width, height), new Rectangle(x, y, width, height), GraphicsUnit.Pixel);
                            string newfile = Guid.NewGuid().ToString();
                            map.Save(context.Server.MapPath("/UploadImg/" + newfile + ".jpg"));//将画布上的图片按照GUID命名保存
                            context.Response.Write("/UploadImg/" + newfile + ".jpg");

                        }
                    }
                }

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
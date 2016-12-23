<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2016/11/7
 * Time: 16:29
 */
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
//use GuzzleHttp\Psr7\Response;
use Intervention\Image\Facades\Image;

class ImageController extends Controller
{
    protected $upload_files = [];
//    use DispatchesJobs;
    public function __construct()
    {
//        $this->middleware('auth');
    }

    public function index()
    {
        // 通过指定 driver 来创建一个 image manager 实例
        $origin_path = 'image/Jellyfish.jpg';
        $origin_resize_path = 'image/Jellyfish_resize.jpg';
//        $watermark = 'image/mark.png';
//        $img = Image::canvas(500, 300, '#f80')->insert($watermark)->resize(300, 150);

//        $img = Image::make($origin_path)->resize(200, 200);

//        保存图片，返回到视图
//        $img->save($origin_resize_path);
//        return view('welcome', compact('origin_path', 'origin_resize_path'));

//        return $img->response('png');
        return view('welcome');

    }

    public function fileUpload(Request $request)
    {
        if ($request->hasFile('files')) {

            $file = $request->file('files');

            $file_name = $file->getClientOriginalName();
            $file_size = round($file->getSize() / 1024);
            $file_ex = $file->getClientOriginalExtension();
            $file_mime = $file->getMimeType();
            $destinationPath = base_path() . '/public/file/' . date('Y-m-d');
            $returnPath = '/file/' . date('Y-m-d');
            $date = Date('c');
            $date_time = new \DateTime($date);
            $new_name = $date_time->format('YmdHis') . '.' . $file_ex;
            $file->move($destinationPath, $new_name);
//            array_push($upload_files)
            return response()->json([
                "name" => $new_name,
                "size" => $file_size,
                "path" => $returnPath . '/' . $new_name,
                "url" => url($returnPath) . '/' . $new_name
            ]);
        }
        return response()->json(["msg" => "no file upload"]);
    }
}
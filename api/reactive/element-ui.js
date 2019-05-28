{/* <el-date-picker
    type="datetime"
    placeholder="选择日期时间"
    v-model="ruleForm.endDt"
    style="width: 100%;"
       <!--format="yyyy-MM-dd HH:mm"-->
       <!--value-format="timestamp"-->
    value-format="yyyy-MM-dd HH:mm:ss"
    :picker-options="pickerOptions"
></el-date-picker> */}
// 设置可选日期的范围
created() {
    // disabledDate 为true表示不可选,false表示可选
    this.pickerOptions.disabledDate = function (time) {
        // 设置可选择的日期为今天之后的一个月内
        let curDate = (new Date()).getTime()
        // 这里算出一个月的毫秒数,这里使用30的平均值,实际中应根据具体的每个月有多少天计算
        let day = 30 * 24 * 3600 * 1000
        let dateRegion = curDate + day
        return time.getTime() < Date.now() - 8.64e7 || time.getTime() > dateRegion

        // 设置选择的日期小于当前的日期,小于返回true,日期不可选
        return time.getTime() < Date.now() - 8.64e7
    }
}

let validateTime = (rule, value, callback) => {
    let checkValue = parseInt((new Date(value)).getTime()/(1000*100), 10);
    let nowValue = parseInt(Date.now()/(1000*100), 10);

    // 100 秒内选择当前时间有效
    if(checkValue<nowValue){
        callback(new Error('请重新选择完成时间'));
    }else{
        callback()
    }
};
endDt: [
    {required: true, message: "请选择完成时间", trigger: "blur"},
    {validator: validateTime, trigger:"blur"}
],


<el-upload
    class="upload-excel"
    accept=".xls,.xlsx"
    :before-upload="beforeUpload"
    :http-request="uploadExcel"
    :file-list="fileList">
    <el-button size="small" type="primary">点击上传</el-button>
    <div slot="tip" class="el-upload__tip">只能上传 excel 文件，且不超过200M</div>
</el-upload>

beforeUpload: function (file) {
    return new Promise((resolve, reject) => {
        if (file.size < 1024 * 1024 * 200) {
            resolve()
        }
        reject();
    });
}
uploadExcel: function (param) {
    var that = this;
    let fileObj = param.file;
    let FileController = ApiToUrl(Api.fileUpload);
    let forms = new FormData();

    forms.append("file", fileObj);

    return new Promise(function (resolve, reject) {
        $.ajax({
            url: FileController,
            type: 'POST',
            processData: false,
            dataType: 'json',
            data: forms,
            // contentType: "application/x-www-form-urlencoded",
            contentType: false,
            success: function (response) {
                if (response.code == 200) {
                    that.ruleForm.fileName = response.data;
                    resolve(response.data)
                } else {
                    reject(response.errmsg);
                    layui.layer.msg(response.errmsg);
                }
            }
            , error: function (err) {
                reject(err);
                layui.layer.msg(err);
            },
        })
    });

}


{/* <el-select v-model="writerId" filterable :filter-method="filterWriter" placeholder="请选择写手"
        class="topbaroption fl">
    <el-option
            v-for="(item, k) in writers"
            :key="k"
            :label="item.name"
            :value="item.name">
    </el-option>
</el-select> */}

filterWriter(v) {
    let pt = new RegExp(v, "ig");
    let arr = this.writersCopy;

    if (v) {
        this.writerId = v;
        let rs = _.filter(arr, (writer) => {
            return pt.test(writer.name.toLowerCase()) || pt.test(writer.namePy.toLowerCase())
        });

        this.set_writers(rs);
    } else {
        this.writerId = v;
        this.set_writers(arr);
    }
}

// <el-autocomplete placeholder="请输入内容"
//     v-model="keyWord"
//     :fetch-suggestions="querySearch"
//     :trigger-on-focus="false"
//     @change="searchMissions"
//     @select="handleSelect"
//     class="input-with-select">
//     <el-button slot="append" icon="el-icon-search" @click="searchMissions()"></el-button>
// </el - autocomplete >

querySearch(v, cb) {
    let arr = this.writersCopy;

    let pt = new RegExp(v, "ig");

    if (v) {
        let rs = _.filter(arr, (writer) => {
            return pt.test(writer.name.toLowerCase()) || pt.test(writer.namePy.toLowerCase())
        });
        cb(rs);
    }
},

handleSelect(item) {
    this.keyWord = item.value;
    this.searchMissions();
}
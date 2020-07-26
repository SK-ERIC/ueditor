<template>
  <div class="uploadWrap-contanner">
    <div class="item">
      <div class="wrap">
        <div class="label">是否音视频:</div>
        <el-select
          class="audioSelect"
          v-model="audioSelectInit"
          placeholder="请选择"
          @change="selectAudioType"
        >
          <el-option
            v-for="item in typeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.label"
          ></el-option>
        </el-select>
      </div>
    </div>
    <div class="item">
      <div class="wrap">
        <div class="label">视频类型:</div>
        <el-select v-model="videoTypeVal" placeholder="请选择" @change="selectVideoType">
          <el-option
            v-for="item in videoTypeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
    </div>
    <div class="item">
      <div class="item-l">
        <div class="label">封面:</div>
        <!-- <el-upload
          class="avatar-uploader"
          action="http://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>-->

        <upload-img :pic="form.bgImage" @getUrlFn="getImgUrl" @modalShowFn="getModalStatus"></upload-img>
      </div>
    </div>
    <div class="item">
      <div class="item-l">
        <div class="label">视频:</div>
        <div class="pic_img">
          <div class="pic_img_box">
            <!-- :data="{ FoldPath: '上传目录', SecretKey: '安全验证' }" -->
            <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-progress="uploadVideoProcess"
              :on-success="handleVideoSuccess"
              :before-upload="beforeUploadVideo"
              :show-file-list="false"
            >
              <video
                v-if="videoForm.showVideoPath != '' && !videoFlag"
                :src="videoForm.showVideoPath"
                class="avatar video-avatar"
                controls="controls"
              >您的浏览器不支持视频播放</video>
              <i
                v-else-if="videoForm.showVideoPath == '' && !videoFlag"
                class="el-icon-plus avatar-uploader-icon"
              ></i>
              <el-progress
                v-if="videoFlag == true"
                type="circle"
                :percentage="videoUploadPercent"
                style="margin-top:7px;"
              ></el-progress>
            </el-upload>
          </div>
        </div>
        <!-- <p class="Upload_pictures">
          <span></span>
          <span>最多可以上传1个视频，建议大小50M，推荐格式mp4</span>
        </p>-->
      </div>
    </div>


  <el-dialog 
    custom-class="dialog-saveArticle"
    :visible.sync="isShowCropper"
    :modal="true" >
      <div class="cropperModalBody" style="width:520px;height:350px">
        <img-cropper
          :cropperOption="cropperOption"
          :img="cropperImg"
          :file="cropperFile"
          @cropperFinish="postUploadFile"
          @close="()=>{isShowCropper=false}"
        ></img-cropper>
      </div>
    </el-dialog>
    
  </div>
</template>

<script>
import UploadImg from "@components/UploadImg";
import imgCropper from "@components/imgCropper";

export default {
  name: "UploadWrap",
  components: {
    UploadImg,
    imgCropper,
  },
  data() {
    return {
      imageUrl: "",
      audioSelectInit: "否",
      typeOptions: [
        {
          value: "选项1",
          label: "是",
        },
        {
          value: "选项2",
          label: "否",
        },
      ],
      videoTypeOptions: [
        {
          value: 0,
          label: "未知",
        },
        {
          value: 1,
          label: "腾讯",
        },
        {
          value: 2,
          label: "优酷",
        },
        {
          value: 3,
          label: "电台",
        },
        {
          value: 4,
          label: "视频",
        },
      ],
      videoTypeVal: "",

      videoFlag: false,
      //是否显示进度条
      videoUploadPercent: "",
      //进度条的进度，
      isShowUploadVideo: false,
      //显示上传按钮
      videoForm: {
        showVideoPath: "",
      },


      isShowCropper: false,
      form: {
        bgImage: "",
      },
      cropperImg: "",
      cropperOption: {},
      cropperFile: {}

    };
  },
  computed: {
    userId() {
      return this.$store.state.userId;
    },
  },
  methods: {
    selectAudioType(val) {
      this.$root.eventVue.$emit("audioType", val);
    },
    selectVideoType(val) {
      this.$root.eventVue.$emit("videoType", val);
    },
    handleAvatarSuccess(res, file) {
      this.$emit("showCropper");
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    chooseImg() {
      this.$emit("showCropper");
    },
    beforeAvatarUpload(file) {
      // if (!this.userId) {
      //   this.$util.ToastLogin();
      //   return false;
      // }

      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 5;

      if (!isJPG) {
        this.$message.error("上传图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传图片大小不能超过 5MB!");
      }
      return isJPG && isLt2M;
    },
    //上传前回调
    beforeUploadVideo(file) {
      if (!this.userId) {
        this.$util.ToastLogin();
        return false;
      }

      var fileSize = file.size / 1024 / 1024 < 50;
      if (
        [
          "video/mp4",
          "video/ogg",
          "video/flv",
          "video/avi",
          "video/wmv",
          "video/rmvb",
          "video/mov",
        ].indexOf(file.type) == -1
      ) {
        this.$message.error("请上传正确的视频格式");
        return false;
      }
      if (!fileSize) {
        this.$message.error("视频大小不能超过50MB");
        return false;
      }
      this.isShowUploadVideo = false;
    },
    //进度条
    uploadVideoProcess(event, file, fileList) {
      this.videoFlag = true;
      this.videoUploadPercent = file.percentage.toFixed(0) * 1;
    },
    //上传成功回调
    handleVideoSuccess(res, file) {
      this.isShowUploadVideo = true;
      this.videoFlag = false;
      this.videoUploadPercent = 0;

      //前台上传地址
      if (file.status == "success") {
        this.videoForm.showVideoPath = file.url;
      } else {
        this.$message.error("上传失败，请重新上传");
      }

      //后台上传地址
      // if (res.Code == 0) {
      //   this.videoForm.showVideoPath = res.Data;
      // } else {
      // this.$message.error(res.Message);
      // }
    },



    getImgUrl(url) {
      this.form.bgImage = url
    },
    getModalStatus(obj) {
      console.log('obj :>> ', obj);
      this.cropperImg = obj.cropperImg;
      this.isShowCropper = obj.cropperShow;
    },

    // 文件上传-接口-上传文件
    postUploadFile(blob) {
      console.log('blob :>> ', blob);
      //将blob转换为file
      let file = new File([blob], '图片.png', { type: 'image/png', lastModified: Date.now() });
      file.uid = Date.now();
      var fd = new FormData();
      fd.append("file", file, "图片.png");
      fd.append("project", "micropark_coordination");

      console.log('fd :>> ', fd);

      // uploadFile(fd).then(res => {
      //   if (res.code === 200) {
      //     this.form.bgImage = res.browser;
      //     //  this.$refs.upload.clearFiles()
      //     this.isShowCropper = false;
      //     this.cropperImg = null;
      //     this.cropperFile = {};
      //   }
      // });
    }
  },
};
</script>

<style lang="less" scoped>
/deep/.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
/deep/.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
/deep/.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 126px;
  height: 126px;
  line-height: 126px;
  text-align: center;
  background-color: #fff;
}
/deep/.avatar {
  width: 126px;
  height: 126px;
  display: block;
}

/deep/.el-icon-plus:before {
  line-height: 126px;
}

.uploadWrap0-contanner {
  margin-top: 10px;
  .item {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .item-l,
    .item-r {
      display: flex;
      align-content: center;
      margin-top: 20px;
      .label {
        line-height: 126px;
        margin-right: 10px;
        white-space: nowrap;
      }
    }
    .audioSelect {
      width: 100px;
    }
    .item-r {
      margin-left: 40px;
      // /deep/.el-progress-circle{
      //   height: 80px !important;
      //   width: 80px !important;
      // }
      .Upload_pictures {
        font-size: 12px;
      }
    }
    .wrap {
      display: flex;
      align-items: center;
      margin-top: 10px;
      margin-right: 30px;
      &:last-child {
        margin-right: 0;
      }
      .label {
        margin-right: 10px;
        // white-space: nowrap;
        text-align: center;
        margin-right: 10px;
      }
    }
  }
}
</style>

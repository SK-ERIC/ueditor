<template>
  <div class="lv_tools_container">
    <div class="inner">
      <ul class="lv_tools" ref="lvTools">
        <li
          class="tools_item"
          v-for="(item, index) in tools"
          :data-act="item.name"
          :class="{'disabled': item.disable}"
          :key="index"
          @click="toolClick($event,item)"
        >
          <LVIcon :iconClass="item.icon"></LVIcon>
          <h5>{{item.title}}</h5>
        </li>
      </ul>
      <ul class="lv_tools_save">
        <li class="preview" @click="_showPhonePreview">文章预览</li>
        <li class="save" @click="_showSavePop">保存并发布</li>
      </ul>
    </div>
  </div>
</template>

<script>
  import LVIcon from '@components/LVIcon'
  import { pushNewsData } from "@api/home.js";
  import $ from 'jquery'
  export default {
    name: "LVTools",
    components: {
      LVIcon,
    },
    data() {
      return {
        tools: [
          // {
          //   id: '1',
          //   title: '微信文章',
          //   name: 'weixin_article',
          //   icon: 'icon_lv_weixin',
          //   disable: true,
          // },
          {
            id: '2',
            title: '导入文章',
            name: 'imported_article',
            icon: 'icon_lv_download',
            // disable: true,
          },
          // {
          //   id: '3',
          //   title: '上传图片',
          //   name: 'upload_img',
          //   icon: 'icon_lv_picture',
          //   disable: true,
          // },
          // {
          //   id: '4',
          //   title: '清空/新建',
          //   name: 'cleardoc',
          //   icon: 'icon_lv_delete',
          // },
          // {
          //   id: '5',
          //   title: '复制全文',
          //   name: 'selectall',
          //   icon: 'icon_lv_copy',
          //   disable: true,
          // },
          // {
          //   id: '6',
          //   title: '保存草稿',
          //   name: 'save_draft',
          //   icon: 'icon_lv_save',
          //   // disable: true,
          // },
          // {
          //   id: '7',
          //   title: '保存模板',
          //   name: 'save_template',
          //   icon: 'icon_lv_save',
          //   // disable: true,
          // }
        ],
        clipboard: null,
        title: null,
        datePicker:null,
        selectType: null,
        description: null,
        readText: null,

      }
    },
    created() {
      this.eventBus()
    },
    mounted() {
      this.$nextTick(() => {
        this.copyEditorHtml()
      })
    },
    computed: {
      articleContent() {
        return this.$store.state.tmpArticle
      },
      userId() {
        return this.$store.state.userId
      },
      userBid() {
        return this.$store.state.userBid
      }
    },
    methods: {
      eventBus(){
        this.$root.eventVue.$on("title",(message)=>{   //这里最好用箭头函数，不然this指向有问题
             console.log("1", message)  
             this.title = message    
        })
        this.$root.eventVue.$on("datePicker",(message)=>{   //这里最好用箭头函数，不然this指向有问题
             console.log("2", message)  
             this.datepicker = message    
        })
        this.$root.eventVue.$on("selectType",(message)=>{   //这里最好用箭头函数，不然this指向有问题
             console.log("3", message)    
             this.selectType = message  
        })
        this.$root.eventVue.$on("description",(message)=>{   //这里最好用箭头函数，不然this指向有问题
             console.log("4", message)  
             this.description = message    
        })
        this.$root.eventVue.$on("readText",(message)=>{   //这里最好用箭头函数，不然this指向有问题
             console.log("5", message)  
             this.readText = message    
        })
      },
      copyEditorHtml() {
        const vm = this
        let toolBar = $(vm.$refs.lvTools)
        let copyBtn = toolBar.find("[data-act='selectall']")

      },
      toolClick(e, obj) {
        if (obj.disable) return false
        if (!this.userId) {
          this.$util.ToastLogin()
          return false
        }
        this.$emit('toolClick', {event: e, data: obj})
      },
      _showPhonePreview() {
        // TODO:临时注释
        if(!this.userId) {
          this.$util.ToastLogin()
          return false;
        }
        if(!this.articleContent) {
          this.$util.ToastWarning('请填写内容后再进行预览')
          return false
          }
        this.$emit('showPhonePreview')
      },

      _showSavePop(){
      // TODO:临时注释
        if(!this.userId) {
          this.$util.ToastLogin()
          return false;
        }
        if(!this.articleContent) {
          this.$util.ToastWarning('请填写内容后再进行保存')
          return false
        }
        // this.$emit('showSavePop')

     let params = {
        userBid: this.userBid,
        cid: "1",
        title: this.title,
        cover: "",
        description: this.description,
        content: this.articleContent,
        view: this.readText,
        is_video: null,
        vido_type: 0,
        vid: ""
      };

      pushNewsData(params).then( res => {
        
      }) 




      },
    //   _publishArticle() {
    //   let params = {
    //     mid: this.userId,
    //     cover: this.coverUrl,
    //     title: this.articleFormModel["title"],
    //     desc: this.articleFormModel["desc"],
    //     content: this.articleContent
    //   };
    //   console.log(params)
    //   publishArticle(params).then(() => {
    //     this.closePop();
    //     this.$util.ToastSuccess("发布成功");
    //   });
    // },

    }
  }
</script>

<style lang="less" scoped>
@import "@assets/common/option";
.lv_tools_container {
  display: flex;
  width: 100%;
  height: 100%;
  .inner {
    align-self: center;
    .lv_tools {
      position: relative;
      z-index: 1;
      .tools_item {
        background-color: #fff;
        width: 120px;
        height: 36px;
        line-height: 36px;
        font-size: 14px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        border-radius: 0.3em;
        margin-bottom: 10px;
        cursor: pointer;
        user-select: none;
        > h5 {
          font-size: 14px;
          margin-left: 5px;
        }
        > i {
          margin-left: 20px;
        }
        &:hover {
          color: @active-color;
          background-color: @active-bg;
        }
        &.disabled {
          opacity: 0.25;
          cursor: not-allowed;
          background: 0 0 !important;
          &:hover {
            color: @main-color;
            background-color: #fff;
          }
        }
      }
    }
    .lv_tools_save {
      position: relative;
      z-index: 1;
      margin-top: 40px;
      > li {
        width: 120px;
        height: 36px;
        line-height: 36px;
        font-weight: bold;
        font-size: 14px;
        color: #fff;
        text-align: center;
        border-radius: 0.3em;
        margin-bottom: 10px;
        cursor: pointer;
        user-select: none;
        &.preview {
          background-color: #5887eb;
        }
        &.save {
          background-color: #70c45e;
        }
      }
    }
  }
}
</style>
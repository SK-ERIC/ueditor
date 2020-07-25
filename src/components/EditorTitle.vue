<template>
  <div class="editorTitle-container">
    <div class="item">
      <span class="label">标题:</span>
      <el-input v-model="title" placeholder="请输入标题" @change="change"></el-input>
    </div>
    <div class="item">
      <span class="label">分类:</span>
      <el-select v-model="selectType" placeholder="请选择" @change="selectChange">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.label"
          
        >
        </el-option>
      </el-select>
    </div>
    <div class="item">
      <span class="label">品牌:</span>
      <el-input v-model="brand" :disabled="true"></el-input>
    </div>
    <div class="item">
      <span class="label">概述:</span>
      <el-input
        v-model="desc"
        type="textarea"
        :autosize="{ minRows: 1, maxRows: 4 }"
        placeholder="请输入内容"
        @change="descChange"
      ></el-input>
    </div>
    <div class="item">
      <span class="label">发布时间:</span>
      <el-date-picker
        v-model="datePicker"
        type="datetime"
        placeholder="选择日期时间"
        align="right"
        :picker-options="pickerOptions"
        value-format="timestamp"
        @change="datePickerChange"
      >
      </el-date-picker>
    </div>
    <div class="item">
      <span class="label">阅读初始值:</span>
      <el-input v-model="readText" placeholder="请输入阅读初始值" @change="readChange"></el-input>
    </div>
  </div>
</template>

<script>
export default {
  name: "EditorTitle",
  data() {
    return {
      title: "",
      readText: null,
      options: [
        {
          value: "选项1",
          label: "黄金糕",
        },
        {
          value: "选项2",
          label: "双皮奶",
        },
        {
          value: "选项3",
          label: "蚵仔煎",
        },
        {
          value: "选项4",
          label: "龙须面",
        },
        {
          value: "选项5",
          label: "北京烤鸭",
        },
         {
          value: "选项6",
          label: "黄金糕",
        },
        {
          value: "选项7",
          label: "双皮奶",
        },
        {
          value: "选项8",
          label: "蚵仔煎",
        },
        {
          value: "选项9",
          label: "龙须面",
        },
        {
          value: "选项10",
          label: "北京烤鸭",
        },
      ],
      selectType: "",
      brand: "葆婴",
      desc: "",
      pickerOptions: {
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            },
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            },
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            },
          },
        ],
      },
      datePicker: "",
    };
  },
  methods: {
    change() {
      this.$root.eventVue.$emit("title",this.title)
    },
    selectChange(val) {
      this.$root.eventVue.$emit("selectType",this.selectType)
    },
    descChange() {
      this.$root.eventVue.$emit("description",this.desc)
    },
    datePickerChange(val) {
      // console.log("datePicker", this.datePicker);
      this.$root.eventVue.$emit("datePicker", val / 1000)
    },
    readChange() {
      this.$root.eventVue.$emit("readText", this.readText)
    }
  },
};
</script>

<style lang="less" scoped>
.editorTitle-container {
  .item {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    .label {
      white-space: nowrap;
      margin-right: 10px;
    }
    .el-select {
      width: 100%;
    }
  }
}
</style>

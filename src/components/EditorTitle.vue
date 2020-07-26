<template>
  <div class="editorTitle-container">
    <div class="item">
      <span class="label">标题:</span>
      <el-input v-model="title" clearable placeholder="请输入标题" @change="change"></el-input>
    </div>
    <div class="item">
      <span class="label">分类:</span>
      <el-select v-model="selectType" placeholder="请选择" @change="selectChange">
        <el-option
          v-for="item in category"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        ></el-option>
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
        clearable
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
      ></el-date-picker>
    </div>
    <div class="item">
      <span class="label">阅读初始值:</span>
      <el-input v-model="readText" clearable placeholder="请输入阅读初始值" @change="readChange"></el-input>
    </div>
  </div>
</template>

<script>
import { getCategory } from "@api/home";
export default {
  name: "EditorTitle",
  data() {
    return {
      title: "",
      readText: null,
      category: null,
      selectType: null,
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
  created() {
    this._getCategory();
  },
  methods: {
    _getCategory() {
      getCategory().then(res => {
        const data = res.data.data;
        this.category = data
      })
    },
    change() {
      this.$root.eventVue.$emit("title", this.title);
    },
    selectChange(val) {
      this.$root.eventVue.$emit("selectType", this.selectType);
    },
    descChange() {
      this.$root.eventVue.$emit("description", this.desc);
    },
    datePickerChange(val) {
      // console.log("datePicker", this.datePicker);
      this.$root.eventVue.$emit("datePicker", val / 1000);
    },
    readChange() {
      this.$root.eventVue.$emit("readText", this.readText);
    },
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

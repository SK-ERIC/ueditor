<template>
  <div class="editorTitle-container">
    <div class="item">
      <span class="label">标题:</span>
      <el-input v-model="input" placeholder="请输入标题"></el-input>
    </div>
    <div class="item">
      <span class="label">分类:</span>
      <el-select v-model="value" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
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
      ></el-input>
    </div>
    <div class="item">
      <span class="label">发布时间:</span>
      <el-date-picker
        v-model="value2"
        type="datetime"
        placeholder="选择日期时间"
        align="right"
        :picker-options="pickerOptions"
      >
      </el-date-picker>
    </div>
    <div class="item">
      <span class="label">阅读初始值:</span>
      <el-input v-model="input" placeholder="请输入阅读初始值"></el-input>
    </div>
  </div>
</template>

<script>
export default {
  name: "EditorTitle",
  data() {
    return {
      input: "",
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
      ],
      value: "",
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
      value2: "",
    };
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

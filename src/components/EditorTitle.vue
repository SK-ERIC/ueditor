<template>
  <div class="editorTitle-container">
    <el-form ref="ruleForm" :model="ruleForm" :rules="rules">
      <el-form-item label="标题" prop="title">
        <el-input
          v-model="ruleForm.title"
          placeholder="请输入标题"
          clearable
          @change="change"
        ></el-input>
      </el-form-item>

      <el-form-item label="分类" prop="category">
        <el-select
          v-model="ruleForm.category"
          placeholder="请选择分类"
          @change="selectChange"
        >
          <el-option
            v-for="item in categoryList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="项目" prop="project">
        <el-select
          v-model="ruleForm.project"
          placeholder="请选择项目"
          @change="selectProjectChange"
        >
          <el-option
            v-for="(item, index) in appList"
            :key="index"
            :label="item.app_name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="公众号" prop="matrix">
        <el-select
          v-model="ruleForm.matrix"
          placeholder="请选择公众号"
          @change="selectMatrixChange"
        >
          <el-option
            v-for="(item, index) in matrixList"
            :key="index"
            :label="item.app_name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="品牌" prop="brand">
        <el-select
          v-model="ruleForm.brand"
          :disabled="brandDisabled"
          @change="selectBrandChange"
        >
          <el-option
            v-for="(item, index) in brandList"
            :key="index"
            :label="item.name"
            :value="item.api_company_id"
          >
          </el-option>
        </el-select>

        <!-- <el-cascader :options="brandList" :props="props" :show-all-levels="false"></el-cascader> -->
      </el-form-item>

      <el-form-item label="概述" prop="desc">
        <el-input
          v-model="ruleForm.desc"
          placeholder="请输入文章概述"
          type="textarea"
          :autosize="{ minRows: 1, maxRows: 4 }"
          clearable
          @change="descChange"
        ></el-input>
      </el-form-item>

      <el-form-item label="发布时间" prop="datePicker">
        <el-date-picker
          v-model="ruleForm.datePicker"
          type="datetime"
          placeholder="选择日期时间"
          align="right"
          :picker-options="pickerOptions"
          value-format="timestamp"
          @change="datePickerChange"
        ></el-date-picker>
      </el-form-item>

      <el-form-item label="阅读初始值" prop="readText">
        <el-input
          v-model="ruleForm.readText"
          type="number"
          clearable
          placeholder="请输入阅读初始值"
          @change="readChange"
        ></el-input>
      </el-form-item>
    </el-form>

    <!-- <div class="item">
      <span class="label">阅读初始值:</span>
      <el-input
        v-model="readText"
        type="number"
        clearable
        placeholder="请输入阅读初始值"
        @change="readChange"
      ></el-input>
    </div> -->
  </div>
</template>

<script>
import {
  getCategory,
  editorMyArticle,
  getBrand,
  getMatrixList,
  getAppList,
} from "@api/home";
export default {
  name: "EditorTitle",
  data() {
    return {
      ruleForm: {
        title: "",
        category: "",
        brand: "",
        desc: "",
        datePicker: null,
        readText: null,
        matrix: "",
        project: "",
      },
      title: "",
      readText: null,
      categoryList: null,
      selectType: null,
      desc: "",
      brandList: [],
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
      rules: {
        title: [
          { required: true, message: "请输入文章标题", trigger: "blur" },
          { required: true, message: "请输入文章标题", trigger: "change" },
          { min: 1, max: 60, message: "长度在 60 个字符以内", trigger: "blur" },
          {
            min: 1,
            max: 60,
            message: "长度在 60 个字符以内",
            trigger: "change",
          },
        ],
        category: [
          { required: true, message: "请选择分类", trigger: "change" },
        ],
        desc: [
          { required: true, message: "请输入文章概述", trigger: "blur" },
          { required: true, message: "请输入文章概述", trigger: "change" },
          { min: 1, max: 60, message: "长度在 60 个字符以内", trigger: "blur" },
          {
            min: 1,
            max: 60,
            message: "长度在 60 个字符以内",
            trigger: "change",
          },
        ],
        datePicker: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change",
          },
        ],
        readText: [{ required: true }],
        brand: [{ required: true, message: "请选择品牌" }],
        matrix: [{ required: true, message: "请选择公众号" }],
        project: [{ required: true, message: "请选择项目" }],
      },
      props: {
        label: "name",
        value: "chr",
        children: "data",
      },
      matrixList: [],
      appList: [],
    };
  },
  computed: {
    userBrand() {
      return this.$store.state.userBrand;
    },
    brandDisabled() {
      // return this.$store.state.isEditor != 1;
    },
  },
  created() {
    this._editorMyArticle();
    this._getCategory();
    this._getAppList();
    // this._getMatrixList();
    // this._getBrand({matrix_id: 1})
  },
  methods: {
    _getAppList() {
      getAppList().then((res) => {
        const data = res.data;
        if (data.code == 200) {
          this.appList = data.data;
        }
      });
    },
    _getMatrixList(params) {
      getMatrixList(params).then((res) => {
        const data = res.data;
        if (data.code == 200) {
          this.matrixList = data.data;
        }
      });
    },
    _getBrand(params) {
      getBrand(params).then((res) => {
        const data = res.data;
        if (data.code == 200) {
          this.brandList = data.data;
        }
      });
    },
    _editorMyArticle() {
      const id = this.$route.query.id || null;
      if (id) {
        editorMyArticle({ id })
          .then((res) => {
            const data = res.data;
            if (data.code == 200) {
              this.ruleForm.title = data.data.title || "";
              this.ruleForm.category = data.data.cid || "";
              this.ruleForm.desc = data.data.description || "";
              this.ruleForm.datePicker = data.data.add_time * 1000 || "";
              this.ruleForm.readText = data.data.views || "";
              this.ruleForm.brand = data.data.brand_name || "";
              this.ruleForm.project = data.data.appid || '';
              this.ruleForm.matrix = data.data.matrix_id || '';
              this.$store.state.tmpArticle = data.data.content || "";

              // this.$root.eventVue.$emit("ruleForm", this.ruleForm);

              if (data.data.appid) {
                this._getMatrixList({ app_id: data.data.appid });
                this._getBrand({
                  matrix_id: data.data.matrix_id,
                  app_id: data.data.appid,
                });
              }
            }
          })
          .catch((e) => {});
      }
    },
    _getCategory() {
      getCategory().then((res) => {
        const data = res.data.data;
        this.categoryList = data;
      });
    },
    change(val) {
      this.$root.eventVue.$emit("title", val);
    },
    selectChange(val) {
      this.$root.eventVue.$emit("selectType", val);
    },
    selectBrandChange(val) {
      this.$root.eventVue.$emit("selectBrandType", val);
    },
    descChange(val) {
      this.$root.eventVue.$emit("description", val);
    },
    datePickerChange(val) {
      this.$root.eventVue.$emit("datePicker", val / 1000);
    },
    readChange(val) {
      this.$root.eventVue.$emit("readText", val);
    },
    selectMatrixChange(val) {
      this._getBrand({ matrix_id: val, appid: this.ruleForm.project });
      this.ruleForm.brand = "";
      this.$root.eventVue.$emit("matrix_id", val);
    },
    selectProjectChange(val) {
      this.matrixList.length = 0;
      this.brandList.length = 0;
      this._getMatrixList({ app_id: val });
      this.ruleForm.matrix = "";
      this.ruleForm.brand = "";
      this.$root.eventVue.$emit("appid", val);
      console.log("appid", val);
    },
  },
};
</script>

<style lang="less" scoped>
/deep/.el-form-item__content {
  flex: 1;
  .el-select {
    width: 100%;
  }
  .el-date-editor {
    width: 100%;
  }
  .el-form-item__error {
    display: none;
  }
}
/deep/.el-form-item {
  display: flex;
  flex-direction: column;
  margin-bottom: initial;
  .el-form-item__label {
    text-align: left;
  }
}
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

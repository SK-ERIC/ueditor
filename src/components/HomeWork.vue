<template>
  <div class="container">
    <el-table
      v-loading="listLoading"
      :data="articleData"
      border
      fit
      highlight-current-row
      style="width: 100%"
      @sort-change="sortChange"
    >
      <el-table-column
        sortable="custom"
        prop="id"
        align="center"
        label="ID"
        width="80"
        :class-name="getSortClass('id')"
      >
        <template slot-scope="{ row }">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column width="100px" align="center" label="品牌">
        <template slot-scope="{ row }">
          <span>{{ row.brand }}</span>
        </template>
      </el-table-column>

      <el-table-column label="标题" min-width="150px">
        <template slot-scope="{ row }">
          <span class="link-type" @click="handleUpdate(row)">{{
            row.title
          }}</span>
        </template>
      </el-table-column>

      <el-table-column prop="cover" align="center" label="封面">
        <template slot-scope="scope">
          <el-popover placement="bottom" trigger="click">
            <a :href="scope.row.cover" target="_blank" title="查看最大化图片">
              <img :src="scope.row.cover" style="width: 200px;height: 200px" />
            </a>
            <img
              slot="reference"
              :src="scope.row.cover"
              style="width: 50px;height: 50px; cursor:pointer; margin: 0 auto;"
            />
          </el-popover>
        </template>
      </el-table-column>

      <el-table-column width="140px" align="center" label="发布时间">
        <template slot-scope="{ row }">
          <span>{{ row.timestamp | parseTime("{y}-{m}-{d} {h}:{i}") }}</span>
        </template>
      </el-table-column>

      <el-table-column width="90px" align="center" label="是否音视频">
        <template slot-scope="{ row }">
          <span>{{ row.isAudio }}</span>
        </template>
      </el-table-column>

      <el-table-column width="90px" align="center" label="视频类型">
        <template slot-scope="{ row }">
          <span>{{ row.type }}</span>
        </template>
      </el-table-column>

      <el-table-column width="200px" align="center" label="视频地址">
        <template slot-scope="{ row }">
          <span>{{ row.url }}</span>
        </template>
      </el-table-column>

      <el-table-column label="状态" align="center" class-name="status-col" width="100">
        <template slot-scope="{ row }">
          <span>{{ row.status }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center" width="180" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
          <el-button v-waves type="primary" size="mini" @click="handleUpdate(row)">
            编辑
          </el-button>
          <el-button v-waves size="mini" type="danger" @click="handleDelete(row,$index)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

     <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <!-- 编辑 -->
    <el-dialog title="编辑" :visible.sync="editDialogVisible">
      <el-form ref="form" :model="articleInfo" label-width="60px">
        <el-form-item label="标题">
          <el-input autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="封面">
          <el-input autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button>取 消</el-button>
        <el-button type="primary">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import waves from '@/directive/waves' // waves directive
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
export default {
  name: "homeWork",
  components: { Pagination },
  directives: { waves },
  data() {
    return {
      total: 10,
      articleData: [
        {
          id: 1,
          brand: "泰木谷",
          title: "但是发射点发射点发的发士大夫",
          cover:
            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1595602197899&di=fe0f4322c8dc161213e0be367a4c7703&imgtype=0&src=http%3A%2F%2Fa2.att.hudong.com%2F36%2F48%2F19300001357258133412489354717.jpg",
          timestamp: 1595593742,
          isAudio: "否",
          type: "无",
          url: "blob:https://baike.baidu.com/d91c959a-b070-4305-9fb1-9d1b9d0141bd",
          status: "待审核",
        },
        {
          id: 2,
          brand: "泰木谷",
          title: "但是发射点发射点发的发士大夫",
          cover:
            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1595602197899&di=fe0f4322c8dc161213e0be367a4c7703&imgtype=0&src=http%3A%2F%2Fa2.att.hudong.com%2F36%2F48%2F19300001357258133412489354717.jpg",
          timestamp: 1595593742,
          isAudio: "否",
          type: "无",
          url: "无",
          status: "待审核",
        },
        {
          id: 3,
          brand: "泰木谷",
          title: "但是发射点发射点发的发士大夫",
          cover:
            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1595602197899&di=fe0f4322c8dc161213e0be367a4c7703&imgtype=0&src=http%3A%2F%2Fa2.att.hudong.com%2F36%2F48%2F19300001357258133412489354717.jpg",
          timestamp: 1595593742,
          isAudio: "否",
          type: "无",
          url: "无",
          status: "待审核",
        },
        {
          id: 4,
          brand: "泰木谷",
          title: "但是发射点发射点发的发士大夫",
          cover:
            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1595602197899&di=fe0f4322c8dc161213e0be367a4c7703&imgtype=0&src=http%3A%2F%2Fa2.att.hudong.com%2F36%2F48%2F19300001357258133412489354717.jpg",
          timestamp: 1595593742,
          isAudio: "否",
          type: "无",
          url: "无",
          status: "待审核",
        },
        {
          id: 5,
          brand: "泰木谷",
          title: "但是发射点发射点发的发士大夫",
          cover:
            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1595602197899&di=fe0f4322c8dc161213e0be367a4c7703&imgtype=0&src=http%3A%2F%2Fa2.att.hudong.com%2F36%2F48%2F19300001357258133412489354717.jpg",
          timestamp: 1595593742,
          isAudio: "否",
          type: "无",
          url: "无",
          status: "待审核",
        },
        {
          id: 6,
          brand: "泰木谷",
          title: "但是发射点发射点发的发士大夫",
          cover:
            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1595602197899&di=fe0f4322c8dc161213e0be367a4c7703&imgtype=0&src=http%3A%2F%2Fa2.att.hudong.com%2F36%2F48%2F19300001357258133412489354717.jpg",
          timestamp: 1595593742,
          isAudio: "否",
          type: "无",
          url: "无",
          status: "待审核",
        },
      ],
      listQuery: {
        page: 1,
        limit: 20,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: "+id",
      },
      listLoading: true,
      articleInfo: {},
      editDialogVisible: false,
      articleIndex: 0,
    };
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
    },
    sortChange(data) {
      console.log("data", data);
      const { prop, order } = data;
      if (prop === "id") {
        this.sortByID(order);
      }
    },
    sortByID(order) {
      if (order === "ascending") {
        this.listQuery.sort = "+id";
      } else {
        this.listQuery.sort = "-id";
      }
      this.handleFilter();
    },
    handleUpdate(row) {

    },
    handleDelete(row, index) {},
    handleFilter() {
      this.listQuery.page = 1;
      // this.getList()
    },
    articleEdit(index, item) {
      this.articleIndex = index;
      this.editDialogVisible = true;
    },
    articleDelete(index) {
      this.$confirm("确认删除？")
        .then((_) => {
          this.articleData.splice(index, 1);
        })
        .catch((_) => {});
    },
    getSortClass: function(key) {
      const sort = this.listQuery.sort;
      return sort === `+${key}` ? "ascending" : "descending";
    },
  },
};
</script>

<style lang="less" scoped>
@import "@assets/common/option";
.container {
  height: @container-height;
}
</style>

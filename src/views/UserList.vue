<template>
  <div class="user-list">
    <el-button type="primary" @click="$router.push('/edit')">添加</el-button>
    <base-table :data="list" :columns="columns">
      <template slot="operate" slot-scope="{row}">
        <el-button @click="toEdit(row.id)">编辑</el-button>
        <el-button type="danger" @click="del(row.id)">删除</el-button>
      </template>
    </base-table>
  </div>
</template>

<script>
import BaseTable from '@/components/BaseTable'
import { getUserList, deleteUser } from '@/apis/index.js'
export default {
  components: { BaseTable },
  data () {
    return {
      list: [],
      columns: [
        { label: 'ID', prop: 'id' },
        { label: '名称', prop: 'name' },
        { label: '年龄', prop: 'age' },
        { label: '工作', prop: 'job' },
        { label: '操作', slot: 'operate' }
      ]
    }
  },
  async created () {
    await this.getList()
  },
  methods: {
    /** 获取用户列表 */
    async getList () {
      let res = await getUserList()
      this.list = res
    },
    /** 删除用户 */
    async del (id) {
      await this.$confirm(`确定删除 id 为 ${id} 的用户么?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      await deleteUser({ id })
      await this.getList()
    },
    /** 跳转到编辑页面 */
    toEdit (id) {
      this.$router.push({ path: '/edit', query: { id } })
    }
  }
}
</script>

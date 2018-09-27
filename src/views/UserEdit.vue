<template>
  <div class="user-edit">
    <base-form
      ref="form"
      v-model="formData"
      :model="formData"
      :fileds="fileds"
      :components="components"
      label-position="top">
      <template slot="submit">
        <el-button @click="$router.push('/list')">取消</el-button>
        <el-button type="primary" @click="submit">提交</el-button>
      </template>
    </base-form>
  </div>
</template>

<script>
import BaseForm from '@/components/BaseForm'
import { getUserDetail, setUserDetail } from '@/apis/index.js'
export default {
  components: { BaseForm },
  data () {
    return {
      formData: {
        name: '',
        age: '',
        job: ''
      },
      components: {
        'input': 'el-input',
        'number': 'el-input-number'
      },
      fileds: [
        { label: '姓名', prop: 'name', required: true, type: 'input' },
        { label: '年龄', prop: 'age', required: true, type: 'number' },
        { label: '工作', prop: 'job', required: true, type: 'input' },
        { isSlot: 'submit' }
      ]
    }
  },
  computed: {
    id () { return this.$route.query.id }
  },
  async created () {
    let id = this.id
    if (id) {
      let res = await getUserDetail({ id })
      this.formData = { ...res }
    }
  },
  methods: {
    async submit () {
      if (!this.$refs.form.validate()) return
      await setUserDetail({ id: this.id, ...this.formData })
      this.$router.push('/list')
    }
  }
}
</script>

<style scoped>
.user-edit {
  width: 200px;
  margin: 0 auto;
}
</style>

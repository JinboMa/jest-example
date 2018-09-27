<template>
  <el-form ref="form" v-bind="$attrs" class="base-form">
    <draggable v-model="bindFileds" :options="dragOption" @end="dragOption.onEnd">
      <component
        v-for="(item, i) in fileds"
        v-if="item"
        :key="i"
        :is="outWrap"
        :item="item"
        :index="i"
        :trigger="onEvent(item, i)">
        <el-form-item v-bind="item">
          <component
            :is="inWrap"
            :item="item"
            :index="i"
            :event-fn="onEvent(item, i)">
            <slot :item="item" :index="i" name="before"/>
            <slot v-if="item.isSlot" :name="item.isSlot" :item="item" :index="i"/>
            <component v-else :is="components[item.type]" v-model="data[item.prop]" v-bind.sync="item.props" v-on="$listeners"/>
            <slot :item="item" :index="i" name="after"/>
          </component>
        </el-form-item>
      </component>
    </draggable>
  </el-form>
</template>

<script>
import draggable from 'vuedraggable'
export default {
  components: { draggable },
  inheritAttrs: false,
  /** 自定义 v-model 事件 */
  model: {
    prop: 'value',
    event: 'bindInput'
  },
  props: {
    /** 绑定的数据 */
    value: {
      type: Object,
      default: () => ({})
    },
    /** 表单渲染配置项 */
    fileds: {
      type: Array,
      default: () => []
    },
    /** item 外部的自定义组件 */
    'out-wrap': {
      type: Object,
      default: () => ({
        render (h) {
          return h('span', this.$slots.default)
        }
      })
    },
    /** item 内部的自定义组件 */
    'in-wrap': {
      type: Object,
      default: () => ({
        render (h) {
          return h('span', this.$slots.default)
        }
      })
    },
    /** 表单使用的组件 map */
    components: {
      type: Object,
      default: () => ({})
    },
    /**
     * 拖拽排序的配置项
     * https://github.com/RubaXa/Sortable#options
     */
    drag: {
      type: Boolean | Object,
      default: false
    }
  },
  computed: {
    /** 双向绑定数据 */
    data: {
      get () { return this.value },
      set (val) { this.$emit('bindInput', val) }
    },
    /** 双向绑定的 fileds */
    bindFileds: {
      get () { return this.fileds },
      set (val) { this.$emit('update:fileds', val) }
    },
    /** 拖拽 option */
    dragOption () {
      let onEnd = () => ''
      if (this.drag === false) return { disabled: true, onEnd }
      if (typeof this.drag === 'object') return { onEnd, ...this.drag }
      else return {}
    }
  },
  methods: {
    /** 验证表单项 */
    validate () {
      let res = false
      this.$refs.form.validate((valid) => { res = valid })
      return res
    },
    /** 表单验证清除 */
    clearValidate () {
      this.$refs.form && this.$refs.form.clearValidate()
    },
    /** 事件触发函数 */
    onEvent (item, index) {
      return (type) => {
        if (type === 'del') this.onDelete(index)
        this.$emit('event', { type, item, index })
      }
    },
    /** 删除 */
    onDelete (i) {
      this.bindFileds.splice(i, 1)
    }
  }
}
</script>

<template>
  <el-table
    v-if="showTable"
    ref="table"
    :default-expand-all="expand ? true : false"
    :row-class-name="rowClassName"
    :data="data"
    :highlight-current-row="isHighLightCurrentRow"
    v-bind="$attrs"
    :class="tableClassName"
    class="base-table"
    v-on="$listeners">
    <template v-for="(item, i) in columns">
      <!-- expand 拓展行 -->
      <el-table-column
        v-if="item.hasOwnProperty('slot') && item.slot === 'expand'"
        :key="i"
        v-bind="item"
        :class="item.class"
        :style="item.style"
        :slot="null"
        type="expand">
        <template slot-scope="scope">
          <slot :name="item.slot" v-bind="scope"/>
        </template>
      </el-table-column>
      <!-- 有 slot 情况 -->
      <el-table-column
        v-if="item.hasOwnProperty('slot') && item.slot !== 'expand'"
        :key="i"
        v-bind="item"
        :class="item.class"
        :style="item.style"
        :slot="null"
        :prop="item.slot">
        <template slot-scope="scope">
          <slot :name="item.slot" v-bind="scope"/>
        </template>
      </el-table-column>
      <!-- 没有 slot 情况 -->
      <el-table-column
        v-if="!item.hasOwnProperty('slot')"
        :key="i"
        v-bind="item"
        :class="item.class"
        :style="item.style"/>
    </template>
    <template slot="append">
      <slot name="append"/>
    </template>
  </el-table>
</template>

<script>
import Sortable from 'sortablejs'
import cancelClick from '@/mixins/cancelClick.js'
/**
 * @event drag-end 拖动结束事件
 * @param {Array} list - 拖动改变后的数据
 */
export default {
  mixins: [
    cancelClick.call(this, function () {
      if (!this.$refs.table) return
      if (!this.cancelClick) return
      this.$refs.table.setCurrentRow()
    })
  ],
  inheritAttrs: false,
  props: {
    /** 与 el-table data 相同，子组件使用 :data.sync 实现拖动自动改变数据 */
    data: {
      type: Array,
      default: () => []
    },
    /** 渲染 table 列的数据 */
    columns: {
      type: Array,
      default: () => []
    },
    /** 是否开启拖动 */
    draggable: {
      type: Boolean,
      default: false
    },
    /** 为拖动插件添加其他选项,参考下面的链接 */
    /** https://github.com/RubaXa/Sortable#options */
    dragOptions: {
      type: Object,
      default: () => ({})
    },
    /** 是否需要扩展行，需配合 slot: 'expand' 一起使用 */
    expand: {
      type: Boolean,
      default: false
    },
    /** 在 draggable 为 true 的情况下，设置当前行是否高亮 */
    'draggable-highlight': {
      type: Boolean,
      default: true
    },
    /** 点击其他地方，取消当前选择 */
    cancelClick: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      showTable: true,
      dragIndex: null,
      dragCurrentIndex: null,
      sortable: null
    }
  },
  computed: {
    rowClassName () {
      return this.draggable ? 'draggable-row' : ''
    },
    tableClassName () {
      return {
        'multiline-table': this.expand
      }
    },
    isHighLightCurrentRow () {
      return this.draggable && this.draggableHighlight
    }
  },
  watch: {
    /** 如果动态改变 draggable */
    'draggable' (val, old) {
      this.initDrag()
    }
  },
  mounted () {
    this.initDrag()
    if (this.expand) {
      // notice: 放在mouted中，如果数据方式变更导致table重新渲染，可能会影响expand样式
      this.hideExpandColumn()
    }
  },
  methods: {
    /** 初始化拖动 */
    initDrag () {
      this.sortable && this.sortable.destroy()
      this.sortable = Sortable.create(this.$el.querySelector('.el-table__body-wrapper tbody'), {
        disabled: !this.draggable,
        draggable: '.draggable-row',
        handle: '.draggable-row',
        dragClass: 'is-drag', // 拖动的元素
        ghostClass: 'is-clone', // clone 的元素
        onEnd: (e) => {
          this.dragIndex = e.oldIndex
          this.dragCurrentIndex = e.newIndex
          this.$nextTick(this.dragToDo)
        },
        ...this.dragOptions
      })
    },
    /** 监听拖动行，实现拖动改变数据 */
    dragToDo () {
      let currentIndex = this.dragCurrentIndex
      let oldIndex = this.dragIndex
      if (currentIndex === null || oldIndex === null || oldIndex === currentIndex) return
      this.showTable = false
      let list = JSON.parse(JSON.stringify(this.data))
      let oldItem = { ...list[oldIndex] }
      list.splice(oldIndex, 1)
      list.splice(currentIndex, 0, oldItem)
      this.$emit('drag-end', list)
      this.$emit('update:data', list)
      this.$nextTick(() => {
        this.showTable = true
        this.$nextTick(this.initDrag)
      })
      setTimeout(() => {
        this.$refs.table.setCurrentRow(oldItem)
      }, 16)
    },
    /** 隐藏 expand */
    hideExpandColumn () {
      if (!this.$refs['table']) return
      let tableNode = this.$refs['table'].$el

      /* colgroup 中的col 是动态插入的，需要updated时，去修改参数 */
      let groupNodes = tableNode.querySelectorAll('colgroup')

      for (let i = 0; i < groupNodes.length; i++) {
        let group = groupNodes[i]
        let colNodes = group.querySelectorAll('col')
        let preAddWidth = parseInt(48 / (colNodes.length - 1))
        for (let j = 0; j < colNodes.length; j++) {
          if (colNodes[j].width !== '48') {
            colNodes[j].style.width = parseInt(colNodes[j].width) + preAddWidth + 'px'
          }
        }
      }
    }
  }
}
</script>

/**
 * 点击除当前组件制定元素的其他地方触发该事件
 * @param {Function} callback - 触发事件将执行的函数
 * @param {String} selector - click 触发的选择器，默认为当前组件
 * @example
 * mixins: [
 *   cancelClick.call(this, function () {
 *     this.$refs.table.setCurrentRow()
 *   })
 * ]
 */
function cancelClick (callback, selector) {
  return {
    data () {
      return {
        cancelClickSelector: selector
      }
    },
    computed: {
      cancelClickEl () {
        let selector = this.cancelClickSelector
        if (!selector) return this.$el
        return this.$el.querySelector(selector)
      }
    },
    mounted () {
      let clickToDo = callback.bind(this)
      window.addEventListener('click', (e) => {
        /** 点击元素及其所有父元素的数组 */
        let elements = e.path
        let el = this.cancelClickEl
        if (!el) return
        if (!elements.includes(el)) clickToDo()
      })
    }
  }
}

export default cancelClick

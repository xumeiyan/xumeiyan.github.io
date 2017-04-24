<template>
  <section>
    <ul class="paging">
      <li :class="{'disabled':myCurrent==1}" @click="setCurrent(1)"><span>首页</span></li>
      <li :class="{'disabled':myCurrent==1}" @click="setCurrent(myCurrent-1)"><span>上一页</span></li>
      <li v-for="item in itemList" @click="setCurrent(item.val)">
          <span v-if="myCurrent==item.val" :style="{backgroundColor:skin}" >{{item.text}}</span>
        <span v-else>{{item.text}}</span>
      </li>
      <li :class="{'disabled':myCurrent==this.page}" @click="setCurrent(myCurrent+1)"><span>下一页</span></li>
      <li :class="{'disabled':myCurrent==this.page}" @click="setCurrent(page)"><span>尾页</span></li>
    </ul>
  </section>
</template>

<script>
export default {
  props: {
    total: {
      type: Number,
      default: 0
    },
    current: {
      type: Number,
      default: 1
    },
    pageNum: {
      type: Number,
      default: 10
    },
    pageGroup: {
      type: Number,
      default: 5
    },
    skin: {
      type: String,
      default: 'blue'
    }
  },
  data () {
    return {
      myCurrent: this.current // current在子组件里需要修改，所以要用一个数值初始化，变成局部数据
    }
  },
  computed: {
    page () {
      return Math.ceil(this.total / this.pageNum)
    },
    itemList () {
      var len = this.page
      var temp = []
      var center = this.myCurrent
      var count = Math.ceil(this.pageGroup / 2)
      for (var i = 1; i <= len; i++) {
        temp.push({text: i, val: i})
      }
      if (len > this.pageGroup) {
        if (center <= count) {
          temp = temp.splice(0, this.pageGroup)
          temp.push({ text: '...', val: this.pageGroup + 1 })
        } else if (center >= (count + (len - this.pageGroup))) {
          temp = temp.splice(len - this.pageGroup, this.pageGroup)
          temp.unshift({ text: '...', val: len - this.pageGroup })
        } else {
          temp = temp.splice(center - count, this.pageGroup)
          temp.push({ text: '...', val: center + count })
          temp.unshift({ text: '...', val: center - count })
        }
      }
      return temp
    }
  },
  methods: {
    setCurrent (val) {
      if (val <= this.page && val > 0 && val !== this.myCurrent) {
        this.myCurrent = val
        this.$emit('change', this.myCurrent)
      }
    }
  }
}
</script>
<style>
  * {
    box-sizing: border-box;
  }
  .disabled {
    cursor: not-allowed;
  }
  .paging {
    display: flex;
    justify-content: center;
  }
  .paging li {
    list-style: none;
    border: 1px solid  #d0d0d0;
  }
  .paging span {
    display: flex;
    width: 50px;
    height: 30px;
    justify-content: center;
    align-items: center;
  }
  .paging li:hover {
    border: 1px solid #ADADAD;
  }
</style>

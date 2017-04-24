<template>
  <page :total="total" :current="current" :pageNum="pageNum" :pageGroup="pageGroup" :skin="skin" @change="pageChange"></page>
</template>

<script>
import page from './components/paging'
export default {
  components: {
    page
  },
  data () {
    return {
      total: 99,
      current: 1,
      pageNum: 10,
      pageGroup: 5,
      skin: 'red'
    }
  },
  methods: {
    pageChange (current) {
      console.log(current, '这里可以进行一些其他操作')
    }
  }
}
</script>
</style>

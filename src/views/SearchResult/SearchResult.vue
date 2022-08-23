<template>
  <div class="search-result-container">
    <!-- 点击实现后退效果 -->
    <van-nav-bar title="搜索结果" left-arrow @click-left="$router.back()" fixed />

    <!-- 上拉加载更多 -->
    <van-list v-model="loading" :finished="finished" finished-text="没有更多数据了" @load="onLoad" :immediate-check="false">
    <!-- 文章的 Item 项 -->
      <art-item v-for="item in searchList" :key="item.art_id.toString()" :article="item" :closable="false"></art-item>
    </van-list>
  </div>
</template>

<script>
// 按需导入 API 方法
import { getSearchResultAPI } from '@/api/searchAPI.js'
// 导入文章的 Item 项组件
import ArtItem from '@/components/ArtItem/ArtItem.vue'
export default {
  name: 'SearchResult',
  data() {
    return {
      // 页码值
      page: 1,
      searchList: [],
      // 是否正在进行上拉加载的数据请求
      loading: false,
      // 所有数据是否已经加载完毕
      finished: false
    }
  },
  methods: {
    // 获取搜索的结果
    async initSearchList() {
      // 调用 API 接口
      const { data: res } = await getSearchResultAPI(this.kw, this.page)

      if (res.message === 'OK') {
        // 为 searchList 赋值
        this.searchList = [...this.searchList,...res.data.results];
        this.loading = false
        if(res.data.results.lengtn === 0){
          this.finished = true
        }
        this.page += 1
      }
    },
    onLoda(){
      this.initSearchList()
    }
  },
  created() {
    this.initSearchList()
  },
  components: {
    ArtItem
  }
}
</script>

<style lang="less" scoped>
.search-result-container {
  padding-top: 46px;
}
</style>
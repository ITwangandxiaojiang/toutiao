<template>
  <div>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh" :disabled="finished">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" :immediate-check="false">
        <art-item v-for="item in artList" :key="item.art_id" :article="item" @remove-article="removeArticle"></art-item>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArtListAPI } from '@/api/homeAPI'
import ArtItem from '@/components/ArtItem/ArtItem.vue'
export default {
  // 大驼峰命名法：每个单词的首字母大写
  name: 'ArtList',
  data() {
    return {
      artList: [],
      timestamp: Date.now(),
      loading: false,
      finished: false,
      isLoading: false
    }
  },
  props: {
    channelId: {
      type: Number,
      required: true
    }
  },
  components: {
    ArtItem,
  },
  methods: {
    async initArtList(isRefresh) {
      const { data: res } = await getArtListAPI(this.channelId, this.timestamp);
      if (res.message === "OK") {
        this.timestamp = res.data.pre_timestamp
        if (isRefresh) {
          this.artList = [...res.data.results, ...this.artList]
          this.isLoading = false
        } else {
          this.artList = [...this.artList, ...res.data.results]
          this.loading = false
        }
        if (res.data.pre_timestamp === null) {
          this.finished = true
        }
      }
    },
    onLoad() {
      this.initArtList()
    },
    onRefresh() {
      this.initArtList(true)
    },
    removeArticle(id) {
      // 对原数组进行 filter 方法的过滤
      this.artList = this.artList.filter(item => item.art_id.toString() !== id)
      if (this.artList.length < 10) {
        // 主动请求下一页的数据
        this.initArtList()
      }
    }
  },
  created() {
    this.initArtList()
  }
}
</script>

<style lang="less" scoped>
</style>
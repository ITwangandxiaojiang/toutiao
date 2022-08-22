<template>
  <div>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh" :disabled="finished">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" :immediate-check="false">
        <art-item v-for="item in artList" :key="item.art_id" :article="item"></art-item>
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
    }
  },
  created() {
    this.initArtList()
  }
}
</script>

<style lang="less" scoped>
</style>
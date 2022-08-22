<template>
  <div class="home-container">
    <van-nav-bar fixed>
      <template #left>
        <img src="../../assets/toutiao_logo.4653c8be.png" alt="logo" class="logo" >
      </template>
      <template #right>
        <van-icon name="search" color="white" size="18" />
      </template>
    </van-nav-bar>
    <van-tabs v-model="active" sticky offset-top='1.22666667rem'>
      <van-tab v-for="item in  userChannel" :key="item.id" :title="item.name">
      <art-list :channel-id="item.id"></art-list>
      </van-tab>
    </van-tabs>
    <!-- 频道列表的标签页 -->
    <van-tabs v-model="active" sticky offset-top="1.22666667rem"></van-tabs>

    <!-- 频道管理的小图标 -->
    <van-icon name="plus" size="16" class="plus" />
  </div>
</template>

<script>
import { getUserChannelAPI } from '@/api/homeAPI'
import ArtList from '@/components/ArtList/ArtList.vue'
export default {
  name: 'Home',
  data() {
    return {
      active: 0,
      userChannel: []
    }
  },
  components:{
    ArtList
  },
  methods: {
    async initUserChannel() {
      const { data: res } = await getUserChannelAPI();
      if (res.message === 'OK') {
        this.userChannel = res.data.channels
      }
    }
  },
  created() {
    this.initUserChannel();
  }
}
</script>

<style lang="less" scoped>
.home-container {
  padding-top: 46px;
  padding-bottom: 50px;
}

// logo 样式
.logo {
  height: 80%;
}

// 为 tabs 容器设置右 padding
/deep/ .van-tabs__wrap {
  padding-right: 36px;
  background-color: white;
}

// 频道管理小图标的定位
.plus {
  position: fixed;
  top: 58px;
  right: 10px;
  z-index: 999;
}
</style>
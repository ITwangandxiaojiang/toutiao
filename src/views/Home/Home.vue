<template>
  <div class="home-container">
    <van-nav-bar fixed>
      <template #left>
        <img src="../../assets/toutiao_logo.4653c8be.png" alt="logo" class="logo">
      </template>
      <template #right>
        <van-icon name="search" color="white" size="18" @click="$router.push('/search')"/>
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
    <van-icon name="plus" size="16" class="plus" @click="show = true" />
    <!-- 频道管理的弹出层 -->
    <van-popup v-model="show" :close-on-click-overlay="false" @closed="isDel = false">
      <div class="popup-container">

        <!-- 弹出层的头部区域 -->
        <van-nav-bar title="频道管理">
          <template #right>
            <van-icon name="cross" size="14" color="white" @click="show = false" />
          </template>
        </van-nav-bar>

        <!-- 弹出层的主体区域 -->
        <div class="pop-body">
          <!-- 我的频道 -->
          <div class="my-channel-box">
            <div class="channel-title">
              <div>
                <span class="title-bold">已添加频道：</span>
                <span class="title-gray">{{ isDel ? '点击移除频道' : '点击进入频道' }}</span>
              </div>
              <span class="btn-edit" @click="isDel = !isDel">{{ isDel ? '完成' : '编辑' }}</span>
            </div>
            <!-- 我的频道列表 -->
            <van-row type="flex">
              <van-col span="6" v-for="(item, index) in userChannel" :key="item.id">
                <!-- 用户的频道 Item 项 -->
                <div class="channel-item van-hairline--surround" @click="onUserChannelClick(item, index)">{{ item.name }}
                  <van-badge color="transparent" class="cross-badge"
                    v-if="isDel && item.name !== '推荐' && userChannel.length > 2">
                    <template #content>
                      <van-icon name="cross" class="badge-icon" color="#cfcfcf" size="12" />
                    </template>
                  </van-badge>
                </div>
              </van-col>
            </van-row>
          </div>

          <!-- 分隔线 -->
          <div class="van-hairline--top sp-line"></div>

          <!-- 更多频道 -->
          <div class="more-channel-box">
            <div class="channel-title">
              <div>
                <span class="title-bold">可添加频道：</span>
                <span class="title-gray">点击添加频道</span>
              </div>
            </div>
            <!-- 更多频道列表 -->
            <van-row type="flex">
              <van-col span="6" v-for="item in moreChannels" :key="item.id">
                <div class="channel-item van-hairline--surround" @click="addChannel(item)">{{ item.name }}</div>
              </van-col>
            </van-row>
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { getUserChannelAPI, getAllChannelAPI, updateUserChannelAPI } from '@/api/homeAPI'
import ArtList from '@/components/ArtList/ArtList.vue'
export default {
  name: 'Home',
  data() {
    return {
      active: 0,
      userChannel: [],
      show: false,
      allChannel: [],
      isDel: false
    }
  },
  components: {
    ArtList
  },
  methods: {
    async initUserChannel() {
      const { data: res } = await getUserChannelAPI();
      if (res.message === 'OK') {
        this.userChannel = res.data.channels
      }
    },
    async initAllChannel() {
      const { data: res } = await getAllChannelAPI()
      if (res.message === 'OK') {
        // 将请求到的数据，转存到 allChannel 中
        this.allChannel = res.data.channels
      }
    },
    addChannel(item) {
      //将用户点击的频道,添加到用户频道列表中
      this.userChannel.push(item)
      // 调用 updateChannel 方法，把最新的频道列表数据提交到后端保存
      this.updateChannel()
    },
    async updateChannel(item) {
      const channels = this.userChannel.filter(item => item.name !== '推荐').map((item, index) => { return { id: item.id, seq: index + 1 } })
      const { data: res } = await updateUserChannelAPI(channels)
      if (res.message === 'OK') {
        // TODO:提示用户更新成功
        this.$notify({ type: 'success', message: '更新成功', duration: 1000 })
      }
    },
    onUserChannelClick(channel,index) {
      if (this.isDel) {
        //处于删除状态
        if (channel.name === '推荐' || this.userChannel.length === 2) return
        this.userChannel = this.userChannel.filter(item => item.id !== channel.id)
        this.updateChannel();
      } else {
        //不处于删除状态
        this.active = index
        this.show = false
      }
    }
  },
  created() {
    // 请求用户的频道列表数据
    this.initUserChannel();
    // 请求所有的频道列表数据
    this.initAllChannel()
  },
  computed: {
    moreChannels() {
      // 1. 对数组进行 filter 过滤，返回的是符合条件的新数组
      return this.allChannel.filter(item => {
        // 判断当前循环项，是否在 “我的频道” 列表之中
        const index = this.userChannel.findIndex(x => x.id === item.id)
        // 如果不在，则 return true，表示需要把这一项存储到返回的新数组之中
        if (index === -1) return true
      })
    }
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

.van-popup,
.popup-container {
  background-color: transparent;
  height: 100%;
  width: 100%;
}

.popup-container {
  display: flex;
  flex-direction: column;
}

.pop-body {
  flex: 1;
  overflow: scroll;
  padding: 8px;
  background-color: white;
}

.my-channel-box,
.more-channel-box {
  .channel-title {
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    line-height: 28px;
    padding: 0 6px;

    .title-bold {
      font-weight: bold;
    }

    .title-gray {
      color: gray;
      font-size: 12px;
    }
  }
}

.btn-edit {
  border: 1px solid #a3a2a2;
  padding: 0 10px;
  line-height: 20px;
  height: 20px;
  border-radius: 6px;
  font-size: 12px;
}

.channel-item {
  font-size: 12px;
  text-align: center;
  line-height: 36px;
  background-color: #fafafa;
  margin: 6px;
}

.cross-badge {
  position: absolute;
  right: -3px;
  top: 0;
  border: none;
}

.sp-line {
  margin: 10px 0 20px 0;
}
</style>
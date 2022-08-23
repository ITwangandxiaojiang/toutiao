<template>
  <div  @click="$router.push('/article/' + artId)">
    <van-cell>
      <!-- 标题区域的插槽 -->
      <template #title>
        <div class="title-box">
          <!-- 标题 -->
          <span>{{ article.title }}</span>
          <!-- 单张图片 -->
          <img alt="" class="thumb" v-if="article.cover.type === 1" v-lazy="article.cover.images[0]">
        </div>
        <!-- 三张图片 -->
        <div class="thumb-box" v-if="article.cover.type === 3">
          <img alt="" class="thumb" v-for="(item, index) in article.cover.images" :key="index" v-lazy="item">
        </div>
      </template>
      <!-- label 区域的插槽 -->
      <template #label>
        <div class="label-box">
          <span>{{ article.aut_name }} &nbsp;&nbsp; {{ article.comm_count }}评论 &nbsp;&nbsp; {{ article.pubdate |
              dataFormat
          }}</span>
          <!-- 关闭按钮 -->
          <van-icon name="cross" />
        </div>
      </template>
    </van-cell>
    <van-action-sheet v-model="show" cancel-text="取消" :closeable="false" @closed="isFirst = true" get-container="body">
      <!-- 第一级反馈面板 -->
      <div v-if="isFirst">
        <!-- 循环渲染可选项 -->
        <van-cell :title="item.name" clickable class="center-title" v-for="item in actions" :key="item.name"
          @click="onCellClick(item.name)" />
      </div>
      <!-- 第二级反馈面板 -->
      <div v-else>
        <van-cell title="返回" clickable title-class="center-title" @click="isFirst = true" />
        <van-cell :title="item.label" clickable title-class="center-title" v-for="item in reports" :key="item.type"
          @click="reportArticle(item.type)" />
      </div>
    </van-action-sheet>
    <!-- 关闭按钮 -->
    <van-icon name="cross" @click.stop="show = true"  v-if="closable"/>
  </div>
</template>

<script>
import reports from '@/api/reports'
import { dislikeArticleAPI,reportArticleAPI } from '@/api/homeAPI.js'
export default {
  name: 'ArtItem',
  data() {
    return {
      show: false,
      actions: [
        { name: '不感兴趣' },
        { name: '反馈垃圾内容' },
        { name: '拉黑作者' }
      ],
      isFirst: true,
      reports
    }
  },
  props: {
    article: {
      type: Object,
      required: true
    },
    closable:{
      type:Boolean,
      default:true
    }
  },
  computed: {
    artId() {
      return this.article.art_id.toString()
    }
  },
  methods: {
    async onCellClick(name) {
      if (name === '不感兴趣') {
        const { data: res } = await dislikeArticleAPI(this.artId)
        if (res.message === 'OK') {
          this.$emit('remove-article', this.artId)
        }
        this.show = false
      } else if (name === '拉黑作者') {
        console.log('拉黑作者');
        this.show = false;
      } else if (name === '反馈垃圾内容') {
        this.isFirst = false
      }
    },
    async reportArticle(type) {
      // 1. 发起举报文章的请求
      const { data: res } = await reportArticleAPI(this.artId, type)
      if (res.message === 'OK') {
        // 2. 炸楼操作，触发自定义事件，把文章 Id 发送给父组件
        this.$emit('remove-article', this.artId)
      }
      // 3. 关闭动作面板
      this.show = false
    }
  }
}
</script>

<style lang="less" scoped>
.label-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.thumb {
  // 矩形黄金比例：0.618
  width: 113px;
  height: 70px;
  background-color: #f8f8f8;
  object-fit: cover;
}

.title-box {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.thumb-box {
  display: flex;
  justify-content: space-between;
}

.center-title {
  text-align: center;
}
</style>
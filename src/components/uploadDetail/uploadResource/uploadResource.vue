<template>
  <div class="resource-wrapper">
    <div class="editor-wrapper" v-if="isEditorShow">
      <div>
        <label>文件名</label>
        <input type="text" placeholder="请输入文件名" v-model="tempFile.name">
      </div>
      <div>
        <div>上传文件</div>
        <div>已上传文件</div>
      </div>
      <div>
        <label>文件描述</label>
        <input type="text" placeholder="请输入文件描述" v-model="tempFile.description">
      </div>
      <div>
        <span @click="saveFile">保存</span>
        <span @click="cancelFile">取消</span>
      </div>
    </div>
    <div>
      <span>文件名</span>
      <span>文件大小</span>
      <span>文件描述</span>
      <span>上传时间</span>
      <span @click="editFile(-1)">添加新文件</span>
    </div>
    <div v-for="(item,index) in course.resources" :key="index">
      <span>{{item.name}}</span>
      <span>{{item.size}}</span>
      <span>{{item.description}}</span>
      <span>{{item.uploadTime}}</span>
      <span @click="deleteFile(index)">删除</span>
      <span @click="editFile(index)">编辑</span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'uploadResource',
    props: {
      course: null
    },
    data () {
      return {
        tempFile: null,
        isEditorShow: false,
        currentIndex: null
      }
    },
    methods: {
      deleteFile (index) {
        this.course.resources.splice(index, 1)
        this.$emit('saveInfo', this.course)
      },
      hideShadow () {
        this.$emit('hideShadow')
      },
      showShadow () {
        this.$emit('showShadow')
      },
      editFile (index) {
        this.currentIndex = index
        // 编辑当前已有文件
        if (index !== -1) {
          this.tempFile = Object.assign({}, this.course.resources[index])
        } else {
          // 添加新文件
          this.tempFile = {
            id: null,
            name: null,
            url: null,
            description: null,
            uploadTime: null,
            size: null
          }
        }
        this.isEditorShow = true
        this.showShadow()
      },
      saveFile () {
        if (this.currentIndex !== -1) {
          this.course.resources[this.currentIndex] = this.tempFile
        } else {
          // 上传后台 返回文件对象
          this.tempFile.url = '文件地址'
          this.tempFile.id = 1
          this.tempFile.uploadTime = '2019-3-27'
          this.tempFile.size = '50M'
          if (!this.tempFile.name) this.tempFile.name = ''
          if (!this.tempFile.description) this.tempFile.description = ''
          this.course.resources.push(this.tempFile)
        }
        this.$emit('saveInfo', this.course)
        this.hideShadow()
        this.isEditorShow = false
      },
      cancelFile () {
        this.hideShadow()
        this.isEditorShow = false
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .resource-wrapper
    .editor-wrapper
      width 400px
      height 400px
      position absolute
      top 0
      bottom 0
      right 0
      left 0
      margin auto
      background white
      z-index 99

</style>

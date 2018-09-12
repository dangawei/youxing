<template>
    <div>
      <quill-editor
            v-model="content"
            class="editer"
            :options="editorOption"
            @change="onEditorChange($event)"
            style="background:#fff"
           >
      </quill-editor>
   </div>
   <!-- @ready="onEditorReady($event)"
            @blur="onEditorBlur($event)"
            @focus="onEditorFocus($event)" -->
</template>
<style scoped="" lang="less">
  .quill-editor {
    height: 445px;
    background: #fff;
    .ql-container {
       background: #fff!important;
    }
  }
</style>
<script>
    // require styles
    import 'quill/dist/quill.core.css'
    import 'quill/dist/quill.snow.css'
    import 'quill/dist/quill.bubble.css'
    import {quillRedefine} from 'vue-quill-editor-upload'
    import { quillEditor } from 'vue-quill-editor' //调用编辑器
    export default {
        props: ['UE_editdata'],
        data () {
            return {
              content:"",
              editorOption:{}
            }
        },
        components: {
           quillEditor
        },
        created () {
          this.editorOption = quillRedefine(
            {
              // 图片上传的设置
              uploadConfig: {
                action: this.$webcommon+"/pic/upload/",  // 必填参数 图片上传地址
                // 必选参数  res是一个函数，函数接收的response为上传成功时服务器返回的数据
                // 你必须把返回的数据中所包含的图片地址 return 回去
                res: (respnse) => {                 
                  return respnse.resData
                },
                name: 'mainpic'  // 图片上传参数名
              }
            }
          )
          //$("#ql-editor").append('<p><img src="'+this.editorOption+'"</p>')
          this.content = this.contents
       },
        mounted() {
          //do something after mounting vue instance
          this.content = this.UE_editdata
        },
        computed: {
           editor() {
             return this.$refs.myQuillEditor.quill
            }
        },
        methods: {
            onEditorBlur(quill) {
              // console.log('editor blur!', quill)
              this.$emit('UE_data',quill)
            },
            onEditorFocus(quill) {
              // console.log('editor focus!', quill)
              this.$emit('UE_data',quill)
            },
            onEditorReady(quill) {
              // console.log('editor ready!', quill)
              this.$emit('UE_data',quill)
            },
            onEditorChange({ quill, html, text }) {
              this.$emit('UE_data',html)
              // console.log('editor change!', quill, html, text)
              this.content = html
            }
        }
    }
</script>

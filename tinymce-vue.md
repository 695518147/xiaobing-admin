###安装
npm install tinymce  
npm install @tinymce/tinymce-vue  

import tinymce from 'tinymce/tinymce'  
import Editor from '@tinymce/tinymce-vue'   

一些常用的配置属性   

  browser_spellcheck: true, // 拼写检查  
  branding: false, // 去水印  
  elementpath: false,  //禁用编辑器底部的状态栏  
  statusbar: false, // 隐藏编辑器底部的状态栏  
  paste_data_images: true, // 允许粘贴图像  
  menubar: false, // 隐藏最上方menu  
plugins  

使用某个插件需要先引入这个插件，例：  

import 'tinymce/plugins/fullscreen'  
import 'tinymce/plugins/preview'  

plugins: 'fullscreen preview'  
toolbar  

可以使用“|”给工具栏分组，把某一类功能划分成一组，例：  

toolbar: 'bold italic underline | alignleft aligncenter alignright'

将语言改为中文

步骤：

在官网下载语言包https://www.tiny.cloud/get-tiny/language-packages/
把下载的语言包放到之前新建的tinymce文件夹里
初始化时添加以下代码
      language_url: `/tinymce/langs/zh_CN.js`,
      language: 'zh_CN',
在tinymce5工具栏添加自定义功能按钮

this.tinymceInit = {
...
toolbar: 'imageUpload',
  setup: (editor) => {
    editor.ui.registry.addButton('imageUpload', {
      tooltip: '插入图片',
      icon: 'image',
      onAction: () => {

      }
    })
  }
}
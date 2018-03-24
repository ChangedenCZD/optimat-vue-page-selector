# 基于Vuejs+Webpack定义了开发规范的网页开发框架的分页选择器
## 使用方式（Usage）
### 安装（Install）
``
npm install optimat-vue-page-selector -save
``

### 导入（Import）
#### *.js
```javascript
import DatePicker from 'optimat-vue-page-selector'
```
#### *.vue
```vue
<script>
    import DatePicker from 'optimat-vue-page-selector'
</script>
```
### 标签（Target）
#### *vue
```html
<PageSelector :options="pageSelectorOptions"></PageSelector>
```

### 功能（Api）

| Options         | Type     | Description                 | Default | Result   |
|-----------------|:--------:|:---------------------------:|:--------:|:--------:|
| options.total  | number | 最大页码（-1即无限大） | -1 | |
| options.current  | number | 当前页码 | 1 | |
| options.step  | number | 上页/下页步长 | 1 | |
| options.previewCount  | number | 预览页码数 | 0 | |
| options.style  | string | 选项样式，普通（simple），圆形（circle），方形（box） | simple | |
| options.isShowPageInput  | boolean | 是否显示跳转输入框 | false | |
| options.onPageChanged  | function | 上页/下页步长 | 1 | |
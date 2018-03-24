<template>
    <section class="component-layout ui-selector-page-layout">
        <ul class="selector-layout left">
            <li class="option-item step-operation" :class="[borderStyle]" v-if="isShowPrevious" @click="current-=step">
                <img :src="icons.left"/>
            </li>
            <li class="option-item" :class="[borderStyle,current===1?'current-preview-item':'']" @click="current=1">
                <span>1</span>
            </li>
            <li class="option-item step-operation" :class="[borderStyle]" v-if="isLeftOmit">
                <img :src="icons.omit"/>
            </li>
            <li class="option-item preview-item left-preview-item" :class="[borderStyle]"
                v-for="page in leftPreviewList"
                @click="current=page">
                <span>{{page}}</span>
            </li>
            <li class="option-item current-preview-item" :class="[borderStyle]" v-if="isShowCurrent">
                <span>{{current}}</span>
            </li>
            <li class="option-item preview-item right-preview-item" :class="[borderStyle]"
                v-for="page in rightPreviewList"
                @click="current=page">
                <span>{{page}}</span>
            </li>
            <li class="option-item step-operation" :class="[borderStyle]" v-if="isRightOmit">
                <img :src="icons.omit"/>
            </li>
            <li class="option-item" :class="[borderStyle,current===total?'current-preview-item':'']" v-if="isShowTotal"
                @click="current=total">
                <span>{{total}}</span>
            </li>
            <li class="option-item step-operation" :class="[borderStyle]" v-if="isShowNext" @click="current+=step">
                <img :src="icons.right"/>
            </li>
        </ul>
        <div class="page-input-layout right" v-if="isShowPageInput">
            <div class="page-input-area">
                <span>跳至</span>
                <input v-model="inputPage" @keyup.enter="current=parseInt(inputPage)"/>
                <span>页</span>
            </div>
        </div>
    </section>
</template>

<script>
    // import './component.scss';

    const Component = require('./component');
    export default new Component();
</script>

<style lang="scss" scoped="true">
    @import "./component.scss";
</style>

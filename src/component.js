import { BaseModule } from './lib/BaseModule';
import icons from './icons.json';
import defaultInfoConfig from './defaultInfoConfig';

const defaultCurrent = defaultInfoConfig.defaultCurrent;
const defaultStep = defaultInfoConfig.defaultStep;
const defaultPreview = defaultInfoConfig.defaultPreview;
const defaultTotal = defaultInfoConfig.defaultTotal;
const defaultStyle = defaultInfoConfig.defaultStyle;

class Component extends BaseModule {
    constructor () {
        super();
        this.setProps(['options']);
        this.setComponent({});
        this.setMethod({
            setOptions () {
                let options = this.options || {};
                this.total = options.total || defaultTotal;
                this.current = Math.max(defaultCurrent, options.current || defaultCurrent);
                this.step = options.step || defaultStep;
                this.onPageChanged = typeof options.onPageChanged === 'function' ? options.onPageChanged : null;
                this.isShowPageInput = options.isShowPageInput || false;
                this.previewCount = Math.max(defaultPreview, options.previewCount || defaultPreview);
                this.style = options.style || defaultStyle;
                this.recompute();
            },
            recompute () {
                let total = this.total;
                let previewCount = this.previewCount;
                let current = this.current;
                let leftPreviewList = [];
                let leftPreviewStart = Math.max(2, current - previewCount);
                for (let previewItem = leftPreviewStart; previewItem < current; previewItem++) {
                    leftPreviewList.push(previewItem);
                }
                let rightPreviewList = [];
                let maxPreview = current + previewCount + 1;
                let rightPreviewEnd = total > 0 ? Math.min(total, maxPreview) : maxPreview;
                for (let previewItem = current + 1; previewItem < rightPreviewEnd; previewItem++) {
                    rightPreviewList.push(previewItem);
                }
                this.leftPreviewList = leftPreviewList;
                this.rightPreviewList = rightPreviewList;
            }
        });
        this.setCompute({
            isSimple () {
                return this.style === 'simple';
            },
            isCircle () {
                return this.style === 'circle';
            },
            isBox () {
                return this.style === 'box';
            },
            isLeftOmit () {
                return !this.isNoMoreLeftOmit && (this.current - this.previewCount) > 1;
            },
            isRightOmit () {
                let total = this.total;
                return total < 0 || (!this.isNoMoreRightOmit && (this.current + this.previewCount) < total);
            },
            isNoMoreLeftOmit () {
                return this.current < 3;
            },
            isNoMoreRightOmit () {
                let rightPreviewList = this.rightPreviewList || [];
                let lastPreviewItem = rightPreviewList[rightPreviewList.length - 1] || this.current || 1;
                return (lastPreviewItem + 1) >= this.total;
            },
            isShowPrevious () {
                return this.current > 1;
            },
            isShowNext () {
                let total = this.total;
                return total < 0 || (this.current < total && !this.isNoMoreRightOmit);
            },
            isShowTotal () {
                return this.total > 1;
            },
            isShowCurrent () {
                let total = this.total;
                let current = this.current;
                return current > 1 && (current < total || total < 0);
            },
            borderStyle () {
                let style = '';
                if (this.isSimple) {
                    style = 'simple-border';
                } else if (this.isCircle) {
                    style = 'circle-border';
                } else if (this.isBox) {
                    style = 'box-border';
                }
                return style;
            }
        });
        this.setWatch({
            options () {
                this.setOptions();
            },
            current (value) {
                value = Math.max(1, value);
                let total = this.total;
                if (total > 0) {
                    value = Math.min(total, value);
                }
                if (this.current === value) {
                    this.recompute();
                    this.inputPage = value;
                    this.onPageChanged && this.onPageChanged(value);
                } else {
                    this.current = value;
                }
            }
        });
    }

    getData () {
        return {
            icons,
            current: defaultCurrent,
            leftPreviewList: [],
            rightPreviewList: [],
            inputPage: defaultCurrent
        };
    }

    onCreate () {
        this.app.setOptions();
    }

    onMount () {
    }
}

module.exports = Component;

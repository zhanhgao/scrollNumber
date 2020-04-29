/**
 *  使用方法
 * dom         <p data-ride="numberGrow" data-value="8711.11" data-time="1" data-digit="2">0</p>
 * data-ride   必填
 * data-value  最终数值
 * data-time   持续时间
 * data-digit  保留小数
 * 0           起始数值
 * */

// 数字增长
function NumberGrow(element, options) {
    options = options || {};

    var _node = element,
        time = options.time || _node.dataset.time, //总时间
        num = options.num || _node.dataset.value, //要显示的真实数值
        digit = options.digit || _node.dataset.digit, //小数点后几位增长
        step = num * 16 / (time * 1000), //每16ms增加的数值
        start = 0, //计数器
        interval, //定时器
        old = 0;

    //每帧不能超过16ms，所以理想的interval间隔为16ms
    //step为每16ms增加的数值

    interval = setInterval(function () {
        start = start + step;
        if (start >= num) {
            clearInterval(interval);
            interval = undefined;
            start = num;
        }

        var t, __time;
        if (digit) {
            __time = Math.pow(10, digit);
            t = Math.floor(start * __time) / __time;
        } else {
            t = Math.floor(start);
        }

        if (t == old) {
            return;
        }

        old = t;
        _node.textContent = old;
    }, 16);
}
// 初始化
function init() {
    //将每个自动注册的组件的逻辑添加到scrollLazy来管理
    var nodeList = document.querySelectorAll('[data-ride="numberGrow"]');
    for (i = 0; i < nodeList.length; i++) {
        (function () {
            var _this = nodeList[i];
            new NumberGrow(_this);
        })(i)
    }
}

// 初始化
init();
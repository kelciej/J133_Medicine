/**
 * Created by apple on 16/4/10.
 */
;(function ($) {
    $.fn.bindCheckboxSwitch = function (options) {

        var settings = {
            className: 'on',
            onclick: null,
            checkbox_checked_fn: function (obj) {
                obj.parent().addClass(settings.className);
            },
            checkbox_nochecked_fn: function (obj) {
                obj.parent().removeClass(settings.className);
            },
            radio_checked_fn: function (obj) {
                obj.parent().addClass(settings.className);
            },
            radio_nochecked_fn: function (obj) {
                obj.parent().removeClass(settings.className);
            }
        };

        $.extend(true, settings, options);

        //input判断执行
        function inputJudge_fn(obj_this) {
            var $this = obj_this,
                $type;
            if ($this.attr('type') != undefined) {
                $type = $this.attr('type');
                if ($type == 'checkbox') {//if=多选按钮
                    if ($this.prop("checked")) {
                        settings.checkbox_checked_fn($this);
                    } else {
                        settings.checkbox_nochecked_fn($this);
                    }
                } else if ($type == 'radio') {//if=单选按钮
                    var $thisName;
                    if ($this.attr('name') != undefined) {
                        $thisName = $this.attr('name');
                        if ($this.prop("checked")) {
                            settings.radio_checked_fn($this);
                            $("input[name='" + $thisName + "']").not($this).each(function () {
                                settings.radio_nochecked_fn($(this));
                            });
                        } else {
                            settings.radio_nochecked_fn($this);
                        }
                    }
                }
            }
        }
        return this.each(function () {
            inputJudge_fn($(this));
        }).click(function () {
            inputJudge_fn($(this));
            if (settings.onclick) {
                settings.onclick(this, {
                    isChecked: $(this).prop("checked"),//返回是否选中
                    objThis: $(this)//返回自己
                });
            }
        });
    };
})(jQuery);
//select按钮的模拟
(function ($) {
    $.fn.bindSelectSimulate = function (options) {
        var settings = {//默认参数
            onclick: null,
            action_fn: function (obj, text) {
                obj.siblings().html(text);
            }
        };
        $.extend(true, settings, options);

        //切换函数
        function selectAction_fn(object_this) {
            var $text = object_this.find("option:selected").text();
            settings.action_fn(object_this, $text);
        }
        return this.each(function () {
            selectAction_fn($(this));
        }).change(function () {
            selectAction_fn($(this));
            if (settings.onclick) {
                settings.onclick(this, {
                    objThis: $(this),//返回自己
                    objName: $(this).attr('name'),//返回name
                    objVal: $(this).find("option:selected").attr('value'),//返回val
                    objText: $(this).find("option:selected").text()//返回text
                });
            }
        });
    };
})(jQuery);


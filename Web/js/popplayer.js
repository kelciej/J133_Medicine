//弹出层样式
/***
 idname:需要作为弹出层目标元素id
 closename:关闭按钮的id
 showtype:用于做判断生成最外层遮罩层，默认传1
 ***/
function popShow(idname, closename, showtype) {
    var isIE = (document.all) ? true : false;
    var isIE6 = isIE && (navigator.userAgent.indexOf('MSIE 6.0') != -1);
    var newbox = document.getElementById(idname);

    newbox.style.zIndex = "99999";
    newbox.style.display = "block"
    newbox.style.position = !isIE6 ? "fixed" : "absolute";
    newbox.style.top = newbox.style.left = "50%";
    newbox.style.marginTop = -newbox.offsetHeight / 2 + "px";
    newbox.style.marginLeft = -newbox.offsetWidth / 2 + "px";
    if (showtype) {
        if (document.getElementById("layer") == undefined) {
            var layer = document.createElement("div");
            layer.id = "layer";
            layer.style.width = layer.style.height = "100%";
            layer.style.position = !isIE6 ? "fixed" : "absolute";
            layer.style.top = layer.style.left = 0;
            layer.style.backgroundColor = "#000";
            layer.style.zIndex = "99998";
            layer.style.opacity = "0.4";
            document.body.appendChild(layer);
        }
        else { layer = document.getElementById("layer"); layer.style.display = "block"; }
    }

    function layer_iestyle() {
        layer.style.width = Math.max(document.documentElement.scrollWidth, document.documentElement.clientWidth)
        + "px";
        layer.style.height = $(document).height();
    }
    function newbox_iestyle() {
        newbox.style.marginTop = document.documentElement.scrollTop - newbox.offsetHeight / 2 + "px";
        newbox.style.marginLeft = document.documentElement.scrollLeft - newbox.offsetWidth / 2 + "px";
    }
    if (isIE) { layer.style.filter = "alpha(opacity=40)"; }
    if (isIE6) {
        if (showtype) { layer_iestyle(); }
        newbox_iestyle();
        window.attachEvent("onscroll", function () {
            newbox_iestyle();
        })
        window.attachEvent("onresize", layer_iestyle)
    }
    if (closename != 0) {
        var closebtn = document.getElementById(closename);
        closebtn.onclick = function () {
            newbox.style.display = "none"; if (showtype) { layer.style.display = "none" };
        }
    }

}
//关闭弹出层样式
function popClose(showname, showtype) {
    document.getElementById(showname).style.display = "none";
    if (showtype) { document.getElementById("layer").style.display = "none"; }
}
//confirmPop,str:提示语，btnRinghtClick：确定按钮点击事件
function confirmPop(str, btnRinghtClick) {
    str = '<span class="err_icon01">' + str + '</span>';
    $('#kad-delete-pop .pop-txt').html(str);
    $('#kad-delete-pop .pop-btn-right').unbind('click');
    if ($('#kad-delete-pop').find('.pop-btn-cancel').length == 0) {
        $('#kad-delete-pop .pop-btn-right').before('<a href="javascript:void(0);" class="pop-btn-cancel" id="pop-btn-cancel" onclick="popClose(\'kad-delete-pop\', 1);"></a>');
    }
    $('.pop-btn-right').unbind('click.ok').bind('click.ok', btnRinghtClick);
    popShow('kad-delete-pop', 'kad-delte-closeBtn', 1);
}
//alertPop,str:提示语，btnRinghtClick：确定按钮点击事件,iconType(默认1):1:感叹号！,2:打勾,3:打叉
function alertPop(str, btnRinghtClick, iconType) {
    if (iconType == 1) {
        str = '<span class="err_icon01">' + str + '</span>';
    }
    else if (iconType == 2) {
        str = '<span class="err_icon02">' + str + '</span>';
    }
    else if (iconType == 3) {
        str = '<span class="err_icon03">' + str + '</span>';
    }
    else {
        str = '<span class="err_icon01">' + str + '</span>';
    }
    $('#kad-delete-pop .pop-txt').html(str);
    $('#kad-delete-pop .pop-btn-right').unbind('click');
    if ($('#kad-delete-pop').find('.pop-btn-cancel').length > 0) {
        $('#kad-delete-pop .pop-btn-cancel').remove();
    }
    if (btnRinghtClick != null && btnRinghtClick!=undefined) {
        $('.pop-btn-right').unbind('click.ok').bind('click.ok', btnRinghtClick);
        $('.kad-delte-closeBtn').unbind('click.ok').bind('click.ok', btnRinghtClick);
    }
    popShow('kad-delete-pop', 'kad-delte-closeBtn', 1);
}

function alertWarn(str, btnRinghtClick)
{
    alertPop(str, btnRinghtClick, 1);
}

function alertError(str, btnRinghtClick)
{
    alertPop(str, btnRinghtClick, 3);
}

function alertSuccess(str, btnRinghtClick) {
    alertPop(str, btnRinghtClick, 2);
}/**
 * Created by apple on 16/4/10.
 */

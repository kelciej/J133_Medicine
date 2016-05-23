/**
 * Created by apple on 16/4/10.
 */
function Suggest() {
    this.objParent = null;
    this.delaySec = 100;
    this.cursor = - 1;
    this.objAjax = null;
    this.layerWidth = 300;
    this.result = 0;
    this.taskID = null;
    this.keyword = null;
    this.startIndex = 0;
    this.oriInputText = "";
}
var sug = new Suggest();
var keyword;
var mydivId;
var re = /<(.[^>]*)>/g;
var regValue = /^[^@@\/\'\\\"#$%&\^\*\、\{\}\[\]\【\】\。\，\｛\｝\：\；\+\/\·\！\（\）\￥\……\——\<\>\《\》\？\～\`\=\,\.\?\;\:\‘\“\'\"\;\”\_\~\!\(\)\|\｜]+$/;
function SearchText(obj, divId) {

    mydivId = divId;
    keyword = SearchValue;
    var txtKey = obj.value;
    sug.objParent = obj;
    sug.CreateElement(obj);
    var inputText = txtKey.replace(/^(\s|\xA0)+|(\s|\xA0)+$/g, "");

    if (sug.oriInputText === inputText) {
        return false;
    } else {
        sug.oriInputText = inputText;
    }
    if (inputText != "" && keyword != inputText && regValue.test(inputText)) {
        keyword = inputText;
        DataSource(inputText);
    } else
    {
        $("#findContent").hide();
    }

}
function DataSource(txtKey) {
    var searchHost = window.urlConfig.search || "http://search.360kad.com";
    $.ajax({
        type: "GET",
        url: searchHost + "/Home/SearchPanGuWordResult?KeyWord=" + encodeURIComponent(txtKey),
        contentType: "application/json; charset=utf-8",
        dataType: "jsonp",
        jsonp: "callback",
        success: function (data) {
            if (data != null) {
                var source = eval(data);
                sug.SearchResult(txtKey, source);
            }

        }
    });
}

Suggest.prototype.SearchResult = function (txt, result) {
    if (document.getElementById("findContent")) {
        if (result) {
            $(".search_history").hide();
            this.FillResult(result);

        } else {
            $(".search_history").show();
            this.Hidden();
        }
    } else {
        alert("未找到容器!");
    }
}
Suggest.prototype.FillResult = function (aryResult) {
    this.result = 0;
    var findList = document.getElementById("findList");
    var findListArray = findList.getElementsByTagName("li");
    if (findListArray.length > 0) {
        for (var i = findListArray.length - 1; i >= 0; i--) {
            findList.removeChild(findListArray[i]);
        }
    }

    $(document).ready(function () {
        $("#txtSearchbox1 #findContent").hover(function () {
            $(this).show();
        }, function () {
            $(this).hide();
        });
    });
    this.result = aryResult.length;
    if (this.result > 0) {
        document.getElementById("findContent").style.display = "block";
    } else {
        document.getElementById("findContent").style.display = "none";
    }
    for (var i = 0; i < this.result; i++) {
        var This = this;
        var findLI = document.createElement("li");
        findLI.id = "li" + i;
        findLI.cursor = i;
        findLI.className = "sealist";
        findLI.style.color = "black";
        findLI.style.cursor = "pointer";
        findLI.style.fontSize = "12px";
        findLI.style.lineHeight = "22px";
        findLI.style.height = "22px";
        findLI.style.padding = "0px 6px 0px 6px";
        //   findLI.style.width = "456px";
        //if (screen.width > 1200) { findLI.style.width = "456px"; }
        findLI.onclick = function () {
            var txtSearch = $(this).find("span:eq(0)").text();
            This.cursor = this.cursor;
            This.AddToInput(txtSearch);
            var searchHost = window.urlConfig.search || "http://search.360kad.com";
            var Seaurl = searchHost + '/?type=1&pageText=' + encodeURIComponent(txtSearch);
            window.location.href = Seaurl;
        }; //改善搜索跳转
        findLI.onmouseover = function () {
            this.style.background = "#f9f5e2";
            This.cursor = this.cursor;
        };
        findLI.onmouseout = function () {
            this.style.background = "#fff";
            this.style.color = "black";
        };
        findList.appendChild(findLI);
        findLI.innerHTML = "<span>" + (aryResult[i].WordName || aryResult[i].KeyWord) + "</span>";
        findLI.innerHTML += "<span style=\"color:#999;float:right;\">约" + aryResult[i].ResultCount + "个商品</span>";
    }
    findList.style.height = (this.result > 10 ? 220 : 22 * this.result) + "px";

}
Suggest.prototype.CreateElement = function (objParent) {
    var This = this,
        $pageText = $('#pageText');
    if (!objParent) {
        alert("object not found!");
        return (false);
    }
    if (this.objParent && this.objParent != objParent) {
        this.Hidden();
    }
    this.objParent = objParent;
    this.objParent.onkeyup = function (event) {
        if ($("#pageText").val() == "") {
            $(".search_history").show();
        } else {
            $(".search_history").hide();
        }
        This.ReSearch(event);
    };
    $(this.objParent).on('focus', function (event) {
        var _pageText = $.trim($pageText.val());
        if ((!!_pageText) && (_pageText != SearchValue)) {
            $("#findContent").show();
            $(".search_history").hide();
        } else {
            $("#findContent").hide();
            $(".search_history").show();
        }
    });
    this.objParent.onkeydown = function (event) {
        This.MoveCursor(event);
    };
    this.layerWidth = this.objParent.offsetWidth;
    if (!document.getElementById("findContent")) {
        var findContent = document.createElement("div");
        findContent.id = "findContent";
        //findContent.style.width = (this.layerWidth - 2) + "px";
        findContent.style.width = "456px";
        //if (screen.width > 1200) { findContent.style.width = "456px"; }
        findContent.style.zIndex = parseInt(($(".kad-mc-ask").css("z-index") || 1)) + 1;
        findContent.style.position = "absolute";
        findContent.style.background = "#fff";
        findContent.style.border = "1px solid #999";
        findContent.style.display = "none";
        var findList = document.createElement("ul");
        findList.id = "findList";
        findList.style.width = "456px";
        //if (screen.width > 1200) { findList.style.width = "456px"; }
        findList.style.listStyle = "none";
        findList.style.margin = "0px 0px 0px 0px";
        findList.style.padding = "0px 0px 0px 0px";
        findList.style.textAlign = "left";
        findList.style.height = "220px";
        findList.style.overflowX = "hidden";
        findList.style.overflowY = "auto";
        findContent.appendChild(findList);
        document.getElementById(mydivId).appendChild(findContent);
        this.Position(findContent);
    } else {
        this.Position(document.getElementById("findContent"));
    }
    clearTimeout(this.taskID);
}

Suggest.prototype.Position = function (findContent) {
    var selectedPosX = 2;
    var selectedPosY = - 1;
    theElement = this.objParent;

    while (theElement != null) {
        selectedPosX += theElement.offsetLeft;
        selectedPosY += theElement.offsetTop;
        theElement = theElement.offsetParent;
    }
    findContent.style.left = "-1px";
    findContent.style.top = "32px";
}

Suggest.prototype.AddToInput = function (el) {
    this.objParent.value = el;
    this.Hidden();
}

Suggest.prototype.MoveCursor = function (event) {
    var e = event || window.event;
    //  if ($("#pageText").val() == "" || this.result < 1) { $(".search_history").show(); } else { $(".search_history").hide(); }
    switch (e.keyCode) {
        case 38:
            if (this.result > 0) {
                this.MoveToCurrent( - 1);
            }
            break;
        case 40:
            if (this.result > 0) {
                this.MoveToCurrent(1);
            }
            break;
        case 13:
            if (this.result > 0) {
                if (this.cursor < 0) {
                    this.CheckFormat();
                    this.Hidden();
                } else {
                    this.CheckFormat();
                }
                return (false);
            }
            break;
        case 27:
            this.Hidden();
            break;
        default:
            return (false);
            break;
    }
}

Suggest.prototype.ReSearch = function (event) {
    var e = event || window.event;
    if (e.keyCode == 38 || e.keyCode == 40) {
        return (false);
    }
    this.objParent = e.target || e.srcElement;
    this.cursor = - 1;
    if (this.objParent.value.replace(/(^\s*)|(\s*$)/g, "") != "") {
        SearchText(this.objParent);
    } else {
        this.Hidden();
    }
}


Suggest.prototype.MoveToCurrent = function (step) {
    var el1 = document.getElementById("li" + this.cursor);
    if (el1) {
        el1.style.background = "#fff";
        el1.style.color = "black";
    }
    this.cursor += step;
    if (this.cursor < 0) {
        this.cursor = 0;
    }
    if (this.cursor >= this.result) {
        this.cursor = this.result - 1;
    }
    var el2 = document.getElementById("li" + this.cursor);
    if (el2) {
        el2.style.background = "lightgreen";
        el2.style.color = "black";
    }
    this.startIndex += step;
    if (this.startIndex > 9) {
        this.startIndex = 9;
    }
    if (this.startIndex < 0) {
        this.startIndex = 0;
    }
    if (this.cursor > 9) {
        if (this.startIndex == 0) {
            document.getElementById("findList").scrollTop = (this.cursor) * 22;
        }
        if (this.startIndex == 9) {
            document.getElementById("findList").scrollTop = (this.cursor - 9) * 22;
        }
    } else {
        document.getElementById("findList").scrollTop = 0;
    }
}
Suggest.prototype.CheckFormat = function () {
    /*   if (!/[\W]/g.test(keyword)) {
     if (this.SelectedValue() == undefined) {
     this.AddToInput((this.SelectedFristValue().innerHTML).replace(re, ""));
     } else {
     this.AddToInput((this.SelectedValue().innerHTML).replace(re, ""));
     }
     }
     else {*/

    if ((this.SelectedValue() || "") != "") {
        keyword = $(this.SelectedValue()).find("span:eq(0)").text();
    } else {
        keyword = $("#pageText").val();
    }
    this.AddToInput(keyword.replace(re, ""));


    //   }
}

Suggest.prototype.SelectedValue = function () {
    return document.getElementById("findList").getElementsByTagName("li")[this.cursor];
}

Suggest.prototype.Hidden = function () {
    this.cursor = - 1;
    if (document.getElementById("findContent")) {
        document.getElementById("findContent").style.display = "none";
    }
}
Suggest.prototype.SelectedFristValue = function () {
    return document.getElementById("findList").getElementsByTagName("li")[0];
}

//关键字刷新自动变化
var SearchTxt = new Array('安神', '健脾益胃', '腹泻', '便秘', '手足癣', '维矿物质', '改善睡眠', '提高免疫', '多种维生素', '钙尔奇', '痛风', '跌打损伤', '鼻炎', '汤臣倍健', '冬虫夏草', '咽喉炎', '石斛', '枸杞', '同仁堂', '补气补血', '汇仁', '高血压'), SearchTxtId = Math.floor(Math.random() * SearchTxt.length), SearchValue = SearchTxt[SearchTxtId];
jQuery(document).ready(function () {

    $("#pageText").val(SearchValue).on("focus", function () {
        if (this.value == SearchValue) {
            this.value = "";
            this.style.color = "#333"
        }
    }).on("blur", function () {
        if (!this.value) {
            this.value = SearchValue;
            this.style.color = "#999";
        }
        setTimeout(function () {
            $('.search_history').hide();
        }, 200);
        setTimeout(function () {
            $('#findContent').hide();
        }, 200);
    });

    var $pageText = $('#pageText');
    $('#searchForm').submit(function () {
        var _pageText = $pageText.val(),
        // zh_arr = _pageText.replace(/[^\x00-\xff]/g, '**'),
            len = _pageText.length;
        if (len > 100) {
            $pageText.val(_pageText.slice(0, - (len - 100)));
        }
    });
});



//jQuery.cookie
jQuery.cookie = function(name, value, options) {
    if (typeof value != 'undefined') {
        options = options || {};
        if (value === null) {
            value = '';
            options.expires =- 1;
        }
        var expires = '';
        if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
            var date;
            if (typeof options.expires == 'number') {
                date = new Date();
                date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
            } else {
                date = options.expires;
            }
            expires = '; expires=' + date.toUTCString();
        }
        var path = options.path ? '; path=' + (options.path): '';
        var domain = options.domain ? '; domain=' + (options.domain): '';
        var secure = options.secure ? '; secure': '';
        document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
    } else {
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
};
//end jQuery.cookie
//cookie操作 2012-8-14
jQuery(document).ready(function() {
    if (jQuery(".topcollect").length == 1 && jQuery.cookie("topcollect") != 0) {
        jQuery(".topcollect").slideDown(300);
        jQuery("#nocollectkad").click(function() {
            jQuery(".topcollect").slideUp(250);
            jQuery.cookie("topcollect", "0", {
                expires: 7,
                domain: '360kad.com',
                path: '/'
            });
        });
    }
    $("#closecollect").click(function() {
        $("#topcollect").hide();
    }, function () {
        $("#topcollect").show();;
    });
    $(".topcollect").hover(function () {
        $(this).addClass("topcollecthover");
    }, function () {
        $(this).removeClass("topcollecthover");
    });
});

//start 历史记录展示
$(function () {
    getSeacHistlist();
    funHistory();
    $(".header_search .search_history").hover(function () {
        $(this).show();
    }, function () {
        $(this).hide();
    });
})
//获取搜索历史记录
function getSeacHistlist() {
    var hisSearchJson = "";
    if ($.cookie("newhisSearch") != null) {
        hisSearchJson = eval("(" + $.cookie("newhisSearch") + ")");
    }
    var hslist = "", titleStr = "", hrefUrl = "";
    if (hisSearchJson != "" && hisSearchJson != null) {
        $(".no_history").hide();
        for (var i = hisSearchJson.length - 1; i >= 0 ; i--) {
            titleStr = hisSearchJson[i].title;
            if (hisSearchJson[i].title.length > 13) {
                titleStr = hisSearchJson[i].title.substring(0, 13) + "...";
            }
            hrefUrl = urlConfig.search + "/?pageText=" + encodeURI(hisSearchJson[i].title);
            hslist = hslist + "<li><a href=\"" + hrefUrl + "\"  dir=\"" + hisSearchJson[i].title + "\">" + titleStr + "</a><span onclick=\"delOneSeacHislist('" + hisSearchJson[i].title + "')\">×</span></li>";
        }
        $("#his_clearAll").show();
        $("#s_historylist").html(hslist);
        funHistory();
    } else {
        $(".no_history").show();
    }

}
//onclick=\"delOneSeacHislist(\"" + hisSearchJson[i].title + "\")\"
//载入搜索最近浏览历史
function createHisSearch(pageText) {
    var searchTitle = pageText;

    var hisSearch = $.cookie("newhisSearch");

    var len = 0;
    if (hisSearch) {
        hisSearch = eval("(" + hisSearch + ")");
        len = hisSearch.length;
    }
    $(hisSearch).each(function (a, b) {
        if (this.title == searchTitle) {
            delOneSeacHislist(this.title);
            hisSearch = $.cookie("newhisSearch");
            if (hisSearch) {
                hisSearch = eval("(" + hisSearch + ")");
                len = hisSearch.length;
            }
        }
    });

    var json = "[";
    var start = 0;
    if (len > 9) {
        start = 1;
    }
    for (var i = start; i < len; i++) {
        /*新增start*/
        json = json + "{\"title\":\"" + hisSearch[i].title + "\"},";
        /*新增end*/
    }
    json = json + "{\"title\":\"" + searchTitle + "\"}]";

    $.cookie("newhisSearch", json, {
        expires: 1,
        domain: '360kad.com',
        path: '/'
    });
    // $.cookie('newhisSearch', json, { expires: 30 });

    getSeacHistlist();
}

//清除所有搜索记录
function delSeacHislist() {
    $.cookie('newhisSearch', null, {
        expires: 30,
        domain: '360kad.com',
        path: '/'
    });
    $("#s_historylist").html("");
    $(".no_history").show();
    $("#his_clearAll").hide();
}

//清除单条cookie
function delOneSeacHislist(str) {
    var hisJson = $.cookie("newhisSearch");
    var len = 0;
    if (hisJson) {
        hisJson = eval("(" + hisJson + ")");
        len = hisJson.length;
    }

    var hisNewJson = "[";
    var j = 0;
    if (hisJson != "" && hisJson != null) {
        for (var i = 0; i < len; i++) {
            if (hisJson[i].title != str) {
                j++;
                if (j == (len - 1)) {
                    hisNewJson = hisNewJson + "{\"title\":\"" + hisJson[i].title + "\"}]";
                } else {
                    hisNewJson = hisNewJson + "{\"title\":\"" + hisJson[i].title + "\"},";
                }
            }
        }
    }
    delSeacHislist();
    if (hisNewJson != "[" && len > 1) {
        //  $.cookie('newhisSearch', hisNewJson, { expires: 30 });
        $.cookie("newhisSearch", hisNewJson, {
            expires: 30,
            domain: '360kad.com',
            path: '/'
        });
        getSeacHistlist();
    }
}

function funHistory() {
    $("#s_historylist li").hover(function () {
        $(this).css("background-color", "#f9f5e2");
        $(this).children("span").show();
    }, function () {
        $(this).css("background-color", "#fff");
        $(this).children("span").hide();
    });
    $("#s_historylist li").click(function () {
        $("#pageText").val($(this).children("label").attr("dir"));

    });
}
//end 历史记录


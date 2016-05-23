/**
 * Created by apple on 16/5/2.
 */
// JavaScript Document

/*放大镜使用jqzoom*/
$(function () {
    $("#Product_BigImage").jqueryzoom({
        xzoom: 400,
        yzoom: 400,
        offset: 10,
        position: "right",
        preload: 1
    });
});

String.format = function () {
    if (arguments.length == 0)
        return null;
    var str = arguments[0];
    for (var i = 1; i < arguments.length; i++) {
        var re = new RegExp('\\{' + (i - 1) + '\\}', 'gm');
        str = str.replace(re, arguments[i]);
    }
    return str;
};

//统一接口
$(function () {
    GetSameProductByPassnum(passnum, _a); //规格 ok
    //ShowColorSpec();
    //详情页内容部分活动集合 end
    LinkTab(_a);
    if ($("#isSelfDownPc").val() == "true")
        return; //如果商品已经下架,不执行下面的所有逻辑
    if ($("#h_rxotc").val() == "True") {
        $("#proAvt").addClass("avtrx");
    }
    //GetProductPrice(_a, "ActivityMessage");//异步加载价格 ok
    var isSeckill = null;
    if (isSeckill == null) {
        isSeckill = getSeckill(_a);
        if (!isSeckill) {
            GetActivityConcessionPrice(_a, _c, 1, 0, "ActivityMessage") //异步加载促销价格
        }
    }
    Ytaocan(_a); //套餐 ok
    Druginfo(); //药品信息 ok
    //详情页内容部分活动集合 start
    /*avtYH(_a);
     avtMZ(_a);
     pkgDP(_a);
     pkgLoad(_a);*/

    YMaiZeng(_a) //买赠 ok
    LingQauan(_a); //免费领取优惠券   js接口有问题
    ActivityList(_a); //活动列表
    GetProductLimitCount(_a); //商品限购


    GetHaveCarGo(); //判断是否有货 ok
    $("#closethis3").click(function () {
        jQuery("#payshopcart").css("display", "none");
    }); //ok
    createCode() //验证码 ok
    HasCollect(); //判断是否收藏了该商品 ok
    //HideEmptyDiv();
    GetPromoteLab(_a); //加载详情页面的促销标签 促销标签获取注释掉2015年7月27日11:07:50
    SpecialProvision(_a);
    //微信包邮二维码
    if (_c < 39) {
        $("#show_V2code").show();
        $("#show_V2code").hover(function () {
            $("#show_V2code span").show();
        }, function () {
            $("#show_V2code span").hide();
        });
    }

});
var isSeckill = null;
//活动特供
function SpecialProvision(productid) {
    jQuery.ajax({
        type: "Get",
        cache: false,
        url: "/product/GetActivityStock?productid=" + productid,
        dataType: "json",
        json: "callback",
        success: function (data) {
            if (data.Code == 0) {
                var str = "<li class='tit'>" + data.Title + "</li><li>" + data.ActivityStockNum + "</li><li>" + data.LeftStockNum + "</li>";
                $('#tegongshow').html(str).show();
            } else {
                $('#tegongshow').hide();
            }
        }
    });
}
function GetPromoteLab(productid) {
    jQuery.ajax({
        type: "Get",
        cache: false,
        url: "/product/GetProductPromoLabel?productIds=" + productid,
        dataType: "jsonp",
        json: "callback",
        success: function (data) {
            for (var i = 0; i < data.length; i++) {
                var span = $("span[promotionsku='" + data[i].WareSkuCode + "']");
                if (data[i].PromoLabel > 0) {
                    span.attr("class", "Lpicico" + data[i].PromoLabel);
                }
            }
        }
    });
}







//function HideEmptyDiv() {
//    //人气推荐
//    if ($("#totsalelist").find("li").length == 0) {
//        $("#totsalelist").parent().attr("class", "");
//        $("#totsalelist").parent().hide();
//    }
//    //关注排行
//    if ($("#gzph").find("li").length == 0) {
//        $("#gzph").parent().attr("class", "");
//        $("#gzph").parent().hide();
//    }
//}



//左侧栏调用2014-8-26
jQuery(document).ready(function () {
    var goodsid = jQuery("#h_GoodsId").val()
    //GetHotSale();//人气推荐(废弃)
    SimilarEffect(_a); //相似功效
    //alsobuy(_d, 5); //购买过该商品的人还买了(废弃)
    GetSymptom(_a); //相关症状
    //ProductHistory();浏览历史
    SetProductHistory(_a);
});


function SetProductHistory(productId) {
    $.ajax({
        type: 'GET',
        url: window.urlConfig.multiDomain.pc() + '/Product/SaveProductHistory2',
        data: {
            id: productId
        },
        dataType: "jsonp",
        jsonp: "callback",
        success: function (data) {
            var b = JSON.stringify(data);
            $.cookie("KadProductHistory", b, {
                expires: 365,
                domain: '360kad.com',
                path: '/'
            });
            ProductHistory(); //浏览历史
        },
        error: function (data) {
            ProductHistory(); //浏览历史
        }
    });

}

$(document).ready(function () {
    var $icon1 = $(".rightSideicon .icon1");
    var $msg = $(".rightSideicon .msg");
    var $rightSide = $(".rightSideicon");
    $icon1.mouseenter(function (event) {
        var _this = $(this).index();
        $msg.eq(_this).show().siblings('.msg').hide();
    });
    $rightSide.mouseleave(function (event) {
        $msg.hide();
    });
});

//链接tab 函数
function LinkTab(id) {
    var _tabindex1 = 0;
    if (window.location.hash == "#Ytab?Txtlink=2") {
        location.href = '#Ytab';
        _tabindex1 = 2;
    }
    if (window.location.hash == "#Ytab?Txtlink=1") {
        location.href = '#Ytab';
        _tabindex1 = 1;
    }
    if (window.location.hash == "#Ytab?Txtlink=0") {
        location.href = '#Ytab';
        _tabindex1 = 0;
    }
    Ytabnum(_tabindex1)
}

//tab 函数
function Ytabnum(tabnum) {
    var _tabnum = tabnum
    $(".Ypro_deta .Ytab > li > a").removeClass('on');
    $(".Ypro_deta .Ytab > li > a").eq(_tabnum).addClass('on');
    $(".YpfnavC_tab li > a").removeClass('on');
    $(".YpfnavC_tab li > a").eq(_tabnum).addClass('on');
    $(".Ypro_deta .Ytabcon").hide();
    $(".Ypro_deta .Ytabcon").eq(_tabnum).show();
}
function Ytab(obj) {
    var _tabindex = $(obj).parent().index()
    $(obj).addClass('on');
    $(obj).parent().siblings().children('.on').removeClass();
    $(obj).parent().parent().siblings().hide();
    $(obj).parent().parent().siblings().eq(_tabindex).show();

}
//异步加载产品价格
function GetProductPrice(productId, htmlId) {
    jQuery.ajax({
        url: "/product/GetPrice?productId=" + productId,
        type: "Get",
        dataType: "json",
        success: function (data) {
            if (data == null)
                return;
            var t1 = data.SalePrice.ToMoney(), t2 = data.MarketPrice.ToMoney();

            //var priceName = "会员价";
            var priceName = "&nbsp;";
            if (_rxtype > 0)
                priceName = "门店价：";
            var s = "<dt>" + priceName + "</dt><dd><div class ='Ysaleprice'><span class=\"YRMB\">￥</span><b id=\"pricenumber\">" + t1 + "</b><p class='Yprice'>" + t2 + "</p></div><label></label><span class='Ylisheng'></span></dd>";
            var Ypfprice = "￥" + t1;
            $("#" + htmlId).html(s);
            $("#h_salePrice").val(t1);
        }
    });
}

//促销价的判断
function GetActivityConcessionPrice(productId, price, quantity, other, htmlId) {
    jQuery.ajax({
        url: window.urlConfig.multiDomain.pc() + "/product/GetActivityConcessionPrice?productId=" + productId + "&price=" + price + "&quantity=" + quantity,
        type: "Get",
        cache: false,
        dataType: "jsonp",
        json: "callback",
        success: function (data) {
            LoadConcessPrice(data, htmlId);
            return;
        }
    });

}


function LoadConcessPrice(data, htmlId) {

    var t1 = parseFloat(data["Concession"]).ToMoney();
    var originalPrice = data.originalPrice.ToMoney() || 0;
    var priceName = "&nbsp;";
    var s = ''
    var h_PriceMarket = $('#h_PriceMarket').val();
    var _PriceMarket = '';
    if (parseFloat(h_PriceMarket) > _c) {
        _PriceMarket = '￥' + parseFloat(h_PriceMarket).toFixed(2);
    }


    if (data.HasConcession > 0) {
        //获取到促销价格
        if ($("#h_rxotc").val() == "True")
            priceName = "门店价：";
        else
            priceName = "活动价："; //获取到促销价但药品是非处方药
        s = "<dt>" + priceName + "</dt><dd><div class ='Ysaleprice'><span class=\"YRMB\">￥</span><b id=\"pricenumber\">" + t1 + "</b><p class='Yprice'>" + _PriceMarket + "</p></div><label></label><span class='Ylisheng'></span></dd>";
    } else {
        //获取销售价格
        if ($("#h_rxotc").val() == "True")
            priceName = "门店价：";
        s = "<dt>" + priceName + "</dt><dd><div class ='Ysaleprice'><span class=\"YRMB\">￥</span><b id=\"pricenumber\">" + t1 + "</b><p class='Yprice'>" + _PriceMarket + "</p></div><label></label><span class='Ylisheng'></span></dd>";
    }
    if (originalPrice != 0 && originalPrice != t1) {
        s = s.replace(/\{0\}/, "<span class=\"RMB\">￥</span>" + data.originalPrice.ToMoney());
    } else {
        s = s.replace(/\{0\}/, "<span class=\"RMB\"></span>");
    }
    $("#" + htmlId).html(s);
    $("#h_salePrice").val(t1);
}

//end 促销价
/*得到金额（获取两位小数点）*/
function ToMoney(x) {
    var f_x = parseFloat(x);
    if (isNaN(f_x)) {
        return false;
    }
    var f_x = Math.round(x * 100) / 100, s_x = f_x.toString(), pos_decimal = s_x.indexOf('.');
    if (pos_decimal < 0) {
        pos_decimal = s_x.length;
        s_x += '.';
    }
    while (s_x.length <= pos_decimal + 2) {
        s_x += '0';
    }
    return s_x;
}
/*套装选择*/
$(document).ready(function () {
    //tab
    window.onscroll = function () {
        if ($(document).scrollTop() >= $(".Ywrap_r").offset()["top"]) {

            $("#Ypfnav").show();
        } else {
            $("#Ypfnav").hide();
        }
    }


    $(".Ytab > li > a, .YpfnavC_tab li > a").click(function () {
        var _tabindex = $(this).parent().index()
        $(".Ypro_deta .Ytab > li > a").removeClass('on');
        $(".Ypro_deta .Ytab > li > a").eq(_tabindex).addClass('on');
        $(".YpfnavC_tab li > a").removeClass('on');
        $(".YpfnavC_tab li > a").eq(_tabindex).addClass('on');
        $(".Ypro_deta .Ytabcon").hide();
        $(".Ypro_deta .Ytabcon").eq(_tabindex).show();
    });


    //顶部下拉菜单
    $(".hNavList > li").hover(function () {
        $(this).addClass("Yhover");
    }, function () {
        $(this).removeClass("Yhover");
    })
    //判断登陆状态
    if (IsLogin()) {
        $('.YnewYesLogin').show();
        $('.YnewNoLogin').hide();
        GetHNavList();
        GetLogin();
    } else {
        $('.YnewYesLogin').hide();
        $('.YnewNoLogin').show();
    }

    $('.Yp_r5c .Ydel').click(function () {
        $('.Yp_r3a .Yp_r3c > a').removeClass()
    })
    $('.Yp_r5c .Yadd').click(function () {
        $('.Yp_r3a .Yp_r3c > a').removeClass()
    })
    //广告语是否为空
    if ($("#h_Productadv").val() == "") {
        $(".Yprodes_d").hide();
    }


});
//tab 函数
function Ytab(obj) {

    var _tabindex = $(obj).parent().index()
    $(obj).addClass('on');
    $(obj).parent().siblings().children('.on').removeClass();
    $(obj).parents(".YPackage").find(".clearfix::visible").hide();
    $(obj).parents(".YPackage").find(".clearfix::eq(" + _tabindex + ")").show();
    //$(obj).parent().parent().siblings().hide();
    //$(obj).parent().parent().siblings().eq(_tabindex).show();
}
//收藏
//添加到收藏
function YCreateFavorite(id, productID) {
    if (!IsLogin()) {
        ToLogin();
        return;
    }
    jQuery.ajax({
        url: "/Favorite/AddFavorite?wareCode=" + productID,
        type: "get",
        dataType: "json",
        json: "callback",
        success: function (data) {
            switch (data) {
                case 3:
                    $("#Ycollection").addClass("on");
                    var _message = '<i class="ico-tipsDui"></i>收藏成功！'
                    showPrompt(_message, 0, 1);
                    break;
                case 1:
                    var _message1 = '<i class="ico-tipsExc"></i>该商品已收藏！'
                    showPrompt(_message1, 0, 1);
                    break;
                case 0:
                    var _message2 = '<i class="ico-tipsCuo"></i>收藏失败，请重试！'
                    showPrompt(_message2, 0, 1);
                    break;
            }
        }
    });
}
//疗程装&规格特效
function addON(obj) {
    var _saleprice, _Ylisheng;
    var _Ynum = $(obj).children('.Ynum').text(); //获取疗程装个数
    var _Yprice = $(obj).children('.Yprice').text(); //获取疗程装单件价格
    var _Yprice1 = parseFloat(_Yprice).ToMoney();

    _saleprice = parseFloat($('#h_Price').val()).ToMoney();
    _Ylisheng = parseFloat((_saleprice - _Yprice1) * _Ynum).ToMoney();
    var _totalYprice = parseFloat(_Ynum * _Yprice).ToMoney();

    if ($(obj).hasClass('on')) {
        $(obj).removeClass();
        $(obj).siblings().removeClass('on');
        $('#product_amount').val(1); //重置购买数量为1
        $('#addNumber2').val(1); //重置需求登记数量为1
        //有促销价 和 促销价不等于正常价
        if ($('#h_salePrice').val() !== "" && $('#h_salePrice').val() !== $('#h_Price').val()) {
            $('#ActivityMessage dd b').html($('#h_salePrice').val())
            var _Ylisheng1 = parseFloat(_saleprice - $('#h_salePrice').val()).ToMoney();
        } else {
            //没有促销价 或者 促销价等于正常价
            $('#ActivityMessage dd b').html(_saleprice);
        }


        //GetActivityConcessionPrice(_a, _c, 1, 0, "ActivityMessage");//异步加载促销价格
        //加载一件装数据
        var Pricedata = {};
        var Prmprice = ($('#h_salePrice').val() !== "" && $('#h_salePrice').val() !== $('#h_Price').val()) ? $('#h_salePrice').val() : _saleprice;
        $('#SingleProductNum').val(Prmprice);
        Pricedata.Concession = Prmprice;
        Pricedata.HasConcession = 1;
        Pricedata.Message = "";
        Pricedata.originalPrice = parseFloat($('#h_Price').val());
        if (isSeckill == null) {
            isSeckill = getSeckill(_a);
            if (!isSeckill) {
                LoadConcessPrice(Pricedata, "ActivityMessage");
            }
        }
        $('#ActivityMessage .Ylisheng').html('');
        $('#ActivityMessage label').html("");
        $('#ActivityMessage dt').html("&nbsp");
        $('#ActivityMessage .Yprice').text('￥' + $('#h_marketPrice').val());
        if (parseInt($('#h_SeckillNum').val()) >= parseInt($('#product_amount').val())) {
            $('#ActivityMessage .Yprice').text('￥' + $('#h_salePrice').val());
            var txt = '<span>特惠</span>';
            //$('#SkillTime').show();
            $('#ActivityMessage dt').html(txt);
            $('#pricenumber').text($('#h_SeckillPrice').val());
        }
    } else {
        $(obj).addClass('on').siblings().removeClass('on');
        //$('#SkillTime').hide();
        if ($('#h_salePrice').val() != $('#h_Price').val()) {
            //有促销价格
            $('#ActivityMessage .Yprice').html("￥" + _saleprice);
            //显示促销价标题
            var dt = $('#ActivityMessage').find('dt')
            if (dt != null && $("#h_rxotc").val() == "False") {
                dt.html("活动价：");
            }
        } else if ($('#txtYliaoc a .on') != null && $("#h_rxotc").val() == "False") {
            //选中任意的疗程装并且不是处方药,则显示[活动价]三个字
            $('#ActivityMessage').find('dt').html("活动价：");
        }

        //$(obj).addClass('on');
        //$(obj).siblings('.on').removeClass();
        $('#ActivityMessage label').html("满" + _Ynum + "盒总价：￥" + _totalYprice + "&nbsp;&nbsp;共省：￥");
        $('#ActivityMessage .Ylisheng').html(_Ylisheng);
        $('#product_amount').val(_Ynum);
        $('#addNumber2').val(_Ynum);
        $('#Y_NumModify').val(_Ynum);
        $('#ActivityMessage dd b').html(_Yprice1);
        $("#ActivityMessT").hide()
        $("#ActivityMessage").show()
        $('#txtYtaozc a').removeClass();
        $("#set_mealList li").removeClass();

        var price = ($('#h_salePrice').val() !== "" && $('#h_salePrice').val() !== $('#h_Price').val()) ? $('#h_salePrice').val() : parseFloat($('#h_Price').val()).ToMoney();
        var num = $(".Ytxt").val();
        $('#SingleProductNum').val(price);
        var productNumbers = '￥' + _totalYprice;
        $('#ViperPrice .ViperPrice_num').html(productNumbers);

        $("#hidden_ProductId").val(_a); //选中疗程装时,将商品编号赋值
        $("#h_ProductType").val(0); //疗程装需求登记类型为0
        //同步需求登记隐藏域的标记
        //$("#set_mealList li").removeClass("addLi_hover");
        //$("#tobuyone").parent().addClass("addLi_hover");


    }

    $('#buycartbutton01').show()
    $('#buycartbuttonmore').hide()
    /*
     需求登记同步
     */
    $(".addNumber").val($(".Ytxt").val());
    //if (_rxtype == 2) {
    //    $(".tobuyone").trigger("click");
    //}


}

//促销活动js
function ActiveShow(obj) {
    $(obj).parent().siblings().show();
    $(obj).parent().siblings().children(".YActiveUp").show();
    $(obj).hide();
}

function ActiveUp(obj) {
    $(obj).parent().hide();
    $(obj).parent().siblings().not(":eq(0)").hide();
    $(obj).parent().siblings().children(".YActiveMore").show();
    $(obj).hide();
}
//药品信息
function DruggistTalkShow(obj) {
    if ($(obj).hasClass('YActiveUp')) {
        $(obj).siblings("p").css({
            "width": "405px",
            "height": "20px",
            "white-space": "nowrap",
            "display": "block",
            "float": "left",
            "text-overflow": "ellipsis"
        })
        $(obj).css({
            "float": "left"
        })
        $(obj).removeClass("YActiveUp")
        $(obj).html("更多")
    } else {
        $(obj).siblings("p").css({
            "width": "auto",
            "height": "auto",
            "white-space": "normal",
            "display": "inline",
            "float": "none",
            "text-overflow": "clip"
        })
        $(obj).css({
            "float": "none"
        })
        $(obj).addClass("YActiveUp")
        $(obj).html("收起")
    }
}

function Druginfo() {
    var UsageDosage = $('#h_UsageDosage').val(), SpecialPeople = $('#h_SpecialPeople').val(), DruggistTalk = $('#h_DruggistTalk').val()
    if (UsageDosage != undefined && UsageDosage != '') {

        var tstr;
        if (UsageDosage.length > 29) {
            tstr = "<p>" + UsageDosage + "</p><a class='YActiveMore' onclick='DruggistTalkShow(this)'>更多</a>"
        } else {
            tstr = "<p style='width:450px;'>" + UsageDosage + "</p>"
        }

        $('.UsageDosage dd').html(tstr)
        $('.UsageDosage').show()
    }
    if (SpecialPeople != undefined && SpecialPeople != '') {
        var strs = SpecialPeople.split(','), txt = '';

        for (i = 0; i < strs.length; i++) {
            txt += '<span>■' + strs[i] + '</span>';
        }
        $('.SpecialPeople dd').html(txt)
        $('.SpecialPeople').show()
    }
    if (DruggistTalk != undefined && DruggistTalk != '') {
        var str;
        if (DruggistTalk.length > 19) {
            str = "<p>" + DruggistTalk + "<span class='red67'>（以上内容仅供参考，治疗请遵医嘱！）</span></p><a class='YActiveMore' onclick='DruggistTalkShow(this)'>更多</a>"
        } else {
            str = "<p style='width:450px;'>" + DruggistTalk + "<span class='red67'>（以上内容仅供参考，治疗请遵医嘱！）</span></p>"
        }
        $('.DruggistTalk dd').html(str)
        $('.DruggistTalk').show()
    }
}
//活动列表  有待调整
function ActivityList(productId) {
    jQuery.ajax({
        url: window.urlConfig.multiDomain.pc() + "/Product/GetNowActivityList?productId=" + productId,
        type: "get",
        dataType: "jsonp",
        json: "callback",
        cache: false,
        success: function (t) {
            var data = t.Data;
            var imgData = t.Img;
            if (data.length <= 0) {
                $("#Promotion_active").hide();
                return;
            }
            var SongQuan = "", //送券FullAmtGiftPrm FullAmountGiftPrm
                DaZhe = "", //打折
                YouHui = "", //优惠 FullAmountDiscount   FullAmtDiscount
                MianYou = "", //免邮MoneyFreeShip AreaFreeShip
                MianFei = "",
                DanPin = "", //单品免邮WareFreeShip
                IsRx = $("#h_rxotc").val(); //是否处方药 False:非处方药 True:处方药
            var SumSongQuan = 0, SumDaZhe = 0, SumYouHui = 0, SumMianYou = 0, SumMianFei = 0, SumDanPin = 0;
            var j_SumSongQuan = 0, j_SumDaZhe = 0, j_SumMianYou = 0, j_SumMaiZeng = 0;
            for (var i = 0; i < data.length; i++) {
                if (data[i].PrmTypeCode == "FullAmtGiftPrm") {
                    SumSongQuan += 1
                }
                // || data[i].PrmTypeCode == "FullAmountGiftPrm"
                if (data[i].PrmTypeCode == 3) {
                    SumDaZhe += 1
                }
                if (false && (data[i].PrmTypeCode == "FullAmountDiscount" || data[i].PrmTypeCode == "FullAmtDiscount")) {
                    SumYouHui += 1
                }
                if (data[i].PrmTypeCode == 5) {
                    SumMianFei += 1
                }
            }

            var FullAmountSpecialData = new Array(); //满数量减活动
            var FullAmountGiftData = new Array(); //满数量赠送活动
            var FullAmountSpecialShowData = new Array(); //满数量减活动

            for (var i = 0; i < data.length; i++) {
                if (data[i].PrmTypeCode == "FullAmountSpecial" && data[i].IsTemplateShow) {
                    //满数量减并且是模板显示
                    FullAmountSpecialData.push(data[i]);
                    if (!(data[i].Special != null && data[i].Special.length == 1 && data[i].Special[0].LimitedAmount == 1)) {
                        FullAmountSpecialShowData.push(data[i]); //去除只有满足一件特价的套餐
                    }
                } else if (data[i].PrmTypeCode == "FullAmountGift" && data[i].IsTemplateShow) {
                    //满数量赠品并且是模板显示
                    FullAmountGiftData.push(data[i]);
                }
                if (data[i].PrmTypeCode == "FullAmtGiftPrm") {
                    //|| data[i].PrmTypeCode == "FullAmountGiftPrm"
                    for (var j = 0; data[i].Condition != null && j < data[i].Condition.length; j++) {
                        if (data[i].IsTagShow == false)
                            continue; //如果标签为false则不显示
                        $("#SongQuan").css("display", "block");
                        $("#Promotion_active").show();
                        SumSongQuan = data[i].Condition.length;
                        SongQuan = AddHtmlt(SongQuan, SumSongQuan, j_SumSongQuan);
                        if (data[i].PrmTypeCode == "FullAmtGiftPrm") {
                            //满金额送优惠券
                            SongQuan += "<span class=\"Yfl\">本产品满<strong>" + data[i].Condition[j].LimitedAmt + "</strong>元，即赠送<strong>" + data[i].Condition[j].Condition[0].DisAmt + "</strong>元优惠券。</span>";
                        }
                        if (false && data[i].PrmTypeCode == "FullAmountGiftPrm") {
                            //满数量送优惠券
                            SongQuan += "<span class=\"Yfl\">本产品满<strong>" + data[i].Condition[j].LimitedAmount + "</strong>件，即赠送<strong>" + data[i].Condition[j].Condition[0].DisAmt + "</strong>元优惠券。</span>";
                        }
                        SongQuan = AddHtml(SongQuan, SumSongQuan, j_SumSongQuan);
                        j_SumSongQuan++;
                        $("#Y_hasSongQuan").val("ture");
                    }
                } else if (data[i].PrmTypeCode == "AreaFreeShip" && data[i].Condition != null && IsRx == "False" && data[i].PrmDesc != '') {
                    for (var j = 0; data[i].Condition != null && j < data[i].Condition.length; j++) {
                        if (IsDobuleTime()) {
                            $("#MianYou").css("display", "block");
                            $("#Promotion_active").show();
                            $('#txtQuYu').show();
                            $("#txtQuYu").append('<p class="Yfl\">双11独享全场包邮</p>');
                            $("#Y_hasMianYou").val("ture");
                        } else {
                            $("#MianYou").css("display", "block");
                            $("#Promotion_active").show();
                            $('#txtQuYu').show();
                            //如果有多个就追加在活动的下一行
                            //区域免邮只读取活动描述,其他的不显示
                            //$("#txtQuYu").append(data[i].PrmDesc + "地区用户,购买本产品达到<strong>" + data[i].Condition[j].LimitedAmt + "</strong>元，则订单免运费<br/>");
                            $("#txtQuYu").append('<p class="Yfl\">' + data[i].PrmDesc + "</p>");
                            $("#Y_hasMianYou").val("ture");
                        }

                    }
                } else if (data[i].PrmTypeCode == "WareFreeShip" && data[i].PrmCode != "1291081" && IsRx == "False") {
                    if (IsDobuleTime()) {
                        $("#MianYou").css("display", "block");
                        $("#Promotion_active").show();
                        DanPin += "<p class=\"Yfl\">双11独享全场包邮</p>";
                        j_SumMianYou++;
                        $("#Y_hasMianYou").val("ture");
                    } else {
                        $("#MianYou").css("display", "block");
                        $("#Promotion_active").show();
                        //  var pronum = Math.ceil($("#h_Price").value / data[i].Condition[0].LimitedAmt);
                        if (data[i].Condition[0].LimitedAmount != null && data[i].Condition[0].LimitedAmount != undefined) {
                            DanPin += "<p class=\"Yfl\">本产品满" + data[i].Condition[0].LimitedAmount + "件，则免运费。</p>";
                        } else if (data[i].Condition[0].LimitedAmt != null && data[i].Condition[0].LimitedAmt != undefined) {
                            DanPin += "<p class=\"Yfl\">本产品满" + data[i].Condition[0].LimitedAmt + "元，则免运费。</p>";
                        }
                        j_SumMianYou++;
                        $("#Y_hasMianYou").val("ture");
                    }

                }
            }
            $("#txtSongQuan").html(SongQuan);
            $("#txtDaZhe").html(DaZhe);
            $("#txtYouHui").html(YouHui);
            $("#txtMianFei").html(MianFei);
            $("#txtDanPin").html(DanPin);

            mianYouMoreBtn(); //免邮区域添加更多/收起按钮

            showFullAmountSpecial(FullAmountSpecialShowData); //显示满数量减活动
            showFullAmountGift(FullAmountGiftData, imgData, FullAmountSpecialData); //显示满数量赠送活动
        }
    });
    function commentsFunction() {

    }
}
//显示满数量特价
function showFullAmountSpecial(list) {
    if (list.length > 0) {
        $("#proAvt").show();
        $(".avt_t02").html(list[0].PrmDesc);
        //var memberprice = parseFloat($("#pricenumber").text()) || 0;//商品当前销售价
        var memberprice = parseFloat($("#SalePrice").val()) || 0; //商品当前销售价
        for (var j = 0; j < list.length; j++) {
            var special = list[j].Special || [];
            var ul = $("#avt_liaochen");
            for (var i = 0; i < special.length; i++) {
                if (i > 3) {
                    break;
                }
                //如果不是当前商品的跳过
                if (special[i].WareCode != _a)
                    continue;
                var num = special[i].LimitedAmount || 0; //满数量
                //满数量特价的一件不显示
                if (num == 1 || num == 0)
                    continue;
                var prmPrice = (special[i].PrmPrice || 0).ToMoney(); //促销价格
                var totalM = (num * prmPrice).ToMoney();
                var listM = ((memberprice - prmPrice) * num).ToMoney()
                var li = $("<li>").addClass("haveC")
                var p1 = $("<p>").addClass("avt_red").html(num + "件=" + totalM + "元<br />" + prmPrice + "元/件</p><p class=\"avt_ls\">立省<br />￥" + listM);
                var p2;

                //var str = "<p class=\"avt_red\">" + num + "件=" + totalM + "元<br />" + prmPrice + "元/件</p><p class=\"avt_ls\">立省<br />￥" + listM + "</p>";
                var state = DetermineTheStatusOfTheProduct();
                switch (state) {
                    case 0:
                        //立即购买
                        p2 = $("<p>").addClass("btnBuy").append($("<span class=\"add_to_card\" >").attr("onclick", "AddCart_new(" + num + ", " + $('#h_productId').val() + ");").html("立即购买"));
                        //str += "<p class=\"btnBuy\"><span onclick=\"$(\"#txtYliaoc Ynum:contains('data[i].PrmCode').trigger('click');PAddCart_new(" + data[i].PrmCode + ",$('#h_productId').val());\">立即购买</span></p>";
                        //str += "<p class=\"btnBuy\"><span onclick=\"ctrActionsend('add_to_card');CreatePackageToCart2(" + data[i].PrmCode + "," + num + ")\">立即购买</span></p>";
                        break;
                    case 1:
                        //需求登记
                        p2 = $("<p>").addClass("btnBuy").append($("<span class=\"demand_registration\">").attr("onclick", "ctrActionsend('demand_registration'); addCart_rx1(" + num + ", " + _a + ");").html("需求登记"));

                        break;
                    case 2:
                        //到货通
                        p2 = $("<p>").addClass("btnBuy").append($("<span>").html("到货通知").attr("onclick", "daohuotips();"));
                        break;
                    default:
                }
                li.append(p1);
                li.append(p2);
                ul.append(li);
            }
        }
    } else {
        if ($("#proYH").find('ul').children().length == 0) {
            $("#proYH").hide();
        }
    }
}
//获取满数量特价的价格
function GetSpacPrict(Price, count, SpecialData) {
    if (SpecialData == null || SpecialData.Special == null || SpecialData.Special == undefined)
        return Price;
    var slength = SpecialData.Special.length;
    var maxPrice = Price;
    for (var i = slength - 1; i >= 0; i--) {
        if (SpecialData.Special[i].LimitedAmount <= count) {
            maxPrice = SpecialData.Special[i].PrmPrice;
        }
    }
    return maxPrice;
}


//显示满数量赠品
function showFullAmountGift(data, imgData, SpecialData) {
    if (data == null || data.length == 0)
        return;
    if (SpecialData.length == 0 || SpecialData[0].Special == null) {
        SpecialData == null;
    } else {
        SpecialData = SpecialData[0];
    }
    $("#proAvt").show();
    var html = '';
    var Temp = '';
    var pic180 = ($("#Pic180").val() != "" && $("#Pic180").val() != null && $("#Pic180").val() != "无" ? $("#Pic180").val() : window.urlConfig.multiDomain.res() + "/theme/default/img/nopic.jpg");
    var WareName = $("#WareName").val();
    var SalePrice = $("#SalePrice").val() == '' ? 0 : parseInt($("#SalePrice").val());
    var SalePrice = _c;
    var title = '';
    for (var z = 0; z < data.length; z++) {
        var Con = data[z].Condition || [];
        title = data[z].PrmDesc; //如果有多个活动,取最后一个活动的活动名称
        for (var j = 0; j < Con.length; j++) {
            if (Con[j].addWay == 1)
                continue; //如果是用户自己选择的赠品, 则该活动不显示出来
            Temp = '';
            Temp += " <div class=\"avt_i_mz\">";
            Temp += " <p class=\"avt_i_yh_l\"><img src=" + pic180 + " alt=" + WareName + "></p>";
            Temp += " <div class=\"avt_i_mz_r\">";
            Temp += " <dl>";
            //这里的价格有问题
            Temp += "     <dt> <p><b> " + WareName + " </b></p> <p class=\"avt_red\">";
            Temp += "<font id=\"proLimitedAmount\">" + Con[j].LimitedAmount + "</font>件";
            Temp += "=<font id=\"proLimitedMony\">" + (Con[j].LimitedAmount * GetSpacPrict(SalePrice, Con[j].LimitedAmount, SpecialData)).ToMoney() + "</font>元 ＋0.1元获取</p></dt>";
            Temp += "     <dd><p class=\"btnBuy\">";
            var state = DetermineTheStatusOfTheProduct();
            switch (state) {
                case 0:
                    Temp += "     <span class=\"add_to_card\"  onclick=\"ctrActionsend('add_to_card');AddCart_new(" + Con[j].LimitedAmount + ", " + _a + ")\">立即购买</span>";
                    break;
                case 1:
                    Temp += "     <span class=\"demand_registration\" onclick=\"ctrActionsend('demand_registration'); addCart_rx1(" + Con[j].LimitedAmount + ", " + _a + ");\">需求登记</span>";
                    break;
                case 2:
                    Temp += "     <span class=\"btnBuy\" onclick=\"daohuotips()\">到货通知</span>";
                    break;
            }

            Temp += "     </p></dd>";
            Temp += " </dl>";
            Temp += " <ul>";
            var gifs = Con[j].GiftSet || [];
            for (var i = 0; i < gifs.length; i++) {
                Temp += "     <li>";
                Temp += "     <p class=\"mz_img\">";
                Temp += "     <a href=\"/product/" + gifs[i].PrmContentCode + ".shtml\" target=\"_blank\" title=\"" + gifs[i].PrmContentName + "\">";
                Temp += "            <img warecode=\"" + gifs[i].PrmContentCode + "\"  src=\"" + window.urlConfig.multiDomain.res() + "/theme/default/img/nopic.jpg" + "\" alt=\"" + gifs[i].PrmContentName + "\">";
                Temp += "       </a>";
                Temp += "   </p>";
                Temp += "    <p class=\"mz_title\">";
                Temp += "       <a href=\"/product/" + gifs[i].PrmContentCode + ".shtml\" target=\"_blank\" title=\"" + gifs[i].PrmContentName + "\">" + gifs[i].PrmContentName + "</a>";
                Temp += "                    <span>*" + gifs[i].SingleQty + "件</span>";
                Temp += "                </p>";
                Temp += "             </li>";
            }
            Temp += "        </ul>";
            Temp += "     </div>";
            Temp += " </div>";
            $("#proMZ").append(Temp);
        }
    }
    HideActHead();
    if ($("#proMZ").html() != "" && $('#proYH').css('display') == 'none' && title != '') {
        $(".avt_t02").html(title);
    }
    //异步获取图片并且设置对应图片
    getsetImg(imgData);
}



function HideActHead() {
    if ($("#proMZ").html() == "" && $('#proYH').css('display') == 'none') {
        $("#proAvt").hide();
    } else {
        $("#proAvt").show();
    }
}




//页面免邮区域添加更多/收起按钮
function mianYouMoreBtn() {
    var mianyou = $('#MianYou');
    if (mianyou.css('display') == 'none')
        return; //免邮区域没有显示,则直接返回
    //TODO:判断显示条数,决定是否需要插入更多/收起按钮;重写更多/收起按钮事件
    var myplength = $("#MianYou").find('p').length; //判断免邮区域下面P标签数量
    if (myplength == 1)
        return;

    $("#MianYou").prepend("<a class=\"YActiveMore\"  onclick=\"ShowMore()\" >更多</a>");
    $('#txtQuYu').append("<a class=\"YActiveUp\" onclick=\"upMore()\" style=\"display: inline;\">收起</a>");
    $("#MianYou").find('p').each(function (i) {
        if (i == 0)
            return true;
        $(this).hide();
    });
    $("#txtQuYu .YActiveUp").hide();
}
//展开免邮信息
function ShowMore() {
    $("#MianYou").find('p').each(function (i) {
        $(this).show();
    });
    $("#txtQuYu .YActiveUp").show();
    $("#MianYou .YActiveMore").hide();
}

//收起免邮信息
function upMore() {
    $("#MianYou").find('p').each(function (i) {
        if (i == 0)
            return true;
        $(this).hide();
    });
    $("#txtQuYu .YActiveUp").hide();
    $("#MianYou .YActiveMore").show();
}


function AddHtmlt(obj, length, i) {
    if (length == 1) {
        obj += "<p class=\"clearfix\" style=\"border-bottom:none;\">";
        return obj;
    }
    if (i > 0) {
        //|| i == (length - 1)
        obj += "<p class=\"clearfix\" style=\"border-bottom:none; display:none;\">";
        return obj;
    }
    if (i == 0) {
        obj += "<p class=\"clearfix\" style=\"border-bottom:none;\">";
        return obj;
    }
    obj += "<p class=\"clearfix\" style=\" display:none;\">";
    return obj;
}

function AddHtml(obj, length, i) {

    if ((length > 1) && (i == (length - 1))) {
        obj += "<a  class=\"YActiveUp\" onclick=\"ActiveUp(this)\">收起</a></p>"
    } else if ((length > 1) && (i == 0)) {
        obj += "<a class=\"YActiveMore\" onclick=\"ActiveShow(this)\">更多</a></p>"
    } else {
        obj += "</p>"
    }
    return obj;
}


//买几送几 暂无
function MaiZeng(productId, type) {
    jQuery.ajax({
        url: kad_user_url + "/Product/GetListByActivityType?productId=" + productId + "&type=" + type,
        type: "get",
        dataType: "jsonp",
        jsonp: "callback",
        cache: false,
        success: function (data) {
            if (data.length > 0) {
                //$("#MaiZeng").css("display", "block");      $("#Promotion_active").show();
                //$("#divMaiZeng").html(GiftList(_a));
            }
        }
    });

}
//买赠
function YMaiZeng(productId) {
    jQuery.ajax({
        url: window.urlConfig.multiDomain.pc() + "/Product/JsonGiftList?productId=" + productId,
        type: "get",
        dataType: "jsonp",
        jsonp: "callback",
        cache: false,
        success: function (data) {
            if (data.length <= 0)
                return;
            $("#Y_hasMaiZeng").val("ture");
            $("#MaiZeng").css("display", "block");
            $("#Promotion_active").show();
            var str = "";
            var giftlist;
            var Sum = 0;
            var totali = 0;
            var Sum = (data[0] != null ? data[0].Condition.length : 0) + (data[1] != null ? data[1].Condition.length : 0);
            for (var i = 0; i < data.length; i++) {
                if (data[i].IsTagShow == false)
                    continue; //标签显示必须勾选上是才显示活动
                if (data[i].PrmTypeCode == "FullAmountGift") {
                    for (var j = 0; j < data[i].Condition.length; j++) {
                        if (data[i].Condition[j].addWay == 1)
                            continue; //如果是用户自己选择的赠品, 则该活动不显示出来
                        str = AddHtmlt(str, Sum, totali);
                        str += "<span class=\"Yfl\">本产品满<strong>" + data[i].Condition[j].LimitedAmount + "</strong>件,即可换取";
                        for (var k = 0; k < data[i].Condition[j].GiftSet.length; k++) {
                            if (k == 0) {
                                //totali == 0
                                str += "价值￥<strong>" + data[i].Condition[j].GiftSet[k].Price + "</strong>的<a target=\"_blank\" href=\"/product/" + data[i].Condition[j].GiftSet[k].PrmContentCode + ".shtml\" title=\"" + data[i].Condition[j].GiftSet[k].PrmContentName + "\">" + data[i].Condition[j].GiftSet[k].PrmContentName + "</a><strong>" + data[i].Condition[j].GiftSet[k].SingleQty + "</strong>件"
                            } else {
                                str += ",和价值￥<strong>" + data[i].Condition[j].GiftSet[k].Price + "</strong>的<a target=\"_blank\" href=\"/product/" + data[i].Condition[j].GiftSet[k].PrmContentCode + ".shtml\" title=\"" + data[i].Condition[j].GiftSet[k].PrmContentName + "\">" + data[i].Condition[j].GiftSet[k].PrmContentName + "</a><strong>" + data[i].Condition[j].GiftSet[k].SingleQty + "</strong>件"
                            }
                        }
                        str += "</span>"
                        str = AddHtml(str, Sum, totali);
                        totali++;
                    }
                }
                if (data[i].PrmTypeCode == "FullAmtGift") {
                    //满金额赠品不显示
                    for (var j = 0; j < data[i].Condition.length; j++) {
                        if (data[i].Condition[j].addWay == 1)
                            continue; //如果是用户自己选择的赠品, 则该活动不显示出来
                        str = AddHtmlt(str, Sum, totali);
                        str += "<span class=\"Yfl\">本产品满<strong>" + data[i].Condition[j].LimitedAmt + "</strong>元,即可换取";
                        for (var k = 0; k < data[i].Condition[j].GiftSet.length; k++) {
                            if (totali == 0) {
                                str += "价值￥<strong>" + data[i].Condition[j].GiftSet[k].Price + "</strong>的<a target=\"_blank\" href=\"/product/" + data[i].Condition[j].GiftSet[k].PrmContentCode + ".shtml\" title=\"" + data[i].Condition[j].GiftSet[k].PrmContentName + "\">" + data[i].Condition[j].GiftSet[k].PrmContentName + "</a><strong>" + data[i].Condition[j].GiftSet[k].SingleQty + "</strong>件"
                            } else {
                                str += "价值￥<strong>" + data[i].Condition[j].GiftSet[k].Price + "</strong>的<a target=\"_blank\" href=\"/product/" + data[i].Condition[j].GiftSet[k].PrmContentCode + ".shtml\" title=\"" + data[i].Condition[j].GiftSet[k].PrmContentName + "\">" + data[i].Condition[j].GiftSet[k].PrmContentName + "</a><strong>" + data[i].Condition[j].GiftSet[k].SingleQty + "</strong>件"
                            }
                        }
                        str += "</span>"
                        str = AddHtml(str, Sum, totali);
                        totali++;
                    }
                }
                $("#txtMaiZeng").html(str);
            }
            if ($("#txtMaiZeng").html() == '') {
                $("#Y_hasMaiZeng").val("false");
                $("#MaiZeng").css("display", "none");
                $("#Promotion_active").hide();
            }
        }
    });
}

function SplitStr(str, count) {
    if (str.length <= count)
        return str;
    var temp = '';
    for (var i = 0; i < count; i++) {
        temp += str[i];
    }
    temp += "...";
    return temp;
}


//加N元换购 暂无
function HuanGou(productId, type) {
    jQuery.ajax({
        url: kad_user_url + "/Product/GetListByActivityType?productId=" + productId + "&type=" + type,
        type: "get",
        dataType: "jsonp",
        jsonp: "callback",
        cache: false,
        success: function (data) {
            if (data.length > 0) {
                //$("#HuanGou").css("display", "block"); $("#Promotion_active").show();
            }
        }
    });

}
//免费领取优惠券
function LingQauan(productId) {
    jQuery.ajax({
        url: window.urlConfig.multiDomain.pc() + "/Product/LingQauan?productId=" + productId,
        type: "get",
        dataType: "jsonp",
        jsonp: "callback",
        success: function (result) {
            var data = result;
            if (data == null || data.length <= 0)
                return;
            var str = "", rule = "";
            for (var i = 0; i < data.length; i++) {
                if (data[i].IsTagShow != undefined && !data[i].IsTagShow)
                    continue;
                if (data.length == 1) {
                    str += "<p style=\"border-bottom:none;\">"
                } else if (data.length != 1 && i == (data.length - 1)) {
                    str += "<p style=\"border-bottom:none;display:none\"><a class='YActiveUp' onclick='ActiveUp(this)'>收起</a>"
                } else if (data.length >= 1 && i == 0) {
                    str += "<p style=\"border-bottom:none;\"><a class='YActiveMore' onclick='ActiveShow(this)'>更多</a>"
                } else {
                    str += "<p style=\"border-bottom:none;display:none\">"
                }
                //str += "<strong>" + data[i].PrmDesc + "</strong><input type='button' value='领取' style='width:100px' onclick=\"if(!IsLogin()){ToLogin();}else{FreeCoupon(" + data[i].PrmCode + ");}\" class='get_btn_1' title='立即领取' />";
                str += "<span>" + data[i].PrmDesc + "</span>。";
                str += "<a href=\"javascript:void(0)\" onclick=\"if(!IsLogin()){ToLogin();}else{ctrActionsend('collar_roll_receive');FreeCoupon(" + data[i].PrmCode + ");}\" class=\"get_btn_1\">立即领取</a></p>";
            }
            //$("#txtLingQu").html(str);
            if (str != '') {
                $("#txtLingQauan").html(str);
                $("#LingQauan").show();
                $("#Promotion_active").show();
            }
        }
    });
}

function FreeCoupon(activityID) {
    $.ajax({
        type: "GET",
        url: "/product/FreeCoupon?ActivityID=" + activityID,
        dataType: "json",
        success: function (data) {
            if (data == "true") {
                //alert('领取成功');
                showPrompt('<i class="ico-tipsCuo"></i>领取成功！', 0, 1);
            } else if (data == "请先登录！") {
                ToLogin();
            } else {
                //alert(data); //失败
                showPrompt('<i class="ico-tipsCuo"></i>' + data + '！', 0, 1);
            }
        }
    });
}


//商品限购
function GetProductLimitCount(productId) {
    jQuery.ajax({
        url: window.urlConfig.multiDomain.pc() + "/Product/GetProductLimitCount?productId=" + productId,
        type: "get",
        dataType: "jsonp",
        json: "callback",
        success: function (data) {
            if (data > 0) {
                var str = "";
                str += "每个ID限购<strong>" + data + "</strong>件";
                $(".Yp_r5 dd .Ydes").html(str);
                $(".Yp_r5 dd .Ydes").show();

            } else {
                $(".Yp_r5 dd .Ydes").hide();
            }
            $('#Y_xiangou').val(data);
        }
    });
}
//规格
function GetSameProductByPassnum(passnum, proID) {
    if ($("#Specifications a").length <= 0) {
        $(".Yp_r4").hide();
        return;
    }
    $(".Yp_r4").show();
    return;
}
//疗程装
var Yarraynum = new Array()
function liaochengList(productId) {
    jQuery.ajax({
        //async:false,
        url: window.urlConfig.multiDomain.pc() + "/product/GetPreferentialListByProductId?productId=" + productId,
        type: "get",
        dataType: "jsonp",
        json: "callback",
        success: function (msg) {
            if (msg != null && msg.list.length > 0) {
                var unitName = $("#UnitName").val() || '盒'; //单位默认盒
                $(".avt_t02").html(msg.PrmDesc);
                data = msg.list;
                var _usedDay = parseInt($('#h_usedDay').val()) || 0;
                $('#Yliaoc').show();
                var pkgstr = "", picLC = "";
                $('#h_Pricenum').val(data.length);
                for (i = 0; i < data.length; i++) {
                    pkgstr += "<a href=\"javascript:void(0)\" onclick=\"addON(this)\">满<span class=\"Ynum\">" + data[i].ProductNum;
                    pkgstr += "</span>" + unitName + "每" + unitName + "￥<span class=\"Yprice\">" + data[i].PrmPrice.ToMoney() + "</span>";
                    if (_usedDay > 0) {
                        pkgstr += "，可使用" + (data[i].ProductNum * _usedDay) + "天<span class=\"Ygx\"></span></a>";
                    } else {
                        pkgstr += "<span class=\"Ygx\"></span></a>"
                    }
                    Yarraynum[i] = [data[i].ProductNum, data[i].PrmPrice];
                    if (i < 3) {
                        picLC += "<label>" + data[i].ProductNum + "</label>" + unitName + "起<label>" + parseFloat(data[i].PrmPrice).toFixed(1) + "</label>元/" + unitName;
                        if (i != data.length - 1 && i != 2) {
                            picLC += "，";
                        }
                    }
                }
                $("#lcAdv .spnInfo").html(picLC);
                $("#lcAdv").show();
                $("#txtYliaoc").html(pkgstr);
            } else {
                $("#Yliaoc").hide();
            }
            LoadingSwitch();
        }
    })
}

function BuyQuantity(quantity) {
    var q = jQuery("#product_amount").val();
    if (isNaN(q)) {
        jQuery("#product_amount").val(1);
        return false;
    }
    var total = parseInt(q) + parseInt(quantity);
    var Y_xiangou = parseInt(jQuery("#Y_xiangou").val());
    var _Pricenum = $('#h_Pricenum').val()
    var _Yprice = parseFloat($('#h_Price').val()).ToMoney();

    var h_PriceMarket = $('#h_PriceMarket').val();
    var _PriceMarket = _c;
    if (parseFloat(h_PriceMarket) > _c) {
        _PriceMarket = parseFloat(h_PriceMarket).toFixed(2);
    }

    if (parseInt(total) > 0) {
        if (Y_xiangou > 0 && parseInt(total) <= Y_xiangou) {
            jQuery("#product_amount").val(total);
            $('#Y_NumModify').val(total)
        } else if (Y_xiangou > 0 && parseInt(total) > Y_xiangou) {

            jQuery("#product_amount").val(Y_xiangou);
            $('#Y_NumModify').val(Y_xiangou)
            if (parseInt(total) < 999) {
                var _message = '<i class="ico-tipsExc"></i>每个ID限购' + Y_xiangou + '件'
                showPrompt(_message, 0, 1)
            }
        } else if (Y_xiangou == 0) {
            jQuery("#product_amount").val(total);
            $('#Y_NumModify').val(total)
        }

        $('#ActivityMessage dd b').html(_Yprice);
        $("#addNumber2").val(total);
        if (_Pricenum > 0) {
            var _Ylisheng;
            for (var i = 0; i < _Pricenum; i++) {
                if (total < Yarraynum[i][0] && (i + 1 < Yarraynum.length && total >= Yarraynum[i + 1][0])) {
                    var _totalYprice = parseFloat(total * Yarraynum[i + 1][1]).ToMoney();
                    $('#ActivityMessage dd b').html(Yarraynum[i + 1][1].ToMoney());
                    $('#ActivityMessage label').html("满" + total + "盒总价：￥" + _totalYprice + "&nbsp;&nbsp;共省：￥");
                    _Ylisheng = parseFloat((_Yprice - Yarraynum[i + 1][1]) * total).ToMoney();
                    $('#ActivityMessage .Ylisheng').html(_Ylisheng);

                    $('#ActivityMessage dd .Yprice').html("￥" + parseFloat(_c).toFixed(2)); //显示原价
                    if ($("#h_rxotc").val() == "True") {
                        $('#ActivityMessage>dt').first().html('门店价：')
                    } else {
                        $('#ActivityMessage>dt').first().html('活动价：')
                    }

                } else if (total >= Yarraynum[0][0]) {
                    var _totalYprice1 = parseFloat(total * Yarraynum[0][1]).ToMoney();
                    $('#ActivityMessage dd b').html(Yarraynum[0][1].ToMoney());
                    $('#ActivityMessage label').html("满" + total + "盒总价：￥" + _totalYprice1 + "&nbsp;&nbsp;共省：￥");
                    _Ylisheng = parseFloat((_Yprice - Yarraynum[0][1]) * total).ToMoney();
                    $('#ActivityMessage .Ylisheng').html(_Ylisheng);
                    $('#ActivityMessage dd .Yprice').html("￥" + parseFloat(_c).toFixed(2)); //显示原价
                    if ($("#h_rxotc").val() == "True") {
                        $('#ActivityMessage>dt').first().html('门店价：')
                    } else {
                        $('#ActivityMessage>dt').first().html('活动价：')
                    }
                } else if (total < Yarraynum[_Pricenum - 1][0]) {
                    if ($('#h_salePrice').val() !== "" && $('#h_salePrice').val() !== $('#h_Price').val()) {
                        $('#ActivityMessage dd b').html($('#h_salePrice').val());
                        var _salePrice = $('#h_salePrice').val()
                        var _totalYprice2 = parseFloat(total * _salePrice).ToMoney();
                        if (total > 1) {
                            $('#ActivityMessage label').html("满" + total + "盒总价：￥" + _totalYprice2 + "&nbsp;&nbsp;共省：￥");
                        } else {
                            $('#ActivityMessage label').html("立省：￥");
                        }
                        _Ylisheng = parseFloat((_Yprice - $('#h_salePrice').val()) * total).ToMoney();
                        $('#ActivityMessage .Ylisheng').html(_Ylisheng);
                        $('#ActivityMessage dd .Yprice').html("￥" + _PriceMarket); //显示市场价
                        if ($("#h_rxotc").val() == "True") {
                            $('#ActivityMessage>dt').first().html('门店价：')
                        } else {
                            $('#ActivityMessage>dt').first().html('活动价：')
                        }
                    } else {
                        $('#ActivityMessage dd b').html(_Yprice);
                        $('#ActivityMessage label').html("");
                        $('#ActivityMessage .Ylisheng').html("");
                        $('#ActivityMessage>dt').first().html("&nbsp");
                        //$('#ActivityMessage dd .Yprice .RMB').html("");
                    }
                }
            }
        }
        var dtmessage = "&nbsp;";
        if ($("#h_rxotc").val() == "True") {
            dtmessage = "门店价：";
        }
        // if ($("#h_SeckillNum"))

        if (total <= parseInt($("#h_SeckillNum").val()) && $("#h_SeckillPrice").val() != "") {
            if ($("#h_rxotc").val() == "True") {
                $('#ActivityMessage>dt').first().html(dtmessage)
            } else {
                $('#ActivityMessage dd .Yprice').html("￥" + $('#h_salePrice').val());
                var txt = '<span>特惠</span>';
                $('#ActivityMessage>dt').first().children('span').size() > 0 ? $('#ActivityMessage>dt').first().children('span').show() : $('#ActivityMessage>dt').first().html(txt);
                //$('#SkillTime').show();
            }
            $('#ActivityMessage dd b').html($("#h_SeckillPrice").val());
        } else {
            $('#ActivityMessage dd .Yprice').html("￥" + _PriceMarket);
            $('#ActivityMessage>dt').first().children('span').hide();
            //$('#SkillTime').hide();
        }
    }
}
//判断商品数量为0时自动+1
function NumModify() {
    var Ynum = $('#product_amount').val()
    var _message = '<i class="ico-tipsExc"></i>请输入正确的数量'
    if (Ynum <= 0) {
        $('#product_amount').val(1);
        $('#Y_NumModify').val(Ynum);
        $('#product_amount').focus();
        $('.Yp_r3a .Yp_r3c > a').removeClass();
        showPrompt(_message, 0, 1);
    }
    if (Ynum > 999) {
        $('#product_amount').val(1);
        $('#Y_NumModify').val(Ynum);
        $('#product_amount').focus();
        $('.Yp_r3a .Yp_r3c > a').removeClass();
        showPrompt(_message, 0, 1);
    }
    if ($('#Y_NumModify').val() != Ynum) {
        $('.Yp_r3a .Yp_r3c > a').removeClass()
    }
}
//判断是否有货 库存状态:1-禁售缺货 2-禁售有货 3-现在有货 4-货源紧张 5-库存有限 6-暂时缺货
function GetHaveCarGo() {
    jQuery.ajax({
        type: "Get",
        url: window.urlConfig.multiDomain.pc() + "/product/GetStockByProductId?productId=" + jQuery('#h_productId').val(),
        dataType: "jsonp",
        json: "callback",
        success: function (data) {

            switch (data) {
                case 1:
                case 2:
                    $("#buycartbutton").hide();
                    $(".Yp_r5").hide();
                    break;
                case 3:
                    $("#IsHave").html("现在有货");
                    $(".arrival_msg, .inform-btnT").hide();
                    break;
                case 4:
                    $("#IsHave").html("货源紧张");
                    $("#IsHave").css("color", "red");
                    $(".arrival_msg, .inform-btnT").hide();
                    break;
                case 5:
                    $("#IsHave").html("库存有限");
                    $("#IsHave").css("color", "red");
                    $(".arrival_msg, .inform-btnT").hide();
                    break;
                case 6:
                    $("#IsHave").html("暂时缺货");
                    $("#IsHave").css("color", "red");
                    $(".pro_gobuy, .Yp_r7, .Ybtn_gmsT, .buy_bi1bT").hide();
                    $("#YpfnavC_r_btn").html("<a href=\"javascript:;\" onclick=\"poplayer('advances-layer','advClose',true);$('#advances-layer .content').show();$('#advances-layer .success').hide();\"><img src=\"http://res.360kad.com/theme/default/img/product/ishave.png\"/></a>");
                    $(".arrival_msg, .inform-btnT").show();
                    break;
                default:
                    $("#IsHave").html("您输入的单号错误");

            }
            //rx0 rx1判断购物车类型来做按钮和提示的展示
            switch (_rxtype) {
                case 0:
                case 1:
                    var CartType = $("#CartType").val() || "";
                    if (CartType == "2") {
                        $(".Yp_r6").hide();
                        $(".cannotbuy").show();
                    }
                    break;
                default:
            }

        }
    })
}
//添加到购物车AddCart_new函数
function AddCart_new(q, productId) {
    //ctrActionsend("add_to_card");
    //moveCartImg();
    $(".onloading").attr("class", "buyloading");
    $(".buyloading").show();
    $("#bybuy").hide();
    jQuery("#h_Quantity").val(q);
    CreateCart(productId, q);
    //rightCreateCart(productId, q);
}
//添加到购物车PAddCart_new函数
function PAddCart_new(q, productId) {
    //ctrActionsend("add_to_card");
    if ($(".selDegrees_on").length == 1) //没有选中度数不可加入购物车
        return;
    $(".onloading").attr("class", "buyloading");
    $(".buyloading").show();
    $("#bybuy").hide();
    jQuery("#h_Quantity").val(q);
    PCreateCart(productId, q);
}
//ref定义
function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null)
        return unescape(r[2]);
    return 0;
}

function moveCartImg() {
    if ($.browser.msie && $.browser.version < 9) {
        autoMoveCart();
    } else {
        var $t = $("#bybuy").offset().top;
        var $l = $("#bybuy").offset().left;
        var cart_box = document.getElementById("cart_box");
        var cloneImg = document.getElementById("cloneImg");
        var parabola = funParabola(cloneImg, cart_box).mark();
        $("#cloneImg").show();
        $("#cloneImg").css({
            marginLeft: 0,
            marginTop: 0,
            position: "absolute",
            left: $l,
            top: $t,
            zIndex: 9999
        });
        $("#cloneImg").children("img").css({
            width: 20,
            height: 20
        });
        parabola.init();
        setTimeout("autoMoveCart()", 1500);
    }
}
//加入购物车时,右侧导航自动展开
function autoMoveCart() {
    if ($("#cart_lists_show").css("display") != "none")
        return;
    $(".cart_box").click();
    $("#nav_closeBtn").show();
}
//添加到购物车 CreateCart函数
var oLocathref = window.location.href; //获取当页面的链接地址
var cartMsg;
function CreateCart(productId, quantity) {
    if (quantity == 0) {
        quantity = 1;
    }
    jQuery.support.cors = true;
    jQuery.ajax({
        url: "/cart/AddCart?id=" + productId + "&quantity=" + quantity + "&buyType=0&sellerCode=" + sellercode,
        type: "Get",
        cache: false,
        success: function (data) {

            $(".buyloading").hide();
            $("#bybuy").show();
            if (data == "true") {
                //    if (typeof (GetCart) === "function") {
                //        GetCart();
                //    }
                //    if (typeof (rGetCartNumber) === "function") {
                //        rGetCartNumber();
                //    }
                //    NewGetCartList();
                //}
                //else if (data == "0") {
                //    //alert("已购买的订单中该产品的数量已达到最大限购数!");
                //    var _message = '<i class="ico-tipsExc"></i>已购买的订单中该产品的数量已达到最大限购数！'
                //    showPrompt(_message, 0, 1)

                //}
                //else if (data == "1") {
                //    //alert("您购物车中的商品数量加上已购买的数量已超过了最大限购数");
                //    var _message1 = '<i class="ico-tipsExc"></i>您购物车中的商品数量加上已购买的数量已超过了最大限购数！'
                //    showPrompt(_message1, 0, 1)
            } else {
                if (data == "暂时缺货" || data == "暂时缺货") {
                    data = "非常抱歉，本商品目前无货，暂时无法购买！";
                    showPrompt(data, 0, 1);
                }

                if (data != "商品已成功添加到购物车！") {
                    showPrompt(data, 0, 1);
                    return;
                }
                NewGetCartList();
                //var _message2 = '<i class="ico-tipsExc"></i>' + data
                //showPrompt(_message2, 0, 1);
                autoMoveCart();
                //数量气泡浮上
                $("#singleNum").show().stop().animate({
                    opacity: 1,
                    top: - 10
                }, 1000, function () {
                    $("#singleNum").stop().animate({
                        opacity: 0,
                        top: - 20
                    }, 1000, function () {
                        $("#singleNum").css('top', 20);
                    }).fadeOut();
                });
            }
        }
    });
}
/*有抛物线的购物车按钮*/
function PCreateCart(productId, quantity) {
    if (quantity == 0) {
        quantity = 1;
    }

    jQuery.ajax({
        url: "/cart/AddCart?id=" + productId + "&quantity=" + quantity + "&buyType=0&sellerCode=" + sellercode,
        type: "Get",
        dataType: "Json",
        cache: false,
        success: function (data) {
            $(".buyloading").hide();
            $("#bybuy").show();
            if (data != "商品已成功添加到购物车！") {
                showPrompt(data, 0, 1);
                return;
            }
            moveCartImg(); //抛物线
            NewGetCartList();
            if (typeof (GetCart) === "function") {
                GetCart();
            }
            if (typeof (rGetCartNumber) === "function") {
                rGetCartNumber();
            }
        }
    });
}

/* 套餐按钮*/
function GetPackageByProductId(obj) {
    //筛选一次 详情页模板显示的
    var data = [];
    var currentWareCode = $("#WareSkuCode").val() || ""; //商品ID
    for (var i = 0; i < obj.length; i++) {
        var kitSubList = obj[i].kitSubList;
        for (var j = 0; j < kitSubList.length; j++) {
            if (kitSubList[j].WareCode == currentWareCode && kitSubList[j].IsDetailShow) {
                data.push(obj[i]); //记录详情页显示的套餐
                break;
            }
        }
    }
    if (data.length <= 0)
        return;
    var Ytaozc = $("#Ytaozc");
    var txtYtaozc = $("#txtYtaozc")
    //var str = "";
    for (var i = 0; i < data.length; i++) {
        var oprice = data[i].OriginPrice;
        var pprice = data[i].KitPrice;


        //var packcartfun = "packcartfun2(this,\"" + data[i].PrmCode + "\",\"" + oprice + "\",\"" + pprice + "\");";
        //str += "<a  class='tobuypackage' href='javascript:void(0)' onclick='" + packcartfun + "'>" + data[i].PrmName + "<span class=\"Ygx\"></span></a>";
        var a = $("<a>").addClass("tobuypackage")
            .attr("href", "javascript:;")
            .html(data[i].PrmName + "<span class=\"Ygx\"></span>")
            .click({
                PrmCode: data[i].PrmCode,
                Oprice: oprice,
                Pprice: pprice,
                PrmName: data[i].PrmName
            }, function (event) {
                packcartfun2(this, event.data.PrmCode, event.data.Oprice, event.data.Pprice);
                $("#set_mealList a:contains('" + event.data.PrmName + "')").trigger("click");
                //如果两次点击同样的套餐,则再点击一次取消选择
                if (event.data.PrmName == $("#set_mealList .addLi_hover a").html() && $("#txtYtaozc .on").length == 0) {
                    $("#set_mealList a:contains('" + event.data.PrmName + "')").parent().removeClass("addLi_hover");
                }
            });

        txtYtaozc.append(a);
    }
    //$("#txtYtaozc").html(str);
    Ytaozc.show();

    //$("#txtYtaozc a").each(function () {
    //    $(this).click(function () {
    //        $("#set_mealList li").eq($(this).index() + 1).children().click();
    //        $("#set_mealList li").eq($(this).index() + 1).addClass('addLi_hover');
    //    })
    //});

}
function packcartfun2(obj, id, oprice, pprice) {
    //需求登记
    $("#SingleProductNum").val(pprice);
    $('#Y_neednum').val(1);
    if ($(obj).hasClass('on')) {
        $("#hPopVal,#h_ProductType").val(0);
        $(obj).removeClass("on");
        $('#product_amount').val(1); //重置购买数量为1
        $('#Y_neednum').val(0);
        $('#Y_NumModify').val(1);
        //if ($('#h_salePrice').val() !== "") {
        //    $('#ActivityMessage dd b').html($('#h_salePrice').val())
        //    var _Ylisheng1 = parseFloat($('#h_Price').val() - $('#h_salePrice').val()).ToMoney();
        //    if (_Ylisheng1 > 0) {
        //        $('#ActivityMessage label').html('立省：<span class="RMB">￥</span>');
        //        $('#ActivityMessage .Ylisheng').html(_Ylisheng1);
        //    }
        //} else {
        //    $('#ActivityMessage dd b').html($('#h_Price').val());
        //};
        if (isSeckill == null) {
            isSeckill = getSeckill(_a);
            if (!isSeckill) {
                GetActivityConcessionPrice(_a, _c, 1, 0, "ActivityMessage") //重新异步加载促销价格
            }
        }
        $("#ActivityMessT").hide()
        $("#ActivityMessage").show()
        jQuery("#buycartbutton01 ").show();
        jQuery("#buycartbuttonmore").hide();
        if (parseInt($('#h_SeckillNum').val()) >= parseInt($('#product_amount').val())) {
            var txt = '<span>特惠</span>';
            //$('#SkillTime').show();
            $('#ActivityMessage dt').html(txt);
            $('#ActivityMessage .Yprice').text('￥' + $('#h_salePrice').val());
            $('#pricenumber').text($('#h_SeckillPrice').val());
        } else {
            //$('#SkillTime').hide();
            $('#ActivityMessage dt span').hide();
            $('#pricenumber').text($('#h_salePrice').val());
        }
        return;
    } else {
        $(obj).attr("class", "tobuypackage on");
        $(obj).siblings('.on').removeClass();
        $("#hPopVal").val(1);
        $("#h_ProductType").val(0);
        if ($("#txtYliaoc a").hasClass("on")) {
            $("#txtYliaoc a").removeClass("on");
            $("#product_amount").val(1);
        }
        $('#ActivityMessage label').html("");
        $('#ActivityMessage label').html("");
        $('#ActivityMessage .Ylisheng').html("");
        $('#ActivityMessage dt').html("");
    }

    var _save = oprice - pprice
    $("#hPackageId").val(id);

    var str = "<dt>套餐价：</dt><dd><div class ='Ysaleprice'><span class=\"RMB YRMB\">￥</span><b id=\"pricenumber\">" + parseFloat(pprice).ToMoney() + "</b><p class='Yprice'><span class='RMB'>￥</span>" + parseFloat(oprice).ToMoney() + "</p></div><label>套餐立省：</label><span class='Ylisheng'><span class='RMB'>￥</span>" + parseFloat(_save).ToMoney() + "</span></dd>";

    jQuery("#ActivityMessT").html(str);
    jQuery("#ActivityMessT").show()
    jQuery("#ActivityMessage").hide()
    jQuery("#buycartbutton01 ").hide();
    jQuery("#buycartbuttonmore").show();
    $('#Y_NumModify').val(1);
}

function buyone(obj) {
    var _Yprice;
    if ($('#h_salePrice').val() !== "") {
        _Yprice = $('#h_salePrice').val()
    } else {
        _Yprice = $('#h_Price').val()
    };
    _Yprice = parseFloat(_Yprice).ToMoney();
    $('#ActivityMessage dd b').html(_Yprice);

    jQuery("#buycartbutton01 ,#ActivityMessage").show();
    jQuery("#buycartbuttonmore, #ActivityMessT").hide();
    $(obj).addClass('on');
    $(obj).siblings('.on').removeClass();
    $('#txtYliaoc a').removeClass();
    $('#product_amount').val(1)
    $('#Y_NumModify').val(1);
    //jQuery("#ActivityMessage").hide();
}

//判断产品的状态 0:立即购买 1：需求登记 2:到货通知
function DetermineTheStatusOfTheProduct() {
    var mainButtonClassName = $(".btnControl").attr("id");
    if (mainButtonClassName == "buycartbutton01" && document.getElementById('buycartbutton01').style.display != "none") {
        //立即购买
        return 0;
    };
    if (mainButtonClassName == "buy_bi1b" && document.getElementById('buy_bi1b').style.display != "none") {
        //需求登记
        return 1;
    };
    if (mainButtonClassName == "btnDaohuo" && document.getElementById('btnDaohuo').style.display != "none") {
        //到货通(暂无对应样式)
        return 2;
    };
    return 1; //主要是针对主商品显示了电话回访这个
}

//更新商品介绍
function UpdateProductIntroduction(data, productId) {

    //增加套餐显示
    var pkg = $('#pkgPro .pkg');
    if (pkg.length <= 0 || data.length <= 0) {
        return;
    }
    for (var i = 0; i < data.length; i++) {
        var div = $("<div>").addClass("pkg_info");
        var html = "<p class=\"pkg_t\">" + data[i].PrmDesc + "<span>节约<br />￥" + (data[i].OriginPrice - data[i].KitPrice).ToMoney() + "</span></p>";
        //循环显示套餐子商品
        var kitSubList = data[i].kitSubList || [];
        if (kitSubList.length == 1) {
            continue;
        }
        //等于一个子商品的套餐不做显示
        if (kitSubList.length > 3) {
            continue;
        }
        //大于三个子商品的套餐不做显示
        if (kitSubList.length == 3) {
            html += " <ul class=\"bgPkglist_s\">"; //等于三个的子商品套餐className调用不一样
        } else {
            html += " <ul class=\"bgPkglist\">";
        }
        var state = DetermineTheStatusOfTheProduct();
        for (var j = 0; j < kitSubList.length; j++) {
            if (kitSubList[j].IsKeyWare) {
                if (!kitSubList[j].IsRx) {
                    state = 0; //显示购物车按钮
                } else {
                    if (kitSubList[j].RxType == 0 || kitSubList[j].RxType == 1) {
                        state = 0; //购物车
                    } else if (kitSubList[j].RxType == 2 || kitSubList[j].RxType == 3) {
                        state = 1; //需求登记
                    } else {
                        state = 2; //缺货
                    }
                }
            }
            html += " <li class=\"pkg_clos\"><p class=\"pkg_pic\">{0}<img src=\"" + (kitSubList[j].Pic != "" && kitSubList[j].Pic != null && kitSubList[j].Pic != "无" ? kitSubList[j].Pic : window.urlConfig.multiDomain.res() + "/theme/default/img/nopic.jpg") + "\" />{1}</p><p>{0}" + kitSubList[j].WareName.replace(kitSubList[j].Model, '') + "{1}</p><p>规格：<span>" + kitSubList[j].Model + "</span></p> <p class=\"pkg_price\">门店价：" + kitSubList[j].Price.ToMoney() + "元</p><p class=\"pkg_num\">x" + kitSubList[j].Qty + "</p></li>";
            if (j != kitSubList.length - 1) {
                html += "<li class=\"pkg_plus\">+</li>";
            }

            html = html.replace(/\{0\}/g, kitSubList[j].WareCode != productId ? "<a href=\"/product/" + kitSubList[j].WareCode + ".shtml\" target=\"_blank\">" : "");
            html = html.replace(/\{1\}/g, kitSubList[j].WareCode != productId ? "</a>" : "");

        }
        html += "<li class=\"pkg_equal\">=</li>";
        html += "<li class=\"pkg_result\"><p class=\"pkg_oPrice\">原门店价：" + data[i].OriginPrice.ToMoney() + "元</p><p class=\"pkg_nPrice\"><span>" + data[i].KitPrice.ToMoney().toString().split('.')[0] + "</span><span class=\"fz20\">" + (data[i].KitPrice.ToMoney().toString().indexOf(".") > - 1 ? "." + data[i].KitPrice.ToMoney().toString().split('.')[1] : "") + "元</span></p>{button}</li>";
        var pkgstr = "";

        switch (state) {
            case 0:
                //立即购买
                pkgstr = "<p class=\"pkg_buy\"><span class=\"tbuy add_to_card\"  onclick=\"ctrActionsend('add_to_card');CreatePackageToCart2(" + data[i].PrmCode + ",1)\"></span></p>";
                break;
            case 1:
                //需求登记
                pkgstr = "<p class=\"pkg_buy\"><span class=\"rxbuy demand_registration\"  onclick=\"ctrActionsend('demand_registration');addPackage_rxNum(" + data[i].PrmCode + ",1,1)\"></span></p>";
                break;
            case 2:
                //到货通(暂无对应样式)
                //pkgstr = "<p class=\"\"><span class=\"inform-btn2\" onclick=\"daohuotips()\"></span></p>";
                pkgstr = "<p><span class=\"inform-btn2\"  onclick='daohuotips()'></span></p>";

                break;
            default:

        }
        html = html.replace(/\{button\}/g, pkgstr);
        html += "</ul>";
        if (data[i].Remark != null && data[i].Remark != "") {
            html += " <div class=\"pkg_comment\"><span class=\"pkg_c_ico\"></span> <p>" + data[i].Remark + "</p> </div>";
        }
        div.html(html);
        pkg.append(div);
    }


    ////增加活动--满数量特价
    //jQuery.ajax({
    //    url: "/Product/GetNowActivityList?productId=" + productId + "&PrmTypeCode=FullAmountSpecial",
    //    type: "Get",
    //    cache: true,
    //    dataType: "json",
    //    success: function (list) {
    //        if (list.length > 0) {
    //            $("#proAvt").show();
    //            var memberprice = parseFloat($("#pricenumber").text()) || 0;//商品当前销售价

    //            for (var j = 0; j < list.length; j++) {
    //                var special = list[j].Special || [];
    //                var ul = $(".avt_i_yh_info");
    //                for (var i = 0; i < special.length; i++) {
    //                    var num = special[i].LimitedAmount || 0;//满数量
    //                    var prmPrice = (special[i].PrmPrice || 0).ToMoney();   //促销价格
    //                    var totalM = (num * prmPrice).ToMoney();
    //                    var listM = ((memberprice - prmPrice) * num).ToMoney()
    //                    var li = $("<li>").addClass("haveC")
    //                    var p1 = $("<p>").addClass("avt_red").html(num + "件=" + totalM + "元<br />" + prmPrice + "元/件</p><p class=\"avt_ls\">立省<br />￥" + listM);
    //                    var p2;

    //                    //var str = "<p class=\"avt_red\">" + num + "件=" + totalM + "元<br />" + prmPrice + "元/件</p><p class=\"avt_ls\">立省<br />￥" + listM + "</p>";
    //                    var state = DetermineTheStatusOfTheProduct();
    //                    switch (state) {
    //                        case 0:
    //                            //立即购买
    //                            p2 = $("<p>").addClass("btnBuy").append($("<span class=\"add_to_card\" >").html("立即购买").attr("onclick", "PAddCart_new(num, $('#h_productId').val());"));
    //                            //str += "<p class=\"btnBuy\"><span onclick=\"$(\"#txtYliaoc Ynum:contains('data[i].PrmCode').trigger('click');PAddCart_new(" + data[i].PrmCode + ",$('#h_productId').val());\">立即购买</span></p>";
    //                            //str += "<p class=\"btnBuy\"><span onclick=\"ctrActionsend('add_to_card');CreatePackageToCart2(" + data[i].PrmCode + "," + num + ")\">立即购买</span></p>";
    //                            break;
    //                        case 1:
    //                            //需求登记
    //                            p2 = $("<p>").addClass("btnBuy").append($("<span class=\"demand_registration\">").html("需求登记").attr("onclick", "ctrActionsend('demand_registration'); addCart_rx1(" + num + ", _a);"));

    //                            break;
    //                        case 2:
    //                            //到货通
    //                            p2 = $("<p>").addClass("btnBuy").append($("<span>").html("到货通知").attr("onclick", "daohuotips();"));
    //                            break;
    //                        default:
    //                    }
    //                    li.append(p1);
    //                    li.append(p2);
    //                    ul.append(li);
    //                }
    //            }
    //        } else {
    //            if ($("#proYH").find('ul').children().length == 0) {
    //                $("#proYH").hide();
    //            }
    //        }
    //    }
    //});
    ////增加活动--满数量赠品
    //jQuery.ajax({
    //    url: "/Product/GetNowActivityList?productId=" + productId + "&PrmTypeCode=FullAmountGift",
    //    type: "Get",
    //    cache: true,
    //    dataType: "json",
    //    success: function (data) {
    //        if (data == null || data.length == 0) return;
    //        $("#proAvt").show();
    //        var html = '';
    //        var Temp = '';
    //        var pic180 = $("#Pic180").val();
    //        var WareName = $("#WareName").val();
    //        var SalePrice = $("#SalePrice").val() == '' ? 0 : parseInt($("#SalePrice").val());
    //        for (var z = 0; z < data.length; z++) {
    //            var Con = data[z].Condition || [];
    //            for (var j = 0; j < Con.length; j++) {
    //                Temp = '';
    //                Temp += " <div class=\"avt_i_mz\">";
    //                Temp += " <p class=\"avt_i_yh_l\"><img src=" + pic180 + " alt=" + WareName + "></p>";
    //                Temp += " <div class=\"avt_i_mz_r\">";
    //                Temp += " <dl>";
    //                //这里的价格有问题
    //                Temp += "     <dt> <p><b> " + WareName + " </b></p> <p class=\"avt_red\">";
    //                Temp += "<font id=\"proLimitedAmount\">" + Con[j].LimitedAmount + "</font>件";
    //                Temp += "=<font id=\"proLimitedMony\">" + (Con[j].LimitedAmount * SalePrice).ToMoney() + "</font>元 ＋0.1元获取</p></dt>";
    //                Temp += "     <dd><p class=\"btnBuy\">";
    //                var state = DetermineTheStatusOfTheProduct();
    //                switch (state) {
    //                    case 0:
    //                        Temp += "     <span class=\"add_to_card\"  onclick=\"ctrActionsend('add_to_card');PAddCart_new(" + Con[j].LimitedAmount + ", _a)\">立即购买</span>";
    //                        break;
    //                    case 1:
    //                        Temp += "     <span class=\"demand_registration\" onclick=\"ctrActionsend('demand_registration'); addCart_rx1(" + Con[j].LimitedAmount + ", _a);\">需求登记</span>";
    //                        break;
    //                    case 2:
    //                        Temp += "     <span class=\"add_to_card\" onclick=\"ctrActionsend('add_to_card');CreateCartjsonp(" + Con[j].PrmCode + "," + Con[j].LimitedAmount + ")\">立即购买</span>";
    //                        break;
    //                }

    //                Temp += "     </p></dd>";
    //                Temp += " </dl>";
    //                Temp += " <ul>";
    //                var gifs = Con[j].GiftSet || [];
    //                for (var i = 0; i < gifs.length; i++) {
    //                    Temp += "     <li>";
    //                    Temp += "     <p class=\"mz_img\">";
    //                    Temp += "     <a href=\"/product/" + gifs[i].PrmContentCode + ".shtml\" target=\"_blank\" title=\"" + gifs[i].PrmContentName + "\">";
    //                    Temp += "            <img warecode=\"" + gifs[i].PrmContentCode + "\"  src=\"" + window.urlConfig.multiDomain.res() + "/theme/default/img/nopic.jpg" + "\" alt=\"" + gifs[i].PrmContentName + "\">";
    //                    Temp += "       </a>";
    //                    Temp += "   </p>";
    //                    Temp += "    <p class=\"mz_title\">";
    //                    Temp += "       <a href=\"/product/" + gifs[i].PrmContentCode + ".shtml\" target=\"_blank\" title=\"" + gifs[i].PrmContentName + "\">" + gifs[i].PrmContentName + "</a>";
    //                    Temp += "                    <span>*" + gifs[i].SingleQty + "件</span>";
    //                    Temp += "                </p>";
    //                    Temp += "             </li>";
    //                }
    //                Temp += "        </ul>";
    //                Temp += "     </div>";
    //                Temp += " </div>";
    //                $("#proMZ").append(Temp);
    //            }
    //        }

    //        //异步获取图片并且设置对应图片
    //        getsetImg();
    //    }
    //});
}
function getsetImg(data) {

    if (data == null || data.length == 0)
        return;
    $(data).each(function () {
        if (this.value == '无') {
            $("img[warecode=" + this.key + "]").attr("src", window.urlConfig.multiDomain.res() + "/theme/default/img/nopic.jpg");
        } else {
            $("img[warecode=" + this.key + "]").attr("src", this.value);
        }
    });
    //var wareCodes = new Array();
    //$(".mz_img img").each(function () {
    //    var code = $(this).attr("warecode");
    //    if (code != undefined && wareCodes.indexOf(code) == -1) {
    //        wareCodes.push(code);
    //    }
    //});
    //jQuery.ajax({
    //    url: "/Product/GetProImg?Products=" + wareCodes.join(','),
    //    type: "Get",
    //    cache: true,
    //    dataType: "json",
    //    success: function (data) {
    //        if (data == null || data.length == 0) return;
    //        $(data).each(function () {
    //            if (this.value == '无') {
    //                $("img[warecode=" + this.key + "]").attr("src", window.urlConfig.multiDomain.res() + "/theme/default/img/nopic.jpg");
    //            } else {
    //                $("img[warecode=" + this.key + "]").attr("src", this.value);
    //            }
    //        });
    //    }
    //});
}

/* 套餐 20140825*/
function Ytaocan(productId) {
    jQuery.ajax({
        url: window.urlConfig.multiDomain.pc() + "/product/KitList?id=" + productId,
        type: "post",
        cache: false,
        dataType: "jsonp",
        jsonp: "callback",
        success: function (t) {
            liaochengList(_a); //疗程装 ok

            if (t == null)
                return;
            var str = "";
            var data = t.Result;
            if (data == null || data.length == 0) {
                return;
            }
            GetPackageByProductId(data);
            var _width = "", _coni = ""
            var obj = [], pkgcon = "", pkgtab = "<ul class=\"Ytab\">", pkgstr = "", str = "";
            var DPdata = [];
            var currentWareCode = $("#WareSkuCode").val() || ""; //商品ID
            if (currentWareCode == "") {
                throw new RangeError("当前商品的SkuCode未找到！");
            }
            for (var i = 0; i < data.length; i++) {
                var kitSubList = data[i].kitSubList;
                if (kitSubList.length == 1 && kitSubList[0].IsTemplateShow) {
                    DPdata.push(data[i]);
                }
                for (var j = 0; j < kitSubList.length; j++) {
                    //判断该套餐模板是否显示？
                    if (kitSubList[j].WareCode == currentWareCode && kitSubList[j].IsTemplateShow) {
                        obj.push(data[i]); //记录模板可显示的套餐？
                        break;
                    }
                }
            }
            pkgDP(DPdata);
            if (obj.length > 0) {
                $(".YPackage").show();

            }
            for (var k = 0; k < obj.length && k < 8; k++) {
                var pkglistLength = obj[k]["kitSubList"].length, isRx = false;
                if (pkglistLength <= 1)
                    continue;
                if (obj[k].HasRx) {
                    isRx = true;
                }
                var PrmSubtitle = obj[k].PrmSubtitle || "";
                if (k == 0 || pkgstr == '') {
                    pkgtab += "<li><a href=\"javascript:void(0)\" class=\"on\" onclick=\"Ytab(this)\">" + (PrmSubtitle == "" ? "优惠套餐" + (k + 1) : PrmSubtitle) + "</a></li>";
                    pkgstr += "<div class=\"YPk_c Ytabcon clearfix\">";
                } else {
                    pkgtab += "<li><a href=\"javascript:void(0)\" onclick=\"Ytab(this)\">" + (PrmSubtitle == "" ? "优惠套餐" + (k + 1) : PrmSubtitle) + "</a></li>";
                    pkgstr += "<div class=\"YPk_c Ytabcon" + k + " clearfix\" style=\"display:none;\">";
                }
                if (obj[k].PrmDesc != null && obj[k].PrmDesc != "") {
                    pkgstr += "<p class=\"YPk_tdes\">" + obj[k].PrmDesc + "</p>";
                }

                if (obj[k].Remark != null && obj[k].Remark != "") {
                    pkgstr += "<p class=\"YPk_des\"><b>药师点评：</b>" + obj[k].Remark + "</p>";
                }
                var state = DetermineTheStatusOfTheProduct();
                //主产品
                for (var j = 0; j < pkglistLength; j++) {
                    var datalist = obj[k]["kitSubList"][j];
                    if (datalist.IsKeyWare) {
                        if (!datalist.IsRx) {
                            state = 0; //非处方药显示加入购物车
                        } else {
                            if (datalist.RxType == 0 || datalist.RxType == 1) {
                                state = 0; //加入购物车
                            } else if (datalist.RxType == 2 || datalist.RxType == 3) {
                                state = 1; //需求登记
                            } else {
                                state = 2; //缺货
                            }
                        }
                    }
                    //套餐图片展示
                    if (datalist.WareCode == productId) {
                        pkgstr += "<div class=\"YPk_clz\">";
                        pkgstr += "<p class=\"Yimg\"><img src='" + ((datalist.Pic != "" && datalist.Pic != null && datalist.Pic != "无") ? datalist.Pic : window.urlConfig.multiDomain.res() + "/theme/default/img/nopic.jpg") + "' /> </p><p class=\"Ytit\">" + datalist.WareName + "</p>";
                        pkgstr += "<p class=\"Ypri\"> <span>￥" + datalist.Price.ToMoney() + "</span>x" + datalist.Qty + "件</p>";
                        if (pkglistLength > 1) {
                            pkgstr += "<span class=\"Yadd\">+</span>";
                        }
                        pkgstr += "</div>";
                    }
                    //套餐参数展示

                }
                //根据副产品个数 判断滚动条
                if (pkglistLength > 5) {
                    pkgstr += "<div class=\"YPk_cl\" style=\"overflow-x:scroll\">";
                } else {
                    pkgstr += "<div class=\"YPk_cl\">";
                }

                if (pkglistLength > 4) {
                    _width = (200 * pkglistLength - 200) + "px"
                    pkgstr += "<ul class=\"YPk_clist\" style=\"width:" + _width + "\">";
                } else {
                    pkgstr += "<ul class=\"YPk_clist\">";
                }
                //副产品
                for (var m = 0; m < pkglistLength; m++) {
                    var datalistfu = obj[k]["kitSubList"][m];
                    //套餐图片展示
                    if (datalistfu.WareCode != productId) {
                        pkgstr += "<li>";
                        pkgstr += "<p class=\"Yimg\"><a href=\"/product/" + datalistfu.WareCode + ".shtml\" target=\"_blank\">";
                        pkgstr += "<img src='" + ((datalistfu.Pic != "" && datalistfu.Pic != null && datalistfu.Pic != "无") ? datalistfu.Pic : window.urlConfig.multiDomain.res() + "/theme/default/img/nopic.jpg") + "' /></a>";
                        pkgstr += "</p><p class=\"Ytit\">";
                        pkgstr += "<a href=\"/product/" + datalistfu.WareCode + ".shtml\" target=\"_blank\">" + datalistfu.WareName + "</a></p>";
                        pkgstr += "<p class=\"Ypri\"> <span>￥" + datalistfu.Price.ToMoney() + "</span>x" + datalistfu.Qty + "件</p>";
                        pkgstr += "<span class=\"Yadd\">+</span>";
                        pkgstr += "</li>";
                    }
                    //套餐参数展示
                }
                //结算
                pkgstr += "</ul></div><div class=\"YPk_cr\"><h6>套餐更优惠</h6>";
                var _Save = obj[k].OriginPrice - obj[k].KitPrice
                pkgstr += "<p>套餐价：<b>￥" + obj[k].KitPrice.ToMoney() + "</b></p><p class=\"t_lt\">原　价：￥" + obj[k].OriginPrice.ToMoney() + "</p><p>优　惠：<span>￥" + _Save.ToMoney() + "</span></p>"
                var stockQty = obj[k]["StockQty"]
                switch (state) {
                    case 0:
                        //立即购买
                        pkgstr += "<p ><input type=\"button\" value=\" \"  class=\"Ybtn_gms add_to_card\"  onclick=\"CreatePackageToCart2(" + obj[k].PrmCode + ",1)\"/></p>";
                        break;
                    case 1:
                        //需求登记
                        pkgstr += "<p ><input type=\"button\" value=\" \" class=\"btn-need demand_registration\"  onclick=\"ctrActionsend('demand_registration');addPackage_rxNum(" + obj[k].PrmCode + ",1,1)\"/></p>";
                        break;
                    case 2:
                        //到货通
                        pkgstr += "<p><span class=\"inform-btn2\"  onclick='daohuotips()'></span></p>"
                        break;
                    default:

                }
                //判断套餐按钮 end

                pkgstr += "<span class=\"Ysum\">=</span></div><div class='h10'></div></div>";

                pkgstr += "</div>";

            }
            pkgtab += "</ul>";
            pkgcon = pkgtab + pkgstr;
            $("#YpkgPro").html(pkgcon);
            UpdateProductIntroduction(obj, productId); //2015.05.05新增,将套餐展示到商品介绍中
            if (typeof (CreateGetNeedRegList) == "function") {
                CreateGetNeedRegList(t); //第一次加载创建需求登记中的套餐列表
            }
        }
    });
}
/* 套餐2 20140825 暂无用处*/
function Ytaocan2(productId) {
    jQuery.ajax({
        url: kad_user_url + "/product/GetManyPackageByProductId?productid=" + productId,
        cache: false,
        dataType: "jsonp",
        jsonp: "callback",
        success: function (data) {
            if (data["status"] != "ok")
                return;
            if (data["lists"].length <= 0)
                return;
            $(".YPackage").show();
            var obj = data["lists"], pkgcon = "", pkgtab = "<ul class=\"Ytab\">", pkgstr = "", str = "";
            for (var i = 0; i < obj.length; i++) {
                var pkglistLength = obj[i]["PackageItems"].length, isRx = false;
                if (obj[i]["hasRX"]) {
                    isRx = true;
                }
                if (i == 0) {
                    pkgtab += "<li><a href=\"javascript:void(0)\" class=\"on\" onclick=\"Ytab(this)\">优惠套餐" + (i + 1) + "</a></li>";
                    pkgstr += "<div class=\"YPk_c Ytabcon clearfix\">";
                } else {
                    pkgtab += "<li><a href=\"javascript:void(0)\" onclick=\"Ytab(this)\">优惠套餐" + (i + 1) + "</a></li>";
                    pkgstr += "<div class=\"YPk_c Ytabcon clearfix\" style=\"display:none;\">";
                }
                if (obj[i]["Recommend"] != "") {
                    pkgstr += "<p class=\"YPk_des\"><b>药师点评：</b>" + obj[i]["Recommend"] + "</p>";
                }
                pkgstr += "<div class=\"YPk_cl\"><ul class=\"YPk_clist\">";
                //套餐产品输出循环 start
                for (var j = 0; j < pkglistLength; j++) {
                    var datalist = obj[i]["PackageItems"][j];
                    pkgstr += "<li>";
                    //套餐图片展示
                    if (datalist["ProductID"] == productId) {
                        pkgstr += "<p class=\"Yimg\"><img src='" + datalist["ProductThumb"] + "' /> </p><p class=\"Ytit\">" + datalist["PackageTitle"] + "</p>";
                    } else {
                        pkgstr += "<p class=\"Yimg\"><a href=\"http://www.360kad.com/product/" + datalist["ProductID"] + ".shtml\" target=\"_blank\"><img src='" + datalist["ProductThumb"] + "' /></a></p><p class=\"Ytit\"><a href=\"http://www.360kad.com/product/" + datalist["ProductID"] + ".shtml\" target=\"_blank\">" + datalist["PackageTitle"] + "</a></p>";
                    }
                    //套餐参数展示
                    pkgstr += "<p class=\"Ypri\"> <span>￥" + datalist["OriginPrice"] + "</span>x" + datalist["Quantity"] + "件</p>";
                    if (j != 0) {
                        pkgstr += "<span class=\"Yadd\">+</span>";
                    }
                    //加0.1元获取
                    if (parseInt(datalist["PackagePrice"]) == 0)
                    {
                        pkgstr += "<p class=\"pkg_hg\">加0.1元获取</p>";
                    }
                    pkgstr += "</li>";
                }
                //套餐产品输出循环 end
                //结算
                pkgstr += "</ul></div><div class=\"YPk_cr\"><h6>套餐更优惠</h6>";

                var pkgPrice = parseFloat(obj[i]["PackagePrice"]).ToMoney();
                var pkgPrice1 = pkgPrice.substr(0, pkgPrice.length - 3), pkgPrice2 = pkgPrice.substr(pkgPrice.length - 3, 3);
                pkgstr += "<p>套餐价：<b>￥" + pkgPrice1 + pkgPrice2 + "</b></p><p class=\"t_lt\">原　价：￥" + obj[i]["OriginPrice"] + "</p><p>优　惠：<span>￥" + obj[i]["Save"] + "</span></p><p>"
                "<input type=\"button\" value=\" \" class=\"Ybtn_gms\" /></p><span class=\"Ysum\">=</span></div>"
                var IsNoStock = obj[i]["IsNoStock"]
                if (IsNoStock == false) {
                    if (isRx) {
                        if (typeof (_rxtype) != "undefined" && _rxtype == "1") {
                            pkgstr += "<input type=\"button\" value=\" \" class=\"Ybtn_gms add_to_card\"   onclick=\"CreatePackageToCart2(" + obj[i]["PackageID"] + ",1)\"/></p><span class=\"Ysum\">=</span></div>";
                        } else {
                            pkgstr += "<input type=\"button\" value=\" \" class=\"Ybtn_gms demand_registration\"  onclick=\"ctrActionsend('demand_reg_pc');addPackage_rxNum(" + obj[i]["PackageID"] + ",1,1)\"/></p><span class=\"Ysum\">=</span></div>";
                        }
                    } else {
                        pkgstr += "<input type=\"button\" value=\" \" class=\"Ybtn_gms add_to_card\"  onclick=\"CreatePackageToCart2(" + obj[i]["PackageID"] + ",1)\"/></p><span class=\"Ysum\">=</span></div>";
                    }
                } else {
                    pkgstr += "<span class=\"inform-btn2 arrival_msg\">到货通知</span></p><span class=\"Ysum\">=</span></div>"
                }
                pkgstr += "</div>";
            }
            pkgtab += "</ul>";
            pkgcon = pkgtab + pkgstr;
            $("#pkgPro").html(pkgcon);
        }
    });
}
//套餐购买
function CreatePackageToCart(packageId) {
    CreatePackageToCart2(packageId, 1);
    //jQuery.ajax({
    //    url: "/cart/AddCart?id=" + packageId + "&quantity=" + quantity + "&buyType=1&sellerCode=" + sellercode,
    //    type: "GET",
    //    cache: false,
    //    success: function (data) {
    //        if (data != "true") {
    //            var _message = '<i class="ico-tipsExc"></i>' + data;
    //            showPrompt(data, 0, 1);
    //            return;
    //        }
    //        if (typeof (GetCart) === "function") {
    //            GetCart();
    //        }
    //        jQuery("#payshopcart").fadeIn("fast");
    //    }
    //});
}
//组合购买2,可以加数量参数
function CreatePackageToCart2(packageId, quantity) {
    jQuery.ajax({
        url: "/cart/AddCart?id=" + packageId + "&quantity=" + quantity + "&buyType=1&sellerCode=" + sellercode,
        type: "get",
        dataType: "json",
        cache: false,
        success: function (data) {
            $(".buyloading").hide();
            $("#bybuy").show();
            if (data != "商品已成功添加到购物车！") {
                showPrompt(data, 0, 1);
                return;
            }
            //moveCartImg();
            autoMoveCart();
            //数量气泡浮上
            $("#singleNum").show().stop().animate({
                opacity: 1,
                top: - 10
            }, 1000, function () {
                $("#singleNum").stop().animate({
                    opacity: 0,
                    top: - 20
                }, 1000, function () {
                    $("#singleNum").css('top', 20);
                }).fadeOut();
            });

            NewGetCartList();
            if (typeof (GetCart) === "function") {
                GetCart();
            }
            if (typeof (rGetCartNumber) === "function") {
                rGetCartNumber();
            }

        }
    });
}
//组合购买3,可以加数量参数
function CreatePackageToCart3(packageId, quantity) {
    $(".onloading").attr("class", "buyloading");
    $(".buyloading").show();
    $("#bybuy").hide();
    jQuery.ajax({
        url: "/cart/AddCart?id=" + packageId + "&quantity=" + quantity + "&buyType=1&sellerCode=" + sellercode,
        type: "get",
        dataType: "json",
        cache: false,
        success: function (data) {
            $(".buyloading").hide();
            $("#bybuy").show();
            if (data != "商品已成功添加到购物车！") {
                showPrompt(data, 0, 1);
                return;
            }
            moveCartImg();
            NewGetCartList();
            if (typeof (GetCart) === "function") {
                GetCart();
            }
            if (typeof (rGetCartNumber) === "function") {
                rGetCartNumber();
            }
        }
    });
}
/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
//左侧栏调用2014-8-26
//药师咨询列表
jQuery(document).ready(function () {
    YGetPagelist(_a, 1, 5); //药师咨询列表
    //咨询提交
    $(".Yzxly_email").hide();
    $("#Ytjcheck").click(function () {
        if ($("#Ytjcheck").is(':checked')) {
            $(".Yzxly_email").show();
        } else {
            $(".Yzxly_email").hide();
        }
    });
    $(".Yzxly .Ytype input").click(function () {
        var _Ytype = $(this).val()
        $('#Y_zxtype').val(_Ytype)
    });

});

//相关症状
function GetSymptom(productId) {
    jQuery.ajax({
        url: window.urlConfig.multiDomain.pc() + "/product/GetSymptom?productId=" + productId,
        type: "Get",
        dataType: "jsonp",
        jsonp: "callback",
        success: function (data) {
            if (data == null || data.length <= 0) {
                $("#xgzb").parent().hide();
                return;
            }

            var txt = "";
            for (i = 0; i < data.length; i++) {
                //var strs = data[i].SymptomName.split('|');
                //for (var j = 0; j < strs.length; j++) {
                txt += "<li><a target=\"_blank\" href=\"" + window.urlConfig.search + "?pageText=" + data[i] + "\">" + data[i] + "</a></li>";
                //}
            }
            $("#xgzb").html(txt)
        }
    });

}


//相似功效
function SimilarEffect(productId, commonName) {
    $.ajax({
        url: window.urlConfig.multiDomain.pc() + "/Product/GetWaregeneralnameList?productId=" + productId + "&count=6",
        type: "get",
        cache: false,
        dataType: "jsonp",
        jsonp: "callback",
        success: function (data) {
            var str = "";
            if (data.length <= 0) {
                $('#SimilarEffect').parent().hide();
                return;
            }
            var pic = '';
            for (var i = 0; i < data.length; i++) {
                pic = data[i].Pic180;
                if (pic == '' || pic == '无') {
                    pic = window.urlConfig.multiDomain.res() + "/theme/default/img/nopic.jpg";
                }
                str += "<li><p class='Yimg'><a target='_blank' href='/product/" + data[i].LinkId + ".shtml'>";
                str += "<img  title='" + data[i].ShowName + "' alt='" + data[i].ShowName + "' src='" + pic + "'></a></p>";
                str += "<p><a title='" + data[i].ShowName + "' href='/product/" + data[i].LinkId + ".shtml' target='_blank'>" + data[i].ShowName + "</a>"
                if (data[i].Advertisement != null) {
                    str += data[i].Advertisement
                };
                str += "</p> <p class='Ypri'>￥" + data[i].SalePrice.ToMoney() + "</p></li>";
            }
            $("#SimilarEffect").show();
            $('#SimilarEffect').parent().show();
            $("#SimilarEffect").html(str);

            //SimilarEffectList(data);
        }
    });
}

//下架商品的同类推荐列表
$(function () {
    if ($("#OffProductboxshow").length == 0)
        return; //如果不是下架商品
    GetRecommendProducts({
        pageType: "product",
        recomm: "similarrecomm",
        productId: _a,
        callback: function SimilarEffectList(data) {
            if (data == null || data.length == 0)
                return;
            var temp = '';
            var pic = '';
            temp += "<p class=\"ListTit\">同类商品</p>";
            temp += "<div class=\"OffListbox clearfix\">";
            temp += " <div class=\"boxshow\">";
            temp += "     <ul>";
            temp += "          <!--这里加入同类推荐-->";
            for (var i = 0; i < data.length; i++) {
                pic = data[i].Pic180;
                if (pic == '' || pic == '无') {
                    pic = window.urlConfig.multiDomain.res() + "/theme/default/img/nopic.jpg";
                }
                temp += "<li>";
                temp += "<a href=\"/product/" + data[i].WareSkuCode + ".shtml?ref=hotsale\" class=\"img\">";
                temp += "  <img title='" + data[i].WareName + "' alt='" + data[i].WareName + "' src='" + pic + "'>";
                temp += "</a>";
                temp += "<p class=\"name\">" + data[i].WareName + "</p>";
                if (data[i].Adv != null) {
                    temp += "<p class=\"ad\">" + data[i].Adv + "</p>";
                };
                temp += "<p class=\"RMB pri\">￥" + data[i].SalePrice.ToMoney() + "</p>";
                temp += "</li>";
            }
            temp += "      </ul>";
            temp += "    </div>";
            temp += "  </div>";
            $("#OffProductboxshow").append(temp);
        }
    });
})

//相似功效 end
//购买过该商品的人还买了
function alsobuy(productId) {
    $.ajax({
        url: "/product/AlsoBuy?productId=" + productId,
        type: "get",
        dataType: "json",
        json: "callback",
        success: function (data) {
            if (data.length <= 0) {
                $('#alsobuy_cart2').parent().hide();
                return;
            }
            var str = "";
            var str = "";
            for (var i = 0; i < data.length; i++) {
                pic = data[i].Pic180;
                if (pic == '' || pic == '无') {
                    pic = window.urlConfig.multiDomain.res() + "/theme/default/img/nopic.jpg";
                }
                str += "<li><p class='Yimg'><a target='_blank' href='/product/" + data[i].WareSkuCode + ".shtml?ref=alsobuy'>";
                str += "<img  title='" + data[i].WareName + "' alt='" + data[i].WareName + "' src='" + pic + "'></a></p>";
                str += "<p><a title='" + data[i].WareName + "' href='/product/" + data[i].ProductID + ".shtml?ref=hotsale' target='_blank'>" + data[i].WareName + "</a>" + data[i].Advertisement + "</p> <p class='Ypri'>￥" + data[i].SalePrice.ToMoney() + "</p></li>";
            }
            $("#alsobuy_cart2").show();
            $('#alsobuy_cart2').parent().show();
            $("#alsobuy_cart2").html(str);
        }
    });
}
//购买过该商品的人还买 end
//jQuery.cookie
jQuery.cookie = function (name, value, options) {
    if (typeof value != 'undefined') {
        options = options || {};
        if (value === null) {
            value = '';
            options.expires = - 1;
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
        var path = options.path ? '; path=' + (options.path) : '';
        var domain = options.domain ? '; domain=' + (options.domain) : '';
        var secure = options.secure ? '; secure' : '';
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

function ProductHistory() {
    $.ajax({
        url: urlConfig.multiDomain.pc() + "/Product/GetProductHistoryInfo",
        type: "Get",
        dataType: "jsonp",
        jsonp: "callback",
        success: function (data) {
            var $windowH = $(window).height();
            var arr01 = [];
            var list = "";
            var ids = "";
            if (data != "" && data != null) {
                for (var i = 0; i < data.length; i++) {
                    list = list + "<li><p class='Yimg'><a target='_blank' href='/product/" + data[i].LinkId + ".shtml'><img  title='" + data[i].ShowName + "' alt='" + data[i].WareName + "' src='" + data[i].Pic + "'></a></p><p class='title'><a href='/product/" + data[i].LinkId + ".shtml' target='_blank'>" + data[i].WareName + "</a></p><p class='price'>￥" + data[i].Price.ToMoney() + "</p></li>";
                }
                $("#historylist").html(list);
            }
        }
    });
}
//药师咨询列表+分页
function YGetPagelist(productId, pageIndex, pageSize) {
    $.ajax({
        url: window.urlConfig.multiDomain.pc() + "/Product/GetConsultingList?productId=" + productId + "&pageIndex=" + pageIndex + "&pageSize=" + pageSize,
        type: "get",
        cache: false,
        dataType: "jsonp",
        json: "callback",
        success: function (data) {
            if (data == "2") {
                // alert("请选择要咨询的商品！");
                showPrompt('<i class="ico-tipsCuo"></i>请选择要咨询的商品！', 0, 1);
            } else {
                var str = "";
                var page = "";
                if (pageIndex != 1) {
                    page = "<li><span onclick=\"YGetPagelist('" + productId + "'," + (pageIndex - 1) + "," + pageSize + ")\" class=\"Ypre\">上一页</span></li>";
                } else {
                    page = "<li><span class=\"YpreNo\">上一页</span></li>";
                }
                if (data.TotalCount > 0) {
                    //输出列表内容
                    for (var i = 0; i < data.Data.length; i++) {
                        if (data.Data[i].Status == 2)
                            continue; //作废的不显示
                        var UserName = data.Data[i].LoginName
                        if (UserName == null) {
                            UserName = "匿名用户";
                        }
                        var Answer = data.Data[i].ReplyContent;
                        if (Answer == null) {
                            Answer = "";
                        }
                        var CreateTiem = "";
                        var ReplyTiem = "";
                        if (data.Data[i].CreateTime != null)
                            CreateTiem = data.Data[i].CreateTime.replace("/", "-").replace("/", "-");
                        if (data.Data[i].ReplyDate != null)
                            ReplyTiem = data.Data[i].ReplyDate.replace("/", "-").replace("/", "-");
                        var rStatus = data.Data[i].Status;

                        if (i == (pageSize - 1))
                        {
                            str += "<li style=\"border-bottom:none;\">"
                        } else {
                            str += "<li>"
                        }
                        str += "<p class=\"Yyszx_t\"><span class=\"Yname\">" + UserName + "</span></p>"
                        str += "<div class=\"Yyszx_c clearfix\"><span class=\"Ytime\">" + CreateTiem + "</span><p>咨询内容：" + data.Data[i].Question + "</p></div>"
                        str += "<div class=\"Yyszx_d clearfix\"><span class=\"Ytime\">" + ReplyTiem + "</span><p><span>康爱多药师回复：</span>您好！" + Answer + "&nbsp;感谢您对康爱多的支持！祝您身体健康！</p></div></li>";
                    }
                    //输出页码 分页   当前第几页：pageIndex  每页数：pageSize   总数：TotalCount
                    if (data.TotalCount < pageSize) {
                        $("#Ypagec").parent().hide();
                    } else {
                        var temp = data.TotalCount / pageSize
                        var pagesum = Math.ceil(temp); //总页数

                        if (pageIndex < 10 && pagesum > 10) {
                            //当前页码小于10  总页数大于10
                            for (var j = 0; j < 10; j++) {
                                if ((j + 1) == pageIndex) {
                                    page += "<li><span onclick=\"YGetPagelist('" + productId + "'," + (j + 1) + "," + pageSize + ")\" class=\"on\">" + (j + 1) + "</span></li>"
                                } else {
                                    page += "<li><span onclick=\"YGetPagelist('" + productId + "'," + (j + 1) + "," + pageSize + ")\">" + (j + 1) + "</span></li>"
                                }
                            }
                            page += "<li><span class=\"Ypagedian\">...</span></li>"
                            page += "<li><span onclick=\"YGetPagelist('" + productId + "'," + pagesum + "," + pageSize + ")\">" + pagesum + "</span></li>"
                        } else if (pageIndex < 10 && pagesum < 11) //当前页码小于10  总页数小于11
                        {
                            for (var j = 0; j < pagesum; j++) {
                                if ((j + 1) == pageIndex) {
                                    page += "<li><span onclick=\"YGetPagelist('" + productId + "'," + (j + 1) + "," + pageSize + ")\" class=\"on\">" + (j + 1) + "</span></li>"
                                } else {
                                    page += "<li><span onclick=\"YGetPagelist('" + productId + "'," + (j + 1) + "," + pageSize + ")\">" + (j + 1) + "</span></li>"
                                }
                            }
                        } else {
                            //当前页码大于10
                            var spageIndex = pageIndex - 4; //当前页前面的页数显示
                            var bpageIndex = pageIndex + 6; //当前页后面的页数显示
                            if (bpageIndex > pagesum) {
                                //如果后面显示的页数比总页数大
                                bpageIndex = pagesum + 1
                            }
                            //3循环输出开始
                            page += "<li><span onclick=\"YGetPagelist('" + productId + "'," + 1 + "," + pageSize + ")\">" + 1 + "</span></li>"
                            page += "<li><span class=\"Ypagedian\">...</span></li>"
                            for (var j = spageIndex; j < bpageIndex; j++) {
                                if (j == pageIndex) {
                                    page += "<li><span onclick=\"YGetPagelist('" + productId + "'," + j + "," + pageSize + ")\" class=\"on\">" + j + "</span></li>"
                                } else {
                                    page += "<li><span onclick=\"YGetPagelist('" + productId + "'," + j + "," + pageSize + ")\">" + j + "</span></li>"
                                }
                            }
                            //3循环输出结束
                            if (pagesum > pageIndex + 5) {
                                page += "<li><span class=\"Ypagedian\">...</span></li>"
                                page += "<li><span onclick=\"YGetPagelist('" + productId + "'," + pagesum + "," + pageSize + ")\">" + pagesum + "</span></li>"
                            }
                        }

                        if (pagesum != pageIndex) {

                            page += "<li><span onclick=\"YGetPagelist('" + productId + "'," + (pageIndex + 1) + "," + pageSize + ")\" class=\"next\">下一页</span></li>"
                        } else {
                            page += "<li><span class=\"nextNo\">下一页</span></li>"
                        }
                        $("#Ypagec").html(page);
                    }

                    $("#Yyszx").html(str);
                }
            }
        }
    });
}

function ChangeDateFormat(time) {
    if (time != null) {
        var date = new Date(parseInt(time.replace("/Date(", "").replace(")/", ""), 10));
        var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
        var currentDate = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();

        var hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
        var Tmin = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
        var Seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
        return date.getFullYear() + "-" + month + "-" + currentDate + " " + hours + ":" + Tmin + ":" + Seconds;
    }
    return "";
}
//咨询提问
function isEmail(str) {
    var reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return reg.test(str);
}
//questionType 1: "商品问题";  2: "库存及配送";  3: "支付问题";  5: "促销及赠品"; default: "未知状态";
function YUPQues(productId) {
    if (!IsLogin()) {
        ToLogin();
        return;
    }
    var Rp_cont = $.trim($("#Yzxly_txt").val());
    var isSendID = $("#Ytjcheck");
    var isSend = "";
    var email = $.trim($("#Yzxly_email").val());
    var _type = $("#Y_zxtype").val()
    var emailcheck = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (isSendID.is(':checked')) {
        isSend = "true";
    } else {
        isSend = "false";
    };

    if (Rp_cont == "") {
        //alert("请输入需要咨询的内容！")
        var _message = '<i class="ico-tipsExc"></i>请输入需要咨询的内容！'
        showPrompt(_message, 0, 1)
    } else if (_type == "") {
        //alert("请选择咨询类型！")
        var _message1 = '<i class="ico-tipsExc"></i>请选择咨询类型！'
        showPrompt(_message1, 0, 1)
    } else if (isSend == "true") {
        isEmail(email)
        if (isEmail(email)) {
            YCreateQues(productId, _type, Rp_cont, isSend, email)
        } else {
            //alert("请输入正确的邮箱地址")
            var _message2 = '<i class="ico-tipsCuo"></i>请输入正确的邮箱地址！'
            showPrompt(_message2, 0, 1)
        }
    } else {
        YCreateQues(productId, _type, Rp_cont, isSend, email)
    }

}

function YCreateQues(productId, questionType, Rp_cont, isSend, email) {
    var urlstr = "/Product/CreateConsultingByWeb?productId=" + productId + "&questionType=" + questionType + "&question=" + escape(Rp_cont) + "&isSend=" + isSend;
    if (email != "") {
        urlstr += "&email=" + email;
    }
    $.ajax({
        type: "get",
        url: urlstr,
        cache: false,
        dataType: "JSON",
        //json: 'callback',
        success: function (data) {
            switch (data) {
                case "1":
                    alert("邮箱不能为空！");
                    break;
                case "2":
                    alert("请选择要咨询的商品！");
                    break;
                case "5":
                    alert("抱歉，系统升级中，暂时不能提交！(H)");
                    break;
                default:
                {
                    if (data == "0") {
                        $("#Yzxly_txt").val("");
                        $("#Yzxly_email").val("");
                        var _message = '<i class="ico-tipsDui"></i>您的咨询提交成功，请耐心等待药师回复！'
                        showPrompt(_message, 0, 1)
                    } else {
                        var _message1 = '<i class="ico-tipsCuo"></i>信息提交失败，请修改内容后重试！'
                        showPrompt(_message1, 0, 1)
                    }
                }
            }
        }
    })
}

//需求登记
//关闭dialog
function popClose(showname, showtype) {
    document.getElementById(showname).style.display = "none";
    if (showtype) {
        document.getElementById("layer").style.display = "none";
    }

}
//遮罩层2013-08-23
function poplayer(idname, closename, showtype) {
    var isIE = (document.all) ? true : false;
    var isIE6 = isIE && (navigator.userAgent.indexOf('MSIE 6.0') != - 1);
    var newbox = document.getElementById(idname);
    var closebtn = document.getElementById(closename);
    newbox.style.zIndex = "9999";
    newbox.style.display = "block"
    newbox.style.position = !isIE6 ? "fixed" : "absolute";
    newbox.style.top = newbox.style.left = "50%";
    newbox.style.marginTop = - newbox.offsetHeight / 2 + "px";
    newbox.style.marginLeft = - newbox.offsetWidth / 2 + "px";
    if (showtype) {
        if (document.getElementById("layer") == undefined) {
            var layer = document.createElement("div");
            layer.id = "layer";
            layer.style.width = layer.style.height = "100%";
            layer.style.position = !isIE6 ? "fixed" : "absolute";
            layer.style.top = layer.style.left = 0;
            layer.style.backgroundColor = "#000";
            layer.style.zIndex = "9998";
            layer.style.opacity = "0.4";
            document.body.appendChild(layer);
        } else {
            layer = document.getElementById("layer");
            document.getElementById("layer").style.display = "block";
        }
    }

    function layer_iestyle() {
        document.getElementById("layer").style.width = Math.max(document.documentElement.scrollWidth, document.documentElement.clientWidth)
        + "px";
        layer.style.height = $(document).height();
    }
    function newbox_iestyle() {
        newbox.style.marginTop = document.documentElement.scrollTop - newbox.offsetHeight / 2 + "px";
        newbox.style.marginLeft = document.documentElement.scrollLeft - newbox.offsetWidth / 2 + "px";
    }
    if (isIE) {
        document.getElementById("layer").style.filter = "alpha(opacity=60)";
    }
    if (isIE6) {
        if (showtype) {
            layer_iestyle();
        }
        newbox_iestyle();
        window.attachEvent("onscroll", function () {
            newbox_iestyle();
        })
        window.attachEvent("onresize", layer_iestyle)
    }
    if (closename != 0 && closebtn != null) {
        closebtn.onclick = function () {
            newbox.style.display = "none";
            if (showtype) {
                document.getElementById("layer").style.display = "none"
            };
        }
    }
}

var code; //在全局 定义验证码
function createCode() {
    code = "";
    var codeLength = 4; //验证码的长度
    var checkCode = document.getElementById("checkCode");
    if (checkCode == null) {
        return;
    }
    checkCode.value = "";

    var selectChar = new Array(2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z');

    for (var i = 0; i < codeLength; i++) {
        var charIndex = Math.floor(Math.random() * 32);
        code += selectChar[charIndex];
    }
    if (code.length != codeLength) {
        createCode();
    }
    checkCode.value = code;
}

function validate() {
    var inputCode = document.getElementById("input1").value.toUpperCase();

    if (inputCode.length <= 0) {
        //alert("请输入验证码！");
        var _message = '<i class="ico-tipsExc"></i>请输入验证码！'
        showPrompt(_message, 0, 1)
        return false;
    } else if (inputCode != code) {
        //alert("验证码输入错误！");
        var _message1 = '<i class="ico-tipsCuo"></i>验证码输入错误！'
        showPrompt(_message1, 0, 1)
        createCode();
        return false;
    } else {
        return true;
    }

}
//登录
function ToLogin() {
    poplayer('showLogOrReg', '', true);
}
//登录/注册
function getcheckboxon(obj) {
    if ($(obj).hasClass('on')) {
        $(obj).removeClass('on')
        $(obj).siblings('input').removeAttr('checked')
    } else {
        $(obj).addClass('on')
        $(obj).siblings('input').attr('checked', 'checked')
    }
}

function passwordtxtfocus(obj) {
    $(obj).hide()
    $('#UserPassword').focus()
    $('#UserPassword').show();

}

$(function () {
    $('#closeLog').click(function () {
        closeLogin();

    });
})
function closeLogin() {
    $(".txtError").children().text("");
    $("#UserName").val("邮箱/手机号/用户名").css("color", "#999");
    $("#UserPassword").val("");
    $(".p_input").children("input").removeClass("input_error");
    $(".p_input").children("i").removeClass('txt_error txt_right');
    $(".p_input").children("i.txt_icon").css('display', 'none');
    $('#EmailErr,#PasswordErr').css('display', 'none');
    $('.txtError').hide();
    popClose('showLogOrReg', true);
    nRegNum = 0;
}

/*flag true/false 成功/失败
 result  用户Id/失败信息
 code 0成功 其他失败
 Message 信息
 url url*/
//未知
function UserLogin() {
    var Email = $("#UserName").val();
    var Password = $("#UserPassword").val();
    $("#LoginError").html("");
    $('#EmailErr,#PasswordErr').addClass('txtError');
    var isPass = true;

    if (Password == "" || Password.length < 6 || Password.length > 20) {

        objName = "UserPassword";
        idstr = $("#" + objName).attr("id");
        $("span[data-valmsg-for=\"" + idstr + "\"]").text("密码长度应在6-20位之间!");
        $("div[data-valmsg-for=\"" + idstr + "\"]").css("display", "block");
        $("#" + objName).addClass("input_error");
        $("#" + objName).siblings("i").show().attr("class", "txt_icon txt_error");
        isPass = false;
    }

    if (!isPass) {
        return;
    }
    jQuery.ajax({
        url: kad_user_url + "/Login/AjaxLogin",
        type: "Post",
        data: "userName=" + Email + "&pass=" + Password,
        dataType: "jsonp",
        jsonp: "callback",
        success: function (data) {
            if (data.Result == true) {
                popClose('showLogOrReg', true);
                /*var productid = jQuery("#product_id_str").val();
                 if (productid > 0) {
                 AddCart_new(1, '', productid, '');
                 }*/
                GetHNavList();
                GetLogin();
                ctrActionsend('land_button_succ');
                /*if ($("#IsHave").html() != "暂时缺货(T)") {
                 if (nRegNum == 1) { ShowNeedRegBox(); InitCheckOrderMsg(); }
                 }*/

            } else {
                ctrActionsend('land_button_fail');
                if (data.Code == "UserName") {
                    objName = "UserName";
                    idstr = $("#" + objName).attr("id");
                    $("span[data-valmsg-for=\"" + idstr + "\"]").text(data.Message);
                    $("div[data-valmsg-for=\"" + idstr + "\"]").css("display", "block");
                    $("#" + objName).addClass("input_error");
                    $("#" + objName).siblings("i").show().attr("class", "txt_icon txt_error");
                } else if (data.Code == "UserPassword") {
                    objName = "UserPassword";
                    idstr = $("#" + objName).attr("id");
                    if (Password.length < 6 || Password.length > 20) {
                        $("span[data-valmsg-for=\"" + idstr + "\"]").text(data.Message);
                        $("div[data-valmsg-for=\"" + idstr + "\"]").css("display", "block");
                        $("#" + objName).addClass("input_error");
                        $("#" + objName).siblings("i").show().attr("class", "txt_icon txt_error");
                    } else {
                        $("span[data-valmsg-for=\"" + idstr + "\"]").text("密码不正确！");
                        $("div[data-valmsg-for=\"" + idstr + "\"]").css("display", "block");
                        $("#" + objName).addClass("input_error");
                        $("#" + objName).siblings("i").show().attr("class", "txt_icon txt_error");
                        $("#" + objName).val("");
                    }
                } else {
                    $("#LoginError").html(data.Result);
                }
            }
        }
    });
}
//账号密码验证
function txtfocus(obj) {
    var idstr = obj.id;
    var valText = $.trim($("div[data-valmsg-for=\"" + idstr + "\"]").text());
    var input_val = $(obj).val();

    if (input_val == "邮箱/手机号/用户名") {
        $(obj).css("color", "#333");
        $(obj).val("");
    } else {
        $(obj).css("color", "black");
    }
    $(obj).siblings(".txt_icon").hide().attr("class", "txt_icon");
    $(obj).addClass("input_hover").removeClass("input_error");
    $(obj).siblings(".txt_icon").hide().attr("class", "txt_icon");
    $("div[data-valmsg-for=\"" + idstr + "\"]").css("display", "none");
    if (valText == "") {
        $("div[data-valmsg-for=\"" + idstr + "\"]").css("display", "none");
        if ($.trim($(obj).val()).length == 0) {}
    } else {
        $("div[data-warnmsg-for=\"" + idstr + "\"]").css("display", "none");
        return true;
    }
}
var isOk = true;
function txtblur(obj) {
    var idstr = obj.id;
    $(obj).removeClass("input_hover");
    $("div[data-warnmsg-for=\"" + idstr + "\"]").css("display", "none");
    var isOk = true;
    var input_val = $(obj).val();
    if ($(obj).attr("data-val")) {
        if (typeof ($(obj).attr("data-val-regex")) != "undefined") {
            var pattern = $(obj).attr("data-val-regex-pattern");

            var regx = new RegExp(pattern);
            if (input_val == "") {
                $("div[data-valmsg-for=\"" + idstr + "\"]").css("display", "block")
                $("span[data-valmsg-for=\"" + idstr + "\"]").text($(obj).attr("data-val-required"));

                $(obj).addClass("input_error");
                $(obj).siblings(".txt_icon").show().attr("class", "txt_icon txt_error");
                return false;
            } else if (regx.test(input_val) == true && ($(obj).val() != "邮箱/手机号/用户名")) {
                $(obj).siblings(".txt_icon").show().attr("class", "txt_icon txt_right");
                $(obj).removeClass("input_error");
                return true;
            } else {
                $("div[data-valmsg-for=\"" + idstr + "\"]").css("display", "block");
                $("span[data-valmsg-for=\"" + idstr + "\"]").text($(obj).attr("data-val-regex"));
                $(obj).siblings(".txt_icon").show().attr("class", "txt_icon txt_error");
                return false;
            }
        }
        if (typeof ($(obj).attr("data-val-required")) != "undefined") {
            if ($.trim($(obj).val()) == 0) {
                $("div[data-valmsg-for=\"" + idstr + "\"]").css("display", "block")
                $("span[data-valmsg-for=\"" + idstr + "\"]").text($(obj).attr("data-val-required"));
                $(obj).addClass("input_error");
                $(obj).siblings(".txt_icon").show().attr("class", "txt_icon txt_error");
                isOk = false;
            } else {
                $(obj).removeClass("input_error");
                $(obj).siblings(".txt_icon").show().attr("class", "txt_icon txt_right");
            }
        }
        if (typeof ($(obj).attr("data-val-length")) != "undefined") {
            var data = $(obj).val();
            var max = $(obj).attr("data-val-length-max");
            var min = $(obj).attr("data-val-length-min");
            if (data.length < min || data.length > max) {
                $("div[data-valmsg-for=\"" + idstr + "\"]").css("display", "block");
                $("span[data-valmsg-for=\"" + idstr + "\"]").text($(obj).attr("data-val-length"));
                $(obj).addClass("input_error");
                $(obj).siblings(".txt_icon").show().attr("class", "txt_icon txt_error");
                isOk = false;
            } else {
                $(obj).removeClass("input_error");
                $(obj).siblings(".txt_icon").show().attr("class", "txt_icon txt_right");
            }

        }

        if (isOk) {
            $("div[data-valmsg-for=\"" + idstr + "\"]").css("display", "none");
            $("span[data-valmsg-for=\"" + idstr + "\"]").empty();
        }
    }

}
//提示框
function closets(obj, ishide) {
    // $(obj).parents('#showPrompt').hide()
    //不要改这个showPrompt

    ishide = ishide || false;
    popClose('showPrompt', ishide);
    //判断在到货通知状态下是否需要隐藏当前遮罩层
    if ($("#advances-layer").css("display") != "block") {
        $("#layer").hide();
    }
}
function surets() {
    //$('#showPrompt').hide()
    popClose('showPrompt', true);
}

//提示框 end
//type 0：空 1：叹号 2：勾 3：叉
//Opera 0：空 1：确定 2：确定+取消
//<span class="ico_exc"></span><span class="ico_dui"></span><span class="ico_cuo"></span>
function showPrompt(message, Opera, type) {

    //判断操作按钮
    if (Opera == 1) {
        switch (type) {
            case 0:
                //不要改这个showPrompt
                $('#showPrompt .go_sure').attr('onclick', 'diyfunction0()')
                break;
            case 1:
                $('#showPrompt .go_sure').attr('onclick', 'diyfunction1()')
                break;
            case 2:
                $('#showPrompt .go_sure').attr('onclick', 'diyfunction2()')
                break;
            case 3:
                $('#showPrompt .go_sure').attr('onclick', 'diyfunction3()')
                break;
        }
    } else {
        $('#showPrompt .go_Cancel').hide()
    }

    //显示界面
    //$('#showPrompt').show();

    $('#showPrompt .Bcon').html(message);
    poplayer('showPrompt', '', true);
}
//提示框 end
function getCookie(c_name) {
    if (document.cookie.length > 0) {
        c_start = document.cookie.indexOf(c_name + "=")
        if (c_start != - 1) {
            c_start = c_start + c_name.length + 1
            c_end = document.cookie.indexOf(";", c_start)
            if (c_end == - 1)
                c_end = document.cookie.length
            return unescape(document.cookie.substring(c_start, c_end))
        }
    }
    return ""
}
//处方药套餐购买
jQuery(document).ready(function () {
    GetProductIdPhone(_b); //处方药套餐购买

});

function GetProductIdPhone(productId) {
    if ($('#h_ProductId_Phone').length > 0 && $('#h_ProductType_Phone').length > 0) {
        $('#h_ProductId_Phone').val(productId);
        $('#h_ProductType_Phone').val(0);
    }
}
//   暂定为无用
function GetPackageByProductId2(productId) {
    if ($('#h_ProductId_Phone').length > 0 && $('#h_ProductType_Phone').length > 0) {
        $('#h_ProductId_Phone').val(productId);
        $('#h_ProductType_Phone').val(0);
    }
    jQuery.ajax({
        url: kad_user_url + "/Product/GetPackageListByProductId?productId=" + productId,
        type: "get",
        cache: false,
        dataType: "jsonp",
        jsonp: "callback",
        success: function (data) {
            if ($('#SingleProductNum').length > 0) {
                $('#SingleProductNum').val($('#pricenumber').html().replace("￥", ""));
            }
            if (data.length > 0) {
                var str = "";
                for (var i = 0; i < data.length; i++) {
                    var oprice = data[i].OriginPrice, pprice = data[i].PackagePrice;
                    var packcartfun = "packcartfun3(\"" + data[i].PackageID + "\",\"" + oprice + "\",\"" + pprice + "\")";
                    var buy1str = "<span><a class='tobuyone' href='javascript:void(0)'>一件体验装</a></span>";
                    str += "<span><a  class='tobuypackage' href='javascript:void(0)' onclick='" + packcartfun + "'>" + data[i].PackageTitle + "</a></span>";
                }
                $("#productpackagelist").html(buy1str + str);
                $("#productpackage").show();
                $(".infocon .marprice").hide();
                $(".tobuyone").click(function () {
                    $('#set_mealList li').removeClass('addLi_hover');
                    var pricenum = _c;
                    if ($('#h_rxotc').val() == "True") {
                        $(".price .pricespan").html("<span class='fred'>门店价 ： <label id='pricenumber'>￥" + pricenum + "</label></span>");
                    } else {
                        $(".price .pricespan").html("<span class='fred'>会员价 ： <label id='pricenumber'>￥" + pricenum + "</label></span>");
                    }
                    $('#set_mealList .tobuyone').parent('li').addClass('addLi_hover');
                    $('#SingleProductNum').val(pricenum);
                    var numstr = pricenum * parseInt($('#addNumber').val());
                    numstr = parseFloat(numstr).ToMoney();
                    $("#ViperPrice .ViperPrice_num").html("￥" + numstr);
                    if ($('#h_ProductType').val() == '0') {
                        var num1 = parseInt($('#addNumber').val());
                        AfterProductPrices(num1, _a);
                    }
                    jQuery("#buycartbutton01 ").show();
                    jQuery("#buycartbuttonmore").hide();
                    jQuery("#ActivityMessage").show();
                });
                $("#productpackagelist a").click(function () {
                    $("#productpackagelist a").css("color", "#666666");
                    $(this).css("color", "red");
                });
                $("#productpackagelist a").each(function (i) {
                    $(this).click(function () {
                        $('#set_mealList li').eq(i).find('a').click();
                    });
                });
            }

        }

    });
}
//正在加载切换
function LoadingSwitch() {
    $(".onloading").hide();
    $("#bybuy").show();
}

var nRegNum = 0;
/*  选项卡区域图片延迟加载 */
$(function () {
    $("img[original]").lazyload({
        placeholder: "http://skin.360kad.com/skin/kadad/index/blank.gif"
    });
});
function lazyloadTab(container) {
    container.find('img').each(function () {
        var original = $(this).attr("data-original");
        if (original) {
            $(this).attr('src', original).removeAttr('data-original');
        }
    });
}
/*end  选项卡区域图片延迟加载 */
var phoneValue;
var urlTxt;
function GoodsChecked() {
    //设置遮罩层以及到货通知层样式层级
    $("#layer").css("z-index", "9997");
    $("#advances-layer").css("z-index", "9998");
    phoneValue = $('#phone-input').val();
    var mailValue = $('#mail-input').val();
    var pId = $('#h_productId').val();
    var regMail = /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/; //验证邮箱
    var regCellPhone = /^[1][358]\d{9}$/; //验证手机

    if (($.trim(phoneValue) == '' || phoneValue == '请输入您的电话号码')) {
        //alert('请输入您的电话号码或者邮箱地址！');
        var _message = '<i class="ico-tipsExc"></i>请输入您的电话号码！'
        showPrompt(_message, 0, 1)
        return false;
    }

    //验证邮箱跟电话初始状态
    //if ($.trim(mailValue) == '' || mailValue == '请输入您的邮箱地址') {
    //    //alert('请输入您的电话号码或者邮箱地址！');
    //    var _message = '<i class="ico-tipsExc"></i>请输入您的邮箱地址！'
    //    showPrompt(_message, 0, 1)
    //    return false;
    //}

    //邮箱验证
    if ($.trim(mailValue) != '') {
        if (mailValue != '请输入您的邮箱地址' && $.trim(mailValue) != '' && !regMail.test($.trim(mailValue))) {
            //alert('请填写您正确的邮箱地址');
            var _message1 = '<i class="ico-tipsCuo"></i>请填写您正确的邮箱地址！'
            showPrompt(_message1, 0, 1)
            return false;
        }
    }
    if ($.trim(mailValue) == '' || mailValue == '请输入您的邮箱地址') {
        urlTxt = "&phone=" + phoneValue;
    } else {
        if ($.trim(phoneValue) != '请输入您的电话号码' && regCellPhone.test($.trim(phoneValue))) {
            urlTxt = "&phone=" + phoneValue + "&email=" + mailValue;
        } else {
            urlTxt = "&email=" + mailValue;
        }

    }
    //电话验证
    if ($.trim(phoneValue) != '') {

        if (phoneValue != '请输入您的电话号码' && !regCellPhone.test($.trim(phoneValue))) {

            //alert('请填写您正确的手机号码');
            var _message2 = '<i class="ico-tipsExc"></i>请填写您正确的手机号码！'
            showPrompt(_message2, 0, 1)
            return false;

        }
    }
    if ($.trim(phoneValue) == '' || phoneValue == '请输入您的电话号码') {
        urlTxt = "&email=" + mailValue;
    } else {
        if ($.trim(mailValue) != '请输入您的邮箱地址' && $.trim(mailValue) != '' && regMail.test($.trim(mailValue))) {
            urlTxt = "&phone=" + phoneValue + "&email=" + mailValue;
        } else {
            urlTxt = "&phone=" + phoneValue;
        }
    }
    if (!validate()) {
        return false;
    }
    $.ajax({
        url: "/product/ArrivalNotice?productId=" + pId + urlTxt,
        type: 'get',
        dataType: 'json',
        success: function (data) {
            var caseV = data['Code'];
            switch (caseV) {
                case 0:
                    var _messageError1 = '<i class="ico-tipsCuo"></i>' + data['Message']
                    showPrompt(_messageError1, 0, 1)
                    break;
                case 1:
                    var _messageSuccess = '<i class="ico-tipsDui"></i>订阅成功！'
                    $('#advances-layer').hide();
                    //$('#advances-layer .content').hide();
                    //$('#advances-layer .success').show();
                    $('#phone-input,#mail-input,#input1').val('');
                    showPrompt(_messageSuccess, 0, 1)
                    createCode();
                    break;
                case - 1:
                    $('#advances-layer').hide();
                    var _messageError = '<i class="ico-tipsCuo"></i>' + data['Message']
                    showPrompt(_messageError, 0, 1)
                    break;
            }
        }
    });
}

//插件-用户名邮箱后缀选择
(function ($) {
    $.fn.emailMatch = function (settings) {
        var defaultSettings = {
            emailTip: "邮箱/手机号/用户名",
            aEmail: ["sina.com", "163.com", "qq.com", "126.com", "vip.sina.com", "sina.cn", "hotmail.com", "gmail.com", "sohu.com", "139.com"],
            //邮件数组
            wrapLayer: "body",
            className: "mailListBox",
            emailRemember: true,
            autoCursor: false,
            position: "bottom",
            // bottom, left , right
            autoShow: true,
            // false:有@符号才显示
            IsCart: false,
            //购物车页面不减去两个像素
            width: 0,
            //自定义输入框的宽
            height: 0 //自定义输入框的高
        };
        /* 合并默认参数和用户自定义参数 */
        settings = settings ? $.extend(defaultSettings, settings) : defaultSettings;
        return this.each(function () {
            var elem = $(this), t = 0, l = 0,
                w = settings.width > 0 ? settings.width - 1 : elem.outerWidth() - 1,
                h = settings.height > 0 ? settings.height : elem.outerHeight(),
                selectVal = sMail = inputVal = "", arrayNum = 0,
                isIndex = - 1;

            switch (settings.position) {
                // 判断 列表位置
                case "bottom":
                    t = elem.position().top;
                    l = elem.position().left;
                    break;
                case "left":
                    t = elem.position().top - h;
                    l = elem.position().left - w;
                    break;
                case "right":
                    t = elem.position().top - h;
                    l = elem.position().left + w;
                    break;
                default:
                    t = elem.position().top;
                    l = elem.position().left;
            }

            var mailWrap = document.createElement("div");
            $(mailWrap).attr({
                "id": elem.attr("id"),
                "class": settings.className
            })
            $(settings.wrapLayer).append(mailWrap);
            if ($.trim(elem.val()) == "") {
                elem.val(settings.emailTip);
                elem.css("color", "#c1c1c1");
            };
            elem.focus(function () {
                /*如果elem元素开始是隐藏的，刚才取到的宽高值可能不准确，要用下面两行再取一次*/
                w = settings.width > 0 ? settings.width - 1 : elem.outerWidth() - 1;
                h = settings.height > 0 ? settings.height : elem.outerHeight();
                arrayNum = 0;
                if ($.trim(elem.val()) == settings.emailTip) {
                    elem.val('');
                    elem.css("color", "black");
                }; // 清空 输入框 提示内容
                if ($.trim(elem.val()) != "") {
                    inputVal = $.trim(elem.val());
                    isIndex = inputVal.indexOf("@");
                    if (isIndex >= 0) {
                        sMail = inputVal.substr(isIndex + 1);
                        inputVal = inputVal.substring(0, isIndex);
                        if (sMail != "") {
                            arrayNum = parseInt(!position(settings.aEmail, sMail) ? 0 : position(settings.aEmail, sMail));
                        }
                    }
                    if (settings.autoCursor) {
                        elem.val(inputVal);
                        if ($.browser.msie) {
                            setCaretAtEnd(elem.attr("id"));
                        }
                    }
                    if (settings.autoShow || isIndex >= 0) {
                        showList($(mailWrap), w, h, t, l, settings.position, elem, settings.IsCart);
                        createMailList(mailWrap, inputVal, sMail, settings.aEmail, arrayNum);
                    }
                };
            }).blur(function () {
                inputVal = $.trim(elem.val());
                isIndex = inputVal.indexOf("@");
                if (!settings.autoShow) {
                    if (elem.val() == '') {
                        elem.val(settings.emailTip);
                        elem.css("color", "#c1c1c1");
                        hideList($(mailWrap));
                        return false;
                    }; // 还原 输入框 提示内容
                }
                if (settings.autoShow || isIndex >= 0) {
                    enterVal(mailWrap, elem, settings.IsCart, settings.autoShow);
                }
                hideList($(mailWrap));

                if (!settings.IsCart) {
                    //验证
                    var obj = "#" + elem.attr("id");
                    var idstr = elem.attr("id");
                    $(obj).removeClass("input_hover");
                    $("div[data-warnmsg-for=\"" + idstr + "\"]").css("display", "none");
                    var isOk = true;
                    if ($(obj).attr("data-val")) {

                        if (typeof ($(obj).attr("data-val-regex")) != "undefined") {
                            var pattern = $(obj).attr("data-val-regex-pattern");
                            var regx = new RegExp(pattern);

                            if (!regx.test($(obj).val())) {
                                $("div[data-valmsg-for=\"" + idstr + "\"]").css("display", "block");
                                $("span[data-valmsg-for=\"" + idstr + "\"]").text($(obj).attr("data-val-regex"));
                                $(obj).siblings(".txt_icon").show().attr("class", "txt_icon txt_error");
                                $(obj).parents(".txtClass").addClass("p_error");
                                isOk = false;
                            } else {
                                $(obj).siblings(".txt_icon").show().attr("class", "txt_icon txt_right");
                                $(obj).parents(".txtClass").removeClass("p_error");
                            }
                        }
                        if (typeof ($(obj).attr("data-val-required")) != "undefined") {
                            if ($.trim($(obj).val()) == 0) {
                                $("div[data-valmsg-for=\"" + idstr + "\"]").css("display", "block");
                                $("span[data-valmsg-for=\"" + idstr + "\"]").text($(obj).attr("data-val-required"));
                                $(obj).siblings(".txt_icon").show().attr("class", "txt_icon txt_error");
                                $(obj).parents(".txtClass").addClass("p_error");
                                isOk = false;
                            } else {
                                if (isOk) {
                                    $(obj).siblings(".txt_icon").show().attr("class", "txt_icon txt_right");
                                    $(obj).parents(".txtClass").removeClass("p_error");
                                }
                            }
                        }

                        if (typeof ($(obj).attr("data-val-remote")) != "undefined") {
                            if ($.trim($(obj).val()).length > 0) {
                                var url = $(obj).attr("data-val-remote-url") + "?email=" + $(obj).val();
                                $.ajax({
                                    type: "get",
                                    url: url,
                                    cache: false,
                                    success: function (data) {
                                        if (!data) {
                                            $("div[data-valmsg-for=\"" + idstr + "\"]").css("display", "block");
                                            $("span[data-valmsg-for=\"" + idstr + "\"]").text($(obj).attr("data-val-remote"));
                                            $(obj).siblings(".txt_icon").show().attr("class", "txt_icon txt_error");
                                            $(obj).parents(".txtClass").addClass("p_error");
                                            isOk = false;
                                        } else {
                                            if (isOk) {
                                                $(obj).siblings(".txt_icon").show().attr("class", "txt_icon txt_right");
                                                $(obj).parents(".txtClass").removeClass("p_error");
                                            }
                                        }
                                    }
                                });
                            }
                        }
                        if (typeof ($(obj).attr("data-val-length")) != "undefined") {
                            var data = $(obj).val();
                            var max = $(obj).attr("data-val-length-max");
                            var min = $(obj).attr("data-val-length-min");
                            if (data.length < min || data.length > max) {
                                $("div[data-valmsg-for=\"" + idstr + "\"]").css("display", "block");
                                $("span[data-valmsg-for=\"" + idstr + "\"]").text($(obj).attr("data-val-length"));
                                $(obj).siblings(".txt_icon").show().attr("class", "txt_icon txt_error");
                                $(obj).parents(".txtClass").addClass("p_error");
                                isOk = false;
                            } else {
                                if (isOk) {
                                    $(obj).siblings(".txt_icon").show().attr("class", "txt_icon txt_right");
                                    $(obj).parents(".txtClass").removeClass("p_error");
                                }
                            }

                        }
                        if (typeof ($(obj).attr("data-val-equalto")) != "undefined") {
                            var objId = $(obj).attr("data-val-equalto-other").substring(2, $(obj).attr("data-val-equalto-other").length);
                            var data = $(obj).val();
                            var max = $(obj).attr("data-val-length-max");
                            var min = $(obj).attr("data-val-length-min");
                            if ($("#" + objId).val() != "" && $(obj).val() != "") {
                                if ($("#" + objId).val() != $(obj).val()) {
                                    $("div[data-valmsg-for=\"" + idstr + "\"]").css("display", "block");
                                    $("span[data-valmsg-for=\"" + idstr + "\"]").text($(obj).attr("data-val-equalto"));
                                    $(obj).siblings(".txt_icon").show().attr("class", "txt_icon txt_error");
                                    $(obj).parents(".txtClass").addClass("p_error");
                                    isOk = false;
                                } else if (data.length < min || data.length > max) {
                                    $("div[data-valmsg-for=\"" + idstr + "\"]").css("display", "block");
                                    $("span[data-valmsg-for=\"" + idstr + "\"]").text($(obj).attr("data-val-length"));
                                    $(obj).siblings(".txt_icon").show().attr("class", "txt_icon txt_error");
                                    //$("#" + objId).next().show().attr("class","txt_icon txt_error");
                                    $(obj).parents(".txtClass").addClass("p_error");
                                    isOk = false;
                                } else {
                                    if (isOk) {
                                        $(obj).siblings(".txt_icon").show().attr("class", "txt_icon txt_right");
                                        $("#" + objId).next().show().attr("class", "txt_icon txt_right");
                                        $(obj).parents(".txtClass").removeClass("p_error");
                                        $("#" + objId).parents(".txtClass").removeClass("p_error");
                                        $("div[data-valmsg-for=\"" + objId + "\"]").css("display", "none");
                                    }
                                }
                            }
                        }
                        if (isOk) {
                            $("div[data-valmsg-for=\"" + idstr + "\"]").css("display", "none");
                            $("span[data-valmsg-for=\"" + idstr + "\"]").empty();
                        }
                    }
                }
            });
            elem.keyup(function (e) {
                var suffixArray = [], eKey = e && (e.which || e.keyCode);
                //console.log(eKey);
                switch (eKey) {
                    case 9:
                        // tab 按键
                        return;
                        break;
                    case 13:
                    {
                        // 回车
                        enterVal(mailWrap, elem, settings.IsCart, settings.autoShow);
                        hideList($(mailWrap));
                    }
                        break;
                    case 38:
                    {
                        // 方向键 上
                        inputVal = $.trim(elem.val());
                        var keyIndex = inputVal.indexOf("@");
                        if (settings.autoShow || keyIndex >= 0) {
                            showList($(mailWrap), w, h, t, l, settings.position, elem, settings.IsCart);
                            cursorMove(mailWrap, - 1);
                        }
                    }
                        break;
                    case 40:
                    {
                        // 方向键 下
                        inputVal = $.trim(elem.val());
                        var keyIndex = inputVal.indexOf("@");
                        if (settings.autoShow || keyIndex >= 0) {
                            showList($(mailWrap), w, h, t, l, settings.position, elem, settings.IsCart);
                            cursorMove(mailWrap, + 1);
                        }
                    }
                        break;
                    default:
                    {
                        inputVal = $.trim(elem.val());
                        var keyIndex = inputVal.indexOf("@");
                        var suffix = "", suffixState = true;
                        if (keyIndex >= 0) {
                            suffix = inputVal.substr(keyIndex + 1);
                            inputVal = inputVal.substring(0, keyIndex);
                            $("#t2").text("BBB" + inputVal);
                            if (suffix != '' && settings.emailRemember) {
                                // 过滤数组
                                for (var i = 0; i < settings.aEmail.length; i++) {
                                    if (settings.aEmail[i].indexOf(suffix) == 0) {
                                        suffixArray.push(settings.aEmail[i]);
                                        suffixState = false;
                                    }
                                }
                            }
                            if (suffix != '' && !settings.emailRemember) {
                                // 当前高亮 选项
                                for (var i = 0; i < settings.aEmail.length; i++) {
                                    if (settings.aEmail[i].indexOf(suffix) == 0) {
                                        arrayNum = i;
                                        suffixState = false;
                                        break;
                                    }
                                }
                            }
                        }

                        suffixArray = suffixArray.length > 0 ? suffixArray : settings.aEmail;
                        if (inputVal == "" && suffix == "") {
                            hideList($(mailWrap));
                            arrayNum = 0;
                            createMailList(mailWrap, inputVal, suffix, settings.aEmail, arrayNum);
                        } else {
                            if (settings.autoShow || keyIndex >= 0) {
                                showList($(mailWrap), w, h, t, l, settings.position, elem, settings.IsCart);
                                createMailList(mailWrap, inputVal, suffix, suffixArray, arrayNum);
                            } else {
                                hideList($(mailWrap));
                                arrayNum = 0;
                                createMailList(mailWrap, inputVal, suffix, settings.aEmail, arrayNum);
                            }
                        }
                    }
                }

            });

            $(mailWrap).find("li:not('.first')").live('mouseover', function () {
                $(this).addClass("hover").siblings().removeClass("hover");
            });
            $(mailWrap).find("li:not('.first')").live('mousedown', function () {
                $(this).addClass("current").siblings().removeClass("current");
                enterVal(mailWrap, elem, settings.IsCart, settings.autoShow);
                hideList($(mailWrap));
            });
            $(mailWrap).bind("mouseout", function () {
                $(mailWrap).find("li:not('.first')").removeClass("hover");
            });
        });
    };

    function cursorMove(o, n) {
        var cursorList = $(o).find("li:not('.first')"), k = new Number();
        for (i = 0; i < cursorList.length; i++) {
            if (cursorList[i].className == "current") {
                k = i + n
                cursorList[i].className = "";
            };
        }
        if (k < 0)
            k = 0;
        if (k >= cursorList.length - 1)
            k = cursorList.length - 1;
        cursorList[k].className = "current";
    }

    function setCaretAtEnd(field) {
        // IE 系列浏览器 在自动光标跳回文档首问题
        var b = document.getElementById(field);
        if (b.createTextRange) {
            var r = b.createTextRange();
            r.moveStart('character', b.value.length);
            r.collapse();
            r.select();
        }
    }

    function position(array, value) {
        // 取得 元素在数组中的位置
        for (var i in array) {
            if (array[i] == value) {
                return i;
                break;
            }
        }
    };
    function enterVal(oWrap, elem, IsCart, autoShow) {
        if (!IsCart) {
            if ($(".mailListBox:first").css("display") != "none") {
                if (autoShow || elem.val().indexOf("@") != - 1) {
                    elem.val($(oWrap).find("li.current").text());
                }
            }
        } else {
            if (autoShow || elem.val().indexOf("@") != - 1) {
                if ($.trim(elem.val()) != "") {
                    elem.val($(oWrap).find("li.current").text());
                }
            }
        }
    };

    function showList(oElem, w, h, t, l, p, elem, IsCart) {
        // 显示 邮箱框架 并定位.
        switch (p) {
            // 判断 列表位置
            case "bottom":
                t = elem.position().top;
                l = elem.position().left;
                break;
            case "left":
                t = elem.position().top - h;
                l = elem.position().left - w;
                break;
            case "right":
                t = elem.position().top - h;
                l = elem.position().left + w;
                break;
            default:
                t = elem.position().top;
                l = elem.position().left;
        }
        var exWidth = 2;
        if (IsCart) {
            exWidth = 0;
        }
        oElem.css({
            "display": "block",
            "top": h + t,
            "left": l,
            "width": w - exWidth
        });
    };

    function hideList(oElem) {
        // 显示 邮箱框架
        oElem.css({
            "display": "none"
        });
    };

    function createMailList(oWrap, sVal, suffix, aEail, nK) {
        // 创建 候选列表
        if (nK < 0) {
            nK = 0;
        }
        if (nK > aEail.length - 1) {
            nK = aEail.length - 1;
        }
        var mailList = "<li class='first'><span>请选择邮箱类型</span></li>";
        var State = true; // 用户键入 后缀 是否匹配候选后缀 的状态

        for (k = 0; k < aEail.length; k++) {
            if (suffix != '' && aEail[k].indexOf(suffix) == 0) {
                State = false;
            }
        }

        nK = parseInt(suffix != '' && State && !position(aEail, suffix) ? 0 : nK);

        if (suffix != '' && State) {
            if (nK == 0) {
                mailList += '<li class="current"><span>' + sVal + '</span>@' + suffix + '</li>';
            } else {
                mailList += '<li><span>' + sVal + '</span>@' + suffix + '</li>';
            }
        }
        if ($.isArray(aEail)) {
            $.each(aEail, function (i) {
                if (State && suffix != '') {
                    if (i == (nK - 1)) {
                        mailList += '<li class="current"><span>' + sVal + '</span>@' + aEail[i] + '</li>';
                    } else {
                        mailList += '<li><span>' + sVal + '</span>@' + aEail[i] + '</li>';
                    }
                } else {
                    if (i == nK) {
                        mailList += '<li class="current"><span>' + sVal + '</span>@' + aEail[i] + '</li>';
                    } else {
                        mailList += '<li><span>' + sVal + '</span>@' + aEail[i] + '</li>';
                    }
                }
            });
        }
        mailList = "<ul>" + mailList + "</ul>";
        $(oWrap).html(mailList);
    };
})(jQuery);
//在/web2014/rightFixedBar.js中已经存在CheckUserName
//function CheckUserName() {


//    if ($.trim($("#UserName").val()) == "" || $.trim($("#UserName").val()) == "邮箱/手机号/用户名") {
//        $("#UserName").val("");
//    }
//    txtblur(document.getElementById("UserName"));
//    txtblur(document.getElementById("UserPassword"));
//    var email = $("#UserName").val();
//    var pwd = $("#UserPassword").val();
//    $.ajax({
//        url: "/Remote.aspx?Remote=/Login/IsExistUserName?UserName=" + email,
//        type: "get",
//        success: function (data) {
//            if (data.Result == 1) {
//                if (pwd.length >= 6 && pwd.length <= 20) {
//                    var options = {
//                        url: 'http://user.360kad.com/Login/AjaxLogin',
//                        success: function (data) {
//                            if (data.Flag == true) {

//                                window.location = data.Url;
//                            } else {
//                                var objName = "";
//                                var idstr = "";
//                                var text = "";

//                                if (data.Code == "1") {
//                                    objName = "UserName";
//                                    text = "登录名不存在！";
//                                }
//                                else if (data.Code == "2") {
//                                    objName = "UserPassword";
//                                    text = "密码不正确！";
//                                    $("#UserName").siblings(".txt_icon").show().attr("class", "txt_icon txt_right");
//                                }
//                                if (objName != "") {
//                                    idstr = $("#" + objName).attr("id");
//                                    $("div[data-valmsg-for=\"" + idstr + "\"]").css("display", "block");
//                                    $("span[data-valmsg-for=\"" + idstr + "\"]").text(text);
//                                    $("#" + objName).addClass("input_error");
//                                    $("#" + objName).siblings(".txt_icon").show().attr("class", "txt_icon txt_error");
//                                }
//                            }
//                        }, error: function () {
//                            alert("Error");
//                        }
//                    };
//                    //$("form").ajaxSubmit(options);
//                }
//            }
//            else if (data.Result == 0) {
//                objName = "UserName";
//                text = "登录名不存在！";
//                if (objName != "") {
//                    idstr = $("#" + objName).attr("id");
//                    $("div[data-valmsg-for=\"" + idstr + "\"]").css("display", "block");
//                    $("span[data-valmsg-for=\"" + idstr + "\"]").text(text);
//                    $("#" + objName).addClass("input_error");
//                    $("#" + objName).siblings(".txt_icon").show().attr("class", "txt_icon txt_error");
//                }
//                else {
//                    $(obj).removeClass("input_error");
//                    $(obj).siblings(".txt_icon").show().attr("class", "txt_icon txt_right");
//                }
//            }
//        }
//    });
//    UserLogin();
//}

//判断是否已经收藏
function HasCollect() {
    if (!IsLogin())
        return;
    $.ajax({
        url: "/Favorite/HasCollect?productId=" + _a,
        type: "GET",
        dataType: "json",
        json: "callback",
        success: function (data) {
            if (data.Code == 1)
                return;
            $("#Ycollection").addClass("on");
        }
    });
}



var domainUrl = window.urlConfig.multiDomain.pc();

function ctrTqBoxR() {
    var groupid = '463895184-1-13153666-11728-3';
    var customerid = "";
    var soruceurl = window.location.href;
    jQuery.ajax({
        url: "/User/GetUserId",
        type: "Get",
        dataType: "json",
        success: function (data) {
            if (data == null || data == "")
                return;
            customerid = data;
            var webchaturl = kad_chat_url + "/Chat/Customer/Index?GroupId=" + groupid + "&CustomerId=" + customerid + "&SourceUrl=" + soruceurl;
            window.open(webchaturl);
        }
    });
}


function newTqBoxR(groupId, productId, type) {
    var new_window = window.open("_blank");
    var requestUrl = domainUrl + "/Chat/GetSession";
    var sourceUrl = window.location.href;
    var webchaturl = "";
    jQuery.ajax({
        url: requestUrl,
        type: "get",
        data: {
            groupId: groupId,
            productId: productId,
            sourceUrl: sourceUrl
        },
        dataType: "json",
        success: function (data) {
            if (data.Data.Result == 0) //成功
            {
                //webchaturl=window. data.ChatWebUrl+"?SessionId="+data.Data.SessionId;
                webchaturl = window.urlConfig.multiDomain.pc() + "/Chat?SessionId=" + data.Data.SessionId;
                new_window.location.href = webchaturl;
                //window.open(webchaturl, $("#tqchatcs").attr("target"));

                //openFullWindow(webchaturl,'webchat');
            } else if (data.Data.Result == 1) //无效的请求参数
            {
                var _messageError1 = '<span class="ico_cuo"></span><p>无效的请求参数！</p>'
                showPrompt(_messageError1, 0, 1)
                //alert("无效的请求参数！");
            } else if (data.Data.Result == 2) //访问的分组没有在线的客服
            {
                //跳转到留言页
                webchaturl = window.urlConfig.help + '/custom/message';
                new_window.location.href = webchaturl;
                //window.open(webchaturl, $("#tqchatcs").attr("target"));
                //openFullWindow(webchaturl,'webchat');
            } else if (data.Data.Result == 3) //无效的分组
            {
                var _messageError1 = '<span class="ico_cuo"></span><p>无效的分组！</p>'
                showPrompt(_messageError1, 0, 1)
                //alert("无效的分组！");
            }


        }
    });
}



function openFullWindow(url, winname) {
    var strFeatures = "left=0,screenX=0,top=0,screenY=0,toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, status=no";
    if (window.screen) {
        //获取屏幕的分辨率
        var maxh = screen.availHeight - 30;
        var maxw = screen.availWidth - 10;
        strFeatures += ",height=" + maxh;
        strFeatures += "innerHeight" + maxh;
        strFeatures += ",width=" + maxw;
        strFeatures += "innerwidth" + maxw;
    } else {
        strFeatures += ",resizable";

    }

    window.open(url, winname, strFeatures);
}

/* 内容套餐  */
function pkgPro(data) {
    var _hasdata = false;
    if (!data) {
        return;
    }
    //开始遍历数据
    for (var i = 0; i < data.length; i++) {
        var _kitSubList = data[i].kitSubList;
        var pkglistCss = "bgPkglist", isRxPrice = "会员价：", isRx = false;
        //判断数据长度是否小于3 Start
        if (_kitSubList.length > 1 && _kitSubList.length < 4) {
            if (data[i]["hasRX"]) {
                isRxPrice = "门店价：";
                isRx = true;
            }
            if (_kitSubList.length > 2) {
                pkglistCss = "bgPkglist_s";
            }
            _hasdata = true;
            pkgstr += "<div class=\"pkg_info\"><p class=\"pkg_t\">" + data[i].PrmName + "<span>节约<br />￥" + data[i]["Save"].ToMoney() + "</span></p><ul class=\"" + pkglistCss + "\">";
            /*Start 输出套餐内容*/
            for (var j = 0; j < _kitSubList.length; j++) {
                var datalist = _kitSubList[j];
                pkgstr += "<li class=\"pkg_clos\">";
                if (datalist["WareCode"] == _a) {
                    pkgstr += "<p class=\"pkg_pic\"><img src='" + datalist["Pic"] + "' /> </p><p>" + datalist["WareName"] + "</p>";
                } else {
                    pkgstr += "<p class=\"pkg_pic\"><a href=\"http://www.360kad.com/product/" + datalist["WareCode"] + ".shtml\" target=\"_blank\"><img src='" + datalist["Pic"] + "' /></a></p><p><a href=\"http://www.360kad.com/product/" + datalist["WareCode"] + ".shtml\" target=\"_blank\">" + datalist["WareName"] + "</a></p>";
                }
                pkgstr += "<p>规格：<span>无参数</span></p> <p class=\"pkg_price\">" + isRxPrice + datalist["Price"].ToMoney() + "元</p>";
                pkgstr += "<p class=\"pkg_num\">x" + datalist["Qty"] + "</p>";
                /*if (parseInt(datalist["PackagePrice"]) == 0)
                 { pkgstr += "<p class=\"pkg_hg\">加0.1元获取</p>"; }*/
                pkgstr += "</li>";
                if (j < datalist.length - 1) {
                    pkgstr += "<li class=\"pkg_plus\">+</li>";
                } else {
                    pkgstr += "<li class=\"pkg_equal\">=</li>";
                }
            }
            /*END 输出套餐内容*/
        }
        //判断数据长度是否小于3 END
    }
    //结束遍历数据
    if (_hasdata) {
        $pkgstr += "</div>"
        $("#pkgPro").html(pkgstr);
    }
}


//到货通知
function daohuotips() {
    poplayer('advances-layer', 'advClose', true);
    $('#advances-layer .content').show();
    $('#advances-layer .success').hide();
}

Number.prototype.ToMoney = function () {
    var f_x = parseFloat(this).toFixed(2) || 0;
    return f_x;
    //以下代码是价格返回不超过2位小数点 并且结尾不为0
    //var pos_decimal = 0;
    //var decimalPart = f_x.toString().split('.')[1];
    //decimalPart = parseInt(decimalPart.split('').reverse().join('')) || 0;
    //if (decimalPart != 0) {
    //    pos_decimal = decimalPart.toString().length;
    //}
    //f_x = parseFloat(f_x);
    //return pos_decimal > 0 ? f_x.toFixed(pos_decimal) : f_x;

};


//购物车数量和金额 jsonp
function GetCartjsonp() {
    jQuery.ajax({
        type: "Get",
        url: "http://user.360kad.com/Cart/GetCart",
        cache: false,
        dataType: "jsonp",
        jsonp: "callback",
        success: function (data) {
            jQuery(".nums_show").html(data.cartCount);
            jQuery(".cartNum").html(data.cartCount);
            jQuery(".cartCount").html(data.cartCount);
            jQuery(".cartTotal").html(data.cartTotal);
        }
    });
}


/* 单品套餐 */
function pkgDP(data) {
    if (data.length > 0) {
        var pic180 = (data[0].kitSubList[0].Pic != "" && data[0].kitSubList[0].Pic != null && data[0].kitSubList[0].Pic != "无" ? data[0].kitSubList[0].Pic : window.urlConfig.multiDomain.res() + "/theme/default/img/nopic.jpg");
        var dpstr = "<div class=\"avt pkg_dp\"><p><img src=\"http://skin.360kad.com/skin/img/pkg_dp_t.png\" alt=\"51活动\" /></p><div class=\"avt_info\"><div class=\"avt_i_yh\">";
        dpstr += "<p class=\"avt_i_yh_l\"><img src=\"" + pic180 + "\" alt=\"" + data[0].kitSubList[0].WareName + "\" /></p>";
        dpstr += "<div class=\"avt_i_yh_r\"><p class=\"avt_i_yh_title\">" + data[0].kitSubList[0].WareName + "</p><ul class=\"avt_i_yh_info\">";
        for (var i = 0; i < data.length; i++) {
            if (i >= 4) {
                break;
            }
            var kitSubList = data[i].kitSubList;
            for (var j = 0; j < kitSubList.length; j++) {
                dpstr += "<li class=\"haveC\"><p class=\"avt_red\">" + kitSubList[j].Qty + "盒=" + data[i].KitPrice + "元<br />" + kitSubList[j].KitValue + "元/盒</p><p class=\"avt_ls\">立省<br/>￥" + parseFloat(data[i].OriginPrice - data[i].KitPrice) + "</p>";
                if (data[i].HasRx) {
                    dpstr += "<p class=\"btnBuy\"><span onclick=\"addPackage_rx(" + data[i].PrmCode + ")\">需求登记</span></p></p></li>";
                } else {
                    dpstr += "<p class=\"btnBuy\"><span onclick=\"CreatePackageToCart2(" + data[i].PrmCode + ",1)\">立即购买</span></p></p></li>";
                }
            }
        }
        dpstr += " </ul></div></div></div></div>";
        $("#pkgDP").html(dpstr);
    }
}

//免费领取优惠卷
function FreeCouponNew(activityID) {
    if (!IsLogin()) {
        ToLogin();
        return;
    }
    $.ajax({
        type: "GET",
        url: "http://user.360kad.com/Coupon/AddCusPrmote?procode=" + activityID,
        dataType: "jsonp",
        jsonp: "callback",
        success: function (data) {

            if (data.Result) {
                alert('领取成功');
                //showPrompt('<i class="ico-tipsCuo"></i>领取成功！', 0, 1);
            } else {
                alert(data.Message); //失败
                // showPrompt('<i class="ico-tipsCuo"></i>' + data + '！', 0, 1);
            }
        }
    });
}


function IsDobuleTime() {
    var a = new Date(2015, 11, 10, 18, 0, 0, 0);
    var b = new Date(2015, 11, 12, 20, 0, 0, 0);
    var d = new Date();
    var now = new Date(d.getFullYear(), d.getMonth() + 1, d.getDate(), d.getHours(), d.getMinutes(), d.getSeconds(), 0);
    if (now >= a && now < b) {
        return true;
    }
    return false;
}

var colorSpecJson;
var colorName;
var specName;
function ShowColorSpec() {
    $("#selColor").hide();
    $("#selDegrees").hide();
    $.ajax({
        type: "Get",
        url: "/product/GetColorSpec?wareSkuCode=" + _a + "&productCode=" + _d,
        cache: false,
        dataType: "jsonp",
        json: "callback",
        success: function (data) {
            if (!data.Data.IsShow) {
                $("#selColor").hide();
                $("#selDegrees").hide();
                return;
            }
            $("#product_model").hide();
            $("#selColor").show();
            $("#selDegrees").show();
            colorSpecJson = data.Data.PropertyGroupList;
            colorName = data.Data.PropertyName["颜色"];
            specName = data.Data.PropertyName["度数"];
            loadColor(data.Data.PropertyList["颜色"]);
            loadSpec(data.Data.PropertyList["度数"]);
        }
    });
}

function loadColor(color) {
    $("#ypColor").html("");
    for (var i = 0; i < color.length; i++) {
        var className = color[i].Name == colorName ? "on" : "";
        var colorSpec = color[i].Name + "-" + specName;
        if (colorSpecJson[colorSpec] == undefined) {
            className = "off";
        }
        var pic180 = (color[i].Pic180 == null || color[i].Pic180 == "无") ? urlConfig.res + "/theme/default/img/product/nopic_glasses.png" : color[i].Pic180;
        $("#ypColor").append("<a href=\"javascript:void(0)\" class='" + className + "' value=\"" + color[i].Name + "\"><img src=\"" + pic180 + "\" style=\"width:22px;height:22px;\">" + color[i].Name + "<span class=\"Ygx\"></span></a>");
    }
    colorCliek();
}

function loadSpec(spec) {
    $("#ypDegrees").html("");
    for (var i = 0; i < spec.length; i++) {
        var className = spec[i].Name == specName ? "on" : "";
        var colorSpec = colorName + "-" + spec[i].Name;
        if (colorSpecJson[colorSpec] == undefined) {
            className = "off";
        }
        $("#ypDegrees").append("<a class='" + className + "' value='" + spec[i].Name + "' href=\"javascript:void(0)\">" + spec[i].Name + "<span class=\"Ygx\"></span></a>");
    }
    specCliek();
}
function colorCliek() {
    $("#ypColor a").click(function () {
        if ($(this).hasClass("on"))
            return;
        $(this).siblings().removeClass("on");
        $(this).siblings().removeClass("off");
        $(this).removeClass("off");
        $(this).addClass("on");
        jump();
    })
}

function specCliek() {
    $("#ypDegrees a").click(function () {
        if ($(this).hasClass("on"))
            return;
        if ($(this).hasClass("off"))
            return;
        $(this).siblings().removeClass("on");
        $(this).addClass("on");
        jump();
    })
}

//选择跳转
function jump() {
    var color = $("#ypColor .on").attr("value");
    var spec = $("#ypDegrees .on").attr("value");
    var colorSpec = color + "-" + spec;
    var wareSkuCode = colorSpecJson[colorSpec];
    if (wareSkuCode == undefined) {
        $("#selDegrees").removeClass("selDegrees");
        $("#selDegrees").addClass("selDegrees_on");
        $("#ypDegrees a").removeClass("on");
        $("#ypDegrees a").each(function () {
            var thisSpec = $(this).attr("value");
            colorSpec = color + "-" + thisSpec;
            if (colorSpecJson[colorSpec] == undefined) {
                $(this).addClass("off");
            } else {
                $(this).removeClass("off");
            }
        });
        return;
    }
    $("#selDegrees").removeClass("selDegrees_on");
    $("#selDegrees").addClass("selDegrees");
    $(".onloading").show();
    window.location.href = "/product/" + wareSkuCode + ".shtml"
}

//获取该商品是否参与秒杀
function getSeckill(wareCode) {
    //    var date = new Date($.ajax({ async: false }).getResponseHeader("Date"));
    //    var bombay = date + (3600000 * 8);
    //    var time = new Date(bombay);
    //var _PriceMarket = $('#h_PriceMarket').val();
    //_PriceMarket = parseFloat(_PriceMarket).toFixed(2);
    var flag = false;
    $.ajax({
        type: "GET",
        url: "/product/CheckSeckill?wareCode=" + wareCode,
        dataType: "json",
        async: false,
        cache: false,
        success: function (data) {
            //            starttime = new Date(parseInt(data.Data.StartTime.replace("/Date(", "").replace(")/", ""), 10))
            //            endtime = new Date(parseInt(data.Data.EndTime.replace("/Date(", "").replace(")/", ""), 10))
            if (!data.Code && data.Data.Store && data.Data.IsTagShow) {
                if ($("#h_rxotc").val() == "True") {
                    priceName = "门店价："
                } else {
                    priceName = "特惠"
                }
                var s = "<dt><span>" + priceName + "</span></dt><dd><div class ='Ysaleprice'><span class=\"YRMB\">￥</span><b id=\"pricenumber\">" + data.Data.PrmPrice + "</b><p class='Yprice'>￥" + $('#h_salePrice').val() + "</p></div><label></label><span class='Ylisheng'></span></dd>";
                $("#navPrice").text(data.Data.PrmPrice);
                $('#ActivityMessage').html(s);
                $('#h_SeckillNum').val(data.Data.SingleQty);
                $('#h_SeckillPrice').val(data.Data.PrmPrice);
                //倒计时
                //var startTime = Math.round(new Date(parseInt(data.Data.StartTime.slice(6, -2))).getTime()),//服务器当前时间
                //                endTime = Math.round(new Date(parseInt(data.Data.EndTime.slice(6, -2))).getTime());//秒杀结束时间
                //                TimeCountDonw(startTime, endTime, 'SkillTime', null);
                if (data.Data.SingleQty) {
                    var txt = '以特惠价购买，每个会员仅限' + data.Data.SingleQty + '件';
                    $('#Promotion_active').show();
                    $('#XianGou').show();
                    $('#txtXianGou').text(txt);
                }
                // if($('#Y_NumModify').val() > data.Data.SingleQty){
                //     $('#ActivityMessage dt span').hide();
                //     $("#SkillTime").hide();
                // }
                flag = true;
            }
        }
    });
    return flag;
}
//倒计时
/*function TimeCountDonw(startTime, endTime, timesWarpID, callback) {

 this.startTime = startTime;  //获取当前时间,毫秒
 this.endTime = endTime;//结束时间,毫秒
 this.time = this.endTime - this.startTime; //开始和结束时相差的毫秒数
 if (this.time <= 1000) {  //如果已结到了结束时间了，那么就执行callback,回调函数
 callback && typeof callback == 'function' && callback.call(null);
 return; //时间到了就不必执行下面的代码，省点性能啦
 }

 var t, d, h, m, s,
 bd = document.getElementById(timesWarpID),
 foramt = function (a) {  //结式化，就是保证两位数咯
 return a < 10 ? '0' + a : a;
 };
 (function () {  //匿名函数
 this.time -= 1000;  //倒计时，每1秒减1000
 d = Math.floor(this.time / 1000 / 60 / 60 / 24);
 h = Math.floor(this.time / 1000 / 60 / 60 % 24);
 m = Math.floor(this.time / 1000 / 60 % 60);
 s = Math.floor(this.time / 1000 % 60);
 if(d == 0){
 t = '剩余：<span>' + foramt(h) + '</span>时<span>' + foramt(m) + '</span>分<span>' + foramt(s) + '</span>秒';
 }else{
 t = '剩余：<span>' + foramt(d) + '</span>天<span>' + foramt(h) + '</span>时<span>' + foramt(m) + '</span>分<span>' + foramt(s) + '</span>秒';
 }
 bd.innerHTML = t;
 if (this.time >= 1000) { //如果还没到结束时间的话1秒钟后调用自身 arguments.callee
 setTimeout(arguments.callee, 1000);
 return;
 }
 ;
 //时间到了的话就不执行上面的if了，直接回调函数callback了
 callback && typeof callback == 'function' && callback.call(null);
 })()
 }*/
//改了addON(this)、BuyQuantity(obj);


<?php
if(isset($_GET['categoryId']))
$categoryId=$_GET['categoryId'];
else $categoryId='';

require_once '../Business/toolbox/ItemProxy.php';
$factory=new ItemProxyFactory();
$proxy=$factory->getCustomerItemProxy();
$num=$proxy->getNumOfItemByCategoryId($categoryId);
$items=$proxy->getItemsByCategoryId($categoryId,1,5);
?>
<!DOCTYPE HTML>
<html lang="UTF-8">
<head>
    <!--<script language="javascript" type="text/javascript" src="http://res.360kad.com/script/envconfig.js"></script>
    <script language="javascript" type="text/javascript" async="async" src="http://ctr.360kad.com/ctrjs/ctr_v2.js"></script>
    <meta http-equiv="Cache-Control" content="no-transform" />
    <meta http-equiv="Cache-Control" content="no-siteapp" />-->
    <!--布局:www_category_list--><meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <!--部件开始:ProductListSEO,分组:页头部件-->
    <title>药品分类名</title>

    <!--部件结束:ProductListSEO-->

    <link href="css/baseM3.css" rel="stylesheet" type="text/css"/>
    <link href="css/headFooter.css" rel="stylesheet" type="text/css"/>
    <link href="css/Yprolist.css" rel="stylesheet" type="text/css"/>
    <script src="js/jquery-1.7.2.min.js" type="text/javascript"></script>
    <script src="js/jquery.lazyload.min.js" type="text/javascript"></script>
    <script src="js/jquery.jqzoom.js" type="text/javascript"></script>
    <!--  <script src="http://res1.360kad.com/script/web2014/publicsearch.js" type="text/javascript"></script>
        <script src="http://res2.360kad.com/script/jquery.cookie.js" type="text/javascript"></script>
        <script src="http://res1.360kad.com/script/web2014/newCommonJs2.js" type="text/javascript"></script>
        <script src="http://res4.360kad.com/script/web2014/rightFixedBar3.js" type="text/javascript"></script>
        <script src="http://res2.360kad.com/script/web2014/Yprolist.js" type="text/javascript"></script>
        <script src="http://res2.360kad.com/script/web2014/parabola.js" type="text/javascript"></script>
        <script src="http://res1.360kad.com/script/Recomm2.js" type="text/javascript"></script>

        <script type="text/javascript">
            /*
            $(function () {
                $(".wrap img").lazyload({ placeholder: "http://res.360kad.com/theme/default/img/www/grey.gif", threshold: 200, effect: "fadeIn" });
                var ids = [];
                $("#YproductList li > input[type='hidden']").each(function () {
                    ids.push($(this).val());
                });
                GetProductMinPrice(ids.join(","));
                jQuery.ajax({
                    type: "Get",
                    url: "/product/GetPriceByProductIds?productIds=" + ids.join(","),
                    success: function (data) {
                        for (var i = 0; i < data.length; i++) {
                            var div = $("#YproductList li > input[type='hidden'][value='" + data[i].Sku + "']").siblings("div");
                            if(div.length>0)
                            {

                                div.find(".Ypribox span:contains('￥')").html("￥" + data[i].SalePrice);
                                div.find(".Ypribox i").html("￥" + data[i].MarketPrice);
                                if(data[i].MarketPrice <= data[i].SalePrice)
                                {
                                    div.find(".Ypribox i").hide();
                                }
                                else{
                                    div.find(".Ypribox i").show();
                                }
                            }
                        }
                    }
                });

                //异步 获取促销标签 注释掉2015年7月27日11:12:51
                jQuery.ajax({
                    type: "Get",
                    cache: false,
                    url: "/product/GetProductPromoLabel?productIds=" + ids.join(","),
                    success: function (data) {
                        for (var i = 0; i < data.length; i++) {
                            var span = $("span[promotionsku='" + data[i].WareSkuCode + "']");
                            if (data[i].PromoLabel > 0) {
                                span.attr("class", "icon_promotion" + data[i].PromoLabel);
                            }
                        }
                    }
                });

                //关注排行
                GetRecommendSearchProducts({
                    recomm: "attentionlist",
                    productId: "783",
                    callback: gzphBack,
                });
            });
            */

            function gzphBack(data){
                var html="";
                if (data.length > 0) {
                    //组装推荐商品数据
                    $.each(data, function (i) {
                        var pic180=data[i].Pic180=="无"?"http://res.360kad.com/theme/default/img/nopic.gif":data[i].Pic180;
                        html += "<li>";
                        html += "<p class=\"Yimg\"><a href=\"/product/" + data[i].WareSkuCode + ".shtml?kzone=catehotproduct\" target=\"_blank\">";
                        html += "<img src=\"" + pic180 + "\" border=\"0\" alt=\"" + data[i].WareName + "\" title=\"" + data[i].WareName + "\"></a></p>";
                        html += "<p class=\"Yname\"><a href=\"/product/" + data[i].WareSkuCode + ".shtml?kzone=catehotproduct\" target=\"_blank\" title=\"" + data[i].WareName + "\">" + data[i].WareName;
                        if (data[i].Model!=null&&data[i].Model != "")
                            html += "<span class=\"Yspec\">" + data[i].Model + "</span></a></p>";
                        if (data[i].Adv!=null&&data[i].Adv != "")
                            html += "<p class=\"Yadv\">" + data[i].Adv + "</p>";
                        html += "<p class=\"RMB Ypri\">￥" + ToMoney(data[i].SalePrice) + "</p>";
                        html += "</li>";
                    });

                    $("#gzph").html(html);
                }
            }

            function GetProductMinPrice(prstr) {
                $.ajax({
                    url: urlConfig.search+"/Home/GetProductMinPrice?products=" +prstr,
                    type: "get",
                    dataType: "jsonp",
                    success: function (data) {
                        if (data.length <= 0)
                            return;
                        for (var i = 0; i < data.length; i++) {
                            if (data[i].Price <= data[i].SalePrice) {
                                continue;
                            }
                            var m = $("#promote_" + data[i].WareCode + " span").eq(0);
                            m.html("￥" + data[i].SalePrice + "<font style='font-size: 8px;margin-left: 5px;'>起</font>")

                        }

                    }
                });
            }
        </script>
        -->
    </head>
    <body>
    <!--部件开始:public_header,分组:页头部件-->
<!--部件开始:head_header_top2,分组:页头部件-->
<div class="header_top">
    <div class="header_t">
        <div class="header_t_l">
            <div class="YnewNoLogin">欢迎来到133号药铺 ！
                <a rel="nofollow" href="#">登录</a>
                <a rel="nofollow" href="#">注册</a></div>
            <ul class="YnewYesLogin">
                <li>欢迎回来！</li>
                <li class="YUserName"></li>
                <li class="Yout"></li>
            </ul>
        </div>
        <div class="header_t_r">
            <ul class="hNavList">
                <li class="Ywebnav">
                    <span class="Ycen"></span>
                    <span class="Yico_dian"></span>
                    <span class="tlast">网站导航</span>
                    <div class="Ytopnavdiv">
                        <dl>
                            <dt>专科用药</dt>
                            <dd><a href="#" target="_blank">肝胆科</a></dd>
                            <dd><a href="#" target="_blank">肠胃科</a></dd>
                        </dl>
                        <dl class="d2">
                            <dt>家庭用药</dt>
                            <dd><a href="" target="_blank">感冒发烧</a></dd>
                            <dd><a href="#" target="_blank">消炎清热</a></dd>
                            <dd><a href="#" target="_blank">日常护理</a></dd>
                        </dl>
                        <dl>
                            <dt>健康热点</dt>
                            <dd><a href="#" target="_blank">减肥瘦身</a></dd>
                            <dd><a href="#" target="_blank">两性健康</a></dd>
                        </dl>
                    </div>
                </li>
                <li class="YService">
                    <span class="Ycen"></span>
                    <span class="Yico_dian"></span>
                    <span class="tlast">客户服务</span>
                    <div class="Ytopnavdiv">
                        <dl class="Ytopnavdl">
                            <dd><a rel="nofollow" href="#" target="_blank">帮助中心</a></dd>
                            <dd><a rel="nofollow" href="#" target="_blank">联系我们</a></dd>
                            <dd><a rel="nofollow" href="#" target="_blank">投诉建议</a></dd>
                        </dl>
                    </div>
                </li>

                <li class="ttel" ><a href="tel:＋8618321873524">+86 &nbsp; 183-2187-3524</a></li>
                <li class="tcart">购物车<a href="#">0</a>件</li>
                <li class="Ymyorder">
                    <span class="Ycen"></span>
                    <span class="Yico_dian_a"></span>
                    <a rel="nofollow" href="#" class="tlast" style="text-align: center">我的订单</a>
                </li>
                <li class="Yaccount">
                    <span class="Ycen"></span>
                    <span class="Yico_dian"></span>
                    <a rel="nofollow" href="#" class="tlast" target="_blank">我的账户</a>
                    <div class="Ytopnavdiv">
                        <dl class="Ytopnavdl">
                            <dd><a rel="nofollow" href="#" target="_blank">我的处方</a></dd>
                            <dd><a rel="nofollow" href="#" target="_blank">收货地址</a></dd>
                        </dl>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</div>
<script>
    window.onresize = function () {
        if (document.body.offsetWidth < 1200) {
            $(".mainBody").css("width", "1200px"); $(".header_top").css("width", "1200px"); $(".wrap_footer").css("width", "1200px"); $(".nav").css("width", "1200px"); $(".Main_nav").css("width", "1200px"); $(".middleSide").css("width", "1200px"); $(".footer_list").css("width", "1200px"); $(".ZKbanner").css("width", "1200px"); $(".ZKnav").css("width", "1200px"); $(".sortBox").css("width", "1200px");
        } else { $(".mainBody").css("width", "100%"); $(".header_top").css("width", "100%"); $(".wrap_footer").css("width", "100%"); $(".nav").css("width", "100%"); $(".Main_nav").css("width", "100%"); $(".middleSide").css("width", "100%"); $(".footer_list").css("width", "100%"); $(".ZKbanner").css("width", "100%"); $(".ZKnav").css("width", "100%");$(".sortBox").css("width", "100%"); }
    }
</script>
<div class="header">
    <div class="header_l">
        <div class="header_logo">
            <a href="index.html"><img src="image/j133_logo.png" alt="Logo" title="Logo"></a>
        </div>
    </div>
    <!--部件开始:www_search_header3,分组:通用部件-->
    <div class="header_r">
        <form  name="search" id="searchForm" action="" method="get">
            <div class="header_search" id="txtSearchbox1">
                <input id="pageText" name="pageText" value="" class="stxt"  onfocus="SearchText(this,'txtSearchbox1')"  autocomplete="off"  />
                <input  type="submit" class="sbtn" value="搜索"   id="BtnSearchProdut">
            </div>
        </form>
        <!--搜索栏下面的药品名称-->
        <p class="header_r_d">
            <a target="_blank" href="＃">药品一</a>
            <a target="_blank" href="＃">药品二</a>
            <a target="_blank" href="＃">药品三</a>
            <a target="_blank" href="＃">药品四</a>
            <a target="_blank" href="＃">药品五</a>
            <a target="_blank" href="＃">药品六</a>
        </p>
    </div>
    <!--
    <style>

        /* 历史记录 */
        .search_history{width:508px;display:none; position:absolute;z-index:20;border: 1px solid #e6e6e6; left: -1px; top: 37px;background-color:#fff;height:270px;}
        .search_history_l{width:230px;float:left;border-right:solid 1px #e6e6e6;padding-top:5px;height:266px}.s_historylist li{cursor: pointer; font-size: 12px; line-height: 24px; height: 24px; padding: 0px 10px; color:#000;}
        .s_historylist li span,.search_history_t span{float:right;color:#767676;font-weight:bold;cursor:pointer;}.s_historylist li span{display:none;}
        .search_history_t{padding:0 10px;line-height:22px;color:#959595}.search_history_t span a{text-decoration:underline;color:#767676;font-weight:normal;}.s_historylist li a,#findContent li a{color:#000;}.s_historylist li a:hover,#findContent li a:hover{color:#000;text-decoration:none;}
        .search_history_r{width:215px;float:left;padding:8px 0px 8px 10px;height:254px;overflow:hidden}.search_history_r a{display:inline-block;height:24px;line-height:24px;margin-bottom:9px; padding:2px 5px;border:solid 1px #cfcfcf;white-space: nowrap; font-weight:normal;color:#000; margin-right:5px;}.search_history_r a:hover{color:#ff0000;border:solid 1px #ff0000;text-decoration:none;}
        .search_history_r p{color:#959595;padding-bottom:15px}.s_historylist label{cursor:pointer;}
        .no_history{color:#767676;text-align:center;padding-top:25px}.s_historylist li a{width:190px;display:inline-block;}


        .header {
            position: relative;
            width:1200px;
            z-index:22;

        }
        .header_rtime {
            display: none;
            background:url(http://res.360kad.com/theme/default/img/2014NewWeb/log_r_time.png) no-repeat;
            width: 160px;
            height: 30px;
            position: absolute;
            right: 16px;
            top: 20px;
            padding: 45px 0 0 82px;
            font-family: "微软雅黑";
            color: #fff;
        }
        .header_rtime:hover{color:#fff;}
        .header_rtime span {
            float: left;
            padding-right:20px;
            font-size: 10px;
            width: 24px;
            text-align: center;
        }
    </style>
    <a href="http://www.360kad.com/zhuanti/20151212_home.shtml" class="header_rtime" id="Countdown" target="_blank">
        <span>00</span><span>00</span><span>00</span><span style="padding-right:0;">00</span>
    </a>
    <script>
        ;(function(){
            if($('#Countdown').parents().find('.header').width() == 980) return;
            // 倒计时
            var $hotTime = new Date('2015/12/11 18:00:00').getTime(),
                    $crazyTime = new Date('2015/12/12 23:59:59').getTime(),
                    $readyTime = new Date('2015/12/11 18:00:00').getTime(),
                    $endTime = new Date('2015/12/12 23:59:59').getTime(),
                    $nowTime = new Date().getTime(),
                    time = $crazyTime - $nowTime, //结束时间减去当前时间  剩余
                    time1 = $hotTime - $nowTime,
                    time2 = $readyTime - $nowTime, //距离开始时间 小于0开始
                    $timebox = document.getElementById("Countdown"),
                    day, hours, min, sec;
            var $btnSwitch = 0;//初始值
            if(time2 < 0){
                time = $endTime - $nowTime;
            }
            function timeShow(){
                /*if (time2 < 0 && $btnSwitch == 0) {
                 $timebox.style.display = 'block';
                 $btnSwitch = 1;
                 };*/
                if(time < 0) return;
                //   day = checktime(Math.floor(time/1000/60/60/24)),
                hours = checktime(Math.floor(time/1000/60/60)),
                        min = checktime(Math.floor(time/1000/60%60)),
                        sec = checktime(Math.floor(time/1000%60));
                msec = checktime(Math.floor(time / 100 % 10));
                $timebox.innerHTML = '<span>' + hours + '</span><span>' + min + '</span><span>' + sec + '</span><span style="padding-right:0;">' + msec + '</span>';
                time -= 100;
                setTimeout(timeShow, 100)
            }
            function checktime(t){
                if(t < 10){
                    t = "0" + t
                }
                return t
            }
            if (time1 < 0 && $btnSwitch == 0 && time > 0) {
                $timebox.style.display = 'block';
                $btnSwitch = 1;
                var timeshow = timeShow();
            };
        })();
    </script>
    <script type="text/javascript">
        var search_Form = document.getElementById('searchForm');
        var page_Text = document.getElementById('pageText');
        search_Form.onsubmit = function(){
            if(!page_Text.value) return false;
        }
        $(function () {
            var curTime = new Date(); //获取当前的时间戳
            if (curTime.getTime() >= new Date("2015/12/12 23:59:59").getTime()) {
                // $(".header_r_d_a4").attr("href", "http://search.360kad.com/?pageText=%E4%B8%9C%E9%98%BF%E9%98%BF%E8%83%B6+&kzone+ssl_wz4");
                //$(".header_r_d_a4").text("东阿阿胶");
                $(".avt_t01").css("background","url(http://res.360kad.com/theme/default/img/atv_tbg.jpg) no-repeat;");
            }



            if ($("#s_history_r").length > 0) {
                $.ajax({
                    url: urlConfig.search + "/Home/GetHotKeyWords",
                    type: "Get",
                    dataType: "jsonp",
                    jsonp: "callback",
                    success: function (data) {
                        if (data.length > 0) {
                            for (var i = 0; i < data.length; i++) {
                                if(i==10){return}
                                var a=$("<a>").attr({ href: urlConfig.search + "/?pageText=" + encodeURIComponent(data[i])+"&kzone=resou", title: data[i]}).text(data[i]);
                                $("#s_history_r").append(a);
                            }
                        }
                    }
                });
            }

        });
    </script>
    <!--部件结束:www_search_header3-->
</div>
</div>

<div class="nav">
    <div class="navc  itmes_wrap">
        <!--主导航栏-->
                <!--部件结束:category_www_ProAll_liu-->
                <script type="text/javascript" src="js/11.js"></script>
        <!--部件结束:category_www_ProAll_liu-->

        <ul class="navclist">
            <li><a href="index.html" target="_blank">首页</a>
            </li>
            <li style="margin-top: 5px"><img src="image/rightBorder.png"><br><img src="image/rightBorder.png"></li>
        </ul>
    </div>
</div>

<script type="text/javascript">
    $(function(){
        //全部分类
        var $nodesLi = $(".kinds_lists").find("li");
        $nodesLi.hover(function () {
            $(this).addClass('act');
            $(this).find('.sideBox').show();
            $(this).find(".Line").show();
            $(this).find(".potiner_h").hide();
            $(this).css("backgroundImage","url(image/liIconHover.png)");
            $(this).css("background-repeat","no-repeat");
            $(this).find('.potiner_h').prev("a").css('color', '#ff0000');
        }, function () {
            $(this).removeClass('act');
            $(this).find('.sideBox').hide();
            $(this).find(".Line").hide();
            $(this).find(".potiner_h").show();
            $(this).css("backgroundImage","url(image/liIcon.png)");
            $(this).find('.potiner_h').prev("a").css('color', '#ffffff');
        });
    })
</script>
<!--部件结束:public_header-->

<!--头部文件 end-->
<!--部件开始:category_www_productListCrumbs,分组:类目部件-->
<div class="Crumbs" style="float: left;padding-left: 200px;">
    <b><a href="/">首页</a></b> &gt;
    <a href="" class="noIndx" target="_self" title="中西药品">分类</a>
    &gt;         <a href="" class="noIndx" target="_self" title="儿科">分类</a>
    &gt;         <a href="" class="noIndx" target="_self" title="小儿感冒发烧">药品名</a>

</div>
<!--部件结束:category_www_productListCrumbs-->

<!-- 内容主体 start -->
<div class="Ywrap">
    <!-- 内容左侧 start -->
<!--
    <div class="Yleft">
        <div class="Ywrapk">
            <!--部件开始:category_www_productList,分组:类目部件--
            <h5 class="Ytit"></h5>
            <ul class="YLinkList">
            </ul>
            <!--部件结束:category_www_productList--

        </div>

        <div class="Ywrapk">
            <h5 class="Ytit">看了最终选择</h5>
            <ul class="YproList" id="gzph">
            </ul>
        </div>
        <!--相关文章S-->
        <!--部件开始:RelatedArticle,分组:产品部件-->
        <!--部件结束:RelatedArticle-->

        <!--相关文章E--
    </div>
    <!-- 内容左侧 end -->
    <!-- 内容右侧 start -->
    <div class="Yright">
        <div class="YproList2 clearfix">
            <ul id="YproductList">
                <li>
                    <!--<input type="hidden" value=""/>-->
                    <div>
                        <p class="Ypic">
                            <a href="/product/1549359.shtml" target="_blank">
                                <img src="http://image.360kad.com/group1/M00/08/94/CgAgEVWKSaOABG-eAAJxIuJW5VE676.jpg_220x220.jpg" border="0" alt="葵花康宝 小儿氨酚烷胺颗粒 6g*12袋" title="葵花康宝 小儿氨酚烷胺颗粒 6g*12袋"  style="width:220px;height:220px"  />
                            </a>
                            <img src="http://res2.360kad.com/theme/default/img/search/yin_ico.gif" class="yin_ico" title="隐私配送" />
                            <span class="icon_promotion"  promotionsku="80361"></span>
                        </p>
                        <p class="Yname">
                            <span class="ico_otc"></span>
                            <a class="name" target="_blank" href="/product/1549359.shtml" title="葵花康宝 小儿氨酚烷胺颗粒 6g*12袋">
                                葵花康宝 小儿氨酚烷胺颗粒 6g*12袋
                                <span class="Yspec"></span>
                            </a>
                        </p>
                        <p class="Yadv">缓解儿童普通感冒及流行性感冒引起的发热、头痛、四肢酸痛、打喷嚏、流鼻涕、鼻塞、咽痛！</p>
                        <p class="Ypribox" id="promote_80361">
                            <span class="RMB">￥15.80</span>
                            <i class="RMB">￥19.5</i>
                        </p>
                        <p class="Yhave"><span></span></p>
                    </div>
                </li>
                <li>
                    <input type="hidden" value="75542"  />
                    <div>
                        <p class="Ypic">
                            <a href="/product/1182125.shtml" target="_blank"><img src="http://image.360kad.com/group1/M00/25/34/CgAgEVb9UluAcQ2zAAGnY8ZBhvY218.jpg_220x220.jpg" border="0" alt="圣泰 小儿热速清颗粒 2g*6袋" title="圣泰 小儿热速清颗粒 2g*6袋"  style="width:220px;height:220px"  /></a>
                            <img src="http://res4.360kad.com/theme/default/img/search/yin_ico.gif" class="yin_ico" title="隐私配送" />
                            <span class="icon_promotion"  promotionsku="75542"></span>
                        </p>
                        <p class="Yname">
                            <span class="ico_otc"></span>
                            <a class="name" target="_blank" href="/product/1182125.shtml" title="圣泰 小儿热速清颗粒 2g*6袋">
                                圣泰 小儿热速清颗粒 2g*6袋
                                <span class="Yspec"></span>
                            </a>
                        </p>
                        <p class="Yadv">门店活动:低至14.5元/盒起！</p>
                        <p class="Ypribox" id="promote_75542">
                            <span class="RMB">￥15.80</span>
                            <i class="RMB">￥22</i>
                        </p>
                        <p class="Yhave"><span></span></p>
                    </div>
                </li>
                <li>
                    <input type="hidden" value="33589"  />
                    <div>
                        <p class="Ypic">
                            <a href="/product/25457.shtml" target="_blank"><img src="http://image.360kad.com/group1/M00/0C/B6/CgAgEVYt6teAGmuAAAKCoDTTogY30.jpeg_220x220.jpg" border="0" alt="同仁堂 小儿至宝丸 1.5g*10丸" title="同仁堂 小儿至宝丸 1.5g*10丸"  style="width:220px;height:220px"  /></a>
                            <img src="http://res3.360kad.com/theme/default/img/search/yin_ico.gif" class="yin_ico" title="隐私配送" />
                            <span class="icon_promotion"  promotionsku="33589"></span>
                        </p>
                        <p class="Yname">
                            <span class="ico_rx"></span>
                            <a class="name" target="_blank" href="/product/25457.shtml" title="同仁堂 小儿至宝丸 1.5g*10丸">
                                同仁堂 小儿至宝丸 1.5g*10丸
                                <span class="Yspec"></span>
                            </a>
                        </p>
                        <p class="Yadv">门店活动：低至21元/盒。疏风镇惊，化痰导滞。用于小儿风寒感冒，停食停乳，发热鼻塞，咳嗽痰多，呕吐泄泻。</p>
                        <p class="Ypribox" id="promote_33589">
                            <span class="RMB">￥21</span>
                            <i class="RMB">￥28</i>
                        </p>
                        <p class="Yhave"><span></span></p>
                    </div>
                </li>
                <li>
                    <input type="hidden" value="35084"  />
                    <div>
                        <p class="Ypic">
                            <a href="/product/26952.shtml" target="_blank"><img src="http://image.360kad.com/group1/M00/1E/C7/CgAgEVbGuXiAfQ9GAAJ6IAzG44A64.jpeg_220x220.jpg" border="0" alt="同仁堂 儿童清肺丸 3g*10丸" title="同仁堂 儿童清肺丸 3g*10丸"  style="width:220px;height:220px"  /></a>
                            <img src="http://res3.360kad.com/theme/default/img/search/yin_ico.gif" class="yin_ico" title="隐私配送" />
                            <span class="icon_promotion"  promotionsku="35084"></span>
                        </p>
                        <p class="Yname">
                            <span class="ico_otc"></span>
                            <a class="name" target="_blank" href="/product/26952.shtml" title="同仁堂 儿童清肺丸 3g*10丸">
                                同仁堂 儿童清肺丸 3g*10丸
                                <span class="Yspec"></span>
                            </a>
                        </p>
                        <p class="Yadv">【门店活动】：低至18元/盒起！</p>
                        <p class="Ypribox" id="promote_35084">
                            <span class="RMB">￥18</span>
                            <i class="RMB">￥30</i>
                        </p>
                        <p class="Yhave"><span></span></p>
                    </div>
                </li>
                <li>
                    <input type="hidden" value="999550"  />
                    <div>
                        <p class="Ypic">
                            <a href="/product/20743.shtml" target="_blank"><img src="http://image.360kad.com/group1/M00/07/70/CgAgEVWKQ0SAbdZjAAENoBxz-TA128.jpg_220x220.jpg" border="0" alt="倍肯 小儿热速清颗粒 6g*6袋" title="倍肯 小儿热速清颗粒 6g*6袋"  style="width:220px;height:220px"  /></a>
                            <img src="http://res3.360kad.com/theme/default/img/search/yin_ico.gif" class="yin_ico" title="隐私配送" />
                            <span class="icon_promotion"  promotionsku="999550"></span>
                        </p>
                        <p class="Yname">
                            <span class="ico_rx"></span>
                            <a class="name" target="_blank" href="/product/20743.shtml" title="倍肯 小儿热速清颗粒 6g*6袋">
                                倍肯 小儿热速清颗粒 6g*6袋
                                <span class="Yspec"></span>
                            </a>
                        </p>
                        <p class="Yadv"></p>
                        <p class="Ypribox" id="promote_999550">
                            <span class="RMB">￥16.50</span>
                            <i class="RMB">￥22</i>
                        </p>
                        <p class="Yhave"><span></span></p>
                    </div>
                </li>
                <li>
                    <input type="hidden" value="35183"  />
                    <div>
                        <p class="Ypic">
                            <a href="/product/27051.shtml" target="_blank"><img src="http://image.360kad.com/group1/M00/07/C4/CgAgEVWKRPOAb8g5AAJEcHosuTU049.jpg_220x220.jpg" border="0" alt="同仁堂 小儿退热合剂（口服液） 10ml*6瓶" title="同仁堂 小儿退热合剂（口服液） 10ml*6瓶"  style="width:220px;height:220px"  /></a>
                            <img src="http://res1.360kad.com/theme/default/img/search/yin_ico.gif" class="yin_ico" title="隐私配送" />
                            <span class="icon_promotion"  promotionsku="35183"></span>
                        </p>
                        <p class="Yname">
                            <span class="ico_otc"></span>
                            <a class="name" target="_blank" href="/product/27051.shtml" title="同仁堂 小儿退热合剂（口服液） 10ml*6瓶">
                                同仁堂 小儿退热合剂（口服液） 10ml*6瓶
                                <span class="Yspec"></span>
                            </a>
                        </p>
                        <p class="Yadv">本产品已缺货，建议您选用麒麟牌 小儿退热口服液，同功效，10支装23元，性价比高！</p>
                        <p class="Ypribox" id="promote_35183">
                            <span class="RMB">￥26</span>
                            <i class="RMB">￥35</i>
                        </p>
                        <p class="Yhave"><span></span></p>
                    </div>
                </li>
                <li>
                    <input type="hidden" value="40447"  />
                    <div>
                        <p class="Ypic">
                            <a href="/product/66827.shtml" target="_blank"><img src="http://image.360kad.com/group1/M00/07/D7/CgAgEFWKRZ6AdPd2AAEirnhC6Hg702.jpg_220x220.jpg" border="0" alt="葵花 小儿氨酚黄那敏颗粒 3g*10袋" title="葵花 小儿氨酚黄那敏颗粒 3g*10袋"  style="width:220px;height:220px"  /></a>
                            <img src="http://res2.360kad.com/theme/default/img/search/yin_ico.gif" class="yin_ico" title="隐私配送" />
                            <span class="icon_promotion"  promotionsku="40447"></span>
                        </p>
                        <p class="Yname">
                            <span class=""></span>
                            <a class="name" target="_blank" href="/product/66827.shtml" title="葵花 小儿氨酚黄那敏颗粒 3g*10袋">
                                葵花 小儿氨酚黄那敏颗粒 3g*10袋
                                <span class="Yspec"></span>
                            </a>
                        </p>
                        <p class="Yadv">本品缺货，儿童普通感冒或流行性感冒，推荐用999 小儿氨酚黄那敏颗粒，请搜索“小儿氨酚黄那敏颗粒”或“999515”</p>
                        <p class="Ypribox" id="promote_40447">
                            <span class="RMB">￥13.80</span>
                            <i class="RMB">￥25</i>
                        </p>
                        <p class="Yhave"><span></span></p>
                    </div>
                </li>
                <li>
                    <input type="hidden" value="462"  />
                    <div>
                        <p class="Ypic">
                            <a href="/product/30354.shtml" target="_blank"><img src="http://image.360kad.com/group1/M00/07/79/CgAgEVWKQ2WAHxc_AAEOrn354hg734.jpg_220x220.jpg" border="0" alt="百服咛 对乙酰氨基酚滴剂 15ml" title="百服咛 对乙酰氨基酚滴剂 15ml"  style="width:220px;height:220px"  /></a>
                            <img src="http://res2.360kad.com/theme/default/img/search/yin_ico.gif" class="yin_ico" title="隐私配送" />
                            <span class="icon_promotion"  promotionsku="462"></span>
                        </p>
                        <p class="Yname">
                            <span class="ico_otcl"></span>
                            <a class="name" target="_blank" href="/product/30354.shtml" title="百服咛 对乙酰氨基酚滴剂 15ml">
                                百服咛 对乙酰氨基酚滴剂 15ml
                                <span class="Yspec"></span>
                            </a>
                        </p>
                        <p class="Yadv"></p>
                        <p class="Ypribox" id="promote_462">
                            <span class="RMB">￥12.50</span>
                            <i class="RMB">￥15</i>
                        </p>
                        <p class="Yhave"><span></span></p>
                    </div>
                </li>
                <li>
                    <input type="hidden" value="999515"  />
                    <div>
                        <p class="Ypic">
                            <a href="/product/19995.shtml" target="_blank"><img src="http://image.360kad.com/group1/M00/0B/50/CgAgEFX46PCAKzS-AAKCoJv4csI04.jpeg_220x220.jpg" border="0" alt="999 小儿氨酚黄那敏颗粒（甜橙味） 6g*10袋" title="999 小儿氨酚黄那敏颗粒（甜橙味） 6g*10袋"  style="width:220px;height:220px"  /></a>
                            <img src="http://res3.360kad.com/theme/default/img/search/yin_ico.gif" class="yin_ico" title="隐私配送" />
                            <span class="icon_promotion"  promotionsku="999515"></span>
                        </p>
                        <p class="Yname">
                            <span class="ico_otc"></span>
                            <a class="name" target="_blank" href="/product/19995.shtml" title="999 小儿氨酚黄那敏颗粒（甜橙味） 6g*10袋">
                                999 小儿氨酚黄那敏颗粒（甜橙味） 6g*10袋
                                <span class="Yspec"></span>
                            </a>
                        </p>
                        <p class="Yadv">【门店活动】：低至8.9元/盒起！</p>
                        <p class="Ypribox" id="promote_999515">
                            <span class="RMB">￥8.90</span>
                            <i class="RMB">￥11</i>
                        </p>
                        <p class="Yhave"><span></span></p>
                    </div>
                </li>
                <li>
                    <input type="hidden" value="34127"  />
                    <div>
                        <p class="Ypic">
                            <a href="/product/25995.shtml" target="_blank"><img src="http://image.360kad.com/group1/M00/2B/DF/CgAgEVciM9mAfZhKAAFEb5k6AeE443.jpg_220x220.jpg" border="0" alt="同仁堂 小儿清肺止咳片 0.2g*60片" title="同仁堂 小儿清肺止咳片 0.2g*60片"  style="width:220px;height:220px"  /></a>
                            <img src="http://res.360kad.com/theme/default/img/search/yin_ico.gif" class="yin_ico" title="隐私配送" />
                            <span class="icon_promotion"  promotionsku="34127"></span>
                        </p>
                        <p class="Yname">
                            <span class="ico_rx"></span>
                            <a class="name" target="_blank" href="/product/25995.shtml" title="同仁堂 小儿清肺止咳片 0.2g*60片">
                                同仁堂 小儿清肺止咳片 0.2g*60片
                                <span class="Yspec"></span>
                            </a>
                        </p>
                        <p class="Yadv">门店活动:低至16.5元/盒起！清热解表，止咳化痰。用于内热肺火，外感风热引起的身热咳嗽，气促痰多，烦燥口渴，大便干燥。</p>
                        <p class="Ypribox" id="promote_34127">
                            <span class="RMB">￥18</span>
                            <i class="RMB">￥24</i>
                        </p>
                        <p class="Yhave"><span></span></p>
                    </div>
                </li>
                <li>
                    <input type="hidden" value="424"  />
                    <div>
                        <p class="Ypic">
                            <a href="/product/29874.shtml" target="_blank"><img src="http://image.360kad.com/group1/M00/10/92/CgAgEFaB-DuAfOxkAAKCoIAUsAQ83.jpeg_220x220.jpg" border="0" alt="护彤 小儿氨酚黄那敏颗粒 12袋" title="护彤 小儿氨酚黄那敏颗粒 12袋"  style="width:220px;height:220px"  /></a>
                            <img src="http://res4.360kad.com/theme/default/img/search/yin_ico.gif" class="yin_ico" title="隐私配送" />
                            <span class="icon_promotion"  promotionsku="424"></span>
                        </p>
                        <p class="Yname">
                            <span class="ico_otc"></span>
                            <a class="name" target="_blank" href="/product/29874.shtml" title="护彤 小儿氨酚黄那敏颗粒 12袋">
                                护彤 小儿氨酚黄那敏颗粒 12袋
                                <span class="Yspec"></span>
                            </a>
                        </p>
                        <p class="Yadv">本品缺货，儿童普通感冒或流行性感冒，推荐用999 小儿氨酚黄那敏颗粒，请搜索“小儿氨酚黄那敏颗粒”或“999515”</p>
                        <p class="Ypribox" id="promote_424">
                            <span class="RMB">￥8.80</span>
                            <i class="RMB">￥12</i>
                        </p>
                        <p class="Yhave"><span></span></p>
                    </div>
                </li>
                <li>
                    <input type="hidden" value="99934140"  />
                    <div>
                        <p class="Ypic">
                            <a href="/product/26008.shtml" target="_blank"><img src="http://image.360kad.com/group1/M00/1D/D5/CgAgEVapvdmAMCMGAAJ6gKHpOFo43.jpeg_220x220.jpg" border="0" alt="同仁堂 小儿感冒颗粒 12g*10袋" title="同仁堂 小儿感冒颗粒 12g*10袋"  style="width:220px;height:220px"  /></a>
                            <img src="http://res1.360kad.com/theme/default/img/search/yin_ico.gif" class="yin_ico" title="隐私配送" />
                            <span class="icon_promotion"  promotionsku="99934140"></span>
                        </p>
                        <p class="Yname">
                            <span class="ico_otcl"></span>
                            <a class="name" target="_blank" href="/product/26008.shtml" title="同仁堂 小儿感冒颗粒 12g*10袋">
                                同仁堂 小儿感冒颗粒 12g*10袋
                                <span class="Yspec"></span>
                            </a>
                        </p>
                        <p class="Yadv">门店活动:低至12.5元/盒起！</p>
                        <p class="Ypribox" id="promote_99934140">
                            <span class="RMB">￥14.50</span>
                            <i class="RMB">￥30</i>
                        </p>
                        <p class="Yhave"><span></span></p>
                    </div>
                </li>
                <li>
                    <input type="hidden" value="476"  />
                    <div>
                        <p class="Ypic">
                            <a href="/product/19992.shtml" target="_blank"><img src="http://image.360kad.com/group1/M00/07/6F/CgAgEVWKQ0KAC5g2AAD97DNsrkM496.jpg_220x220.jpg" border="0" alt="亚宝 小儿氨酚黄那敏颗粒 5g*10袋" title="亚宝 小儿氨酚黄那敏颗粒 5g*10袋"  style="width:220px;height:220px"  /></a>
                            <img src="http://res.360kad.com/theme/default/img/search/yin_ico.gif" class="yin_ico" title="隐私配送" />
                            <span class="icon_promotion"  promotionsku="476"></span>
                        </p>
                        <p class="Yname">
                            <span class="ico_otc"></span>
                            <a class="name" target="_blank" href="/product/19992.shtml" title="亚宝 小儿氨酚黄那敏颗粒 5g*10袋">
                                亚宝 小儿氨酚黄那敏颗粒 5g*10袋
                                <span class="Yspec"></span>
                            </a>
                        </p>
                        <p class="Yadv">本品缺货，儿童普通感冒或流行性感冒，推荐用999 小儿氨酚黄那敏颗粒，请搜索“小儿氨酚黄那敏颗粒”或“999515”</p>
                        <p class="Ypribox" id="promote_476">
                            <span class="RMB">￥4.50</span>
                            <i class="RMB">￥6</i>
                        </p>
                        <p class="Yhave"><span></span></p>
                    </div>
                </li>
                <li>
                    <input type="hidden" value="26846"  />
                    <div>
                        <p class="Ypic">
                            <a href="/product/18714.shtml" target="_blank"><img src="http://image.360kad.com/group1/M00/07/B0/CgAgEVWKRKaAI911AADra3PqJQM555.jpg_220x220.jpg" border="0" alt="万州 对乙酰氨基酚滴剂 15ml" title="万州 对乙酰氨基酚滴剂 15ml"  style="width:220px;height:220px"  /></a>
                            <img src="http://res4.360kad.com/theme/default/img/search/yin_ico.gif" class="yin_ico" title="隐私配送" />
                            <span class="icon_promotion"  promotionsku="26846"></span>
                        </p>
                        <p class="Yname">
                            <span class="ico_otcl"></span>
                            <a class="name" target="_blank" href="/product/18714.shtml" title="万州 对乙酰氨基酚滴剂 15ml">
                                万州 对乙酰氨基酚滴剂 15ml
                                <span class="Yspec"></span>
                            </a>
                        </p>
                        <p class="Yadv"></p>
                        <p class="Ypribox" id="promote_26846">
                            <span class="RMB">￥7.90</span>
                            <i class="RMB">￥11</i>
                        </p>
                        <p class="Yhave"><span></span></p>
                    </div>
                </li>
                <li>
                    <input type="hidden" value="28042"  />
                    <div>
                        <p class="Ypic">
                            <a href="/product/19910.shtml" target="_blank"><img src="http://image.360kad.com/group1/M00/07/B6/CgAgEVWKRLqAFfj0AAEZk8l-Bds150.jpg_220x220.jpg" border="0" alt="普正 小儿感冒颗粒 12g*10袋" title="普正 小儿感冒颗粒 12g*10袋"  style="width:220px;height:220px"  /></a>
                            <img src="http://res3.360kad.com/theme/default/img/search/yin_ico.gif" class="yin_ico" title="隐私配送" />
                            <span class="icon_promotion"  promotionsku="28042"></span>
                        </p>
                        <p class="Yname">
                            <span class="ico_otcl"></span>
                            <a class="name" target="_blank" href="/product/19910.shtml" title="普正 小儿感冒颗粒 12g*10袋">
                                普正 小儿感冒颗粒 12g*10袋
                                <span class="Yspec"></span>
                            </a>
                        </p>
                        <p class="Yadv"></p>
                        <p class="Ypribox" id="promote_28042">
                            <span class="RMB">￥15</span>
                            <i class="RMB">￥20</i>
                        </p>
                        <p class="Yhave"><span></span></p>
                    </div>
                </li>
                <li>
                    <input type="hidden" value="28198"  />
                    <div>
                        <p class="Ypic">
                            <a href="/product/20066.shtml" target="_blank"><img src="http://image.360kad.com/group1/M00/07/B8/CgAgEFWKRMKAS2W2AABjQB5qxjo808.gif_220x220.jpg" border="0" alt="长城 小儿清肺化痰口服液 10ml*6支" title="长城 小儿清肺化痰口服液 10ml*6支"  style="width:220px;height:220px"  /></a>
                            <img src="http://res1.360kad.com/theme/default/img/search/yin_ico.gif" class="yin_ico" title="隐私配送" />
                            <span class="icon_promotion"  promotionsku="28198"></span>
                        </p>
                        <p class="Yname">
                            <span class="ico_rx"></span>
                            <a class="name" target="_blank" href="/product/20066.shtml" title="长城 小儿清肺化痰口服液 10ml*6支">
                                长城 小儿清肺化痰口服液 10ml*6支
                                <span class="Yspec"></span>
                            </a>
                        </p>
                        <p class="Yadv"></p>
                        <p class="Ypribox" id="promote_28198">
                            <span class="RMB">￥15</span>
                            <i class="RMB">￥20</i>
                        </p>
                        <p class="Yhave"><span></span></p>
                    </div>
                </li>
                <li>
                    <input type="hidden" value="999154"  />
                    <div>
                        <p class="Ypic">
                            <a href="/product/20737.shtml" target="_blank"><img src="http://image.360kad.com/group1/M00/1D/D6/CgAgEFapv0uAQBheAAJ6gFKUeK051.jpeg_220x220.jpg" border="0" alt="999 小儿感冒颗粒 6g*10袋" title="999 小儿感冒颗粒 6g*10袋"  style="width:220px;height:220px"  /></a>
                            <img src="http://res.360kad.com/theme/default/img/search/yin_ico.gif" class="yin_ico" title="隐私配送" />
                            <span class="icon_promotion"  promotionsku="999154"></span>
                        </p>
                        <p class="Yname">
                            <span class="ico_otcl"></span>
                            <a class="name" target="_blank" href="/product/20737.shtml" title="999 小儿感冒颗粒 6g*10袋">
                                999 小儿感冒颗粒 6g*10袋
                                <span class="Yspec"></span>
                            </a>
                        </p>
                        <p class="Yadv">聚划算:低至10.8元/盒起！用于小儿风热感冒，症见发热、头胀痛、咳嗽痰黏、咽喉肿痛；流感见上述证候者。</p>
                        <p class="Ypribox" id="promote_999154">
                            <span class="RMB">￥11.80</span>
                            <i class="RMB">￥16</i>
                        </p>
                        <p class="Yhave"><span></span></p>
                    </div>
                </li>
                <li>
                    <input type="hidden" value="456"  />
                    <div>
                        <p class="Ypic">
                            <a href="/product/29856.shtml" target="_blank"><img src="http://image.360kad.com/group1/M00/07/77/CgAgEVWKQ12AYiMrAADfL1_Y2ZA863.jpg_220x220.jpg" border="0" alt="香雪 小儿氨酚黄那敏片 8片" title="香雪 小儿氨酚黄那敏片 8片"  style="width:220px;height:220px"  /></a>
                            <img src="http://res2.360kad.com/theme/default/img/search/yin_ico.gif" class="yin_ico" title="隐私配送" />
                            <span class="icon_promotion"  promotionsku="456"></span>
                        </p>
                        <p class="Yname">
                            <span class="ico_otc"></span>
                            <a class="name" target="_blank" href="/product/29856.shtml" title="香雪 小儿氨酚黄那敏片 8片">
                                香雪 小儿氨酚黄那敏片 8片
                                <span class="Yspec"></span>
                            </a>
                        </p>
                        <p class="Yadv">本品缺货，儿童普通感冒或流行性感冒，推荐用999 小儿氨酚黄那敏颗粒，请搜索“小儿氨酚黄那敏颗粒”或“999515”</p>
                        <p class="Ypribox" id="promote_456">
                            <span class="RMB">￥1.50</span>
                            <i class="RMB">￥2</i>
                        </p>
                        <p class="Yhave"><span></span></p>
                    </div>
                </li>
                <li>
                    <input type="hidden" value="3478"  />
                    <div>
                        <p class="Ypic">
                            <a href="/product/26921.shtml" target="_blank"><img src="http://image.360kad.com/group1/M00/07/90/CgAgEVWKQ7-AR-iCAAH7ODvwLlY780.jpg_220x220.jpg" border="0" alt="同仁堂 儿童清热口服液 10ml*6支" title="同仁堂 儿童清热口服液 10ml*6支"  style="width:220px;height:220px"  /></a>
                            <img src="http://res4.360kad.com/theme/default/img/search/yin_ico.gif" class="yin_ico" title="隐私配送" />
                            <span class="icon_promotion"  promotionsku="3478"></span>
                        </p>
                        <p class="Yname">
                            <span class="ico_rx"></span>
                            <a class="name" target="_blank" href="/product/26921.shtml" title="同仁堂 儿童清热口服液 10ml*6支">
                                同仁堂 儿童清热口服液 10ml*6支
                                <span class="Yspec"></span>
                            </a>
                        </p>
                        <p class="Yadv">清热解毒、解肌退热。用于高热不退，烦躁不安，咽喉肿痛，大便秘结等症。</p>
                        <p class="Ypribox" id="promote_3478">
                            <span class="RMB">￥23</span>
                            <i class="RMB">￥28</i>
                        </p>
                        <p class="Yhave"><span></span></p>
                    </div>
                </li>
                <li>
                    <input type="hidden" value="2020"  />
                    <div>
                        <p class="Ypic">
                            <a href="/product/29902.shtml" target="_blank"><img src="http://image.360kad.com/group1/M00/07/91/CgAgEVWKQ8SAYndrAAFFJdHDxHU941.jpg_220x220.jpg" border="0" alt="敬修堂 对乙酰氨基酚栓 0.15g*10粒" title="敬修堂 对乙酰氨基酚栓 0.15g*10粒"  style="width:220px;height:220px"  /></a>
                            <img src="http://res3.360kad.com/theme/default/img/search/yin_ico.gif" class="yin_ico" title="隐私配送" />
                            <span class="icon_promotion"  promotionsku="2020"></span>
                        </p>
                        <p class="Yname">
                            <span class="ico_otcl"></span>
                            <a class="name" target="_blank" href="/product/29902.shtml" title="敬修堂 对乙酰氨基酚栓 0.15g*10粒">
                                敬修堂 对乙酰氨基酚栓 0.15g*10粒
                                <span class="Yspec"></span>
                            </a>
                        </p>
                        <p class="Yadv"></p>
                        <p class="Ypribox" id="promote_2020">
                            <span class="RMB">￥3.50</span>
                            <i class="RMB">￥5.4</i>
                        </p>
                        <p class="Yhave"><span></span></p>
                    </div>
                </li>

            </ul>
            <!--{PageStart}-->
            <div class="pager">
                <span  class="pagecss">
                    <span class="first">
                    共103个商品
                        <a class="Yfirst" href="/Category_783/Index.aspx"><i></i>首页</a>
                        <a class="Ypre" href="/Category_783/Index.aspx?page=1"><i></i>上一页</a>
                    </span>
                        <span class="numlist">
                            <span style="color: #ff0000"><strong>1</strong></span>
                            <a href="/Category_783/Index.aspx?page=2">2</a>
                            <a href="/Category_783/Index.aspx?page=3">3</a>
                            <a href="/Category_783/Index.aspx?page=4">4</a>
                            <a href="/Category_783/Index.aspx?page=5">5</a>
                            <a href="/Category_783/Index.aspx?page=6">6</a>
                        </span>
                    <span class="end">
                        <a class="Ynext" href="/Category_783/Index.aspx?page=2">下一页<i></i></a>
                        <a class="Ylast" href="/Category_783/Index.aspx?page=6">尾页<i></i></a>
                    20个/页
                    转到第<select onchange="if(this.options[this.selectedIndex].value!=''){location=this.options[this.selectedIndex].value;}">
                        <option value="/Category_783/Index.aspx?page=1" selected="selected" >1</option>
                        <option value="/Category_783/Index.aspx?page=2"  >2</option>
                        <option value="/Category_783/Index.aspx?page=3"  >3</option>
                        <option value="/Category_783/Index.aspx?page=4"  >4</option>
                        <option value="/Category_783/Index.aspx?page=5"  >5</option>
                        <option value="/Category_783/Index.aspx?page=6"  >6</option>
                    </select>页
                    </span>
                </span>
            </div>
            <!--{PageEnd}-->
        </div>
    </div>
    <!-- 内容右侧 end -->
    <!-- 底部搜索 start -->

    <!-- 底部搜索 end -->
    <!--部件开始:product_list_historylist,分组:通用部件-->
    <style type="text/css">
        #historylist ul {
            position: absolute;
            margin-left: 0px;
        }
        #historylist .YLicon {
            overflow: hidden;
            width: 1164px;
            margin: 0 21px;
            position: relative;
            height: 258px;
        }
    </style>
    <script type="text/javascript">
        $(function () {
            //加载最近浏览历史
            $.ajax({
                url: urlConfig.pc + "/Product/GetProductHistoryInfo",
                type: "Get",
                dataType: "jsonp",
                jsonp: "callback",
                success: function (data) {
                    var list = "";
                    if (data != "" && data != null) {
                        var json = data;
                        if(json.length<=6){ $(".Ylt,.Ygt").hide();}
                        for (var i = 0; i < json.length; i++) {
                            list = list + "<li><p class='Ypic'><a href='/product/" + json[i].LinkId + ".shtml' target='_blank'><img  title='" + json[i].WareName + "' alt='" + json[i].WareName + "' src='" + json[i].Pic + "' width='180' height='180'></a></p><p class='Yname'><span class=''></span><a href='/product/" + json[i].LinkId + ".shtml'>" + json[i].WareName + "<span class='Yspec'></span></a></p><p class='Ypri'>￥" + json[i].Price + "</p></li>";
                        }
                        $("#historylist ul").html(list);
                        $("#historylist ul").width($("#historylist ul li:eq(0)").outerWidth() * data.length);

                    }
                    else
                    {
                        $(".YbproList").hide();
                    }
                }
            });
            //清除游览历史
            $("#clearHistorylist").click(function () {
                $(".YbproList").hide();
                $.cookie("KadProductHistory", null, { expires: 1, domain: '360kad.com', path: '/' });
                $("#historylist ul").html("");
            });
            $("#historylist .YLicon li").live("mouseover", function () {
                $(this).addClass('on');
            });
            $("#historylist .YLicon li").live("mouseout", function () {
                $(this).removeClass('on')
            });

            //幻灯片效果 
            $("#historylist .Ygt").click(function () {
                var YLicon = $(this).siblings(".YLicon");
                var ul = YLicon.find("ul");
                var position = ul.position();
                var width = YLicon.width();
                var cur = ul.width() + position.left > width;
                if (!ul.is(':animated')) {
                    if (cur) {
                        ul.animate({
                            left: '-=' + width,
                        }, 500,function(){
                            $(".Ylt").show();
                            if( $(".YLicon ul").width()+$(".YLicon ul").position().left > $(".YLicon").width()){$(".Ygt").show()}
                            else{$(".Ygt").hide();}
                        });
                    }else {
                        ul.animate({
                            left: 0
                        }, 500);
                    }
                }
            });

            $("#historylist .Ylt").click(function () {
                var YLicon = $(this).siblings(".YLicon");
                var ul = YLicon.find("ul");
                var position = ul.position();
                var width = YLicon.width();
                var cur =  position.left + width <= 0;
                if(position.left + width<0){$(".Ylt").show();}
                else{$(".Ylt").hide();}
                if (!ul.is(':animated')) {
                    if (cur) {
                        ul.animate({
                            left: '+=' + width
                        }, 500,function(){$(".Ygt").show()});
                    }

                }
            });
        });
    </script>
    <div class="YbproList">
        <div class="Ytit">
            最近浏览过的
            <span id="clearHistorylist">清除</span>
        </div>
        <div class="Ycon" id="historylist">
            <span style="display:none" class="Ylt">&lt;</span>
            <div class="YLicon">
                <ul>

                </ul>
            </div>
            <span class="Ygt">&gt;</span>
        </div>
    </div>
    <!--部件结束:product_list_historylist-->


</div>
<div class="h20"></div>
<!-- end 内容主体-->
<!--右侧导航-->
<!--部件开始:nav_www_home_right,分组:频道部件-->
<style>
    .fixed_navigation .cart_box{margin-top:8px}
    /*更多登录方式*/
    .kad_more_login{font-size:12px}
    .kad_login_style{overflow:hidden;margin:10px 0}
    .kad_login_style ul >li{float:left;width:32px;height:32px;background:url(http://res.360kad.com/theme/default/img/2014newKad/login_style03.png) no-repeat;margin-right:14px}
    .kad_login_style ul >li a{width:32px;height:32px;display:block}
    .kad_login_style ul .login_style_wx{background:url(http://res.360kad.com/theme/default/img/2014newKad/login_style01.png) no-repeat;}
    .kad_login_style ul .login_style_wx:hover{background:url(http://res.360kad.com/theme/default/img/2014newKad/login_style02.png) no-repeat;}
    .kad_login_style ul .login_style_QQ{background-position:0px -128px}
    .kad_login_style ul .login_style_QQ:hover{background-position:0px 0px}
    .kad_login_style ul .login_style_tb{background-position:0px -224px}
    .kad_login_style ul .login_style_tb:hover{background-position:0px -96px}
    .kad_login_style ul .login_style_zfb{background-position:0px -192px}
    .kad_login_style ul .login_style_zfb:hover{background-position:0px -64px}
    .kad_login_style ul .login_style_wb{background-position:0px -160px}
    .kad_login_style ul .login_style_wb:hover{background-position:0px -32px}
    /*左边我的账号图像*/
    .fixed_navigation .my_Info{background:url(http://res.360kad.com/theme/default/img/2014newKad/my_Info.png) no-repeat;}
    .my_Info:hover{background-color:#0066d4}
    .my_Info .my_Info_container{display:none;position:absolute;top:0;right:66px;opacity:0;filter:alpha(opacity=0);width: 104px;height: 32px;line-height: 32px;background:#fd951a;}
    .my_Info .pointer{position:absolute;top:10px;right:60px;width: 0;height: 0;line-height: 0;font-size:0;border-top: 8px solid transparent;border-bottom: 8px solid transparent;border-left: 8px solid #fd951a;opacity:0;filter:alpha(opacity=0);}
    .my_Info_container a{color:#fff;text-decoration: none;}
    .my_Info_container a:hover{color:#fff;text-decoration: none;}
    /*用户是否登录状态*/
    .my_Info_isLogin{font-size:14px;display:none}
    .my_Info_title{height:40px;line-height:40px;font-weight:bold;background:#dadada;color:#666666;text-align:center}
    .my_Info_hy{border-bottom:1px solid #d3d1d1}
    .my_Info_hy_ct{padding:20px 12px 10px 10px;}
    .my_Info_hy_ct span{display:inline-block;vertical-align:middle;}
    .my_Info_nihao{padding-left:10px}
    .my_Info_login_red a{color:#f24e4e}
    .my_Info_myself{overflow:hidden}
    .my_Info_myself ul >li{float:left;width:70px;height:60px;text-align:center;padding:24px 30px 0 31px}
    .my_Info_myself ul >li a{width:70px;height:60px;display:block}
    .already_login{overflow:hidden}
    .already_login_lf{float:left;padding-right:10px}
    .already_login_rg{float:left;width:119px; overflow:hidden}
    .already_lo_rg_hy{padding:8px 0 13px 0;}
    .zh_safety_level{padding:0 10px 20px 10px;overflow:hidden;font-size:12px}
    .zh_safety_level span{float:left;display:inline;}
    .safe_level_bg{width:144px;height:15px;line-height:15px;background:#ffffff;display:inline;float:left;overflow:hidden;margin-right:3px}
    .safe_level_type{width:66.67%;background:#fe952f;float:left;height:15px;}
    .is_bangding{padding:0 0 10px 10px;font-size:12px;position:relative}
    .no_bangding{padding-right:30px}
    .no_bangding a{color:#2d8ef3}
    .no_bangding a:hover{color:red}
    .bangd_achieve{width:200px;height:36px;line-height:36px;text-align:center;background:#fdf8e3; color:#ef363a;  position:absolute; top:25px; left:40px;border:1px solid #f7eabb;font-size:14px;padding-right:15px}
    .bangd_achieve span{display:block; width:0; height:0; border-width:0 10px 10px; border-style:solid; border-color:transparent transparent #f7eabb;position:absolute; top:-10px; left:22px;/* 三角形居中显示 */}
    .bangd_achieve em{display:block; width:0;height:0;border-width:0 10px 10px;border-style:solid;border-color:transparent transparent #fdf8e3;position:absolute; top:1px; left:-10px;}
    .close_bd_tip01{position:absolute;top:4px;right:4px;width:11px;height:11px;display:block;background:url(http://res.360kad.com/theme/default/img/2014newKad/close_tip_isbd01.png) no-repeat;}
    /*左侧提示是否绑定*/
    .isbd_mobile{position:absolute;left:-135px;top:208px;padding:10px;width:110px;height:50px;background:#fd951a;color:white;line-height:16px;font-size: 12px;text-align:left;display:none; z-index: 3;}
    .isbd_out,.isbd_in{display:inline-block;position: absolute;top:12px;right:-10px;width:0;height:0;font-size:0;border:5px solid transparent;_border-style:dashed;border-left-style:solid;border-left-color:#fd951a;}
    .isbd_in{right:-4px;top:-4px;border:5px solid transparent;_border-style:dashed;border-left-style:solid;border-left-color:#fd951a;font-size:0;width:0;height:0;overflow: hidden;}
    .close_bd_tip02{position:absolute;top:3px;right:3px;width:9px;height:9px;display:block;background:url(http://res.360kad.com/theme/default/img/2014newKad/close_tip_isbd02.png) no-repeat;}
    .rightnow_bd{width:56px;height:18px;line-height:18px;color:#fd951a;background:white;display:block;text-align:center;margin-top:3px}
    .rightnow_bd:hover{color:#fd951a;}
    /*没有收藏哭的表情*/
    .without_conetion{display:none;margin-top: 150px;width: 264px;height: 156px;text-align:center}
    .without_conetion .cryKad_icon {padding-bottom: 14px;width: 114px;height: 112px;background: url(http://res.360kad.com/theme/default/img/2014newKad/kad_cryKid.png) 0 0 no-repeat;}
</style>

<div class="fixed_navigation" id="fixed_navigation">
    <div class="isbd_mobile">
        绑定手机号码即可获取100积分~
        <a class="close_bd_tip02" href="javascript:void(0)"></a>
        <a href="http://user.360kad.com/mobile/verification" class="rightnow_bd" target="_blank">立即绑定</a>
        <i class="isbd_out"><i class="isbd_in"></i></i>
    </div>
    <div class="navi_left" style="padding-top: 200px;">
        <span id="nav_closeBtn"></span>
        <!--在线客服-->
        <div class="online_kefu" style="display:none;">
            <div class="online_kefu_container">
                <p class="top">客服中心</p>
                <p class="clearfix p46  pt8">
                    <a id="tqchatOTC" target="_blank" onclick="ctrTqBoxR();" href="http://help.360kad.com/SaleAfter/ContactSer" style="cursor: pointer;">
                        <img align="absmiddle" id="tq_float_icoon" src="http://res.360kad.com/theme/default/img/online_sqkefupic.png" style="float:left;">
                    </a>
                </p>
                <p class="p46">订购热线：</p>
                <p class="clearfix p46 borB">
                    <img src="http://res1.360kad.com/theme/default/img/www/phone01.png" alt="">
                </p>
                <p class="plr6 clearfix  pt8">
                    <a onclick="ctrTqBoxR();" id="tqchatOTCSh" target="_blank" href="http://help.360kad.com/SaleAfter/ContactSer" style="cursor: pointer;">
                        <img align="absmiddle" id="tq_float_icoon" src="http://res1.360kad.com/theme/default/img/online_sqkefupic.png" style="float:left;">
                    </a>
                </p>
                <p class="p46">售后专线：</p>
                <p class="clearfix p46 w142">
                    <img src="http://res3.360kad.com/theme/default/img/www/phone02.png" alt="">
                </p>
            </div>
            <i class="pointer"></i>
        </div>
        <!--我的账号-->
        <div class="my_Info commonWidth">
            <p class="my_Info_container" style="right: 66px; opacity: 0; display: none;"><a href="javascript:;" onclick="ctrActionsend('myaccount_right_pc')" title="我的账号">我的账号</a></p>
            <i class="pointer" style="right: 60px; opacity: 0; display: none;"></i>
        </div>
        <!--购物车-->
        <div class="cart_box commonWidth" id="cart_box">
            <span id="singleNum" style="display: none;">1</span>
            <span class="kad-cartNums">0</span>
        </div>
        <!--收藏-->
        <div class="Favorites commonWidth">
            <p class="Favorites_container"><a href="javascript:;" title="我的收藏">我的收藏</a></p>
            <i class="pointer"></i>
        </div>
        <!--最近浏览-->
        <div class="view_soon commonWidth">
            <p class="view_soon_container"><a href="javascript:;" title="最近浏览">最近浏览</a></p>
            <i class="pointer"></i>
        </div>
        <!--最近购买-->
        <div class="order_current commonWidth">
            <p class="order_current_container"><a href="javascript:;" title="最近购买">最近购买</a></p>
            <i class="pointer"></i>
        </div>
        <!--我要投诉-->
        <div class="my-tsBox commonWidth">
            <a style="display:block;width:36px;height:32px" href="http://help.360kad.com/Feature/TouSuJianYi" target="_blank">&nbsp;</a>
            <p class="order_current_container" onclick="ctrActionsend('myts_right_pc')">
                <a style="display:block;" href="http://help.360kad.com/Feature/TouSuJianYi" target="_blank" title="我要投诉"></a>
                <a href="http://help.360kad.com/Feature/TouSuJianYi" target="_blank" title="我要投诉">我要投诉</a>
            </p>
            <i class="pointer"></i>
        </div>
        <!--END我要投诉-->
        <!--问卷调查-->
        <div class="my-tsBox commonWidth" style="display:none;">
            <p class="order_current_container"><a href="javascript:;" target="_blank" title="问卷调查">问卷调查</a></p>
            <i class="pointer"></i>
        </div>
        <!--END问卷调查-->
        <!--扫码下单二维码-->
        <div class="sm_two_order commonWidth" style="margin-top: 20px;">
            <div class="sm_two_order_container" style="display: none;">
                <img src="http://res1.360kad.com/theme/default/img/new_app_picR1.jpg" alt="康爱多APP">
            </div>
            <i class="pointer" style="display: none;"></i>
        </div>
        <!--top-->
        <div class="backUp_top commonWidth"></div>
    </div>
    <!--右侧信息列表-->
    <div class="navi_right" style="height: 775px;">
        <!-- 登录/注册 -->
        <div class="login_boxs" id="login_boxs">
            <form action="http://user.360kad.com" method="post">
                <p>登录名：</p>
                <p class="p_input"><input type="text" id="userNam_val" value="用户名/邮箱/手机号码" onfocus="if(this.value == '用户名/邮箱/手机号码'){this.value = '';}" onblur="if(this.value == '用户名/邮箱/手机号码'){this.vlaue='';};" onchange="checkUserName();"><span class="errorTxt"></span><i id="error_btn1" class="error_btn"></i></p>
                <p class="">
                    登录密码：<span class="forget_ps"><a onclick="location.href = 'http://user.360kad.com/Login/ForgetPassword##'; return false;" href="javascript:void(0)">忘记登录密码？</a></span>
                </p>
                <p class="p_input"><input type="password" id="userPsd_val" value="" onchange="$(this).css('color','#515151');checkUserPwd();"><span class="errorTxt"></span><i class="error_btn" id="error_btn2"></i></p>
                <p class="p_input2"><i class="checked_val1 checked_val2"></i><span class="checked_Txt">记住我的登录信息</span></p>
                <p class="sub_btn"><input type="button" onclick="UserLogin2();" value="登录"></p>
                <!--更多登录方式-->
                <p class="kad_more_login">您还可以使用合作网站账号登录康爱多：</p>
                <div class="kad_login_style">
                    <ul>
                        <li class="login_style_wx"><a title="微信登录" href="javascript:void(0)" onclick="location.href='http://user.360kad.com/login/WeChatLogin?rtnurl=http://user.360kad.com/user';return false;"></a></li>
                        <li class="login_style_QQ"><a title="QQ登录" href="javascript:void(0)" onclick="location.href='http://user.360kad.com/login/QzoneLogin?rtnurl=http://user.360kad.com/user';return false;"></a></li>
                        <li class="login_style_tb"><a title="淘宝登录" href="javascript:void(0)" onclick="location.href='http://user.360kad.com/login/TaobaoLogin?rtnurl=http://user.360kad.com/user';return false;"></a></li>
                        <li class="login_style_zfb"><a title="支付宝登录" href="javascript:void(0)" onclick="location.href='http://user.360kad.com/Login/AlipayLogin?rtnurl=http://user.360kad.com/user';return false;"></a></li>
                        <li class="login_style_wb"><a title="新浪微博登录" href="javascript:void(0)" onclick="location.href='http://user.360kad.com/login/SinaLogin?rtnurl=http://user.360kad.com/user';return false;"></a></li>
                    </ul>
                </div>
                <!--更多登录方式-->
                <p class="pl196"><a href="http://user.360kad.com/Register/Index">免费注册</a></p>
                <input type="hidden" name="" id="wFavorV">
                <input type="hidden" name="" id="FavorV">
            </form>
        </div>
        <!--end登录/注册-->
        <!--我的账号未登录/登陆状态-->
        <div class="my_Info_isLogin" style="display:none">
            <p class="my_Info_title">我的账号</p>
            <div class="my_Info_hy">
                <div class="my_Info_hy_ct no_login" style="display: none;">
                    <span><a href="javascript:void(0)"  class="plese_login"><img src="http://res.360kad.com/theme/default/img/2014newKad/kad_user_right01.jpg" alt="修改图片" width="112" height="112" /></a></span>
                    <span class="my_Info_nihao">您好，请</span>
                    <span class="my_Info_login_red"><a href="javascript:void(0)" class="plese_login">登录</a></span>
                    <span>！</span>
                </div>
                <div style="display:none" class="already_login_box">
                    <div class="my_Info_hy_ct already_login">
                        <div class="already_login_lf"><a class="plese_login_img" href="http://user.360kad.com/user"><img src="http://res.360kad.com/theme/default/img/2014newKad/kad_user_right01.jpg" alt="修改图片" width="112" height="112" /></a></div>
                        <div class="already_login_rg">
                            <p class="already_lo_rg_hy"><a id="vip_sname" href="javascript:void(0)"></a>，您好！</p>
                            <p style="color:#737272" id="vip_sign"></p>
                        </div>
                    </div>
                    <div class="zh_safety_level"><span style="color:#737272">账户安全级别：</span><div class="safe_level_bg"><div class="safe_level_type"></div></div><span id="safe_level_list" style="color:#fe952f"></span></div>
                    <div class="is_bangding">
                        <span style="color:#737272"><img src="http://res.360kad.com/theme/default/img/user/cell-phone-icon.png" alt="" /> 手机：</span>
                        <span class="no_bangding"><a href="javascript:void(0)" id="mobile_isbd" target="_blank"></a></span>
                        <span style="color:#737272"><img src="http://res.360kad.com/theme/default/img/user/email_icon.png" alt="" /> 邮箱：</span>
                        <span class="no_bangding"><a href="javascript:void(0)" id="yx_isbd" target="_blank"></a></span>
                        <div class="bangd_achieve">
                            <span><em></em></span>绑定手机号码可获取100积分~
                            <a class="close_bd_tip01" href="javascript:void(0)"></a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="my_Info_myself">
                <ul>
                    <li><a href="http://user.360kad.com/order" target="_blank" onclick="ctrActionsend('myorder_right_pc')"><i><img src="http://res.360kad.com/theme/default/img/2014newKad/kad_user_right02.png" alt="" /></i><p>我的订单</p></a></li>
                    <li><a href="http://user.360kad.com/coupon" target="_blank" onclick="ctrActionsend('myyhj_right_pc')"><i><img src="http://res.360kad.com/theme/default/img/2014newKad/kad_user_right03.png" alt="" /></i><p>我的优惠券</p></a></li>
                    <li><a href="http://user.360kad.com/integral" target="_blank" onclick="ctrActionsend('myjf_right_pc')"><i><img src="http://res.360kad.com/theme/default/img/2014newKad/kad_user_right04.png" alt="" /></i><p>我的积分</p></a></li>
                    <li><a href="http://user.360kad.com/club" target="_blank" onclick="ctrActionsend('vip_right_pc')"><i><img src="http://res.360kad.com/theme/default/img/2014newKad/kad_user_right05.png" alt="" /></i><p>会员俱乐部</p></a></li>
                </ul>
            </div>
        </div>
        <!--我的账号未登录/登陆状态-->
        <!--购物车列表-->
        <div class="cart_lists_show" id="cart_lists_show">
            <p class="myCarts" id="myCarts" style="display: none;">我的购物车</p>
            <!--未加入商品-->
            <div class="without_favor" style="display: block;">
                <p class="cryKad_icon"></p>
                <p>咦，亲购物车还没有添加商品哦！</p>
            </div>
            <!--end未加入商品-->

            <div id="scrollBar1" class="scrollBar" style="display: none; height: 367px;">
                <div id="pc_proLists1" class="pc_proLists">
                    <ul id="ul1"></ul>
                    <ul id="ul2"></ul>
                </div>
                <div class="bar_box" id="bar_box1" style="display: none;"><div class="bar" id="bar1"></div></div>
            </div>
            <!--去结算-->
            <div class="go_order_box" style="display: none;"></div>
            <!--end去结算-->
        </div>
        <!--end购物车列表-->
        <!--我的收藏-->
        <div class="cart_lists_show Favorites_lists_show view_soon_lists_show" id="Favorites_lists_show">
            <div class="favor_boxs">
                <!--未浏览-->
                <div class="without_favor">
                    <p class="cryKad_icon"></p>
                    <p>咦，亲还木有收藏过商品哦！</p>
                </div>
                <!--end未浏览-->
                <p class="cart_top"><span style="float:left;">我的收藏</span><span class="favor_num" id="favor_num"></span></p>
                <div class="without_conetion">
                    <p class="cryKad_icon"></p>
                    <p>您还没有收藏东西哦，先去逛逛吧！</p>
                </div>
                <div id="scrollBar2" class="scrollBar" style="height: 367px;">
                    <div id="pc_proLists2" class="pc_proLists">

                    </div>
                    <div id="bar_box2" class="bar_box"><div id="bar2" class="bar"></div></div>
                    <span class="favor_success favor_success1">删除成功</span>
                </div>
                <div class="go_order_box">
                    <p><a class="go_nowOr" target="_blank" href="http://user.360kad.com/Favorite/Index">查看全部</a></p>
                </div>
            </div>
        </div>
        <!--end我的收藏-->
        <!--最近浏览-->
        <div class="cart_lists_show view_soon_lists_show" id="view_soon_lists_show">
            <div class="favor_boxs">
                <p class="cart_top"><span style="float:left;">最近浏览</span><span class="favor_num" id="view_num"></span><a href="javascript:;" id="favor_clearBtn">清空</a></p>
                <!--未浏览-->
                <div class="without_favor">
                    <p class="cryKad_icon"></p>
                    <p>您最近可能错过了很多好东西，先去逛逛吧！</p>
                </div>
                <!--end未浏览-->
                <div id="scrollBar3" class="scrollBar" style="height: 367px;">
                    <div id="pc_proLists3" class="pc_proLists">
                        <ul class="clearfix proLists"></ul>
                    </div>
                    <div id="bar_box3" class="bar_box"><div id="bar3" class="bar"></div></div>
                    <span class="favor_success favor_success1">收藏成功</span>
                </div>
            </div>
        </div>
        <!--end最近浏览-->
        <!--再次购买-->
        <div class="cart_lists_show go_buyAgain" id="go_buyAgain">
            <!--未购买-->
            <div class="without_favor">
                <p class="cryKad_icon"></p>
                <p>咦，亲还木有购买过商品哦！</p>
            </div>
            <!--end未购买-->
            <div id="scrollBar4" class="scrollBar" style="height: 367px;">
                <div id="pc_proLists4" class="pc_proLists">
                </div>
                <div id="bar_box4" class="bar_box"><div id="bar4" class="bar"></div></div>
                <span class="favor_success favor_success1">加入成功</span>
            </div>
            <!--去结算-->
            <div class="go_order_box">
                <p><a href="http://user.360kad.com/User/Order?Type=0" target="_blank" class="go_nowOr">查看全部</a></p>
            </div>
            <!--end去结算-->
        </div>
        <!--end再次购买-->
    </div>
    <!--end右侧信息列表-->
    <input type="hidden" name="" id="actInputVal" value="">
</div>
<!--部件结束:nav_www_home_right-->

<!--右侧导航END-->
<!--底部-->
<!--部件开始:home_footer_other,分组:通用部件-->

<div class="wrap_footer" style="width: 100%;">
    <div class="item01">
        <div class="width1200">
            <dl>
                <dd><!-- <a href="/zhuanti/trust.shtml"></a> -->
                    <img src="http://res.360kad.com/theme/default/img/product/2016new/zheng1.png">
                    <div class="medicineWorld">
                        <p class="t">正品保障</p>
                        <p>国家认证 正规合法</p>
                    </div>
                </dd>
                <dd><!-- <a href="javascript:void(0);"></a> -->
                    <img src="http://res.360kad.com/theme/default/img/product/2016new/zheng2.png">
                    <div class="medicineWorld">
                        <p class="t">专业药师</p>
                        <p>用药全程指导 </p>
                    </div>
                </dd>
                <dd><!-- <a href="javascript:void(0);"> </a> -->
                    <img src="http://res.360kad.com/theme/default/img/product/2016new/sou.png">
                    <div class="medicineWorld">
                        <p class="t">厂家授权 </p>
                        <p>厂家授权 正品渠道</p>
                    </div>
                </dd>
                <dd><!-- <a href="javascript:void(0);"></a> -->
                    <img src="http://res.360kad.com/theme/default/img/product/2016new/zheng5.png">
                    <div class="medicineWorld">
                        <p class="t">货到付款</p>
                        <p>货到付款 购药无忧</p>
                    </div>
                </dd>

                <dd><!-- <a href="javascript:void(0);"></a> -->
                    <img src="http://res.360kad.com/theme/default/img/product/2016new/zheng4.png">
                    <div class="medicineWorld">
                        <p class="t">隐私配送</p>
                        <p>安全放心 隐私配送</p>
                    </div>
                </dd>
                <dd style="padding-right:0;"><!-- <a href="javascript:void(0);"></a> -->
                    <img src="http://res.360kad.com/theme/default/img/product/2016new/zheng3.png">
                    <div class="medicineWorld">
                        <p class="t"> 满39元包邮</p>
                        <p> 全场满39元包邮</p>
                    </div>
                </dd>
                <div class="clear"></div>
            </dl>

            <div class="clear"></div>
        </div>
        <div class="clear"></div>
    </div>
    <!--康爱多掌上药店-->
    <div class="item01 item02">
        <div class="width1200 clearfix">
            <div class="lside">
                <div class="appCode">
                    <p class="title">手机购药</p>
                    <p class="code"></p>
                    <p class="clearfix pl8">
                        下载立送50</p>
                </div>
                <div class="weixinCode">
                    <p class="title">微信购药</p>
                    <p class="code"></p>
                    <p class="title02" style="width:106px;margin:0;">扫一扫领优惠券
                    </p>
                </div>
            </div>
            <div class="mside">
                <ul class="clearfix">
                    <li>
                        <p class="title">新手指南</p>
                        <p><a href="http://help.360kad.com/Shopping/shopWm" target="_blank" rel="nofollow">购物流程</a></p>
                        <p><a href="http://help.360kad.com/Novice/VipClass" target="_blank" rel="nofollow">会员级别</a></p>
                        <p><a href="http://help.360kad.com/Novice/IntegralDesc" target="_blank" rel="nofollow">积分说明</a></p>
                        <p><a href="http://help.360kad.com/Pay/Coupon" target="_blank" rel="nofollow">优惠券</a></p>
                        <p><a href="http://help.360kad.com/Novice/Question" target="_blank" rel="nofollow">常见问题</a></p>
                    </li>
                    <li>
                        <p class="title">配送方式</p>
                        <p><a href="http://help.360kad.com/Delivery/Freight" target="_blank" rel="nofollow">配送范围及运费</a></p>
                        <p><a href="http://help.360kad.com/Delivery/Privsend" target="_blank" rel="nofollow">隐私配送</a></p>
                        <p><a href="http://help.360kad.com/Delivery/Receipt" target="_blank" rel="nofollow">商品验收及签收</a></p>
                    </li>
                    <li>
                        <p class="title">支付方式</p>
                        <p><a href="http://help.360kad.com/Pay/Cash" target="_blank" rel="nofollow">货到付款</a></p>
                        <p><a href="http://help.360kad.com/Pay/OnlinePay" target="_blank" rel="nofollow">网上支付</a></p>
                        <p><a href="http://help.360kad.com/Pay/BankTrans" target="_blank" rel="nofollow">银行转账</a></p>
                        <p><a href="http://help.360kad.com/Pay/Mention" target="_blank" rel="nofollow">药店自提</a></p>
                    </li>
                    <li>
                        <p class="title">售后服务</p>
                        <p><a href="http://help.360kad.com/SaleAfter/ReturnsFlow" target="_blank" rel="nofollow">退换货流程</a></p>
                        <p><a href="http://help.360kad.com/SaleAfter/ReturnsPolicy" target="_blank" rel="nofollow">退换货政策</a></p>
                        <p><a href="http://help.360kad.com/SaleAfter/RefundFlow" target="_blank" rel="nofollow">退款流程</a></p>
                    </li>
                    <li>
                        <p class="title">特色服务</p>
                        <p><a href="http://user.360kad.com/club" target="_blank" rel="nofollow">会员俱乐部</a></p>
                        <p><a href="http://help.360kad.com/Feature/TouSuJianYi" target="_blank" rel="nofollow">投诉建议</a></p>
                        <p><a href="http://help.360kad.com/Feature/YongYaoZiXun" target="_blank" rel="nofollow">用药咨询 </a></p>
                        <p><a href="http://help.360kad.com/Feature/MianZeShengMing" target="_blank" rel="nofollow">免责声明 </a></p>
                    </li>
                    <li class="phonePic">
                        <p><img src="http://res.360kad.com/theme/default/img/product/2016new/kadPhoneBg.png" alt=""></p>
                        <!--  <p class="pt4">订购服务时间：9：00—23：00</p>
                        <p>售后服务时间：9：00—22：30</p> -->
                    </li>
                </ul>
            </div>
            <div class="clear"></div>
        </div>
    </div>
    <!--END康爱多掌上药店-->
</div>



<div class="footer_list" style="width: 100%;">
    <div class="width1200">

        <p>
            <span class="title">政府机构：</span><a href="http://www.nhfpc.gov.cn/" target="_blank" rel="nofollow">国家卫生和计划生育委员会</a>
            <a href="http://www.sda.gov.cn/" target="_blank" rel="nofollow">国家食品药品监督管理局</a>
            <a href="http://www.gdwst.gov.cn/" target="_blank" rel="nofollow">广东省卫生和计划生育委员会</a>
            <a href="http://www.gdda.gov.cn/" target="_blank" rel="nofollow">广东省食品药品监督管理局</a>
        </p>

        <!--关于康爱多网上药店-->
        <p class="aboutKadList">
            <a rel="nofollow" href="http://help.360kad.com/AboutKad/kadJieShao" target="_blank">关于我们</a> |
            <a href="http://www.360kad.com/zhuanti/kad_zsyd.shtml" target="_blank" rel="nofollow">掌上药店</a> |
            <a rel="nofollow" href="http://help.360kad.com/about/entitygz" target=" _blank">实体药店</a> |
            <a rel="nofollow" href="http://help.360kad.com/AboutKad/JiaRuKangAiDuo" target="_blank">加入康爱多</a> |
            <a href="http://help.360kad.com/AboutKad/LianXiWoMen" target="_blank" rel="nofollow">联系我们</a>  |
            <a href="http://www.360kad.com/zhuanti/service_provder.shtml" target="_blank" rel="nofollow">厂商合作</a>  |
            <a href="http://help.360kad.com/AboutKad/JingYingRenZheng" rel="nofollow" target="_blank">经营认证</a> |
            <a rel="nofollow" href="http://help.360kad.com/About/FriendlyLink" target="_blank">友情链接</a> |
            <a href="http://www.360kad.com/TagList.aspx" target="_blank">TAG列表</a> |
            <a href="http://www.360kad.com/SiteMap.shtml" target="_blank">网站地图</a> |
            <a href="http://cps.360kad.com/" target="_blank">CPS联盟</a>
        </p>
        <p class="diploma_list">
            <a class="pr8" rel="nofollow" title="互联网药品交易服务资格证书" target="_blank" href="http://help.360kad.com/about/AuthenBusiness">互联网药品交易服务资格证书</a>|
            <span class="bottomPadding01">
                <a rel="nofollow" title="互联网药品信息服务资格证书" target="_blank" href="http://help.360kad.com/About/AuthenInfo">互联网药品信息服务资格证书</a>
            </span>|
            <span class="bottomPadding01">
                <a rel="nofollow" title="执业药师证" target="_blank" href="http://help.360kad.com/About/AuthenPractice">执业药师证</a>
            </span>|
            <span class="bottomPadding02">
                <a rel="nofollow" title="药品经营许可证" target="_blank" href="http://help.360kad.com/About/AuthenManage">药品经营许可证</a>
            </span>|

            <span class="bottomPadding02">
                <a rel="nofollow" title="食品流通许可证" target="_blank" href="http://help.360kad.com/About/AuthenLiuTong">食品流通许可证</a>
            </span>|
            <span class="bottomPadding02">
                <a rel="nofollow" title="公司营业执照" target="_blank" href="http://help.360kad.com/About/Authen">公司营业执照</a>
            </span>|
            <span>
                <a rel="nofollow" title="GSP认证证书" target="_blank" href="http://help.360kad.com/About/AuthenGSP">GSP认证证书</a>
            </span>|
            <span>
                <a href="http://help.360kad.com/About/AuthenTeleservice" target="_blank" rel="nofollow">增值电信业务经营许可证 &nbsp;</a>
            </span>
        </p>
        <!--END关于康爱多网上药店-->
        <!--行业认证-->
        <ul class="hyRz clearfix">
            <li>
                <a rel="nofollow" href="http://www.miitbeian.gov.cn/" target="_blank" title="粤ICP备10212320号">
                    <img src="http://res2.360kad.com/theme/default/img/tool_icon1.png" alt="粤ICP备10212320号" style="display: inline;">
                </a>
                <a class="txt" rel="nofollow" title="粤ICP备10212320号" target="_blank" href="http://www.miitbeian.gov.cn/">粤ICP备10212320号</a>
            </li>
            <li>
                <a rel="nofollow" href="http://www.gdnet110.gov.cn/" target="_blank" title="网络110报警服务">
                    <img src="http://res.360kad.com/theme/default/img/tool_icon2.png" alt="网络110报警服务" style="display: inline;">
                </a>
                <a class="txt item01" rel="nofollow" title="网络110报警服务" target="_blank" href="http://www.gdnet110.gov.cn/">
                    网络110报警服务
                </a>
            </li>

            <li>
                <a rel="nofollow" href="http://netadreg.gzaic.gov.cn/ntmm/WebSear/WebLogoPub.aspx?logo=440101101012010072700090" target="_blank" title="红盾电子链接标识">
                    <img data-original="http://res1.360kad.com/theme/default/img/tool_icon5.jpg" src="http://res3.360kad.com/theme/default/img/tool_icon5.jpg" alt="" style="display: inline;">
                </a>
                <a class="txt item01 item02" rel="nofollow" title="红盾电子链接标识" target="_blank" href="http://netadreg.gzaic.gov.cn/ntmm/WebSear/WebLogoPub.aspx?logo=440101101012010072700090">
                    红盾电子链接标识
                </a>
            </li>
            <li>
                <a class="item03" rel="nofollow" target="_blank" href="https://search.szfw.org/cert/l/CX20130823002738003002" id="___szfw_logo___"><img width="83" height="30" src="http://res.360kad.com/theme/default/img/cx_icon6.jpg"></a>
                <script type="text/javascript">(function () { document.getElementById('___szfw_logo___').oncontextmenu = function () { return false; } })();</script>
            </li>
            <li>
                <a class="item03" style="display:block;" key="51c2d63c6856be2ce1761dce" logo_size="83x30" logo_type="realname" rel="nofollow" href="http://www.anquan.org/authenticate/cert/?site=www.360kad.com&amp;at=realname" target="_blank">
                    
                    <span style="display:none;" class="LOGO_aq_jsonp_wrap_" id="AQ_logo_span_init_1">
                        
                    </span><img src="http://res4.360kad.com/theme/default/img/sm_83x30.png" alt="安全联盟认证" width="83" height="30" style="border: none;">
                </a>
            </li>
            <li>
                <a style="display:block;padding-top:4px;" key="51c2d63c6856be2ce1761dce" logo_size="83x30" logo_type="business" rel="nofollow" href="http://www.anquan.org/authenticate/cert/?site=www.360kad.com&amp;at=business" target="_blank">

                    <span style="display:none;" class="LOGO_aq_jsonp_wrap_" id="AQ_logo_span_init_2"></span>
                    <img src="http://res3.360kad.com/theme/default/img/hy_83x30.png" alt="安全联盟认证" width="83" height="30" style="border: none;">
                </a>
            </li>
        </ul>
        <p class="bottom">&copy;2010-2016 广东<a href="http://www.360kad.com">康爱多网上药店</a>版权所有，并保留所有权利</p>
        <!--END行业认证-->

    </div>
</div>
<!--部件结束:home_footer_other-->

<!--end底部-->
<!--提示框 START-->
<div class="PromptBox Box-tips" id="showPrompt">
    <div class="BoxHead">
        <span class="BoxTitle">温馨提示</span>
        <a class="go_close" href="javascript:void(0)" onclick="closets(this)">&times;</a>
    </div>
    <div class="BoxBody clearfix">
        <p class="Bcon clearfix">
        </p>
    </div>
    <div class="Box-operate clearfix">
        <a href="javascript:void(0);" class="go_Cancel btn-White" onclick="closets(this)">取消<i></i></a>
        <a href="javascript:void(0);" class="go_sure btn-blue" onclick="closets(this)">确定<i></i></a>
    </div>
</div>
<!--提示框 END-->
<!--提示框 START-->
<div class="PromptBox Box-tips" id="showPrompt-fixed">
    <div class="BoxHead">
        <span class="BoxTitle">温馨提示</span>
        <a id="go_close_fixed" class="go_close" href="javascript:$('#go_Cancel_fixed').trigger('click');">&times;</a>
    </div>
    <div class="BoxBody clearfix">
        <p class="Bcon clearfix">
        </p>
    </div>
    <div class="Box-operate clearfix">
        <a href="javascript:void(0);" class="go_Cancel btn-White" id="go_Cancel_fixed">取消<i></i></a>
        <!--删除购物车按钮-->
        <a href="javascript:void(0);" class="go_sure btn-blue" onclick="DeleteCartAct();" id="go_sure_cart">确定<i></i></a>
        <!--删除购物车按钮-->
        <a href="javascript:void(0);" class="go_sure btn-blue" onclick="DeleteFavorAct();" id="go_sure_fav" style="display:none;">确定<i></i></a>
        <!--收藏按钮-->
        <a href="javascript:void(0);" class="go_sure btn-blue" onclick="rCreateFavoriteAct();" id="go_sure_isFav" style="display:none;">确定<i></i></a>
    </div>
</div>
<!--提示框 END-->

<!--统计代码-->
<!--部件开始:JS_www_Statistics,分组:通用部件-->
<div class="statistics" style="display:none;">

    <!-- 谷歌统计 start -->
    <script type="text/javascript">

        var _gaq = _gaq || [];
        _gaq.push(['_setAccount', 'UA-3051632-5']);
        _gaq.push(['_setDomainName', '.360kad.com']);
        _gaq.push(['_setAllowHash', false]);
        _gaq.push(['_addOrganic', 'soso', 'w']);
        _gaq.push(['_addOrganic', 'youdao', 'q']);
        _gaq.push(['_addOrganic', 'sogou', 'query']);
        _gaq.push(['_addOrganic', '360', 'q']);
        _gaq.push(['_addOrganic', 'baidu', 'word']);
        _gaq.push(['_addOrganic', 'baidu', 'q1']);
        _gaq.push(['_addOrganic', 'so.com', 'q']);
        _gaq.push(['_trackPageview']);

        (function() {
            var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
            ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
            var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
        })();

    </script>

    <!-- Google 再营销代码 -->
    <!-- <script type="text/javascript">
    var google_conversion_id = 972512314;
    var google_custom_params = window.google_tag_params;
    var google_remarketing_only = true;
    </script>
    <script type="text/javascript" src="//www.googleadservices.com/pagead/conversion.js">
    </script>
    <noscript>
    <div style="display:inline;">
    <img height="1" width="1" style="border-style:none;" alt="" src="//googleads.g.doubleclick.net/pagead/viewthroughconversion/972512314/?value=0&amp;guid=ON&amp;script=0"/>
    </div>
    </noscript>
    -->

    <!-- 中国站长 统计 start -->
    <script src="http://s9.cnzz.com/stat.php?id=2913503&web_id=2913503"  language="JavaScript"></script>
    <!--百度0628 -->
    <script type="text/javascript">
        var _bdhmProtocol = (("https:" == document.location.protocol) ? " https://" : " http://");
        document.write(unescape("%3Cscript src='" + _bdhmProtocol + "hm.baidu.com/h.js%3F7a942c91de8533c33ddabdacba23065b' type='text/javascript'%3E%3C/script%3E"));
    </script>
    <!--百度再营销0416 -->
    <script type="text/javascript">
        <!--
        var bd_cpro_rtid="nHRvPjm";
        //-->
    </script>
    <script type="text/javascript"  src="http://cpro.baidu.com/cpro/ui/rt.js"></script>
    <noscript>
        <div style="display:none;">
            <img height="0" width="0" style="border-style:none;" src="http://eclick.baidu.com/rt.jpg?t=noscript&rtid=nHRvPjm" />
        </div>
    </noscript>

</div>

    <div>
        <p>
            <?php echo $categoryId ?>
        </p>
    </div>

<!--部件结束:JS_www_Statistics-->

<!--统计代码结束-->

</body>
</html>



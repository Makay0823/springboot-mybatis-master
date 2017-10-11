/**
 * 
 * *********使用之前须引入jquery:地址为/js/common/jquery-1.11.2.min.js******
 * 
 * ----1封装获取根路径方法： baseTools.baseUrl 如http://ip：port/项目名称; baseTools.basePort
 * 如http://ip：port;
 * 
 * ----2封装ajax方法：*为必填项 示例： baseTools.AjaxJson({ url: _url, *请求地址,传项目名称后面的地址(带/)
 * type:_type, *请求方法 get/post; 默认为get styles:_styles 显示样式(数字):1~~9，有默认可不写
 * data:_data, 传入请求变量,如data：{"parentId":0} dataType:_dataType, 返回数据格式 :默认为json
 * callback:_callback 回调函数,如callback：[function(){alert("ssdas");}] });
 * ----3封装dataTable初始化及与服务端交互ajax方法，须在初始化时调用： tableTools.onInit({ ------必填项:
 * tableId:"collection_table", 传入参数table的id paramAjax:{ 请求条件,参数,非必需
 *  }, tableAjax:{ url: _url, 必须 type："post" , 默认 dataType : "json", 默认 async :
 * true 默认
 *  }, columns：[] 必须 ---------columns格式如下--> columns： [ { "data":
 * "article_state" }, { "data": "article_title" }, { "data": "channel_name" }, {
 * "data": "article_date" }, ..... ] ------<------- ---非必填项: language:
 * _language, //页脚提示信息{} autoWidth:false, 自动调整列宽:默认禁用
 * stripeClasses:stripeClasses, //为奇偶行加上样式，兼容不支持CSS伪类的场合[] processing:true,
 * 加载提示,自行处理：默认true serverSide:true, 启用服务器端分页(必须),不建议更改 searching：false,
 * //禁用原生搜索 orderMulti:false, //启用多列排序:默认禁用 order:[], //取消默认排序查询,否则复选框一列会出现小箭头
 * pagingType:"simple_numbers",分页样式：simple,simple_numbers,full,full_numbers
 * aLengthMenu:baseTools.basePageSize,每页显示多少条，取自baseTools.basePageSize;
 * columnDefs: _columnDefs, 列样式:
 *  })
 * 
 */
var baseTools = (function() {
	// 当前网址如http://ip：port/**/name1/name2
	var curWwwPath = window.document.location.href; // 当前网址
	var pathName = window.document.location.pathname; // /**/
	var pos = curWwwPath.indexOf(pathName);
	var localhostPaht = curWwwPath.substring(0, pos);// http://ip：port
	var projectName = pathName
			.substring(0, pathName.substr(1).indexOf('/') + 1);// 如http://ip：port/**
	return {
		baseUrl : projectName,
		basePort : localhostPaht,
		//web项目根路径，如变改，需同步修改
		baseWebName: localhostPaht+"/web",
		basePageSize : 8,
		// 导航条栏目数目：默认为8个（包含大厅首页在内），该参数在nav-configure.js中调用
		baseNavConfNum : 8,
		onInit : function() {
			curSeg = baseTools;
		},
		getUrlParam : function(name) {
			var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
			var r = window.location.search.substr(1).match(reg);
			if (r != null)
				return unescape(r[2]);
			return null;
		},
		AjaxJson : function(xhrArgs) {
			var styles = "styleload";
			if (typeof xhrArgs.styles != 'undefined') {
				styles = styles + xhrArgs.styles;
			}
			var bShow = false;
			if (typeof xhrArgs.bShow != 'undefined') {
				bShow = xhrArgs.bShow;
			}
			var traditional =false;
			if (typeof xhrArgs.traditional != 'undefined') {
				traditional = xhrArgs.traditional;
			}
			var url = xhrArgs.url;

			var async = true;
			if (xhrArgs.async != undefined)
				async = xhrArgs.async;
			var dataType = "json";
			if (xhrArgs.dataType != undefined)
				dataType = xhrArgs.dataType;
			var type = "GET";
			if (xhrArgs.type != undefined)
				type = xhrArgs.type;
			var data = {};
			if (xhrArgs.data != undefined) {
				data = xhrArgs.data;
			}
			;
			$.ajax({
				url : curSeg.baseUrl + url,
				type : type,
				async : async,
				traditional :traditional,
				dataType : dataType,
				// timeout:10000,
				// 要发送到服务器的数据
				// data : urlParam,
				data : data,
				beforeSend : function() {
					if (bShow)
						baseTools.showMask(styles);
				},
				// 当请求失败时调用的函数
				error : function(XMLHttpRequest, textStatus, errorThrown) {
					if (textStatus == 'timeout') {
						alert('连接服务器超时，请稍后再试！');
					} else {
						// 调用本次AJAX请求时传递的options参数
						alert('操作提示\n操作失败原因:' + textStatus + "\n" + errorThrown
								+ "\n" + " XMLHttpRequest.status:"
								+ XMLHttpRequest.status + "\n"
								+ " XMLHttpRequest.readyState:"
								+ XMLHttpRequest.readyState);
					}

					if (bShow)
						baseTools.hideMash(styles);
					// baseTools.hideMash(maskObj);
				},
				// 当请求成功时调用的函数
				success : function(data, textStatus) {
					if (bShow)
						baseTools.hideMash(styles);
					// baseTools.hideMash(maskObj);
					// this; // 调用本次AJAX请求时传递的options参数
					if (xhrArgs.callback)
						for ( var i = 0; i < xhrArgs.callback.length; i++)
							xhrArgs.callback[i](data, xhrArgs);

				},
				// 当请求完成时调用的函数
				complete : function() {

				}
			});
		},
		showMask : function(styles) {
//			$("#" + styles).show();
		},
		hideMash : function(styles) {
//			$("#" + styles).hide();
		},
		showMaskDataTable : function(styles) {
			// var ss = $("#"+styles).attr("class");
			// console.log(ss);
//			console.log($("#" + styles));
//			if (!$("#" + styles).hasClass("page-loading")) {
//				$("#" + styles).addClass("page-loading");
//			}
//			$("#" + styles).show();
		},
		hideMashDataTable : function(styles) {
//			if ($("#" + styles).hasClass("page-loading")) {
//				$("#" + styles).removeClass("page-loading");
//			}
//			$("#" + styles).hide();
		},
		getCookie : function(name) {
			var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
			if (arr = document.cookie.match(reg))
				return unescape(arr[2]);
			else
				return null;
		},
		// 获取导航栏对象，固定导航栏;适用于数据中心2级菜单
		asideStyleData : function(name) {
//			var sidename = "#" + name;
//			$(sidename).parent().addClass("active");
//			$(sidename).parent().parent().parent().addClass("open");
		},
		// 获取导航栏对象，固定导航栏;适用于管理中心3级菜单
		asideStyle : function(name) {
//			var sidename = "#" + name;
//			var ids = $(sidename).parent().parent().parent().parent().parent().attr("id");
//			if(ids != undefined && ids != null && ids != ""){
//				$("[href='#"+ids+"']").parent().siblings().children("a").removeClass("active");
//				$("[href='#"+ids+"']").show().focus().attr("class","active").click();
//			}
//			$(sidename).parent().addClass("active").siblings().removeClass("active");;
//			$(sidename).parent().parent().parent().addClass("open").siblings().removeClass("open");
			
		},
		/*
		 * 根据form 的id
		 * 获取dom[input(text,hidden,password根据id取值,radio根据name取值),textarea]的元素的值
		 * 
		 */
		preparePostData : function(formNames) {
			// var formNames = "area_form" ;
			var result = {};
			if (formNames) {
				var formObj = document.getElementById(formNames);
				if (formObj)
					for ( var i = 0; i < formObj.elements.length; i++) {
						var el = formObj.elements[i];
						var tagName = el.tagName.toLowerCase();
						if (tagName == "textarea" && el.id != "") {
							// el.value = this.repHtml(el.value);
							result[el.id] = el.value;
						} else if (tagName == "input" && el.id != "") {
							if (el.type.toLowerCase() == "text") {
								result[el.id] = el.value;
							} else if (el.type.toLowerCase() == "hidden") {
								result[el.id] = el.value;
							} else if (el.type.toLowerCase() == "password") {
								result[el.id] = el.value;
							} else if (el.type.toLowerCase() == "radio") {// radio是根据name取值和value;
								if (el.checked) {
									result[el.name] = el.value;
								}
							}
						}
					}

			}
			// console.log(result);
			return JSON.stringify(result);
		},
		/**
		 * 全选方法：点击选择全部;在全选上添加此方法 obj1 表头checkbox的dom组件的name(全选) obj2
		 * 表中CheckBox的dom组件的name(单个)
		 */
		checkAll : function(obj1, obj2) {
			var checkAll = document.getElementsByName(obj1);
			var check = document.getElementsByName(obj2);
			for ( var i = 0; i < checkAll.length; i++) {
				if (checkAll[i].checked) {
					for ( var i = 0; i < check.length; i++) {
						check[i].checked = true;
					}
				} else {
					for ( var i = 0; i < check.length; i++) {
						check[i].checked = false;
					}
				}
			}
		},
		/**
		 * 单选方法：点击全部则选择全部，点击单个则选择单个; obj1 表头checkbox的dom组件的name(全选) obj2
		 * 表中CheckBox的dom组件的name(单个)
		 */
		checkOne : function(obj1, obj2) {
			var checkAll = document.getElementsByName(obj1);
			var check = document.getElementsByName(obj2);
			var flag;
			for ( var i = 0; i < check.length; i++) {
				if (check[i].checked) {
					flag = true;
				} else {
					flag = false;
					break;
				}
			}
			for ( var i = 0; i < checkAll.length; i++) {
				checkAll[i].checked = flag;
			}
		},
		alertP : function(_arg){
			/*$("head").append("<script>");
			script1 = $("head").children(":last");
			script1.attr({
				type : "text/javascript",
				src : curSeg.baseUrl + "/js/common/jquery.dataTables.min.js"
			});*/
			
//			_getStyleDiv();
//			_arg = _arg ||"ok";
//			$("#base_tool_alert_info span.alert-words").html(_arg);
//			$("#base_tool_alert_info").openModal();
			 
		}, 
		getUUID :function(){
			return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
		        return v.toString(16);
		    });
		},

		checkIsNotNull:function( formId){
			var form = document.getElementById(formId);
			var objArr = [];  //用于存放所有需校验的子元素ID
			var objMesArr = [];  //用于存放所有需校验的子元素名称
			for(var i = 0 , j = form.length;i <j;++i){
				var valId = form[i].getAttribute("msg")|| form[i].getAttribute("msg0");
				if(valId != null ){
					objArr.push(form[i].getAttribute("id"));
				}
			}
			var isTrue =true ;
			if(objArr.length == 0 ){
				return isTrue;
			}
			var msg ="";
			var errorMsg1 = "";
			for(var i = 0 ; i < objArr.length ; i++){
				var requiredTrue = document.getElementById(objArr[i]).getAttribute("required");
				var msgTip = document.getElementById(objArr[i]).getAttribute("msg");
				if( $("#"+objArr[i]).val() == null||$("#"+objArr[i]).val().trim()=="" && requiredTrue =="required" && msgTip!=null){
					msg += msgTip+ "不允许为空 ;\n";
					isTrue =false;
				}else if($("#"+objArr[i]).val().trim()!=""){
					var tempmsg = baseTools.checkObjValidat(objArr[i]);
					if(tempmsg != ""){
						msg += tempmsg;
						isTrue =false;
					}
				}
			}
			if(!isTrue){
				alert(msg);
//				baseTools.alertP(msg);
			} 
			return isTrue;
		},
		checkObjValidat:function(objId){
			var msg="" ;
			 var obj = document.getElementById(objId);
			 var cnList =(obj.getAttribute("validat")+"").split(",");
			 for(var i = 0 ; i < cnList.length ; i++){
				 var className =vaildate.getRulesName(cnList[i]);
				 if( className && !className.test(obj.value)){
					 msg =obj.getAttribute("msg"+i)+";\n";
					 i = cnList.length -1;
				 };
			}
			return msg;
		}
		
	}
})();
baseTools.onInit();
var vaildate ={};
vaildate.getRulesName = function(className){
	for(var key in vaildate ){
		 if( key == className){
			 return vaildate[key];
		 }
	}
	return null;
	   
}
 
/**
 * 修改所有弹出框样式，暂时不可用
 */
/*window.alert=function(_args){
	baseTools.alertP(_args);
};*/

baseTools.parse = function(strJson) {
	return (/[\]\}]$/.test(strJson)) ? eval("(" + strJson + ")") : strJson;
};
//转换json对象为字符串
baseTools.stringify = function(object) {
	var type = typeof object;
	if ('object' == type) {
		if ((object != null) && (Array == object.constructor))
			type = 'array';
		else if ((object != null) && (RegExp == object.constructor))
			type = 'regexp';
		else
			type = 'object';
	}
	var results = [];
	switch (type) {
	case 'undefined':
	case 'unknown':
		return;
		break;
	case 'function':
	case 'boolean':
	case 'regexp':
		return object.toString();
		break;
	case 'number':
		return isFinite(object) ? object.toString() : 'null';
		break;
	case 'string':
		return '"' + object.replace(/(\\|\")/g, "\\$1").replace(/\n|\r|\t/g, function() {
			var a = arguments[0];
			return (a == '\n') ? '\\n' : (a == '\r') ? '\\r' : (a == '\t') ? '\\t' : ""
		}) + '"';
		break;
	case 'object':
		if (object === null)
			return 'null';
		results.length = 0;
		for ( var property in object) {
			var value = this.stringify(object[property]);
			if (value !== undefined)
				results.push(this.stringify(property) + ':' + value);
		}
		return '{' + results.join(',') + '}';
		break;
	case 'array':
		results.length = 0;
		for (var i = 0; i < object.length; i++) {
			var value = this.stringify(object[i]);
			if (value !== undefined)
				results.push(value);
		}
		return '[' + results.join(',') + ']';
		break;
	}
};
//var _loadDiv = false;
//function _getStyleDiv() {
//	var _styleDiv = '<div class="loading-wrap loading-active" id="styleload1" style="display: none">'
//			+ '<div class="sk-spinner sk-spinner-rotating-plane"></div>'
//			+ '</div>'
//			+ ' <div class="loading-wrap loading-active"  id="styleload" style="display: none">'
//			+ '   <div class="sk-spinner sk-spinner-double-bounce">'
//			+ '      <div class="sk-double-bounce1"></div>'
//			+ '      <div class="sk-double-bounce2"></div>'
//			+ '  </div>'
//			+ '</div> '
//			+ '<div class="loading-wrap loading-active" id="styleload2" style="display: none">'
//			+ '  <div class="sk-spinner sk-spinner-wave">'
//			+ '     <div class="sk-rect1"></div>'
//			+ '     <div class="sk-rect2"></div>'
//			+ '     <div class="sk-rect3"></div>'
//			+ '    <div class="sk-rect4"></div>'
//			+ '    <div class="sk-rect5"></div>'
//			+ '        </div>'
//			+ '     </div>  '
//			+ '    <div class="loading-wrap loading-active" id="styleload3" style="display: none">'
//			+ '     <div class="sk-spinner sk-spinner-wandering-cubes">'
//			+ '        <div class="sk-cube1"></div>'
//			+ '       <div class="sk-cube2"></div>'
//			+ '  </div>'
//			+ ' </div>  '
//			+ '  <div class="loading-wrap loading-active" id="styleload4" style="display: none">'
//			+ '     <div class="sk-spinner sk-spinner-pulse"></div>'
//			+ ' </div>'
//			+ ' <div class="loading-wrap loading-active" id="styleload5" style="display: none">'
//			+ '   <div class="sk-spinner sk-spinner-chasing-dots">'
//			+ '       <div class="sk-dot1"></div>'
//			+ '       <div class="sk-dot2"></div>'
//			+ '   </div>'
//			+ ' </div>'
//			+ ' <div class="loading-wrap loading-active" id="styleload6" style="display: none">'
//			+ '   <div class="sk-spinner sk-spinner-three-bounce">'
//			+ '       <div class="sk-bounce1"></div>'
//			+ '       <div class="sk-bounce2"></div>'
//			+ '       <div class="sk-bounce3"></div>'
//			+ '   </div>'
//			+ ' </div>'
//			+ ' <div class="loading-wrap loading-active" id="styleload7" style="display: none">'
//			+ '    <div class="sk-spinner sk-spinner-circle">'
//			+ '        <div class="sk-circle1 sk-circle"></div>'
//			+ '        <div class="sk-circle2 sk-circle"></div>'
//			+ '        <div class="sk-circle3 sk-circle"></div>'
//			+ '        <div class="sk-circle4 sk-circle"></div>'
//			+ '        <div class="sk-circle5 sk-circle"></div>'
//			+ '        <div class="sk-circle6 sk-circle"></div>'
//			+ '        <div class="sk-circle7 sk-circle"></div>'
//			+ '        <div class="sk-circle8 sk-circle"></div>'
//			+ '        <div class="sk-circle9 sk-circle"></div>'
//			+ '        <div class="sk-circle10 sk-circle"></div>'
//			+ '        <div class="sk-circle11 sk-circle"></div>'
//			+ '        <div class="sk-circle12 sk-circle"></div>'
//			+ '    </div>'
//			+ '  </div>'
//			+ '  <div class="loading-wrap loading-active" id="styleload8" style="display: none">'
//			+ '    <div class="sk-spinner sk-spinner-cube-grid">'
//			+ '        <div class="sk-cube"></div>'
//			+ '        <div class="sk-cube"></div>'
//			+ '        <div class="sk-cube"></div>'
//			+ '        <div class="sk-cube"></div>'
//			+ '        <div class="sk-cube"></div>'
//			+ '        <div class="sk-cube"></div>'
//			+ '        <div class="sk-cube"></div>'
//			+ '        <div class="sk-cube"></div>'
//			+ '        <div class="sk-cube"></div>'
//			+ '    </div>'
//			+ '   </div>'
//			+ '   <div class="loading-wrap loading-active" id="styleload9" style="display: none">'
//			+ '     <div class="sk-spinner sk-spinner-fading-circle">'
//			+ '           <div class="sk-circle1 sk-circle"></div>'
//			+ '           <div class="sk-circle2 sk-circle"></div>'
//			+ '           <div class="sk-circle3 sk-circle"></div>'
//			+ '           <div class="sk-circle4 sk-circle"></div>'
//			+ '           <div class="sk-circle5 sk-circle"></div>'
//			+ '           <div class="sk-circle6 sk-circle"></div>'
//			+ '           <div class="sk-circle7 sk-circle"></div>'
//			+ '           <div class="sk-circle8 sk-circle"></div>'
//			+ '           <div class="sk-circle9 sk-circle"></div>'
//			+ '           <div class="sk-circle10 sk-circle"></div>'
//			+ '           <div class="sk-circle11 sk-circle"></div>'
//			+ '            <div class="sk-circle12 sk-circle"></div>'
//			+ '        </div>' + '    </div>' 
//	//弹出提示框
//			+ '<div id="base_tool_alert_info" class="modal alert-modal">'
//			+ '  <div class="modal-content ">'
//			+ '    <div class="alert-content">'
//			+ '      <span class="alert-icon green "><i class="md md-done  white-text"></i></span>'
//			+ '      <span class="alert-words ">ok！</span>'
//			+ '      <div class="clearfix"></div>'
//			+ '    </div>'
//			+ '  </div>'
//			+ '  <div class="modal-footer">'
//			+ '      <a  class=" modal-close waves-effect waves-green btn-flat ">确定</a>'
//			+ '  </div>'
//			+ '</div>';
//				
//				
//            	
//			
//		
//		 
//	
//	setTimeout(function() {
//		if (!_loadDiv) {
//			$("body").append(_styleDiv);
//			_loadDiv = true;
//		}
//	}, 200);
//}
 

vaildate.sfzh=/^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/;//身份证号
vaildate.English = /^[A-Za-z]+$/;
vaildate.msgEnglish = "英文名只允许英文字母";
vaildate.Email = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
vaildate.Phone = /^((\(\d{2,3}\))|(\d{3}\-))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}(\-\d{1,4})?$/;
vaildate.Mobile = /^[1][3-8]\d{9}$/;
vaildate.Url = /^http:\/\/[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/;
vaildate.IdCard = "this.IsIdCard(value)";
vaildate.Currency = /^\d+(\.\d+)?$/;
vaildate.Number = /^\d+$/;
vaildate.Zip = /^[1-9]\d{5}$/;
vaildate.QQ = /^[1-9]\d{4,8}$/;
vaildate.Integer = /^[-\+]?\d+$/;
vaildate.Double = /^[-\+]?\d+(\.\d+)?$/;
vaildate.Chinese = /^[\u0391-\uFFE5]+$/;
vaildate.Username = /^[a-z]\w{3,}$/i;
vaildate.UnSafe = /^(([A-Z]*|[a-z]*|\d*|[-_\~!@#\$%\^&\*\.\(\)\[\]\{\}<>\?\\\/\'\"]*)|.{0,5})$|\s/;
vaildate.dh = /(^((\(\d{2,3}\))|(\d{3}\-))?(\(0\d{2,3}\)|0\d{2,3}-?)?[1-9]\d{6,7}(\-\d{1,4})?$)|(^((\(\d{2,3}\))|(\d{3}\-))?(13|15|18|17)\d{9}$)/; //电话包括固话和手机	Validator.IsSafe = function(str){return !this.UnSafe.test(str);};
vaildate.SafeString = "this.IsSafe(value)";
vaildate.Filter = "this.DoFilter(value, getAttribute('accept'))";
vaildate.Limit = "this.limit(value.length,getAttribute('min'),  getAttribute('max'))";
vaildate.LimitB = "this.limit(this.LenB(value), getAttribute('min'), getAttribute('max'))";
vaildate.Date = "this.IsDate(value, getAttribute('min'), getAttribute('format'))";
vaildate.Repeat = "value == document.getElementsByName(getAttribute('to'))[0].value";
vaildate.htCurrency = /^[-]?[\d]{1,9}(\.[\d]{1,2})?$/;//货币验证
vaildate.ZDouble = /^[+]?\d+(\.\d+)?$/;//非负数
vaildate.ZFloat = /^[1-9]\d*\.\d*|0\.\d*[1-9]\d*$/;//正数
vaildate.ChinaOrNumbOrLett = /^[0-9|\[|\]_a-zA-Z\u4e00-\u9fa5]+$/;//中文数字英文
vaildate.NumbOrLett = /^[0-9a-zA-Z]+$/;//数字英文
vaildate.czybh = /^([0-9]{3})$/;
vaildate.fphm = /^((\d){8})$/;
vaildate.fpdm = /^((\d){12})$/;
vaildate.NSRSBH = /^(([A-Z0-9|-]{15})|([A-Z0-9|-]{17})|([A-Z0-9|-]{18})|([A-Z0-9|-]{19})|([A-Z0-9|-]{20}))+$/; //纳税人识别号（大写字母+数字）
vaildate.nsrsbh = /^(([a-zA-Z0-9|-]{15})|([a-zA-Z0-9|-]{17})|([a-zA-Z0-9|-]{18})|([a-zA-Z0-9|-]{19})|([a-zA-Z0-9|-]{20}))+$/; //纳税人识别号（大小写字母+数字）
vaildate.fkg = /\S/; //非空字符
vaildate.zzs = /^[1-9]*[1-9][0-9]*$/;  //正整数
vaildate.zfds = /^(([1-9]+[0-9]*.{1}[0-9]+)|(0\.[1-9]+[0-9]*)|([1-9][0-9]*)|(0\.[0-9]*[1-9]+))$/;
vaildate.cjhm = /^[A-Za-z0-9|-]+$/;  //车架号码
vaildate.msgtszf = "不允许输入特殊字符";
vaildate.tszf = /^[^<>]+$/;
vaildate.Zip1 = /^((\d){6})$/;
vaildate.username = /^[^`~!@#$%^&*()+=|\\\][\]\{\}:;'\,.<>\?\s]{1}[^`~!@$%^&()+=|\\\][\]\{\}:;'\,.<>?\s]{0,15}$/;//用户名称
vaildate.username2 = /^[^`~!@#$%^&*()+=|\\\][\]\{\}:;'\,.<>\?\s]{1}[^`~!@$%^&()+=|\\\][\]\{\}:;'\,.<>?\s]{0,100}$/;//用户名称校验0-100,支持中文符号
vaildate.dhhm = /^(((\(\d{2,3}\))|(\d{3}\-))?13\d{9})|(((\(\d{2,3}\))|(\d{3}\-))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}(\-\d{1,4})?)$/;
vaildate.yzbm = /^[1-9][0-9]{5}$/;   //邮政编码
 
$(function() {
	var page = Util.getQueryString('page') || 1;
	var pageTotal = parseInt($('#pageTotal').val());
	var firstPageVal = $('#inputFirstPage').val();
	var lastPageVal = $('#inputLastPage').val();
	$("#page").page({
    totalPages: pageTotal, //分页总数
    initPage: 1, //初始页数
		liNums: 9, //分页的数字按钮数(建议取奇数)
		firstPage: firstPageVal,
		lastPage: lastPageVal,
    activeClass: "active", //active 类样式定义
    callBack: function(page) {
			PageHandle({
				page: page,
				pageSize: 10
			});
    }
	}).page('setPage', parseInt(page));
});

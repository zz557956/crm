define(['jquery', 'bootstrap', 'backend', 'table', 'form'], function ($, undefined, Backend, Table, Form) {

    var Controller = {
        index: function () {
            // 初始化表格参数配置
            Table.api.init({
                extend: {
                    index_url: 'customer/customer/index' + location.search,
                    add_url: 'customer/customer/add',
                    edit_url: 'customer/customer/edit',
                    del_url: 'customer/customer/del',
                    multi_url: 'customer/customer/multi',
                    import_url: 'customer/customer/import',
                    table: 'customer',
                }
            });

            var table = $("#table");

            // 初始化表格
            table.bootstrapTable({
                url: $.fn.bootstrapTable.defaults.extend.index_url,
                pk: 'id',
                sortName: 'id',
                fixedColumns: true,
                fixedRightNumber: 1,
                columns: [
                    [
                        {checkbox: true},
                        {field: 'id', title: __('Id')},
                        {field: 'name', title: __('Name'), operate: 'LIKE'},
                        {field: 'wx_number', title: __('Wx_number'), operate: 'LIKE'},
                        {field: 'mobile', title: __('Mobile'), operate: 'LIKE'},
                        {field: 'birthday', title: __('Birthday'), operate:'RANGE', addclass:'datetimerange', autocomplete:false},
                        {field: 'individuality', title: __('个人特征'), searchList: {"high":__('Individuality high'),"normal":__('Individuality normal'),"short":__('Individuality short'),"fat":__('Individuality fat'),"symmetrical":__('Individuality symmetrical'),"thinl":__('Individuality thinl'),"glasses":__('Individuality glasses')}, operate:'FIND_IN_SET', formatter: Table.api.formatter.label},
                        {field: 'favorite', title: __('喜爱特征'), searchList: {"travel":__('Favorite travel'),"cuisinel":__('Favorite cuisinel'),"hiking":__('Favorite hiking'),"games":__('Favorite games'),"billiards":__('Favorite billiards'),"others":__('Favorite others')}, operate:'FIND_IN_SET', formatter: Table.api.formatter.label},
                        {field: 'like_sales', title: __('Like_sales'), searchList: {"high":__('Like_sales high'),"small":__('Like_sales small'),"celebrity":__('Like_sales celebrity'),"face":__('Like_sales face'),"breasts":__('Like_sales breasts'),"others":__('Like_sales others')}, operate:'FIND_IN_SET', formatter: Table.api.formatter.label},
                        {field: 'co.mainjson', title: __('主酒水促销员'), operate: 'LIKE', visible: false},
                        {field: 'co.consumptiondate', title: __('消费日期'), operate:'RANGE', addclass:'datetimerange', autocomplete:false,visible: false},
                        {field: 'co.drinks', title: __('消费酒水'), searchList: {"imported":__('Drinks imported'),"aluminum":__('Drinks aluminum'),"bottled":__('Drinks bottled'),"redwine":__('Drinks redwine'),"others":__('Drinks others')}, operate:'LIKE', formatter: Table.api.formatter.label, visible: false},
                        {field: 'consumption_drinks', title: __('消费酒水'), searchList: {"imported":__('Drinks imported'),"aluminum":__('Drinks aluminum'),"bottled":__('Drinks bottled'),"redwine":__('Drinks redwine'),"others":__('Drinks others')}, operate:'LIKE', formatter: Table.api.formatter.label,searchable: false},
                        {field: 'consumption_date', title: __('消费日期'), operate:'RANGE', addclass:'datetimerange', autocomplete:false,searchable: false},
                        {field: 'createtime', title: __('Createtime'), operate:'RANGE', addclass:'datetimerange', autocomplete:false, formatter: Table.api.formatter.datetime},
                        {field: 'updatetime', title: __('Updatetime'), operate:'RANGE', addclass:'datetimerange', autocomplete:false, formatter: Table.api.formatter.datetime},
                       //操作栏,默认有编辑、删除或排序按钮,可自定义配置buttons来扩展按钮
                       {
                        field: 'operate',
                        width: "150px",
                        title: __('Operate'),
                        table: table,
                        events: Table.api.events.operate,
                        buttons: [
                            {
                                name: 'detail',
                                title: __('弹出窗口打开'),
                                classname: 'btn btn-xs btn-primary btn-dialog',
                                icon: 'fa fa-list',
                                url: 'customer/customer/list'
                            }
                        ],
                        formatter: Table.api.formatter.operate
                       },
                    ]
                ]
            });

            // 为表格绑定事件
            Table.api.bindevent(table);
        },
        add: function () {
            Controller.api.bindevent();
        },
        edit: function () {
            Controller.api.bindevent();
        },
        api: {
            bindevent: function () {
                Form.api.bindevent($("form[role=form]"));
            }
        }
    };
    return Controller;
});

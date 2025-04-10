define(['jquery', 'bootstrap', 'backend', 'table', 'form'], function ($, undefined, Backend, Table, Form) {

    var Controller = {
        index: function () {
            // 初始化表格参数配置
            Table.api.init({
                extend: {
                    index_url: 'consumption/consumption/index' + location.search,
                    add_url: 'consumption/consumption/add',
                    edit_url: 'consumption/consumption/edit',
                    del_url: 'consumption/consumption/del',
                    multi_url: 'consumption/consumption/multi',
                    import_url: 'consumption/consumption/import',
                    table: 'consumption',
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
                        {field: 'customer_id', title: __('Customer_id')},
                        {field: 'customer.name', title: __('客户称呼'), operate: 'LIKE'},
                        {field: 'customer.wx_number', title: __('客户微信'), operate: 'LIKE'},
                        {field: 'customer.mobile', title: __('客户手机号'), operate: 'LIKE'},
                        {field: 'room_number', title: __('Room_number'), operate: 'LIKE'},
                        {field: 'car_number', title: __('Car_number'), operate: 'LIKE'},
                        {field: 'consumptiondate', title: __('Consumptiondate'), operate:'RANGE', addclass:'datetimerange', autocomplete:false},
                        {field: 'mainjson', title: __('主酒水促销员'), operate: 'LIKE', visible: false},
                        {field: 'drinks', title: __('消费酒水'), searchList: {"imported":__('Drinks imported'),"aluminum":__('Drinks aluminum'),"bottled":__('Drinks bottled'),"redwine":__('Drinks redwine'),"others":__('Drinks others')}, operate:'FIND_IN_SET', formatter: Table.api.formatter.label},
                        {field: 'thali', title: __('Thali'), operate: 'LIKE', table: table, class: 'autocontent', formatter: Table.api.formatter.content},
                        {field: 'amount', title: __('Amount'), operate:'BETWEEN'},
                        {field: 'other_info', title: __('Other_info'), operate: 'LIKE', table: table, class: 'autocontent', formatter: Table.api.formatter.content},
                        {field: 'feedback', title: __('Feedback'), searchList: {"praise":__('Feedback praise'),"complaints":__('Feedback complaints'),"suggestions":__('Feedback suggestions')}, operate:'FIND_IN_SET', formatter: Table.api.formatter.label},
                        {field: 'remarks', title: __('Remarks'), operate: 'LIKE', table: table, class: 'autocontent', formatter: Table.api.formatter.content},
                        {field: 'createtime', title: __('Createtime'), operate:'RANGE', addclass:'datetimerange', autocomplete:false, formatter: Table.api.formatter.datetime},
                        {field: 'updatetime', title: __('Updatetime'), operate:'RANGE', addclass:'datetimerange', autocomplete:false, formatter: Table.api.formatter.datetime},
                        {field: 'operate', title: __('Operate'), table: table, events: Table.api.events.operate, formatter: Table.api.formatter.operate},
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

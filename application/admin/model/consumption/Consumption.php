<?php

namespace app\admin\model\consumption;

use think\Model;


class Consumption extends Model
{

    

    

    // 表名
    protected $name = 'consumption';
    
    // 自动写入时间戳字段
    protected $autoWriteTimestamp = 'integer';

    // 定义时间戳字段名
    protected $createTime = 'createtime';
    protected $updateTime = 'updatetime';
    protected $deleteTime = false;

    // 追加属性
    protected $append = [
        'drinks_text',
        'feedback_text'
    ];
    

    
    public function getDrinksList()
    {
        return ['imported' => __('Drinks imported'), 'aluminum' => __('Drinks aluminum'), 'bottled' => __('Drinks bottled'), 'redwine' => __('Drinks redwine'), 'others' => __('Drinks others')];
    }

    public function getFeedbackList()
    {
        return ['praise' => __('Feedback praise'), 'complaints' => __('Feedback complaints'), 'suggestions' => __('Feedback suggestions')];
    }


    public function getDrinksTextAttr($value, $data)
    {
        $value = $value ?: ($data['drinks'] ?? '');
        $valueArr = explode(',', $value);
        $list = $this->getDrinksList();
        return implode(',', array_intersect_key($list, array_flip($valueArr)));
    }


    public function getFeedbackTextAttr($value, $data)
    {
        $value = $value ?: ($data['feedback'] ?? '');
        $valueArr = explode(',', $value);
        $list = $this->getFeedbackList();
        return implode(',', array_intersect_key($list, array_flip($valueArr)));
    }

    protected function setDrinksAttr($value)
    {
        return is_array($value) ? implode(',', $value) : $value;
    }

    protected function setFeedbackAttr($value)
    {
        return is_array($value) ? implode(',', $value) : $value;
    }


    public function customer()
    {
        return $this->belongsTo('app\admin\model\customer\Customer', 'customer_id', 'id', [], 'LEFT')->setEagerlyType(0);
    }
}

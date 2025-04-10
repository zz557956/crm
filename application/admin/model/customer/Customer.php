<?php

namespace app\admin\model\customer;

use think\Model;


class Customer extends Model
{

    

    

    // 表名
    protected $name = 'customer';
    
    // 自动写入时间戳字段
    protected $autoWriteTimestamp = 'integer';

    // 定义时间戳字段名
    protected $createTime = 'createtime';
    protected $updateTime = 'updatetime';
    protected $deleteTime = false;

    // 追加属性
    protected $append = [
        'individuality_text',
        'favorite_text',
        'like_sales_text'
    ];
    

    
    public function getIndividualityList()
    {
        return ['high' => __('Individuality high'), 'normal' => __('Individuality normal'), 'short' => __('Individuality short'), 'fat' => __('Individuality fat'), 'symmetrical' => __('Individuality symmetrical'), 'thinl' => __('Individuality thinl'), 'glasses' => __('Individuality glasses')];
    }

    public function getFavoriteList()
    {
        return ['travel' => __('Favorite travel'), 'cuisinel' => __('Favorite cuisinel'), 'hiking' => __('Favorite hiking'), 'games' => __('Favorite games'), 'billiards' => __('Favorite billiards'), 'others' => __('Favorite others')];
    }

    public function getLikeSalesList()
    {
        return ['high' => __('Like_sales high'), 'small' => __('Like_sales small'), 'celebrity' => __('Like_sales celebrity'), 'face' => __('Like_sales face'), 'breasts' => __('Like_sales breasts'), 'others' => __('Like_sales others')];
    }


    public function getIndividualityTextAttr($value, $data)
    {
        $value = $value ?: ($data['individuality'] ?? '');
        $valueArr = explode(',', $value);
        $list = $this->getIndividualityList();
        return implode(',', array_intersect_key($list, array_flip($valueArr)));
    }


    public function getFavoriteTextAttr($value, $data)
    {
        $value = $value ?: ($data['favorite'] ?? '');
        $valueArr = explode(',', $value);
        $list = $this->getFavoriteList();
        return implode(',', array_intersect_key($list, array_flip($valueArr)));
    }


    public function getLikeSalesTextAttr($value, $data)
    {
        $value = $value ?: ($data['like_sales'] ?? '');
        $valueArr = explode(',', $value);
        $list = $this->getLikeSalesList();
        return implode(',', array_intersect_key($list, array_flip($valueArr)));
    }

    protected function setIndividualityAttr($value)
    {
        return is_array($value) ? implode(',', $value) : $value;
    }

    protected function setFavoriteAttr($value)
    {
        return is_array($value) ? implode(',', $value) : $value;
    }

    protected function setLikeSalesAttr($value)
    {
        return is_array($value) ? implode(',', $value) : $value;
    }

     // 一对多关联消费记录
     public function consumptions()
     {
         return $this->hasMany('app\admin\model\consumption\Consumption', 'customer_id', 'id');
     }


}

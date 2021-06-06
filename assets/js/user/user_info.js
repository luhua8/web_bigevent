$(function() {
    var form = layui.form;
    var layer = layui.layer;

    // 创建自定义验证规则
    form.verify({
        nickname: function(value) {
            if (value.length > 6) {
                return '昵称长度必须在1~6个字符之间'
            }
        }
    })

    // 调用用户信息方法
    initUserInfo();

    // 初始化用户信息
    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败！')
                }
                // 调用form.val()快速为表单赋值
                layui.form.val('formUserInfo', res.data)
            }
        })
    }

    // 重置表单的数据
    $('#btnReset').on('click', function(e) {
        e.preventDefault();
        initUserInfo();
    })

    // 提交修改事件
    $('.layui-form').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: form.val('formUserInfo'),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('修改提交失败！')
                }
                initUserInfo();
                layer.msg('更新用户信息成功！');
                // 调用父页面的方法，重新渲染用户头像和用户信息
                window.parent.getUserInfo();
            }
        })
    })
})
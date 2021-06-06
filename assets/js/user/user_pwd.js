$(function() {
    var layer = layui.layer;
    var form = layui.form;
    // 自定义表单验证
    form.verify({
        psd: function(value) {
            if (value.length < 6 || value.length > 12 || value.indexOf(' ') !== -1) {
                return '密码长度应在6~12位之间，且不能出现空格';
            }
        },
        rpsd: function(value) {
            var pwd = $('.layui-form [name=newPwd]').val();
            if (value !== pwd) {
                return '两次密码不一致';
            }
        },
        npsd: function(value) {
            var pwd = $('.layui-form [name=oldPwd]').val();
            if (value === pwd) {
                return '新密码不能与原密码一样！';
            }
        }
    })

    // 修改密码
    $('.layui-form').on('submit', function(e) {
        // 阻止默认提交事件
        e.preventDefault();
        // 将修改的密码提交到后台
        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            data: form.val('formPwd'),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('更新密码失败！')
                }
                layer.msg(res.message);
                // 转换为dom元素后可以reset重置表单
                $('.layui-form')[0].reset();
            }
        })
    })
})
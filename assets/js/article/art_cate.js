$(function() {
    var layer = layui.layer;
    var form = layui.form;
    getArticleList();

    // 获取文章列表
    function getArticleList() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('获取文章类别失败！');
                }
                var trs = [];
                for (var i = 0; i < res.data.length; i++) {
                    var tr = '<tr><td>' + res.data[i].name + '</td><td>' + res.data[i].alias + '</td><td><button type="button" class="layui-btn tr-btn" id="btn_edit" data-id="' + res.data[i].Id + '">编辑</button><button type="button" class="layui-btn layui-btn layui-btn-sm layui-btn-danger tr-btn" id="btn_delete" data-id="' + res.data[i].Id + '">删除</button></td></tr>';
                    trs.push(tr);
                }
                $('.tb-articles').html(trs.join(''))
            }
        })
    }

    // 未添加类别按钮绑定点击事件
    var indexAdd = null;
    $('#btnAddCate').on('click', function() {
        indexAdd = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: ['添加文章分类'],
            content: $('#dialog-add').html()
        })
    })

    // 通过代理的形式，为form-add表单绑定submit事件
    $('body').on('submit', '#form_add', function(e) {
            e.preventDefault();
            $.ajax({
                method: 'POST',
                url: '/my/article/addcates',
                data: $(this).serialize(),
                success: function(res) {
                    if (res.status !== 0) {
                        return layer.msg('新增分类失败！')
                    }
                    getArticleList();
                    layer.msg('新增分类成功！');
                    // 根据索引关闭对应的弹出层
                    layer.close(indexAdd);
                }
            })
        })
        // 通过代理的形式为btn_edit按钮绑定点击事件
    var indexEdit = null;
    $('tbody').on('click', '#btn_edit', function() {
        // 弹出一个修改文章分类信息的层
        indexEdit = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: ['修改文章分类'],
            content: $('#dialog-edit').html()
        })

        var id = $(this).attr('data-id')
            // 发起请求获取对应分类的数据
        $.ajax({
            method: 'GET',
            url: '/my/article/cates/' + id,
            success: function(res) {
                form.val('form_edit', res.data)
            }
        })
    })

    // 通过代理的形式为修改分类的表单绑定submit
    $('body').on('submit', '#form_edit', function(e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('更新分类数据失败！')
                }
                layer.msg('更新数据成功！')
                layer.close(indexEdit);
                getArticleList();
            }
        })
    })

    // 通过代理的方式，为删除按钮绑定点击事件
    $('tbody').on('click', '#btn_delete', function() {
        var id = $(this).attr('data-id');
        // 提示用户是否要删除
        layer.confirm('确认删除?', { icon: 3, title: '提示' }, function(index) {
            $.ajax({
                method: 'GET',
                url: '/my/article/deletecate/' + id,
                success: function(res) {
                    if (res.status !== 0) {
                        return layer.msg('删除失败分类！')
                    }
                    layer.msg('删除失败成功！');
                    layer.close(index);
                    getArticleList();
                }
            })
        });
    })
})
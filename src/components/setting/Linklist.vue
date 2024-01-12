<template>
    <div id="note">
        <!-- 面包屑导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }"
                >首页</el-breadcrumb-item
            >
            <el-breadcrumb-item>报名列表</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 卡片区域 -->
        <el-card>
            <!-- 搜索区域 -->
            <!-- <el-input
                placeholder="请输入反馈关键字"
                class="search-input"
                v-model="queryInfo.query"
                clearable
                @clear="getList()"
                style="width: 400px"
            >
                <el-button
                    slot="append"
                    icon="el-icon-search"
                    @click="getList()"
                ></el-button>
            </el-input> -->
            <!-- 添加用户按钮  -->
            <!-- <el-button type="primary" class="addbutton" @click="goAddPage"
                >添加友情链接</el-button
            > -->
            <!-- 预留表格区域 -->
            <el-table :data="msgList" border>
                <!-- 索引列 -->
                <!-- <el-table-column type="index" label="#"></el-table-column> -->
                <!-- <el-table-column label="文章标题" prop="id" :show-overflow-tooltip="true" width="100"></el-table-column> -->
                <!-- <el-table-column label="标题" prop="title" :show-overflow-tooltip="true" min-width="200"></el-table-column> -->
                <el-table-column
                    label="姓名"
                    prop="nickname"
                    :show-overflow-tooltip="true"
                ></el-table-column>
                <el-table-column
                    label="性别"
                    prop="sex"
                    :show-overflow-tooltip="true"
                ></el-table-column>
                <el-table-column
                    label="年龄(岁)"
                    prop="age"
                    :show-overflow-tooltip="true"
                ></el-table-column>
                <el-table-column
                    label="身高(cm)"
                    prop="height"
                    :show-overflow-tooltip="true"
                ></el-table-column>
                <el-table-column
                    label="体重(kg)"
                    prop="weight"
                    :show-overflow-tooltip="true"
                ></el-table-column>
                <el-table-column
                    label="电话"
                    prop="phonenum"
                    :show-overflow-tooltip="true"
                ></el-table-column>
                <el-table-column
                    label="营期"
                    prop="datenum"
                    :show-overflow-tooltip="true"
                ></el-table-column>
                <el-table-column label="报名时间" width="180">
                    <template slot-scope="scope">
                        {{ scope.row.c_time | dateFormat }}
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="180">
                    <template slot-scope="scope">
                        <!-- <el-button
                            size="mini"
                            type="primary"
                            icon="el-icon-delete"
                            @click="editArt(scope.row)"
                            >编辑</el-button
                        > -->
                        <el-button
                            size="mini"
                            type="danger"
                            icon="el-icon-delete"
                            @click="delMsg(scope.row)"
                            >删除</el-button
                        >
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页区域 -->
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="queryInfo.pagenum"
                :page-sizes="[20, 50, 100]"
                :page-size="queryInfo.pagesize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="this.total"
                background
            >
            </el-pagination>
            <!-- 添加对话框 -->
            <el-dialog
                :title="dialogTitle"
                :close-on-click-modal="false"
                :visible.sync="addArtDialogVisible"
                width="1200px"
                center
                @close="addHandleClose"
            >
                <el-form
                    :model="addArtForm"
                    :rules="addArtFormRules"
                    ref="addArtFormRef"
                    label-width="100px"
                >
                    <el-form-item label="跳转名称：" prop="linkname">
                        <el-input
                            v-model="addArtForm.linkname"
                            maxlength="40"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="跳转地址：" prop="linkurl">
                        <el-input
                            v-model="addArtForm.linkurl"
                            maxlength="400"
                        ></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="addArtDialogVisible = false"
                        >取 消</el-button
                    >
                    <el-button type="primary" @click="addArtBtn" v-if="!flag"
                        >确 定</el-button
                    >
                    <el-button type="primary" @click="editArtBtn" v-if="flag"
                        >确 定</el-button
                    >
                </span>
            </el-dialog>
        </el-card>
    </div>
</template>

<script>
// import { quillEditor, Quill } from 'vue-quill-editor'
// import { container, ImageExtend, QuillWatch } from 'quill-image-extend-module'
// Quill.register('modules/ImageExtend', ImageExtend)
// var uploadUrl = 'http://127.0.0.1:3000/api/admin/v1/goods/upload/'
export default {
    // components: { quillEditor },
    data() {
        return {
            // 富文本框参数设置
            // editorOption: {
            //     modules: {
            //         ImageExtend: {
            //             loading: true,
            //             name: 'file',
            //             action: 'https://api.qg0001.com/admin/picture/upload/',
            //             response: (res) => {
            //                 // this.addArtForm.note_picpath = res.data.path
            //                 return 'https://api.qg0001.com' + res.data.path
            //             },
            //             headers: (xhr) => {
            //                 // xhr.setRequestHeader('myHeader','myValue')
            //                 xhr.setRequestHeader(
            //                     'Authorization',
            //                     window.sessionStorage.getItem('token')
            //                 )
            //             },
            //             success: (res) => {
            //                 //  这个函数是上传成功后的事件
            //             }
            //         },
            //         toolbar: {
            //             container: container,
            //             handlers: {
            //                 image: function () {
            //                     QuillWatch.emit(this.quill.id)
            //                 }
            //             }
            //         }
            //     }
            // },

            // 分页配置
            queryInfo: {
                query: '',
                pagenum: 1,
                pagesize: 20
            },
            // 分页器 记录总数
            total: 10,
            // 获取列表 table的数据源
            msgList: [],
            // 添加客服对话框显示隐藏属性
            addArtDialogVisible: false,
            // 添加客服对话框引用对象
            addArtForm: {
                linkname: '',
                linkurl: ''
            },
            // 添加表单验证规则
            addArtFormRules: {
                linkname: [
                    {
                        required: true,
                        message: '请填写友情链接名称',
                        trigger: 'blur'
                    }
                ],
                linkurl: [
                    {
                        required: true,
                        message: '请填写友情链接要跳转的地址',
                        trigger: 'blur'
                    }
                ]
            },
            // 对话框标题绑定属性
            dialogTitle: '',
            // 对话框 控制显示确定按钮
            flag: true
        }
    },
    // 什么周期函数
    created() {
        this.getList()
    },
    // 方法节点
    methods: {
        // 添加按钮跳转函数
        goAddPage() {
            this.addArtDialogVisible = true
            this.dialogTitle = '添加友情链接'
            this.flag = false // 让添加对话框的确定按钮显示 （false取反为true）
            // console.log(this.addArtForm)
        },
        // 添加客服对话框关闭函数
        addHandleClose() {
            this.$refs.addArtFormRef.resetFields()
            this.addArtForm = {
                title: '',
                content: '',
                cate: ''
            }
        },
        // 添加文章对话框确认按钮函数
        addArtBtn() {
            this.$refs.addArtFormRef.validate(async (valid) => {
                if (valid) {
                    let { data: res } = await this.$http.post(
                        'cms/addlink',
                        this.addArtForm
                    )
                    if (res.code === 200) {
                        this.addArtDialogVisible = false
                        this.getList()
                        return this.$message.success({
                            message: '添加成功',
                            offset: 350
                        })
                    }
                }
            })
        },
        // 获取文章列表
        async getList() {
            let { data: res } = await this.$http.get('cms/getusers', {
                params: {
                    query: this.queryInfo.query,
                    pagenum: this.queryInfo.pagenum,
                    pagesize: this.queryInfo.pagesize
                }
            })
            if (res.code === 200 || res.code === 204) {
                this.msgList = res.data
                this.total = res.total
            }
        },
        // 分页功能区
        // 监听pagesize改变的函数
        handleSizeChange(newSize) {
            this.queryInfo.pagesize = newSize
            this.getList()
        },
        // 监听pagenum改变的函数
        handleCurrentChange(newPage) {
            this.queryInfo.pagenum = newPage
            this.getList()
        },
        // 编辑按钮函数
        async editArt(item) {
            this.addArtDialogVisible = true
            this.dialogTitle = '修改友情链接'
            this.flag = true
            let { data: res } = await this.$http.get('cms/getlink', {
                params: { id: item.id }
            })
            if (res.code === 200) {
                this.addArtForm = res.data
                // console.log(this.addArtForm)
            }
        },
        // 编辑对话框确定按钮
        editArtBtn() {
            this.$refs.addArtFormRef.validate(async (valid) => {
                if (valid) {
                    await this.$http.post('cms/editlink', this.addArtForm)
                    this.addArtDialogVisible = false
                    this.getList()
                }
            })
        },
        // 删除文章信息
        async delMsg(item) {
            let result = await this.$confirm(
                '此操作将永久删除该信息, 是否继续?',
                '提示',
                {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    closeOnClickModal: false
                }
            ).catch((err) => err)
            if (result === 'confirm') {
                let { data: res } = await this.$http.get('cms/deluser', {
                    params: { id: item.id }
                })
                if (res.code === 200) {
                    this.getList()
                }
            }
        }
    }
}
</script>

<style lang="stylus">
#note
    .addbutton
        float right
        margin 0 18px 20px 0
    .el-dialog
        .el-form
            padding-left 0px
            .el-form-item
                // margin-bottom 12px
                .el-input
                    width 600px
        .dialog-footer
            position absolute
            bottom 20px
            right 124px
    .el-pagination
        float right
        margin 10px 0
    .el-dialog__title
        position relative
        top -20px
        left -20px
        display block !important
        height 40px !important
        line-height 40px !important
        width 1200px !important
        background rgba(217,217,217,0.5)
    .el-icon-close:before
        position relative
        top -7px
    .ql-editor
        height 500px
    .quill-editor
        padding 0
        margin-top -5px
</style>

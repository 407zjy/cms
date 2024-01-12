<template>
    <div>
        <!-- 面包屑导航区域 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }"
                >首页</el-breadcrumb-item
            >
            <el-breadcrumb-item>相册管理</el-breadcrumb-item>
            <el-breadcrumb-item>女孩标签</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 卡片内容区域 -->
        <el-card class="box-card">
            <div class="search-box">
                <div></div>
                <!-- 搜索区域 -->
                <!-- <el-input
                    placeholder="按昵称关键词查询"
                    class="search-input"
                    v-model="queryInfo.query"
                    clearable
                    @clear="researchUser()"
                >
                    <el-button
                        slot="append"
                        icon="el-icon-search"
                        @click="searchUser()"
                    ></el-button>
                </el-input> -->
                <!-- 添加用户按钮  -->
                <el-button
                    type="primary"
                    class="add-button"
                    @click="addDialogVisible = true"
                    >添加标签</el-button
                >
            </div>
            <!-- 列表table区域 -->
            <el-table :data="dataList">
                <el-table-column type="index" label="#"></el-table-column>
                <!-- <el-table-column label="id" prop="id"></el-table-column> -->
                <el-table-column
                    label="标签名称"
                    prop="tipname"
                ></el-table-column>

                <el-table-column label="操作" width="180px">
                    <!-- 作用域插槽 -->
                    <template slot-scope="scope">
                        <!-- 修改 删除用户区域 -->
                        <el-button
                            type="danger"
                            icon="el-icon-delete"
                            v-model="scope.row"
                            size="mini"
                            @click="removeUserById(scope.row.id)"
                        ></el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 添加对话框 -->
            <el-dialog
                class="adduser-dialog"
                :close-on-click-modal="false"
                title="添加标签"
                :visible.sync="addDialogVisible"
                width="700px"
                center
                @close="dialogClose"
            >
                <!-- 添加用户对话框主体 -->
                <el-form
                    :model="addForm"
                    :rules="addFormRules"
                    ref="ruleFormRef"
                    label-width="100px"
                >
                    <el-form-item label="标签名称" prop="tipname">
                        <el-input v-model="addForm.tipname"></el-input>
                    </el-form-item>
                </el-form>
                <!-- 添加用户对话框底部 -->
                <span slot="footer" class="dialog-footer">
                    <el-button @click="addDialogVisible = false"
                        >取 消</el-button
                    >
                    <el-button type="primary" @click="addUser">确 定</el-button>
                </span>
            </el-dialog>
        </el-card>
    </div>
</template>

<script>
export default {
    // 父组件传过来的登陆用户信息
    props: ['userInfo'],
    data() {
        return {
            addDialogVisible: false, // 添加用户对话框显示/隐藏变量
            dataList: [],
            // 添加用户规则
            addFormRules: {
                tipname: [
                    {
                        required: true,
                        message: '请输入标签名称',
                        trigger: 'blur'
                    }
                ]
            },
            // 添加用户表单数据
            addForm: {
                tipname: ''
            }
        }
    },
    created() {
        this.getList()
    },
    methods: {
        // 监听pagesize改变的函数
        handleSizeChange(newSize) {
            this.queryInfo.pagesize = newSize
            this.getUserInfo()
        },
        // 监听pagenum改变的函数
        handleCurrentChange(newPage) {
            this.queryInfo.pagenum = newPage
            this.getUserInfo()
        },
        dialogClose() {
            this.$refs.ruleFormRef.resetFields()
        },
        // 获取数据
        async getList() {
            const { data: res } = await this.$http.get('albums/gettips')
            if (res.code === 200) {
                this.dataList = res.data
            }
        },
        // 增加用户 确认前预校验
        addUser() {
            this.$refs.ruleFormRef.validate(async (valid) => {
                if (valid) {
                    // this.addDialogVisible = false
                    let { data: res } = await this.$http.post(
                        'albums/addtip',
                        this.addForm
                    )
                    if (res.code === 200) {
                        this.getList() // 添加成功后请求获取列表函数 重新刷新用户列表
                        this.$message.success({
                            message: '添加成功',
                            offset: 201,
                            center: true
                        })
                        // 关闭对话框
                        this.addDialogVisible = false
                    } else {
                        this.$message.error({
                            message: '添加失败',
                            offset: 201,
                            center: true
                        })
                    }
                }
            })
        },

        // 删除用户函数
        async removeUserById(id) {
            let result = await this.$confirm(
                '此操作将永久删除该标签, 是否继续?',
                '提示',
                {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    closeOnClickModal: false
                }
            ).catch((err) => err)
            if (result === 'confirm') {
                let { data: res } = await this.$http.delete('albums/deltip', {
                    params: { id: id }
                })
                if (res.code === 200) {
                    this.getList() // 删除成功后请求获取列表函数 重新刷新用户列表
                    this.$message.success({
                        message: '删除成功',
                        offset: 201,
                        center: true
                    })
                }
            }
        }
    }
}
</script>

<style lang="stylus" scoped>
.el-card
    .search-box
        display flex
        justify-content space-between
        .search-input
            width: 400px;
        .add-button
            margin-right 17px
    .adduser-dialog
        .el-form
            padding 0px 100px 0px 85px
            .el-input
                width 400px
    .dialog-footer
        position absolute
        bottom 20px
        right 129px

.el-table
    margin-top 10px
.el-pagination
    margin-top 20px
    float right
.cart-sorry
    height 100px
    display flex
    align-items center
    justify-content center
    img
        width 100px
.el-select
    margin-left 150px
</style>

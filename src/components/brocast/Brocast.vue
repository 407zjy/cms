<template>
    <div>
        <!-- 面包屑导航区域 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }"
                >首页</el-breadcrumb-item
            >
            <el-breadcrumb-item>广播管理</el-breadcrumb-item>
            <el-breadcrumb-item>广播列表</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 卡片内容区域 -->
        <el-card class="box-card">
            <div class="search-box">
                <!-- 搜索区域 -->
                <el-input
                    placeholder="按用户名关键词查询"
                    class="search-input"
                    v-model="queryInfo.kewords"
                    clearable
                    @clear="researchUser()"
                >
                    <el-button
                        slot="append"
                        icon="el-icon-search"
                        @click="searchUser()"
                    ></el-button>
                </el-input>
                <!-- 添加用户按钮  -->
            </div>
            <!-- 列表table区域 -->
            <el-table :data="dataList">
                <!-- <el-table-column type="index" label="#"></el-table-column> -->
                <el-table-column
                    label="ID"
                    prop="id"
                    width="80px"
                ></el-table-column>
                <el-table-column
                    label="城市"
                    prop="city"
                    width="100px"
                ></el-table-column>
                <el-table-column
                    label="类型"
                    prop="type"
                    width="100px"
                ></el-table-column>
                <el-table-column
                    label="内容"
                    prop="content"
                    :show-overflow-tooltip="true"
                ></el-table-column>
                <el-table-column label="图片">
                    <!-- 时间调用全局定义的过滤器 -->
                    <template slot-scope="scope">
                        <!-- {{ scope.row.c_time | dateFormat }} -->
                        <div class="demo-image__preview">
                            <div
                                class="image-box"
                                v-for="(item, index) in scope.row.picarr"
                                :key="index"
                            >
                                <el-image
                                    :src="localhost + item.url"
                                    :preview-src-list="pictureArr"
                                    style="width: 60px; height: 60px"
                                >
                                </el-image>
                                <!-- <div
                                    class="image-delete"
                                    @click="deleteImage(index)"
                                >
                                    +
                                </div> -->
                            </div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="报名数" width="160px">
                    <!-- 时间调用全局定义的过滤器 -->
                    <template slot-scope="scope">
                        {{ scope.row.baoming ? scope.row.baoming.length : 0 }}
                    </template>
                </el-table-column>
                <el-table-column
                    label="发布人"
                    prop="pname"
                    width="120px"
                    :show-overflow-tooltip="true"
                ></el-table-column>

                <el-table-column label="发布时间" width="160px">
                    <!-- 时间调用全局定义的过滤器 -->
                    <template slot-scope="scope">
                        {{ scope.row.c_time | dateFormat }}
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="180px">
                    <!-- 作用域插槽 -->
                    <template slot-scope="scope">
                        <!-- 修改 删除用户区域 -->
                        <!-- <el-button
                            type="primary"
                            icon="el-icon-edit"
                            v-model="scope.row"
                            size="mini"
                            @click="showEditDialog(scope.row)"
                            >编辑</el-button
                        > -->
                        <el-button
                            type="danger"
                            icon="el-icon-delete"
                            v-model="scope.row"
                            size="mini"
                            @click="removeById(scope.row.id)"
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
        </el-card>
    </div>
</template>

<script>
export default {
    // 父组件传过来的登陆用户信息
    props: ['userInfo'],
    data() {
        return {
            localhost: this.$http.defaults.baseURL.replace('/admin', ''),
            // 获取用户列表所需参数
            queryInfo: {
                kewords: '',
                pagenum: 1,
                pagesize: 20
            },
            dataList: [],
            total: 0,
            pictureArr: [] // 临时存放数组
        }
    },
    created() {
        this.getList()
    },
    methods: {
        // 格式化照片数组
        formatePhotoArr() {
            this.pictureArr = [] // 每次调用都先清空数组
            this.editForm.photoarr.forEach((elem) => {
                this.pictureArr.push(this.localhost + elem.url)
            })
        },
        // 获取
        async getList() {
            let { data: res } = await this.$http.get('chat/getbclist', {
                params: this.queryInfo
            })
            // 查询不到数据 显示提示div
            if (res.code !== 200) {
                this.total = 0
            } else {
                this.dataList = res.data
                // console.log(this.dataList)
                this.total = res.total
            }
        },
        // 监听pagesize改变的函数
        handleSizeChange(newSize) {
            this.queryInfo.pagesize = newSize
            this.getUserList()
        },
        // 监听pagenum改变的函数
        handleCurrentChange(newPage) {
            this.queryInfo.pagenum = newPage
            this.getUserList()
        },

        // 搜索 模糊搜索
        searchUser() {
            this.queryInfo.pagenum = 1
            this.getList()
        },
        // 输入框清除后重新搜索
        researchUser() {
            this.queryInfo.pagenum = 1
            this.getList()
        },

        // 删除
        async removeById(id) {
            let result = await this.$confirm(
                '此操作将永久删除该条内容, 是否继续?',
                '提示',
                {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    closeOnClickModal: false
                }
            ).catch((err) => err)
            if (result === 'confirm') {
                let { data: res } = await this.$http.delete('chat/deletebc', {
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
.image-box
    position relative
    float left
    margin-right 5px
    .image-delete
        font-size 20px
        transform rotate(-45deg)
        position absolute
        top -15px
        right 0px
        color red
        cursor pointer
    .image-top
        position absolute
        top -12px
        left 0
        i
            color green
            cursor pointer
</style>

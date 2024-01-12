<template>
    <div>
        <!-- 面包屑导航区域 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }"
                >首页</el-breadcrumb-item
            >
            <el-breadcrumb-item>相册管理</el-breadcrumb-item>
            <el-breadcrumb-item>待审列表</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 卡片内容区域 -->
        <el-card class="box-card">
            <div class="search-box">
                <!-- 搜索区域 -->
                <el-input
                    placeholder="按昵称关键词查询"
                    class="search-input"
                    v-model="queryInfo.keywords"
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
                <!-- <el-button
                    type="primary"
                    class="add-button"
                    @click="addDialogVisible = true"
                    >添加用户</el-button
                > -->
            </div>
            <!-- 列表table区域 -->
            <el-table :data="userlist">
                <!-- <el-table-column type="index" label="#"></el-table-column> -->
                <el-table-column label="头像" width="50">
                    <!-- 作用域插槽 -->
                    <template slot-scope="scope">
                        <img
                            :src="localhost + scope.row.cover[0].url"
                            alt=""
                            style="
                                height: 40px;
                                width: 40px;
                                border-radius: 50%;
                                margin-top: 5px;
                            "
                        />
                    </template>
                </el-table-column>
                <el-table-column label="昵称" prop="username"></el-table-column>
                <el-table-column
                    label="城市"
                    prop="city"
                    width="80px"
                ></el-table-column>
                <el-table-column
                    label="地址"
                    prop="address"
                    :show-overflow-tooltip="true"
                ></el-table-column>
                <el-table-column
                    label="分类"
                    prop="type"
                    :show-overflow-tooltip="true"
                    width="80"
                ></el-table-column>
                <el-table-column
                    label="价格"
                    prop="price"
                    width="80"
                ></el-table-column>
                <el-table-column
                    label="备注"
                    prop="remarks"
                    :show-overflow-tooltip="true"
                ></el-table-column>
                <el-table-column label="联系" prop="contact"></el-table-column>
                <el-table-column label="认证" width="80">
                    <!-- 作用域插槽 -->
                    <template slot-scope="scope">
                        <el-switch
                            v-model="scope.row.rengzheng"
                            @change="renzhengChange(scope.row)"
                        ></el-switch>
                    </template>
                </el-table-column>
                <el-table-column label="归属">
                    <template slot-scope="scope">
                        <el-input
                            v-model="scope.row.pname"
                            @blur="editPname(scope.row)"
                        ></el-input>
                    </template>
                </el-table-column>
                <el-table-column label="推荐" width="80">
                    <!-- 作用域插槽 -->
                    <template slot-scope="scope">
                        <el-switch
                            v-model="scope.row.totop"
                            @change="topChange(scope.row)"
                        ></el-switch>
                    </template>
                </el-table-column>
                <el-table-column label="上班" width="80">
                    <!-- 作用域插槽 -->
                    <template slot-scope="scope">
                        <el-switch
                            v-model="scope.row.status"
                            @change="statusChange(scope.row)"
                        ></el-switch>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="180px">
                    <!-- 作用域插槽 -->
                    <template slot-scope="scope">
                        <!-- 修改 删除用户区域 -->
                        <el-button
                            type="primary"
                            icon="el-icon-edit"
                            v-model="scope.row"
                            size="mini"
                            @click="showEditDialog(scope.row)"
                        ></el-button>
                        <el-button
                            type="danger"
                            icon="el-icon-delete"
                            v-model="scope.row"
                            size="mini"
                            @click="removeUserById(scope.row.id)"
                        ></el-button>
                        <el-button
                            type="success"
                            icon="el-icon-check"
                            v-model="scope.row"
                            size="mini"
                            @click="girlPass(scope.row.id)"
                        ></el-button>
                    </template>
                </el-table-column>
            </el-table>

            <!-- 修改用户对话框 -->
            <el-dialog
                class="adduser-dialog"
                :close-on-click-modal="false"
                title="修改相册"
                :visible.sync="editDialogVisible"
                width="700px"
                center
                @close="dialogClose"
            >
                <!-- 修改用户主体 -->
                <el-form :model="editForm" ref="ruleFormRef" label-width="80px">
                    <el-form-item label="ID" prop="id">
                        <el-input v-model="editForm.id" disabled=""></el-input>
                    </el-form-item>
                    <el-form-item label="昵称" prop="username">
                        <el-input v-model="editForm.username"></el-input>
                    </el-form-item>
                    <el-form-item label="年龄" prop="age">
                        <el-input v-model="editForm.age"></el-input>
                    </el-form-item>
                    <el-form-item label="身高" prop="height">
                        <el-input v-model="editForm.height"></el-input>
                    </el-form-item>
                    <el-form-item label="体重" prop="weight">
                        <el-input v-model="editForm.weight"></el-input>
                    </el-form-item>
                    <el-form-item label="胸围" prop="bust">
                        <el-input v-model="editForm.bust"></el-input>
                    </el-form-item>
                    <el-form-item label="地址" prop="address">
                        <el-input v-model="editForm.address"></el-input>
                    </el-form-item>
                    <el-form-item label="价格" prop="price">
                        <el-input v-model="editForm.price"></el-input>
                    </el-form-item>
                    <el-form-item label="价格备注" prop="price_remarks">
                        <el-input v-model="editForm.price_remarks"></el-input>
                    </el-form-item>
                    <el-form-item label="大圈返钱" prop="big_fan">
                        <el-input v-model="editForm.big_fan"></el-input>
                    </el-form-item>
                    <el-form-item label="联系" prop="contact">
                        <el-input v-model="editForm.contact"></el-input>
                    </el-form-item>
                    <el-form-item label="备注" prop="remarks">
                        <el-input v-model="editForm.remarks"></el-input>
                    </el-form-item>
                    <el-form-item label="照片列表">
                        <div class="demo-image__preview">
                            <div
                                class="image-box"
                                v-for="(item, index) in editForm.photoarr"
                                :key="index"
                            >
                                <el-image
                                    :src="localhost + item.url"
                                    :preview-src-list="pictureArr"
                                    style="width: 60px; height: 60px"
                                >
                                </el-image>
                                <div
                                    class="image-delete"
                                    @click="deleteImage(index)"
                                >
                                    +
                                </div>
                            </div>
                        </div>
                    </el-form-item>
                    <el-form-item label="视频列表" prop="videoarr">
                        <div class="demo-image__preview">
                            <div
                                class="image-box"
                                v-for="(item, index) in editForm.videoarr"
                                :key="index"
                            >
                                <video
                                    controls
                                    :src="localhost + item.url"
                                    style="width: 150px; height: 120px"
                                ></video>
                                <div
                                    class="image-delete"
                                    @click="deleteVideo(index)"
                                >
                                    +
                                </div>
                                <div
                                    class="image-top"
                                    v-if="index > 0"
                                    @click="setTop(item, index)"
                                >
                                    <i
                                        class="iconfont iconxuanxiangshangyi"
                                    ></i>
                                </div>
                            </div>
                        </div>
                    </el-form-item>
                </el-form>
                <!-- 修改对话框底部 -->
                <span slot="footer" class="dialog-footer">
                    <el-button @click="editDialogVisible = false"
                        >取 消</el-button
                    >
                    <el-button type="primary" @click="updateUser"
                        >确 定</el-button
                    >
                </span>
            </el-dialog>
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
                keywords: '',
                pagenum: 1,
                pagesize: 20
            },
            userlist: [],
            total: 0,
            addDialogVisible: false, // 添加用户对话框显示/隐藏变量
            editDialogVisible: false, // 修改用户对话框变量
            // 添加用户规则
            addFormRules: {
                username: [
                    {
                        required: true,
                        message: '请输入用户名',
                        trigger: 'blur'
                    },
                    {
                        min: 4,
                        max: 10,
                        message: '长度在 4 到 10 个字符',
                        trigger: 'blur'
                    }
                ],
                password: [
                    {
                        required: true,
                        message: '请输入密码',
                        trigger: 'blur'
                    },
                    {
                        min: 8,
                        max: 20,
                        message: '长度在 8 到 20 个字符',
                        trigger: 'blur'
                    }
                ],
                gaipassword: [
                    {
                        min: 8,
                        max: 20,
                        message: '长度在 8 到 20 个字符',
                        trigger: 'blur'
                    }
                ],
                mobile: [
                    {
                        required: true,
                        message: '请输入联系电话',
                        trigger: 'blur'
                    }
                ],
                email: [
                    {
                        required: true,
                        message: '请输入联系邮箱',
                        trigger: 'blur'
                    }
                ]
            },
            // 添加用户表单数据
            addForm: {
                username: '',
                password: '',
                mobile: '',
                email: '',
                id: '',
                user_pid: this.userInfo.username,
                user_level: 3
            },
            // 修改用户表单数据
            editForm: {
                username: '',
                age: '',
                height: '',
                weight: '',
                bust: '',
                address: '',
                price: '',
                price_remarks: '',
                big_fan: '',
                contact: '',
                remarks: '',
                photoarr: '',
                videoarr: ''
            },
            pictureArr: [] // 临时存放数组
        }
    },
    created() {
        this.getList()
    },
    methods: {
        // 获取用户列表函数
        async getList() {
            let { data: res } = await this.$http.get('albums/getalbumsf', {
                params: this.queryInfo
            })
            // 查询不到数据 显示提示div
            if (res.code === 200) {
                this.userlist = res.data
                this.total = res.total
            } else {
                this.total = 0
            }
        },
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
        // 更新用户状态
        async renzhengChange(item) {
            let result = await this.$http.put('albums/renzheng', {
                id: item.id,
                rengzheng: item.rengzheng
            })
            if (result) this.getList()
        },
        // 推荐状态
        async topChange(item) {
            let result = await this.$http.put('albums/totop', {
                id: item.id,
                totop: item.totop
            })
            if (result) this.getList()
        },
        // 上下班切换
        async statusChange(item) {
            let result = await this.$http.put('albums/upstatus', {
                id: item.id,
                status: item.status
            })
            if (result) this.getList()
        },

        // 搜索用户 模糊搜索
        searchUser() {
            this.queryInfo.pagenum = 1
            this.getList()
        },
        // 输入框清除后重新搜索
        researchUser() {
            this.queryInfo.pagenum = 1
            this.getList()
        },
        // 监听对话框关闭事件 通用 关联同一个ref="ruleFormRef"
        dialogClose() {
            this.$refs.ruleFormRef.resetFields()
        },

        // 修改用户对话框显示函数
        showEditDialog(item) {
            this.editDialogVisible = true
            this.editForm = JSON.parse(JSON.stringify(item))
            this.formatePhotoArr()
        },
        // 格式化照片数组
        formatePhotoArr() {
            this.pictureArr = [] // 每次调用都先清空数组
            this.editForm.photoarr.forEach((elem) => {
                this.pictureArr.push(this.localhost + elem.url)
            })
        },
        // 删除数组中的pic
        deleteImage(e) {
            this.editForm.photoarr.splice(e, 1)
            this.formatePhotoArr()
        },
        deleteVideo(e) {
            this.editForm.videoarr.splice(e, 1)
        },
        // 置顶视频
        setTop(elem, index) {
            this.editForm.videoarr.unshift(elem)
            this.editForm.videoarr.splice(index + 1, 1)
        },
        // 更新用户信息函数
        updateUser() {
            this.$refs.ruleFormRef.validate(async (valid) => {
                if (valid) {
                    let { data: res } = await this.$http.put(
                        'albums/updategirl',
                        this.editForm
                    )
                    if (res.code === 200) {
                        this.editDialogVisible = false // 更新成功关闭对话框
                        this.getList() // 更新成功请求获取列表函数 重新刷新用户列表
                        this.$message.success({
                            message: '修改成功',
                            offset: 201,
                            center: true
                        })
                    } else {
                        this.$message.error({
                            message: '修改失败',
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
                '此操作将永久删除该条数据, 是否继续?',
                '提示',
                {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    closeOnClickModal: false
                }
            ).catch((err) => err)
            if (result === 'confirm') {
                let { data: res } = await this.$http.delete('albums/delgirl', {
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
        },
        // 通过审核
        async girlPass(id) {
            let result = await this.$confirm('通过审核, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                closeOnClickModal: false
            }).catch((err) => err)
            if (result === 'confirm') {
                let { data: res } = await this.$http.put('albums/passgirl', {
                    id: id
                })
                if (res.code === 200) {
                    this.getList() // 删除成功后请求获取列表函数 重新刷新用户列表
                }
            }
        },
        // 修改归属
        async editPname(row) {
            const { data: res } = await this.$http.put('albums/uppname', {
                id: row.id,
                pname: row.pname
            })
            if (res.code === 200) {
                this.$message.success({
                    message: '修改成功',
                    offset: 201,
                    center: true
                })
            } else if (res.code === 204) {
                this.$message.error({
                    message: '修改失败,经纪人不存在',
                    offset: 201,
                    center: true
                })
            } else {
                this.$message.error({
                    message: '修改失败, 请重试',
                    offset: 201,
                    center: true
                })
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
            padding 0px 30px 0px 35px
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

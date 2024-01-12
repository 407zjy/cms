<template>
    <div>
        <!-- 面包屑导航区域 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }"
                >首页</el-breadcrumb-item
            >
            <el-breadcrumb-item>相册管理</el-breadcrumb-item>
            <el-breadcrumb-item>女孩列表</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 卡片内容区域 -->
        <el-card class="box-card">
            <div class="search-box">
                <!-- 搜索区域 -->
                <el-input
                    placeholder="搜索用户名、昵称、联系、备注"
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
                <!-- 级联选择器 -->
                <!-- <span class="span">* 选择游戏分类：</span> -->
                <el-cascader
                    class="selector"
                    ref="elcascader"
                    clearable
                    v-model="idArr"
                    placeholder="城市/区域"
                    :options="citiesList"
                    :props="citiesprops"
                    @change="handleChange"
                    @visible-change="elCascaderOnlick"
                    @expand-change="elCascaderOnlick"
                >
                </el-cascader>

                <el-select
                    class="selector"
                    v-model="typeValue"
                    placeholder="分类"
                    clearable
                    @change="typeChange"
                >
                    <el-option
                        v-for="item in typeOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    >
                    </el-option>
                </el-select>
                <el-select
                    class="selector"
                    v-model="rzValue"
                    placeholder="是否认证"
                    clearable
                    @change="rzChange"
                >
                    <el-option
                        v-for="item in rzOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    >
                    </el-option>
                </el-select>
                <el-select
                    class="selector"
                    v-model="tjValue"
                    placeholder="是否推荐"
                    clearable
                    @change="tjChange"
                >
                    <el-option
                        v-for="item in tjOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    >
                    </el-option>
                </el-select>
                <el-select
                    class="selector"
                    v-model="workValue"
                    placeholder="是否上班"
                    clearable
                    @change="workChange"
                >
                    <el-option
                        v-for="item in workOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    >
                    </el-option>
                </el-select>
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
                <el-table-column
                    label="昵称"
                    prop="username"
                    :show-overflow-tooltip="true"
                ></el-table-column>
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
                <el-table-column label="管理备注" :width="tableWidth">
                    <template slot-scope="scope">
                        <div
                            class=""
                            @click="remarkClick(scope.row)"
                            v-if="scope.row.id"
                            style="
                                min-width: 100px;
                                min-height: 50px;
                                cursor: pointer;
                            "
                        >
                            {{ scope.row.admin_remarks }}
                        </div>
                        <el-input
                            ref="remarkInput"
                            v-if="remark_id == scope.row.id"
                            v-model="scope.row.admin_remarks"
                            @blur="editRemarks(scope.row)"
                        ></el-input>
                    </template>
                </el-table-column>

                <el-table-column label="操作" width="120px">
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
                pagesize: 20,
                city: '',
                area: '',
                type: '',
                rengzheng: '',
                totop: '',
                work: ''
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
            pictureArr: [], // 临时存放数组
            idArr: [],
            citiesList: [],
            // 级联选择器配置
            citiesprops: {
                checkStrictly: true,
                expandTrigger: 'hover',
                value: 'id',
                label: 'city',
                children: 'children'
            },
            typeValue: '',
            typeOptions: [
                {
                    value: '中圈',
                    label: '中圈'
                },
                {
                    value: '大圈',
                    label: '大圈'
                }
            ],
            rzValue: '',
            rzOptions: [
                {
                    value: '未认证',
                    label: '未认证'
                },
                {
                    value: '已认证',
                    label: '已认证'
                }
            ],
            tjValue: '',
            tjOptions: [
                {
                    value: '未推荐',
                    label: '未推荐'
                },
                {
                    value: '已推荐',
                    label: '已推荐'
                }
            ],
            workValue: '',
            workOptions: [
                {
                    value: '休息中',
                    label: '休息中'
                },
                {
                    value: '上班中',
                    label: '上班中'
                }
            ],
            remark_id: '',
            tableWidth: ''
        }
    },
    created() {
        this.getList()
        this.getCitiesList()
    },
    methods: {
        // 获取用户列表函数
        async getList() {
            let { data: res } = await this.$http.get('albums/getalbumst', {
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
        // 获取城市 区域
        async getCitiesList() {
            const { data: res } = await this.$http.get('city/getcities', {
                params: {
                    pagesize: 1000,
                    pagenum: 1,
                    type: 2
                }
            })
            if (res.code === 200) {
                this.citiesList = res.data
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
        },
        // 级联选择器选中项改变
        handleChange(val) {
            // if (this.idArr.length !== 3) {
            //     this.idArr = []
            //     this.goodsForm.goods_gameid = 0
            //     this.goodsForm.goods_quid = 0
            //     this.goodsForm.goods_catname = ''
            //     this.canshuData = []
            // } else {
            //     this.goodsForm.goods_gameid = this.idArr[0] // 把父一级id存入 以便分类搜索
            //     this.goodsForm.goods_quid = this.idArr[1] // 把父二级id存入 以便分类搜索
            //     let checkedName =
            //         this.$refs['elcascader'].getCheckedNodes()[0].pathLabels
            //     let checKedNameStr = checkedName.join(' / ')
            //     this.goodsForm.goods_catname = checKedNameStr // 把选中的分类名称转成字符串后存入 方便直接渲染分类
            //     // 调用商品参数
            //     this.tabClicked()
            // }
            if (this.$refs['elcascader'].getCheckedNodes().length > 0) {
                let checkedName =
                    this.$refs['elcascader'].getCheckedNodes()[0].pathLabels

                // let checKedNameStr = checkedName.join(' / ')
                this.queryInfo.city = ''
                this.queryInfo.area = ''
                this.queryInfo.city = checkedName[0]
                if (checkedName.length >= 2) {
                    this.queryInfo.area = checkedName[1]
                }
            } else {
                this.queryInfo.city = ''
                this.queryInfo.area = ''
            }

            this.getList()
        },
        // 级联选择器bug修复
        elCascaderOnlick() {
            let that = this
            setTimeout(function () {
                document
                    .querySelectorAll('.el-cascader-node__label')
                    .forEach((el) => {
                        el.onclick = function () {
                            this.previousElementSibling.click()
                            that.$refs.elcascader.dropDownVisible = false
                        }
                    })
                document
                    .querySelectorAll('.el-cascader-panel .el-radio')
                    .forEach((el) => {
                        el.onclick = function () {
                            that.$refs.elcascader.dropDownVisible = false
                        }
                    })
            }, 100)
        },

        typeChange(e) {
            this.queryInfo.type = e
            this.getList()
        },
        rzChange(e) {
            this.queryInfo.rengzheng = e
            this.getList()
        },
        tjChange(e) {
            this.queryInfo.totop = e
            this.getList()
        },
        workChange(e) {
            this.queryInfo.work = e
            this.getList()
        },
        // 管理员添加/修改备注
        async editRemarks(row) {
            const { data: res } = await this.$http.put('albums/upremarks', {
                id: row.id,
                admin_remarks: row.admin_remarks
            })
            if (res.code === 200) {
                this.remark_id = ''
                this.tableWidth = ''
            } else {
                this.$message.error({
                    message: '备注失败, 请重试',
                    offset: 201,
                    center: true
                })
            }
        },
        remarkClick(row) {
            this.remark_id = row.id
            this.tableWidth = 400
            this.$nextTick(() => {
                this.$refs.remarkInput.focus()
            })
        }
    }
}
</script>

<style lang="stylus" scoped>
.el-card
    .search-box
        display block
        .search-input
            width: 400px;
        .add-button
            margin-right 17px
        .selector
            margin-right 0
            margin-left 10px
            width 150px
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

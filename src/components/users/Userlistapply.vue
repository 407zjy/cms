<template>
    <div>
        <!-- 面包屑导航区域 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }"
                >首页</el-breadcrumb-item
            >
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            <el-breadcrumb-item>用户列表</el-breadcrumb-item>
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
                <!-- <el-button
                    type="primary"
                    class="add-button"
                    @click="addDialogVisible = true"
                    >添加用户</el-button
                > -->
            </div>
            <!-- 列表table区域 -->
            <el-table :data="userlist" v-if="flag">
                <!-- <el-table-column type="index" label="#"></el-table-column> -->
                <el-table-column label="ID" prop="id"></el-table-column>
                <el-table-column
                    label="用户名"
                    prop="username"
                ></el-table-column>
                <el-table-column label="昵称" prop="nickname"></el-table-column>
                <el-table-column
                    label="金币"
                    prop="coin"
                    width="100px"
                ></el-table-column>
                <el-table-column label="充值金币" width="100px">
                    <!-- 作用域插槽 -->
                    <template slot-scope="scope">
                        <!-- 修改 删除用户区域 -->
                        <el-button
                            type="primary"
                            icon="el-icon-plus"
                            v-model="scope.row"
                            size="mini"
                            @click="showChongDialog(scope.row)"
                            >充值</el-button
                        >
                    </template>
                </el-table-column>
                <!-- <el-table-column label="会员">
                    <template slot-scope="scope">
                        {{ scope.row.expiration > new Date() ? '是' : '否' }}
                    </template>
                </el-table-column>
                <el-table-column
                    label="到期时间"
                    prop="expiration"
                ></el-table-column> -->
                <el-table-column
                    label="城市"
                    prop="set_city_name"
                ></el-table-column>
                <el-table-column label="开通相册">
                    <!-- 作用域插槽 -->
                    <template slot-scope="scope">
                        <el-switch
                            v-model="scope.row.status"
                            @change="userStateChange(scope.row)"
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
                <el-table-column label="操作" width="280px">
                    <!-- 作用域插槽 -->
                    <template slot-scope="scope">
                        <!-- 修改 删除用户区域 -->
                        <el-button
                            type="primary"
                            icon="el-icon-edit"
                            v-model="scope.row"
                            size="mini"
                            @click="showEditDialog(scope.row)"
                            >编辑</el-button
                        >
                        <el-button
                            type="danger"
                            icon="el-icon-delete"
                            v-model="scope.row"
                            size="mini"
                            @click="removeUserById(scope.row.id)"
                            >删除</el-button
                        >
                        <el-button
                            type="success"
                            icon="el-icon-check"
                            v-model="scope.row"
                            size="mini"
                            @click="userPass(scope.row.id)"
                            >通过</el-button
                        >
                        <!-- <el-tooltip
                            class="item"
                            effect="light"
                            content="角色分配"
                            placement="top"
                            :enterable="false"
                        >
                            <el-button
                                type="warning"
                                icon="el-icon-setting"
                                size="mini"
                                @click="setRights(scope.row.id)"
                            ></el-button>
                        </el-tooltip> -->
                    </template>
                </el-table-column>
            </el-table>

            <!-- 查询无数据时候提示框 -->
            <!-- <div class="cart-sorry" v-if="!flag">
                <img src="../../assets/images/sorry.png" alt="">
                <span>没有您要查找的用户</span>
            </div> -->
            <!-- 分配角色对话框 -->
            <!-- <el-dialog
                class="setRights-dialog"
                :close-on-click-modal="false"
                title="分配角色"
                :visible.sync="setRoleDialogVisible"
                width="700px"
                center
                @close="roleDialogClose"
            >
                <el-select
                    v-model="roleInfo.user_level"
                    placeholder="请选择角色"
                >
                    <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    >
                    </el-option>
                </el-select>
                添加用户对话框底部
                <span slot="footer" class="dialog-footer">
                    <el-button @click="setRoleDialogVisible = false"
                        >取 消</el-button
                    >
                    <el-button type="primary" @click="setRole">确 定</el-button>
                </span>
            </el-dialog> -->
            <!-- 添加用户对话框 -->
            <el-dialog
                class="adduser-dialog"
                :close-on-click-modal="false"
                title="添加用户"
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
                    label-width="60px"
                >
                    <el-form-item label="名称" prop="username">
                        <el-input
                            placeholder="填写用户名"
                            v-model="addForm.username"
                            @blur="checkName(addForm)"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input
                            type="password"
                            v-model="addForm.password"
                            placeholder="填写用户密码"
                        ></el-input>
                    </el-form-item>
                    <!-- <el-form-item label="电话" prop="mobile">
                        <el-input
                            v-model="addForm.mobile"
                            @blur="checkMobile(addForm)"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱" prop="email">
                        <el-input
                            v-model="addForm.email"
                            @blur="checkEmail(addForm)"
                        ></el-input>
                    </el-form-item> -->
                </el-form>
                <!-- 添加用户对话框底部 -->
                <span slot="footer" class="dialog-footer">
                    <el-button @click="addDialogVisible = false"
                        >取 消</el-button
                    >
                    <el-button type="primary" @click="addUser">确 定</el-button>
                </span>
            </el-dialog>
            <!-- 修改用户对话框 -->
            <el-dialog
                class="adduser-dialog"
                :close-on-click-modal="false"
                title="修改用户"
                :visible.sync="editDialogVisible"
                width="700px"
                center
                @close="dialogClose"
            >
                <!-- 修改用户 -->
                <el-form
                    :model="editForm"
                    :rules="addFormRules"
                    ref="ruleFormRef"
                    label-width="66px"
                >
                    <el-form-item label="ID" prop="id">
                        <el-input v-model="editForm.id" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="用户名" prop="username">
                        <el-input
                            disabled
                            v-model="editForm.username"
                            @blur="checkName(editForm)"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="新密码" prop="password">
                        <el-input
                            v-model="editForm.password"
                            type="password"
                        ></el-input>
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
            <!-- 充值对话框 -->
            <el-dialog
                class="adduser-dialog"
                :close-on-click-modal="false"
                title="充值金币"
                :visible.sync="chongDialogVisible"
                width="700px"
                center
                @close="dialogClose"
            >
                <!-- 充值金币 -->
                <el-form
                    :model="editForm"
                    :rules="addFormRules"
                    ref="ruleFormRef"
                    label-width="80px"
                >
                    <el-form-item label="ID" prop="id">
                        <el-input v-model="editForm.id" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="用户名" prop="username">
                        <el-input
                            v-model="editForm.username"
                            @blur="checkName(editForm)"
                            disabled
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="充值金额">
                        <el-input
                            v-model="editForm.chong"
                            type="number"
                        ></el-input>
                    </el-form-item>
                </el-form>
                <!-- 修改对话框底部 -->
                <span slot="footer" class="dialog-footer">
                    <el-button @click="chongDialogVisible = false"
                        >取 消</el-button
                    >
                    <el-button type="primary" @click="userChong"
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
        // 验证邮箱的规则
        // let checkEmail = (rule, value, cb) => {
        //     const regEmail =
        //         /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
        //     if (regEmail.test(value)) {
        //         return cb()
        //     }
        //     cb(new Error('请输入正确邮箱地址'))
        // }
        // 验证电话号码的规则
        // let checkMobile = (rule, value, cb) => {
        //     const regMobile =
        //         /^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/
        //     if (regMobile.test(value)) {
        //         return cb()
        //     }
        //     cb(new Error('请输入正确的手机号码'))
        // }
        // 用户名已经存在的时候的规则
        let isName = (rule, value, cb) => {
            if (this.isname === '') {
                return cb()
            }
            cb(new Error('用户名已经存在，请更换'))
        }
        // 邮箱已存在的时候的规则
        // let isEmail = (rule, value, cb) => {
        //     if (this.isemail === '') {
        //         return cb()
        //     }
        //     cb(new Error('该邮箱已经被其他用户绑定，请更换'))
        // }
        // 电话号码已经存在的时候的规则
        // let isMobile = (rule, value, cb) => {
        //     if (this.ismobile === '') {
        //         return cb()
        //     }
        //     cb(new Error('该手机号码已经被其他用户绑定，请更换'))
        // }

        return {
            // 获取用户列表所需参数
            queryInfo: {
                kewords: '',
                pagenum: 1,
                pagesize: 20
            },
            userlist: [],
            total: 3,
            flag: true, // 查询数据有/无 显示/隐藏变量
            addDialogVisible: false, // 添加用户对话框显示/隐藏变量
            editDialogVisible: false, // 修改用户对话框变量
            chongDialogVisible: false,
            isname: '', // 判断用户名是否存在的rule变量
            isemail: '',
            ismobile: '',
            // 添加用户规则
            addFormRules: {
                username: [
                    {
                        required: true,
                        message: '请输入用户名',
                        trigger: 'blur'
                    },
                    {
                        min: 2,
                        max: 16,
                        message: '长度在 2 到 16 个字符',
                        trigger: 'blur'
                    },
                    {
                        validator: isName,
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
                        max: 16,
                        message: '长度在 8 到 16 个字符',
                        trigger: 'blur'
                    }
                ],
                chong: [
                    {
                        required: true,
                        message: '请输入充值金币数量',
                        trigger: 'blur'
                    },
                    {
                        min: 1,
                        max: 8,
                        message: '长度在 1 到 8个数字',
                        trigger: 'blur'
                    }
                ]
                // gaipassword: [
                //     {
                //         min: 8,
                //         max: 20,
                //         message: '长度在 8 到 20 个字符',
                //         trigger: 'blur'
                //     }
                // ],
                // mobile: [
                //     {
                //         required: true,
                //         message: '请输入联系电话',
                //         trigger: 'blur'
                //     },
                //     {
                //         validator: checkMobile,
                //         trigger: 'blur'
                //     },
                //     {
                //         validator: isMobile,
                //         trigger: 'blur'
                //     }
                // ],
                // email: [
                //     {
                //         required: true,
                //         message: '请输入联系邮箱',
                //         trigger: 'blur'
                //     },
                //     {
                //         validator: checkEmail,
                //         trigger: 'blur'
                //     },
                //     {
                //         validator: isEmail,
                //         trigger: 'blur'
                //     }
                // ]
            },
            // 添加用户表单数据
            addForm: {
                username: '',
                password: ''
            },
            // 修改用户表单数据
            editForm: {
                username: '',
                password: '',
                id: '',
                chong: ''
            },
            tableWidth: '',
            remark_id: ''
        }
    },
    created() {
        this.getUserList()
    },
    methods: {
        // 获取用户列表函数
        async getUserList() {
            let { data: res } = await this.$http.get('user/userlistfalse', {
                params: this.queryInfo
            })
            // 查询不到数据 显示提示div
            if (res.code !== 200) {
                this.total = 0
            } else {
                this.userlist = res.data
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
        // 更新用户状态
        async userStateChange(row) {
            await this.$http.put('user/updatestate', {
                id: row.id,
                status: row.status
            })
            this.getUserList() // 无论修改成功都刷新下 目的是让状态显示正确的
        },
        // 给用户充值
        async userChong() {
            const { data: res } = await this.$http.put(
                'user/userchong',
                this.editForm
            )
            if (res.code === 200) {
                this.chongDialogVisible = false // 更新成功关闭对话框
                this.getUserList() // 更新成功请求获取列表函数 重新刷新用户列表
                this.$message.success({
                    message: '充值成功',
                    offset: 201,
                    center: true
                })
            } else {
                this.$message.error({
                    message: '充值失败',
                    offset: 201,
                    center: true
                })
            }
        },
        // 搜索用户 模糊搜索
        searchUser() {
            this.queryInfo.pagenum = 1
            this.getUserList()
        },
        // 输入框清除后重新搜索
        researchUser() {
            this.queryInfo.pagenum = 1
            this.getUserList()
        },
        // 监听对话框关闭事件 通用 关联同一个ref="ruleFormRef"
        dialogClose() {
            this.$refs.ruleFormRef.resetFields()
        },
        // 增加用户 确认前预校验
        addUser() {
            this.$refs.ruleFormRef.validate(async (valid) => {
                if (valid) {
                    // this.addDialogVisible = false
                    let { data: res } = await this.$http.post(
                        'user/adduser',
                        this.addForm
                    )
                    if (res.code === 200) {
                        this.getUserList() // 添加成功后请求获取列表函数 重新刷新用户列表
                        this.$message.success({
                            message: '添加用户成功',
                            offset: 200,
                            center: true
                        })
                        // 关闭对话框
                        this.addDialogVisible = false
                    } else {
                        this.$message.error({
                            message: '添加用户失败',
                            offset: 200,
                            center: true
                        })
                    }
                }
            })
        },
        // 校验用户名是否存在表中   封装 (直接传入要检查哪个表单 formname为表单对象)
        checkName(formname) {
            // 校验之前先重置isname的值
            this.isname = ''
            // 先让基础的判断通过再调api校验
            this.$refs.ruleFormRef.validateField(
                'username',
                async (errorMessage) => {
                    if (!errorMessage) {
                        let { data: res } = await this.$http.get(
                            'user/checkname',
                            { params: { username: formname.username } }
                        )

                        if (res === 1) {
                            // 如果存在给isname赋一个非空的值
                            this.isname = 'exist'
                            // 再校验一次
                            this.$refs.ruleFormRef.validateField('username')
                        } else {
                            this.isname = ''
                            // 再校验一次
                            this.$refs.ruleFormRef.validateField('username')
                        }
                    }
                }
            )
        },
        // 校验手机号码的函数
        checkMobile(formname) {
            // 校验之前先重置ismobile的值
            this.ismobile = ''
            // 先让基础的判断通过再调api校验
            this.$refs.ruleFormRef.validateField(
                'mobile',
                async (errorMessage) => {
                    if (!errorMessage) {
                        let { data: res } = await this.$http.get(
                            'users/addcheck',
                            {
                                params: {
                                    mobile: formname.mobile,
                                    id: formname.id
                                }
                            }
                        )
                        if (res === 1) {
                            // 如果存在给ismobile赋一个非空的值
                            this.ismobile = 'exist'
                            // 再校验一次
                            this.$refs.ruleFormRef.validateField('mobile')
                        }
                    }
                }
            )
        },
        // 校验邮箱的函数
        checkEmail(formname) {
            // 校验之前先重置isemail的值
            this.isemail = ''
            // 先让基础的判断通过再调api校验
            this.$refs.ruleFormRef.validateField(
                'email',
                async (errorMessage) => {
                    if (!errorMessage) {
                        let { data: res } = await this.$http.get(
                            'users/addcheck',
                            {
                                params: {
                                    email: formname.email,
                                    id: formname.id
                                }
                            }
                        )
                        if (res === 1) {
                            // 如果存在给isemail赋一个非空的值
                            this.isemail = 'exist'
                            // 再校验一次
                            this.$refs.ruleFormRef.validateField('email')
                        }
                    }
                }
            )
        },
        // 修改用户对话框显示函数
        async showEditDialog(row) {
            this.editDialogVisible = true
            this.editForm = row
            this.editForm.password = ''
        },
        // 更新用户信息函数
        updateUser() {
            this.$refs.ruleFormRef.validate(async (valid) => {
                if (valid) {
                    let { data: res } = await this.$http.put(
                        'user/updateuser',
                        this.editForm
                    )
                    if (res.code === 200) {
                        this.editDialogVisible = false // 更新成功关闭对话框
                        this.getUserList() // 更新成功请求获取列表函数 重新刷新用户列表
                        this.$message.success({
                            message: '修改用户成功',
                            offset: 201,
                            center: true
                        })
                    } else {
                        this.$message.error({
                            message: '修改用户失败',
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
                '此操作将永久删除该用户, 是否继续?',
                '提示',
                {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    closeOnClickModal: false
                }
            ).catch((err) => err)
            if (result === 'confirm') {
                let { data: res } = await this.$http.delete('user/deleteuser', {
                    params: { id: id }
                })
                if (res.code === 200) {
                    this.getUserList() // 删除成功后请求获取列表函数 重新刷新用户列表
                    this.$message.success({
                        message: '删除用户成功',
                        offset: 201,
                        center: true
                    })
                }
            }
        },
        // 充值对话框
        showChongDialog(row) {
            this.chongDialogVisible = true
            this.editForm.id = row.id
            this.editForm.username = row.username
        },
        // 管理员添加/修改备注
        async editRemarks(row) {
            const { data: res } = await this.$http.put('user/upremarks', {
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
        // 备注点击按钮
        remarkClick(row) {
            this.remark_id = row.id
            this.tableWidth = 400
            this.$nextTick(() => {
                this.$refs.remarkInput.focus()
            })
        },
        // 审核通过
        async userPass(id) {
            let { data: res } = await this.$http.put('user/userpass', {
                id: id,
                status: true
            })
            if (res.code === 200) {
                this.getUserList() // 删除成功后请求获取列表函数 重新刷新用户列表
                // this.$message.success({
                //     message: '删除用户成功',
                //     offset: 201,
                //     center: true
                // })
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

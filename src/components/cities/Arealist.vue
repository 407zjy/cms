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
                    >添加区域</el-button
                >
            </div>
            <!-- 列表table区域 -->
            <el-table :data="userlist" v-if="flag">
                <!-- <el-table-column type="index" label="#"></el-table-column> -->
                <el-table-column label="头像" prop="username"></el-table-column>
                <el-table-column label="昵称" prop="username"></el-table-column>
                <el-table-column label="年龄" prop="user_pid"></el-table-column>
                <el-table-column label="身高" prop="mobile"></el-table-column>
                <el-table-column label="体重" prop="email"></el-table-column>
                <el-table-column label="胸围" prop="email"></el-table-column>
                <el-table-column label="城市" prop="email"></el-table-column>

                <el-table-column label="状态">
                    <!-- 作用域插槽 -->
                    <template slot-scope="scope">
                        <el-switch
                            v-model="scope.row.user_state"
                            @change="userStateChange(scope.row)"
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
                            @click="showEditDialog(scope.row.id)"
                        ></el-button>
                        <el-button
                            type="danger"
                            icon="el-icon-delete"
                            v-model="scope.row"
                            size="mini"
                            @click="removeUserById(scope.row.id)"
                        ></el-button>
                        <el-tooltip
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
                        </el-tooltip>
                    </template>
                </el-table-column>
            </el-table>

            <!-- 查询无数据时候提示框 -->
            <!-- <div class="cart-sorry" v-if="!flag">
                <img src="../../assets/images/sorry.png" alt="">
                <span>没有您要查找的用户</span>
            </div> -->
            <!-- 分配角色对话框 -->
            <el-dialog
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
                <!-- 添加用户对话框底部 -->
                <span slot="footer" class="dialog-footer">
                    <el-button @click="setRoleDialogVisible = false"
                        >取 消</el-button
                    >
                    <el-button type="primary" @click="setRole">确 定</el-button>
                </span>
            </el-dialog>
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
                            v-model="addForm.username"
                            @blur="checkName(addForm)"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input v-model="addForm.password"></el-input>
                    </el-form-item>
                    <el-form-item label="电话" prop="mobile">
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
                <!-- 修改用户主体 -->
                <el-form
                    :model="editForm"
                    :rules="addFormRules"
                    ref="ruleFormRef"
                    label-width="66px"
                >
                    <el-form-item label="名称" prop="username">
                        <el-input
                            v-model="editForm.username"
                            disabled=""
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="电话" prop="mobile">
                        <el-input
                            v-model="editForm.mobile"
                            @blur="checkMobile(editForm)"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱" prop="email">
                        <el-input
                            v-model="editForm.email"
                            @blur="checkEmail(editForm)"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="新密码" prop="gaipassword">
                        <el-input
                            v-model="editForm.gaipassword"
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
        let checkEmail = (rule, value, cb) => {
            const regEmail =
                /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
            if (regEmail.test(value)) {
                return cb()
            }
            cb(new Error('请输入正确邮箱地址'))
        }
        // 验证电话号码的规则
        let checkMobile = (rule, value, cb) => {
            const regMobile =
                /^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/
            if (regMobile.test(value)) {
                return cb()
            }
            cb(new Error('请输入正确的手机号码'))
        }
        // 用户名已经存在的时候的规则
        let isName = (rule, value, cb) => {
            if (this.isname === '') {
                return cb()
            }
            cb(new Error('用户名已经存在，请更换'))
        }
        // 邮箱已存在的时候的规则
        let isEmail = (rule, value, cb) => {
            if (this.isemail === '') {
                return cb()
            }
            cb(new Error('该邮箱已经被其他用户绑定，请更换'))
        }
        // 电话号码已经存在的时候的规则
        let isMobile = (rule, value, cb) => {
            if (this.ismobile === '') {
                return cb()
            }
            cb(new Error('该手机号码已经被其他用户绑定，请更换'))
        }

        return {
            // 获取用户列表所需参数
            queryInfo: {
                query: '',
                pagenum: 1,
                pagesize: 20
            },
            userlist: [],
            total: 3,
            flag: true, // 查询数据有/无 显示/隐藏变量
            addDialogVisible: false, // 添加用户对话框显示/隐藏变量
            editDialogVisible: false, // 修改用户对话框变量
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
                        min: 4,
                        max: 10,
                        message: '长度在 4 到 10 个字符',
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
                    },
                    {
                        validator: checkMobile,
                        trigger: 'blur'
                    },
                    {
                        validator: isMobile,
                        trigger: 'blur'
                    }
                ],
                email: [
                    {
                        required: true,
                        message: '请输入联系邮箱',
                        trigger: 'blur'
                    },
                    {
                        validator: checkEmail,
                        trigger: 'blur'
                    },
                    {
                        validator: isEmail,
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
                mobile: '',
                email: '',
                id: '',
                gaipassword: ''
            },
            // 分配角色对话框显示属性
            setRoleDialogVisible: false,
            // 分配角色下拉选框数据
            options: [
                {
                    value: '1',
                    label: '超级管理员'
                },
                {
                    value: '2',
                    label: '商家'
                },
                {
                    value: '3',
                    label: '员工'
                }
            ],
            // 分配角色下拉框选中的value
            roleInfo: {
                user_level: '',
                id: ''
            }
        }
    },
    created() {
        this.getUserInfo()
    },
    methods: {
        // 获取用户列表函数
        async getUserInfo() {
            let { data: res } = await this.$http.get('users/userlist', {
                params: this.queryInfo
            })
            // 查询不到数据 显示提示div
            if (res.meta.status !== 200) {
                this.flag = false
                this.total = 0
            } else {
                this.userlist = res.data
                this.total = res.total
                this.flag = true
            }
        },
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
        // 更新用户状态
        async userStateChange(userinfo) {
            let result = await this.$http.put('users/updatestate', {
                username: userinfo.username,
                user_state: userinfo.user_state
            })
            if (result) this.getUserInfo()
        },
        // 搜索用户 模糊搜索
        searchUser() {
            this.queryInfo.pagenum = 1
            this.getUserInfo()
        },
        // 输入框清除后重新搜索
        researchUser() {
            this.queryInfo.pagenum = 1
            this.getUserInfo()
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
                        'users/adduser',
                        this.addForm
                    )
                    if (res.meta.status === 201) {
                        this.getUserInfo() // 添加成功后请求获取列表函数 重新刷新用户列表
                        this.$message.success({
                            message: '添加用户成功',
                            offset: 201,
                            center: true
                        })
                        // 关闭对话框
                        this.addDialogVisible = false
                    } else {
                        this.$message.error({
                            message: '添加用户失败',
                            offset: 201,
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
                            'users/addcheck',
                            { params: { username: formname.username } }
                        )
                        if (res === 1) {
                            // 如果存在给isname赋一个非空的值
                            this.isname = 'exist'
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
        async showEditDialog(id) {
            this.editDialogVisible = true
            let { data: res } = await this.$http.get('users/getbyid', {
                params: { id: id }
            })
            this.editForm = res.data
            this.editForm.id = id
        },
        // 更新用户信息函数
        updateUser() {
            this.$refs.ruleFormRef.validate(async (valid) => {
                if (valid) {
                    let { data: res } = await this.$http.put(
                        'users/updateuser',
                        this.editForm
                    )
                    if (res.meta.status === 201) {
                        this.editDialogVisible = false // 更新成功关闭对话框
                        this.getUserInfo() // 更新成功请求获取列表函数 重新刷新用户列表
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
                let { data: res } = await this.$http.delete(
                    'users/deleteuser',
                    { params: { id: id } }
                )
                if (res.meta.status === 201) {
                    this.getUserInfo() // 删除成功后请求获取列表函数 重新刷新用户列表
                    this.$message.success({
                        message: '删除用户成功',
                        offset: 201,
                        center: true
                    })
                }
            }
        },
        // 分配角色
        setRights(id) {
            this.setRoleDialogVisible = true
            this.roleInfo.id = id
        },
        // 分配角色对话框关闭函数
        roleDialogClose() {
            this.roleInfo = {}
        },
        // 确认分配角色
        async setRole() {
            let { data: res } = await this.$http.put(
                'users/setrole',
                this.roleInfo
            )
            if (res.status === 200) {
                this.setRoleDialogVisible = false
                this.getUserInfo()
                this.$message.success({
                    message: '分配角色成功',
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

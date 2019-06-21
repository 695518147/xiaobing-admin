<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.orderName" placeholder="指令名" style="width: 20%;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-select v-model="listQuery.isShow" placeholder="是否显示" clearable class="filter-item" style="width: 130px">
        <el-option v-for="item in calendarTypeOptions" :key="item.key" :label="item.display_name" :value="item.key" />
      </el-select>
      <select v-model="listQuery.orderTypeId" placeholder="请选择指令类型" style="width: 230px">
        <option v-for="item in orderTypeOptions" :key="item.id" :value="item.id" v-html="item.orderTypeName" />
      </select>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        搜索
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">
        新增
      </el-button>
      <el-button v-waves :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-download" @click="handleDownload">
        导出
      </el-button>
    </div>

    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      highlight-current-row
      style="width: 100%;"
      @sort-change="sortChange"
    >
      <el-table-column label="指令名" style="width: 25%" align="center">
        <template slot-scope="scope">
          <span v-html="scope.row.orderName" />
        </template>
      </el-table-column>
      <el-table-column label="指令说明" style="width: 25%" align="center">
        <template slot-scope="scope">
          <span v-html="scope.row.orderDescription.substring(0,20)" />
        </template>
      </el-table-column>
      <el-table-column label="指令类型说明" style="width: 25%" align="center">
        <template slot-scope="scope">
          <span v-html="scope.row.orderTypeDescription.substring(0,20)" />
        </template>
      </el-table-column>
      <el-table-column label="排序号" sortable="number" style="width: 5%" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.number }}</span>
        </template>
      </el-table-column>
      <el-table-column label="是否显示" style="width: 5%" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.show ? "是" : "否" }}</span>
        </template>
      </el-table-column>
      <el-table-column label="是否分栏" style="width: 5%" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.split ? "是" : "否" }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" style="width: 20%" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.createTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" style="width: 40%" class-name="small-padding">
        <template slot-scope="{row}">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">
            编辑
          </el-button>
          <el-button v-if="!row.show" size="mini" type="success" @click="handleModify(row)">
            显示
          </el-button>
          <el-button v-if="row.show" size="mini" @click="handleModify(row)">
            隐藏
          </el-button>
          <!--          <el-button v-if="row.status!='deleted'" size="mini" type="danger" @click="handleDelete(row)">-->
          <!--            删除-->
          <!--          </el-button>-->
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="70px" style="width: 35rem; margin-left:50px;">
        <el-form-item label="指令类型" prop="orderTypeId">
          <select v-model="temp.orderTypeId" placeholder="请选择指令类型" style="width: 230px">
            <option v-for="item in orderTypeOptions" :key="item.id" :value="item.id" v-html="item.orderTypeName" />
          </select>
        </el-form-item>
        <el-form-item label="指令名" prop="orderName">
          <tinymce-editor ref="editor" v-model="temp.orderName" :disabled="disabled" />
        </el-form-item>
        <el-form-item label="指令说明" prop="orderDescription">
          <tinymce-editor ref="editor" v-model="temp.orderDescription" :disabled="disabled" />
        </el-form-item>
        <el-form-item label="指令类型说明" prop="orderTypeDescription">
          <tinymce-editor ref="editor" v-model="temp.orderTypeDescription" :disabled="disabled" />
        </el-form-item>
        <el-form-item label="排序号" prop="number">
          <el-input v-model="temp.number" />
        </el-form-item>
        <el-form-item label="是否显示">
          <el-radio-group v-model="temp.show">
            <el-radio v-for="item in calendarTypeOptions" :key="item.key" :label="item.key">{{ item.display_name }}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="是否分栏">
          <el-radio-group v-model="temp.split">
            <el-radio v-for="item in calendarTypeOptions" :key="item.key" :label="item.key">{{ item.display_name }}</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel()">
          取消
        </el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">
          确认
        </el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="dialogPvVisible" title="Reading statistics">
      <el-table :data="pvData" border fit highlight-current-row style="width: 100%">
        <el-table-column prop="key" label="Channel" />
        <el-table-column prop="pv" label="Pv" />
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogPvVisible = false">Confirm</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>

import TinymceEditor from '@/components/Tinymce'
import { fetchList, create, update, cdelete, handleModify } from '@/api/order'
import { fetchList as ordertypes } from '@/api/ordertype'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

const calendarTypeOptions = [
  { key: true, display_name: '是' },
  { key: false, display_name: '否' }
]

const calendarTypeKeyValue = calendarTypeOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})

export default {
  name: 'OrderTable',
  components: { Pagination, TinymceEditor },
  directives: { waves },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    },
    typeFilter(type) {
      return calendarTypeKeyValue[type]
    }
  },
  data() {
    return {
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        orderBy: '',
        orderName: '',
        isShow: true,
        orderTypeId: ''
      },
      calendarTypeOptions,
      orderTypeOptions: [],
      temp: {
        id: null,
        orderName: '',
        number: '',
        orderDescription: '',
        orderTypeDescription: '',
        show: true,
        split: true
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑',
        create: '新增'
      },
      dialogPvVisible: false,
      pvData: [],
      rules: {
        type: [{ required: true, message: 'type is required', trigger: 'change' }],
        timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
        title: [{ required: true, message: 'title is required', trigger: 'blur' }]
      },
      downloadLoading: false
    }
  },
  created() {
    ordertypes({ orderBy: '' }).then((res) => {
      this.orderTypeOptions = res.data.list
    }).then(() => {
      this.getList()
    })
  },
  methods: {
    cancel() {
      this.dialogFormVisible = false
      this.resetTemp()
    },
    getList() {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        this.list = response.data.list
        this.total = response.data.total
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    sortChange(data) {
      const { prop = 'number', order } = data
      this.listQuery.orderBy = (order === 'ascending' ? (prop + ' asc') : (prop + ' desc'))
      this.getList()
    },
    resetTemp() {
      this.temp = {
        id: null,
        orderName: '',
        number: '',
        orderDescription: '',
        orderTypeDescription: '',
        show: true,
        split: true
      }
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          create(this.temp).then((data) => {
            this.list.unshift(data.data)
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '新增成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleUpdate(row) {
      this.resetTemp()
      this.temp = Object.assign({}, row) // copy obj
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          update(tempData).then(() => {
            for (const v of this.list) {
              if (v.id === this.temp.id) {
                const index = this.list.indexOf(v)
                this.list.splice(index, 1, this.temp)
                break
              }
            }
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '更新成功！',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleModify(row) {
      const id = row.id
      const show = !row.show
      handleModify({ id, show }).then(() => {
        const index = this.list.indexOf(row)
        this.list.splice(index, 1)
      })
    },
    handleDelete(row) {
      cdelete(row).then(() => {
        this.$notify({
          title: 'Success',
          message: 'Delete Successfully',
          type: 'success',
          duration: 2000
        })
        const index = this.list.indexOf(row)
        this.list.splice(index, 1)
      })
    },
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['timestamp', 'title', 'type', 'importance', 'status']
        const filterVal = ['timestamp', 'title', 'type', 'importance', 'status']
        const data = this.formatJson(filterVal, this.list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: 'table-list'
        })
        this.downloadLoading = false
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    }
  }
}
</script>

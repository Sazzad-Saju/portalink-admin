<template>
  <div class="main_title">
    <h1>All Customer</h1>
  </div>
  <div class="item_color_heading m15">
    <div class="ly-wrap">
      <div class="ly-row">
        <div class="ly-6 pl_0">
          <div class="item_color_heading_left">
            <router-link :to="{name: 'create-customer'}" class="link mr_20 item_color_btn">+ Add a New Customer</router-link>
            <span class="font_italic color_grey_type2" v-if="pagination">You currently have {{ pagination.total }} customers.</span>
          </div>
        </div>
        <div class="ly-6 pr_0 text_right">
          <div class="display_inline width_90p">
            <div class="form_inline align_middle" style="margin-top: 5px;">
              <div class="upload-btn-wrapper">
                <button class="ly_btn btn_blue">Import</button>
                <input type="file" id="importCustomerFile" @change="importCustomers" accept=".xlsm, .xlsx, .csv,text/csv, application/excel, application/vnd.ms-excel, application/vnd.msexce">
              </div>
            </div>
          </div>

          <div class="display_inline width_90p">
            <button class="ly_btn  btn_blue min_width_100p" @click.prevent="exportCustomer">Export</button>
          </div>
          <div class="display_inline width_90p">
            <button class="ly_btn  btn_blue min_width_100p" @click.prevent="sendmail">Send Mail</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="item_color_search p15">
    <div class="ly-wrap">
      <div class="ly-row">
        <div class="ly-6 pl_0">
          <div class="item_list_searchbox">
            <div class="display_inline">
              <input type="text" class="form_global" placeholder="Customer Name" v-on:keyup.enter="searchCustomer()" v-model="queryParams.first_name">
            </div>
            <div class="display_inline">
              <input type="text" class="form_global" placeholder="Email" v-on:keyup.enter="searchCustomer()" v-model="queryParams.email">
            </div>
            <div class="display_inline">
              <button class="ly_btn btn_blue width_100p mr_8 toggle_item_search" @click="queryParams.page = 1 ; searchCustomer()">Search</button>
              <button class="ly_btn btn_blue width_100p" @click="resetAll()">Reset</button>
            </div>
          </div>
        </div>
        <div class="ly-6 pr_0 text_right">
          <div class="display_inline width_150p">
            <div class="select">
              <select class="form_global" v-model="sort">
                <option value="1">Name A-Z</option>
                <option value="2">Name Z-A</option>
                <option value="3">Modified</option>
              </select>
            </div>
          </div>
          <div class="display_inline  width_100p">
            <span>Status</span>
          </div>
          <div class="display_inline  width_60p">
            <div class="select">
              <select class="form_global" v-model="filter.status" @change="queryParams.page = 1 ; changeRoute()">
                <option value="">All</option>
                <option value="1">Active</option>
                <option value="0">Inactive</option>
              </select>
            </div>
          </div>
          <div class="display_inline width_60p">
            <div class="select">
              <select class="form_global" v-model="filter.per_page" @change=" queryParams.page = 1; changeRoute()">
                <option value="20">20</option>
                <option value="50">50</option>
                <option value="100">100</option>
                <option value="200">200</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="item_color_heading m15">
    <div class="item_size_content">
      <div class="ly-wrap">
        <div class="ly-row">
          <div class="ly-12 pl_0">
            <table-component
                :columns="columns"
                :rows="customers"
                :sortable="sortable"
                :pagination="pagination"
                @sorting="sorting"
                @pageChanged="pageChanged">

              <template v-slot:checkbox>
                <div class="custom_checkbox">
                  <input type="checkbox" id="checkAll" v-model="isCheckAll" :value="1"  />
                  <label for="checkAll" @click.prevent="checkAll()"></label>
                </div>
              </template>

              <template v-slot:email="{ row }">
                {{ row.email.length > 22 ? row.email.substr(0, 22) + '...' : row.email}}
              </template>

              <template v-slot:id="{ row }">
                <div class="custom_checkbox">
                  <input type="checkbox" :id="'singleCheck' + row.id" :checked="checkedCustomers.includes(row.id)" />
                  <label :for="'singleCheck' + row.id" @click.prevent="updateCheckall(row)"></label>
                </div>
              </template>

              <template v-slot:status="{ row }">
                <div class="custom_checkbox">
                  <input type="checkbox" :id="'status_'+row.id" :checked="row.status" :value="row.status"  />
                  <label :for="'status_'+row.id" @click.prevent="changeStatus($event, row)"></label>
                </div>
              </template>

              <template v-slot:action="{ row }">
                <router-link :to="`/customer/${row.id}`" class="color_blue item_size_delete">
                  Edit
                </router-link> |
                <span class="color_red item_size_delete" @click.prevent="deleteRecord(row)">Delete</span>
              </template>
            </table-component>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- <SendMailModal
      v-if="showSendMailModal"
      :modalData="modalData"
      @closeModal="closeSendMailModal"
  />
  <FileModal
      v-if="showFileModal"
      :filePath="filePath"
      @closeModal="hideFileModal"
  /> -->
</template>

<script>
import TableComponent from "@/components/shared/TableComponent";
// import SendMailModal from "./SendMail";
// import FileModal from "./FileModal";
export default {
  // components: {TableComponent, SendMailModal, FileModal},
  components: {TableComponent},
  name: "CustomersList",
  data(){
    return {
      customers:[],
      sort: '1',
      filter: {
        status: '',
        per_page: 20
      },
      queryParams: {
        page: 1,
        email: '',
        first_name: '',
        sort: 'created_at',
        sort_order: 'desc',
        per_page: 20
      },
      sortable: {
        order: 'created_at',
        sort: 'desc'
      },
      columns: [
        {
          headerSlot: true,
          headerSlotName: 'checkbox',
          field: "id",
          sortable: false,
          slot: true
        },
        {
          label: "Name",
          field: "first_name",
          sortable: true
        },
        {
          label: "Username",
          field: "username",
          sortable: true
        },
        {
          label: "Email",
          field: 'email',
          sortable: true,
          slot: true,
        },
        {
          label: "Type",
          field: "type",
          sortable: false
        },
        {
          label: "Created At",
          field: "created_at",
          sortable: true
        },
        {
          label: "Last Login",
          field: "last_login",
          sortable: true
        },
        {
          label: "Profile Url",
          field: 'url',
          sortable: true,
        },
        {
          label: "Status",
          field: 'status',
          sortable: false,
          slot: true,
        },
        {
          label: "Action",
          field: 'action',
          sortable: false,
          slot: true,
        }
      ],
      pagination: null,
      update:{
        status:'',
        verified:'',
        mailing_list:'',
        text_block:'',
      },
      checkedCustomers: [],
      checkedEmails: [],
      isCheckAll: false,
      showSendMailModal: false,
      modalData: [],
      showFileModal:false,
      filePath: '',
    }
  },
  created() {
    const query = this.getAllQueryParams()
    if(query.page){
      this.setQueryData(query)
    }

    this.loadData();
  },
  watch: {
    $route(to, from) {
      if(to.name == from.name && !window._.isEqual(to, from)){
        this.setQueryData(this.getAllQueryParams())
        this.loadData()
      }
    },
    sort() {
      if (this.sort === '1'){
        this.sorting({column:'email', order:'asc'})
      }
      else if (this.sort === '2'){
        this.sorting({column:'email', order:'desc'})
      }
      else if (this.sort === '3'){
        this.sorting({column:'updated_at', order:'desc'})
      }
    }
  },
  methods:{
    setQueryData(query){
      this.queryParams = {
        page: query.page,
        email: query.email,
        first_name: query.first_name,
        sort: query.sort,
        sort_order: query.sort_order,
        per_page: query.per_page
      }

      this.filter = {
        status: query.status,
        verified: query.verified,
        per_page: query.per_page
      }

      this.sortable = {
        order:  query.sort,
        sort: query.sort_order
      }
    },
    resetAll(){
      this.sortable = {
        order: 'created_at',
        sort: 'desc'
      }

      this.filter = {
        status: '',
        verified: '',
        per_page: 20
      }

      this.queryParams = {
        page: 1,
        email: '',
        first_name: '',
        sort: 'created_at',
        sort_order: 'desc',
        per_page: 20
      }

      this.changeRoute();
      this.loadData();
    },
    searchCustomer(){
      this.changeRoute();
    },
    sorting({column, order}) {
      this.queryParams.sort = column;
      this.queryParams.sort_order = order;
      this.queryParams.page = 1;
      this.changeRoute()
    },
    pageChanged(page) {
      this.queryParams.page = page;
      this.changeRoute()
    },
    changeStatus($e, row){
      this.update.status = row.status
      this.axios.post('/customer/status/'+row.id, this.update)
          .then(() => {
            this.loadData();
            this.showSuccessMsg("Update Successfully!");
          })
          .catch((err) => {
            this.errors = err.response.data.errors
          })
          .finally(() => {
            this.loading = false;
          })
    },
    deleteRecord(row) {
      this.$swal({
        title: 'Are you sure want to delete?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        confirmButtonColor: '#dd4b39',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          this.axios.delete('/customers/'+row.id).then(() => {
            this.loadData();
            this.$swal.fire(
                'Deleted',
                'Customer has been deleted!',
                'success'
            )
          });
        }
      });
    },
    checkAll(){
      this.isCheckAll = !this.isCheckAll;
      this.checkedCustomers = [];
      this.checkedEmails = [];
      if(this.isCheckAll){
        for (var key in this.customers) {
          this.checkedCustomers.push(this.customers[key].id);
          this.checkedEmails.push(this.customers[key]);
        }
      }
    },
    updateCheckall(row){
      let index = window._.findIndex(this.checkedCustomers, (customerId)=> customerId == row.id)
      if(index > -1){
        this.checkedCustomers.splice(index, 1)
        this.checkedEmails.splice(index, 1)
      }else{
        this.checkedCustomers.push(row.id)
        this.checkedEmails.push(row)
      }
      if(this.checkedCustomers.length == this.customers.length){
        this.isCheckAll = true;
      }else{
        this.isCheckAll = false;
      }
    },
    exportCustomer(){
      this.axios({
        url: '/customers/export',
        method: 'post',
        responseType: 'blob',
        data: {customerIds : this.checkedCustomers}
      }).then((response) => {
        var a = document.createElement("a");
        document.body.appendChild(a);
        a.style = "display: none"
        var json = response.data,
            blob = new Blob([json], {type: "octet/stream"}),
            url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = 'customers.xlsx';
        a.click();
        window.URL.revokeObjectURL(url);
      });
    },
    async importCustomers(e) {
      if (await this.checkFileTypeExcel() == false) {
        document.getElementById("importCustomerFile").value = null;
        return
      }

      if (await this.takeConfirmation() == false) {
        document.getElementById("importCustomerFile").value = null;
        return
      }

      let formData = new FormData()

      formData.append('file', e.target.files[0]);

      this.loading = true
      this.axios.post('/customers/import', formData)
          .then(() => {
            this.loadData();
            this.showSuccessMsg("Imported Successfully!");
          })
          .catch(() => {
            this.showFailMsg("Spmething went wrong!");
          })
          .finally(() => this.loading = false);

      document.getElementById("importCustomerFile").value = null;
      return
    },
    checkFileTypeExcel() {
      let validExts = new Array(".xlsx", ".xls", ".csv")
      let fileExt = document.getElementById("importCustomerFile").value

      fileExt = fileExt.substring(fileExt.lastIndexOf('.'))
      if (validExts.indexOf(fileExt) < 0) {
        this.$swal.fire(
            'Error',
            "Invalid file selected, valid files are of " + validExts.toString() + " types.",
            'error'
        )
        return false;
      }
      else return true;
    },
    async takeConfirmation(){
      let confirm = false
      await this.$swal({
        title: 'Are you sure want to import?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, import it!',
        cancelButtonText: 'Cancel',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          confirm = true
        }
      })

      return confirm
    },
    sendmail(){
      if(this.checkedCustomers.length <= 0){
        this.showFailMsg("Please select customer to send email!");
        return;
      }
      this.modalData = this.checkedEmails;
      this.showSendMailModal = true;
    },
    closeSendMailModal(){
      this.isCheckAll = false
      this.checkedCustomers = []
      this.checkedEmails = []
      this.showSendMailModal = false;
    },
    showDownloadFile(filePath){
      this.filePath = filePath;
      this.showFileModal = true;
    },
    hideFileModal() {
      this.filePath = '';
      this.showFileModal = false;
    },
    changeRoute() {
      this.$router.push({name: this.$route.name, query: {...this.queryParams, ...this.filter}})
    },
    loadData() {
      this.axios.get('/customers', {
        params: {...this.queryParams, ...this.filter}
      }).then((response) => {
        this.customers = response.data.data;
        this.pagination = response.data.meta;
      })
    },
  }
}
</script>
<style scoped>
.item_list_searchbox div{
  margin: 5px;
}

.ly-6 div{
  margin: 5px;
}
</style>
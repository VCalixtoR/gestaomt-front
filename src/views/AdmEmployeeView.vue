<template>

  <div class="pageContentEmployee">

    <div class="employeeDataWrapper">

      <TextC colorClass="black1" fontSize='var(--text-title)'>
        Dados de Funcionários
      </TextC>

      <div v-for="(employee, index) in this.employees" :key="index"
        class='employeeWrapper'>

        <div class='employeeInnerWrapper'>

          <div class='employeeTextData'>
            <TextC colorClass="black2" fontSize='var(--text-normal)' fontWeight='bold' display='inline'>
              {{ employee['name'] }}
            </TextC>
          </div>
          
          <div class='employeeTextData'>
            <TextC colorClass="black2" fontSize='var(--text-normal)' fontWeight='bold' display='inline'>
              {{ employee['mail'] }}
            </TextC>
          </div>
          
          <div class='employeeTextData'>
            <TextC colorClass="black2" fontSize='var(--text-normal)' fontWeight='bold' display='inline'>
              Aniversário:
            </TextC>
            <TextC colorClass="black2" fontSize='var(--text-normal)' display='inline'>
              {{ employee['birth_date'] }}
            </TextC>
          </div>

          <div class='employeeTextData'>
            <TextC colorClass="black2" fontSize='var(--text-normal)' fontWeight='bold' display='inline'>
              Entrada no Sistema:
            </TextC>
            <TextC colorClass="black2" fontSize='var(--text-normal)' display='inline'>
              {{ employee['entry_date_time'] }}
            </TextC>
          </div>

          <div class='employeeTextData'>

            <TextC colorClass="black2" fontSize='var(--text-normal)' fontWeight='bold' display='inline'>
              Situação:
            </TextC>
            <SelectWithPencil
              ref="selectActive"
              :id="index + 'selectActive'"
              :name="index + 'selectActive'"
              :initialOptValue="employee['active']"
              :items="this.selectActiveItems"
              @optClicked="(activeValue) => this.changeEmployeeActive(index, activeValue)"
              @pencilClicked="this.editActiveField(index, true)"
            />

          </div>

          <div class='employeeTextData'>
            <TextC colorClass="black2" fontSize='var(--text-normal)' fontWeight='bold' display='inline'>
              Comissão:
            </TextC>
            <SelectWithPencil
              ref="selectComission"
              :id="index + 'selectComission'"
              :name="index + 'selectComission'"
              :initialOptValue="employee['select_comission_row']"
              :items="this.selectComissionItems"
              @optClicked="(comissionValue) => this.changeEmployeeComission(index, comissionValue)"
              @pencilClicked="this.editComissionField(index, true)"
            />
          </div>
        </div>

        <div class='employeeInnerWrapper'>

          <div class='employeeTextData'>
            <TextC colorClass="black2" fontSize='var(--text-normal)' fontWeight='bold' display='inline'>
              Vendas:
            </TextC>
            <TextC colorClass="black2" fontSize='var(--text-normal)' display='inline'>
              {{ employee['sales'] }}
            </TextC>
          </div>

          <div class='employeeTextData'>
            <TextC colorClass="black2" fontSize='var(--text-normal)' fontWeight='bold' display='inline'>
              Condicionais:
            </TextC>
            <TextC colorClass="black2" fontSize='var(--text-normal)' display='inline'>
              {{ employee['conditionals'] }}
            </TextC>
          </div>

          <div class='employeeTextData'>
            <TextC colorClass="black2" fontSize='var(--text-normal)' fontWeight='bold' display='inline'>
              Condicionais ativas:
            </TextC>
            <TextC colorClass="black2" fontSize='var(--text-normal)' display='inline'>
              {{ employee['active_conditionals'] }}
            </TextC>
          </div>

          <div class='employeeTextData'>
            <TextC colorClass="black2" fontSize='var(--text-normal)' fontWeight='bold' display='inline'>
              Vendas do mês 1:
            </TextC>
            <TextC colorClass="black2" fontSize='var(--text-normal)' display='inline'>
              {{ employee['last_month_sales'] }}
            </TextC>
          </div>

          <div class='employeeTextData'>
            <TextC colorClass="black2" fontSize='var(--text-normal)' fontWeight='bold' display='inline'>
              Valor do mês 1:
            </TextC>
            <TextC colorClass="black2" fontSize='var(--text-normal)' display='inline'>
              {{ employee['last_month_value_f'] }}
            </TextC>
          </div>

          <div class='employeeTextData'>
            <TextC colorClass="black2" fontSize='var(--text-normal)' fontWeight='bold' display='inline'>
              Comissão mês 1:
            </TextC>
            <TextC colorClass="black2" fontSize='var(--text-normal)' display='inline'>
              {{ employee['last_month_comission_f'] }}
            </TextC>
          </div>

        </div>
        <div class='employeeButtonWrapper'>
          
          <ButtonC colorClass="pink3"
            :id="'btnCloseMonth' + index"
            label="Fechamento"
            width="100%"
            padding="3px 0px"
            @click="this.$root.renderView('admfechamentofuncionarios', { 'employee' : this.employees[index] })"
          />
          
        </div>

      </div>

    </div>

    <div v-if="this.users.length > 0"
      class="employeeSignData">

      <TextC colorClass="black1" fontSize='var(--text-title)'>
        Cadastros de Funcionários Solicitados
      </TextC>

      <TablePink
        class="tableAccRej"
        :tableData="this.tableEmployeeRequests"
        @accept="(rowN, colN) => this.acceptEmployee(rowN)"
        @reject="(rowN, colN) => this.rejectEmployee(rowN)"
      />
    
    </div>

  </div>

</template>

<script>

import ButtonC from '../components/ButtonC.vue'
import TablePink from '../components/TablePink.vue'
import Requests from '../js/requests.js'
import SelectWithPencil from '../components/SelectWithPencil.vue'
import TextC from '../components/TextC.vue'
import Utils from '../js/utils.js'

export default {
  
  name: 'AdmEmployeeView',

  props: {
  },

  components: {
    ButtonC,
    SelectWithPencil,
    TablePink,
    TextC
  },

  data() {
    return {
      employees: [],
      users: [],
      tableEmployeeRequests: {
        'titles': [ 'Nome', 'Email', 'CPF', 'Sexo', 'Data de Nascimento', 'Data de Solicitação', 'Permitir?' ],
        'colTypes': [ 'string', 'string', 'string', 'string', 'string', 'string', 'acceptReject' ],
        'colWidths': [ '22%', '23%', '15%', '10%', '10%', '10%', '10%' ],
        'content': []
      },
      selectActiveItems: [
        { label: 'Inativo', value: 0 },
        { label: 'Ativo', value: 1 }
      ],
      selectComissionItems: [
        { label: '1%', value: 0.01 },
        { label: '2%', value: 0.02 },
        { label: '3%', value: 0.03 },
        { label: '4%', value: 0.04 },
        { label: '5%', value: 0.05 }
      ]
    }
  },

  async created() {
    this.$root.setPageLoggedName('Funcionários');

    await this.loadEmployees();
    await this.loadPendingUsers();
  },

  methods:{
    async loadEmployees(){

      this.employees = [];
      let vreturn = await this.$root.doRequest(Requests.getEmployees, []);

      if(vreturn && vreturn['ok'] && vreturn['response'] && vreturn['response']['employees']){
        this.employees = vreturn['response']['employees'];

        this.employees.forEach(employee => {

          let tmp = employee['birth_date'].split('-');
          employee['birth_date'] = tmp[2] + '/' + tmp[1];

          tmp = employee['entry_date_time'].split(' ')[0].split('-');
          employee['entry_date_time'] = tmp[2] + '/' + tmp[1] + '/' + tmp[0];

          employee['select_comission_row'] = employee['comission'];

          employee['last_month_comission'] = employee['last_month_value'] * employee['comission'];

          employee['last_month_value_f'] = Utils.getCurrencyFormat(employee['last_month_value']);
          employee['last_month_comission_f'] = Utils.getCurrencyFormat(employee['last_month_comission']);

        });

      }
      else{
        this.$root.renderRequestErrorMsg(vreturn, []);
      }
    },
    async loadPendingUsers(){
      
      this.users = [];
      this.tableEmployeeRequests['content'] = [];

      let vreturn = await this.$root.doRequest(Requests.getPendingUsers, []);

      if(vreturn && vreturn['ok'] && vreturn['response'] && vreturn['response']['users']){
        this.users = vreturn['response']['users'];

        this.users.forEach(user => {

          let userBirthDate = user['birth_date'] != null ? 
            Utils.getDateString(new Date(Date.parse(user['birth_date']))) :
            '';
          let userEntryDate = user['entry_date_time'] != null ? 
            Utils.getDateString(new Date(Date.parse(user['entry_date_time']))) :
            '';

          this.tableEmployeeRequests['content'].push([
            user['name'],
            user['mail'],
            user['cpf'],
            (user['gender'] == 'F' ? 'Feminino' : 'Masculino'),
            userBirthDate,
            userEntryDate,
            { 'showAccept': true, 'showReject': true }
          ]);

        });
      }
      else{
        this.$root.renderRequestErrorMsg(vreturn, []);
      }
    },
    async acceptEmployee(rowN){
      let vreturn = await this.$root.doRequest(Requests.allowUser, [ this.users[rowN]['id'] ]);

      if(!vreturn || !vreturn['ok']){
        this.$root.renderRequestErrorMsg(vreturn, []);
      }
      else{
        await this.loadPendingUsers();
        await this.loadEmployees();
      }
    },
    async rejectEmployee(rowN){
      let vreturn = await this.$root.doRequest(Requests.rejectUser, [ this.users[rowN]['id'] ]);

      if(!vreturn || !vreturn['ok']){
        this.$root.renderRequestErrorMsg(vreturn, []);
      }
      else{
        await this.loadPendingUsers();
        await this.loadEmployees();
      }
    },
    editActiveField(row, show){
      this.$refs.selectActive[row].showOpts(show);
    },
    editComissionField(row, show){
      this.$refs.selectComission[row].showOpts(show);
    },
    async changeEmployeeActive(row, activeValue){

      if(this.employees[row]['active'] != activeValue){
        let args = [
          this.employees[row]['id'],
          activeValue,
          this.employees[row]['comission']
        ];

        let vreturn = await this.$root.doRequest(Requests.updateEmployee, args);

        if(!vreturn || !vreturn['ok']){
          this.$root.renderRequestErrorMsg(vreturn, []);
        }
        else{
          await this.loadEmployees();
        }
      }
    },
    async changeEmployeeComission(row, comissionValue){

      if(this.employees[row]['comission'] != comissionValue){
        let args = [
          this.employees[row]['id'],
          this.employees[row]['active'],
          comissionValue
        ];

        let vreturn = await this.$root.doRequest(Requests.updateEmployee, args);

        if(!vreturn || !vreturn['ok']){
          this.$root.renderRequestErrorMsg(vreturn, []);
        }
        else{
          await this.loadEmployees();
        }
      }
    }
  }
}
</script>

<!-- style applies only to this component -->
<style scoped>

.pageContentEmployee{
  width: 100%;
  height: 100%;
}
.employeeWrapper{
  background-color: var(--color-pink1);
  border: solid 1px var(--color-pink3);
  line-height: 100%;
  margin: 0px;
  padding: 0px;
  width: 100%;
}
.employeeWrapper > *{
  vertical-align: middle;
  line-height: normal;
}
.employeeDataTitle{
  margin: 30px 0px;
}
.employeeTextData{
  margin-top: 7px;
}
@media (max-width: 1200px) {
  .employeeWrapper{
    padding: 5px 0px;
  }
  .employeeInnerWrapper, .employeeButtonWrapper{
    width: calc(100% - 40px);
    display: block;
    padding: 0px 20px;
  }
  .employeeButtonWrapper{
    margin: 10px 0px;
  }
  .employeeSignData{
    margin-top: 20px;
  }
}
@media (min-width: 1201px) {
  .employeeWrapper{
    padding: 0px 5px;
  }
  .employeeInnerWrapper, .employeeButtonWrapper{
    display: inline-block;
  }
  .employeeInnerWrapper{
    width: calc(40% - 20px);
    padding: 10px;
  }
  .employeeButtonWrapper{
    width: 20%;
    padding: 0px;
  }
  .employeeSignData{
    margin-top: 40px;
  }
  .tableAccRej{
    display: inline-block;
    margin: auto;
    text-align: center;
    width: 100%;
  }
  .iconPencil{
    margin-left: 5px;
  }
}


</style>
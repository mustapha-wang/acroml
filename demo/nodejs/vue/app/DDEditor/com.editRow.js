let Com_EditRow={
    props:['displayValueColumns','editSuccess'],
    data(){
        return {
            model:{},
            rules: {
                DDKey: 'required',
                SortNumber: 'required'
            },
            errors: {}
        }
    },
    methods:{
        editRow(row){
            this.editingRow=row;
            this.model=Object.assign({}, row); 
            this.$refs.dlg.open();
            //用this.$nextTick无效果
            let self=this;
            setTimeout(function(){
                self.$refs.dlg.center();
            },0);
        },
        getError(name) {
            return this.errors[name] && this.errors[name].length
                ? this.errors[name][0]
                : null;
        },
        hasError(name) {
            return this.getError(name) != null;
        },
        saveRow(){
            this.$refs.form.validate(errors => {
              if (!errors){
                if (this.editSuccess(this.model)){
                    this.$refs.dlg.close();
                }
              }
            })
        },
    },
    template:`
        <Dialog ref="dlg" bodyCls="f-column" :title="t('Edit Row')" :modal="true" 
            closed resizable :dialogStyle="{height:'500px',width:'520px'}">
            <div class="f-full" style="overflow:auto">
                <Form ref="form" :model="model" :rules="rules" @validate="errors=$event" 
                    style="padding:10px 20px">
                    <div style="margin-bottom:10px">
                        <div for="DDKey" style="width:160px">{{t('DDKey')}}:</div>
                        <TextBox :multiline=true inputId="DDKey" name="DDKey" 
                            v-model="model.DDKey" required="true"
                            style="height:60px;width:450px"
                            :inputStyle='{"white-space":"nowrap"}'></TextBox>
                    </div>
                    <div style="margin-bottom:10px">
                        <Label for="SortNumber" style="width:100px">{{t('SortNumber')}}:</Label>
                        <NumberBox style="width:60px" inputId="SortNumber" 
                            name="SortNumber" :precision="0" v-model="model.SortNumber"></NumberBox>
                        <div class="error">{{getError('SortNumber')}}</div>
                    </div>

                    <div style="margin-bottom:10px" v-for="column in displayValueColumns">
                        <div>
                            <div>{{column.lng.LCID+': '+t(column.lng.LanguageName_English)+','+t(column.lng.RegionName_English)}}</div>
                            <div>{{column.lng.LanguageName_Native+','+column.lng.RegionName_Native}}</div>
                        </div>
                        <div v-for='SeqNo in column.SeqNos'>
                            <div>{{SeqNo}}</div>
                            <TextBox :multiline=true v-model="model[column.lng.LCID+'-'+SeqNo]" 
                                style="height:60px;width:450px"
                                :inputStyle='{"white-space":"nowrap"}'></TextBox>
                        </div>
                    </div>
                </Form>
            </div>
            <div class="dialog-button">
                <LinkButton @click="saveRow()">Save</LinkButton>
                <LinkButton @click="$refs.dlg.close()">Cancel</LinkButton>
            </div>
        </Dialog>
    `
}
export default Com_EditRow;
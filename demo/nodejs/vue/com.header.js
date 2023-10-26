import AcroML from 'acroml';
let Com_Header= {
  components: {
    AcroMLVueSelector:AcroML.VueSelector
  },
  template:`
    <div :style="{'text-align':'right'}">
      <AcroMLVueSelector/>
    </div>
  `
}
export default Com_Header;

import {h,ref} from 'vue';

let timerID=0;
let times=ref(0);
export default function(props, { slots, emit, attrs }){
  console.log('function component',props);
  if (timerID==0){
    timerID=setInterval(function(){
      times.value++;
      console.log(times.value);
    }, 1000);
    console.log('create Timer:',timerID);
  }
  function onClick(){
    console.log('onClick');
    clearInterval(timerID);
  }
  let s=h('span',times.value);
  let b=h('button', {
    innerHTML:t('Click me'),
    onClick:onClick
  });
  return h('div',[b,s]);
}
<script setup>
  import { ref,reactive,shallowReactive } from 'vue';
  const data=reactive([]);
  let ddFiles=['/dd/Unicode.plaintable.json','/dd/Unicode.treegrid.json','/dd/Unicode.csv.txt','/dd/Unicode.lng'];
  for(let i=0;i<ddFiles.length;i++){
    let ddFile=ddFiles[i];
    let t0=new Date().getTime();
    let info=reactive({file:ddFile});
    data.push(info);
    AcroML.Engine.instance.readDD(ddFile).then(function(content){
      let t1=new Date().getTime();
      //没有异步闭包问题
      //console.log(ddFile,content);
      if (content.buf){
        info.rawSize=content.buf.byteLength;
      }
      info.strLen=content.str.length;
      info.loadTime=t1-t0;
      let dd=AcroML.Engine.buildDD(ddFile,content.str);
      let t2=new Date().getTime();
      info.buildTime=t2-t1;
      info.totalTime=t2-t0;
      //console.log(info);
      let count=0;
      for(let key in dd.DD) count++;
      info.itemCount=count;
    });
  }
</script>

<template>
  <span>Compare different format DD file loading and building efficient</span>
  <DataGrid :data="data" idField='file'>
    <GridColumnGroup>
          <GridHeaderRow>
            <GridColumn field="file" title="file" :sortable=true width="260"></GridColumn>
            <GridColumn field="rawSize" title="raw size(bytes)" :sortable=true align="right"></GridColumn>
            <GridColumn field="strLen" title="str length(pcs)" :sortable=true align="right"></GridColumn>
            <GridColumn field="itemCount" title="displayValue count(pcs)" :sortable=true align="right"></GridColumn>
            <GridColumn field="loadTime" title="load time(ms)" :sortable=true align="right"></GridColumn>
            <GridColumn field="buildTime" title="build time(ms)" :sortable=true align="right"></GridColumn>
            <GridColumn field="totalTime" title="total time(ms)" :sortable=true align="right"></GridColumn>
          </GridHeaderRow>
    </GridColumnGroup>
  </DataGrid>
</template>
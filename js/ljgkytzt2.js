window.onload=function () {
  if(typeof(FileReader)=="undefined")
  {
    alert("你的浏览器不支持文件读取");
    document.write("");
  }
  /*else
  {
    alert("你的浏览器支持文件读取");
  }*/
}
function readText(zj) {
  var bh=zj.substring(2);
  var file=document.getElementById("file"+bh).files[0];
  if(file==null){
    return;
  }
  var reader=new FileReader();
  reader.readAsText(file);
  reader.onload=function(data)
  {
    var tt=document.getElementById("tt"+bh);
    var txt=this.result;
    txt=txt.replace(/</g,"&lt;");
    txt=txt.replace(/hchh/g,"<br>");//要求原文本文件中要换行的地方，使用“hchh”——四个字母表示回车换行
    var eachTm=new Array();
    eachTm=txt.split("====\r\n");
    var eachLine="";
    var qType="radio";
    var tmOrder=0;
    for(var i=0;i<eachTm.length;i++){
      var hzm=bh+"r"+i+"t"; //后缀名：任务编号——bh，r——任务;i——题号，t——题目
      var eachItem=new Array();
      eachItem=eachTm[i].split("\r\n");
      //document.write(qType);
      for(var j=0;j<eachItem.length;j++){
        eachItem[j]=eachItem[j].substring(4);
      }
      if(eachItem[6]==zj){
        var tmp1=(++tmOrder)+". "+"(";
        var tmp2=eachItem[7];
        tmp1+="20"+tmp2.substring(0,2)+"年"+tmp2.substring(2)+"题)";
        if(eachItem[5]=="A" || eachItem[5]=="B" || eachItem[5]=="C" || eachItem[5]=="D"){
          qType="radio";
        }else if(eachItem[5]=="√" || eachItem[5]=="×"){
          qType="radio";
          eachItem[1]="正确";
          eachItem[2]="错误";
        }else if(eachItem[1]!=""){
          qType="checkbox";
        }else{
          qType="text";
        }
        for(var j=0;j<eachItem.length;j++){
          if(j==5){
            if(eachItem[5]!="")eachLine+="<label id='daLab"+hzm+"' style='display:none'>参考答案：</label><span id='ckda"+hzm+"' style='display:none'>"+eachItem[5]+"</span><span id='jud"+hzm+"' style='display:none'>（）</span><br /><br />";
            break;
          }
          if(eachItem[0]!=""){
            var tmStr=eachItem[0]; //方便题目从一对圆括号和分隔，没有的，则在最后加一对括号。
            var leftKh=tmStr.indexOf("（ ");
            if(leftKh==-1)leftKh=tmStr.indexOf("( ");
            var rightKh=tmStr.indexOf(" ）");
            if(rightKh==-1)rightKh=tmStr.indexOf(" )");
            var newStr; //在括号中加入<span>
            if(leftKh>=0 && rightKh>=0 && qType!="text"){
              newStr=tmStr.substring(0,leftKh+1)+" <span id='yourDa"+hzm+"' style='color:grey;'>请选择</span> "+tmStr.substring(rightKh);
            }else if(leftKh==-1 && rightKh==-1 && qType!="text"){
              newStr=tmStr+"（ <span id='yourDa"+hzm+"' style='color:grey;'>请选择</span> ）"
            }else{
              var unLin=tmStr.indexOf("___");              
              var unLin2=tmStr.lastIndexOf("___");
              tmStr=tmStr.substring(0,unLin)+"<span id='blank"+hzm+"' style='color:grey;'><u>&nbsp;&nbsp;请在下面文本框内填写答案&nbsp;&nbsp;</u></span>"+tmStr.substring(unLin2+3);
              newStr=tmStr;
            }          
            //alert(leftKh+", "+rightKh);
            var leftDkh=newStr.indexOf("{{{");
            if(leftDkh>=0){
              var rightDkh=newStr.indexOf("}}}");
              newStr=newStr.substring(0,leftDkh)+"<img src='images/"+newStr.substring(leftDkh+3,rightDkh)+"' />"+newStr.substring(rightDkh+3);
            }
            eachItem[0]=tmp1+newStr;
          }
          if(j!=0){
            if(eachItem[0]!=""){
              if(eachItem[j]!=""){
                var inThreeDChL=eachItem[j].indexOf("{{{");
                if(inThreeDChL<0){
                  eachItem[j]="<input type='"+qType+"' id='bxx"+hzm+j+"' name='bxx"+hzm+"' value='"+j+"' onclick=choosedOption('"+qType+"',"+bh+","+i+","+j+"); /><label for='bxx"+hzm+j+"'>"+String.fromCharCode(64+j)+". "+eachItem[j]+"</label>";
                }else{
                  var inThreeDCHR=eachItem[j].indexOf("}}}");
                  eachItem[j]="<input type='"+qType+"' id='bxx"+hzm+j+"' name='bxx"+hzm+"' value='"+j+"' onclick=choosedOption('"+qType+"',"+bh+","+i+","+j+"); /><label for='bxx"+hzm+j+"'>"+String.fromCharCode(64+j)+". "+eachItem[j].substring(0,inThreeDChL)+"<img src='images/"+eachItem[j].substring(inThreeDChL+3,inThreeDCHR)+"' />"+eachItem[j].substring(inThreeDCHR+3)+"</label>";
                }
              }
              if(qType=="text"){
                if(eachItem[0]!=""){
                  eachLine+="<input type='text' placeholder='请输入您的答案！' id='bxx"+hzm+j+"' name='bxx"+hzm+"' style='width:240px' onchange='writeBlank("+bh+","+i+","+j+");' /><br />";
                  eachLine+="<label id='daLab"+hzm+"' style='display:none'>参考答案：</label><span id='ckda"+hzm+"' style='display:none'>"+eachItem[5]+"</span><span id='jud"+hzm+"' style='display:none'>（）</span><br /><br />";
                }
                break;
              }
            }
          }
          if(eachItem[j]!=""){
            eachLine+=eachItem[j]+"<br />";
          }
        }
        if(eachItem[0]==0)tmOrder--;
      }
    }
    if(eachLine!=""){
      tt.style.fontFamily="黑体";
      tt.style.backgroundColor="rgb(203,203,203)";
      tt.style.color="black";
      //tt.style.fontWeight="bold";
      tt.innerHTML=eachLine+"<input type='button' id='showDa"+bh+"' value='显示参考答案' onclick='showCkda("+bh+");' />";
    }else{
      var pxm=parseInt(zj.substring(0,1)); 
      tt.innerHTML="<p style='font-size:24px;color:blue;'>此“项目"+"一二三四五".substring(pxm-1,pxm)+" 任务"+zj.substring(2)+"”暂无高考样题和真题！</p>";
    }
  }
} 
function showCkda(rw){
  for(var i=0;i<1000;i++){
    var nhzm=rw+"r"+i+"t";
    var daLb=document.getElementById("daLab"+nhzm);
    var ckDa=document.getElementById("ckda"+nhzm);
    var bnDa=document.getElementById("showDa"+rw);
    var judT=document.getElementById("jud"+nhzm);
    var yrDa=document.getElementById("yourDa"+nhzm);
    if(daLb!=null && ckDa!=null){
      if(ckDa.style.display=="none"){
        daLb.style.display="inline";
        judT.style.display="inline";
        ckDa.style.display="inline";
        ckDa.style.fontWeight="bolder";
        ckDa.style.color="green";
        bnDa.value="隐藏参考答案";
        if(ckDa.innerText=="√" || ckDa.innerText=="×"){
          if(ckDa.innerText=="×"){
            ckDa.style.color="red";
            if(yrDa.innerText=="A"){
              judT.innerText="（您选错了！）";
              judT.style.color="red";
            }else if(yrDa.innerText=="B"){
              judT.innerText="（您选对了！）";
              judT.style.color="green";
            }else{
              judT.innerText="（您还没有做出选择！）";
              judT.style.color="#990099";
            }
          }else{
            ckDa.style.color="green";
            if(yrDa.innerText=="B"){
              judT.innerText="（您选错了！）";
              judT.style.color="red";
            }else if(yrDa.innerText=="A"){
              judT.innerText="（您选对了！）";
              judT.style.color="green";
            }else{
              judT.innerText="（您还没有做出选择！）";
              judT.style.color="#990099";
            }
          }
        }else{
          if(yrDa!=null){
            if(yrDa.innerText==ckDa.innerText){
              judT.innerText="（您选对了！）";
              judT.style.color="green";
            }else{
              if(yrDa.innerText=="请选择"){
                judT.innerText="（您还没有做出选择！）";
                judT.style.color="#990099";
              }else{
                judT.innerText="（您选错了！）";
                judT.style.color="red";
              }
            }
          }else{
            var textVal=document.getElementById("bxx"+nhzm+1).value;
            if(textVal==""){
              judT.innerText="（您还没有填写答案！）";
              judT.style.color="#990099";
            }else if(("|||"+ckDa.innerText.toUpperCase()+"|||").indexOf("|||"+textVal.toUpperCase()+"|||")>=0){
              //textVal==ckDa.innerText
              judT.innerText="（您填对了！）";
              judT.style.color="green";
            }else{
              judT.innerText="（您填错了！）";
              judT.style.color="red";
            }
          }
        }
      }else{
        daLb.style.display="none";
        ckDa.style.display="none";
        judT.style.display="none";
        bnDa.value="显示参考答案";
      }
    }
  }
}
function choosedOption(t,h,x,y){
  var bx="bxx"+h+"r"+x+"t";
  var yDa="yourDa"+h+"r"+x+"t";
  var selDa="";
  for(var i=1;i<5;i++){
    var rdOp=document.getElementById(bx+i);
    if(rdOp!=null){
      if(rdOp.checked){
        selDa+=String.fromCharCode(64+i);
      }
    }
  }
  var spanDa=document.getElementById(yDa);
  spanDa.style.color="blue";
  spanDa.innerHTML=selDa;
}
function writeBlank(h,i,j){
  var tTxt=document.getElementById("bxx"+h+"r"+i+"t"+j);
  var blankDa=document.getElementById("blank"+h+"r"+i+"t");
  blankDa.innerHTML="<u style='color:blue;'>&nbsp;&nbsp;"+tTxt.value.replace("<","&lt;")+"&nbsp;&nbsp;</u>";
}
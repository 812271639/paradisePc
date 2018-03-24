 var tag=1;
    function sortNumberAS(a, b)
    {
        return a - b
    }
    function sortNumberDesc(a, b)
    {
        return b-a
    }

    function SortTable(obj){
        var td0s=document.getElementsByName("td0");
        var td1s=document.getElementsByName("td1");
        var td2s=document.getElementsByName("td2");
        var td3s=document.getElementsByName("td3");

        var td4s=document.getElementsByName("td4");
        var td5s=document.getElementsByName("td5");
        var td6s=document.getElementsByName("td6");
        var td7s=document.getElementsByName("td7");
        var td8s=document.getElementsByName("td8");
        var tdArray0=[];
        var tdArray1=[];
        var tdArray2=[];
        var tdArray3=[];

        var tdArray4=[];
        var tdArray5=[];
        var tdArray6=[];
        var tdArray7=[];
        var tdArray8=[];
        for(var i=0;i<td0s.length;i++){
            tdArray0.push(td0s[i].innerHTML);
        }
        for(var i=0;i<td1s.length;i++){
            tdArray1.push(td1s[i].innerHTML);
        }
        for(var i=0;i<td2s.length;i++){
            tdArray2.push(td2s[i].innerHTML);
        }

        for(var i=0;i<td3s.length;i++){
            if (typeof(td3s[i].innerHTML)=='string') {
                tdArray3.push(td3s[i].innerHTML);
            }else{
                tdArray3.push(parseInt(td3s[i].innerHTML));
            }

        }

        for(var i=0;i<td4s.length;i++){
            tdArray4.push(td4s[i].innerHTML);
        }
        for(var i=0;i<td5s.length;i++){
            tdArray5.push(td5s[i].innerHTML);
        }
        for(var i=0;i<td6s.length;i++){
            tdArray6.push(td6s[i].innerHTML);
        }


        for(var i=0;i<td7s.length;i++){
            if (typeof(td7s[i].innerHTML)=='string') {
                tdArray7.push(td7s[i].innerHTML);
            }else{
                tdArray7.push(parseInt(td7s[i].innerHTML));
            }

        }


        for(var i=0;i<td8s.length;i++){
            // tdArray8.push(parseInt(td8s[i].innerHTML));
            if (typeof(td8s[i].innerHTML)=='string') {
                tdArray8.push(td8s[i].innerHTML);
            }else{
                tdArray8.push(parseInt(td8s[i].innerHTML));
            }
        }



//等等
        var tds=document.getElementsByName("td"+obj.id.substr(2,1));
        var columnArray=[];
        for(var i=0;i<tds.length;i++){
            columnArray.push(parseInt(tds[i].innerHTML));
        }
        var orginArray=[];
        for(var i=0;i<columnArray.length;i++){
            orginArray.push(columnArray[i]);
        }
        if(obj.className=="as"){
            columnArray.sort(sortNumberAS);               //排序后的新值
            obj.className="desc";
        }else{
            columnArray.sort(sortNumberDesc);               //排序后的新值
            obj.className="as";
        }


        for(var i=0;i<columnArray.length;i++){
            for(var j=0;j<orginArray.length;j++){
                if(orginArray[j]==columnArray[i]){
                    document.getElementsByName("td0")[i].innerHTML=tdArray0[j];
                    document.getElementsByName("td1")[i].innerHTML=tdArray1[j];
                    document.getElementsByName("td2")[i].innerHTML=tdArray2[j];
                    document.getElementsByName("td3")[i].innerHTML=tdArray3[j];
                 try{
                    document.getElementsByName("td4")[i].innerHTML=tdArray4[j];
                    document.getElementsByName("td5")[i].innerHTML=tdArray5[j];
                    document.getElementsByName("td6")[i].innerHTML=tdArray6[j];
                    document.getElementsByName("td7")[i].innerHTML=tdArray7[j];
                    document.getElementsByName("td8")[i].innerHTML=tdArray8[j];
                     }
                     catch(e){}


                    orginArray[j]=null;
                    break;
                }
            }
        }
    }
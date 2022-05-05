
let data;
let tempData;
let singlePageData;
let currentPage;
// 往上鍵
const btnTop = document.querySelector('#goTop');
// Data
const xhr=new XMLHttpRequest();

// 熱門
const hotArea=document.querySelector('.hot-item');
//選區
const selectArea=document.querySelector('.search .area');
// 顯示
const viewContentTitle=document.querySelector('.viewContent h3');
const viewContentList=document.querySelector('.viewContent ul');

// 換頁
const pageBtn=document.querySelector('.pageSelect ul');

const down = document.querySelector('#down')

xhr.open("get","https://raw.githubusercontent.com/hexschool/KCGTravel/master/datastore_search.json",true);
xhr.send(null);
xhr.onload= function(){
    data = JSON.parse(xhr.responseText).result.records;
    setAreaList();
    setPageBtn();
    setListContent();
}
// console.log(xhr)

selectArea.addEventListener('change',setViewContentList);
hotArea.addEventListener('click',gethotArea);


pageBtn.addEventListener('click',setTempList);

window.addEventListener('scroll', btnReveal);
btnTop.addEventListener('click', topscrollTo);

down.addEventListener('click',downscrollTo)


//回到上放按鈕
function btnReveal(){

    if (window.scrollY <= 300) {
        
        btnTop.classList.add('d-none');
      } else {
        btnTop.classList.remove('d-none');
      } 
  };
  
  function topscrollTo() {
    window.scrollTo({ 
      top: 0, 
      behavior: "smooth" 
    });
  
    }
    //  function downscrollTo() {
    //     //  alert('2')
    // window.moveTo({ 
    //   top:100, 
    //   behavior: "smooth" 
    // });
  
    // }

//讀取所有行政區名稱
function setAreaList(){
    let areaList=[];
    let selectStr=`<option value="all" selected disabled>--請選擇行政區--</option>`;
  
    for(let i=0;i<data.length;i++){
          if(areaList.indexOf(data[i].Zone)===-1){
            areaList.push(data[i].Zone);
          }
      }
    for(let i=0;i<areaList.length;i++){
      selectStr+=`<option>${areaList[i]}</option>`
    };
    selectArea.innerHTML=selectStr;
};


//點行政區 呈現景點列表
function setViewContentList(event){
    pageBtn.innerHTML="";
    let selectedArea=event.target.value;
    viewContentTitle.innerHTML=selectedArea;
    
    setListContent(selectedArea);
}

//點擊熱門行政區 呈現景點列表
function gethotArea(event){
    pageBtn.innerHTML="";
    console.log(event)
    if(String(event.path[0]).includes('a')){
        let selectedArea=event.target.innerHTML;
        viewContentTitle.innerHTML=selectedArea;
        selectArea.value=selectedArea;
        setListContent(selectedArea);
    }
    
  }



  //呈現景點列表
function setListContent(area="all"){
  
    let listAry=[];
    let listStr='';

    if(area==="all"){
      for(let i=0;i<tempData.length;i++){
        listAry.push(tempData[i]);
      }
    }

    else{
      for(let i=0;i<data.length;i++){
        if(data[i].Zone===area){
          listAry.push(data[i]);
        }
      }
    };

    for(let i=0;i<listAry.length;i++){
      let {Picture1,Name,Zone,Opentime,Add,Tel,Ticketinfo}=listAry[i];
      listStr+=`<li>
        <div class="list_header" style="background-image:url(${Picture1})">
          <h4>${Name}</h4>
          <h5>${Zone}</h5>
        </div>
        <ul class="list_body">
          <li class="openTime"><i class="far fa-clock mr"></i>${Opentime}</li>
          <li class="add"><i class="fas fa-map-marker-alt mr"></i>${Add}</li>
          <li class="tel"><a href="tel:${Tel}"><i class="fas fa-mobile-alt mr"></i>${Tel}</a></li>
        </ul>
        <span class="list_tag"><i class="fas fa-tag mr"></i>${Ticketinfo}</span>
      </li>`
    };
  
    viewContentList.innerHTML=listStr;
}

// 換頁條列
function setPageBtn(){
    let pageAmount;
    currentPage=1;
    singlePageData=6;
    pageAmount=parseInt(data.length/singlePageData)+1;
    let str=`<li><a href="#" class="active">1</a></li>`;
    for(let i=1;i<pageAmount;i++){
      str+=`<li><a href="#" >${i+1}</a></li>`
    }
    pageBtn.innerHTML=str;
  
    tempData=[];
    for(let i=0;i<6;i++){
      tempData.push(data[i]);   
    }
  
  }
  

  // 
  function setTempList(e){
    e.preventDefault();
    tempData=[];
    if(e.target.nodeName!=="A"){return};

    let temp=singlePageData*(e.target.textContent-1);
  
    for(let i=0;i<6;i++){ 
      if (temp+i<data.length){
        tempData.push(data[temp+i]);  
      } 
    }
    e.target.classList.add("active");
    setListContent();
  
   let siblings = []; 
  
   let sibling  = e.target.parentNode.parentNode.firstChild.firstChild;
   
  
   while (sibling) {
       if (sibling.nodeType === 1 && sibling !== e.target) {
            sibling.classList.remove("active");
       }
       if(!sibling.parentNode.nextSibling){
        break;
       }
       sibling = sibling.parentNode.nextSibling.firstChild;
      
   }
   
  }






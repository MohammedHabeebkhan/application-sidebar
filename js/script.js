// -     

function openNav() {
    document.getElementById("mySidenav").style.width = "280px";
    document.getElementById("main").style.marginLeft = "250px";
    document.getElementById("searchbarMargin").style.paddingRight = "700px";
    document.getElementById("openbtn").style.display = "none";
    document.getElementById("closebtn").style.display = "block";
    document.getElementsByClassName("sideNav-heading")[0].style.display = "block";
    document.getElementsByClassName("sidenavLinks")[1].style.display = "block";
    document.getElementById("nav-heading").style.height = "20px";

    var temp = document.querySelectorAll(".sideNav-horizontalBar");

    for (var i = 0; i < temp.length; i++) {
        temp[i].style.marginLeft = "30px";
    }

}

function closeNav() {
    document.getElementById("mySidenav").style.width = "70px";
    document.getElementById("main").style.marginLeft = "70px";
    document.getElementById("searchbarMargin").style.paddingRight = "700px";
    document.getElementById("openbtn").style.display = "block";
    document.getElementById("closebtn").style.display = "none";
    document.getElementsByClassName("sideNav-heading")[0].style.display = "none";
    document.getElementsByClassName("sidenavLinks")[1].style.display = "none";
    document.getElementById("nav-heading").style.height = "45px";

    var temp = document.querySelectorAll(".sideNav-horizontalBar");

    for (var i = 0; i < temp.length; i++) {
        temp[i].style.marginLeft = "0px";
    }


}



// const URL = 'http://localhost:8000/songs'
// let newObj;
// let concat="";

// function main(input) {
//     fetch(URL).then(function (response) {
//             const data = response.json();
//             return data;
//         })
//         .then(function (songsDetails) {
//             let placeholder = document.querySelector("#data-output");
//             let out = "";
//             var filterArray = " ";

//                 if(input == "" || input == undefined){
//                     filterArray = songsDetails.filter(details => details)
//                 }else{            
//                     const searchInd =(songsDetails)=>{
//                     debugger;
//                             const attribute = Object.keys(songsDetails).map(e => songsDetails[e]).join(' ');
//                             songsDetails["searchIndex"]=attribute;
//                         return songsDetails;
//                     }


//                     filterArray= songsDetails.filter (obj => searchInd(obj).searchIndex.includes(input))
//                 }

//             for (let songsDetail of filterArray) {
//                 out += `
//         <tr class="card">
//         <td class="card-columns">${songsDetail.id}</td>
//         <td style="margin:10px 0px 0 0; border-radius:5px"><img src=${songsDetail.image}  style="border-radius:5px"></td>
//         <td class="card-columns" style="width:100px;">${songsDetail.songsInfo}</td>
//         <td class="card-columns" style="width:250px; margin-left:25px;" >${songsDetail.albumName}</td>
//         <td class="card-columns" style="margin-left:25px;">${songsDetail.lastPlayed}</td>
//         <td class="card-columns" style="margin-left:25px;">${songsDetail.ofStreams}</td>
//         </tr>
//         `;
//             }
//             placeholder.innerHTML = out;
//         })

// }




const URL = 'http://localhost:8000/songs'

let dataList = [];

loadList();

function loadList() {
    fetch(URL).then((response) => {
        return response.json()
    })
        .then((myJson) => {
            // console.log(myJson);
            dataList = myJson;
            // console.log(dataList)
            createSearchIndex();
            renderHTML(dataList);
        });
}



function renderHTML(list) {

    let placeholder = document.querySelector("#data-output");
    let out = "";

    for (let songsDetail of list) {
        out += `
        <tr class="card">
        <td class="card-columns firstCol">${songsDetail.id}</td>
        <td class="cardImg"><img src=${songsDetail.image}  style="border-radius:5px;"></td>
        <td class="card-columns songDetails" style="">${songsDetail.songsInfo}</td>
        <td class="card-columns albName" style="width:250px; margin-left:25px;" >${songsDetail.albumName}</td>
        <td class="card-columns" style="margin-left:25px;">${songsDetail.lastPlayed}</td>
        <td class="card-columns lastCol" style="margin-left:25px;">${songsDetail.ofStreams}</td>
        </tr>
        `;
    }
    placeholder.innerHTML = out;
}

function createSearchIndex() {
    // console.log(dataList);
    // const searchInd =(dataList)=>{
    // debugger;
    let concat = "";
    dataList.map(test => {
        const attributes = Object.keys(test);
        for (let i = 0; i < attributes.length; i++) {
            concat += test[attributes[i]] + " ";
        }
        test["searchIndex"] = concat;
        concat = " "
        console.log(dataList)
        return dataList;
    })
    // }


    //index creation logic

    //for(dataList)

    //concatication

    //add searchIndex to object


    /**
     * [{
     *  firstName:"Abdul"
     *  firstName:"Abdul1"
     *  firstName:"Abdul2"
     *  searchIndex: "Abdul Abdul1 Abdul2"
     * }]
     */
}


function mySearch() {
    let input = document.getElementById("searchBox").value;
    // console.log("Hey SearchText" + input)
    //let filteredData = filter the dataList object using searchText

    let filteredData = dataList.filter(obj => obj.searchIndex.includes(input))

    renderHTML(filteredData);
}


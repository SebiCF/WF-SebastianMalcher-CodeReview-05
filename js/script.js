initPage();

function initPage(){
    createUserProfiles()
}


function createUserProfiles(){

    for(i=0;i<user_data.length;i++)
        {


            if(i%4==0){
                let row = $("<div></div>").addClass("row m-0 p-0");
                $("content").append(row);
            }

            
            let profile = $(`<div></div>`).addClass("col p-0 mx-2 my-5 bg-dark border-top border-dark rounded-top").html(`<img style="width:90%; height:100%;"
            class="mx-auto d-block bg-dark" src='${user_data[i].image}'><div class="border border-dark rounded-bottom" id="userDesc">${user_data[i].quote}</div>`).css("height","150px");
            $("content>.row:last-child").append(profile);
            // if(i%4 == 0){
            //     let lgScreenBreak = $("<div></div>").addClass('w-100 d-none d-lg-block');
            //     $(`content>div:nth-child(${i})`).after(lgScreenBreak);
            // }
        }
}
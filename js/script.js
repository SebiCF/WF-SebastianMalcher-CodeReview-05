initPage();

function initPage() {
    createUserProfiles()
}


function createUserProfiles() {

    for (i = 0; i < user_data.length; i++) {
        if (i % 4 == 0) {
            let row = $("<div></div>").addClass("row mb-5 mt-3 p-0");
            $("content").append(row);
        }

        let profile = $(`<div></div>`).addClass("col p-0 mx-3 mb-4 rounded-top").html(`<span class="fas fa-heart"></span><img style="width:90%; height:100%;"
            class="mx-auto d-block bg-dark" src='${user_data[i].image}'><div class="rounded-bottom" id="userDesc">${user_data[i].quote}</div>`).css("height", "150px");
        $("content>.row:last-child").append(profile);
        // if(i%4 == 0){
        //     let lgScreenBreak = $("<div></div>").addClass('w-100 d-none d-lg-block');
        //     $(`content>div:nth-child(${i})`).after(lgScreenBreak);
        // }
    }
}

//pdorner github
let pageNumber = 8; /*sets default page to first 8 user profiles*/
initPage(pageNumber);

function initPage(pageNumber) {
    paginationUserProfiles(pageNumber);
    createUserProfiles(pageNumber)
}

function paginationUserProfiles(pageNumber) {
    $(".pagination").html(" "); /*resets buttons*/
    let numberOfNextPageBtns = Math.ceil((user_data.length) / 8); /*checks how many pageBtns need to be created*/
    if (user_data.length < 8) {
        numberOfNextPageBtns = 1;
    }

    for (i = 0; i < numberOfNextPageBtns; i++) {
        /* creates nextMoviePageButton*/
        let nextUserDataPageBtn = document.createElement("div");
        nextUserDataPageBtn.className = "lead border border-dark rounded-sm px-2 my-1 nextUserDataPageBtn" + i;
        nextUserDataPageBtn.id = `pageNumberBtn${i}`;
        nextUserDataPageBtn.innerHTML = `${i + 1}`;
        $(".pagination").append(nextUserDataPageBtn);
        nextUserDataPageBtn.addEventListener("click", function (e) {
            $("content").html(" "); /* resets already created profiles*/
            pageNumber = parseInt(e.target.innerHTML) * 8;
            createUserProfiles(pageNumber);
            resetPageNumberXColor();
            e.target.style.color = "#5591ff";
            e.target.style.textDecorationColor = "#5591ff";
            e.target.style.textDecoration = "underline";
        })
    }
}

function resetPageNumberXColor() {
    let allPageNumberXColor = document.querySelectorAll("[id^=pageNumberBtn]");
    for (i = 0; i < allPageNumberXColor.length; i++) {
        allPageNumberXColor[i].style.color = "black";
        allPageNumberXColor[i].style.textDecorationColor = "black";
        allPageNumberXColor[i].style.textDecoration = "none";
    }
}

function createUserProfiles(pageNumber) {
    let firstProfile = pageNumber - 8
    for (i = firstProfile; i < pageNumber; i++) {

        if (i == user_data.length || user_data.length === undefined) {
            /* breaks loop if no movies are left*/
            break;
        }
        if (i % 4 == 0) {
            let row = $("<div></div>").addClass("row mb-5 mt-1 p-0");
            $("content").append(row);
        }

        let profile = $(`<div></div>`).addClass("col p-0 mx-3 mb-4 rounded-top").html(`<span class="fas fa-heart"></span><img style="width:90%; height:100%;"
            class="mx-auto d-block bg-dark" src='${user_data[i].image}'><div class="rounded-bottom" id="userDesc">${user_data[i].quote}</div>`).css({
            'height': '150px',
            'background-color': ``
        });
        $("content>.row:last-child").append(profile);
        // if(i%4 == 0){
        //     let lgScreenBreak = $("<div></div>").addClass('w-100 d-none d-lg-block');
        //     $(`content>div:nth-child(${i})`).after(lgScreenBreak);
        // }
    }
}
//pdorner github change div background gender dependant
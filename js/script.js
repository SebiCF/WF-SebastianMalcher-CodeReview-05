let pageNumber = 8; /*sets default page to first 8 user profiles*/
let user_data = user_data_file;
let user_dataFavorites = [];
let contentNumber = "first";

initPage(pageNumber, user_data), user_dataFavorites;

function initPage(pageNumber, user_data) {
    pagination(pageNumber, user_data, contentNumber);
    createUserProfiles(pageNumber, user_data, user_dataFavorites)
}

function pagination(pageNumber, user_data, contentNumber) {
    console.log(contentNumber)
    $("main>.pagination:" + contentNumber).html(" ");
    let entrysPerPage = (contentNumber == "first") ? 8 : 2;
    let numberOfNextPageBtns = Math.ceil((user_data.length) / entrysPerPage); /*checks how many pageBtns need to be created*/
    if (user_data.length < entrysPerPage) {
        numberOfNextPageBtns = 1;
    }
    for (i = 0; i < numberOfNextPageBtns; i++) {
        /* creates nextMoviePageButton*/
        let nextUserDataPageBtn = document.createElement("div");
        nextUserDataPageBtn.className = "lead border border-dark rounded-sm px-2 my-1 nextUserDataPageBtn" + i;
        nextUserDataPageBtn.innerHTML = `${i + 1}`;
        if (contentNumber == "last") {
            nextUserDataPageBtn.id = "btnDown" + i;
        }

        $("main>.pagination:" + contentNumber).append(nextUserDataPageBtn);

        nextUserDataPageBtn.addEventListener("click", function (e) {
            /*adds next page event*/
            let currentBtnBlue = parseInt(e.target.innerHTML);
            $("content:" + contentNumber).html(" ");
            if (contentNumber == "first") {
                pageNumber = parseInt(e.target.innerHTML) * 8;
                createUserProfiles(pageNumber, user_data, user_dataFavorites);
            } else if (contentNumber == "last") {
                pageNumber = parseInt(e.target.innerHTML) * 2;
                createFavorites(pageNumber, user_dataFavorites)
            }
            pagination(pageNumber, user_data, contentNumber);
            resetPageNumberXColor(contentNumber);
            colorizeCurrentPageBtn(pageNumber, contentNumber)
        })
    }
    if (document.querySelector(".sortDiv")) {
        document.querySelector(".sortDiv").remove();
    }

    let sortBtns = $(`<div></div>`).addClass("sortDiv text-center p-2").html('<span id="sortBtnAgeAsc">▲</span><span id="sortBtnAgeDesc">▼</span><span>By Age</span><span id="sortBtnGenderAsc">▲</span><span id="sortBtnGenderDesc">▼</span><span>By Gender</span>');
    $("main>.pagination:" + "first").before(sortBtns);
    colorizeCurrentPageBtn(pageNumber, contentNumber);
    document.getElementById("sortBtnGenderAsc").addEventListener("click", function (e) {
        /*adds sort event*/
        sortByGenderAsc(user_data, pageNumber, "first")
    })
    document.getElementById("sortBtnGenderDesc").addEventListener("click", function (e) {
        sortByGenderDesc(user_data, pageNumber, "first")
    })
    document.getElementById("sortBtnAgeAsc").addEventListener("click", function (e) {
        sortByGenderAsc(user_data, pageNumber, "first")
    })
    document.getElementById("sortBtnAgeDesc").addEventListener("click", function (e) {
        sortByGenderDesc(user_data, pageNumber, "first")
    })
}

function resetPageNumberXColor(contentNumber) {
    let allPageNumberXColor = $(`main>.pagination:${contentNumber} div`);
    for (i = 0; i < allPageNumberXColor.length; i++) {
        allPageNumberXColor[i].style.color = "black";
        allPageNumberXColor[i].style.textDecorationColor = "black";
        allPageNumberXColor[i].style.textDecoration = "none";
    }
}

function colorizeCurrentPageBtn(pageNumber, contentNumber) {
    let curBtn = (contentNumber == "first") ? pageNumber / 8 - 1 : Math.ceil(pageNumber / 2 - 1);
    if (contentNumber == "first") {
        let btn = document.querySelector(`div[class~=nextUserDataPageBtn${curBtn}]`)
        btn.style.color = "#5591ff";
        btn.style.textDecorationColor = "#5591ff";
        btn.style.textDecoration = "underline";
    } else if (contentNumber == "last") {
        let btn = document.querySelector(`div[id~=btnDown${curBtn}]`)
        btn.style.color = "#5591ff";
        btn.style.textDecorationColor = "#5591ff";
        btn.style.textDecoration = "underline";
    }
}

function createUserProfiles(pageNumber, user_data, user_dataFavorites) {
    if (user_data.length + 8 == pageNumber) {
        pageNumber = pageNumber - 8;
    }
    let firstProfile = pageNumber - 8
    for (i = firstProfile; i < pageNumber; i++) {

        if (i == user_data.length /* || !user_data[i] */ ) {
            /* breaks loop if no movies are left*/
            break;
        }
        if (i % 4 == 0) {
            let row = $("<div></div>").addClass("row mb-4 p-0").sortable();
            $("content:first").append(row).sortable();
        }

        let profile = $(`<div></div>`).addClass("col-md col-sm-8 p-0 mb-lg-5 mx-md-2 mx-auto my-5 rounded-top").html(`<span data-profileCount="${i}" class="fas fa-heart favoriteBtn"></span><img style="width:90%; height:100%;"
            class="mx-auto d-block bg-dark" src='${user_data[i].image}'><div class="rounded-bottom" id="userDesc">${user_data[i].quote}</div>`).css({
            'height': '150px',
            'width': '280px',
            'background-color': ``
        });
        $("content:first>.row:last-child").append(profile);

        if (i % 2 == 0) {
            let lgScreenBreak = $("<div></div>").addClass('w-100 d-lg-none d-md-block'); /*adds mobile breaks*/
            $(`content:first>.row:last-child>div:last-child`).before(lgScreenBreak);
        }
        if (i % 1 == 0) {
            let lgScreenBreak = $("<div></div>").addClass('w-100 d-md-none d-block');
            $(`content:first>.row:last-child>div:last-child`).before(lgScreenBreak);
        }
    }
    $("content:first").sortable();
    console.log($("content:first>.row:last>.col-sm-8").length)
    if ($("content:first>.row:last>.col-sm-8").length < 4) {
        $("content:first>.row:last>.col-sm-8").addClass("col-md-5 col-lg-3 mx-md-auto")
    }
   
    document.querySelectorAll(".favoriteBtn").forEach(function (elem) {
        
        elem.addEventListener("mouseover", function (e) {
            e.target.style.transform = "rotate3d(0,0,0,360deg)";
        });
        
        elem.addEventListener("click", function (e) {
            /*adds favorite event*/
            document.querySelector(".favorites").style.display = "inline";
            user_data[e.target.dataset.profilecount].likeProgress = parseInt(user_data[e.target.dataset.profilecount].likeProgress) + 1;
            user_dataFavorites.push(user_data[e.target.dataset.profilecount]);
            let userNumber = e.target.dataset.profilecount;
            document.querySelectorAll("content").forEach(function (elem) {
                elem.innerHTML = " ";
            });

            user_data.splice(userNumber, 1);
            if (user_data.length + 8 == pageNumber) {
                pageNumber = pageNumber - 8;
            }

            pagination(pageNumber, user_data, "first");

            let pageNumberFavorites = user_dataFavorites.length;
            if (document.querySelector(`div[class~=nextUserDataPageBtn${pageNumber/8-1}]`)) {
                colorizeCurrentPageBtn(pageNumber, "first")
                createUserProfiles(pageNumber, user_data, user_dataFavorites);
                createFavorites(pageNumberFavorites, user_dataFavorites);
                colorizeCurrentPageBtn((pageNumberFavorites < 2) ? 2 : pageNumberFavorites, "last")
            } else {
                pageNumber = pageNumber - 8;
                pagination(pageNumber, user_data, contentNumber);
                colorizeCurrentPageBtn(pageNumber, "first");
                createUserProfiles(pageNumber, user_data, user_dataFavorites);
                createFavorites(pageNumberFavorites, user_dataFavorites);
                colorizeCurrentPageBtn((pageNumberFavorites < 2) ? 2 : pageNumberFavorites, "last")
            }
        })
    })
}

function createFavorites(pageNumberFavorites, user_dataFavorites) {
    let row = $("<div></div>").addClass("row mb-5 mt-1 p-0");
    $("#favorites").append(row);
    let firstProfile = (pageNumberFavorites % 2 == 0) ? pageNumberFavorites - 2 : pageNumberFavorites - 1;
    if (firstProfile < 0) {
        /*creates favorites*/
        pageNumberFavorites = 2;
        firstProfile = 0;
    }

    for (i = firstProfile; i < pageNumberFavorites; i++) {
        if (i == user_dataFavorites.length || user_dataFavorites.length === undefined) {
            /* breaks loop if no movies are left*/
            break;
        }

        let profile = $(`<div></div>`).addClass("col-lg-5 col-9 p-0 mx-auto mt-4 rounded-top favoriteDiv").html(`<span data-profileCount="${i}" class="fas fa-heart unfavoriteBtn" style="color:red;"></span><img style="width:90%; height:100%;"
        class="mx-auto d-block bg-dark" src='${user_dataFavorites[i].image}'><div style="height:140px" class="rounded-bottom mb-5" id="userDesc">Name: ${user_dataFavorites[i].name}&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbspAge: ${user_dataFavorites[i].age}&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbspProgress: <div style="float: right; width: 70px;border: 1px solid black;margin-left: -7%;"><div style="width: ${parseInt(user_dataFavorites[i].likeProgress)*10}%;background-color: green;justify-content: center;">${user_dataFavorites[i].likeProgress}</div></div><br>Hobbies:&nbsp&nbsp&nbsp${user_dataFavorites[i].hobbies}<br>${user_dataFavorites[i].quote}<br></div>`)
            .css({
                'height': '250px',
                'margin-bottom': '7.5em!important;',
                'color': 'black',
                'background-color': ``
            });
        $("#favorites>.row:last-child").append(profile);
    }
    paginationFavorites(pageNumberFavorites, user_dataFavorites);
    document.querySelectorAll(".unfavoriteBtn").forEach(function (elem) {
        /*adds unfavorite event*/
        elem.addEventListener("click", function (e) {
            console.log(e.target.dataset.profilecount);
            user_data.push(user_dataFavorites[e.target.dataset.profilecount]);
            let userNumber = e.target.dataset.profilecount;
            document.querySelectorAll("content").forEach(function (elem) {
                elem.innerHTML = " ";
            });

            user_dataFavorites.splice(userNumber, 1);
            if (user_data.length + 8 == pageNumber) {
                pageNumber = pageNumber - 8;
            }
            pagination(pageNumber, user_data, "first");
            let pageNumberFavorites = user_dataFavorites.length;
            if (document.querySelector(`div[class~=nextUserDataPageBtn${pageNumber/8-1}]`)) {
                colorizeCurrentPageBtn(pageNumber, "first")
                createUserProfiles(pageNumber, user_data, user_dataFavorites);
                createFavorites(pageNumberFavorites, user_dataFavorites);
                colorizeCurrentPageBtn((pageNumberFavorites < 2) ? 2 : pageNumberFavorites, "last")
            } else {
                pageNumber = pageNumber - 8;
                pagination(pageNumber, user_data, contentNumber);
                colorizeCurrentPageBtn(pageNumber, "first");
                createUserProfiles(pageNumber, user_data, user_dataFavorites);
                createFavorites(pageNumberFavorites, user_dataFavorites);
                colorizeCurrentPageBtn((pageNumberFavorites < 2) ? 2 : pageNumberFavorites, "last")
            }
            console.log(user_dataFavorites)
        })
    })
}

function paginationFavorites(pageNumberFavorites, user_dataFavorites) {
    contentNumber = "last";
    pagination(pageNumberFavorites, user_dataFavorites, contentNumber)
}

function sortByGenderAsc(user_data, pageNumber, contentNumber) {
    user_data.sort(function (a, b) {
        var genderA = a.gender.toLowerCase(),
            genderB = b.gender.toLowerCase();
        if (genderA < genderB)
            return -1;
        if (genderA > genderB)
            return 1;
        return 0;
    });

    $("content:" + contentNumber).html(" ");
    pagination(pageNumber, user_data, contentNumber);
    resetPageNumberXColor(contentNumber);
    colorizeCurrentPageBtn(pageNumber, contentNumber);
    createUserProfiles(pageNumber, user_data, user_dataFavorites);
}

function sortByGenderDesc(user_data, pageNumber, contentNumber) {
    user_data.sort(function (a, b) {
        var genderA = a.gender.toLowerCase(),
            genderB = b.gender.toLowerCase();
        if (genderA > genderB)
            return -1;
        if (genderA < genderB)
            return 1;
        return 0;
    });

    $("content:" + contentNumber).html(" ");
    pagination(pageNumber, user_data, contentNumber);
    resetPageNumberXColor(contentNumber);
    colorizeCurrentPageBtn(pageNumber, contentNumber);
    createUserProfiles(pageNumber, user_data, user_dataFavorites);
}

function sortByAgeDesc(user_data, pageNumber, contentNumber) {
    user_data.sort(function (a, b) {
        var ageA = a.age.toLowerCase(),
            ageB = b.age.toLowerCase();
        if (ageA < ageB)
            return -1;
        if (ageA > ageB)
            return 1;
        return 0;
    });

    $("content:" + contentNumber).html(" ");
    pagination(pageNumber, user_data, contentNumber);
    resetPageNumberXColor(contentNumber);
    colorizeCurrentPageBtn(pageNumber, contentNumber);
    createUserProfiles(pageNumber, user_data, user_dataFavorites);
}

function sortByAgeDesc(user_data, pageNumber, contentNumber) {
    user_data.sort(function (a, b) {
        var ageA = a.age.toLowerCase(),
            ageB = b.age.toLowerCase();
        if (ageA > ageB)
            return -1;
        if (ageA < ageB)
            return 1;
        return 0;
    });

    $("content:" + contentNumber).html(" ");
    pagination(pageNumber, user_data, contentNumber);
    resetPageNumberXColor(contentNumber);
    colorizeCurrentPageBtn(pageNumber, contentNumber);
    createUserProfiles(pageNumber, user_data, user_dataFavorites);
}

function increaseLike() {
    user_dataFavorites[i].likeProgress = parseInt(user_dataFavorites[i].likeProgress) + 1;
}

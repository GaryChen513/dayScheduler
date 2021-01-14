var hour;  
var timeDisplay;
var dictionary; // Map retrieved from localStorage

$("#currentDay").text(moment().format('MMMM Do YYYY, h:mm:ss a'));
hour= parseInt(moment().format("HH"));

$(document).ready(function(){
    setInterval(update, 1000);
    generateTimeBlock()
    renderTaskContent();
    displayBlockColor();
})

function generateTimeBlock(){
    $(".container").not(":first").remove();

    // generate time block from 10AM to 17PM 
    for (var i=1; i < 8; i++){
        let number = 10+i;
        let clone = $(".row:first").clone();
        if (number<12){
            clone.find("span").text(`${number}AM`);
        }else{
            clone.find("span").text(`${number}PM`);
        }
        clone.find("textarea").attr("id", number);
        $(".container").append(clone);
    }
}

function update(){
    timeDisplay = moment().format('MMMM Do YYYY, h:mm:ss a');
    $("#currentDay").text(timeDisplay);
}

function renderTaskContent(){
    dictionary = JSON.parse(localStorage.getItem("task")||"{}");

    if (Object.keys(dictionary).length === 0){
        $(".description").empty();
    }else{
        $("textarea").each(function(){
            let id = $(this).attr("id")
            if (dictionary[id]){
                $(this).text(dictionary[id]);
            }
        })
    };
}

function displayBlockColor(){
    $(".time-block").each(function(){
        var timeNum = parseInt($(this).find("textarea").attr("id"));
        var colorSettingTag = $(this).find("div");
        console.log(timeNum, hour);
        if (timeNum < hour){
            colorSettingTag.attr("class", "past");
        }else if(timeNum == hour){
            colorSettingTag.attr("class", "present");
        }else{
            colorSettingTag.attr("class", "future");
        }
    });
}

$(".container").on("click","i",function(){
    var timeBlockTag = $(this).closest(".icon").prev();
    var content = timeBlockTag.find("textarea").val();
    var id = timeBlockTag.find("textarea").attr("id");

    dictionary[id] = content;
    localStorage.setItem("task", JSON.stringify(dictionary));
})


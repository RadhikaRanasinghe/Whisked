var user_rating = ""
var correct_email = ""

const submitButton = document.getElementById("submitButton");
const name = document.getElementById('name');
const email = document.getElementById('email');
const comment = document.getElementById('comment');
const star1 = document.getElementById('star1');
const star2 = document.getElementById('star2');
const star3 = document.getElementById('star3');
const star4 = document.getElementById('star4');
const star5 = document.getElementById('star5');

submitButton.addEventListener('click', form_validation)

function successfulComment() {
    alert("\nThank you "+name.value+" for contacting us!"+"\n\nYour e-mail: "+email.value+"\n\nYour comment: "+comment.value+"\n\nYour rating: "+user_rating);
    resettingFields();

}
//form validation
function form_validation(){
    check_rating();
    ValidateEmail();
    if (name === "" || name == null){
        alert("Please insert your Name")
    }
    else if (email === "" || email == null){
        alert("Please insert your e-mail")
    }
    else if (correct_email === "no"){
        alert("You have entered an invalid email address!")
    }
    else if (comment === "" || comment == null){
        alert("Please type a comment")
    }
    else if (user_rating === "" || user_rating == null){
        alert("Please rate this page")
    }else{
        successfulComment();
    }
}
// checking rating
function check_rating(){
    if (document.getElementById("star1").checked){
        user_rating = "1 Star"
    }
    else if (document.getElementById("star2").checked){
        user_rating = "2 Stars"
    }
    else if (document.getElementById("star3").checked){
        user_rating = "3 Stars"
    }
    else if (document.getElementById("star4").checked){
        user_rating = "4 Stars"
    }
    else if (document.getElementById("star5").checked){
        user_rating = "5 Stars"
    }
}
//email validation
function ValidateEmail() {
    if ((/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/).test(email.value)){
        correct_email = "yes"
    }
    else{
        correct_email = "no"
    }
}
function resettingFields() {
    star1.checked = false;
    star2.checked = false;
    star3.checked = false;
    star4.checked = false;
    star5.checked = false;

    name.value = "";
    email.value = "";
    comment.value = "";
}
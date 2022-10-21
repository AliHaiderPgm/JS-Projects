// setting data to local storage
function submitForm(e) {
    let title = document.getElementById('title');
    let desc = document.getElementById('txtArea');
    console.log(title.value,desc.value);
    if(title.value==''){
        Swal.fire(
            'Inavlid Title!',
            'Please enter some title!',
            'error'
          )
    }
    else if(desc.value==''){
        Swal.fire(
            'Invalid Description!',
            'Please enter some description!',
            'error'
          )
    }
    else{
    let myCard = {
        cardTitle: title.value,
        cardDesc: desc.value,
    }
    let note = localStorage.getItem('Note');
    if (note == null) {
        noteObj = [];
    } else {
        noteObj = JSON.parse(note);
    }
    noteObj.push(myCard);
    localStorage.setItem('Note', JSON.stringify(noteObj));
    title.value = '';
    desc.value = '';
    
Swal.fire(
    'Task Added',
    'Successfully added task.',
    'success'
  )
}
}


// Clear All
let title = document.getElementById('title');
let desc = document.getElementById('txtArea');
function clear(){
    title.value = '';
    desc.value = '';
}
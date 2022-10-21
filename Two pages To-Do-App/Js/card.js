showNote()
// Getting data from local storage and display in card form
function showNote() {
    let note = localStorage.getItem('Note');
    if (note == null) {
        noteObj = [];
    } else {
        noteObj = JSON.parse(note);
    }
    let html = '';
    noteObj.forEach(function (element, index) {
        html += `
        <div class="card">
        <div class="card-content">
        <p style="display:none;">${index + 1}</p>
          <h3>${element.cardTitle}</h3>
          <p>${element.cardDesc}</p>
          <button class="add-to-cart" id=${index} onclick="deleteNode(this.id)">Delete</button>
        </div>
      </div>
        `
    });
    let cards = document.querySelector('.cards');
    if (noteObj.length != 0) {
        cards.innerHTML = html;
    }
    else {
        cards.innerHTML =`<h2 style="color:var(--black)">Enter some tasks to show here.</h2>`;
    }
}

// Deleting

function deleteNode(index) {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
            let note = localStorage.getItem('Note');
    if (note == null) {
        noteObj = []
    } else {
        noteObj = JSON.parse(note);
    }
    noteObj.splice(index,1);
    localStorage.setItem('Note', JSON.stringify(noteObj));
    showNote();
    Swal.fire(
        'Deleted!',
        'Your file has been deleted.',
        'success'
      )
        }
          
          
      })
}
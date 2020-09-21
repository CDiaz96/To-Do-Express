var check = document.getElementsByClassName("fa fa-check-circle-o");
var trash = document.getElementsByClassName("fa-trash");
//go into the thubUp element and grab the array

Array.from(check).forEach(function (element) {
  element.addEventListener('click', function () {

    const toDo = this.parentNode.parentNode.childNodes[1]
    toDo.classList.toggle("strike");
  });
});

Array.from(trash).forEach(function(element) {
      element.addEventListener('click', function(){
        const name = this.parentNode.parentNode.childNodes[1].innerText
        fetch('todofull', {
          method: 'delete',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'name': name
          })
        }).then(function (response) {
          window.location.reload()
        })
      });
});

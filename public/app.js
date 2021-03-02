window.onload = () =>{
  viewEvent();  
  
}

function viewEvent() {
  
  document.querySelectorAll('#left').forEach(item => {
    item.addEventListener('mouseover', function() {

  
      let box = this.dataset.box
      document.querySelector(`#${box}`).style.transform = "scale(1.1)"; 
      
    })
  })

  document.querySelectorAll('#left').forEach(item => {
    item.addEventListener('mouseleave', function() {

      let box = this.dataset.box
      
      document.querySelector(`#${box}`).style.transform = "scale(1.0)"; 

  
    })
  })


  // document.querySelector('#left').addEventListener("mouseover" , (e) =>{

  //   let box = e.target.dataset.box
  // alert(box)
  //   document.querySelector(`#${box}`).style.transform = "scale(1.1)"; 

  // })

  // document.querySelector('#left').addEventListener("mouseleave" , () =>{

  //   document.querySelector(".right").style.transform = "scale(1.0)"; 

  // })
 
}
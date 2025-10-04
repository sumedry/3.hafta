let next = document.querySelector('.next')
let prev = document.querySelector('.prev')

next.addEventListener('click', function(){
    let items = document.querySelectorAll('.item')
    document.querySelector('.slide').appendChild(items[0])
})

prev.addEventListener('click', function(){
    let items = document.querySelectorAll('.item')
    document.querySelector('.slide').prepend(items[items.length-1]) 
})
document.querySelectorAll(".item button").forEach(button => {
  button.addEventListener("click", (e) => {
    let championId = e.target.closest(".item").id; // item'in id'sini al

    // Direkt o id'nin html dosyasına yönlendir
    window.location.href = championId + ".html";
  });
});

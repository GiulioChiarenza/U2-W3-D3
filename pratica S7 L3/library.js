const getLibrary = function(){
    fetch("https://striveschool-api.herokuapp.com/books")
    .then ((response)=>{
        if (response.ok){
            return response.json();
        }else {
            if (response.status=== 404){
                throw new Error("404- page not found");
            }else if (response.status===500){
                throw new Error("500 internal server error");
            }else {
                throw new Error("generic error");
            }
        }
    })
    .then((data)=>{
        const rowContainer=document.getElementsByClassName("row")[0];
        data.forEach((book) => {
            const card=document.createElement('div');
            card.classList.add("col-12");
            card.classList.add("col-md-6");
            card.classList.add("col-lg-4");
            card.classList.add("col-xl-3");
            card.innerHTML= ` <div class="card">
            <img src="${book.img}" class="card-img-top" alt="${book.title}">
            <div class="card-body">
              <h5 class="card-title">${book.title}</h5>
              <p class="card-text">Price: ${book.price}</p>
              <a href="#" class="btn btn-primary" onclick= "removeCard(this)">Discard</a>
            </div>
          </div>
          ` 
          rowContainer.appendChild(card);
        });
    })
    .catch((err)=>{
        console.log("ERROR",err);
    });
};
function removeCard(button){
    const card= button.closest(".col");
    card.remove();
}
getLibrary();
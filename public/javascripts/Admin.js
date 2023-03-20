const addcolor = (jagah) => {
    html = `
    <div  class="d-flex mt-1">
              <input
                
                name=${jagah=='highlight'?'prdctFeatures':'color'}
                class="form-control"
                placeholder="Write ${jagah=='highlight'?'highlight':'color'} here"
                id="floatingTextarea"
                required
              />
              <div
                onclick="removecolor(this)"
                class="d-flex text-center justify-content-center align-items-center btn btn-primary h-5"
              >
                X
              </div>
            </div>
       `;
       if (jagah == "highlight") {
         document
           .querySelector("#highlight")
           .insertAdjacentHTML("beforeend", html);
        
       } else {
        document
           .querySelector("#color")
           .insertAdjacentHTML("beforeend", html);
        
       }
  };
  const addInp = (jagah) => {
    html = `
    <div  class="d-flex mt-1">
              <input
                
                name=${jagah=='highlight'?'prdctFeatures':'size'}
                class="form-control"
                placeholder="Write ${jagah=='highlight'?'highlight':'size'} here"
                id="floatingTextarea"
                required
              />
              <div
                onclick="removeInp(this)"
                class="d-flex text-center justify-content-center align-items-center btn btn-primary h-5"
              >
                X
              </div>
            </div>
       `;
       if (jagah == "highlight") {
         document
           .querySelector("#highlight")
           .insertAdjacentHTML("beforeend", html);
        
       } else {
        document
           .querySelector("#size")
           .insertAdjacentHTML("beforeend", html);
        
       }
  };
  const removeInp = (e) => {
    console.log(e.parentNode);
    var elem = document.querySelector("#size")
    console.log(elem)
    document.querySelector("#size").removeChild(e.parentNode);
  };
  const removecolor = (e) => {
    console.log(e.parentNode);
    var elem = document.querySelector("#color")
    console.log(elem)
    document.querySelector("#color").removeChild(e.parentNode);
  };
//   let submit = document.querySelector("#submit");
//   let prdctForm = document.querySelector("#prdctForm");
//   var prdctImg = document.querySelector(".prdctImg");
//   prdctForm.addEventListener("submit", (e) => {
//     if (prdctImg.files.length < 10 && prdctImg.files.length >= 2) {
//       document.querySelector("#spinner").style = `opacity:0.5; visibility:visible`;
//     } else {
//       e.preventDefault();
//       alert("more then 2 and less then 10 photos  are allowed to upload");
//     }
//   });
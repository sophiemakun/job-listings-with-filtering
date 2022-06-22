const jobDom = document.querySelector(".jobs")
const tagBtn = document.querySelector(".tag")
let filters = [];
const field = document.querySelector(".tagsg")

class Listing {
    async getListing() {
        try { 
        let result = await fetch("data.json");    
        let data = await result.json();
     
        let products = data;
        products = products.map(item =>{
          const company = item.company;
          const  id  = item.id;
          const newBool  = item.new;
          const  featured  = item.featured;
          const  position  = item.position;
          const  role  = item.role;
          const  level  = item.level;
          const  postedAt  = item.postedAt;
          const  contract  = item.contract;
          const location = item.location;
            const lang = item.languages;
            lang.unshift(role)
          const  tools  = item.tools;
          const image = item.logo;
        return{company,id,newBool,featured,position,role,level,postedAt,contract,location,tools,image, lang}
      })
      return products
      } catch (error) {
          console.log(error);
      }
    }
}

   function getDisplay(products) {
       let display = "";
       products
         .filter((items) =>  filters.length === 0 ? items : items.lang.some(item => filters.includes(item)))
         .map((element) => {
           if (element.featured) {
             display += `<div class="job1">
            <div class="flex">
                <div class="image">
                    <img src="./static-job-listings-master/${element.image}">
                </div>
                <div class="text">
                    <div class="topdetails">
                        <h4 class="company">${element.company}</h4>
                        <span class="new">New!</span>
                        <span class="featured">Featured</span>
                    </div>
                    <div class="main-text">
                        <h3 >${element.position}</h3>
                    </div>
                    <div class="bottomdetails">
                        <h5>${element.postedAt}</h5>
                        <h5>${element.contract}</h5>
                        <h5>${element.location}</h5>
                    </div>
                </div>

            </div>
            <div class="tags">
               
                ${element.lang
                  .map(
                    (item) =>
                      ` <span class='tag' onclick="addToFilters('${item}')">${item}</span>`
                  )
                  .join('')}
                
                
                
            </div>
            
        </div>`;
           } else {
             display += `<div class="job2">
            <div class="flex">
                <div class="image">
                    <img src="./static-job-listings-master/${element.image}">
                </div>
                <div class="text">
                    <div class="topdetails">
                        <h4 class="company">${element.company}</h4>

                        ${
                          element.newBool
                            ? ` <span class="new">New!</span>`
                            : ''
                        }
                    </div>
                    <div class="main-text">
                        <h3>${element.position}</h3>
                    </div>
                    <div class="bottomdetails">
                        <h5>${element.postedAt}</h5>
                        <h5>${element.contract}</h5>
                        <h5>${element.location}</h5>
                    </div>
                </div>

            </div>
             <div class="tags">
                ${element.lang
                  .map(
                    (item) =>
                      ` <span class='tag' onclick="addToFilters('${item}')">${item}</span>`
                    )
                  .join('')}
                
                
                
            </div>
            
        </div>`;
           }

           console.log(element);
         });

         //console.log(display)
         jobDom.innerHTML = display;
       
    }


function remove(params) {
    const data = filters.filter(item => params !== item)
    console.log(data)
    filters = data
    let display2 = '';
    filters.forEach((item) => {
      display2 += `<div class="field">
        <span class="htmlTag">${item}</span>
        <span class="close" onclick="remove('${item}')">&#10006</span>
        </div>`;
    });
    field.innerHTML = display2; 
    const listing = new Listing();
    listing.getListing().then((item, index) => {
      getDisplay(item);
    });
}

function addToFilters(params) {

    console.log(params)
    let display2 = ''
    if (filters.includes(params)) {
        return
        
    } else {
        filters.push(params);
        
    }
     filters.forEach((item) => {
       display2 += `<div class="field">
        <span class="htmlTag">${item}</span>
        <span class="close" onclick="remove('${item}')">&#10006</span>
        </div>`;
     });
    
    console.log(display2)
    field.innerHTML = display2; 
     const listing = new Listing();
     let display = '';

     listing.getListing().then((item, index) => {
       getDisplay(item);
     });

}


document.addEventListener("DOMContentLoaded", () => {
    const listing = new Listing();
    let display = '';
   
   
    listing.getListing().then((item, index) => {
        getDisplay(item);
   });
   
  //  console.log(array)
  

})
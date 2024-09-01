const accesskey="ZAgwysxeCv8buJ53x_ZnmEfG2HwYP_pzlCrXS0JmUiw";
const searchForm=document.querySelector("form");
const searchInput=document.querySelector(".search-input")
const images_container=document.querySelector(".images-container")
const loadMoreBtn=document.querySelector(".loadMoreBtn")

let page=1;

//Function to fetch images using unsplash api
const fetchImages=async(query,pageNo)=>{
    try{
        if(pageNo===1){
            images_container.innerHTML="";
        }
        const url=`https://api.unsplash.com/search/photos/?query=${query}&per_page=28&page=${pageNo}&client_id=${accesskey}`;

        const response=await fetch(url);
        const data=await response.json();

        if(data.results.length > 0){
            data.results.forEach(photo=>{
                //creating image div
                const imageElement=document.createElement('div');
                imageElement.classList.add("imageDiv");
                imageElement.innerHTML=`<img src="${photo.urls.regular}"/>`
        
                //creating overlay
                const overlayElement=document.createElement("div");
                overlayElement.classList.add("overlay");
        
                //creating overlay text
                const overlayText=document.createElement("h3");
                overlayText.innerHTML=`${photo.alt_description}`;
        
                overlayElement.appendChild(overlayText);
                imageElement.appendChild(overlayElement);
        
                images_container.appendChild(imageElement);
            });
            if(data.total_pages===pageNo){
                loadMoreBtn.style.display="none";
            }
            else{
                loadMoreBtn.style.display="block"
            }
        }
        else{
            images_container.innerHTML=`<h2>No image found</h2>`; 
        }
    }
    catch(error){
        images_container.innerHTML=`<h2>failed to fetch images. Please try again later</h2>`
    }
}
//Adding Event Listener to search form
searchForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    const inputText=searchInput.value.trim();
    if(inputText!==""){
        page=1;
        fetchImages(inputText,page);
    }
    else{
        images_container.innerHTML=`<h2>Please enter a search query</h2>`
        if(loadMoreBtn.style.display==="block"){
            loadMoreBtn.style.display="none";
        }
    }
})

//Adding Event Listener to load more button to fetch more images

loadMoreBtn.addEventListener("click",()=>{
    fetchImages(searchInput.value.trim(),++page)
})
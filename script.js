const fetch_result = document.querySelector("#fetch_result");
const word_input = document.querySelector("#wordInput");
const search_form = document.querySelector("#search-form");

// Fetching data from foodish api
async function getData(word) {
  try {
    const res = await fetch(`https://foodish-api.com/images/${word}`, {
      method: "GET",
      mode: "cors",
    });
    const data = await res.text();
    renderInfo(data, word);
  } catch (error) {
    console.log(error);
  }
}

// Rendering food image and displaying it
function renderInfo(data, word) {
  const parser = new DOMParser();
  const htmlDoc = parser.parseFromString(data, "text/html");
  try {
    const img_src =
      htmlDoc.body.children[0].children[2].children[0].firstElementChild.getAttribute(
        "src"
      );
    fetch_result.innerHTML = `
    <div class="m-5">
    <a href="https://foodish-api.com${img_src}" 
      target="_blank">
    <img
      src="https://foodish-api.com${img_src}"
      class="img-fluid rounded mx-auto d-block"
      alt=${word}
      >
    </a>      
    </div>
    `;
  } catch (error) {
    return (fetch_result.innerHTML = `<h4 class="text-primary d-flex justify-content-center">No Image Found</h4>`);
  }
}

// Handling Submit
search_form.addEventListener("submit", (e) => {
  e.preventDefault();
  let inputValue = word_input.value.trim();
  let filterValue = inputValue.split(" ").join("-");
  if (!filterValue) {
    alert("Input should not be empty");
  } else {
    fetch_result.innerHTML = spinner();
    search_form.reset();
    getData(filterValue.toLowerCase());
  }
});

// Display Spinner while fetching and display the data
function spinner() {
  return `<div class="spinner-border text-primary d-flex justify-content-center mx-auto w-full" role = "status">
    </div >`;
}

//to get the elements of the html
let input_search = document.querySelector("#input_text");
let search_button = document.querySelector("#search_button");
var data_field = document.querySelector(".data_container");

//created an event for search button
search_button.addEventListener("click", () => {
  let postal = async () => {
    try {
      data_field.innerHTML = "Loading please wait.....";
      var api = `https://api.postalpincode.in/pincode/${input_search.value}`;

      let res = fetch(api, {
        method: "GET",
      });

      let data = await res;
      let data_json = await data.json();

      //to get the postoffice details
      data_field.innerHTML = "";
      for (let i = 0; i < data_json[0].PostOffice.length; i++) {
        var name = data_json[0].PostOffice[i].Name;
        var district = data_json[0].PostOffice[i].District;
        var state = data_json[0].PostOffice[i].State;

        let content = `<div class="card" style="width: 18rem;">
          <div class="card-body">
            <h5 class="card-title">${name}</h5>
            <h6 class="card-text ">${district}</h6>
            <h6 class="card-text ">${state}</h6>
          </div>
        </div>`;

        //to append the data in the document
        let details = document.createElement("div");
        details.innerHTML = content;
        data_field.append(details);
      }
    } catch (err) {
      //to alert when there is an invalid pin code
      window.alert("Invalid pin code");
      console.log(err);
    }
    input_search.value = "";
  };
  postal();
});

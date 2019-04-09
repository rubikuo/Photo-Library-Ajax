// this is based on the API document from : https://unsplash.com/documentation#search-photos

$(() => {
    $("#search-form").submit(e => {
        e.preventDefault();

        let input = $("#search-input").val(); // we store the input value in a variable called "input" so make it dynamic to use later
        $("#show-result").html(" "); // to refresh the page into empty content so when you search for next item, the current item will not show in the page
        searchMe(input); // we call the searchMe function(as below) and pass an argument "input" which is the value of the input box( what we will type in the searchfield)

    })
    /* create search function, inside the search function declare url with api url and parameters in an object{}, 
    these parameters are like the contain behide the end-point of url. 
    ex https://api.unsplash.com/search/photos/client_id= {apikey} & client_secret= {secret key} & query=term (the term is the parameter which will change to the input we put in the search field) */

    const searchMe = (term) => {
        const url = "https://api.unsplash.com/search/photos";

        let parameters = {
            client_id: "43687394d12cd832aa9c8792dd24ece1f45a0a9b6e1a9d23de17064f0a77831f",
            client_secret: "a4d4ff9c272e44eb06ebfb9165d1cc671f884b71cdd2ac3bdb851f54a0b22ea9",
            query: term, // the term here is the parameter of this searchMe function, if you want to only search for cat then you must write "cat" here. 
            per_page: 60 // per page can show 60 pictures
        };


        $.ajax({
            type: "GET",
            //urls location is in const url
            url: url,
            dataType: "json",
            data: parameters,


        }).done(data => {     // if $.ajax is completed, do this function: .done
            //console.log(data.results);
            console.log(data);
            if (data.results.length === 0) {
                alert('Nothing found');
            } else {
                showResult(data);
            }
            // showResults(data.results); showResults is a function too


        }).fail(fail => { // if it is not completed, do this function, but this doesn't work if u try it on the webpage:
            console.log('error');
            alert("there is no data of what you searched for!")
        });


    };

    const showResult = (data) => {
        data.results.forEach(element => {
            //console.log(element.urls.small);
            $('#show-result').append(`
               
                <div class="card d-inline-flex mt-3 mx-1 px-2 justify-content-center" style="width:20rem;">
                    <img src="${element.urls.regular}" class="card-img-top mt-3" style="width:100%; height:auto;" alt="${element.description}">
                    <div class="card-body">
                        <h5 class="card-title text-center">Photographer:<span> ${element.user.name} </span></h5>
                        <div class="d-flex justify-content-center">
                        <a class="btn btn-primary mr-1 text-center" href="${element.user.links.html}" target=" _blank" role="button">Unsplash Profile</a>
                        <a class="btn btn-info ml-1 text-center" href="https://www.instagram.com/${element.user.instagram_username}"  target=" _blank" >Instagram</a>
                    
                        </div>
                        </div>
                </div>

           `)
        });

        //above also can use jquery  
            /*  $.each(data, (i, result) => {
              $('#show-result').append(`
                  "append content"
                 `)
            }*/ 
    };


});
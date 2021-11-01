BASE_URL = "https://novelbuddy.com"





$('#searchForm').submit( function(e){ 
    e.preventDefault();
})

let searchText = $('#searchText').val();
getNovels(searchText)

$('#searchForm').on("input", (e) => {
    searchText = $('#searchText').val();
    getNovels(searchText);
    e.preventDefault();
});

function getNovels(query) {
    var url;

    if (searchText.length < 2)
        url = `${BASE_URL}/latest`;
    else
        url = `${BASE_URL}/search?q=${query}`

    var xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    
    xhr.onreadystatechange = function () {
       if (xhr.readyState === 4) {        
          var parser = new DOMParser();
          var doc = parser.parseFromString(xhr.responseText, "text/html");
          var novels = doc.querySelectorAll('.section-body > .list > .book-item .thumb > a');

          let output = '';
          $.each(novels, (index, novel) => {
            id = novel.pathname.slice(1)
            output += `
                <div onclick="window.location.href = 'novel/?id=${id}'" class="col novel rounded">
                    <img class = "rounded" src = "https:${novel.querySelector('img').getAttribute('data-src')}"/>
                    <h4>${novel.getAttribute('title')}</h4>
                    <p class="novel-overview">${(novel.querySelector('meta') != null) ? novel.querySelector('meta').innerText : ''}</p>
                </div>
            `;
          });
          $('#novels > .row').html(output);
       }};
    
    xhr.send();
}
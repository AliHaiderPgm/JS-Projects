let apiKey = '51f88fafb3c34769830663af590e5f2b';
let src = 'ary-news';
let country = 'us'
let news = document.getElementById('news');
const xhr = new XMLHttpRequest();
xhr.open('GET', `https://newsapi.org/v2/top-headlines?sources=${src}&apiKey=${apiKey}`, true)

xhr.onload = function () {
    if (this.status === 200) {
        let json = JSON.parse(this.responseText)
        // console.log(json)
        let articles = json.articles;
        // console.log(articles)
        let newsHtml = '';
        articles.forEach(function(element,index) {
            console.log(element)
            let html = `
                        <div class="card d-flex justify-content-center pt-3 rounded-1" style="background: rgb(250, 250, 250);">
                        <p>
                            <a class="btn btn-link fw-bold" data-bs-toggle="collapse" href="#collapse${index}" role="button"
                                aria-expanded="false" aria-controls="collapseExample" >
                                ${element.title}
                            </a>
                        </p>
                        </div>
                        <div class="collapse" id="collapse${index}">
                        <div class="card card-body rounded-0">
                            ${element.description} <a href="${element.url}" target = '_blank'>مزید پڑھیں</a>
                        </div>
                        </div>`

            newsHtml += html;
        });
        news.innerHTML=newsHtml;
    }
    else {
        console.log('Some error occured!')
    }
}
xhr.send();
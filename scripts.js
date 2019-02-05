const request = new XMLHttpRequest();
const endpoint = `https://api.taboola.com/1.2/json/apitestaccount/recommendations.get?app.type=web&app.apikey=7be65fc78e52c11727793f68b06d782cff9ede3c&source.id=%2Fdigiday-publishing-summit%2F&source.url=https%3A%2F%2Fblog.taboola.com%2Fdigiday-publishing-summit%2F&source.type=text&placement.organic-type=mix&placement.visible=true&placement.available=true&placement.rec-count=6&placement.name=Below%20Article%20Thumbnails&placement.thumbnail.width=640&placement.thumbnail.height=480&user.session=init
`;
const app = document.getElementById('root');
const container = document.createElement('div');
container.setAttribute('class', 'container');

const header = document.createElement('h1');
header.setAttribute('class', 'header');
header.textContent = 'YOU MAY LIKE';

const disclosure = document.createElement('span');
disclosure.setAttribute('class', 'span');
disclosure.textContent = "Sponsored Links by Taboola";
header.appendChild(disclosure);

app.appendChild(header);
app.appendChild(container);

request.open('GET', endpoint, true);

request.onload = function() {
    const data = JSON.parse(this.response);
    console.log(data);
    const items = [];
    items.push(...data.list);

    if (request.status >= 200 && request.status < 400) {

        items.forEach(item => {
            const card = document.createElement('div');
            card.setAttribute('class', 'card');

            const link = document.createElement('a');
            link.setAttribute('href', item.url);
            card.appendChild(link);

            const thumbnail = document.createElement('img');
            thumbnail.src = item.thumbnail[0].url;

            const title = document.createElement('h1');
            title.setAttribute('class', 'title');
            title.textContent = item.name;

            const branding = document.createElement('p');
            branding.textContent = item.branding;

            const category = document.createElement('p');
            category.textContent = 'About: ' + item.categories;

            container.appendChild(card);
            link.appendChild(thumbnail);
            link.appendChild(title);
            link.appendChild(branding);

            if (item.categories) {
                link.appendChild(category);
            }

        });
    } else {
        console.log('error');
    }
}


request.send();

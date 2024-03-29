//Fetch and return the datas from the API (sample.json for now)
export async function getData() {
    let data = { photographers: [], media: [] };
    const apiURL = 'data/sample.json';
    let result = await fetch(apiURL);
    if (result.ok) {
        data = await result.json();
    }
    return data;
}

//Fetch and return the datas of every photographers from the API
export async function getPhotographers() {
    const { photographers } = await getData();
    return photographers;
}

//Fetch and return the datas of one photographer from the API
export async function getPhotographer(id) {
    const photographers = await getPhotographers();
    for (const p of photographers) {
        if (p.id == id) {
            return p;
        }
    }
    return null;
}

//Fetch and return the datas of the medias uploaded by one photographer from the API
export async function getMedias(id) {
    const { media } = await getData();
    let photographerMedias = [];
    for (const m of media) {
        if (m.photographerId == id) {
            photographerMedias.push(m);
        }
    }
    return photographerMedias;
}

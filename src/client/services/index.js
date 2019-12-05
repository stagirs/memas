export default class QueryService {
  _apiBase = `${window.location.protocol}//${window.location.host}/api`;

  getResource = async (url) => {
    const res = await fetch(`${this._apiBase}${url}`);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}` +
        `, received ${res.status}`)
    }
    return await res.json();
  };

  postResource = async (url, body) => {
    const res = await fetch(`${this._apiBase}${url}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}` +
        `, received ${res.status}`)
    }
  };

  textTransform = async (url) => {
    const res = await fetch(url, {
      method: 'GET'
    });

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}` +
        `, received ${res.status}`)
    }
    return await res.json();
  };

  getSnippets = async (offset=0, count=40, searchText="", isWithDocs=false,
                       isWithQueriesBefore=false, userId="", type="Неразмеченные", sort="По дате сессии", tags={} ) => {
    const newType = ((type == 'Неразмеченные') ? 'empty' : (type == 'Избранные') ? 'fav' : (type == 'Скрытые') ? 'hide' : undefined);
    const newSort = ((sort == 'По добавлению') ? 'adding' : (sort == 'По дате сессии') ? 'date' : undefined);
    let getTags = '';
    for (let tag in tags) {
      if(tags[tag]) {
        getTags += `&tag=${tag}`
      }
    }
    const snippets = await this.getResource(`/snippets/?offset=${offset}&count=${count}&searchText=${searchText}&isWithDocs=${isWithDocs}&isWithQueriesBefore=${isWithQueriesBefore}&userId=${userId}&type=${newType}&sort=${newSort}${getTags}`);
    return snippets;
  }

  getUrlReport = (from, to, searchText="", isWithDocs=false,
                       isWithQueriesBefore=false, userId="", type="Неразмеченные", sort="По дате сессии", tags={} ) => {
    const newType = ((type == 'Неразмеченные') ? 'empty' : (type == 'Избранные') ? 'fav' : (type == 'Скрытые') ? 'hide' : undefined);
    const newSort = ((sort == 'По добавлению') ? 'adding' : (sort == 'По дате сессии') ? 'date' : undefined);
    let getTags = '';
    for (let tag in tags) {
      if(tags[tag]) {
        getTags += `&tag=${tag}`
      }
    }
    return (`/report/?offset=${(from) ? ((from>0) ? from : '1')  : 0}&count=${(to) ? (((to-from+1) < 1000000) ? (to-from) : '1000000' ) : 0}&searchText=${searchText}&isWithDocs=${isWithDocs}&isWithQueriesBefore=${isWithQueriesBefore}&userId=${userId}&type=${newType}&sort=${newSort}${getTags}`);
  }

  getInfo = async (session_id) => {
    const info = await this.getResource(`/info/?session_id=${session_id}`);
    return info;
  }

  postComment = async (sessionId, text) => {
    const comment = {
      sessionId,
      text
    }
    const info = await this.postResource(`/comment`, comment);
    return info;
  }

  postType = async (sessionId, value) => {
    const body = {
      sessionId,
      value
    }
    const info = await this.postResource(`/type`, body);
    return info;
  }
}

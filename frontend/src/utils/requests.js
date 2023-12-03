const graphApi = "http://localhost:8000/api/graph";
const searchApi = "http://localhost:8000/api/search";
const userApi = "http://localhost:8000/api/user";
const featuresApi = "http://localhost:8000/api/features";
const alertApi = 'http://localhost:8000/api/alert';
const commentsApi = 'http://127.0.0.1:8000/api/comments';

const performJsonRequest = (url, method, body, isAuth) => {
    const token = localStorage.getItem("token");
    const headers = {
        "Content-Type": "application/json",
    };
    if (isAuth) {
        headers.Authorization = `Bearer ${token}`;
    }
    return fetch(url, {
        method: method,
        headers: headers,
        body: (method === "GET" ? null : JSON.stringify(body)),
    }).then((response) => {
        if (response.status === 401 && isAuth) {
            localStorage.removeItem("token");
            window.location.href = "/login";
        }
        return response.json();
    })
    .catch((error) => {
        console.error(error);
        return {error: error};
    });
};


export class GraphApi {
  static getDetails(paperId) {
    return performJsonRequest(`${graphApi}/details?id=${paperId}`, "GET", {}, false);
  }

  static getReferences(paperId) {
    return performJsonRequest(`${graphApi}/references?id=${paperId}`, "GET", {}, false);
  }

  static getCitations(paperId) {
    return performJsonRequest(`${graphApi}/citations?id=${paperId}`, "GET", {}, false);
  }

  static getRecommendations(paperId) {
    return performJsonRequest(`${graphApi}/recommendations?id=${paperId}`, "GET", {}, false);
  }

  static getAuthorPapers(authorId) {
    return performJsonRequest(`${graphApi}/author_papers?id=${authorId}`, "GET", {}, false);
  }
}

export class SearchApi {
  static search(query) {
    return performJsonRequest(`${searchApi}/completions?query=${query}`, "GET", {}, true);
  }
}

export class UserApi {
  static getPaper(paperId) {
    const id = localStorage.getItem("id");
    return performJsonRequest(`${userApi}/${id}/papers/${paperId}/`, "POST", {}, true);
  }

  static getPapers() {
    const id = localStorage.getItem("id");
    return performJsonRequest(`${userApi}/${id}/papers`, "GET", {}, true);
  }

  static getRecommendations() {
    return performJsonRequest(`${userApi}/recommendations`, "GET", {}, true);
  }

  static login({email, password}) {
    return performJsonRequest(`${userApi}/login`, "POST", {email: email, password: password}, false);
  }

  static register({email, password, username, profile}) {
    return performJsonRequest(`${userApi}/register`, "POST", {email: email, password: password, username: username, profile: profile}, false);
  }

  static info() {
    return performJsonRequest(`${userApi}/info`, "GET", {}, true);
  }
}

export class FeaturesApi {
    static aiRewrite(text) {
        return performJsonRequest(`${featuresApi}/ai/rewrite`, "POST", {text: text}, true);
    }

    static conferences() {
        return performJsonRequest(`${featuresApi}/conferences`, "GET", {}, true);
    }
}

export class AlertApi {
  static getAlert({user, keyword}) {
    return performJsonRequest(`${alertApi}/getalert`, "POST", {user: user, keyword: keyword}, true);
  }
}

export class CommentsApi {
  static create({paper_id, user, text, keyword}) {
    return performJsonRequest(`${commentsApi}/create/`, "POST", {
      paper_id: paper_id,
      user: user,
      text: text, 
      keyword: keyword,
    }, true);
  }

  static update(commentId, {paper_id, user, text, keyword}) {
    return performJsonRequest(`${commentsApi}/updateComment/${commentId}/`, "PUT", {
      paper_id: paper_id,
      user: user,
      text: text, 
      keyword: keyword,
    }, true);
  }

  static getAllComment() {
    return performJsonRequest(`${commentsApi}/getAllComment/`, "POST", {
      user: localStorage.getItem('username')
    }, true);
  }

  static deleteComment(commentId) {
    return performJsonRequest(`${commentsApi}/deleteComment/${commentId}/`, "DELETE", {
      user: localStorage.getItem('username')
    }, true);
  }
}

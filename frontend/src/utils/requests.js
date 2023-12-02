const graphApi = "http://localhost:8000/api/graph";
const searchApi = "http://localhost:8000/api/search";
const userApi = "http://localhost:8000/api/user";

export class GraphApi {
  static getDetails(paperId) {
    return fetch(`${graphApi}/details?id=${paperId}`).then((response) =>
      response.json()
    );
  }

  static getReferences(paperId) {
    return fetch(`${graphApi}/references?id=${paperId}`).then((response) =>
      response.json()
    );
  }

  static getCitations(paperId) {
    return fetch(`${graphApi}/citations?id=${paperId}`).then((response) =>
      response.json()
    );
  }

  static getRecommendations(paperId) {
    return fetch(`${graphApi}/recommendations?id=${paperId}`).then((response) =>
      response.json()
    );
  }

  static getAuthorPapers(authorId) {
    return fetch(`${graphApi}/author_papers?id=${authorId}`).then((response) =>
      response.json()
    );
  }
}

export class SearchApi {
  static search(query) {
    const token = localStorage.getItem("token");
    return fetch(`${searchApi}/completions?query=${query}`, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    }).then((response) =>
      response.json()
    ).catch((error) => {
        console.log(error);
        return [{title: "Please login to search"}]
    });
  }
}

export class UserApi {
  static getPaper(paperId) {
    const userId = localStorage.getItem("id");
    const token = localStorage.getItem("token");
    return fetch(`${userApi}/${userId}/papers/${paperId}/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => response.json());
  }

  static getRecommendations() {
    const token = localStorage.getItem("token");
    return fetch(`${userApi}/recommendations`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => response.json());
  }
}

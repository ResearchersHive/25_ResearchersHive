const graphApi = "http://localhost:8000/api/graph";
const searchApi = "http://localhost:8000/api/search";
const paperApi = "http://localhost:8000/api/user/1/papers";

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
    return fetch(`${searchApi}/completions?query=${query}`).then((response) =>
      response.json()
    );
  }
}

export class PaperApi {
  static getPaper(paperId) {
    return fetch(`${paperApi}/${paperId}/`, {
      method: "POST",
    }).then((response) => response.json());
  }
}

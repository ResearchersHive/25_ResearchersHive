const api = 'http://localhost:8000/api/graph';

export class GraphApi {
    static getDetails(paperId) {
        return fetch(`${api}/details?id=${paperId}`)
            .then(response => response.json());
    }

    static getReferences(paperId) {
        return fetch(`${api}/references?id=${paperId}`)
            .then(response => response.json());
    }

    static getCitations(paperId) {
        return fetch(`${api}/citations?id=${paperId}`)
            .then(response => response.json());
    }

    static getRecommendations(paperId) {
        return fetch(`${api}/recommendations?id=${paperId}`)
            .then(response => response.json());
    }

    static getAuthorPapers(authorId) {
        return fetch(`${api}/author_papers?id=${authorId}`)
            .then(response => response.json());
    }
}

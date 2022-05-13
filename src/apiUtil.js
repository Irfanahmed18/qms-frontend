const baseUrl = "http://192.168.1.135:3001/"
const api = {
    usersignin: async (data) => {
        let res = await postData(baseUrl+'sign-in', data);
        return res;
    },
    usersignup: async (data) => {
        let res = await postData(baseUrl+'signup', data);
        return res;
    },
    add_question: async (data) => {
        let res = await postData(baseUrl+'add-question', data);
        return res;
    },
    gettopics: async () => {
        let res = await getData(baseUrl+'get-topics');
        return res;
    },
    get_all_ques: async () => {
        let res = await getData(baseUrl + 'get-question-answers');
        return res;
    },
    get_user_ques: async (data) => {
        let res = await postData(baseUrl + 'get-user-question-answer', data);
        return res;
    },
    answer_ques: async (data) => {
        let res = await postData(baseUrl + 'add-answer', data);
        return res;
    },
    get_likes: async (data) => {
        let res = await postData(baseUrl + 'get-likes', data);
        return res;
    },
    like_answer: async (data) => {
        let res = await postData(baseUrl+'like-answer', data);
        return res;
    },
    dislike_answer: async (data) => {
        let res = await postData(baseUrl+'unlike-answer', data);
        return res;
    },
    get_user_details: async (data) => {
        let res = await postData(baseUrl +'get-profile', data);
        return res;
    },
    get_filtered_ques: async (data) => {
        let res = await postData(baseUrl +'search', data);
        return res;
    }

}

async function postData(url = '', data = {}) {
    // Default options are marked with *
    let response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    response = await response.json(); // parses JSON response into native JavaScript objects
    return response;
}

async function getData(url = '', data = {}) {
    // Default options are marked with *
    let response = await fetch(url, {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    });
    response = await response.json(); // parses JSON response into native JavaScript objects
    return response;
}

export default api;
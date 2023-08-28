import store from "../Store/store";
export default function reducer(init = store, action: any){
    switch (action.type) {
        case "CHANGE_LANG":
            return {
                        ...init, 
                        lang: init.lang === "ru" ? "en" : "ru",
                    }
        case "LOADING_START":
            return {
                ...init,
                comments: null,
                loading: true,
                error: false,
                countPage: null,
                
            }
        case "LOADING_DATA":
            return {
                ...init,
                loading: false,
                comments: action.payload,
                countPage: action.countPage,
                currentPage: action.currentPage
            }
        case "LOADING_ERROR":
            return {
                ...init,
                loading: false,
                error: true,
            };
        case "CHANGE_PAGE": 
            return {
                ...init,
                currentPage: action.currentPage,
            }
        case "CHANGE_TIME":
            return {
                ...init,
                time: new Date().toLocaleTimeString("en-GB"),
            }
        default:
            return init;
    }
    return init;
} 
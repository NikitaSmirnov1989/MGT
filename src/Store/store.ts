let store = {
    loading: true,
    error: false,
    comments: null as any,
    lang: "ru",
    countPage: null as any,
    currentPage: null as any,
    time: new Date().toLocaleTimeString("en-Gb"),
    limit: 5,
};

export default store;
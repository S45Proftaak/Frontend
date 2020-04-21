
export const fetchLinks = () => ({
    type: "FETCHING_LINKS",
    payload: null
});

export const fetchedLinks = (links) => ({
    type: "FETCHED_LINKS",
    links: links
});

export const errorLinks = () => ({
    type: "ERROR_LINKS",
    payload: null
});
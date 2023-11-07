export const fetchData = async (baseUrl, number, category, difficulty, type) => {
    const res = await fetch(`${baseUrl}amount=${number}&category=${category}&difficulty=${difficulty}&type=${type}`);

    if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
    }

    const data = await res.json();
    return data;
};
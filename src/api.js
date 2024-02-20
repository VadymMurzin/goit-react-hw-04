import axios from 'axios';

const accessKey = 'U8xAAUR5Fxct90hrHZPN8X0OTN8GSELW7D9-rpK04bA';

export const fetchImage = async (query, page) => {
    const response = await axios.get(
        `https://api.unsplash.com/search/photos?query=${query}&page=${page}&per_page=${20}&client_id=${accessKey}`
      );

      // return response.data.results;
      return response.data;
}
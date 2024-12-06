import { atomFamily, selectorFamily } from 'recoil';
import axios from 'axios';

const blogAtomFamily = atomFamily({
    key: 'blogAtomFamily',
    default: selectorFamily({
        key: 'blogSelectorFamily',
        get: function ({page, isUser} : {page: number, isUser: boolean}) {

            const BACKEND_URL = "http://127.0.0.1:8787/api/v1"

            return async () => {
                try {
                    const token = localStorage.getItem('jwt');
                    if (!token) {
                        throw new Error('No authentication token found');
                    }
                    const url = isUser ? `${BACKEND_URL}/blog/user-blogs?limit=4&offset=${(page - 1) * 4}` : `${BACKEND_URL}/blog/all?limit=4&offset=${(page - 1) * 4}`;
                    const res = await axios.get(`${url}`, {
                        headers: {
                            Authorization: `${token}`
                        }
                    });
                    return res.data;
                } catch (error : any) {

                    console.log(error.response.data.error);

                    if (error.message === 'No authentication token found') {
                        throw error;
                    }

                    if(error.response.data.error === 'Error while authorization') {
                        throw error;
                    }

                    throw new Error('Failed to fetch blogs..');
                }
            }
        }
    })
});

export { blogAtomFamily };

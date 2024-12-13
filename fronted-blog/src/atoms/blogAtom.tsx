import { atomFamily, selectorFamily } from 'recoil';
import axios from 'axios';

const blogAtomFamily = atomFamily({
    key: 'blogAtomFamily',
    default: selectorFamily({
        key: 'blogSelectorFamily',
        get: function ({page, isUser} : {page: number, isUser: boolean}) {

            const BACKEND_URL = import.meta.env.VITE_APP_BACKEND_URL;

            return async () => {
                try {
                    const token = localStorage.getItem('jwt');
                    if (!token) {
                        throw new Error('No authentication token found');
                    }
                    const url = isUser ? `${BACKEND_URL}/blog/post/user-blogs?limit=4&offset=${(page - 1) * 4}` : `${BACKEND_URL}/blog/post/all?limit=4&offset=${(page - 1) * 4}`;
                    const res = await axios.get(`${url}`, {
                        headers: {
                            Authorization: `${token}`
                        }
                    });
                    return res.data;
                } catch (error : any) {

                    console.log(error.message);

                    if(error.message === 'Network Error') {
                        throw new Error('Network Error');
                    }

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

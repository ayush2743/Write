import { atomFamily, selectorFamily } from 'recoil';
import axios from 'axios';

const blogAtomFamily = atomFamily({
    key: 'blogAtomFamily',
    default: selectorFamily({
        key: 'blogSelectorFamily',
        get: function ({page, isUser} : {page: number, isUser: boolean}) {

            const BACKEND_URL = "https://backend-blog.saxenaayush27-work.workers.dev/api/v1";

            return async () => {
                try {

                    if(!isUser) {
                        const url = `${BACKEND_URL}/blog/all?limit=4&offset=${(page - 1) * 4}`;
                        const res = await axios.get(`${url}`);
                        return res.data;
                    }

                    const token = localStorage.getItem('jwt');
                    if (!token) {
                        throw new Error('No authentication token found');
                    }
                    const url = `${BACKEND_URL}/blog/post/user-blogs?limit=4&offset=${(page - 1) * 4}`;
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

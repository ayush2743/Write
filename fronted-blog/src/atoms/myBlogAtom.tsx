import { atomFamily, selectorFamily, useRecoilCallback } from 'recoil';
import axios from 'axios';

const myblogAtomFamily = atomFamily({
    key: 'blogAtomFamily',
    default: selectorFamily({
        key: 'blogSelectorFamily',
        get: function (page: number) {

            return async () => {
                try {
                    const token = localStorage.getItem('jwt');
                    if (!token) {
                        throw new Error('No authentication token found');
                    }
                    const res = await axios.get(`http://127.0.0.1:8787/api/v1/blog/user-blogs?limit=4&offset=${(page - 1) * 4}`, {
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

const useRefreshBlogAtom = () => {
    return useRecoilCallback(({ reset }) => async (page: number) => {
        reset(myblogAtomFamily(page));
    });
};

export { myblogAtomFamily, useRefreshBlogAtom };
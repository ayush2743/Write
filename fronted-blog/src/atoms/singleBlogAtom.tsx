import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

// Blog interface definition
interface Blog {
    id: string;
    title: string;
    description: string;
    content: string;
    published: boolean;
    authorId: string;
    publishedAt: string; // Use Date if handling as Date
    updatedAt: string; // Use Date if handling as Date
    author: {
        name: string;
    };
}

// Recoil Persist
const { persistAtom } = recoilPersist();

// Atom definition with the Blog interface
const singleBlogAtom = atom<Blog>({
    key: 'singleBlogAtom',
    default: {
        id: '',
        title: '',
        description: '',
        content: '',
        published: false,
        authorId: '',
        publishedAt: '',
        updatedAt: '',
        author: {
            name: '',
        },
    }, 
    effects_UNSTABLE: [persistAtom], // Persist the atom
});

export { singleBlogAtom };

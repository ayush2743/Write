import Navbar from '../components/Blogs/Navbar';
import Bubbles from '../components/Bubles';
import Quote from '../components/Blogs/Quote';
import Footer from '../components/Blogs/Footer';





function Create() {

    return (
        <div className="min-h-screen  bg-loginPage bg-cover bg-no-repeat bg-black overflow-x-hidden">
            <Bubbles />

            <Navbar home={true} />



            <Quote />
            <Footer />


        </div>);
}

export default Create;
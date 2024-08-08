import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


const Home = ({featured}) => {

    let navigate = useNavigate(); 
    const routeChange = (id) => { 
        let path = `/shop/${id}`; 
        navigate(path);
    }

    return (
        <div className="border-4 border-black m-3">
                <section className="flex gap-5 px-12">
                    <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16">
                        <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-black md:text-5xl lg:text-6xl">Elevate your style and space.</h1>
                        <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48 dark:text-gray-400">Discover the perfect blend of fashion and home decor at our modern boutique. From chic apparel to elegant home accents, we bring you a curated selection of contemporary designs that reflect your unique style.</p>
                        <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0">
                            <Link to="/shop" className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 dark:focus:ring-blue-900">
                                Shop now
                                <svg className="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                                </svg>
                            </Link>
                        </div>
                    </div>
                </section>
                <section>
                    <h1 className="mb-4 text-xl mx-6 font-extrabold tracking-tight leading-none text-black md:text-2xl lg:text-3xl">Featured</h1>
                    <div className="flex flex-wrap">
                        {featured.map((feat) => {
                                return (
                                    <div className="w-full sm:w-1/2 md:w-1/4 p-5" 
                                        key={feat.id}>
                                        <div className="flex rounded-xl bg-cover bg-center h-64 cursor-pointer"
                                            style={{ backgroundImage: `url(${feat.images[0]})` }}
                                            onClick={() => routeChange(feat.id)}>
                                            <div className="bg-black bg-opacity-0 rounded-xl w-full h-full hover:bg-opacity-40 transition-all duration-200">
                                                <div className="flex-auto p-6 flex flex-col">
                                                    <div className="flex flex-col">
                                                        <h1 className="flex-auto text-lg font-semibold text-white">{feat.title}</h1>
                                                        <div className="text-lg font-semibold text-white">${feat.price}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>   
                                )
                            })}
                    </div>
                        
                </section>
        </div>
    )
}

export default Home;
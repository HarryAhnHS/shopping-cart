import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


const Home = ({featured}) => {

    let navigate = useNavigate(); 
    const routeChange = (id) => { 
        let path = `/shop/${id}`; 
        navigate(path);
    }

    return (
        <div className="px-6 py-12">
                <section className="flex gap-5 px-4 md:px-12 py-8 lg:py-16">
                    <div className="mx-auto max-w-screen-xl text-center ">
                        <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-[#283618] md:text-5xl lg:text-6xl">Elevate your <span className="text-[#606c38] underline">style</span> and <span className="text-[#606c38] underline underline-offset-8	">space</span>.</h1>
                        <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48 dark:text-gray-400">Discover the perfect blend of fashion and home decor at our modern boutique. From chic apparel to elegant home accents, we bring you a curated selection of contemporary designs that reflect your unique style.</p>
                        <div className="flex flex-col sm:flex-row sm:justify-center">
                            <Link to="/shop" className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-[#606c38] hover:opacity-80 focus:ring-4">
                                Shop now
                                <svg className="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                                </svg>
                            </Link>
                        </div>
                    </div>
                </section>
                <section className="md:px-12 py-8 lg:py-16">
                    <h1 className="text-xl mx-6 font-extrabold tracking-tight leading-none text-[#283618] md:text-2xl lg:text-3xl">Featured</h1>
                    <div className="flex flex-wrap">
                        {featured.map((feat) => {
                                return (
                                    <div className="w-full py-5 px-4 lg:w-1/3" 
                                        key={feat.id}>
                                        <div className="h-96 flex rounded-lg bg-cover bg-center cursor-pointer hover:scale-105 transition-all duration-200 shadow-xl"
                                            style={{ backgroundImage: `url(${feat.images[0]})`, backgroundPosition: 'top' }}
                                            onClick={() => routeChange(feat.id)}>
                                            <div className="relative bg-black bg-opacity-0 rounded-lg w-full h-full hover:bg-opacity-50 transition-all duration-200">
                                                <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-200 p-6">
                                                    <div className="text-white">
                                                        <h1 className="text-lg font-semibold">{feat.title}</h1>
                                                        <div className="text-lg font-semibold">${feat.price}</div>
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
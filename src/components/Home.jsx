import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


const Home = ({featured}) => {

    let navigate = useNavigate(); 
    const routeChange = (id) => { 
        let path = `/shop/${id}`; 
        navigate(path);
    }

    console.log(featured)

    return (
        <>
                `<section className="flex gap-5 p-12 border-4 border-black m-3">
                    <div className="flex flex-col items center">
                        <h1 className="text-center font-bold">
                            Your one-stop destination for all your shopping needs
                        </h1>
                        <p className="text-center text-lg">
                            Discover an unparalleled shopping experience with our extensive
                            selection of products, unbeatable prices, and exceptional customer
                            service. Shop now and transform your shopping journey with us.
                        </p>
                        <Link
                            to="/shop"
                            className="w-[150px] overflow-hidden truncate rounded-lg p-3 bg-slate-200 text-center font-bold transition duration-150 ease-in-out">
                            Shop Now
                        </Link>
                    </div>
                    <div>
                        <div className="box-border w-full sm:w-1/2 lg:w-1/3 p-3" key={featured.id}>
                            <div className="flex rounded-xl cursor-pointer bg-[#FFFFFF]">
                                <div className="flex-none w-1/3 h-64">
                                    <img src={featured.images[0]} className="inset-0 w-full h-full object-cover rounded-l-xl"></img>
                                </div>
                                <div className="flex-auto p-6 flex flex-col">
                                    <div className="flex flex-col">
                                        <h1 className="flex-auto text-lg font-semibold text-slate-9000">{featured.title}</h1>
                                        <div className="text-lg font-semibold text-slate-500">${featured.price}</div>
                                    </div>
                                    <button className="h-10 font-semibold rounded-md bg-black text-white" type="submit" onClick={() => routeChange(featured.id)}>
                                        See More
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>`
        </>
    )
}

export default Home;
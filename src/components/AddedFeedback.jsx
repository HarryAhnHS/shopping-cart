const AddedFeedback = ({product}) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white text-center py-12 px-8 rounded-lg shadow-lg max-w-md mx-4 w-full">
                <h1 className="text-4xl mb-8">
                    🎉 
                </h1>
                <p className="text-xl mb-4">
                    Added <span className="font-semibold">{product.title}</span> to your cart!
                </p>
            </div>
        </div>
    )
}

export default AddedFeedback;
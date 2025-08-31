import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { brandOptionsMap, categoryOptionsMap } from "@/config";
import { Badge } from "../ui/badge";

function ShoppingProductTile({
  product,
  handleGetProductDetails,
  handleAddtoCart,
}) {
  const discount = product?.salePrice > 0 
    ? Math.round(((product.price - product.salePrice) / product.price) * 100)
    : 0;

  return (
    <Card className="group w-full max-w-sm mx-auto overflow-hidden bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300">
      <div 
        onClick={() => handleGetProductDetails(product?._id)}
        className="cursor-pointer"
      >
        <div className="relative overflow-hidden aspect-[3/4]">
          <img
            src={product?.image}
            alt={product?.title}
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
          />
          
          {/* Status Badges */}
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {product?.totalStock === 0 && (
              <Badge className="bg-red-500 text-white border-0 shadow-lg">
                Out Of Stock
              </Badge>
            )}
            {product?.totalStock > 0 && product?.totalStock < 10 && (
              <Badge className="bg-yellow-500 text-white border-0 shadow-lg">
                Only {product?.totalStock} left
              </Badge>
            )}
            {product?.salePrice > 0 && (
              <Badge className="bg-green-500 text-white border-0 shadow-lg">
                {discount}% OFF
              </Badge>
            )}
          </div>

          {/* Quick Action Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"/>
        </div>

        <CardContent className="p-6">
          {/* Product Info */}
          <div className="space-y-4">
            {/* Title and Rating */}
            <div>
              <h2 className="text-xl font-bold text-gray-800 group-hover:text-primary transition-colors duration-300 line-clamp-1">
                {product?.title}
              </h2>
              <div className="flex items-center gap-2 mt-1">
                {/* Star Rating */}
                <div className="flex items-center">
                  {[...Array(5)].map((_, index) => (
                    <svg
                      key={index}
                      className={`w-4 h-4 ${
                        index < (product?.averageReview || 0)
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }`}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-sm text-gray-500">
                  {product?.averageReview || 0} rating
                </span>
              </div>
            </div>

            {/* Category and Brand */}
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center text-gray-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"/>
                </svg>
                {categoryOptionsMap[product?.category]}
              </div>
              <div className="flex items-center text-gray-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4 2a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V4a2 2 0 00-2-2H4zm0 2h12v12H4V4zm3 3a1 1 0 011-1h4a1 1 0 110 2H8a1 1 0 01-1-1z" clipRule="evenodd"/>
                </svg>
                {brandOptionsMap[product?.brand]}
              </div>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-2">
              {product?.salePrice > 0 && (
                <span className="text-2xl font-bold text-primary">
                  ${product?.salePrice}
                </span>
              )}
              <span className={`text-lg ${product?.salePrice > 0 ? 'line-through text-gray-400' : 'font-bold text-primary'}`}>
                ${product?.price}
              </span>
              {product?.salePrice > 0 && (
                <span className="text-sm text-green-600 font-medium">
                  Save {discount}%
                </span>
              )}
            </div>
          </div>
        </CardContent>
      </div>

      {/* Footer */}
      <CardFooter className="p-6 pt-0">
        {product?.totalStock === 0 ? (
          <Button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-600" disabled>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"/>
            </svg>
            Out Of Stock
          </Button>
        ) : (
          <Button
            onClick={() => handleAddtoCart(product?._id, product?.totalStock)}
            className="w-full bg-primary hover:bg-primary/90 text-white flex items-center justify-center gap-2 transform hover:scale-105 transition-all duration-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zm13 15.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"/>
            </svg>
            Add to Cart
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

export default ShoppingProductTile;

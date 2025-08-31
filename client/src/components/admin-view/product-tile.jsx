import { Button } from "../ui/button";
import { Card } from "../ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Badge } from "../ui/badge";

function AdminProductTile({
  product,
  setFormData,
  setOpenCreateProductsDialog,
  setCurrentEditedId,
  handleDelete,
}) {
  return (
    <Card className="group overflow-hidden bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300">
      <div className="relative">
        {/* Product Image with Gradient Overlay */}
        <div className="aspect-[4/3] overflow-hidden bg-gray-100">
          <div className="relative h-full">
            <img
              src={product?.image}
              alt={product?.title}
              className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        </div>
        
        {/* Status Badges */}
        <div className="absolute top-4 left-4 flex gap-2">
          {product?.salePrice > 0 && (
            <Badge className="bg-red-500 text-white border-0 shadow-lg">
              Sale
            </Badge>
          )}
          {product?.totalStock < 10 && (
            <Badge className="bg-amber-500 text-white border-0 shadow-lg">
              Low Stock
            </Badge>
          )}
        </div>

        {/* Quick Actions */}
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="w-8 h-8 bg-white">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/>
                </svg>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuItem 
                className="cursor-pointer"
                onClick={() => {
                  setOpenCreateProductsDialog(true);
                  setCurrentEditedId(product?._id);
                  setFormData(product);
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                  <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/>
                </svg>
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem 
                className="cursor-pointer text-red-600 focus:text-red-600"
                onClick={() => handleDelete(product?._id)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                  <path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
                </svg>
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-5">
        <div className="mb-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-semibold text-lg text-gray-800 line-clamp-1 flex-1">
              {product?.title}
            </h3>
            <div className="ml-4 flex items-center">
              <div className="flex items-center text-amber-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="mr-1">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
                <span className="font-medium">{product?.averageReview}</span>
              </div>
            </div>
          </div>
          <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
            {product?.description}
          </p>
        </div>

        {/* Product Stats */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="flex items-center text-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-gray-500">
                <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/>
              </svg>
              <div>
                <div className="text-xs text-gray-500 font-medium">Brand</div>
                <div className="font-semibold">{product?.brand}</div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="flex items-center text-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-gray-500">
                <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
              </svg>
              <div>
                <div className="text-xs text-gray-500 font-medium">Category</div>
                <div className="font-semibold">{product?.category}</div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="flex items-center text-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-gray-500">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
              </svg>
              <div>
                <div className="text-xs text-gray-500 font-medium">Stock</div>
                <div className="font-semibold">{product?.totalStock}</div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="flex items-center text-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-gray-500">
                <circle cx="12" cy="12" r="10"/><path d="M16 8l-4 4-4-4"/>
              </svg>
              <div>
                <div className="text-xs text-gray-500 font-medium">Status</div>
                <div className="font-semibold">{product?.totalStock > 0 ? "In Stock" : "Out of Stock"}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Price and Actions */}
        <div className="flex items-center justify-between border-t border-gray-100 pt-4 mt-2">
          <div className="flex items-baseline">
            {product?.salePrice > 0 ? (
              <div className="flex items-baseline">
                <span className="text-2xl font-bold text-emerald-600">
                  ${product?.salePrice}
                </span>
                <span className="text-lg line-through text-gray-400 ml-2">
                  ${product?.price}
                </span>
                <span className="ml-2 text-sm text-emerald-600 font-medium">
                  {Math.round(((product.price - product.salePrice) / product.price) * 100)}% OFF
                </span>
              </div>
            ) : (
              <span className="text-2xl font-bold text-gray-900">
                ${product?.price}
              </span>
            )}
          </div>
          <Button
            variant="outline"
            size="sm"
            className="ml-4 text-gray-600 hover:text-gray-900"
            onClick={() => {
              setOpenCreateProductsDialog(true);
              setCurrentEditedId(product?._id);
              setFormData(product);
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
              <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/>
            </svg>
            Edit Product
          </Button>
        </div>
      </div>
    </Card>
  );
}

export default AdminProductTile;

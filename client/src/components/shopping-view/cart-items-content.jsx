import { Minus, Plus, Trash } from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { deleteCartItem, updateCartQuantity } from "@/store/shop/cart-slice";
import { useToast } from "../ui/use-toast";

function UserCartItemsContent({ cartItem }) {
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const { productList } = useSelector((state) => state.shopProducts);
  const dispatch = useDispatch();
  const { toast } = useToast();

  function handleUpdateQuantity(getCartItem, typeOfAction) {
    if (typeOfAction == "plus") {
      let getCartItems = cartItems.items || [];

      if (getCartItems.length) {
        const indexOfCurrentCartItem = getCartItems.findIndex(
          (item) => item.productId === getCartItem?.productId
        );

        const getCurrentProductIndex = productList.findIndex(
          (product) => product._id === getCartItem?.productId
        );
        const getTotalStock = productList[getCurrentProductIndex].totalStock;

        console.log(getCurrentProductIndex, getTotalStock, "getTotalStock");

        if (indexOfCurrentCartItem > -1) {
          const getQuantity = getCartItems[indexOfCurrentCartItem].quantity;
          if (getQuantity + 1 > getTotalStock) {
            toast({
              title: `Only ${getQuantity} quantity can be added for this item`,
              variant: "destructive",
            });

            return;
          }
        }
      }
    }

    dispatch(
      updateCartQuantity({
        userId: user?.id,
        productId: getCartItem?.productId,
        quantity:
          typeOfAction === "plus"
            ? getCartItem?.quantity + 1
            : getCartItem?.quantity - 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: "Cart item is updated successfully",
        });
      }
    });
  }

  function handleCartItemDelete(getCartItem) {
    dispatch(
      deleteCartItem({ userId: user?.id, productId: getCartItem?.productId })
    ).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: "Cart item is deleted successfully",
        });
      }
    });
  }

  return (
    <div className="flex gap-4 group py-4">
      <div className="relative aspect-square h-24 overflow-hidden rounded-lg border bg-gray-50">
        <img
          src={cartItem?.image}
          alt={cartItem?.title}
          className="h-full w-full object-cover transition-transform group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col justify-between">
        <div className="space-y-1">
          <h3 className="font-medium line-clamp-2">{cartItem?.title}</h3>
          {cartItem?.salePrice > 0 ? (
            <div className="flex items-center gap-2">
              <span className="font-semibold text-sm text-emerald-600">
                ${cartItem?.salePrice.toFixed(2)}
              </span>
              <span className="text-sm text-gray-500 line-through">
                ${cartItem?.price.toFixed(2)}
              </span>
              <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                {Math.round(((cartItem.price - cartItem.salePrice) / cartItem.price) * 100)}% OFF
              </span>
            </div>
          ) : (
            <span className="font-semibold text-sm">
              ${cartItem?.price.toFixed(2)}
            </span>
          )}
        </div>
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-1 sm:gap-2">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              disabled={cartItem?.quantity === 1}
              onClick={() => handleUpdateQuantity(cartItem, "minus")}
            >
              <Minus className="h-3 w-3" />
              <span className="sr-only">Remove one item</span>
            </Button>
            <span className="w-6 text-center text-sm">{cartItem?.quantity}</span>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => handleUpdateQuantity(cartItem, "plus")}
            >
              <Plus className="h-3 w-3" />
              <span className="sr-only">Add one item</span>
            </Button>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-semibold">
              ${((cartItem?.salePrice > 0 ? cartItem?.salePrice : cartItem?.price) * cartItem?.quantity).toFixed(2)}
            </span>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-gray-500 hover:text-red-600"
              onClick={() => handleCartItemDelete(cartItem)}
            >
              <Trash className="h-4 w-4" />
              <span className="sr-only">Remove item</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserCartItemsContent;

package TT26_73.hoseshop.Mapper;

import TT26_73.hoseshop.Dto.Order.OrdersResponse;
import TT26_73.hoseshop.Dto.Order.UserOrderResponse;
import TT26_73.hoseshop.Dto.OrderItem.OrderItemProductResponse;
import TT26_73.hoseshop.Dto.OrderItem.OrderItemResponse;
import TT26_73.hoseshop.Model.OrderItem;
import TT26_73.hoseshop.Model.Orders;
import TT26_73.hoseshop.Model.Product;
import TT26_73.hoseshop.Model.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface OrderMapper {

    @Mapping(source ="idOrders", target = "idOrder")
    @Mapping(source = "user", target = "userOrderResponse")
    @Mapping(source =  "orderItemSet", target = "orderItemResponseList")
    OrdersResponse toResponse(Orders orders);


    // map User -> UserOrderResponse
    @Mapping(source = "userId", target = "id")
    @Mapping(source = "username", target = "userName")
    @Mapping(source = "email", target = "email")
    @Mapping(source = "address", target = "address")
    UserOrderResponse toUserOrderResponse(User user);

    // map OrderItem -> OrderItemResponse
    @Mapping(source = "product", target = "itemProductResponse")
    OrderItemResponse toOrderItemResponse(OrderItem orderItem);

    @Mapping(source = "proId", target = "proId")
    @Mapping(source = "nameProduct", target = "nameProduct")
    @Mapping(source = "imagePath", target = "imagePath")
    @Mapping(source = "brand", target = "brand")
    @Mapping(source = "prices", target = "prices")
    OrderItemProductResponse toOrderItemProductResponse(Product product);
}

package TT26_73.hoseshop.Mapper;

import TT26_73.hoseshop.Dto.Order.OrderCreateRequest;
import TT26_73.hoseshop.Dto.Order.OrderCreateResponse;
import TT26_73.hoseshop.Dto.Order.OrdersResponse;
import TT26_73.hoseshop.Dto.Order.UserOrderResponse;
import TT26_73.hoseshop.Model.Orders;
import TT26_73.hoseshop.Model.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface OrderMapper {

    @Mapping(source = "user", target = "user")
    @Mapping(target = "idOrders", ignore = true)
    @Mapping(target = "orderItemSet", ignore = true)
    Orders toEntityFromCreateRequest(OrderCreateRequest request, User user);

    @Mapping(source ="idOrders", target = "idOrder")
    @Mapping(source = "user", target = "userOrderResponse")
    OrdersResponse toResponse(Orders orders);

    @Mapping(source = "user", target = "userOrderResponse")
    OrderCreateResponse toCreateResponse(Orders orders);

    // map User -> UserOrderResponse
    @Mapping(source = "userId", target = "id")
    @Mapping(source = "username", target = "userName")
    @Mapping(source = "email", target = "email")
    UserOrderResponse toUserOrderResponse(User user);
}

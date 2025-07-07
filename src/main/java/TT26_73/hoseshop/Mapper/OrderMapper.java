package TT26_73.hoseshop.Mapper;

import TT26_73.hoseshop.Dto.Order.OrderCreateRequest;
import TT26_73.hoseshop.Dto.Order.OrdersResponse;
import TT26_73.hoseshop.Dto.Order.UserOrderResponse;
import TT26_73.hoseshop.Dto.OrderItem.OrderItemProductResponse;
import TT26_73.hoseshop.Dto.OrderItem.OrderItemResponse;
import TT26_73.hoseshop.Model.OrderItem;
import TT26_73.hoseshop.Model.Orders;
import TT26_73.hoseshop.Model.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import java.util.List;
import java.util.Set;

@Mapper(componentModel = "spring")
public interface OrderMapper {

    @Mapping(source ="idOrders", target = "idOrder")
    @Mapping(source = "user", target = "userOrderResponse")
    @Mapping(target = "orderItemResponseList", ignore = true)
    OrdersResponse toResponse(Orders orders);


    // map User -> UserOrderResponse
    @Mapping(source = "userId", target = "id")
    @Mapping(source = "username", target = "userName")
    @Mapping(source = "email", target = "email")
    @Mapping(source = "address", target = "address")
    UserOrderResponse toUserOrderResponse(User user);
//
//    @Named("mapToResponseList")
//    default List<OrderItemResponse> toResponseList(Set<OrderItem> orderItemDBSet){
//        return orderItemDBSet.stream().map(item -> OrderItemResponse.builder()
//                .price(item.getPrice())
//                .note(item.getNote())
//                .itemProductResponse(OrderItemProductResponse.builder()
//                        .proId(item.getProduct().getProId())
//                        .nameProduct(item.getProduct().getNameProduct())
//                        .gender(item.getProduct().getGender())
//                        .brand(item.getProduct().getBrand())
//                        .imagePath(item.getProduct().getImagePath())
//                        .build())
//                .discount(item.getDiscount())
//                .quantity(item.getQuantity())
//                .unit(item.getUnit())
//                .build()).toList();
//    }
}

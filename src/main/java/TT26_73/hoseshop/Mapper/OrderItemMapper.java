package TT26_73.hoseshop.Mapper;

import TT26_73.hoseshop.Dto.OrderItem.*;
import TT26_73.hoseshop.Model.OrderItem;
import TT26_73.hoseshop.Model.Orders;
import TT26_73.hoseshop.Model.Product;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface OrderItemMapper {

    @Mapping(target = "keyOrderItem", ignore = true)
    @Mapping(target = "orders", source = "orders")
    @Mapping(target = "product", source = "product")
    @Mapping(target = "create_At", ignore = true)
    @Mapping(target = "update_At", ignore = true)
    OrderItem toEntityFromCreateRequest(OrderItemCreateRequest request, Product product, Orders orders);

    @Mapping(target = "itemOrderResponse", source = "orders")
    @Mapping(target = "itemProductResponse", source = "product")
    OrderItemResponse toResponse(OrderItem orderItem);

    @Mapping(target = "itemOrderResponse", source = "orders")
    @Mapping(target = "itemProductResponse", source = "product")
    OrderItemCreateResponse toCreateResponse(OrderItem orderItem);


    OrderItemOrderResponse toOrderItemOrderResponse(Orders orders);

    OrderItemProductResponse toOrderItemProductResponse(Product product);
}

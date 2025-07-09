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
    @Mapping(target = "createAt", ignore = true)
    @Mapping(target = "unit", ignore = true)
    @Mapping(target = "price", ignore = true)
    @Mapping(target = "discount", ignore = true)
    @Mapping(target = "updateAt", ignore = true)
    @Mapping(target = "size", ignore = true)
    OrderItem toEntityFromCreateRequest(OrderItemCreateRequest request, Product product, Orders orders);

    @Mapping(target = "itemProductResponse", source = "product")
    OrderItemResponse toResponse(OrderItem orderItem);

    OrderItemProductResponse toOrderItemProductResponse(Product product);
}

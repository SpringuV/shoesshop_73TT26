package TT26_73.hoseshop.Controller;

import TT26_73.hoseshop.Dto.ApiResponse;
import TT26_73.hoseshop.Dto.OrderItem.OrderItemCreateRequest;
import TT26_73.hoseshop.Dto.OrderItem.OrderItemResponse;
import TT26_73.hoseshop.Service.OrderItemService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/order-items")
@RequiredArgsConstructor
@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class OrderItemController {
    OrderItemService orderItemService;

    @GetMapping
    ApiResponse<List<OrderItemResponse>> getListOrderItem(){
        return ApiResponse.<List<OrderItemResponse>>builder()
                .message("Get List OrderItem")
                .result(orderItemService.getListOrderItem())
                .build();
    }

    @GetMapping("/{idOrders}/orders")
    ApiResponse<List<OrderItemResponse>> getListOrderItemByOrderId(@PathVariable("idOrders") String idOrders){
        return ApiResponse.<List<OrderItemResponse>>builder()
                .message("Get List OrderItem By Orders")
                .result(orderItemService.getListOrderItemByOrderId(idOrders))
                .build();
    }

    @GetMapping("/{proId}/products")
    ApiResponse<List<OrderItemResponse>> getListOrderItemByProductId(@PathVariable("proId") String proId){
        return ApiResponse.<List<OrderItemResponse>>builder()
                .message("Get List OrderItem By Product")
                .result(orderItemService.getListOrderItemByProductId(proId))
                .build();
    }

    @GetMapping("/{idOrders}/orders/{proId}/products")
    ApiResponse<List<OrderItemResponse>> getListOrderItemByProductIdAndOrderId(@PathVariable("idOrders") String idOrders, @PathVariable("proId") String proId){
        return ApiResponse.<List<OrderItemResponse>>builder()
                .message("Get List OrderItem By Product And Order")
                .result(orderItemService.getListOrderItemByOrderIdAndProductId(idOrders, proId))
                .build();
    }

    @DeleteMapping("/{idOrders}/orders/{proId}/products")
    ResponseEntity<Void> deleteByKey(@PathVariable("idOrders") String idOrders, @PathVariable("proId") String proId){
        orderItemService.deleteOrderItemByKey(idOrders, proId);
        return ResponseEntity.noContent().build();
    }
}

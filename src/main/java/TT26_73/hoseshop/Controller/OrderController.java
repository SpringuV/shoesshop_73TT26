package TT26_73.hoseshop.Controller;

import TT26_73.hoseshop.Dto.ApiResponse;
import TT26_73.hoseshop.Dto.Order.OrderCreateRequest;
import TT26_73.hoseshop.Dto.Order.OrderCreateResponse;
import TT26_73.hoseshop.Dto.Order.OrdersResponse;
import TT26_73.hoseshop.Service.OrderService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class OrderController {
    OrderService orderService;

    @PostMapping
    ApiResponse<OrderCreateResponse> createOrder(@RequestBody @Valid OrderCreateRequest request){
        return ApiResponse.<OrderCreateResponse>builder()
                .message("Create Order")
                .result(orderService.createOrder(request))
                .build();
    }

    @GetMapping
    ApiResponse<List<OrdersResponse>> getListOrder(){
        return ApiResponse.<List<OrdersResponse>>builder()
                .message("Get List Order")
                .result(orderService.getListOrders())
                .build();
    }

    @GetMapping("/{userId}/users")
    ApiResponse<List<OrdersResponse>> getListOrderByUserId(@PathVariable("userId") String userId){
        return ApiResponse.<List<OrdersResponse>>builder()
                .message("Get List Order By User")
                .result(orderService.getListOrdersByUserId(userId))
                .build();
    }

    @GetMapping("/{paymentStatus}/paymentStatus")
    ApiResponse<List<OrdersResponse>> getListByPaymentStatus(@PathVariable("paymentStatus") String paymentStatus){
        return ApiResponse.<List<OrdersResponse>>builder()
                .message("Get List By Payment Status")
                .result(orderService.getListOrdersByPaymentStatus(paymentStatus))
                .build();
    }

    @GetMapping("/{userId}/users/{paymentStatus}/paymentStatus")
    ApiResponse<List<OrdersResponse>> getListOrderByUserIdAndStatus(@PathVariable("userId") String userId, @PathVariable("paymentStatus") String paymentStatus){
        return ApiResponse.<List<OrdersResponse>>builder()
                .message("Get List By UserId And Payment Status")
                .result(orderService.getListOrderByUserIdAndStatus(userId, paymentStatus))
                .build();
    }

    @DeleteMapping("/{orderId}")
    ResponseEntity<Void> deleteOrderById(@PathVariable("orderId") String orderId){
        orderService.deleteOrderById(orderId);
        return ResponseEntity.noContent().build();
    }
}
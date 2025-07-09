package TT26_73.hoseshop.Service;

import TT26_73.hoseshop.Dto.Order.OrderCreateRequest;
import TT26_73.hoseshop.Dto.Order.OrdersResponse;
import TT26_73.hoseshop.Dto.OrderItem.OrderItemResponse;
import TT26_73.hoseshop.Exception.AppException;
import TT26_73.hoseshop.Exception.ErrorCode;
import TT26_73.hoseshop.Mapper.OrderItemMapper;
import TT26_73.hoseshop.Mapper.OrderMapper;
import TT26_73.hoseshop.Model.Key.KeyOrderItem;
import TT26_73.hoseshop.Model.OrderItem;
import TT26_73.hoseshop.Model.Orders;
import TT26_73.hoseshop.Model.User;
import TT26_73.hoseshop.Repository.OrderRepository;
import TT26_73.hoseshop.Repository.ProductRepository;
import TT26_73.hoseshop.Repository.UserRepository;
import jakarta.persistence.criteria.Order;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Transactional
public class OrderService {
    OrderRepository orderRepository;
    OrderMapper orderMapper;
    OrderItemMapper orderItemMapper;
    UserRepository userRepository;
    ProductRepository productRepository;

    public OrdersResponse createOrder(OrderCreateRequest request){
        // start check user exist
        User user = userRepository.findById(request.getUserId()).orElseThrow(()-> new AppException(ErrorCode.USER_NOT_FOUND));
        // end check user exist

        Orders orders = Orders.builder()
//                .status(request.getStatus())
                .paymentMethod(request.getPaymentMethod())
                .paymentStatus(request.getPaymentStatus())
                .totalPrice(request.getTotalPrices())
                .user(user)
                .build();
        // save
        Orders savedOrder = orderRepository.save(orders);
        List<OrderItem> listOrderItem = request.getItemsOrder().stream().map(itemOrder -> OrderItem.builder()
                .keyOrderItem(KeyOrderItem.builder().orderId(savedOrder.getIdOrders()).productId(itemOrder.getProId()).build())
                .orders(savedOrder)
                .product(productRepository.findById(itemOrder.getProId()).orElseThrow(()-> new AppException(ErrorCode.PRODUCT_NOT_FOUND)))
                .quantity(itemOrder.getQuantity())
                .size(itemOrder.getSize())
                .build())
            .toList();

        // gan vao order
        savedOrder.setOrderItemSet(new HashSet<>(listOrderItem));
        orderRepository.save(savedOrder);

        OrdersResponse ordersResponse = orderMapper.toResponse(savedOrder);
        List<OrderItemResponse> orderItemResponses = savedOrder.getOrderItemSet().stream().map(orderItemMapper::toResponse).toList();
        ordersResponse.setOrderItemResponseList(orderItemResponses);
        return ordersResponse;
    }

    public List<OrdersResponse> getListOrdersByUserId(String userID){
        return orderRepository.findAllByUser_UserId(userID).stream().map(orderMapper::toResponse).toList();
    }

    public List<OrdersResponse> getListOrders(){
        return orderRepository.findAll().stream().map(orderMapper::toResponse).toList();
    }

    public List<OrdersResponse> getListOrdersByPaymentStatus(String paymentStatus){
        return orderRepository.findAllByPaymentStatus(paymentStatus).stream().map(orderMapper::toResponse).toList();
    }

    public List<OrdersResponse> getListOrderByUserIdAndStatus(String userId, String status){
        return orderRepository.findAllByUser_UserIdAndStatus(userId,status).stream().map(orderMapper::toResponse).toList();
    }

    public void deleteOrderById(String idOrder){
        try{
            orderRepository.deleteById(idOrder);
        } catch (EmptyResultDataAccessException ex){
            throw  new AppException(ErrorCode.ORDERS_NOT_FOUND);
        }
    }

    public OrdersResponse confirmPayment(String orderId){
        Orders optionalOrder = orderRepository.findById(orderId).orElseThrow(()-> new AppException(ErrorCode.ORDERS_NOT_FOUND));
        optionalOrder.setPaymentStatus("PAID"); // cập nhật trạng thái
        orderRepository.save(optionalOrder);
        return orderMapper.toResponse(optionalOrder);
    }
}

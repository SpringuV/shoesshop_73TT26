package TT26_73.hoseshop.Service;

import TT26_73.hoseshop.Dto.Order.OrderCreateRequest;
import TT26_73.hoseshop.Dto.Order.OrderCreateResponse;
import TT26_73.hoseshop.Dto.Order.OrdersResponse;
import TT26_73.hoseshop.Exception.AppException;
import TT26_73.hoseshop.Exception.ErrorCode;
import TT26_73.hoseshop.Mapper.OrderMapper;
import TT26_73.hoseshop.Model.Orders;
import TT26_73.hoseshop.Model.User;
import TT26_73.hoseshop.Repository.OrderRepository;
import TT26_73.hoseshop.Repository.UserRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Transactional
public class OrderService {
    OrderRepository orderRepository;
    OrderMapper orderMapper;
    UserRepository userRepository;

    public OrderCreateResponse createOrder(OrderCreateRequest request){
        // start check user exist
        User user = userRepository.findById(request.getUserId()).orElseThrow(()-> new AppException(ErrorCode.USER_NOT_FOUND));
        // end check user exist
        Orders orders = orderMapper.toEntityFromCreateRequest(request, user);

        // save
        orderRepository.save(orders);
        return orderMapper.toCreateResponse(orders);
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
}

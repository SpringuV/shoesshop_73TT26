package TT26_73.hoseshop.Service;

import TT26_73.hoseshop.Dto.OrderItem.OrderItemResponse;
import TT26_73.hoseshop.Exception.AppException;
import TT26_73.hoseshop.Exception.ErrorCode;
import TT26_73.hoseshop.Mapper.OrderItemMapper;
import TT26_73.hoseshop.Model.Key.KeyOrderItem;
import TT26_73.hoseshop.Model.OrderItem;
import TT26_73.hoseshop.Repository.OrderItemRepository;
import TT26_73.hoseshop.Repository.OrderRepository;
import TT26_73.hoseshop.Repository.ProductRepository;
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
public class OrderItemService {

    OrderItemRepository orderItemRepository;
    OrderItemMapper orderItemMapper;

    public List<OrderItemResponse> getListOrderItemByOrderId(String orderId){
        return orderItemRepository.findAllByOrder_IdOrders(orderId).stream().map(orderItemMapper::toResponse).toList();
    }

    public List<OrderItemResponse> getListOrderItemByProductId(String productId){
        return orderItemRepository.findAllByProduct_IdPro(productId).stream().map(orderItemMapper::toResponse).toList();
    }

    public List<OrderItemResponse> getListOrderItemByOrderIdAndProductId(String orderId, String productId){
        return orderItemRepository.findAllByOrder_IdOrdersAndProduct_IdPro(orderId, productId).stream().map(orderItemMapper::toResponse).toList();
    }

    public List<OrderItemResponse> getListOrderItem(){
        return orderItemRepository.findAll().stream().map(orderItemMapper::toResponse).toList();
    }


    public void deleteOrderItemByKey(String orderId, String productId){
        KeyOrderItem keyOrderItem = KeyOrderItem.builder().productId(productId).orderId(orderId).build();
        OrderItem orderItem = orderItemRepository.findById(keyOrderItem).orElseThrow(()-> new AppException(ErrorCode.ORDERS_ITEM_NOT_FOUND));
        try{
            orderItemRepository.delete(orderItem);
        } catch (EmptyResultDataAccessException ex){
            throw new AppException(ErrorCode.DELETE_OBJECT_EXCEPTION);
        }
    }
}

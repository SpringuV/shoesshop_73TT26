package TT26_73.hoseshop.Service;

import TT26_73.hoseshop.Dto.OrderItem.OrderItemCreateRequest;
import TT26_73.hoseshop.Dto.OrderItem.OrderItemCreateResponse;
import TT26_73.hoseshop.Dto.OrderItem.OrderItemResponse;
import TT26_73.hoseshop.Exception.AppException;
import TT26_73.hoseshop.Exception.ErrorCode;
import TT26_73.hoseshop.Mapper.OrderItemMapper;
import TT26_73.hoseshop.Mapper.OrderMapper;
import TT26_73.hoseshop.Model.Key.KeyOrderItem;
import TT26_73.hoseshop.Model.OrderItem;
import TT26_73.hoseshop.Model.Orders;
import TT26_73.hoseshop.Model.Product;
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
    OrderRepository orderRepository;
    ProductRepository productRepository;

    public OrderItemCreateResponse createOrderItem(OrderItemCreateRequest request){
        // start check key exist
        Orders orders = orderRepository.findById(request.getIdOrders()).orElseThrow(()-> new AppException(ErrorCode.ORDERS_NOT_FOUND));
        Product product = productRepository.findById(request.getProId()).orElseThrow(()-> new AppException(ErrorCode.PRODUCT_NOT_FOUND));
        // end check key exist
        // start create key order item
        KeyOrderItem keyOrderItem = KeyOrderItem.builder()
                .orderId(request.getIdOrders())
                .productId(request.getProId())
                .build();
        if(orderItemRepository.existsById(keyOrderItem)){
            throw  new AppException(ErrorCode.ORDERS_ITEM_EXISTED);
        }
        // end create key order item
        OrderItem orderItem = orderItemMapper.toEntityFromCreateRequest(request, product, orders);
        orderItem.setKeyOrderItem(keyOrderItem);
        // save
        orderItemRepository.save(orderItem);
        return orderItemMapper.toCreateResponse(orderItem);
    }

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

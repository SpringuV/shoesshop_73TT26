package TT26_73.hoseshop.Exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public enum ErrorCode {
    DELETE_OBJECT_EXCEPTION(105, "Delete object exception", HttpStatus.BAD_REQUEST),
    UN_AUTHENTICATED(101, "Un Authenticated", HttpStatus.UNAUTHORIZED),
    UN_AUTHORIZED_TO_DELETE_USER(101, "Un authorized to delete user", HttpStatus.UNAUTHORIZED),
    INVALID_KEY(103, "Uncategorized error", HttpStatus.BAD_REQUEST),
    TOKEN_INVALID(103, "Token Invalid or Expired", HttpStatus.UNAUTHORIZED),
    USER_EXISTED(104, "User existed !", HttpStatus.BAD_REQUEST),
    ROLE_EXISTED(104, "Role existed !", HttpStatus.BAD_REQUEST),
    RATING_EXISTED(104, "Rating existed !", HttpStatus.BAD_REQUEST),
    WISH_LIST_EXISTED(104, "Wish list existed !", HttpStatus.BAD_REQUEST),
    CART_ITEM_EXISTED(104, "Cart Item existed !", HttpStatus.BAD_REQUEST),
    ORDERS_ITEM_EXISTED(104, "Orders Item existed !", HttpStatus.BAD_REQUEST),
    ORDERS_EXISTED(104, "Orders existed !", HttpStatus.BAD_REQUEST),
    PRODUCT_EXISTED(104, "Product existed !", HttpStatus.BAD_REQUEST),
    CATEGORY_EXISTED(104, "Category existed !", HttpStatus.BAD_REQUEST),
    PERMISSION_EXISTED(104, "Permission existed !", HttpStatus.BAD_REQUEST),
    USER_NOT_FOUND(102, "User not found !", HttpStatus.NOT_FOUND),
    ORDERS_NOT_FOUND(102, "Orders not found !", HttpStatus.NOT_FOUND),
    ORDERS_ITEM_NOT_FOUND(102, "Orders item not found !", HttpStatus.NOT_FOUND),
    RATING_NOT_FOUND(102, "Cart Item not found !", HttpStatus.NOT_FOUND),
    PRODUCT_NOT_FOUND(102, "Product not found !", HttpStatus.NOT_FOUND),
    CATEGORY_NOT_FOUND(102, "Category not found !", HttpStatus.NOT_FOUND),
    WISH_LIST_NOT_FOUND(102, "Wish list not found !", HttpStatus.NOT_FOUND),
    CART_ITEM_NOT_FOUND(102, "Product not found !", HttpStatus.NOT_FOUND),
    ROLE_NOT_FOUND(102, "Role not found !", HttpStatus.NOT_FOUND),
    PASSWORD_INVALID(103, "Password at least {min} characters", HttpStatus.BAD_REQUEST),
    USERNAME_INVALID(103, "Username at least {min} characters", HttpStatus.BAD_REQUEST),
    UNCATEGORIZED_EXCEPTION(101, "Uncategorized exception !", HttpStatus.INTERNAL_SERVER_ERROR),
    PERMISSION_NOT_FOUND(102, "Permission not found !", HttpStatus.NOT_FOUND);

    ErrorCode(int code, String message, HttpStatus httpStatus) {
        this.code = code;
        this.message = message;
        this.httpStatus = httpStatus;
    }

    private int code;
    private String message;
    private HttpStatus httpStatus;

}

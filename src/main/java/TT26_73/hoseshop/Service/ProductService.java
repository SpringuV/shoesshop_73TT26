package TT26_73.hoseshop.Service;

import TT26_73.hoseshop.Dto.Product.*;
import TT26_73.hoseshop.Exception.AppException;
import TT26_73.hoseshop.Exception.ErrorCode;
import TT26_73.hoseshop.Mapper.ProductMapper;
import TT26_73.hoseshop.Model.Product;
import TT26_73.hoseshop.Repository.ProductRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashSet;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Transactional
public class ProductService {
    private static final Logger log = LoggerFactory.getLogger(ProductService.class);
    ProductRepository productRepository;
    ProductMapper productMapper;


    public ProductCreateResponse productCreate(ProductCreateRequest request){
        // check exist
        if(productRepository.existsById(request.getProductId())){
            throw new AppException(ErrorCode.PRODUCT_EXISTED);
        }
        Product product = productMapper.toProductFromCreateRequest(request);
        StringBuilder sb = new StringBuilder();
        for(String size : request.getSizeSet()){
            sb.append(size).append(" ");
        }
        product.setSize(sb.toString().trim());
        // Xử lý ảnh
        MultipartFile imageFile = request.getImage();
        if (imageFile != null && !imageFile.isEmpty()) {
            try {
                String uploadDir = "uploads/products/";
                File directory = new File(uploadDir);
                if (!directory.exists()) {
                    directory.mkdirs();
                }

                String fileName = UUID.randomUUID() + "_" + imageFile.getOriginalFilename();
                Path filePath = Paths.get(uploadDir, fileName);
                Files.write(filePath, imageFile.getBytes());

                product.setImagePath("/uploads/products/" + fileName); // lưu đường dẫn
            } catch (IOException e) {
                throw new AppException(ErrorCode.FILE_UPLOAD_ERROR);
            }
        }

        // save
        productRepository.save(product);
        return productMapper.toCreateResponse(product);
    }

    public ProductResponse updateProduct(ProductUpdateRequest request){
        Product product = productRepository.findById(request.getProductId()).orElseThrow(()-> new AppException(ErrorCode.PRODUCT_NOT_FOUND));
        productMapper.updateProduct(product, request);
        StringBuilder sb = new StringBuilder();
        for(String size : request.getSize()){
            sb.append(size).append(" ");
        }
        product.setSize(sb.toString().trim());
        // Nếu người dùng upload ảnh mới
        MultipartFile imageFile = request.getImage();
        if (imageFile != null && !imageFile.isEmpty()) {
            try {
                String uploadDir = "uploads/products/";
                File directory = new File(uploadDir);
                if (!directory.exists()) directory.mkdirs();

                String fileName = UUID.randomUUID() + "_" + imageFile.getOriginalFilename();
                Path filePath = Paths.get(uploadDir, fileName);
                Files.write(filePath, imageFile.getBytes());

                product.setImagePath("/uploads/products/" + fileName); // Ghi đè ảnh cũ
            } catch (IOException e) {
                throw new AppException(ErrorCode.FILE_UPLOAD_ERROR);
            }
        }
        productRepository.save(product);
        return productMapper.toProductResponse(product);
    }

    public List<ProductResponse>  filterByNameCategory(String categoryName){
        return productRepository.findAllByCategorySet_NameCateOrderByPricesAsc(categoryName).stream().map(productMapper::toProductResponse).toList();
    }

    public List<ProductResponse> filterByBrand(String brand){
        return productRepository.findAllByBrandOrderByPricesAsc(brand).stream().map(productMapper::toProductResponse).toList();
    }

    public List<ProductResponse> filterByGender(String gender){
        return productRepository.findAllByGenderOrderByPricesAsc(gender).stream().map(productMapper::toProductResponse).toList();
    }

    public List<ProductResponse> getListProduct(){
        return productRepository.findAll().stream().map(productMapper::toProductResponse).toList();
    }

    public ProductResponse getProductById(String id){
        return productMapper.toProductResponse(productRepository.findById(id).orElseThrow(()-> new AppException(ErrorCode.PRODUCT_NOT_FOUND)));
    }

    public void deleteProductById(String id) throws IOException {

        // xóa ảnh trong db
        Product product = productRepository.findById(id).orElseThrow(()-> new AppException(ErrorCode.PRODUCT_NOT_FOUND));
        String relativeImagePath = product.getImagePath();

        // đường dẫn tuyệt đối
        String absoluteUploadDir = System.getProperty("user.dir");
        Path fullImagePath = Paths.get(absoluteUploadDir, relativeImagePath);

        Files.deleteIfExists(fullImagePath);

        productRepository.delete(product);
    }

    public List<ProductShowInfo> getNewProduct(){
        Pageable pageable = PageRequest.of(0, 8, Sort.by("createAt").descending());
        return productRepository.findAll(pageable).stream().map(productMapper::toProductShowInfo).toList();
    }
}

package TT26_73.hoseshop.Configuration;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfiguration implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry
                .addResourceHandler("/uploads/products/**")
                .addResourceLocations("file:uploads/products/");

        registry
                .addResourceHandler("/uploads/users/**")
                .addResourceLocations("file:uploads/users/");
    }
}

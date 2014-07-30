package action;

import model.Product;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class GetProducts extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        try {
            Thread.sleep(1000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        /*
        [
            {id: 1, name: "DKNY钻石圈女表", description: "世界一流的品牌手表，只要998，你值得拥有！", category: "手表&首饰", price: 998, previewImageUrl: "res/img/1.gif"},
            {id: 2, name: "LV经典印花购物袋", description: "名牌包包，你懂的！", category: "手袋&包包", price: 2870, previewImageUrl: "res/img/2.gif"},
            {id: 3, name: "SWAROVSKI可爱手链", description: "小巧精致的手链", category: "手表&首饰", price: 110, previewImageUrl: "res/img/3.gif"},
            {id: 4, name: "简约电脑包", description: "简约、时尚的电脑包，男人的低调追求！", category: "手袋&包包", price: 130, previewImageUrl: "res/img/4.gif"}
        ]
        */

        Product[] products = new Product[4];
        products[0] = new Product();
        products[0].setId(1);
        products[0].setName("DKNY钻石圈女表");
        products[0].setDescription("世界一流的品牌手表，只要998，你值得拥有！");
        products[0].setCategory("手表&首饰");
        products[0].setPrice(998);
        products[0].setPreviewImageUrl("res/img/1.gif");

        products[1] = new Product();
        products[1].setId(2);
        products[1].setName("LV经典印花购物袋");
        products[1].setDescription("名牌包包，你懂的！");
        products[1].setCategory("手袋&包包");
        products[1].setPrice(2870);
        products[1].setPreviewImageUrl("res/img/2.gif");

        products[2] = new Product();
        products[2].setId(3);
        products[2].setName("SWAROVSKI可爱手链");
        products[2].setDescription("小巧精致的手链");
        products[2].setCategory("手表&首饰");
        products[2].setPrice(110);
        products[2].setPreviewImageUrl("res/img/3.gif");

        products[3] = new Product();
        products[3].setId(4);
        products[3].setName("简约电脑包");
        products[3].setDescription("简约、时尚的电脑包，低调男人的追求！");
        products[3].setCategory("手袋&包包");
        products[3].setPrice(130);
        products[3].setPreviewImageUrl("res/img/4.gif");

        request.getSession().setAttribute("products", products);

        response.getWriter().print(JSONArray.fromObject(products));
    }
}

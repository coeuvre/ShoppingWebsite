package action;

import model.*;
import net.sf.json.JSONObject;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.Enumeration;

public class UserLogin extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        try {
            Thread.sleep(1000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        String username = request.getParameter("username");
        String password = request.getParameter("password");

        if (username.equals("Coeuvre") && password.equals("12345678")) {
            response.setStatus(200);

            Product[] products = (Product[])request.getSession().getAttribute("products");

            Shipping shipping = new Shipping();
            shipping.setId(1);
            shipping.setName("王大仙");
            shipping.setAddress("世外桃源");
            shipping.setCode("244000");
            shipping.setPhone("18779103795");

            Cart cart = new Cart();
            CartItem[] items = new CartItem[1];
            items[0] = new CartItem();
            items[0].setProduct(products[0]);
            items[0].setCount(1);
            cart.setItems(items);

            User user = new User();
            user.setId(1);
            user.setUsername("Coeuvre");
            user.setEmail("coeuvre@gmail.com");
            user.setShipping(shipping);
            user.setCart(cart);

            JSONObject json = JSONObject.fromObject(user);
            response.getWriter().print(json);

            HttpSession session = request.getSession();
            if (session != null) {
                session.setAttribute("user", user);
            }
        } else {
            response.setStatus(401);
            response.getWriter().print("用户名或密码错误");
        }
    }
}

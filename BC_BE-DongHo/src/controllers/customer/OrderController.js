const db = require("../../models/index");
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET);

const addOrderOff = async (req, res) => {
  try {
    let cart = req.body.cart;
    let userOrder = req.body.user;
    if (cart.length === 0) {
      return res.status(400).json({
        detail: "Vui lòng thêm sản phẩm vào giỏ hàng để đặt hàng !",
      });
    } else {
      if (
        !req.body.user.name ||
        !req.body.user.phone ||
        !req.body.user.payment ||
        !req.body.user.address
      ) {
        return res.status(400).json({
          detail: "Vui lòng điền đầy đủ thông tin đặt hàng !",
        });
      } else {
        await orderOff(cart, userOrder);
        return res.status(200).json({
          success: true,
          payment: "Thanh toán khi nhận hàng",
          message: "Đặt hàng thành công !",
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

const addOrderOnl = async (req, res) => {
  try {
    const cart = req.body.cart;
    const userOrder = req.body.user;
    if (cart.length === 0) {
      return res.status(400).json({
        detail: "Vui lòng thêm sản phẩm vào giỏ hàng để đặt hàng !",
      });
    }
    if (
      !req.body.user.name ||
      !req.body.user.phone ||
      !req.body.user.payment ||
      !req.body.user.address
    ) {
      return res.status(400).json({
        detail: "Vui lòng điền đầy đủ thông tin đặt hàng !",
      });
    }
    const lineItems = cart.map((item) => ({
      price_data: {
        currency: "vnd",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price,
      },
      quantity: item.cartQuantity,
    }));
    const orderSession = await orderOnlSession(cart, userOrder);
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      metadata: {
        orderId: JSON.stringify(orderSession.id),
      },
      mode: "payment",
      success_url: `${process.env.ORDER_RETURN_SUCCESS}?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.ORDER_RETURN_CANCEL}?order_session=${orderSession.id}&session_id={CHECKOUT_SESSION_ID}`,
    });
    return res.status(200).json({
      success: true,
      id: session.id,
    });
  } catch (error) {
    console.log(error);
  }
};

const orderOff = async (cart, userOrder) => {
  try {
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
      total += cart[i].price * cart[i].cartQuantity;
    }
    let orderInsert = await db.Order.create({
      payment: "Thanh toán khi nhận hàng",
      status: 0,
      name: userOrder.name,
      address: userOrder.address,
      phone: userOrder.phone,
      total: total,
      UserId: userOrder.user_id,
    });
    for (let i = 0; i < cart.length; i++) {
      await db.Order_Product.create({
        ProductId: cart[i].id,
        OrderId: orderInsert.id,
        quantity: cart[i].cartQuantity,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const orderOnlSession = async (cart, userOrder) => {
  try {
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
      total += cart[i].price * cart[i].cartQuantity;
    }
    let orderInsert = await db.Order_Sessions.create({
      payment: "Thanh toán Online",
      status: 0,
      name: userOrder.name,
      address: userOrder.address,
      phone: userOrder.phone,
      total: total,
      UserId: userOrder.user_id,
    });
    for (let i = 0; i < cart.length; i++) {
      await db.Order_Product_Session.create({
        ProductId: cart[i].id,
        OrderId: orderInsert.id,
        quantity: cart[i].cartQuantity,
      });
    }
    return orderInsert;
  } catch (error) {
    console.log(error);
  }
};

const getOrderWait = async (req, res) => {
  try {
    let user_id = req.params.user_id;
    let data = await db.Order.findAll({
      include: [
        {
          model: db.Order_Product,
          attributes: ["id", "OrderId", "ProductId", "quantity"],
          include: [
            {
              model: db.Product,
              attributes: ["name", "image", "price"],
              require: true,
            },
          ],
        },
      ],
      where: {
        UserId: user_id,
        status: 0,
      },
    });
    return res.status(200).json({
      success: true,
      message: "Thông tin đơn hàng đang chờ duyệt !",
      orders: data,
    });
  } catch (error) {
    console.log(error);
  }
};

const getOrderShip = async (req, res) => {
  try {
    let user_id = req.params.user_id;
    let data = await db.Order.findAll({
      include: [
        {
          model: db.Order_Product,
          attributes: ["id", "OrderId", "ProductId", "quantity"],
          include: [
            {
              model: db.Product,
              attributes: ["name", "image", "price"],
              require: true,
            },
          ],
        },
      ],
      where: {
        UserId: user_id,
        status: 1,
      },
    });
    return res.status(200).json({
      message: "Thông tin đơn hàng đang vận chuyển !",
      orders: data,
    });
  } catch (error) {
    console.log(error);
  }
};

const getOrderComplete = async (req, res) => {
  try {
    let user_id = req.params.user_id;
    let data = await db.Order.findAll({
      include: [
        {
          model: db.Order_Product,
          attributes: ["id", "OrderId", "ProductId", "quantity"],
          include: [
            {
              model: db.Product,
              attributes: ["name", "image", "price"],
              require: true,
            },
          ],
        },
      ],
      where: {
        UserId: user_id,
        status: 2,
      },
    });
    let listRate = [];
    for (const order of data) {
      for (const orderProduct of order.Order_Products) {
        let rate = await db.Rate.findOne({
          where: {
            OrderId: order.id,
            ProductId: orderProduct.ProductId,
          },
        });
        if (rate) {
          listRate.push(rate);
        }
      }
    }
    return res.status(200).json({
      success: true,
      message: "Thông tin đơn hàng đã nhận !",
      orders: data,
      rates: listRate,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Đã xảy ra lỗi khi lấy thông tin đơn hàng.",
    });
  }
};

const getOrderCancel = async (req, res) => {
  try {
    let user_id = req.params.user_id;
    let data = await db.Order.findAll({
      include: [
        {
          model: db.Order_Product,
          attributes: ["id", "OrderId", "ProductId", "quantity"],
          include: [
            {
              model: db.Product,
              attributes: ["name", "image", "price"],
              require: true,
            },
          ],
        },
      ],
      where: {
        UserId: user_id,
        status: 3,
      },
    });
    return res.status(200).json({
      success: true,
      message: "Thông tin đơn hàng đã hủy !",
      orders: data,
    });
  } catch (error) {
    console.log(error);
  }
};

const handleCancelOrder = async (req, res) => {
  try {
    let order_id = req.params.order_id;
    await db.Order.update(
      {
        status: 3,
      },
      {
        where: {
          id: order_id,
        },
      }
    );
    return res.status(200).json({
      success: true,
      message: "Hủy đơn hàng thành công !",
    });
  } catch (error) {
    console.log(error);
  }
};

const handleUpdateConfirm = async (req, res) => {
  try {
    let order_id = req.params.order_id;
    await db.Order.update(
      {
        status: 2,
      },
      {
        where: {
          id: order_id,
        },
      }
    );
    return res.status(200).json({
      success: true,
      message: "Xác nhận đã nhận đơn hàng thành công !",
    });
  } catch (error) {
    console.log(error);
  }
};

const createOrderWebhook = async ({
  orderId,
  action,
  stripeSessionId = "",
}) => {
  const [orderSession, orderProductSession] = await Promise.all([
    db.Order_Sessions.findOne({
      where: { id: orderId },
      attributes: { exclude: ["createdAt", "updatedAt"] },
      raw: true,
    }),
    db.Order_Product_Session.findAll({
      where: {
        OrderId: orderId,
      },
      raw: true,
    }),
  ]);

  if (!orderSession || orderProductSession.length === 0) return;

  switch (action) {
    case "create":
      return await Promise.all([
        db.Order.create({
          ...orderSession,
          stripeSessionId,
        }),
        ...orderProductSession.map((productSession) =>
          db.Order_Product.create({
            ...productSession,
          })
        ),
        db.Order_Sessions.destroy({ where: { id: orderId } }),
        db.Order_Product_Session.destroy({ where: { OrderId: orderId } }),
      ]);

    case "delete":
      return await Promise.all([
        db.Order_Sessions.destroy({ where: { id: orderId } }),
        db.Order_Product_Session.destroy({ where: { OrderId: orderId } }),
      ]);

    default:
      break;
  }
};

const handleWebhookOrder = async (req, res) => {
  const sig = req.headers["stripe-signature"];

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.END_POINT_SECRET
    );
  } catch (err) {
    console.error(`Webhook Error: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  switch (event.type) {
    case "checkout.session.completed":
      const checkoutCompleted = event.data.object;
      return await createOrderWebhook({
        orderId: JSON.parse(checkoutCompleted.metadata.orderId),
        action: "create",
        stripeSessionId: checkoutCompleted.id,
      });

    case "checkout.session.async_payment_failed":
      const checkoutFailed = event.data.object;
      return await createOrderWebhook({
        orderId: JSON.parse(checkoutFailed.metadata.orderId),
        action: "delete",
      });

    case "checkout.session.expired":
      const checkoutExpired = event.data.object;
      return await createOrderWebhook({
        orderId: JSON.parse(checkoutExpired.metadata.orderId),
        action: "delete",
      });

    case "payment_intent.canceled":
      const paymentCanceled = event.data.object;
      return await createOrderWebhook({
        orderId: JSON.parse(paymentCanceled.metadata.orderId),
        action: "delete",
      });

    default:
      break;
  }

  res.send();
};

module.exports = {
  getOrderWait,
  getOrderShip,
  getOrderComplete,
  getOrderCancel,
  handleCancelOrder,
  handleUpdateConfirm,
  addOrderOff,
  addOrderOnl,
  handleWebhookOrder,
};

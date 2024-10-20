const db = require("../../models/index");
const { Op, Sequelize } = require("sequelize");
const moment = require("moment-timezone");

moment.tz.setDefault("Asia/Ho_Chi_Minh");

const OrderDashBoard = async (req, res) => {
  try {
    const countUser = await db.User.count();
    const countProduct = await db.Product.count();
    const countOrder = await db.Order.count();
    const countOrderShip = await db.Order.count({
      where: {
        status: 1,
      },
    });
    let limit = 8;
    let page = req.query.page;
    if (!page) {
      page = 1;
    }
    const { count, rows: orders } = await db.Order.findAndCountAll({
      limit: limit,
      offset: (page - 1) * limit,
    });
    const totalPage = Math.ceil(count / limit);
    return res.status(200).json({
      success: true,
      count_user: countUser,
      count_product: countProduct,
      count_order: countOrder,
      count_order_ship: countOrderShip,
      total_product: count,
      total_page: totalPage,
      current_page: page,
      orders: orders,
    });
  } catch (error) {
    console.log(error);
  }
};

const orderIndex = async (req, res) => {
  try {
    let limit = 8;
    let page = req.query.page;
    if (!page) {
      page = 1;
    }
    const { count, rows: orders } = await db.Order.findAndCountAll({
      limit: limit,
      offset: (page - 1) * limit,
    });
    const totalPage = Math.ceil(count / limit);
    const result = {
      success: true,
      total_product: count,
      total_page: totalPage,
      current_page: page,
      orders: orders,
    };
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
};

const confirmOrder = async (req, res) => {
  try {
    const order_id = req.params.order_id;
    console.log("order_id", order_id);
    const order = await db.Order.findOne({
      where: {
        id: order_id,
      },
    });
    if (!order) {
      return res.status(404).json({
        detail: "Không tồn tại đơn hàng",
      });
    }
    await db.Order.update(
      {
        status: 1,
      },
      {
        where: {
          id: order_id,
        },
      }
    );
    return res.status(200).json({
      success: true,
      message: "Duyệt đơn hàng thành công",
    });
  } catch (error) {
    console.log(error);
  }
};

const deleteOrder = async (req, res) => {
  try {
    const order_id = req.params.order_id;
    const order = await db.Order.findOne({
      where: {
        id: order_id,
      },
    });
    if (!order) {
      return res.status(404).json({
        detail: "Không tồn tại đơn hàng",
      });
    }
    await db.Rate.destroy({
      where: {
        OrderId: order_id,
      },
    });
    await db.Order_Product.destroy({
      where: {
        OrderId: order_id,
      },
    });
    await db.Order.destroy({
      where: {
        id: order_id,
      },
    });
    return res.status(200).json({
      success: true,
      message: "Xóa đơn hàng thành công",
    });
  } catch (error) {
    console.log(error);
  }
};

const getOrderDetail = async (req, res) => {
  try {
    let order_id = req.params.order_id;
    let data = await db.Order.findOne({
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
        id: order_id,
      },
    });
    return res.status(200).json({
      success: true,
      order: data,
    });
  } catch (error) {
    console.log(error);
  }
};

const statisticalOrder = async (req, res) => {
  try {
    const year = parseInt(req.query.year) || moment().year();
    const month = req.query.month ? parseInt(req.query.month) : null;

    let startDate, endDate, timeUnit;

    if (month) {
      // Monthly revenue statistics
      startDate = moment()
        .year(year)
        .month(month - 1)
        .startOf("month");
      endDate = moment(startDate).endOf("month");
      timeUnit = "day";
    } else {
      // Yearly revenue statistics
      startDate = moment().year(year).startOf("year");
      endDate = moment(startDate).endOf("year");
      timeUnit = "month";
    }

    // Fetch revenue statistics
    const revenueStats = await Promise.all(
      Array.from(
        { length: endDate.diff(startDate, timeUnit) + 1 },
        async (_, index) => {
          const start = moment(startDate).add(index, timeUnit);
          const end = moment(start).endOf(timeUnit);

          const result = await db.Order.findOne({
            where: {
              createdAt: {
                [Op.gte]: start.toDate(),
                [Op.lte]: end.toDate(),
              },
            },
            attributes: [
              [
                Sequelize.fn(
                  "COALESCE",
                  Sequelize.fn("SUM", Sequelize.col("total")),
                  0
                ),
                "revenue",
              ],
              [Sequelize.fn("COUNT", Sequelize.col("id")), "orderCount"],
            ],
            raw: true,
          });

          const stat = {
            month: start.format("MMM"),
            revenue: parseFloat(result?.revenue || 0),
            orderCount: parseInt(result?.orderCount || 0),
          };

          if (timeUnit === "day") {
            stat.day = start.format("DD");
          }

          return stat;
        }
      )
    );

    return res.status(200).json({
      success: true,
      data: {
        yearlyStats: revenueStats,
      },
    });
  } catch (error) {
    console.error("Error fetching statistics", error);
    return res.status(500).json({
      success: false,
      error: error.message,
      data: {},
    });
  }
};

module.exports = {
  OrderDashBoard,
  orderIndex,
  confirmOrder,
  deleteOrder,
  getOrderDetail,
  statisticalOrder,
};

import React, { useMemo } from "react";
import ReactApexChart from "react-apexcharts";
import { formatPrice } from "../../helpers/formatPrice";
import { Spin, Empty, Card } from "antd";

const StatisicalRevenue = ({ monthlyRevenue, isLoading }) => {
  const { series } = useMemo(() => {
    if (!Array.isArray(monthlyRevenue)) {
      return { series: [], totalRevenue: 0, totalOrders: 0 };
    }

    const revenueData = monthlyRevenue.map((item) => item.revenue);
    const orderCountData = monthlyRevenue.map((item) => item.orderCount);

    const total = revenueData.reduce((sum, current) => sum + current, 0);
    const orders = orderCountData.reduce((sum, current) => sum + current, 0);

    return {
      series: [
        { name: "Doanh thu", data: revenueData },
        { name: "Số đơn hàng", data: orderCountData },
      ],
      totalRevenue: total,
      totalOrders: orders,
    };
  }, [monthlyRevenue]);

  const options = {
    chart: {
      height: 350,
      type: "bar",
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        borderRadius: 10,
        dataLabels: {
          position: "top",
        },
      },
    },
    dataLabels: {
      enabled: true,
      formatter: function (val, { seriesIndex }) {
        if (seriesIndex === 0) {
          const isDay = monthlyRevenue.some((item) => item.day);
          const currency = isDay ? "" : " VND";
          return formatPrice(val) + currency;
        }
        return val;
      },
      offsetY: -20,
      style: {
        fontSize: "12px",
        colors: ["#304758"],
      },
    },
    xaxis: {
      categories: monthlyRevenue.map(
        (item) =>
          `${item.day ? "Day " + item.day + "-" + item.month : item.month}`
      ),
      position: "bottom",
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      crosshairs: {
        fill: {
          type: "gradient",
          gradient: {
            colorFrom: "#D8E3F0",
            colorTo: "#BED1E6",
            stops: [0, 100],
            opacityFrom: 0.4,
            opacityTo: 0.5,
          },
        },
      },
      tooltip: {
        enabled: true,
      },
    },
    yaxis: [
      {
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        labels: {
          show: true,
          formatter: function (val) {
            return formatPrice(val) + " VND";
          },
        },
      },
      {
        opposite: true,
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        labels: {
          show: true,
        },
      },
    ],
    colors: ["#008FFB", "#00E396"],
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: function (val, { seriesIndex }) {
          if (seriesIndex === 0) {
            return formatPrice(val) + " VND";
          }
          return val + " đơn";
        },
      },
    },
  };

  if (isLoading) {
    return (
      <div className="text-center">
        <Spin size="large" />
      </div>
    );
  }

  if (!Array.isArray(monthlyRevenue) || monthlyRevenue.length === 0) {
    return <Empty description="Không có dữ liệu" />;
  }

  return (
    <Card>
      <ReactApexChart
        options={options}
        series={series}
        type="bar"
        height={350}
      />
    </Card>
  );
};

export default StatisicalRevenue;

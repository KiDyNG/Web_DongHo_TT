-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th9 30, 2024 lúc 09:21 AM
-- Phiên bản máy phục vụ: 10.4.32-MariaDB
-- Phiên bản PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `web_dong_ho1`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `CategoryParentId` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `categories`
--

INSERT INTO `categories` (`id`, `name`, `CategoryParentId`, `createdAt`, `updatedAt`) VALUES
(1, 'Casio', 1, '2024-04-23 16:30:25', '2024-04-23 16:30:25'),
(2, 'Seiko', 1, '2024-04-23 16:30:25', '2024-04-23 16:30:25'),
(3, 'KOI', 1, '2024-04-23 16:32:09', '2024-04-23 16:32:09'),
(4, 'Citizen', 1, '2024-04-23 16:32:09', '2024-04-23 16:32:09'),
(7, 'Orient', 1, '2024-04-23 16:33:30', '2024-04-23 16:33:30'),
(8, 'Casio', 2, '2024-04-23 16:33:30', '2024-04-23 16:33:30'),
(9, 'Seiko', 2, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(10, 'KOI', 2, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(11, 'Citizen', 2, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(12, 'Casio', 3, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(13, 'Citizen', 3, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(14, 'Doxa', 3, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(15, 'Casio', 4, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(16, 'KOI', 4, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(17, 'Doxa', 4, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(18, 'Dây da đồng hồ', 5, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(19, 'Ví da', 5, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(20, 'Mắt kính', 5, '0000-00-00 00:00:00', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `category_parents`
--

CREATE TABLE `category_parents` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `category_parents`
--

INSERT INTO `category_parents` (`id`, `name`, `createdAt`, `updatedAt`) VALUES
(1, 'Thương Hiệu', '2024-04-23 16:29:43', '2024-04-23 16:29:43'),
(2, 'Đồng Hồ Nam', '2024-04-23 16:29:43', '2024-04-23 16:29:43'),
(3, 'Đồng Hồ Nữ', '2024-04-23 16:30:05', '2024-04-23 16:30:05'),
(4, 'Đồng Hồ Đôi', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(5, 'Phụ Kiện', '0000-00-00 00:00:00', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `payment` varchar(255) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `total` float DEFAULT NULL,
  `UserId` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `orders`
--

INSERT INTO `orders` (`id`, `payment`, `status`, `name`, `address`, `phone`, `total`, `UserId`, `createdAt`, `updatedAt`) VALUES
(1, 'Thanh toán khi nhận hàng', 2, 'Nguyễn Kiến Duy', 'Hà Nội', '0986538387', 13900000, 2, '2024-04-23 16:05:07', '2024-04-23 16:17:32');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `order_products`
--

CREATE TABLE `order_products` (
  `id` int(11) NOT NULL,
  `OrderId` int(11) DEFAULT NULL,
  `ProductId` int(11) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `order_products`
--

INSERT INTO `order_products` (`id`, `OrderId`, `ProductId`, `quantity`, `createdAt`, `updatedAt`) VALUES
(1, 1, 2, 1, '2024-04-23 16:05:07', '2024-04-23 16:05:07');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `price` float DEFAULT NULL,
  `description` text DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `CategoryId` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `products`
--

INSERT INTO `products` (`id`, `name`, `image`, `price`, `description`, `quantity`, `CategoryId`, `createdAt`, `updatedAt`) VALUES
(2, 'Casio World Time AE-1200WHD-1AVDF – Nam – Quartz (Pin) – Mặt số thiên hướng không quân đương đại – Dây đeo kim loại bền bỉ', '/images/products/casio1.png', 1506000, 'Đồng hồ nam Casio AE-1200WHD-1AVDF thiết kế mặt số LCD vuông kích thước phong cách quân đội, với những tính năng hiện đại tiện dụng, kết hợp với dây đeo bằng kim loại đem lại vẻ mạnh mẽ cá tính dành cho phái mạnh.', 10, 1, '2024-04-23 16:37:08', '2024-09-30 06:57:18'),
(7888, 'Casio MTP-V001L-1BUDF – Nam – Quartz (Pin) – Mặt Số 38mm, Kính Cứng, Chống Nước 3ATM', '/images/products/casio1.png', 716000, 'Mẫu Casio MTP-V001L-1BUDF phiên bản dây da đen có vân lịch lãm, thiết kế đơn giản 3 kim trên mặt số size 38mm, nền cọc số học trò kiểu dáng mỏng trẻ trung.', 10, 1, '2024-09-30 06:58:15', '2024-09-30 06:58:15'),
(7889, 'Casio MTP-V004GL-9AUDF – Nam – Quartz (Pin) – Mặt Số 41.5mm, Kính Cứng, Chống Nước 3ATM', '/images/products/casio3.png', 938000, 'Đồng hồ Casio MTP-V004GL-9AUDF với mặt đồng hồ tròn truyền thống, vỏ máy mạ vàng sang trọng, gạch số được phủ đen nổi bật trên nền số, dây đeo da nâu nam tính lịch lãm.', 10, 1, '2024-09-30 07:01:16', '2024-09-30 07:01:16'),
(7890, 'Casio MTP-1183Q-7ADF – Nam – Quartz (Pin) – Mặt số mạ vàng sang trọng – Dây da dập vân lịch lãm', '/images/products/casio5.png', 1150000, 'Đồng hồ Casio MTP-1183Q-7ADF với mặt đồng hồ tươi sáng và nổi bật, vỏ máy kim loại mạ vàng sang trọng, cùng dây da dập vân lịch lãm hứa hẹn mang đến cho chàng vẻ ngoài trẻ trung và năng động', 5, 1, '2024-09-30 07:01:56', '2024-09-30 07:01:56'),
(7891, 'Seiko 5 Sports 55th Anniversary Limited Edition SRPK17K1 – Nam – Automatic – Mặt Số 39.5mm, Trữ Cót 41 Giờ', '/images/products/SRPK17K1.png', 14280000, 'Đồng hồ Seiko 5 Sports 55th Anniversary Limited Edition SRPK17K1 (phiên bản giới hạn kỷ niệm 55 năm) tái hiện phiên bản Seiko 5 năm 1968 từ khung vỏ – bộ dây dáng Twist-O-Flex – Kính Hardlex. Sử dụng máy 4R36 mới trữ cót 41 giờ. Giới hạn số lượng chỉ 40 chiếc phân phối chính hãng tại Việt Nam.', 4, 2, '2024-09-30 07:03:56', '2024-09-30 07:03:56'),
(7892, 'Seiko 5 Field Sports Style SRPH29K1 – Nam – Automatic – Mặt số 39.4mm, chống nước 10ATM, bộ máy In-House', '/images/products/SRPH29K1.png', 9650000, 'Seiko Field Sports Style SRPH29K1 phiên bản Seiko 5 quân đội dây vải tone màu xanh lá, chi tiết kim chỉ cùng các cọc chấm tròn nhỏ được phủ dạ quang trên nền mặt số đen kích thước 39.4mm.', 3, 2, '2024-09-30 07:04:37', '2024-09-30 07:04:37'),
(7893, 'Seiko 5 Sports 55th Anniversary Lý Tiểu Long – SRPK39K1 – Phiên bản giới hạn 15.000 chiếc – Caliber 4R36', '/images/products/SRPK39K.png', 14963000, 'Mẫu Seiko 5 Sports SRPK39K1 phiên bản giới hạn chỉ 15.000 chiếc trên toàn cầu, là ấn phẩm kỷ niệm 55 năm ra mắt bộ sưu tập Seiko 5 Sports, đồng thời vinh danh ngôi sao điện ảnh võ thuật Lý Tiểu Long qua toàn bộ thiết kế đồng hồ lấy cảm hứng từ ông.', 5, 2, '2024-09-30 07:05:28', '2024-09-30 07:05:28'),
(7894, 'Seiko 5 Sports – SRPK41K1 – Nam – Hardlex Cong – Bản Kỷ Niệm 110 Năm – Giới Hạn 6000 Chiếc – Caliber In-House 4R36', '/images/products/SRPK41K.png', 13200000, 'Mẫu Seiko 5 Sports SRPK41K1 phiên bản giới hạn chỉ 6000 chiếc trên toàn cầu, thuộc ấn phẩm kỷ niệm 110 năm ra đời chiếc đồng hồ đeo tay đầu tiên của Nhật Bản', 5, 2, '2024-09-30 07:06:04', '2024-09-30 07:06:04'),
(7895, 'Seiko 5 Field Specialist Style SRPG39K1 – Nam – Automatic – Thiết kế hải quân cổ điển – Mặt số mạ bạc mạnh mẽ tinh nhuệ', '/images/products/SRPG39K1.png', 9430000, 'Seiko 5 Sports Field SRPG39K1 là mẫu đồng hồ cơ quân đội tầm trung đến từ thương hiệu Nhật Bản. Với thiết kế đậm chất “phong trần”, bụi bặm, đồng hồ có nhiều chức năng nổi bật, trong đó có chống nước đến 10ATM và bộ máy cơ tích cót 41 giờ mạnh mẽ.', 3, 2, '2024-09-30 07:06:53', '2024-09-30 07:06:53'),
(7896, 'Koi K001.403.642.05.01.01 – Nam – Quartz (Pin) – Mặt Số 38.5mm, Kính Sapphire, Chống Nước 5ATM', '/images/products/K001.403.642.05.01-1.png', 2130000, 'Mẫu Koi K001.403.642.05.01.01 thiết kế nổi bật phần mặt kính chất liệu kính Sapphire, kim chỉ cùng cọc vạch số tạo hình mỏng mạ bạc trên nền mặt số kích thước 38.5mm.', 6, 3, '2024-09-30 07:08:09', '2024-09-30 07:08:09'),
(7897, 'Koi K001.103.642.05.01.01 – Nữ – Quartz (Pin) – Mặt Số 28mm, Kính Sapphire, Chống Nước 5ATM', '/images/products/K001.403.642.05.01-1.png', 2060000, 'Mẫu Koi K001.103.642.05.01.01 thiết kế nổi bật phần mặt kính chất liệu kính Sapphire, thiết kế đơn giản chức năng 3 kim và 1 lịch trên nền mặt số 28mm phù hợp cho phái đẹp có phần cổ tay nhỏ.', 3, 3, '2024-09-30 07:08:47', '2024-09-30 07:08:47'),
(7898, 'KOI Noble K002.403.641.50.13.04 – Nam – Kính Sapphire – Máy Quartz (Pin) – Mặt Số 38mm – Chống Nước 5 ATM', '/images/products/K002.403.641.50.13.04.png', 5990000, 'Mẫu K002.403.641.50.13.04 sở hữu thiết kế cổ điển qua nền mặt số xà cừ tinh tế, toát lên vẻ sang trọng và cao cấp bởi chất liệu chế tác hàng đầu.', 4, 3, '2024-09-30 07:09:27', '2024-09-30 07:09:27');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `rates`
--

CREATE TABLE `rates` (
  `id` int(11) NOT NULL,
  `ProductId` int(11) DEFAULT NULL,
  `UserId` int(11) DEFAULT NULL,
  `OrderId` int(11) DEFAULT NULL,
  `star` int(11) DEFAULT NULL,
  `comment` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `rates`
--

INSERT INTO `rates` (`id`, `ProductId`, `UserId`, `OrderId`, `star`, `comment`, `createdAt`, `updatedAt`) VALUES
(1, 2, 2, 1, 5, 'Quá ok !', '2024-04-23 16:17:41', '2024-04-23 16:17:41');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `roles`
--

CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `roles`
--

INSERT INTO `roles` (`id`, `name`, `description`, `createdAt`, `updatedAt`) VALUES
(1, 'Admin', 'Full Roles', '2024-04-23 17:57:02', '2024-04-23 17:57:02'),
(2, 'Customer', 'No Role', '2024-04-23 17:57:02', '2024-04-23 17:57:02');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `sequelizemeta`
--

CREATE TABLE `sequelizemeta` (
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `sequelizemeta`
--

INSERT INTO `sequelizemeta` (`name`) VALUES
('20230908053145-create-user.js'),
('20230908054238-create-role.js'),
('20230909134515-create-product.js'),
('20230909135346-create-category.js'),
('20230915134636-create-order.js'),
('20230915141039-create-order-product.js'),
('20230922131308-create-rate.js'),
('20230924141132-create-order.js'),
('20231214142913-create-category-parent.js');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `RoleId` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `username`, `password`, `phone`, `RoleId`, `createdAt`, `updatedAt`) VALUES
(1, 'Admin', 'admin@gmail.com', 'admin', '$2b$10$DznhRSzhAee8OnkdrCtiHejZonhXzfaFzqnViAT3WAI.yqXxJKVm2', '0967792857', 1, '2024-04-23 15:56:51', '2024-04-23 15:56:51'),
(2, 'Nguyễn Kiến Duy', 'kienduy1@gmai.com', 'kienduy', '$2b$10$I6TjfM9m9oeooQElezlP/e9oYiGCJtKVDS9n2FiSm0K8Knmp3OEle', '0967792855', 2, '2024-04-23 16:04:38', '2024-04-23 16:04:38'),
(3, 'Nguyễn Kiến Duy', 'kienduy123@gmail.com', 'kienduy1', '$2b$10$QZcXW4WRnkyHYmx3kLmQgeWG1YSMweXbwvAYF8/57mV/HLVzHpGF6', '0967792858', 2, '2024-09-30 06:33:01', '2024-09-30 06:33:01');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `category_parents`
--
ALTER TABLE `category_parents`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `order_products`
--
ALTER TABLE `order_products`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `rates`
--
ALTER TABLE `rates`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `sequelizemeta`
--
ALTER TABLE `sequelizemeta`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Chỉ mục cho bảng `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT cho bảng `category_parents`
--
ALTER TABLE `category_parents`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT cho bảng `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT cho bảng `order_products`
--
ALTER TABLE `order_products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT cho bảng `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7899;

--
-- AUTO_INCREMENT cho bảng `rates`
--
ALTER TABLE `rates`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT cho bảng `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT cho bảng `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
